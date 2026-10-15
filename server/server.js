import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { db } from './db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const IS_PROD = process.env.NODE_ENV === 'production';

// Cryptographically secure JWT Secret Resolution (Never rely on hardcoded fallback)
let JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET || JWT_SECRET === 'iitkgp_super_secret_jwt_key_2026') {
  if (IS_PROD) {
    console.error('FATAL SECURITY ERROR: Insecure or default JWT_SECRET detected in production!');
    process.exit(1);
  } else {
    JWT_SECRET = crypto.randomBytes(64).toString('hex');
    console.warn('⚠️ SECURITY WARNING: Using dynamically generated ephemeral JWT_SECRET for this session.');
  }
}

// -------------------------------------------------------------
// 1. DEFENSE-IN-DEPTH: SECURITY HEADERS & FINGERPRINT REMOVAL
// -------------------------------------------------------------
app.disable('x-powered-by');

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'https://translate.google.com', 'https://translate.googleapis.com'],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com', 'https://translate.googleapis.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com', 'data:'],
      imgSrc: ["'self'", 'data:', 'https:', 'blob:'],
      connectSrc: ["'self'", 'https:', 'http://localhost:*', 'ws:', 'wss:', 'https://translate.googleapis.com'],
      objectSrc: ["'none'"],
      frameAncestors: ["'self'"],
      upgradeInsecureRequests: IS_PROD ? [] : null
    }
  },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

// Explicit HTTP Security Headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  if (IS_PROD) {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }
  next();
});

// -------------------------------------------------------------
// 2. STRICT CORS WHITELISTING
// -------------------------------------------------------------
const defaultOrigins = ['http://localhost:5173', 'http://localhost:5000', 'http://127.0.0.1:5173', 'https://hcdskgp.com'];
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map(o => o.trim()).filter(Boolean)
  : defaultOrigins;

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (!IS_PROD && allowedOrigins.includes('*')) return callback(null, true);

    const isMatch = allowedOrigins.some(allowed => {
      if (allowed === origin) return true;
      if (allowed.startsWith('*.')) {
        return origin.endsWith(allowed.slice(2));
      }
      return false;
    });

    if (isMatch) {
      callback(null, true);
    } else {
      callback(new Error(`CORS Policy: Origin ${origin} is not allowed.`));
    }
  },
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  maxAge: 86400
}));

// Body parsing with safe size limits (prevents payload exhaustion)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// -------------------------------------------------------------
// 3. RECURSIVE INPUT SANITIZATION & ANTI-XSS FILTER
// -------------------------------------------------------------
function sanitizeValue(value) {
  if (typeof value === 'string') {
    return value
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/data:\s*text\/html/gi, '')
      .replace(/\bon\w+\s*=\s*(['"]).*?\1/gi, '')
      .replace(/\0/g, '');
  }
  if (Array.isArray(value)) {
    return value.map(sanitizeValue);
  }
  if (value !== null && typeof value === 'object') {
    const cleanObj = {};
    for (const key of Object.keys(value)) {
      if (key === '__proto__' || key === 'constructor' || key === 'prototype') continue;
      cleanObj[key] = sanitizeValue(value[key]);
    }
    return cleanObj;
  }
  return value;
}

app.use((req, res, next) => {
  if (req.body) req.body = sanitizeValue(req.body);
  if (req.query) req.query = sanitizeValue(req.query);
  if (req.params) req.params = sanitizeValue(req.params);
  next();
});

// -------------------------------------------------------------
// 4. RATE LIMITING MIDDLEWARES
// -------------------------------------------------------------
// Global API rate limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many requests from this IP address. Please try again after 15 minutes.',
    code: 'RATE_LIMIT_EXCEEDED'
  }
});
app.use('/api/', apiLimiter);

// Strict Auth rate limiter (Brute-force protection)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many login attempts. Your IP has been temporarily rate limited for 15 minutes.',
    code: 'AUTH_RATE_LIMIT_EXCEEDED'
  }
});
app.use('/api/auth/login', authLimiter);

// AI Chat rate limiter
const aiChatLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 25,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'AI assistant request rate limit exceeded. Please wait a moment before sending more queries.',
    code: 'AI_RATE_LIMIT_EXCEEDED'
  }
});
app.use('/api/ai-chat', aiChatLimiter);

// Lead submission rate limiter
const leadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many submissions from this IP address. Please try again later.',
    code: 'LEAD_RATE_LIMIT_EXCEEDED'
  }
});
app.use(['/api/visitor-info', '/api/leads'], leadLimiter);

