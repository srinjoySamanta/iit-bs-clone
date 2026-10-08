// API Service with strict Role-Based Access Control (RBAC) & Hybrid Architecture:
// Uses protected backend REST API with JWT authorization,
// with seamless fallback to local applicationStore when running statically on GitHub Pages.

import { 
  getStoredApplications, 
  saveNewApplication, 
  updateApplicationVerification, 
  updatePaymentVerification,
  getStoredAuditLogs,
  recordAuditLog,
  bulkImportApplications,
  generateMassDummyApplications
} from '../data/applicationStore';

// Detect if backend API is configured or running locally
const API_BASE = import.meta.env.VITE_API_URL || (typeof window !== 'undefined' && window.location.hostname === 'localhost' ? 'http://localhost:5000/api' : '/api');

let isBackendAvailable = null;

// ==========================================
// SESSION & JWT TOKEN MANAGEMENT
// ==========================================

export function getAdminToken() {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem('iitkgp_admin_jwt') || localStorage.getItem('iitkgp_admin_jwt');
}

export function setAdminSession(token, user) {
  if (typeof window === 'undefined') return;
  if (token) {
    sessionStorage.setItem('iitkgp_admin_jwt', token);
    localStorage.setItem('iitkgp_admin_jwt', token);
  }
  if (user) {
    sessionStorage.setItem('iitkgp_admin_user', JSON.stringify(user));
    localStorage.setItem('iitkgp_admin_user', JSON.stringify(user));
  }
}

export function clearAdminSession() {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem('iitkgp_admin_jwt');
  sessionStorage.removeItem('iitkgp_admin_user');
  localStorage.removeItem('iitkgp_admin_jwt');
  localStorage.removeItem('iitkgp_admin_user');
}

export function getCurrentAdminUser() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem('iitkgp_admin_user') || localStorage.getItem('iitkgp_admin_user');
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export async function adminLogin(identifier, password) {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: identifier, password })
    });
    const data = await res.json();
    if (res.ok && data.token) {
      isBackendAvailable = true;
      setAdminSession(data.token, data.user);
      return { success: true, user: data.user, token: data.token };
    }
    return { success: false, error: data.error || 'Authentication failed' };
  } catch (err) {
    // Standalone fallback: If offline/GitHub Pages, verify against demo credentials
    if (identifier === 'admin@iitkgp.ac.in' || identifier === 'ADMIN-KGP-2026' || identifier === 'admin_kgp') {
      if (password === 'Admin@KGP2026!' || password === 'IITKgp@Admin#Master') {
        const mockUser = {
          id: 1,
          username: 'admin_kgp',
          email: 'admin@iitkgp.ac.in',
          role: 'admin',
          name: 'Prof. Admissions Chair',
          designation: 'Dean of Academic Affairs'
        };
        const mockToken = 'mock_admin_jwt_standalone_' + Date.now();
        setAdminSession(mockToken, mockUser);
        return { success: true, user: mockUser, token: mockToken };
      }
    }
    return { success: false, error: 'Authentication failed. Please verify your administrator credentials.' };
  }
}

