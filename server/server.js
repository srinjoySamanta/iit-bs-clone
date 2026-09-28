import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { db } from './db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'iitkgp_super_secret_jwt_key_2026';

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

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

// 1. Authenticate Token from Authorization Header or Query Param
function authenticateToken(req, res, next) {
  let token = null;
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else if (req.query && req.query.token) {
    token = req.query.token;
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

// 3. Require Student Owner or Administrator Role
function requireStudentOrAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  // Admins have universal read permissions
  if (req.user.role === 'admin' || req.user.role === 'superadmin') {
    return next();
  }

  // Regular students can only view their own student record
  const requestedRoll = req.params.roll;
  if (
    req.user.role === 'student' && 
    (req.user.roll === requestedRoll || req.user.roll_number === requestedRoll || req.user.id === requestedRoll)
  ) {
    return next();
  }

  return res.status(403).json({
    error: `Forbidden: Access denied. You are authenticated as student (${req.user.roll || req.user.email}) and cannot view application records of other students (${requestedRoll}).`,
    code: 'RECORD_ACCESS_FORBIDDEN'
  });
}

// ==========================================
// 1. AUTHENTICATION & LOGIN ENDPOINTS
// ==========================================

// Admin / Staff Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, username, identifier: idField, password } = req.body;
    const identifier = (email || username || idField || '').trim();

    if (!identifier || !password) {
      return res.status(400).json({ error: 'Administrator email/username and password are required.' });
    }

    const user = await db.getUserByEmailOrUsername(identifier);
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed. Administrator account not found.' });
    }

    const isMatch = bcrypt.compareSync(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Authentication failed. Invalid password.' });
    }

    // Generate signed JWT
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        name: user.name,
        designation: user.designation,
        roll: user.roll_number
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    await db.logAudit({
      action: 'ADMIN_LOGIN',
      entityType: 'USER',
      entityId: user.username,
      actorRole: user.role,
      actorName: user.name,
      details: `Successful administrator authentication for ${user.name} (${user.role}).`
    });

    res.json({
      message: 'Authentication successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        name: user.name,
        designation: user.designation,
        roll: user.roll_number
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Login service failed', details: err.message });
  }
});

// Student Token Generation (For testing student access vs 403 Forbidden)
app.post('/api/auth/student-token', async (req, res) => {
  try {
    const { roll, email } = req.body;
    if (!roll && !email) {
      return res.status(400).json({ error: 'Roll number or email required to generate student token.' });
    }

    const all = await db.getAllStudents();
    const student = all.find(s => 
      (roll && (s.roll === roll || s.id === roll)) || 
      (email && s.email.toLowerCase() === email.toLowerCase())
    );

    if (!student) {
      return res.status(404).json({ error: 'No matching student application found.' });
    }

    const token = jwt.sign(
      {
        id: student.id,
        role: 'student',
        roll: student.roll,
        email: student.email,
        name: student.name
      },
      JWT_SECRET,
      { expiresIn: '12h' }
    );

    res.json({
      message: 'Student session token generated successfully',
      token,
      role: 'student',
      student: {
        id: student.id,
        roll: student.roll,
        name: student.name,
        email: student.email
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate student token', details: err.message });
  }
});

// Verify Current User Session
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  res.json({ user: req.user });
});

// ==========================================
// 2. HEALTHCHECK & METRICS (PUBLIC)
// ==========================================
app.get('/api/health', async (req, res) => {
  try {
    const totalStudents = await db.getTotalCount();
    const memory = process.memoryUsage();
    res.json({
      status: 'UP',
      timestamp: new Date().toISOString(),
      service: 'IIT Kharagpur BS Portal Enterprise Backend',
      database: db.isPg ? 'PostgreSQL 16' : 'Local JSON/Memory Engine (Active Fallback)',
      rbac: 'Enabled (JWT + bcrypt)',
      metrics: {
        totalStudents,
        uptimeSeconds: Math.floor(process.uptime()),
        memoryRssMb: Math.round(memory.rss / (1024 * 1024)),
        nodeVersion: process.version
      }
    });
  } catch (err) {
    res.status(500).json({ status: 'ERROR', error: err.message });
  }
});

// ==========================================
// 3. STUDENTS ROSTER (STRICTLY ADMIN PROTECTED)
// ==========================================
// Requires valid Admin JWT token. Regular students receive 403 Forbidden.
app.get('/api/students', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10, q = '', status = 'ALL', level = 'ALL', sortBy = 'submissionDate', sortOrder = 'desc' } = req.query;
    const result = await db.getStudents({
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      q: String(q).trim(),
      status: String(status),
      level: String(level),
      sortBy: String(sortBy),
      sortOrder: String(sortOrder)
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve students roster', details: err.message });
  }
});