// Safe Production Error Response Helper (No stack trace or internal leakage)
function safeErrorResponse(res, status, err, userMessage) {
  if (err && !IS_PROD) {
    console.error(`[Security Safe Error] ${userMessage}:`, err);
  }
  return res.status(status).json({
    success: false,
    error: IS_PROD ? userMessage : (err?.message || userMessage),
    code: 'API_ERROR'
  });
}

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (!req.url.startsWith('/assets')) {
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} ${res.statusCode} (${duration}ms)`);
    }
  });
  next();
});

// Initialize database
await db.init();

// ==========================================
// AUTHENTICATION & RBAC MIDDLEWARES
// ==========================================

// 1. Authenticate Token from Authorization Header (Bearer JWT)
function authenticateToken(req, res, next) {
  let token = null;
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      error: 'Unauthorized: Authentication required. Bearer JWT token missing.',
      code: 'TOKEN_MISSING'
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({
        error: 'Unauthorized: Invalid or expired session token.',
        code: 'TOKEN_INVALID'
      });
    }
    req.user = user;
    next();
  });
}

// 2. Require Administrator Role (admin or superadmin)
function requireAdmin(req, res, next) {
  if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'superadmin')) {
    return res.status(403).json({
      error: 'Forbidden: Restricted endpoint. Only authorized IIT Kharagpur Administrators can access this resource.',
      code: 'ADMIN_ACCESS_REQUIRED'
    });
  }
  next();
}

// 3. Require Staff / Employee or Admin Role
function requireStaffOrAdmin(req, res, next) {
  if (!req.user || (req.user.role !== 'employee' && req.user.role !== 'admin' && req.user.role !== 'superadmin')) {
    return res.status(403).json({
      error: 'Forbidden: Restricted endpoint. Only authorized IIT Kharagpur Staff or Administrators can access this resource.',
      code: 'STAFF_ACCESS_REQUIRED'
    });
  }
  next();
}

// 4. Require Super Admin Role
function requireSuperAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'superadmin') {
    return res.status(403).json({
      error: 'Forbidden: Super Administrator privileges required.',
      code: 'SUPERADMIN_REQUIRED'
    });
  }
  next();
}

// 5. Require Student or Staff or Admin
function requireStudentOrStaff(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  next();
}

// ==========================================
// 1. AUTHENTICATION & CREDENTIALS ENDPOINTS
// ==========================================

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  const identifier = (req.body.username || req.body.email || req.body.identifier || '').trim();
  const password = req.body.password;

  if (!identifier || !password) {
    return res.status(400).json({ error: 'Username/email and password are required' });
  }

  try {
    const user = await db.getUserByUsername(identifier);

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const isMatch = bcrypt.compareSync(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const payload = {
      id: user.id,
      emp_id: user.emp_id,
      username: user.username,
      email: user.email,
      role: user.role,
      name: user.name,
      designation: user.designation,
      department: user.department,
      roll_number: user.roll_number,
      is_temp_password: user.is_temp_password
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '12h' });

    await db.logAudit({
      action: 'USER_LOGIN_SUCCESS',
      entityType: 'AUTH',
      entityId: user.username,
      actorRole: user.role,
      actorName: user.name,
      details: `Successful login for user ${user.username} (${user.role}).`
    });

    res.json({
      success: true,
      token,
      user: payload
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Authentication service encountered an unexpected error.' });
  }
});

// GET /api/auth/me
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  res.json({
    user: req.user,
    authenticated: true
  });
});

// POST /api/auth/create-employee (Master Admin creates staff/employee accounts directly)
app.post('/api/auth/create-employee', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { emp_id, username, email, password, role, name, designation, department, phone } = req.body;

    if (!username || !email || !password || !name) {
      return res.status(400).json({ error: 'Username, email, temporary password, and full name are required.' });
    }

    if (role && !['admin', 'employee'].includes(role)) {
      return res.status(400).json({ error: 'Assigned role must be either "admin" or "employee".' });
    }

    const newEmployee = await db.createEmployeeAccount({
      emp_id,
      username,
      email,
      password,
      role: role || 'employee',
      name,
      designation,
      department,
      phone
    }, req.user);

    res.status(201).json({
      success: true,
      message: `Employee account created successfully for ${name}. Temporary password assigned.`,
      employee: newEmployee
    });
  } catch (err) {
    console.error('Error creating employee:', err);
    res.status(400).json({ error: err.message || 'Failed to create employee account.' });
  }
});

// GET /api/employees (List employees for admin task assignment)
app.get('/api/employees', authenticateToken, requireStaffOrAdmin, async (req, res) => {
  try {
    const employees = await db.getAllEmployees();
    res.json({ success: true, employees });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/employees/workload (Employee Workload Summary)
app.get('/api/employees/workload', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const summary = await db.getEmployeeWorkloadSummary();
    res.json({ success: true, workload_summary: summary });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 2. EMPLOYEE TASKS & WORKFLOW ("Kaj o Progress")
// ==========================================

// GET /api/tasks (List tasks, filtered by employee or status)
app.get('/api/tasks', authenticateToken, requireStaffOrAdmin, async (req, res) => {
  try {
    const { status, priority, q, employeeId } = req.query;

    // If logged-in user is an employee (not admin), restrict to their own assigned tasks unless explicitly specified
    let targetEmployeeId = employeeId;
    if (req.user.role === 'employee') {
      targetEmployeeId = req.user.id;
    }

    const tasks = await db.getEmployeeTasks({
      employeeId: targetEmployeeId,
      status: status || 'ALL',
      priority: priority || 'ALL',
      q: q || ''
    });

    res.json({ success: true, tasks, count: tasks.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/tasks (Admin assigns task to an employee)
app.post('/api/tasks', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { title, description, assigned_to, priority, start_date, due_date } = req.body;

    if (!title || !assigned_to || !due_date) {
      return res.status(400).json({ error: 'Task title, assigned employee, and due date are mandatory.' });
    }

    const task = await db.createEmployeeTask({
      title,
      description,
      assigned_to,
      priority: priority || 'Medium',
      start_date,
      due_date
    }, req.user);

    res.status(201).json({
      success: true,
      message: `Task '${task.title}' assigned successfully.`,
      task
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/tasks/:id/progress (Employee/Admin updates task progress and logs work)
app.patch('/api/tasks/:id/progress', authenticateToken, requireStaffOrAdmin, async (req, res) => {
  try {
    const taskId = req.params.id;
    const { progress_percentage, status, log_note, hours_spent } = req.body;

    if (progress_percentage === undefined && !status && !log_note) {
      return res.status(400).json({ error: 'Please specify progress percentage, status, or a worklog note.' });
    }

    const updatedTask = await db.updateTaskProgress(taskId, {
      progress_percentage: progress_percentage !== undefined ? parseInt(progress_percentage, 10) : undefined,
      status,
      log_note,
      hours_spent
    }, req.user);

    res.json({
      success: true,
      message: 'Task progress updated successfully.',
      task: updatedTask
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/tasks/:id/worklogs (View audit trail & work history of a task)
app.get('/api/tasks/:id/worklogs', authenticateToken, requireStaffOrAdmin, async (req, res) => {
  try {
    const taskId = req.params.id;
    const worklogs = await db.getTaskWorklogs(taskId);
    res.json({ success: true, worklogs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 3. LMS & COURSE CONTENT MODULE
// ==========================================

// GET /api/courses
app.get('/api/courses', async (req, res) => {
  try {
    const courses = await db.getCourses();
    res.json({ success: true, courses });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/courses/:id
app.get('/api/courses/:id', async (req, res) => {
  try {
    const courseId = req.params.id;
    const roll = req.query.roll || (req.user ? req.user.roll_number : null);
    const course = await db.getCourseWithModules(courseId, roll);

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json({ success: true, course });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/lms/progress (Student updates video completion or logs practice quiz attempt)
app.post('/api/lms/progress', authenticateToken, async (req, res) => {
  try {
    const { roll, courseId, moduleId, video_progress_percentage, practice_increment } = req.body;

    if (!roll || !courseId || !moduleId) {
      return res.status(400).json({ error: 'roll, courseId, and moduleId are required.' });
    }

    // IDOR Defense: Only allow verified owner or staff/admin
    const isStaffOrAdmin = req.user && ['admin', 'superadmin', 'employee'].includes(req.user.role);
    const isOwner = req.user && req.user.roll_number === roll;
    if (!isStaffOrAdmin && !isOwner) {
      return res.status(403).json({
        error: 'Forbidden: You cannot modify learning progress for another student account.',
        code: 'FORBIDDEN_PROGRESS_UPDATE'
      });
    }

    const result = await db.updateStudentModuleProgress({
      roll,
      courseId,
      moduleId,
      video_progress_percentage,
      practice_increment
    });

    res.json({ success: true, progress: result });
  } catch (err) {
    safeErrorResponse(res, 500, err, 'Failed to update student learning progress');
  }
});

// ==========================================
// 4. QUALIFIER ASSESSMENT & AUTO-EVALUATION
// ==========================================

// GET /api/exams
app.get('/api/exams', async (req, res) => {
  try {
    const exams = await db.getAllExamQuizzes();
    // Return sanitized quizzes (strip correct answers for student view if unauthenticated)
    res.json({ success: true, exams });
  } catch (err) {
    safeErrorResponse(res, 500, err, 'Failed to load examinations');
  }
});

// GET /api/exams/:quizCode
app.get('/api/exams/:quizCode', async (req, res) => {
  try {
    const quizCode = req.params.quizCode;
    const exam = await db.getExamQuizByCode(quizCode);

    if (!exam) {
      return res.status(404).json({ error: 'Qualifier Exam not found.' });
    }

    // For exam delivery, deliver questions without revealing correct_answer to the client
    const clientQuestions = exam.questions.map(({ correct_answer, explanation, ...q }) => q);

    res.json({
      success: true,
      exam: {
        ...exam,
        questions: clientQuestions
      }
    });
  } catch (err) {
    safeErrorResponse(res, 500, err, 'Failed to retrieve examination content');
  }
});

// POST /api/exams/submit (Auto-Evaluation Pipeline)
app.post('/api/exams/submit', authenticateToken, async (req, res) => {
  try {
    const { quizCode, roll, studentName, studentEmail, category, responses } = req.body;

    if (!quizCode || !roll || !responses) {
      return res.status(400).json({ error: 'quizCode, roll, and responses are required.' });
    }

    // IDOR & Impersonation Defense: Candidate must match authenticated user or be admin
    const isStaffOrAdmin = req.user && ['admin', 'superadmin', 'employee'].includes(req.user.role);
    const isOwner = req.user && req.user.roll_number === roll;
    if (!isStaffOrAdmin && !isOwner) {
      return res.status(403).json({
        error: 'Forbidden: You can only submit examination assessments under your verified account.',
        code: 'FORBIDDEN_EXAM_SUBMISSION'
      });
    }

    const evaluation = await db.autoEvaluateExamSubmission({
      quizCode,
      roll,
      studentName: studentName || req.user.name || 'Candidate',
      studentEmail: studentEmail || req.user.email || '',
      category: category || 'General',
      responses
    });

    res.json({
      success: true,
      message: 'Exam auto-evaluation completed successfully.',
      evaluation
    });
  } catch (err) {
    safeErrorResponse(res, 500, err, 'Failed to evaluate examination submission');
  }
});

// GET /api/exams/scores (Admin view candidate performance)
app.get('/api/exams/scores', authenticateToken, requireStaffOrAdmin, async (req, res) => {
  try {
    const { category, cutoffCleared } = req.query;
    const scores = await db.getExamScores({ category, cutoffCleared });
    res.json({ success: true, scores, count: scores.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 5. CUTOFF MANAGEMENT & SHORTLISTING
// ==========================================

// GET /api/cutoffs
app.get('/api/cutoffs', async (req, res) => {
  try {
    const cutoffs = await db.getCutoffs();
    res.json({ success: true, cutoffs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/cutoffs/:category (Admin updates cutoff percentage)
app.put('/api/cutoffs/:category', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const category = req.params.category;
    const { min_score_percentage } = req.body;

    if (min_score_percentage === undefined) {
      return res.status(400).json({ error: 'min_score_percentage is required.' });
    }

    const updated = await db.updateCutoff(category, min_score_percentage, req.user);
    res.json({
      success: true,
      message: `Cutoff threshold for ${category} updated to ${min_score_percentage}%.`,
      cutoffs: updated
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/cutoffs/shortlist
app.get('/api/cutoffs/shortlist', authenticateToken, requireStaffOrAdmin, async (req, res) => {
  try {
    const shortlisted = await db.getShortlistedCandidates();
    res.json({ success: true, shortlisted, count: shortlisted.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 6. ADMISSIONS & FEE MANAGEMENT MODULE
// ==========================================

// GET /api/students
app.get('/api/students', authenticateToken, requireStaffOrAdmin, async (req, res) => {
  try {
    const { page, limit, q, status, level, sortBy, sortOrder } = req.query;
    const result = await db.getStudents({
      page: parseInt(page || '1', 10),
      limit: parseInt(limit || '10', 10),
      q: q || '',
      status: status || 'ALL',
      level: level || 'ALL',
      sortBy: sortBy || 'submissionDate',
      sortOrder: sortOrder || 'desc'
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/students/:roll (Secured against unauthorized PII scraping and IDOR)
app.get('/api/students/:roll', authenticateToken, async (req, res) => {
  try {
    const targetRoll = req.params.roll;
    const isStaffOrAdmin = req.user && ['admin', 'superadmin', 'employee'].includes(req.user.role);
    const isOwner = req.user && req.user.roll_number === targetRoll;

    if (!isStaffOrAdmin && !isOwner) {
      return res.status(403).json({
        error: 'Forbidden: You do not have authorization to view this student application.',
        code: 'ACCESS_DENIED'
      });
    }

    const student = await db.getStudentByRoll(targetRoll);
    if (!student) {
      return res.status(404).json({ error: 'Student application not found' });
    }
    res.json({ student });
  } catch (err) {
    safeErrorResponse(res, 500, err, 'Failed to fetch student record');
  }
});

// POST /api/applications/verify
app.post('/api/applications/verify', authenticateToken, requireStaffOrAdmin, async (req, res) => {
  try {
    const { roll, status, rejectionReason } = req.body;
    if (!roll || !status) {
      return res.status(400).json({ error: 'roll and status are required' });
    }

    const updated = await db.updateVerification(roll, status, rejectionReason, req.user.name);
    res.json({ success: true, application: updated });
  } catch (err) {
    safeErrorResponse(res, 500, err, 'Failed to update application verification status');
  }
});

// POST /api/applications/payment-verify
app.post('/api/applications/payment-verify', authenticateToken, requireStaffOrAdmin, async (req, res) => {
  try {
    const { roll, paymentStatus, bankStatus, queryRemarks } = req.body;
    if (!roll || !paymentStatus) {
      return res.status(400).json({ error: 'roll and paymentStatus are required' });
    }

    const updated = await db.updatePayment(roll, paymentStatus, bankStatus, queryRemarks, req.user.name);
    res.json({ success: true, payment: updated });
  } catch (err) {
    safeErrorResponse(res, 500, err, 'Failed to verify payment record');
  }
});

// POST /api/payments/simulate-checkout (Secured mock gateway with role check)
app.post('/api/payments/simulate-checkout', authenticateToken, async (req, res) => {
  try {
    const { roll, amount, mode, bankName, category } = req.body;

    const isStaffOrAdmin = req.user && ['admin', 'superadmin', 'employee'].includes(req.user.role);
    const isOwner = req.user && req.user.roll_number === roll;

    if (roll && !isStaffOrAdmin && !isOwner) {
      return res.status(403).json({
        error: 'Forbidden: You cannot settle payments for another student account.',
        code: 'FORBIDDEN_PAYMENT'
      });
    }

    const safeBankName = typeof bankName === 'string' ? bankName.replace(/[^a-zA-Z0-9 ]/g, '').slice(0, 30) : 'SBI';
    const utr = `${safeBankName.slice(0, 4).toUpperCase()}${Math.floor(100000000000 + Math.random() * 900000000000)}`;
    const paymentRecord = {
      amount: Math.max(1, parseInt(amount || 1500, 10)),
      utr,
      mode: mode || 'UPI (Instant Clearing)',
      bank: safeBankName,
      date: new Date().toLocaleString(),
      status: 'Verified',
      bankStatus: 'Bank Settlement Confirmed (Simulated SBI MOPS Gateway)',
      queryRemarks: '',
      receiptName: `sbi_mops_receipt_${utr}.pdf`
    };

    if (roll) {
      await db.updatePayment(roll, 'Verified', paymentRecord.bankStatus, '', req.user.name || 'Mock Payment Gateway');
    }

    await db.logAudit({
      action: 'PAYMENT_GATEWAY_SETTLEMENT',
      entityType: 'PAYMENT',
      entityId: utr,
      actorRole: req.user.role || 'Student',
      actorName: req.user.name || 'Candidate',
      details: `Simulated instant online settlement of INR ${paymentRecord.amount} for Roll: ${roll || 'GUEST'}. UTR: ${utr}.`
    });

    res.json({
      success: true,
      message: 'Payment completed and settled via SBI MOPS / Razorpay simulator.',
      payment: paymentRecord
    });
  } catch (err) {
    safeErrorResponse(res, 500, err, 'Payment settlement failed');
  }
});

// ==========================================
// 6. VISITOR LEADS & MANDATORY DROPDOWN GATING API
// ==========================================

// POST /api/visitor-info (Mandatory dropdown gating lead capture)
app.post(['/api/visitor-info', '/api/leads'], async (req, res) => {
  try {
    const { fullName, email, mobileNumber, userType, institution, targetDropdown, sessionId } = req.body;

    // Strict Server-Side Validation & Sanitization
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      return res.status(400).json({ success: false, error: 'Full Name must be at least 2 characters.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return res.status(400).json({ success: false, error: 'A valid email address is required.' });
    }

    const phoneDigits = String(mobileNumber || '').replace(/\D/g, '');
    if (!phoneDigits || phoneDigits.length < 7 || phoneDigits.length > 15) {
      return res.status(400).json({ success: false, error: 'A valid mobile number is required.' });
    }

    const allowedTypes = ['Student', 'Faculty', 'Staff', 'Alumni', 'Industry Professional', 'Other'];
    if (!userType || !allowedTypes.includes(userType.trim())) {
      return res.status(400).json({ success: false, error: 'Please select a valid User Type category.' });
    }

    if (!institution || typeof institution !== 'string' || institution.trim().length < 2) {
      return res.status(400).json({ success: false, error: 'Institution or Organization is required.' });
    }

    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    const userAgent = req.headers['user-agent'] || '';

    const savedLead = await db.saveVisitorLead({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      mobileNumber: phoneDigits,
      userType: userType.trim(),
      institution: institution.trim(),
      targetDropdown: String(targetDropdown || '').trim(),
      sessionId: String(sessionId || '').trim(),
      ipAddress,
      userAgent
    });

    res.status(200).json({
      success: true,
      message: 'Visitor information recorded successfully.',
      lead: {
        id: savedLead.id,
        fullName: savedLead.full_name,
        email: savedLead.email,
        userType: savedLead.user_type,
        institution: savedLead.institution,
        createdAt: savedLead.created_at
      }
    });
  } catch (err) {
    console.error('Error saving visitor lead:', err);
    res.status(500).json({
      success: false,
      error: 'An internal server error occurred while saving information. Please try again.'
    });
  }
});

// GET /api/visitor-info (Staff/Admin access only)
app.get('/api/visitor-info', authenticateToken, requireStaffOrAdmin, async (req, res) => {
  try {
    const leads = await db.getVisitorLeads();
    res.json({ success: true, count: leads.length, leads });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==========================================
// 6.5 SECURE AI ASSISTANT BACKEND ENDPOINT (/api/ai-chat)
// ==========================================

const KGP_PROGRAM_SYSTEM_PROMPT = `You are the official IIT Kharagpur AI Admissions Assistant for the Bachelor of Science (B.S.) in Data Science and Artificial Intelligence.
Rules:
1. Only answer based on verified official facts for IIT Kharagpur's B.S. in Data Science & AI.
2. Program details: Approved by the Senate of IIT Kharagpur; 4-Year B.S. Honours degree with NEP 2020 multi-exit options (Foundation Certificate at Level 1, Diploma at Level 2, B.Sc. at Level 3, full B.S. with 8-month research thesis at Level 4).
3. Universal Entry: Qualifier Exam (45-min CBT, 40% cutoff, 4 subjects: Math for DS & AI, Stats & Probability, Computational Thinking & Python, AI & ML).
4. Direct Entry (Bypasses Qualifier): Valid merit rank in WBJEE, JEE Advanced qualified candidates, Tripura JEE (TJEE) rank holders, and school/college teachers.
5. Fees: Qualifier Exam is ₹1,500 standard; ₹375 (75% waiver for family income < ₹1 LPA); ₹750 (50% waiver for ₹1-5 LPA or SC/ST/PwD). Foundation level is ₹32,000 (₹8,000 after 75% waiver).
6. Learning format: Bilingual delivery (concepts in Bangla, technical terms in English), English proficiency training, campus immersion at IIT Kharagpur, flexible online lectures with live faculty/TA doubt sessions, proctored examinations.
7. Official contact: bs-admissions@iitkgp.ac.in | Phone: +91 (03222) 282000 / 282022.
8. Guardrail: Do not invent unverified rules, fees, or exemptions. If verified data is unavailable, politely direct the candidate to contact the official desk.`;

function getVerifiedKnowledgeResponse(query) {
  const q = String(query || '').toLowerCase().trim();

  // 1. Direct Entry / WBJEE / JEE / TJEE
  if (q.includes('direct') || q.includes('wbjee') || q.includes('jee') || q.includes('tripura') || q.includes('tjee') || q.includes('teacher')) {
    return `### 🎓 Direct Entry Pathways (Bypassing Qualifier Exam)