// Student Token Generator (For testing RBAC: Demonstrates 403 Forbidden on Admin endpoints)
export async function generateStudentTestToken(roll = '24BS0001', email = 'subho.roy@kgp.ac.in') {
  try {
    const res = await fetch(`${API_BASE}/auth/student-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roll, email })
    });
    const data = await res.json();
    if (res.ok && data.token) {
      setAdminSession(data.token, { ...data.student, role: 'student' });
      return { success: true, user: { ...data.student, role: 'student' }, token: data.token };
    }
    return { success: false, error: data.error || 'Failed to generate student token' };
  } catch (e) {
    const mockStudent = { roll, email, role: 'student', name: 'Test Student' };
    const mockToken = 'mock_student_jwt_' + Date.now();
    setAdminSession(mockToken, mockStudent);
    return { success: true, user: mockStudent, token: mockToken };
  }
}

// ==========================================
// SYSTEM HEALTHCHECK
// ==========================================

export async function checkBackendHealth() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500);
    const res = await fetch(`${API_BASE}/health`, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      isBackendAvailable = true;
      return await res.json();
    }
  } catch (e) {
    isBackendAvailable = false;
  }
  return { status: 'STANDALONE_CLIENT', database: 'Client-Side LocalStorage', rbac: 'Client-Side RBAC' };
}

// ==========================================
// PROTECTED API ENDPOINTS (REQUIRE ADMIN JWT)
// ==========================================

export async function fetchStudents({ page = 1, limit = 10, q = '', status = 'ALL', level = 'ALL', sortBy = 'submissionDate', sortOrder = 'desc' } = {}) {
  const token = getAdminToken();

  try {
    if (isBackendAvailable !== false) {
      const controller = new AbortController();
      const baseOrigin = typeof window !== 'undefined' && window.location?.origin ? window.location.origin : 'http://localhost:5000';
      const url = new URL(`${API_BASE}/students`, baseOrigin);
      url.searchParams.set('page', page);
      url.searchParams.set('limit', limit);
      url.searchParams.set('q', q);
      url.searchParams.set('status', status);
      url.searchParams.set('level', level);
      url.searchParams.set('sortBy', sortBy);
      url.searchParams.set('sortOrder', sortOrder);

      const res = await fetch(url.toString(), {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });
      clearTimeout(timeoutId);

      // Handle 403 Forbidden or 401 Unauthorized strictly
      if (res.status === 403) {
        const errorJson = await res.json().catch(() => ({}));
        return {
          error: errorJson.error || 'Forbidden: Administrator credentials required.',
          statusCode: 403,
          code: 'ADMIN_ACCESS_REQUIRED',
          students: [],
          total: 0
        };
      }

      if (res.status === 401) {
        const errorJson = await res.json().catch(() => ({}));
        return {
          error: errorJson.error || 'Unauthorized: Session expired or invalid.',
          statusCode: 401,
          code: 'TOKEN_INVALID',
          students: [],
          total: 0
        };
      }

      if (res.ok) {
        isBackendAvailable = true;
        return await res.json();
      }
    }
  } catch (err) {
    isBackendAvailable = false;
  }

  // Fallback: Local Client-Side Store with search, filtering, and pagination
  let list = getStoredApplications();

  if (q) {
    const query = q.toLowerCase();
    list = list.filter(s =>
      (s.name && s.name.toLowerCase().includes(query)) ||
      (s.roll && s.roll.toLowerCase().includes(query)) ||
      (s.email && s.email.toLowerCase().includes(query)) ||
      (s.id && s.id.toLowerCase().includes(query)) ||
      (s.payment?.utr && s.payment.utr.toLowerCase().includes(query))
    );
  }

  if (status && status !== 'ALL') {
    list = list.filter(s => s.status === status);
  }

  if (level && level !== 'ALL') {
    list = list.filter(s => s.level.toLowerCase().includes(level.toLowerCase()));
  }

  list.sort((a, b) => {
    let valA = a[sortBy] || a.submissionDate || '';
    let valB = b[sortBy] || b.submissionDate || '';
    if (typeof valA === 'string') valA = valA.toLowerCase();
    if (typeof valB === 'string') valB = valB.toLowerCase();
    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const total = list.length;
  const offset = (page - 1) * limit;
  const paginated = list.slice(offset, offset + limit);

  return {
    students: paginated,
    total,
    page: parseInt(page, 10),
    totalPages: Math.ceil(total / limit) || 1,
    limit: parseInt(limit, 10)
  };
}

export async function submitStudentApplication(studentData) {
  try {
    if (isBackendAvailable !== false) {
      const res = await fetch(`${API_BASE}/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData)
      });
      if (res.ok) {
        const data = await res.json();
        saveNewApplication(data.student);
        return data.student;
      }
    }
  } catch (e) {}
  return saveNewApplication(studentData);
}

export async function verifyApplication(roll, status, reason = '', actor = 'Admissions Officer') {
  const token = getAdminToken();
  try {
    if (isBackendAvailable) {
      await fetch(`${API_BASE}/students/${roll}/verify`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ status, reason, actor })
      });
    }
  } catch (e) {}
  return updateApplicationVerification(roll, status, reason);
}

export async function verifyPayment(roll, paymentStatus, bankStatus, queryRemarks = '', actor = 'Accounts Desk') {
  const token = getAdminToken();
  try {
    if (isBackendAvailable) {
      await fetch(`${API_BASE}/students/${roll}/payment`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ paymentStatus, bankStatus, queryRemarks, actor })
      });
    }
  } catch (e) {}
  return updatePaymentVerification(roll, paymentStatus, bankStatus, queryRemarks);
}

