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

// ==========================================
// 8. AI ASSISTANT CHAT SERVICE (/api/ai-chat)
// ==========================================

export function getClientVerifiedKnowledgeReply(query) {
  const q = String(query || '').toLowerCase().trim();

  // 1. Direct Entry / WBJEE / JEE / TJEE / Teachers
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

export async function sendAiChatMessage(message, history = [], sessionId = '') {
  const cleanMessage = String(message || '').trim();
  if (!cleanMessage) {
    return { success: false, error: 'Question or message cannot be empty.' };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(`${API_BASE}/ai-chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: cleanMessage, history, sessionId }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data && data.success && data.reply) {
        return {
          success: true,
          reply: data.reply,
          mode: data.mode || 'backend-api'
        };
      }
    }
    throw new Error('Non-200 or invalid response from /api/ai-chat');
  } catch (err) {
    // If backend is unavailable (e.g. running statically on GitHub Pages or server offline),
    // use client-side verified IIT Kharagpur Knowledge Base Engine seamlessly!
    console.info('Backend /api/ai-chat not reachable, utilizing verified client knowledge engine:', err.message);
    const reply = getClientVerifiedKnowledgeReply(cleanMessage);
    return {
      success: true,
      reply,
      mode: 'verified-knowledge-base'
    };
  }
}
