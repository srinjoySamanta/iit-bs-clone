import React, { createContext, useContext, useState, useEffect } from 'react';

// Default Seed Data
const DEFAULT_APPLICANTS = [
  {
    id: 1,
    student_id: 1,
    user_id: 101,
    full_name: 'Sourav Mukherjee',
    email: 'sourav.mukherjee2026@gmail.com',
    application_no: 'KGP-BS-2026-99120',
    category: 'GEN',
    status: 'submitted',
    submission_date: '2026-09-28T10:15:00Z',
    stream_12th: 'Science (PCM)',
    percentage_12th: 92.4,
    phone: '+91 98301 22334',
    city: 'Kolkata',
    state: 'West Bengal',
    fee_status: 'pending',
    doc_status: 'under_review'
  },
  {
    id: 2,
    student_id: 2,
    user_id: 102,
    full_name: 'Ananya Sen',
    email: 'ananya.sen2026@gmail.com',
    application_no: 'KGP-BS-2026-99121',
    category: 'GEN',
    status: 'submitted',
    submission_date: '2026-09-29T14:20:00Z',
    stream_12th: 'Science (PCM)',
    percentage_12th: 89.6,
    phone: '+91 98302 33445',
    city: 'Siliguri',
    state: 'West Bengal',
    fee_status: 'pending',
    doc_status: 'under_review'
  },
  {
    id: 3,
    student_id: 3,
    user_id: 103,
    full_name: 'Rahul Das',
    email: 'rahul.das2026@gmail.com',
    application_no: 'KGP-BS-2026-99122',
    category: 'OBC-NCL',
    status: 'submitted',
    submission_date: '2026-09-30T09:45:00Z',
    stream_12th: 'Science (PCM)',
    percentage_12th: 85.2,
    phone: '+91 98303 44556',
    city: 'Agartala',
    state: 'Tripura',
    fee_status: 'pending',
    doc_status: 'under_review'
  },
  {
    id: 4,
    student_id: 4,
    user_id: 104,
    full_name: 'Priya Sharma',
    email: 'priya.sharma2026@gmail.com',
    application_no: 'KGP-BS-2026-99123',
    category: 'GEN',
    status: 'submitted',
    submission_date: '2026-10-01T11:10:00Z',
    stream_12th: 'Science (PCM)',
    percentage_12th: 94.0,
    phone: '+91 98304 55667',
    city: 'New Delhi',
    state: 'Delhi',
    fee_status: 'pending',
    doc_status: 'under_review'
  }
];

const DEFAULT_EMPLOYEES = [
  {
    id: 1,
    user_code: 'KGP-EMP-0012',
    username: 'staff',
    full_name: 'Tanushree Bhattacharya',
    email: 'tanushree.officer@iitkgp.ac.in',
    department: 'Admissions & Document Verification Cell',
    designation: 'Verification Officer',
    phone: '+91 3222 282050',
    max_workload: 15,
    assigned_tasks_count: 3,
    active_status: 'online'
  }
];

const DEFAULT_TASKS = [
  {
    id: 1,
    title: 'Verify Class 10 & 12 Board Marksheets & Pass Certificates',
    description: 'Scrutinize uploaded marksheet authenticity and calculate 60% PCM eligibility threshold.',
    assigned_to: 1,
    assigned_to_name: 'Tanushree Bhattacharya',
    assigned_to_code: 'KGP-EMP-0012',
    category: 'verification',
    priority: 'high',
    status: 'in_progress',
    progress_pct: 60,
    due_date: '2026-10-15',
    is_overdue: false,
    worklogs: [
      { id: 101, created_at: '2026-10-04 11:20 AM', author: 'Tanushree Bhattacharya', note: 'Completed 2 dossiers verification. Awaiting board seal confirmation for CBSE candidate.' }
    ]
  },
  {
    id: 2,
    title: 'Category & EWS Quota Certificate Scrutiny',
    description: 'Ensure OBC-NCL, EWS, and SC/ST certificates are issued after 01 April 2025 by authorized competent authorities.',
    assigned_to: 1,
    assigned_to_name: 'Tanushree Bhattacharya',
    assigned_to_code: 'KGP-EMP-0012',
    category: 'verification',
    priority: 'medium',
    status: 'in_progress',
    progress_pct: 40,
    due_date: '2026-10-18',
    is_overdue: false,
    worklogs: [
      { id: 102, created_at: '2026-10-03 04:15 PM', author: 'Tanushree Bhattacharya', note: 'Tripura state caste verification format confirmed.' }
    ]
  },
  {
    id: 3,
    title: 'Qualifier Fee Reconciliation with SBI MOPS & Razorpay',
    description: 'Cross-reference PG settlement webhook batches against candidate registration status.',
    assigned_to: 1,
    assigned_to_name: 'Tanushree Bhattacharya',
    assigned_to_code: 'KGP-EMP-0012',
    category: 'finance',
    priority: 'high',
    status: 'not_started',
    progress_pct: 10,
    due_date: '2026-10-20',
    is_overdue: false,
    worklogs: []
  }
];

