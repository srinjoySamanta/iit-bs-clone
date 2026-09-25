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