Eligible candidates do **not** need to write the Qualifier Examination and receive direct admission into the **Foundation Level**:

* **WBJEE Merit Holders**: Any candidate holding a valid rank in the West Bengal Joint Entrance Examination.
* **IIT JEE Advanced Qualifiers**: Candidates who have qualified in JEE Advanced.
* **Tripura JEE (TJEE) Rank Holders**: Valid score & rank in Tripura JEE.
* **School & College Teachers**: Practicing educators seeking formal AI & DS credentials.

👉 Once document verification is completed, candidates in these categories are directly enrolled into Level 1 (Foundation)!`;
  }

  // 2. Qualifier Exam / Format / Cutoff / Syllabus
  if (q.includes('qualifier') || q.includes('exam') || q.includes('cbt') || q.includes('cutoff') || q.includes('cut off') || q.includes('pass mark') || q.includes('syllabus')) {
    return `### 🎯 Universal Qualifier Round Examination 2026

The **Qualifier Exam** is the universal gateway into the **B.S. in Data Science & AI** at IIT Kharagpur:

* **Format**: 45-Minute Computer-Based Test (CBT) covering **4 Core AI Sections**:
  1. *Mathematics for DS & AI* (Linear algebra, vector spaces, multivariable gradients)
  2. *Statistics & Probability for AI* (Bayesian probability, distributions, random variables)
  3. *Computational Thinking & Python for AI* (Algorithmic logic, data structures, list comprehensions)
  4. *Artificial Intelligence & Machine Learning* (Activation functions, loss functions, overfitting)