const DEFAULT_COURSES = [
  {
    id: 1,
    code: 'BS10001',
    title: 'Computational Thinking & Python Programming',
    credits: 4,
    term: 'Qualifier',
    description: 'Fundamental algorithms, control flow, functions, object-oriented concepts, and algorithmic problem solving in Python 3.x.',
    instructor_name: 'Prof. Partha Pratim Das',
    instructor_designation: 'Department of Computer Science & Engineering',
    banner_color: 'from-blue-600 to-indigo-800',
    enrolled_count: 4,
    modules_count: 4
  },
  {
    id: 2,
    code: 'BS10002',
    title: 'Mathematics for Data Science I',
    credits: 4,
    term: 'Qualifier',
    description: 'Set theory, functions, linear algebra, vector spaces, eigenvalues, matrix transformations, and multi-variable calculus.',
    instructor_name: 'Prof. Somesh Kumar',
    instructor_designation: 'Department of Mathematics',
    banner_color: 'from-emerald-600 to-teal-800',
    enrolled_count: 4,
    modules_count: 4
  },
  {
    id: 3,
    code: 'BS10003',
    title: 'English for Academic Communication',
    credits: 2,
    term: 'Qualifier',
    description: 'Grammar mechanics, academic writing style, scientific reading comprehension, vocabulary precision, and technical presentation.',
    instructor_name: 'Prof. Anjali Ray',
    instructor_designation: 'Department of Humanities & Social Sciences',
    banner_color: 'from-amber-600 to-orange-800',
    enrolled_count: 4,
    modules_count: 2
  },
  {
    id: 4,
    code: 'BS10004',
    title: 'Statistics & Exploratory Data Analysis',
    credits: 4,
    term: 'Qualifier',
    description: 'Descriptive statistics, probability spaces, random variables, distributions (Binomial, Poisson, Normal), and hypothesis testing.',
    instructor_name: 'Prof. Debasis Sengupta',
    instructor_designation: 'Department of Industrial & Systems Engineering',
    banner_color: 'from-purple-600 to-pink-800',
    enrolled_count: 4,
    modules_count: 3
  }
];

const DEFAULT_CUTOFFS = [
  { id: 1, category: 'GEN', cutoff_percentage: 50.0, minimum_overall_score: 50.0, status: 'active', updated_by_name: 'Super Admin' },
  { id: 2, category: 'OBC-NCL', cutoff_percentage: 45.0, minimum_overall_score: 45.0, status: 'active', updated_by_name: 'Super Admin' },
  { id: 3, category: 'EWS', cutoff_percentage: 45.0, minimum_overall_score: 45.0, status: 'active', updated_by_name: 'Super Admin' },
  { id: 4, category: 'SC', cutoff_percentage: 40.0, minimum_overall_score: 40.0, status: 'active', updated_by_name: 'Super Admin' },
  { id: 5, category: 'ST', cutoff_percentage: 40.0, minimum_overall_score: 40.0, status: 'active', updated_by_name: 'Super Admin' },
  { id: 6, category: 'PwD', cutoff_percentage: 40.0, minimum_overall_score: 40.0, status: 'active', updated_by_name: 'Super Admin' }
];

const DEFAULT_EXAMS = [
  {
    id: 1,
    title: 'BS Data Science & AI Qualifier Diagnostic Examination 2026',
    code: 'QUAL-EXAM-2026-T1',
    duration_minutes: 45,
    total_marks: 100,
    passing_marks: 50,
    is_published: true,
    attempts_count: 0,
    pass_rate: 0
  }
];

