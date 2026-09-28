// Centralized Reactive Application & Payment Store for Student-Admin Sync
// Persisted in localStorage so changes made by Student or Admin reflect across the app

const STORAGE_KEY = 'iit_kgp_student_applications_v1';

export const INITIAL_APPLICATIONS = [
  {
    id: "KGP-2026-0841",
    roll: "24BS0001",
    name: "Subhashis Roy",
    email: "subho.roy@kgp.ac.in",
    phone: "+91 98301 11223",
    level: "Foundation Level",
    pathway: "Direct Entry: WBJEE Rank #412",
    category: "General",
    incomeTier: "< 1 LPA (75% Waiver)",
    status: "Verified",
    rejectionReason: "",
    submissionDate: "2026-09-22 10:15 AM",
    examCity: "Kolkata, West Bengal",
    docs: {
      genInfo: "Verified",
      education: "Verified (WBJEE Rank #412)",
      photo: "Verified",
      fee: "Verified"
    },
    payment: {
      amount: 375,
      utr: "SBI928410294821",
      mode: "UPI (Google Pay)",
      bank: "State Bank of India",
      date: "2026-09-22 10:20 AM",
      status: "Verified", // 'Verified' | 'Pending Review' | 'Query Raised' | 'Rejected'
      bankStatus: "Bank Settlement Confirmed",
      queryRemarks: "",
      receiptName: "sbi_upi_receipt_375.pdf"
    }
  },
  {
    id: "KGP-2026-0842",
    roll: "24BS0002",
    name: "Priyanka Sen",
    email: "priyanka.s@kgp.ac.in",
    phone: "+91 98312 44556",
    level: "Diploma in Data Science & AI",
    pathway: "Qualifier CBT (Score: 92.5%)",
    category: "OBC-NCL",
    incomeTier: "1 - 5 LPA (50% Waiver)",
    status: "Verified",
    rejectionReason: "",
    submissionDate: "2026-09-22 11:30 AM",
    examCity: "Kharagpur Main Campus",
    docs: {
      genInfo: "Verified",
      education: "Verified (Class 10 & 12)",
      photo: "Verified",
      fee: "Verified"
    },
    payment: {
      amount: 750,
      utr: "HDFC884102931102",
      mode: "UPI (PhonePe)",
      bank: "HDFC Bank",
      date: "2026-09-22 11:35 AM",
      status: "Verified",
      bankStatus: "Bank Settlement Confirmed",
      queryRemarks: "",
      receiptName: "hdfc_utr_receipt_750.pdf"
    }
  },
  {
    id: "KGP-2026-0843",
    roll: "24BS0003",
    name: "Debojyoti Ghosh",
    email: "debo.g@kgp.ac.in",
    phone: "+91 94330 77889",
    level: "Foundation Level",
    pathway: "Direct Entry: Tripura JEE Rank #84",
    category: "General",
    incomeTier: "> 5 LPA (Standard)",
    status: "Pending Review",
    rejectionReason: "",
    submissionDate: "2026-09-23 02:45 PM",
    examCity: "West Tripura (Agartala)",
    docs: {
      genInfo: "Verified",
      education: "Verified (Tripura JEE Card)",
      photo: "Verified",
      fee: "Pending Reconciliation"
    },
    payment: {
      amount: 1500,
      utr: "ICIC773019284102",
      mode: "Net Banking (ICICI)",
      bank: "ICICI Bank",
      date: "2026-09-23 02:50 PM",
      status: "Query Raised", // Transaction query example
      bankStatus: "UTR Discrepancy Flagged",
      queryRemarks: "UTR number ICIC773019284102 returned 'Transaction Failed' in clearing reconciliation. Student requested to provide updated debit statement.",
      receiptName: "icici_debit_ack.png"
    }
  },
  {
    id: "KGP-2026-0844",
    roll: "24BS0004",
    name: "Ananya Mukherjee",
    email: "ananya.m@kgp.ac.in",
    phone: "+91 98305 99001",
    level: "B.Sc. Degree Level",
    pathway: "Direct Entry: JEE Advanced Rank #3842",
    category: "General",
    incomeTier: "1 - 5 LPA (50% Waiver)",
    status: "Pending Review",
    rejectionReason: "",
    submissionDate: "2026-09-23 04:10 PM",
    examCity: "Kolkata Salt Lake",
    docs: {
      genInfo: "Verified",
      education: "Awaiting Rank Card Scrutiny",
      photo: "Verified",
      fee: "Under Review"
    },
    payment: {
      amount: 750,
      utr: "PAYTM994018274112",
      mode: "UPI (Paytm)",
      bank: "Paytm Payments Bank",
      date: "2026-09-23 04:15 PM",
      status: "Pending Review",
      bankStatus: "Awaiting Daily Clearing",
      queryRemarks: "",
      receiptName: "paytm_payment_750.png"
    }
  },
  {
    id: "KGP-2026-0845",
    roll: "24BS0005",
    name: "Rajesh Kumar Mandal",
    email: "rajesh.km@kgp.ac.in",
    phone: "+91 94340 22334",
    level: "Foundation Level",
    pathway: "Qualifier CBT (Score: 88.0%)",
    category: "SC",
    incomeTier: "< 1 LPA (75% Waiver)",
    status: "Verified",
    rejectionReason: "",
    submissionDate: "2026-09-23 05:20 PM",
    examCity: "Paschim Bardhaman (Asansol)",
    docs: {
      genInfo: "Verified",
      education: "Verified",
      photo: "Verified",
      fee: "Verified"
    },
    payment: {
      amount: 375,
      utr: "AXIS448102938192",
      mode: "UPI (BHIM)",
      bank: "Axis Bank",
      date: "2026-09-23 05:25 PM",
      status: "Verified",
      bankStatus: "Bank Settlement Confirmed",
      queryRemarks: "",
      receiptName: "axis_bhim_375.pdf"
    }
  },
  {
    id: "KGP-2026-0846",
    roll: "24BS0006",
    name: "Tanmay Singha",
    email: "tanmay.s@kgp.ac.in",
    phone: "+91 98320 88990",
    level: "Foundation Level",
    pathway: "Qualifier CBT (Score: 79.5%)",
    category: "EWS",
    incomeTier: "< 1 LPA (75% Waiver)",
    status: "Pending Review",
    rejectionReason: "",
    submissionDate: "2026-09-24 09:10 AM",
    examCity: "Siliguri & Jalpaiguri",
    docs: {
      genInfo: "Verified",
      education: "Verified",
      photo: "Verified",
      fee: "Query Raised"
    },
    payment: {
      amount: 375,
      utr: "SBI339102847119",
      mode: "UPI (Google Pay)",
      bank: "State Bank of India",
      date: "2026-09-24 09:15 AM",
      status: "Query Raised",
      bankStatus: "Underpaid Discrepancy",
      queryRemarks: "Candidate claimed 75% fee waiver (paid ₹375) but uploaded expired 2024 income certificate. Please upload current FY 2026 income certificate issued by SDO/DM or pay balance tariff.",
      receiptName: "gpay_screen_375.jpg"
    }
  }
];