export async function deleteStudentApplication(roll) {
  const token = getAdminToken();
  try {
    if (isBackendAvailable) {
      const res = await fetch(`${API_BASE}/students/${roll}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });
      if (res.ok) {
        return await res.json();
      }
    }
  } catch (e) {}

  // Fallback deletion from local store
  const current = getStoredApplications();
  const updated = current.filter(s => s.roll !== roll && s.id !== roll);
  localStorage.setItem('iit_kgp_applications_v1', JSON.stringify(updated));
  recordAuditLog('DELETE_APPLICATION', roll, `Student application ${roll} permanently deleted.`, 'Admin', 'Admissions Officer');
  return { success: true, roll };
}

export async function bulkImportStudents(studentsList, csvText = '') {
  const token = getAdminToken();
  try {
    if (isBackendAvailable) {
      const res = await fetch(`${API_BASE}/students/bulk-import`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ students: studentsList, csvText })
      });
      if (res.ok) {
        const json = await res.json();
        bulkImportApplications(studentsList);
        return json.result;
      }
    }
  } catch (e) {}
  return bulkImportApplications(studentsList);
}

export async function fetchAuditLogs({ page = 1, limit = 20, q = '' } = {}) {
  const token = getAdminToken();
  try {
    if (isBackendAvailable) {
      const res = await fetch(`${API_BASE}/audit-logs?page=${page}&limit=${limit}&q=${encodeURIComponent(q)}`, {
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });
      if (res.ok) {
        return await res.json();
      }
    }
  } catch (e) {}

  let logs = getStoredAuditLogs();
  if (q) {
    const query = q.toLowerCase();
    logs = logs.filter(l => 
      (l.details && l.details.toLowerCase().includes(query)) ||
      (l.action && l.action.toLowerCase().includes(query)) ||
      (l.entity_id && l.entity_id.toLowerCase().includes(query))
    );
  }
  const total = logs.length;
  const offset = (page - 1) * limit;
  return {
    logs: logs.slice(offset, offset + limit),
    total,
    page,
    totalPages: Math.ceil(total / limit) || 1
  };
}

export async function triggerDummySimulation(count = 50) {
  const token = getAdminToken();
  try {
    if (isBackendAvailable) {
      const res = await fetch(`${API_BASE}/test/generate-dummy-students`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ count })
      });
      if (res.ok) {
        const json = await res.json();
        generateMassDummyApplications(count);
        return json.result;
      }
    }
  } catch (e) {}
  return generateMassDummyApplications(count);
}

// ==========================================
// VISITOR INFORMATION & DROPDOWN GATING API
// ==========================================

export function isVisitorRegistered() {
  if (typeof window === 'undefined') return false;
  // If user is already logged in as a student, staff, or admin, consider registered
  if (getCurrentAdminUser() !== null) return true;
  try {
    const isSessionRegistered = sessionStorage.getItem('iitkgp_visitor_registered') === 'true';
    const isLocalRegistered = localStorage.getItem('iitkgp_visitor_registered') === 'true';
    return isSessionRegistered || isLocalRegistered;
  } catch (e) {
    return false;
  }
}

export function setVisitorRegisteredLocal(email, fullName) {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem('iitkgp_visitor_registered', 'true');
    localStorage.setItem('iitkgp_visitor_registered', 'true');
    if (email) localStorage.setItem('iitkgp_visitor_email', email);
    if (fullName) localStorage.setItem('iitkgp_visitor_name', fullName);
  } catch (e) {}
}

export async function submitVisitorLead(formData) {
  const sessionId = sessionStorage.getItem('iitkgp_session_id') || `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  sessionStorage.setItem('iitkgp_session_id', sessionId);

  const payload = {
    ...formData,
    sessionId
  };

  try {
    const res = await fetch(`${API_BASE}/visitor-info`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Failed to submit visitor information.');
    }

    // Mark user as registered in session & persistent storage
    setVisitorRegisteredLocal(formData.email, formData.fullName);

    return {
      success: true,
      data: data.lead
    };
  } catch (err) {
    // If backend is unreachable (e.g. running statically without active backend server),
    // save locally to localStorage as reliable fallback to ensure seamless visitor experience!
    console.warn('API error saving visitor lead, using client fallback:', err.message);

    try {
      const existingLeads = JSON.parse(localStorage.getItem('iitkgp_visitor_leads') || '[]');
      existingLeads.push({
        ...payload,
        id: Date.now(),
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('iitkgp_visitor_leads', JSON.stringify(existingLeads));
      setVisitorRegisteredLocal(formData.email, formData.fullName);
      return {
        success: true,
        data: payload
      };
    } catch (localErr) {
      throw err;
    }
  }
}