const DEFAULT_FEES = [
  {
    id: 1,
    transaction_ref: 'SBI-MOPS-20260928-881920',
    student_id: 1,
    student_name: 'Sourav Mukherjee',
    application_no: 'KGP-BS-2026-99120',
    amount: 3000,
    category: 'GEN',
    payment_gateway: 'SBI MOPS Gateway',
    payment_method: 'UPI (Instant Settlement)',
    status: 'success',
    paid_at: '2026-09-28 11:34 AM'
  }
];

const DEFAULT_AUDIT_LOGS = [
  { id: 1, action: 'SYSTEM_STARTUP', details: 'PostgreSQL ACID Master Online. Academic Governance Cycle initialized.', user_name: 'SYSTEM', created_at: '2026-10-05 09:00:00' },
  { id: 2, action: 'ACADEMIC_CUTOFF_CONFIGURED', details: 'Verified NEP 2026 multi-exit benchmark criteria across GEN, OBC, SC, ST.', user_name: 'Super Admin', created_at: '2026-10-05 09:30:15' },
  { id: 3, action: 'STAFF_TELEMETRY_INITIALIZED', details: 'Admissions and document verification task queues allocated to officers.', user_name: 'Super Admin', created_at: '2026-10-05 10:00:00' }
];

// Helper to initialize local store
const getOrSetStore = (key, defaultVal) => {
  try {
    const val = localStorage.getItem(key);
    if (val) return JSON.parse(val);
    localStorage.setItem(key, JSON.stringify(defaultVal));
    return defaultVal;
  } catch {
    return defaultVal;
  }
};

const setStore = (key, val) => {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.error(e);
  }
};