// ==========================================
// 4. ENTERPRISE CSV EXPORT (ADMIN PROTECTED)
// ==========================================
app.get('/api/students/export-csv', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const students = await db.getAllStudents();
    const headers = [
      'Application ID', 'Roll Number', 'Full Name', 'Email Address', 'Phone Number',
      'Academic Level', 'Admission Pathway', 'Category', 'Income Tier',
      'Application Status', 'Rejection Reason', 'Submission Date', 'Exam City',
      'Fee Amount', 'Payment UTR', 'Payment Mode', 'Bank Name', 'Payment Status', 'Bank Status', 'Query Remarks'
    ];

    const escapeCsv = (val) => {
      if (val === null || val === undefined) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows = students.map(s => [
      escapeCsv(s.id),
      escapeCsv(s.roll),
      escapeCsv(s.name),
      escapeCsv(s.email),
      escapeCsv(s.phone),
      escapeCsv(s.level),
      escapeCsv(s.pathway),
      escapeCsv(s.category),
      escapeCsv(s.incomeTier),
      escapeCsv(s.status),
      escapeCsv(s.rejectionReason),
      escapeCsv(s.submissionDate),
      escapeCsv(s.examCity),
      escapeCsv(s.payment?.amount || ''),
      escapeCsv(s.payment?.utr || ''),
      escapeCsv(s.payment?.mode || ''),
      escapeCsv(s.payment?.bank || ''),
      escapeCsv(s.payment?.status || ''),
      escapeCsv(s.payment?.bankStatus || ''),
      escapeCsv(s.payment?.queryRemarks || '')
    ].join(','));

    const csvOutput = [headers.join(','), ...rows].join('\r\n');

    await db.logAudit({
      action: 'EXPORT_CSV',
      entityType: 'STUDENTS_ROSTER',
      entityId: `EXPORT_${students.length}`,
      actorRole: req.user.role,
      actorName: req.user.name || 'Admissions Officer',
      details: `Exported ${students.length} student enrollment records to CSV.`
    });

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename=iit_kgp_students_roster_${new Date().toISOString().slice(0, 10)}.csv`);
    res.send(csvOutput);
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate CSV export', details: err.message });
  }
});

// Bulk Import (Admin Protected)
app.post('/api/students/bulk-import', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { students = [], csvText = '' } = req.body;
    const actor = req.user.name || 'Administrator';
    let listToImport = students;

    if (csvText && csvText.trim()) {
      const lines = csvText.trim().split(/\r?\n/);
      if (lines.length > 1) {
        const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
        listToImport = [];
        for (let i = 1; i < lines.length; i++) {
          const cols = lines[i].split(',').map(c => c.trim().replace(/^"|"$/g, ''));
          if (cols.length >= 3 && cols[0]) {
            const studentObj = {
              roll: cols[headers.indexOf('Roll')] || cols[headers.indexOf('Roll Number')] || cols[0],
              name: cols[headers.indexOf('Name')] || cols[headers.indexOf('Full Name')] || cols[1],
              email: cols[headers.indexOf('Email')] || cols[headers.indexOf('Email Address')] || cols[2],
              phone: cols[headers.indexOf('Phone')] || cols[headers.indexOf('Phone Number')] || cols[3] || '',
              level: cols[headers.indexOf('Level')] || cols[headers.indexOf('Academic Level')] || cols[4] || 'Foundation Level',
              category: cols[headers.indexOf('Category')] || cols[5] || 'General',
              status: cols[headers.indexOf('Status')] || cols[headers.indexOf('Application Status')] || cols[6] || 'Verified',
              payment: {
                amount: parseInt(cols[headers.indexOf('FeeAmount')] || cols[headers.indexOf('Fee Amount')] || cols[7] || '1500', 10),
                utr: cols[headers.indexOf('UTR')] || cols[headers.indexOf('Payment UTR')] || cols[8] || `UTR${Date.now()}`,
                status: cols[headers.indexOf('PaymentStatus')] || cols[headers.indexOf('Payment Status')] || cols[9] || 'Verified',
                bank: cols[headers.indexOf('Bank')] || cols[headers.indexOf('Bank Name')] || cols[10] || 'State Bank of India'
              }
            };
            listToImport.push(studentObj);
          }
        }
      }
    }

    if (!Array.isArray(listToImport) || listToImport.length === 0) {
      return res.status(400).json({ error: 'No valid student records provided for bulk import.' });
    }

    const result = await db.bulkImport(listToImport, actor);
    res.json({
      message: `Successfully bulk imported ${result.importedCount} student records.`,
      result
    });
  } catch (err) {
    res.status(500).json({ error: 'Bulk import failed', details: err.message });
  }
});

// Single student lookup: PROTECTED - Only student owner or Admin can view
app.get('/api/students/:roll', authenticateToken, requireStudentOrAdmin, async (req, res) => {
  try {
    const { roll } = req.params;
    const all = await db.getAllStudents();
    const student = all.find(s => s.roll === roll || s.id === roll);
    if (!student) {
      return res.status(404).json({ error: 'Student record not found' });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 5. STUDENT REGISTRATION (PUBLIC)
// ==========================================
app.post('/api/students', async (req, res) => {
  try {
    const studentData = req.body;
    if (!studentData.name || !studentData.email) {
      return res.status(400).json({ error: 'Student full name and email are mandatory.' });
    }

    const saved = await db.saveStudent(studentData, studentData.actor || 'Applicant Web Form');
    res.status(201).json({
      message: 'Student application successfully registered.',
      student: saved
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit application', details: err.message });
  }
});

// ==========================================
// 6. ADMIN VERIFICATION ACTIONS (ADMIN ONLY)
// ==========================================
app.patch('/api/students/:roll/verify', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { roll } = req.params;
    const { status, reason = '' } = req.body;
    const actor = req.user.name || 'Admissions Officer';

    if (!status || !['Verified', 'Rejected', 'Pending Review'].includes(status)) {
      return res.status(400).json({ error: "Status must be 'Verified', 'Rejected', or 'Pending Review'." });
    }

    const updated = await db.updateVerification(roll, status, reason, actor);
    res.json({
      message: `Application ${status} successfully.`,
      result: updated
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update verification status', details: err.message });
  }
});

app.patch('/api/students/:roll/payment', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { roll } = req.params;
    const { paymentStatus, bankStatus = '', queryRemarks = '' } = req.body;
    const actor = req.user.name || 'Accounts Desk';

    if (!paymentStatus || !['Verified', 'Query Raised', 'Rejected', 'Pending Review'].includes(paymentStatus)) {
      return res.status(400).json({ error: 'Invalid payment status provided.' });
    }

    const updated = await db.updatePayment(roll, paymentStatus, bankStatus, queryRemarks, actor);
    res.json({
      message: `Payment status updated to ${paymentStatus}.`,
      result: updated
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update payment status', details: err.message });
  }
});

// DELETE STUDENT RECORD (ADMIN ONLY)
app.delete('/api/students/:roll', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { roll } = req.params;
    const actor = req.user.name || 'Admissions Administrator';
    const result = await db.deleteStudent(roll, actor);

    if (!result.success) {
      return res.status(404).json({ error: result.error || 'Student not found' });
    }

    res.json({
      message: `Student application ${roll} permanently deleted.`,
      result
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete student record', details: err.message });
  }
});

// ==========================================
// 7. AUDIT LOGGING SYSTEM (ADMIN ONLY)
// ==========================================
app.get('/api/audit-logs', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 20, q = '' } = req.query;
    const result = await db.getAuditLogs({
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      q: String(q).trim()
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve audit logs', details: err.message });
  }
});

// ==========================================
// 8. MASS DUMMY DATA GENERATOR (ADMIN ONLY)
// ==========================================
app.post('/api/test/generate-dummy-students', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const count = parseInt(req.body.count || 50, 10);
    const actor = req.user.name || 'QA Test Automation';
    const result = await db.generateDummyStudents(count, actor);
    res.json({
      message: `Generated ${result.generatedCount} test dummy student records for pagination and performance verification.`,
      result
    });
  } catch (err) {
    res.status(500).json({ error: 'Dummy generation failed', details: err.message });
  }
});

// ==========================================
// 9. SERVE PRODUCTION FRONTEND BUILD
// ==========================================
const distPath = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distPath)) {
  console.log(`📁 Serving compiled static frontend from: ${distPath}`);
  app.use(express.static(distPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`====================================================`);
  console.log(`  IIT Kharagpur BS Portal Enterprise Backend Server`);
  console.log(`  Running on: http://localhost:${PORT}`);
  console.log(`  RBAC Security: Enabled (Admin JWT + bcrypt)`);
  console.log(`  Health API: http://localhost:${PORT}/api/health`);
  console.log(`  Login API:  http://localhost:${PORT}/api/auth/login`);
  console.log(`====================================================`);
});