* **Cut-off**: Minimum **40% marks**. Scoring ≥ 40% grants **guaranteed unconditional admission** to Level 1!
* **Exam Mode**: Available via AI-proctored online test or at **115+ in-person test centers** across India.`;
  }

  // 3. Fees / Scholarships / Waivers
  if (q.includes('fee') || q.includes('cost') || q.includes('price') || q.includes('waiver') || q.includes('scholarship') || q.includes('concession') || q.includes('afford')) {
    return `### 💰 Fee Structure & Financial Scholarships

IIT Kharagpur provides income-based scholarships to ensure no deserving student is left behind:

* **Qualifier Examination Fee**:
  * Standard General Fee: **₹1,500**
  * With 75% Income Waiver (Family income < ₹1 LPA): **₹375 only**
  * With 50% Income Waiver (Family income ₹1 – 5 LPA): **₹750 only**
  * SC / ST / PwD Candidates: **50% concession** (₹750)
* **Tuition Fees by Level**:
  * **Foundation Level**: ₹32,000 standard (₹8,000 after 75% waiver)
  * **Diploma Level**: ₹47,250 per track
  * **Full 4-Year B.S. Degree**: ~₹3,15,000 total across 4 years
* **Financial Aid**: Over ₹24 Crores in scholarships distributed pan-India.`;
  }

  // 4. Eligibility / Who can apply / Age limit
  if (q.includes('eligib') || q.includes('who can apply') || q.includes('age') || q.includes('requirement') || q.includes('qualification') || q.includes('12th') || q.includes('math')) {
    return `### 📋 Eligibility Criteria