// Load all applications from localStorage or initialize with defaults
export function getStoredApplications() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_APPLICATIONS));
      return INITIAL_APPLICATIONS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_APPLICATIONS));
      return INITIAL_APPLICATIONS;
    }
    return parsed;
  } catch (err) {
    console.error("Error reading stored applications:", err);
    return INITIAL_APPLICATIONS;
  }
}

// Save newly submitted student application (called when student finishes the form)
export function saveNewApplication(newApp) {
  try {
    const currentList = getStoredApplications();
    // Check if duplicate roll or email exists
    const filtered = currentList.filter(app => app.roll !== newApp.roll && app.id !== newApp.id);
    const updated = [newApp, ...filtered];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    // Save last applied student ID for easy tracking
    localStorage.setItem('iit_kgp_last_applied_roll', newApp.roll);
    localStorage.setItem('iit_kgp_last_applied_id', newApp.id);
    notifyStoreChange();
    return newApp;
  } catch (err) {
    console.error("Error saving new application:", err);
    return newApp;
  }
}

// Admin: Update overall application verification status (Verified / Rejected / Pending)
export function updateApplicationVerification(roll, newStatus, reason = '') {
  try {
    const list = getStoredApplications();
    const updated = list.map(app => {
      if (app.roll === roll || app.id === roll) {
        return {
          ...app,
          status: newStatus,
          rejectionReason: newStatus === 'Rejected' ? reason : '',
          docs: {
            ...app.docs,
            genInfo: newStatus === 'Verified' ? 'Verified' : app.docs.genInfo,
            education: newStatus === 'Verified' ? 'Verified' : app.docs.education
          }
        };
      }
      return app;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    notifyStoreChange();
    return updated;
  } catch (err) {
    console.error("Error updating application status:", err);
    return getStoredApplications();
  }
}

// Admin: Update payment verification and transaction issues
export function updatePaymentVerification(roll, paymentStatus, bankStatus, queryRemarks = '') {
  try {
    const list = getStoredApplications();
    const updated = list.map(app => {
      if (app.roll === roll || app.id === roll) {
        const isApproved = paymentStatus === 'Verified';
        return {
          ...app,
          status: isApproved && app.status !== 'Rejected' ? 'Verified' : app.status,
          docs: {
            ...app.docs,
            fee: paymentStatus
          },
          payment: {
            ...app.payment,
            status: paymentStatus,
            bankStatus: bankStatus || app.payment.bankStatus,
            queryRemarks: queryRemarks || ''
          }
        };
      }
      return app;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    notifyStoreChange();
    return updated;
  } catch (err) {
    console.error("Error updating payment verification:", err);
    return getStoredApplications();
  }
}

// Student: Resolve a transaction query by updating UTR and receipt
export function studentResolvePaymentQuery(roll, updatedUtr, updatedReceiptName = 'updated_bank_receipt.pdf') {
  try {
    const list = getStoredApplications();
    const updated = list.map(app => {
      if (app.roll === roll || app.id === roll) {
        return {
          ...app,
          payment: {
            ...app.payment,
            utr: updatedUtr,
            status: 'Pending Review',
            bankStatus: 'Re-submitted by Student for Verification',
            queryRemarks: 'Updated by student. Awaiting admin review.',
            receiptName: updatedReceiptName
          }
        };
      }
      return app;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    notifyStoreChange();
    return updated;
  } catch (err) {
    console.error("Error resolving payment query:", err);
    return getStoredApplications();
  }
}

// Custom event dispatcher for cross-component reactivity
function notifyStoreChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('iit_kgp_apps_updated'));
  }
}

// Subscribe to store updates
export function subscribeToStore(callback) {
  if (typeof window === 'undefined') return () => {};
  const handler = () => {
    callback(getStoredApplications());
  };
  window.addEventListener('iit_kgp_apps_updated', handler);
  window.addEventListener('storage', handler);
  return () => {
    window.removeEventListener('iit_kgp_apps_updated', handler);
    window.removeEventListener('storage', handler);
  };
}

// ========================================================
// ENTERPRISE EXTENSIONS: CSV IMPORT / EXPORT & AUDIT LOGS
// ========================================================

const AUDIT_STORAGE_KEY = 'iit_kgp_audit_logs_v1';

export function getStoredAuditLogs() {
  try {
    const raw = localStorage.getItem(AUDIT_STORAGE_KEY);
    if (!raw) {
      const initialLogs = [
        {
          id: 1,
          action: 'SYSTEM_BOOT',
          entity_type: 'DATABASE',
          entity_id: 'SYSTEM',
          actor_role: 'System',
          actor_name: 'IIT Kharagpur BS Portal',
          details: 'Application database initialized with verified student rosters.',
          timestamp: '2026-09-22 10:00 AM'
        }
      ];
      localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(initialLogs));
      return initialLogs;
    }
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

export function recordAuditLog(action, entityId, details, actorRole = 'Admin', actorName = 'Admissions Officer') {
  try {
    const logs = getStoredAuditLogs();
    const newLog = {
      id: Date.now(),
      action,
      entity_type: 'STUDENT',
      entity_id: entityId,
      actor_role: actorRole,
      actor_name: actorName,
      details,
      timestamp: new Date().toLocaleString()
    };
    const updated = [newLog, ...logs.slice(0, 499)]; // Keep latest 500
    localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(updated));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('iit_kgp_audit_updated'));
    }
    return updated;
  } catch (e) {
    console.error('Failed to record audit log:', e);
  }
}

export function subscribeToAuditLogs(callback) {
  if (typeof window === 'undefined') return () => {};
  const handler = () => callback(getStoredAuditLogs());
  window.addEventListener('iit_kgp_audit_updated', handler);
  return () => window.removeEventListener('iit_kgp_audit_updated', handler);
}

// Bulk Import Applications
export function bulkImportApplications(newStudents) {
  try {
    const current = getStoredApplications();
    const existingRolls = new Set(current.map(s => s.roll));
    const merged = [...current];

    let count = 0;
    for (const student of newStudents) {
      if (student.roll && !existingRolls.has(student.roll)) {
        merged.unshift(student);
        existingRolls.add(student.roll);
        count++;
      } else if (student.roll) {
        // Update existing
        const idx = merged.findIndex(s => s.roll === student.roll);
        if (idx >= 0) {
          merged[idx] = { ...merged[idx], ...student };
          count++;
        }
      }
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    recordAuditLog('BULK_IMPORT', `BATCH_${count}`, `Bulk imported ${count} student records via CSV/Excel upload.`);
    notifyStoreChange();
    return merged;
  } catch (e) {
    console.error('Error in bulk import:', e);
    return getStoredApplications();
  }
}

// Generate CSV string from list of students
export function exportStudentsToCSV(studentsList) {
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

  const rows = (studentsList || []).map(s => [
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

  recordAuditLog('EXPORT_CSV', `EXPORT_${studentsList.length}`, `Exported ${studentsList.length} student records to CSV.`);
  return [headers.join(','), ...rows].join('\r\n');
}

// Parse uploaded CSV string into student objects
export function parseCSVToStudents(csvText) {
  if (!csvText || !csvText.trim()) return [];
  const lines = csvText.trim().split(/\r?\n/);
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  const parsed = [];

  for (let i = 1; i < lines.length; i++) {
    // Basic CSV row split handling quotes
    const regex = /(?:^|,)(?:"([^"]*)"|([^,]*))/g;
    const cols = [];
    let match;
    while ((match = regex.exec(lines[i])) !== null) {
      cols.push(match[1] !== undefined ? match[1] : match[2]);
    }

    if (cols.length >= 3 && cols[0]) {
      const getVal = (headerName, fallbackIdx) => {
        const idx = headers.indexOf(headerName);
        return idx >= 0 && cols[idx] !== undefined ? cols[idx].trim() : (cols[fallbackIdx] || '').trim();
      };

      const roll = getVal('Roll Number', 1) || `24BS${Math.floor(10000 + Math.random() * 90000)}`;
      const name = getVal('Full Name', 2) || getVal('Name', 2);
      const email = getVal('Email Address', 3) || getVal('Email', 3);

      if (name && email) {
        parsed.push({
          id: getVal('Application ID', 0) || `KGP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
          roll,
          name,
          email,
          phone: getVal('Phone Number', 4) || '+91 98000 00000',
          level: getVal('Academic Level', 5) || 'Foundation Level',
          pathway: getVal('Admission Pathway', 6) || 'Direct Entry: WBJEE',
          category: getVal('Category', 7) || 'General',
          incomeTier: getVal('Income Tier', 8) || '> 5 LPA (Standard)',
          status: getVal('Application Status', 9) || 'Verified',
          rejectionReason: getVal('Rejection Reason', 10) || '',
          submissionDate: getVal('Submission Date', 11) || new Date().toLocaleString(),
          examCity: getVal('Exam City', 12) || 'Kolkata Salt Lake',
          docs: {
            genInfo: 'Verified',
            education: 'Verified',
            photo: 'Verified',
            fee: 'Verified'
          },
          payment: {
            amount: parseInt(getVal('Fee Amount', 13) || '1500', 10),
            utr: getVal('Payment UTR', 14) || `UTR${Date.now()}`,
            mode: getVal('Payment Mode', 15) || 'UPI (Online)',
            bank: getVal('Bank Name', 16) || 'State Bank of India',
            status: getVal('Payment Status', 17) || 'Verified',
            bankStatus: getVal('Bank Status', 18) || 'Bank Settlement Confirmed',
            queryRemarks: getVal('Query Remarks', 19) || ''
          }
        });
      }
    }
  }

  return parsed;
}

// Mass Dummy Student Generator for Local Testing
export function generateMassDummyApplications(count = 50) {
  const firstNames = ['Aarav', 'Ananya', 'Rohan', 'Sneha', 'Vikram', 'Pooja', 'Aditya', 'Riya', 'Rahul', 'Isha', 'Amit', 'Meera', 'Kunal', 'Shreya', 'Deepak', 'Sujata', 'Kalyan', 'Tanya', 'Sayan', 'Moumita'];
  const lastNames = ['Banerjee', 'Chatterjee', 'Das', 'Sen', 'Mukherjee', 'Ghosh', 'Roy', 'Dutta', 'Gupta', 'Sharma', 'Mondal', 'Chakraborty', 'Bose', 'Mitra'];
  const pathways = ['Qualifier CBT (Score: 85-98%)', 'Direct Entry: WBJEE', 'Direct Entry: JEE Advanced', 'Direct Entry: Tripura JEE'];
  const levels = ['Foundation Level', 'Diploma in Programming', 'Diploma in Data Science & AI', 'B.Sc. Degree Level', 'BS Degree Level'];
  const categories = ['General', 'OBC-NCL', 'SC', 'ST', 'EWS'];
  const incomeTiers = ['< 1 LPA (75% Waiver)', '1 - 5 LPA (50% Waiver)', '> 5 LPA (Standard)'];
  const cities = ['Kolkata Salt Lake', 'Kharagpur Main Campus', 'Bhubaneswar', 'Delhi NCR', 'Mumbai', 'Bangalore', 'Siliguri', 'Durgapur'];
  const banks = ['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Punjab National Bank', 'Axis Bank'];

  const generated = [];
  const baseRoll = 240000 + Math.floor(Math.random() * 50000);

  for (let i = 0; i < count; i++) {
    const fn = firstNames[Math.floor(Math.random() * firstNames.length)];
    const ln = lastNames[Math.floor(Math.random() * lastNames.length)];
    const roll = `24BS${baseRoll + i}`;
    const id = `KGP-2026-${1000 + (baseRoll % 9000) + i}`;
    const isVerified = Math.random() > 0.3;
    const status = isVerified ? 'Verified' : Math.random() > 0.5 ? 'Pending Review' : 'Query Raised';
    const income = incomeTiers[Math.floor(Math.random() * incomeTiers.length)];
    const amount = income.includes('75%') ? 375 : income.includes('50%') ? 750 : 1500;
    const bank = banks[Math.floor(Math.random() * banks.length)];

    generated.push({
      id,
      roll,
      name: `${fn} ${ln}`,
      email: `${fn.toLowerCase()}.${ln.toLowerCase()}${Math.floor(Math.random() * 999)}@gmail.com`,
      phone: `+91 ${Math.floor(6000000000 + Math.random() * 3999999999)}`,
      level: levels[Math.floor(Math.random() * levels.length)],
      pathway: pathways[Math.floor(Math.random() * pathways.length)],
      category: categories[Math.floor(Math.random() * categories.length)],
      incomeTier: income,
      status,
      rejectionReason: '',
      submissionDate: new Date(Date.now() - Math.floor(Math.random() * 7 * 86400000)).toLocaleString(),
      examCity: cities[Math.floor(Math.random() * cities.length)],
      docs: {
        genInfo: status === 'Verified' ? 'Verified' : 'Under Review',
        education: status === 'Verified' ? 'Verified' : 'Pending',
        photo: 'Verified',
        fee: status === 'Verified' ? 'Verified' : status === 'Query Raised' ? 'Query Raised' : 'Pending Review'
      },
      payment: {
        amount,
        utr: `${bank.slice(0, 4).toUpperCase()}${Math.floor(100000000000 + Math.random() * 900000000000)}`,
        mode: 'UPI (Online)',
        bank,
        date: new Date().toLocaleString(),
        status: status === 'Verified' ? 'Verified' : status === 'Query Raised' ? 'Query Raised' : 'Pending Review',
        bankStatus: status === 'Verified' ? 'Bank Settlement Confirmed' : status === 'Query Raised' ? 'Discrepancy Flagged' : 'Awaiting Settlement',
        queryRemarks: status === 'Query Raised' ? 'Simulated query: Verify category certificate validity.' : '',
        receiptName: `payment_proof_${roll}.pdf`
      }
    });
  }

  const current = getStoredApplications();
  const updated = [...generated, ...current];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  recordAuditLog('MASS_SIMULATION', `SIM_${count}`, `Generated ${count} test dummy student records for pagination and performance verification.`, 'System QA', 'Test Automation');
  notifyStoreChange();
  return updated;
}