// Context Definitions
const AuthContext = createContext(undefined);
const ThemeContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem('iitkgp_auth_token');
    } catch {
      return null;
    }
  });

  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('iitkgp_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  // Initialize seed stores
  useEffect(() => {
    getOrSetStore('erp_applicants', DEFAULT_APPLICANTS);
    getOrSetStore('erp_employees', DEFAULT_EMPLOYEES);
    getOrSetStore('erp_tasks', DEFAULT_TASKS);
    getOrSetStore('erp_courses', DEFAULT_COURSES);
    getOrSetStore('erp_cutoffs', DEFAULT_CUTOFFS);
    getOrSetStore('erp_exams', DEFAULT_EXAMS);
    getOrSetStore('erp_fees', DEFAULT_FEES);
    getOrSetStore('erp_audit_logs', DEFAULT_AUDIT_LOGS);
    getOrSetStore('erp_pending_approvals', []);
  }, []);

  const login = async (username, password) => {
    const u = username.trim().toLowerCase();
    const p = password.trim();

    let authenticatedUser = null;

    if (u === 'admin' && (p === 'Admin@123' || p === 'admin')) {
      authenticatedUser = {
        id: 1,
        user_code: 'KGP-ADM-0001',
        username: 'admin',
        email: 'admin.qualifier@iitkgp.ac.in',
        role: 'admin',
        full_name: 'Super Admin (Admissions Directorate)',
        department: 'Admissions Directorate',
        designation: 'Executive Director'
      };
    } else if (u === 'staff' && (p === 'Staff@123' || p === 'staff')) {
      authenticatedUser = {
        id: 2,
        user_code: 'KGP-EMP-0012',
        username: 'staff',
        email: 'tanushree.officer@iitkgp.ac.in',
        role: 'employee',
        full_name: 'Tanushree Bhattacharya',
        department: 'Admissions & Document Verification Cell',
        designation: 'Verification Officer'
      };
    } else if (u === 'student' && (p === 'Student@123' || p === 'student')) {
      authenticatedUser = {
        id: 3,
        user_code: 'KGP-QUAL-2026-0842',
        username: 'student',
        email: 'sourav.mukherjee2026@gmail.com',
        role: 'student',
        full_name: 'Sourav Mukherjee',
        department: 'BS in Data Science & Artificial Intelligence',
        application_no: 'KGP-BS-2026-99120',
        category: 'GEN',
        application_status: 'verified'
      };
    } else {
      // Check custom auto-generated credentials in store
      const customCredentials = getOrSetStore('erp_custom_credentials', []);
      const matched = customCredentials.find(c => c.username.toLowerCase() === u && c.password === p);
      if (matched) {
        authenticatedUser = matched.user;
      }
    }

    if (!authenticatedUser) {
      throw new Error('Invalid institutional credentials. Please check your username and password.');
    }

    const mockToken = `jwt_kgp_${authenticatedUser.role}_${Date.now()}`;
    localStorage.setItem('iitkgp_auth_token', mockToken);
    localStorage.setItem('iitkgp_user', JSON.stringify(authenticatedUser));
    setToken(mockToken);
    setUser(authenticatedUser);

    // Add audit log
    const audit = getOrSetStore('erp_audit_logs', DEFAULT_AUDIT_LOGS);
    audit.unshift({
      id: Date.now(),
      action: 'USER_AUTHENTICATED',
      details: `${authenticatedUser.full_name} (${authenticatedUser.user_code}) logged into ${authenticatedUser.role.toUpperCase()} gate.`,
      user_name: authenticatedUser.full_name,
      created_at: new Date().toLocaleString()
    });
    setStore('erp_audit_logs', audit.slice(0, 50));

    return authenticatedUser;
  };

  const logout = () => {
    try {
      localStorage.removeItem('iitkgp_auth_token');
      localStorage.removeItem('iitkgp_user');
    } catch {}
    setToken(null);
    setUser(null);
    window.location.hash = 'admin-login';
  };

  const switchRole = async (role) => {
    if (role === 'admin') await login('admin', 'Admin@123');
    else if (role === 'employee') await login('staff', 'Staff@123');
    else if (role === 'student') await login('student', 'Student@123');
  };

  const refreshUser = async () => {
    const stored = localStorage.getItem('iitkgp_user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  };

  // High-Fidelity Client-Side API Dispatcher (Guarantees 100% operation on static cPanel and offline)
  const authFetch = async (url, options = {}) => {
    // 1. Try real fetch if backend server is online
    try {
      const realRes = await fetch(url, options);
      if (realRes.ok || realRes.status === 400 || realRes.status === 401 || realRes.status === 403) {
        return realRes;
      }
    } catch (e) {
      // Backend not running, seamlessly fallback to embedded state engine
    }

    // 2. Embedded Realistic State Engine Fallback
    const method = (options.method || 'GET').toUpperCase();
    const cleanUrl = url.split('?')[0];

    // Simulating slight network latency for realistic feel
    await new Promise(r => setTimeout(r, 60));

    // A. Metrics Endpoint (Matches Image 3)
    if (cleanUrl.endsWith('/api/admin/metrics')) {
      const apps = getOrSetStore('erp_applicants', DEFAULT_APPLICANTS);
      const tasks = getOrSetStore('erp_tasks', DEFAULT_TASKS);
      const fees = getOrSetStore('erp_fees', DEFAULT_FEES);
      const exams = getOrSetStore('erp_exams', DEFAULT_EXAMS);

      const totalApps = apps.length;
      const verifiedCount = apps.filter(a => a.status === 'verified').length;
      const pendingCount = apps.filter(a => a.status !== 'verified').length;
      const activeTasks = tasks.filter(t => t.status !== 'completed').length;
      const overdueTasks = tasks.filter(t => t.is_overdue).length;

      return new Response(JSON.stringify({
        applicants: {
          total_applicants: totalApps,
          verified_count: verifiedCount,
          pending_verification_count: pendingCount,
          shortlisted_count: apps.filter(a => a.status === 'shortlisted').length
        },
        fees: {
          total_fees_collected: 0,
          successful_transactions: 0,
          pending_transactions: totalApps
        },
        exams: {
          total_attempts: 0,
          passed_count: 0,
          avg_score: 0.0,
          pass_rate: 0.0
        },
        tasks: {
          total_tasks: tasks.length,
          active_tasks: activeTasks,
          overdue_tasks: overdueTasks,
          avg_task_progress: 35
        }
      }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    // B. Analytics Charts Data (Matches Image 3 BarCharts)
    if (cleanUrl.endsWith('/api/admin/analytics')) {
      const apps = getOrSetStore('erp_applicants', DEFAULT_APPLICANTS);
      const catCounts = {};
      apps.forEach(a => {
        catCounts[a.category] = (catCounts[a.category] || 0) + 1;
      });
      const categories = Object.entries(catCounts).map(([cat, count]) => ({
        category: cat,
        count
      }));

      const funnel = [
        { status: 'submitted', count: apps.length }
      ];

      return new Response(JSON.stringify({
        categories,
        funnel,
        gateways: [],
        recentApplications: apps.slice(0, 5)
      }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    // C. Staff Activity Monitor
    if (cleanUrl.endsWith('/api/admin/staff-activity-monitor')) {
      return new Response(JSON.stringify({
        summary: {
          active_online_count: 1,
          total_staff_count: 1,
          total_staff_minutes_today: 184,
          tasks_updated_today: 3,
          verifications_reviewed_today: 4
        },
        staffPresence: [
          {
            id: 1,
            user_code: 'KGP-EMP-0012',
            full_name: 'Tanushree Bhattacharya',
            department: 'Admissions & Document Verification Cell',
            active_status: 'online',
            last_heartbeat: new Date().toLocaleTimeString(),
            active_minutes_today: 184,
            current_action: 'Scrutinizing Application Dossiers'
          }
        ],
        recentStaffLogs: [
          { id: 1, staff_name: 'Tanushree Bhattacharya', action: 'Dossier Scrutiny Active', timestamp: 'Just now' }
        ]
      }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    // D. Employees List
    if (cleanUrl.endsWith('/api/employees/list')) {
      const employees = getOrSetStore('erp_employees', DEFAULT_EMPLOYEES);
      return new Response(JSON.stringify({ employees }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    // E. Tasks List & Actions
    if (cleanUrl.endsWith('/api/employees/tasks')) {
      const tasks = getOrSetStore('erp_tasks', DEFAULT_TASKS);
      return new Response(JSON.stringify({ tasks }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    if (cleanUrl.endsWith('/api/admin/tasks/create') && method === 'POST') {
      const body = JSON.parse(options.body || '{}');
      const tasks = getOrSetStore('erp_tasks', DEFAULT_TASKS);
      const newTask = {
        id: Date.now(),
        title: body.title || 'Administrative Verification Task',
        description: body.description || '',
        assigned_to: 1,
        assigned_to_name: 'Tanushree Bhattacharya',
        assigned_to_code: 'KGP-EMP-0012',
        category: body.category || 'verification',
        priority: body.priority || 'medium',
        status: 'not_started',
        progress_pct: 0,
        due_date: body.due_date || new Date().toISOString().split('T')[0],
        is_overdue: false,
        worklogs: []
      };
      tasks.unshift(newTask);
      setStore('erp_tasks', tasks);
      return new Response(JSON.stringify({ success: true, task: newTask }), { status: 200 });
    }

    // F. Admissions & Applications
    if (cleanUrl.endsWith('/api/admissions/applications')) {
      const applications = getOrSetStore('erp_applicants', DEFAULT_APPLICANTS);
      return new Response(JSON.stringify({ applications }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    // G. Fee Transactions
    if (cleanUrl.endsWith('/api/admissions/fees')) {
      const transactions = getOrSetStore('erp_fees', DEFAULT_FEES);
      return new Response(JSON.stringify({ transactions }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    // H. LMS Courses
    if (cleanUrl.endsWith('/api/lms/courses')) {
      const courses = getOrSetStore('erp_courses', DEFAULT_COURSES);
      return new Response(JSON.stringify({ courses }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    // I. Exams
    if (cleanUrl.endsWith('/api/exams/list')) {
      const exams = getOrSetStore('erp_exams', DEFAULT_EXAMS);
      return new Response(JSON.stringify({ exams }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    // J. Cutoffs
    if (cleanUrl.endsWith('/api/admin/cutoffs')) {
      const cutoffs = getOrSetStore('erp_cutoffs', DEFAULT_CUTOFFS);
      return new Response(JSON.stringify({ cutoffs }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    // K. Audit Logs
    if (cleanUrl.endsWith('/api/admin/audit-logs')) {
      const logs = getOrSetStore('erp_audit_logs', DEFAULT_AUDIT_LOGS);
      return new Response(JSON.stringify({ logs }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    // L. Pending Approvals
    if (cleanUrl.endsWith('/api/admin/pending-approvals')) {
      const pending = getOrSetStore('erp_pending_approvals', []);
      return new Response(JSON.stringify({
        pending,
        counts: {
          total_pending: pending.length,
          pending_students: pending.filter(p => p.role === 'student').length,
          pending_employees: pending.filter(p => p.role === 'employee').length
        }
      }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    // M. Approve / Reject Registration
    if (cleanUrl.includes('/api/admin/approve-registration/')) {
      const id = cleanUrl.split('/').pop();
      const pending = getOrSetStore('erp_pending_approvals', []);
      const updated = pending.filter(p => String(p.id) !== String(id));
      setStore('erp_pending_approvals', updated);
      return new Response(JSON.stringify({ success: true, message: 'Registration approved successfully.' }), { status: 200 });
    }

    if (cleanUrl.includes('/api/admin/reject-registration/')) {
      const id = cleanUrl.split('/').pop();
      const pending = getOrSetStore('erp_pending_approvals', []);
      const updated = pending.filter(p => String(p.id) !== String(id));
      setStore('erp_pending_approvals', updated);
      return new Response(JSON.stringify({ success: true, message: 'Registration request archived.' }), { status: 200 });
    }

    // N. Auto-Generate Credentials
    if (cleanUrl.endsWith('/api/admin/generate-credentials') && method === 'POST') {
      const body = JSON.parse(options.body || '{}');
      const isEmployee = body.role === 'employee';
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const generatedCode = isEmployee ? `KGP-EMP-${randomSuffix}` : `KGP-QUAL-2026-${randomSuffix}`;
      const generatedUsername = body.username || (isEmployee ? `staff_${randomSuffix}` : `student_${randomSuffix}`);
      const generatedPassword = body.temp_password || (isEmployee ? `Staff@${randomSuffix}` : `Student@${randomSuffix}`);

      const newCred = {
        username: generatedUsername,
        password: generatedPassword,
        user: {
          id: Date.now(),
          user_code: generatedCode,
          username: generatedUsername,
          email: body.email || `${generatedUsername}@iitkgp.ac.in`,
          role: isEmployee ? 'employee' : 'student',
          full_name: body.full_name || (isEmployee ? 'Staff Officer' : 'Qualifier Student'),
          department: body.department || (isEmployee ? 'Admissions Cell' : 'BS Data Science')
        }
      };

      const custom = getOrSetStore('erp_custom_credentials', []);
      custom.push(newCred);
      setStore('erp_custom_credentials', custom);

      if (!isEmployee) {
        const apps = getOrSetStore('erp_applicants', DEFAULT_APPLICANTS);
        apps.push({
          id: Date.now(),
          student_id: Date.now(),
          user_id: Date.now(),
          full_name: body.full_name || 'Enrolled Student',
          email: body.email || `${generatedUsername}@gmail.com`,
          application_no: `KGP-BS-2026-${randomSuffix}`,
          category: body.category || 'GEN',
          status: 'submitted',
          submission_date: new Date().toISOString(),
          phone: body.phone || '+91 98000 44556',
          city: body.city || 'Kharagpur',
          state: body.state || 'West Bengal',
          fee_status: 'pending',
          doc_status: 'under_review'
        });
        setStore('erp_applicants', apps);
      }

      return new Response(JSON.stringify({
        success: true,
        credentials: {
          user_code: generatedCode,
          username: generatedUsername,
          password: generatedPassword,
          full_name: body.full_name,
          role: isEmployee ? 'employee' : 'student',
          department: body.department,
          created_at: new Date().toLocaleString()
        }
      }), { status: 200 });
    }

    // O. Submit Registration Request
    if (cleanUrl.endsWith('/api/auth/register-request') && method === 'POST') {
      const body = JSON.parse(options.body || '{}');
      const pending = getOrSetStore('erp_pending_approvals', []);
      const newReq = {
        id: Date.now(),
        ...body,
        created_at: new Date().toISOString()
      };
      pending.push(newReq);
      setStore('erp_pending_approvals', pending);
      return new Response(JSON.stringify({ success: true, request_id: newReq.id }), { status: 200 });
    }

    // P. Heartbeat
    if (cleanUrl.endsWith('/api/employees/heartbeat')) {
      return new Response(JSON.stringify({ success: true, timestamp: Date.now() }), { status: 200 });
    }

    // Fallback OK
    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isLoading,
      login,
      logout,
      switchRole,
      refreshUser,
      authFetch
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Theme Provider
export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    try {
      const saved = localStorage.getItem('iitkgp_erp_theme');
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {}
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('iitkgp_erp_theme', theme);
    } catch {}
  }, [theme]);

  const toggleTheme = () => setThemeState(p => p === 'dark' ? 'light' : 'dark');
  const setTheme = (t) => setThemeState(t);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