The **B.S. in Data Science and Artificial Intelligence** is open to students and working professionals nationwide:

* **Academic Requirement**: Completed Class 12 / Higher Secondary (10+2) with **Mathematics** as a subject (or equivalent qualification).
* **Age Limit**: **No upper age limit**. College students, working professionals, and career switchers are welcome.
* **Concurrent Degree**: You can pursue this online degree alongside an existing offline college degree or full-time employment.
* **Pathways**: Either qualify via the 40% Qualifier Exam cutoff OR apply through Direct Entry (WBJEE / JEE Advanced / TJEE).`;
  }

  // 5. Curriculum / Subjects / NEP Exit Awards / 4-Year BS Degree / Alumni
  if (q.includes('curriculum') || q.includes('subject') || q.includes('degree') || q.includes('level') || q.includes('alumni') || q.includes('thesis') || q.includes('nep') || q.includes('exit')) {
    return `### 🤖 Curriculum & Flexible Multi-Exit Options (NEP 2020)

Approved by the **Senate of IIT Kharagpur**, this degree is strictly focused on Data Science & Artificial Intelligence:

* **Level 1 — Foundation (32 Credits)**: Math for DS & AI, Probability & Statistics, Computational Thinking, Python Programming. *(Exit: Foundation Certificate)*
* **Level 2 — Diploma (54 Credits)**: Machine Learning, Deep Learning Architectures, Database & Big Data, AI App Dev. *(Exit: Diploma in DS & AI)*
* **Level 3 — B.Sc. Degree (114 Credits)**: Computer Vision, Natural Language Processing (NLP), Knowledge Graphs, MLOps. *(Exit: B.Sc. Degree)*
* **Level 4 — Flagship 4-Year B.S. (142 Credits)**: Generative AI & LLMs, Reinforcement Learning, AI Ethics, plus an **8-Month Research Thesis**.
* **Alumni Privilege**: 4-Year graduates receive **Official IIT Kharagpur Alumni Association Membership** and attend the formal in-person **Convocation on campus**!`;
  }

  // 6. Learning Format / Language / Campus Immersion
  if (q.includes('language') || q.includes('bengali') || q.includes('bangla') || q.includes('immersion') || q.includes('online') || q.includes('format') || q.includes('live') || q.includes('recorded')) {
    return `### 🏫 Learning Format & Academic Support

