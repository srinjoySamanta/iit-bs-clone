// API Service with seamless hybrid capability:
// Automatically uses backend REST API if server is reachable,
// or falls back gracefully to local applicationStore when running statically on GitHub Pages.

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
  return { status: 'STANDALONE_CLIENT', database: 'Client-Side LocalStorage' };
}

export async function fetchStudents({ page = 1, limit = 10, q = '', status = 'ALL', level = 'ALL', sortBy = 'submissionDate', sortOrder = 'desc' } = {}) {
  try {
    if (isBackendAvailable !== false) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      const url = new URL(`${API_BASE}/students`);
      url.searchParams.set('page', page);
      url.searchParams.set('limit', limit);
      url.searchParams.set('q', q);
      url.searchParams.set('status', status);
      url.searchParams.set('level', level);
      url.searchParams.set('sortBy', sortBy);
      url.searchParams.set('sortOrder', sortOrder);

      const res = await fetch(url.toString(), { signal: controller.signal });
      clearTimeout(timeoutId);
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
        // Also sync local store
        saveNewApplication(data.student);
        return data.student;
      }
    }
  } catch (e) {
    // Ignore and use local store
  }
  return saveNewApplication(studentData);
}

export async function verifyApplication(roll, status, reason = '', actor = 'Admissions Officer') {
  try {
    if (isBackendAvailable) {
      await fetch(`${API_BASE}/students/${roll}/verify`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, reason, actor })
      });
    }
  } catch (e) {}
  return updateApplicationVerification(roll, status, reason);
}

export async function verifyPayment(roll, paymentStatus, bankStatus, queryRemarks = '', actor = 'Accounts Desk') {
  try {
    if (isBackendAvailable) {
      await fetch(`${API_BASE}/students/${roll}/payment`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentStatus, bankStatus, queryRemarks, actor })
      });
    }
  } catch (e) {}
  return updatePaymentVerification(roll, paymentStatus, bankStatus, queryRemarks);
}

export async function bulkImportStudents(studentsList, csvText = '') {
  try {
    if (isBackendAvailable) {
      const res = await fetch(`${API_BASE}/students/bulk-import`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
  try {
    if (isBackendAvailable) {
      const res = await fetch(`${API_BASE}/audit-logs?page=${page}&limit=${limit}&q=${encodeURIComponent(q)}`);
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
  try {
    if (isBackendAvailable) {
      const res = await fetch(`${API_BASE}/test/generate-dummy-students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