* **Bilingual Delivery**: Core theoretical concepts are explained in **Bangla (Bengali)** with technical nomenclature and notation in English.
* **English Proficiency**: Integrated modules to develop spoken and written academic English.
* **Hybrid Flexibility**: High-quality recorded lectures by IIT Kharagpur professors + weekly live interactive problem-solving tutorials.
* **Campus Immersion**: Opportunities to attend residential campus immersion sessions on IIT Kharagpur's historic 2,100-acre Kharagpur campus.
* **Placement & Internships**: Career mentoring, industry internships, and placement assistance starting from the Diploma level.`;
  }

  // 7. Contact / Helpdesk / Official Admissions Desk
  if (q.includes('contact') || q.includes('helpline') || q.includes('phone') || q.includes('email') || q.includes('address') || q.includes('office') || q.includes('support')) {
    return `### 📞 Official Admissions Helpdesk

For official queries, document verification, or administrative support, please contact the dedicated admissions team:

* **Helpline Phone**: +91 (03222) 282000 / 282022
* **Official Email**: bs-admissions@iitkgp.ac.in
* **Postal Address**: Center for Educational Technology, Indian Institute of Technology Kharagpur, Paschim Medinipur, West Bengal - 721302, India.`;
  }

  // Fallback with strict guardrail
  return `Thank you for asking! The **IIT Kharagpur B.S. in Data Science and Artificial Intelligence** is India's premier online undergraduate degree in AI.

Key areas you can ask about:
* **Direct Entry Pathways** (WBJEE, JEE Advanced, Tripura JEE, Teachers)
* **Qualifier Round Exam** (45-min CBT, 40% cutoff, 4 subjects)
* **Course Fees & Scholarships** (Up to 75% fee waivers based on income)
* **Eligibility Criteria** (Class 12 with Math, no age limit)
* **Curriculum & NEP 2020 Multi-Exit Options** (Certificate, Diploma, B.Sc., 4-Year B.S.)

*Note: Verified official information only. For specific unlisted queries, please reach out to the admissions office at **bs-admissions@iitkgp.ac.in**.*`;
}

// POST /api/ai-chat
app.post('/api/ai-chat', async (req, res) => {
  try {
    const { message, history, sessionId } = req.body || {};

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Question or message cannot be empty.'
      });
    }

    const cleanMessage = message.trim().slice(0, 1000);

    // 1. If an external LLM key is configured on the server, call the AI model securely
    const geminiKey = process.env.GEMINI_API_KEY;
    if (geminiKey) {
      try {
        const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: `${KGP_PROGRAM_SYSTEM_PROMPT}\n\nUser Question: ${cleanMessage}` }]
              }
            ],
            generationConfig: {
              temperature: 0.2,
              maxOutputTokens: 600
            }
          })
        });

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const aiReply = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (aiReply) {
            return res.json({
              success: true,
              reply: aiReply,
              mode: 'llm',
              timestamp: new Date().toISOString()
            });
          }
        }
      } catch (llmErr) {
        console.warn('External LLM call failed, falling back to verified knowledge engine:', llmErr.message);
      }
    }

    // 2. Verified IIT Kharagpur Knowledge Base Engine (Safe, instantaneous, grounded)
    const reply = getVerifiedKnowledgeResponse(cleanMessage);

    res.json({
      success: true,
      reply,
      mode: 'verified-knowledge-base',
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error('Error handling /api/ai-chat:', err);
    res.status(500).json({
      success: false,
      error: 'An internal server error occurred while processing your request. Please try again or contact bs-admissions@iitkgp.ac.in.'
    });
  }
});

// ==========================================
// 7. AUDIT LOGS & HEALTH
// ==========================================

// GET /api/audit-logs
app.get('/api/audit-logs', authenticateToken, requireStaffOrAdmin, async (req, res) => {
  try {
    const { page, limit, q } = req.query;
    const logs = await db.getAuditLogs({
      page: parseInt(page || '1', 10),
      limit: parseInt(limit || '20', 10),
      q: q || ''
    });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/health
app.get('/api/health', async (req, res) => {
  try {
    const totalStudents = await db.getTotalCount();
    const tasks = await db.getEmployeeTasks();
    const users = await db.getAllUsers();

    res.json({
      status: 'UP',
      timestamp: new Date().toISOString(),
      service: 'IIT Kharagpur BS Portal Enterprise ERP & LMS Server',
      database: db.isPg ? 'PostgreSQL Active (ACID Compliant)' : 'Local JSON/Memory Engine (Active Fallback)',
      rbac: 'Enabled (Multi-Tier: SuperAdmin, Admin, Employee, Student)',
      metrics: {
        totalStudents,
        totalStaffAndUsers: users.length,
        totalEmployeeTasks: tasks.length,
        uptimeSeconds: Math.floor(process.uptime()),
        memoryRssMb: Math.round(process.memoryUsage().rss / (1024 * 1024)),
        nodeVersion: process.version
      }
    });
  } catch (err) {
    res.status(500).json({ status: 'ERROR', error: err.message });
  }
});

// -------------------------------------------------------------
// 8. STATIC ASSET SERVING & SPA ROUTING (Full-Stack Support)
// -------------------------------------------------------------
const candidateDistDirs = [
  path.join(__dirname, 'dist'),
  path.join(__dirname, '../dist')
];
const distDir = candidateDistDirs.find(d => fs.existsSync(d));

if (distDir) {
  // Serve static assets with caching headers
  app.use(express.static(distDir, {
    maxAge: IS_PROD ? '1y' : 0,
    immutable: IS_PROD,
    index: false
  }));

  // SPA fallback for non-API GET requests
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) {
      return next();
    }
    const indexHtml = path.join(distDir, 'index.html');
    if (fs.existsSync(indexHtml)) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      return res.sendFile(indexHtml);
    }
    next();
  });
}

// 404 Fallback for unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found on this server.',
    code: 'ROUTE_NOT_FOUND'
  });
});

// Centralized Secure Error Handler (Suppresses stack traces & internal error details in production)
app.use((err, req, res, next) => {
  const status = err.status || 500;
  if (!IS_PROD) {
    console.error('Unhandled Application Exception:', err);
  }
  res.status(status).json({
    success: false,
    error: IS_PROD ? 'An unexpected server error occurred. Please contact the administrator.' : (err.message || 'Server error'),
    code: err.code || 'INTERNAL_SERVER_ERROR'
  });
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 IIT Kharagpur BS Portal Enterprise ERP Server`);
  console.log(`📡 Listening on http://localhost:${PORT}`);
  console.log(`🔒 Security: RBAC Multi-Tier JWT & bcrypt Active`);
  console.log(`📋 DB Mode: ${db.isPg ? 'PostgreSQL Relational' : 'Local Fallback'}`);
  console.log(`🛡️ Rate Limiting & Helmet Security Headers Active`);
  console.log(`=======================================================`);
});
