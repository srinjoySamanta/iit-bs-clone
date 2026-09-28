import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, ShieldCheck, Search, Users, CheckCircle2, 
  XCircle, Filter, Download, ExternalLink, Key, Award, 
  FileText, Check, Clock, RefreshCw, Mail, Phone, 
  ChevronRight, ChevronLeft, Lock, Eye, AlertCircle, Database, Bell, 
  CreditCard, AlertTriangle, Send, QrCode, ThumbsUp, ThumbsDown,
  Upload, Sparkles, History, FileSpreadsheet
} from 'lucide-react';
import { IIT_KGP_INFO } from '../data/portalData';
import iitKgpLogo from '../assets/logo';
import { 
  getStoredApplications, 
  updateApplicationVerification, 
  updatePaymentVerification, 
  subscribeToStore,
  exportStudentsToCSV,
  parseCSVToStudents,
  getStoredAuditLogs,
  subscribeToAuditLogs
} from '../data/applicationStore';
import {
  bulkImportStudents,
  triggerDummySimulation
} from '../services/apiService';

export default function AdminPortalPage({ onBackToHome, onLogout, onOpenAdminModal }) {
  const [activeAdminTab, setActiveAdminTab] = useState('roster'); // 'roster' | 'payments' | 'audit'
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTrack, setFilterTrack] = useState('ALL');
  const [paymentFilter, setPaymentFilter] = useState('ALL');
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Pagination state
  const [rosterPage, setRosterPage] = useState(1);
  const [rosterPageSize, setRosterPageSize] = useState(10);
  const [paymentPage, setPaymentPage] = useState(1);
  const [paymentPageSize, setPaymentPageSize] = useState(10);
  const [auditPage, setAuditPage] = useState(1);
  const [auditPageSize, setAuditPageSize] = useState(10);

  // Audit Logs state
  const [auditLogs, setAuditLogs] = useState([]);
  const [auditSearch, setAuditSearch] = useState('');

  // Bulk Import state
  const [showImportModal, setShowImportModal] = useState(false);
  const [importCsvText, setImportCsvText] = useState('');
  const [importParsedPreview, setImportParsedPreview] = useState([]);
  const [importFileName, setImportFileName] = useState('');
  const [isImporting, setIsImporting] = useState(false);

  // Simulation loading state
  const [isSimulating, setIsSimulating] = useState(false);

  // Rejection modal / reason state
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('Eligibility criteria not met as per IIT KGP BS regulations.');

  // Transaction query modal / reason state
  const [showQueryModal, setShowQueryModal] = useState(false);
  const [selectedPresetQuery, setSelectedPresetQuery] = useState('UTR reference not found in daily bank settlement file');
  const [customQueryNote, setCustomQueryNote] = useState('');

  useEffect(() => {
    // Initial load from store
    const initialList = getStoredApplications();
    setStudents(initialList);
    if (initialList.length > 0) {
      setSelectedStudent(initialList[0]);
    }
    setAuditLogs(getStoredAuditLogs());

    // Subscribe to reactive store changes (e.g. when student re-submits a payment or applies)
    const unsubscribeStore = subscribeToStore((updatedList) => {
      setStudents(updatedList);
      if (selectedStudent) {
        const found = updatedList.find(s => s.roll === selectedStudent.roll || s.id === selectedStudent.id);
        if (found) setSelectedStudent(found);
      }
    });

    const unsubscribeAudit = subscribeToAuditLogs((updatedLogs) => {
      setAuditLogs(updatedLogs);
    });

    return () => {
      unsubscribeStore();
      unsubscribeAudit();
    };
  }, []);

  // Reset page when filters change
  useEffect(() => {
    setRosterPage(1);
  }, [searchTerm, filterTrack]);

  useEffect(() => {
    setPaymentPage(1);
  }, [searchTerm, paymentFilter]);

  useEffect(() => {
    setAuditPage(1);
  }, [auditSearch]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // ADMIN ACTION: Verify Application
  const handleApproveApplication = (roll) => {
    const updated = updateApplicationVerification(roll, 'Verified');
    setStudents(updated);
    showToast(`Application ${roll} has been officially VERIFIED & APPROVED ✓`);
  };

  // ADMIN ACTION: Reject Application
  const handleConfirmReject = () => {
    if (!selectedStudent) return;
    const updated = updateApplicationVerification(selectedStudent.roll, 'Rejected', rejectionReason);
    setStudents(updated);
    setShowRejectModal(false);
    showToast(`Application ${selectedStudent.roll} has been REJECTED with reason recorded.`);
  };

  // ADMIN ACTION: Verify Payment
  const handleApprovePayment = (roll) => {
    const updated = updatePaymentVerification(roll, 'Verified', 'Bank Settlement Confirmed', '');
    setStudents(updated);
    showToast(`Payment for Roll ${roll} VERIFIED & RECONCILED ✓`);
  };

  // ADMIN ACTION: Raise Payment Transaction Query / Flag Issue
  const handleConfirmPaymentQuery = () => {
    if (!selectedStudent) return;
    const finalRemarks = customQueryNote.trim() 
      ? `${selectedPresetQuery}: ${customQueryNote.trim()}`
      : selectedPresetQuery;

    const updated = updatePaymentVerification(
      selectedStudent.roll, 
      'Query Raised', 
      'UTR Discrepancy Flagged', 
      finalRemarks
    );
    setStudents(updated);
    setShowQueryModal(false);
    setCustomQueryNote('');
    showToast(`Payment Query flagged for ${selectedStudent.roll}. Student alerted in their status view.`);
  };

  // ADMIN ACTION: Reject Payment
  const handleRejectPayment = (roll) => {
    const updated = updatePaymentVerification(
      roll, 
      'Rejected', 
      'Payment Verification Failed', 
      'Invalid or fraudulent transaction proof submitted.'
    );
    setStudents(updated);
    showToast(`Payment rejected for Roll ${roll}.`);
  };

  // CSV EXPORT
  const handleExportCSV = () => {
    const exportData = filteredStudents.length > 0 ? filteredStudents : students;
    const csvContent = exportStudentsToCSV(exportData);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `IIT_KGP_BS_Students_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${exportData.length} student records to CSV! ✓`);
  };

  // CSV FILE SELECTION
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImportFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      setImportCsvText(text);
      const parsed = parseCSVToStudents(text);
      setImportParsedPreview(parsed);
    };
    reader.readAsText(file);
  };

  // CSV TEXTAREA PASTE
  const handleCsvTextChange = (text) => {
    setImportCsvText(text);
    const parsed = parseCSVToStudents(text);
    setImportParsedPreview(parsed);
  };

  // LOAD SAMPLE CSV TEMPLATE
  const handleLoadSampleCSV = () => {
    const sample = `Application ID,Roll Number,Full Name,Email Address,Phone Number,Academic Level,Admission Pathway,Category,Income Tier,Application Status,Rejection Reason,Submission Date,Exam City,Fee Amount,Payment UTR,Payment Mode,Bank Name,Payment Status,Bank Status,Query Remarks
KGP-2026-9011,24BS0081,"Aditi Sharma","aditi.s@gmail.com","+91 98765 43210","Foundation Level","Qualifier CBT (Score: 92.5%)","General","> 5 LPA (Standard)","Verified","","2026-09-28 10:00 AM","Kolkata Salt Lake",1500,"HDFC9988112233","UPI (Google Pay)","HDFC Bank","Verified","Bank Settlement Confirmed",""
KGP-2026-9012,24BS0082,"Rakesh Verma","rakesh.v@gmail.com","+91 98123 45678","Diploma in Programming","Direct Entry: WBJEE","OBC-NCL","1 - 5 LPA (50% Waiver)","Verified","","2026-09-28 10:15 AM","Kharagpur Main Campus",750,"SBI4455667788","Net Banking","State Bank of India","Verified","Bank Settlement Confirmed",""
KGP-2026-9013,24BS0083,"Meenakshi Sundaram","meenakshi.s@gmail.com","+91 97654 32109","BS Degree Level","Direct Entry: JEE Advanced","General","< 1 LPA (75% Waiver)","Pending Review","","2026-09-28 10:30 AM","Bangalore",375,"ICIC1122334455","UPI (BHIM)","ICICI Bank","Pending Review","Awaiting Settlement",""`;
    setImportCsvText(sample);
    const parsed = parseCSVToStudents(sample);
    setImportParsedPreview(parsed);
    setImportFileName('iit_kgp_sample_enrollment.csv');
  };

  // EXECUTE BULK IMPORT
  const handleExecuteImport = async () => {
    if (importParsedPreview.length === 0) {
      showToast("No valid student records found to import. Check CSV formatting.");
      return;
    }
    setIsImporting(true);
    try {
      await bulkImportStudents(importParsedPreview, importCsvText);
      const updated = getStoredApplications();
      setStudents(updated);
      setShowImportModal(false);
      setImportCsvText('');
      setImportParsedPreview([]);
      setImportFileName('');
      showToast(`Successfully bulk imported ${importParsedPreview.length} student records! ✓`);
    } catch (e) {
      showToast("Error during bulk import. Please check data format.");
    } finally {
      setIsImporting(false);
    }
  };

  // MASS DUMMY SIMULATION
  const handleSimulateStudents = async (count = 50) => {
    setIsSimulating(true);
    try {
      await triggerDummySimulation(count);
      const updated = getStoredApplications();
      setStudents(updated);
      showToast(`Generated & integrated ${count} test dummy student records! ✓`);
    } catch (e) {
      showToast("Simulation error occurred.");
    } finally {
      setIsSimulating(false);
    }
  };

  // Filter students for Roster Tab
  const filteredStudents = students.filter(s => {
    const matchesSearch = 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.roll.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.pathway.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.payment && s.payment.utr && s.payment.utr.toLowerCase().includes(searchTerm.toLowerCase()));

    if (filterTrack === 'ALL') return matchesSearch;
    if (filterTrack === 'FOUNDATION') return matchesSearch && s.level.includes('Foundation');
    if (filterTrack === 'DIPLOMA') return matchesSearch && s.level.includes('Diploma');
    if (filterTrack === 'DIRECT') return matchesSearch && (s.pathway.includes('Direct') || s.pathway.includes('WBJEE') || s.pathway.includes('JEE') || s.pathway.includes('Tripura'));
    if (filterTrack === 'WAIVER') return matchesSearch && s.incomeTier.includes('Waiver');
    if (filterTrack === 'PENDING') return matchesSearch && s.status === 'Pending Review';
    if (filterTrack === 'REJECTED') return matchesSearch && s.status === 'Rejected';
    return matchesSearch;
  });

  // Filter payments for Payments Tab
  const filteredPayments = students.filter(s => {
    const matchesSearch = 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.roll.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.payment && s.payment.utr && s.payment.utr.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!s.payment) return false;
    if (paymentFilter === 'ALL') return matchesSearch;
    if (paymentFilter === 'PENDING') return matchesSearch && s.payment.status === 'Pending Review';
    if (paymentFilter === 'QUERY') return matchesSearch && s.payment.status === 'Query Raised';
    if (paymentFilter === 'VERIFIED') return matchesSearch && s.payment.status === 'Verified';
    if (paymentFilter === 'REJECTED') return matchesSearch && s.payment.status === 'Rejected';
    return matchesSearch;
  });

  // Sliced for pagination:
  const rosterTotalPages = Math.ceil(filteredStudents.length / rosterPageSize) || 1;
  const paginatedStudents = filteredStudents.slice((rosterPage - 1) * rosterPageSize, rosterPage * rosterPageSize);

  const paymentTotalPages = Math.ceil(filteredPayments.length / paymentPageSize) || 1;
  const paginatedPayments = filteredPayments.slice((paymentPage - 1) * paymentPageSize, paymentPage * paymentPageSize);

  // Filtered audit logs
  const filteredAuditLogs = auditLogs.filter(log => {
    if (!auditSearch.trim()) return true;
    const q = auditSearch.toLowerCase();
    return (
      (log.action && log.action.toLowerCase().includes(q)) ||
      (log.entity_id && log.entity_id.toLowerCase().includes(q)) ||
      (log.actor_name && log.actor_name.toLowerCase().includes(q)) ||
      (log.details && log.details.toLowerCase().includes(q))
    );
  });
  const auditTotalPages = Math.ceil(filteredAuditLogs.length / auditPageSize) || 1;
  const paginatedAuditLogs = filteredAuditLogs.slice((auditPage - 1) * auditPageSize, auditPage * auditPageSize);

  // Helper: Pagination Footer
  const renderPaginationFooter = (currentPage, setPage, pageSize, setPageSize, totalItems) => {
    const totalPages = Math.ceil(totalItems / pageSize) || 1;
    const startIdx = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
    const endIdx = Math.min(currentPage * pageSize, totalItems);

    return (
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 bg-slate-950 border-t border-slate-800 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span>Showing</span>
          <span className="font-bold text-white">{startIdx}</span>
          <span>to</span>
          <span className="font-bold text-white">{endIdx}</span>
          <span>of</span>
          <span className="font-bold text-white">{totalItems}</span>
          <span>records</span>

          <span className="mx-2 text-slate-700">|</span>

          <label className="flex items-center gap-1.5 text-[11px]">
            <span>Page size:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              className="bg-slate-900 border border-slate-700 text-white rounded px-2 py-1 text-xs focus:outline-none focus:border-amber-400"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </label>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage(1)}
            disabled={currentPage === 1}
            className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-[11px] font-medium"
            title="First Page"
          >
            « First
          </button>
          <button
            onClick={() => setPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-[11px] font-medium"
            title="Previous Page"
          >
            ‹ Prev
          </button>
          <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold rounded text-xs font-mono">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage >= totalPages}
            className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-[11px] font-medium"
            title="Next Page"
          >
            Next ›
          </button>
          <button
            onClick={() => setPage(totalPages)}
            disabled={currentPage >= totalPages}
            className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-[11px] font-medium"
            title="Last Page"
          >
            Last »
          </button>
        </div>
      </div>
    );
  };

  // Aggregate stats
  const totalVerifiedCount = students.filter(s => s.status === 'Verified').length;
  const totalPendingCount = students.filter(s => s.status === 'Pending Review').length;
  const totalQueryCount = students.filter(s => s.payment && s.payment.status === 'Query Raised').length;
  const totalCollections = students.reduce((sum, s) => sum + (s.payment?.amount || 0), 0);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans selection:bg-amber-500 selection:text-white">
      
      {/* 1. INSTITUTIONAL TOP BAR */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur border-b border-slate-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          
          {/* Left: IIT KGP Administration Brand */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-white p-1 border border-amber-400 flex items-center justify-center overflow-hidden shadow">
              <img src={iitKgpLogo} alt="IIT Kharagpur" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                  Admin Information System
                </span>
                <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.2 rounded border border-amber-500/40">
                  Super Admin • Full Access
                </span>
              </div>
              <h1 className="text-sm sm:text-base font-bold font-serif-title text-white">
                {IIT_KGP_INFO.name} — Academic &amp; Payment Administration Console
              </h1>
            </div>
          </div>

          {/* Right Actions: Back to Home, Super-Admin Modal & Logout */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenAdminModal}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold transition"
            >
              <Key className="w-3.5 h-3.5" />
              <span>Full Admin Console</span>
            </button>

            <button
              onClick={onBackToHome}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Main Website</span>
            </button>

            {onLogout && (
              <button
                onClick={onLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/80 hover:bg-rose-900 border border-rose-500/40 text-rose-300 text-xs font-semibold transition cursor-pointer"
                title="End Staff Session"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            )}
          </div>

        </div>
      </header>

      {/* 2. SUB-HEADER / NOTIFICATION TOAST */}
      {toastMessage && (
        <div className="bg-emerald-900/90 border-b border-emerald-500 text-emerald-200 text-xs py-2 px-4 text-center font-semibold shadow-inner animate-in fade-in">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* 3. MAIN DASHBOARD CONTENT */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Top Summary Banner with Metric Cards */}
        <div className="bg-gradient-to-r from-slate-900 via-kgp-navy to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-full bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider mb-2 border border-emerald-500/40">
                <ShieldCheck className="w-3 h-3" />
                Admissions Directorate Control Hub
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif-title text-white">
                Student Applications &amp; Payment Reconciliation
              </h2>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Admissions officers have complete authority to verify biodata, review fee receipts, approve/reject candidates, and flag payment transaction queries in real time.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-shrink-0">
              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3.5 text-center">
                <div className="text-[10px] uppercase font-bold text-slate-400">Total Applicants</div>
                <div className="text-xl font-extrabold text-amber-400 font-mono mt-0.5">{students.length}</div>
              </div>
              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3.5 text-center">
                <div className="text-[10px] uppercase font-bold text-slate-400">Verified &amp; Approved</div>
                <div className="text-xl font-extrabold text-emerald-400 font-mono mt-0.5">{totalVerifiedCount}</div>
              </div>
              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3.5 text-center">
                <div className="text-[10px] uppercase font-bold text-slate-400">Payment Queries</div>
                <div className="text-xl font-extrabold text-rose-400 font-mono mt-0.5">{totalQueryCount}</div>
              </div>
              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3.5 text-center">
                <div className="text-[10px] uppercase font-bold text-slate-400">Total Tariffs Reconciled</div>
                <div className="text-xl font-extrabold text-amber-300 font-mono mt-0.5">₹{totalCollections.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. PRIMARY MODULE SWITCHER TABS & ACTION BUTTONS */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveAdminTab('roster')}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 ${
                activeAdminTab === 'roster'
                  ? 'bg-amber-500 text-slate-950 shadow-lg'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Master Student Roster ({students.length})</span>
            </button>

            <button
              onClick={() => setActiveAdminTab('payments')}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 ${
                activeAdminTab === 'payments'
                  ? 'bg-amber-500 text-slate-950 shadow-lg'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Payment Verification &amp; Queries</span>
              {totalQueryCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-extrabold animate-pulse">
                  {totalQueryCount} Issues
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveAdminTab('audit')}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 ${
                activeAdminTab === 'audit'
                  ? 'bg-amber-500 text-slate-950 shadow-lg'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <History className="w-4 h-4" />
              <span>Audit Trail &amp; System Logs ({auditLogs.length})</span>
            </button>
          </div>

          {/* Quick Enterprise Tools: Export CSV, Bulk Import CSV, Simulate 50 */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-400/50 text-slate-200 text-xs font-semibold transition flex items-center gap-1.5 shadow"
              title="Export all matching student records as CSV"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={() => setShowImportModal(true)}
              className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-emerald-400/50 text-slate-200 text-xs font-semibold transition flex items-center gap-1.5 shadow"
              title="Bulk import student roster from CSV / Excel"
            >
              <Upload className="w-3.5 h-3.5 text-emerald-400" />
              <span>Bulk Import (CSV)</span>
            </button>

            <button
              onClick={() => handleSimulateStudents(50)}
              disabled={isSimulating}
              className="px-3 py-2 rounded-xl bg-gradient-to-r from-indigo-900/60 to-purple-900/60 hover:from-indigo-800/80 hover:to-purple-800/80 border border-indigo-500/40 text-indigo-200 text-xs font-semibold transition flex items-center gap-1.5 shadow disabled:opacity-50"
              title="Generate 50 dummy student records to test large-cohort pagination & DB scale"
            >
              {isSimulating ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-300" />
              ) : (
                <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
              )}
              <span>{isSimulating ? 'Simulating...' : 'Simulate 50 Students'}</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: MASTER APPLICATIONS ROSTER (VERIFY / REJECT APPLICANTS)             */}
        {/* ========================================================================= */}
        {activeAdminTab === 'roster' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left 2 Columns: Table of Applicants */}
            <div className="lg:col-span-2 space-y-4">
              
              {/* Controls */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow space-y-3">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search applicant by name, roll, pathway, email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="text-[11px] text-slate-400 font-medium">
                    Showing <span className="font-bold text-white">{filteredStudents.length}</span> candidates
                  </div>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1">
                    <Filter className="w-3 h-3" /> Filter:
                  </span>
                  {[
                    { key: 'ALL', label: 'All Candidates' },
                    { key: 'PENDING', label: 'Pending Review' },
                    { key: 'DIRECT', label: 'Direct Entry (WBJEE/JEE)' },
                    { key: 'WAIVER', label: 'Fee Waiver (< 1 LPA)' },
                    { key: 'REJECTED', label: 'Rejected' }
                  ].map(pill => (
                    <button
                      key={pill.key}
                      onClick={() => setFilterTrack(pill.key)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                        filterTrack === pill.key
                          ? 'bg-amber-500 text-slate-950 shadow font-bold'
                          : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {pill.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Table */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950 text-slate-400 text-[11px] font-bold uppercase tracking-wider border-b border-slate-800">
                      <tr>
                        <th className="py-3 px-4">Roll No.</th>
                        <th className="py-3 px-4">Student &amp; Contact</th>
                        <th className="py-3 px-4">Track &amp; Pathway</th>
                        <th className="py-3 px-4">Fee Waiver Tier</th>
                        <th className="py-3 px-4 text-center">Status</th>
                        <th className="py-3 px-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 bg-slate-900/50">
                      {paginatedStudents.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-slate-500">
                            No student applications match your filter criteria.
                          </td>
                        </tr>
                      ) : (
                        paginatedStudents.map(student => {
                          const isSelected = selectedStudent && selectedStudent.roll === student.roll;
                          return (
                            <tr
                              key={student.roll}
                              onClick={() => setSelectedStudent(student)}
                              className={`cursor-pointer transition ${
                                isSelected ? 'bg-amber-500/10 border-l-4 border-amber-400' : 'hover:bg-slate-800/40'
                              }`}
                            >
                              <td className="py-3.5 px-4 font-mono font-bold text-amber-400">
                                {student.roll}
                              </td>
                              <td className="py-3.5 px-4">
                                <div className="font-bold text-white text-xs">{student.name}</div>
                                <div className="text-[11px] text-slate-400">{student.email}</div>
                              </td>
                              <td className="py-3.5 px-4">
                                <div className="text-slate-200 font-semibold text-[11px]">{student.level}</div>
                                <div className="text-[10px] text-amber-300 font-mono">{student.pathway}</div>
                              </td>
                              <td className="py-3.5 px-4">
                                <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                                  student.incomeTier.includes('75%')
                                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                                    : student.incomeTier.includes('50%')
                                      ? 'bg-amber-950 text-amber-300 border border-amber-500/30'
                                      : 'bg-slate-800 text-slate-300'
                                }`}>
                                  {student.incomeTier}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-center">
                                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold ${
                                  student.status === 'Verified'
                                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                    : student.status === 'Rejected'
                                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                }`}>
                                  {student.status === 'Verified' && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                                  {student.status === 'Rejected' && <XCircle className="w-3 h-3 text-rose-400" />}
                                  {student.status === 'Pending Review' && <Clock className="w-3 h-3 text-amber-400" />}
                                  <span>{student.status}</span>
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                                <div className="flex items-center justify-center gap-1.5">
                                  <button
                                    onClick={() => handleApproveApplication(student.roll)}
                                    className="p-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white transition"
                                    title="Approve Application"
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => {
                                      setSelectedStudent(student);
                                      setShowRejectModal(true);
                                    }}
                                    className="p-1.5 rounded-lg bg-rose-600/30 hover:bg-rose-600 text-rose-300 hover:text-white transition"
                                    title="Reject Application"
                                  >
                                    <XCircle className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Interactive Pagination Footer */}
                {renderPaginationFooter(rosterPage, setRosterPage, rosterPageSize, setRosterPageSize, filteredStudents.length)}
              </div>

            </div>

            {/* Right Column: Selected Candidate Inspector & Decision Actions */}
            <div className="space-y-4">
              {selectedStudent ? (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl sticky top-20 space-y-5">
                  
                  {/* Top card */}
                  <div className="pb-4 border-b border-slate-800 flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-base font-bold text-amber-400">
                          {selectedStudent.roll}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          selectedStudent.status === 'Verified' ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30' :
                          selectedStudent.status === 'Rejected' ? 'bg-rose-950 text-rose-300 border border-rose-500/30' :
                          'bg-amber-950 text-amber-300 border border-amber-500/30'
                        }`}>
                          {selectedStudent.status}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white font-serif-title mt-1">
                        {selectedStudent.name}
                      </h3>
                      <div className="text-xs text-slate-400">{selectedStudent.email} • {selectedStudent.phone}</div>
                    </div>
                  </div>

                  {/* Main Decision Buttons */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      onClick={() => handleApproveApplication(selectedStudent.roll)}
                      className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow transition flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Verify &amp; Approve</span>
                    </button>
                    <button
                      onClick={() => setShowRejectModal(true)}
                      className="py-2.5 px-3 bg-rose-700 hover:bg-rose-600 text-white font-bold rounded-xl shadow transition flex items-center justify-center gap-1.5"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Reject Application</span>
                    </button>
                  </div>

                  {/* Candidate Details */}
                  <div className="space-y-2.5 text-xs bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Enrolled Program:</span>
                      <span className="font-bold text-white">{selectedStudent.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Pathway:</span>
                      <span className="font-bold text-amber-300 text-right max-w-[180px]">{selectedStudent.pathway}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Category &amp; Concession:</span>
                      <span className="font-bold text-emerald-400">{selectedStudent.incomeTier}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Submission Date:</span>
                      <span className="font-mono text-slate-300">{selectedStudent.submissionDate}</span>
                    </div>
                  </div>

                  {/* Attached Documents */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 font-serif-title">
                      Uploaded Documents &amp; Scrutiny
                    </h4>
                    <div className="space-y-2 text-xs">
                      {Object.entries(selectedStudent.docs || {}).map(([key, val]) => (
                        <div key={key} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                          <span className="capitalize font-semibold text-slate-300">{key}:</span>
                          <span className="font-bold text-emerald-400">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              ) : (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center text-slate-400">
                  Select a candidate to view biodata.
                </div>
              )}
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: PAYMENT VERIFICATION & TRANSACTION QUERIES                          */}
        {/* ========================================================================= */}
        {activeAdminTab === 'payments' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left 2 Cols: Payments Table & Filter */}
            <div className="lg:col-span-2 space-y-4">
              
              {/* Payment Filters */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow space-y-3">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search payment by UTR, student name, or roll..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="text-[11px] text-slate-400 font-medium">
                    Showing <span className="font-bold text-white">{filteredPayments.length}</span> payment records
                  </div>
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1">
                    <Filter className="w-3 h-3" /> Status:
                  </span>
                  {[
                    { key: 'ALL', label: 'All Transactions' },
                    { key: 'PENDING', label: 'Pending Scrutiny' },
                    { key: 'QUERY', label: 'Queries / Issues' },
                    { key: 'VERIFIED', label: 'Verified & Settled' },
                    { key: 'REJECTED', label: 'Rejected' }
                  ].map(pill => (
                    <button
                      key={pill.key}
                      onClick={() => setPaymentFilter(pill.key)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                        paymentFilter === pill.key
                          ? 'bg-amber-500 text-slate-950 shadow font-bold'
                          : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {pill.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Transactions Table */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950 text-slate-400 text-[11px] font-bold uppercase tracking-wider border-b border-slate-800">
                      <tr>
                        <th className="py-3 px-4">Roll &amp; Name</th>
                        <th className="py-3 px-4">Amount &amp; Tier</th>
                        <th className="py-3 px-4">Transaction UTR</th>
                        <th className="py-3 px-4">Mode / Bank</th>
                        <th className="py-3 px-4 text-center">Payment Status</th>
                        <th className="py-3 px-4 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 bg-slate-900/50">
                      {paginatedPayments.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-slate-500">
                            No payment transactions match your search/filter criteria.
                          </td>
                        </tr>
                      ) : (
                        paginatedPayments.map(student => {
                          const isSelected = selectedStudent && selectedStudent.roll === student.roll;
                          const p = student.payment || {};
                          return (
                            <tr
                              key={student.roll}
                              onClick={() => setSelectedStudent(student)}
                              className={`cursor-pointer transition ${
                                isSelected ? 'bg-amber-500/10 border-l-4 border-amber-400' : 'hover:bg-slate-800/40'
                              }`}
                            >
                              <td className="py-3.5 px-4">
                                <div className="font-mono font-bold text-amber-400">{student.roll}</div>
                                <div className="font-semibold text-white text-xs">{student.name}</div>
                              </td>
                              <td className="py-3.5 px-4">
                                <div className="font-extrabold text-kgp-crimson text-sm">₹{p.amount}</div>
                                <div className="text-[10px] text-slate-400">{student.incomeTier}</div>
                              </td>
                              <td className="py-3.5 px-4 font-mono font-bold text-slate-200">
                                {p.utr || "N/A"}
                              </td>
                              <td className="py-3.5 px-4">
                                <div className="text-white font-medium">{p.mode}</div>
                                <div className="text-[10px] text-slate-400">{p.bank}</div>
                              </td>
                              <td className="py-3.5 px-4 text-center">
                                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold ${
                                  p.status === 'Verified'
                                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                    : p.status === 'Query Raised'
                                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                                      : p.status === 'Rejected'
                                        ? 'bg-red-950 text-red-300 border border-red-500/40'
                                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                }`}>
                                  {p.status === 'Verified' && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                                  {p.status === 'Query Raised' && <AlertTriangle className="w-3 h-3 text-rose-400" />}
                                  {p.status === 'Pending Review' && <Clock className="w-3 h-3 text-amber-400" />}
                                  <span>{p.status}</span>
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                                <button
                                  onClick={() => setSelectedStudent(student)}
                                  className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 font-bold text-[11px] transition flex items-center gap-1 mx-auto"
                                >
                                  <Eye className="w-3 h-3" />
                                  <span>Audit</span>
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Interactive Pagination Footer */}
                {renderPaginationFooter(paymentPage, setPaymentPage, paymentPageSize, setPaymentPageSize, filteredPayments.length)}
              </div>

            </div>

            {/* Right Column: Payment Scrutiny & Issue Query Dispatcher */}
            <div className="space-y-4">
              {selectedStudent && selectedStudent.payment ? (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl sticky top-20 space-y-5">
                  
                  {/* Header */}
                  <div className="pb-4 border-b border-slate-800">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-amber-400 font-bold text-sm">
                        {selectedStudent.roll}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                        {selectedStudent.payment.status}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white font-serif-title mt-1">
                      {selectedStudent.name}
                    </h3>
                    <div className="text-xs text-slate-400">Payment Reconciliation Audit</div>
                  </div>

                  {/* Payment Data Card */}
                  <div className="space-y-3 bg-slate-950/80 p-4 rounded-xl border border-slate-800 text-xs">
                    <div className="flex justify-between items-center border-b border-slate-800/80 pb-2">
                      <span className="text-slate-400">Tariff Amount:</span>
                      <span className="font-black text-kgp-crimson text-base">₹{selectedStudent.payment.amount}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-800/80 pb-2">
                      <span className="text-slate-400">Transaction ID (UTR):</span>
                      <span className="font-mono font-bold text-white">{selectedStudent.payment.utr}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-800/80 pb-2">
                      <span className="text-slate-400">Payment Channel:</span>
                      <span className="font-semibold text-slate-200">{selectedStudent.payment.mode}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-800/80 pb-2">
                      <span className="text-slate-400">Bank Settlement:</span>
                      <span className="font-semibold text-amber-300">{selectedStudent.payment.bankStatus}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Attached Receipt:</span>
                      <span className="font-mono text-emerald-400 flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5" />
                        <span>{selectedStudent.payment.receiptName || 'receipt.pdf'}</span>
                      </span>
                    </div>
                  </div>

                  {/* If there is an active query on this payment */}
                  {selectedStudent.payment.queryRemarks && (
                    <div className="p-3.5 bg-rose-950/50 border border-rose-500/40 rounded-xl space-y-1 text-xs">
                      <div className="font-bold text-rose-300 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-rose-400" />
                        <span>Current Active Payment Query:</span>
                      </div>
                      <p className="text-[11px] text-slate-300 pl-5 leading-relaxed">
                        {selectedStudent.payment.queryRemarks}
                      </p>
                    </div>
                  )}

                  {/* 3 ACTIONS: APPROVE / FLAG QUERY / REJECT */}
                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <button
                      onClick={() => handleApprovePayment(selectedStudent.roll)}
                      className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-2 shadow"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Approve Payment &amp; Settle Tariff</span>
                    </button>

                    <button
                      onClick={() => setShowQueryModal(true)}
                      className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded-xl text-xs transition flex items-center justify-center gap-2 shadow"
                    >
                      <AlertTriangle className="w-4 h-4" />
                      <span>Flag Transaction Query / Issue</span>
                    </button>

                    <button
                      onClick={() => handleRejectPayment(selectedStudent.roll)}
                      className="w-full py-2 bg-slate-800 hover:bg-rose-900/60 text-slate-300 hover:text-rose-300 font-semibold rounded-xl text-xs transition flex items-center justify-center gap-1.5"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Reject Payment Proof</span>
                    </button>
                  </div>

                </div>
              ) : (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center text-slate-400">
                  Select a transaction to audit payment.
                </div>
              )}
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: AUDIT TRAIL & SYSTEM SECURITY LOGS                                  */}
        {/* ========================================================================= */}
        {activeAdminTab === 'audit' && (
          <div className="space-y-4">
            {/* Search and Metric Header */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-96">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search audit trail by roll, action, administrator, details..."
                  value={auditSearch}
                  onChange={(e) => setAuditSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span>Total Audit Events: <strong className="text-amber-400 font-mono">{auditLogs.length}</strong></span>
                <span className="text-slate-700">|</span>
                <span className="bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded border border-emerald-500/20 font-mono text-[11px] font-bold">
                  Immutable Cryptographic Trail Active
                </span>
              </div>
            </div>

            {/* Audit Logs Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 text-[11px] font-bold uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">Timestamp</th>
                      <th className="py-3 px-4">Event Action</th>
                      <th className="py-3 px-4">Target Entity / Roll</th>
                      <th className="py-3 px-4">Responsible Actor</th>
                      <th className="py-3 px-4">Audit Details &amp; State Mutation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-900/50">
                    {paginatedAuditLogs.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-slate-500">
                          No audit trail events matched your query.
                        </td>
                      </tr>
                    ) : (
                      paginatedAuditLogs.map(log => {
                        const isVerified = (log.action || '').includes('VERIF') || (log.action || '').includes('APPROV');
                        const isQuery = (log.action || '').includes('QUERY') || (log.action || '').includes('FLAG');
                        const isReject = (log.action || '').includes('REJECT');
                        const isBulk = (log.action || '').includes('BULK') || (log.action || '').includes('IMPORT') || (log.action || '').includes('MASS') || (log.action || '').includes('SIM');

                        const badgeColor = isVerified
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : isQuery
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                            : isReject
                              ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                              : isBulk
                                ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
                                : 'bg-slate-800 text-slate-300 border-slate-700';

                        return (
                          <tr key={log.id || Math.random()} className="hover:bg-slate-800/40 transition">
                            <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                              {log.timestamp}
                            </td>
                            <td className="py-3.5 px-4">
                              <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold border ${badgeColor}`}>
                                {log.action}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 font-mono font-bold text-amber-400 whitespace-nowrap">
                              {log.entity_id || 'SYSTEM'}
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="font-semibold text-white text-xs">{log.actor_name || 'Administrator'}</div>
                              <div className="text-[10px] text-slate-400">{log.actor_role || 'Staff'}</div>
                            </td>
                            <td className="py-3.5 px-4 text-slate-300 max-w-md">
                              {log.details}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {renderPaginationFooter(auditPage, setAuditPage, auditPageSize, setAuditPageSize, filteredAuditLogs.length)}
            </div>
          </div>
        )}

      </main>

      {/* 5. MODAL: REJECT APPLICATION CONFIRMATION */}
      {showRejectModal && selectedStudent && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-2.5 text-rose-400">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-lg font-bold font-serif-title text-white">
                Reject Application: {selectedStudent.roll}
              </h3>
            </div>
            
            <p className="text-xs text-slate-300">
              Candidate: <strong>{selectedStudent.name}</strong> ({selectedStudent.email}). Please provide an official rejection reason for institutional records:
            </p>

            <textarea
              rows={3}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-rose-400"
              placeholder="Specify ground for rejection..."
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowRejectModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReject}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. MODAL: RAISE TRANSACTION QUERY / FLAG PAYMENT ISSUE */}
      {showQueryModal && selectedStudent && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-2.5 text-amber-400">
              <CreditCard className="w-6 h-6" />
              <h3 className="text-lg font-bold font-serif-title text-white">
                Flag Transaction Issue for {selectedStudent.roll}
              </h3>
            </div>
            
            <p className="text-xs text-slate-300">
              Candidate: <strong>{selectedStudent.name}</strong> | Amount Paid: <strong>₹{selectedStudent.payment?.amount}</strong> | UTR: <strong>{selectedStudent.payment?.utr}</strong>
            </p>

            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-slate-300">
                Select Common Scrutiny Ground:
              </label>
              <select
                value={selectedPresetQuery}
                onChange={(e) => setSelectedPresetQuery(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                <option value="UTR reference not found in daily bank settlement file">
                  UTR reference not found in bank settlement file
                </option>
                <option value="Payment amount mismatch: Subsidized fee paid without valid current income certificate">
                  Payment amount mismatch: Subsidized fee without valid income certificate
                </option>
                <option value="Bank receipt blurred or illegible; kindly provide official transaction passbook screenshot">
                  Bank receipt blurred or illegible; passbook statement required
                </option>
                <option value="Transaction timed out or reversed by clearing house">
                  Transaction timed out or reversed by clearing house
                </option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-slate-300">
                Custom Instructions to Student (Optional):
              </label>
              <textarea
                rows={3}
                value={customQueryNote}
                onChange={(e) => setCustomQueryNote(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                placeholder="e.g. Please re-enter 12-digit UTR from your bank SMS or attach clear PDF statement..."
              />
            </div>

            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-[11px] text-amber-300 flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>This query will immediately appear on the student's status dashboard with an option to update UTR.</span>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowQueryModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPaymentQuery}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black"
              >
                Submit Payment Query
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. MODAL: ENTERPRISE CSV BULK IMPORT */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-3xl p-6 sm:p-8 space-y-5 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-serif-title text-white">
                    Enterprise Student Bulk Import (CSV)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Ingest batches of student admission records, application status, and fee settlements at scale.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowImportModal(false)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Quick action buttons & sample loader */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-300 font-medium">Supported Columns: Roll, Name, Email, Level, Pathway, Fee, UTR</span>
              </div>
              <button
                onClick={handleLoadSampleCSV}
                className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Load Sample CSV Data</span>
              </button>
            </div>

            {/* File drop zone / select */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-300">
                Option A: Choose CSV File from Disk
              </label>
              <div className="relative border-2 border-dashed border-slate-700 hover:border-emerald-500/50 rounded-2xl p-4 text-center cursor-pointer transition bg-slate-950/40">
                <input
                  type="file"
                  accept=".csv,.txt"
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <div className="flex flex-col items-center justify-center gap-1">
                  <Upload className="w-6 h-6 text-slate-400 mb-1" />
                  <span className="text-xs font-semibold text-slate-200">
                    {importFileName ? `Selected: ${importFileName}` : 'Click or drag & drop a .csv file here'}
                  </span>
                  <span className="text-[10px] text-slate-500">Standard UTF-8 comma-separated format</span>
                </div>
              </div>
            </div>

            {/* Textarea paste option */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-300">
                Option B: Paste Raw CSV Text
              </label>
              <textarea
                rows={5}
                value={importCsvText}
                onChange={(e) => handleCsvTextChange(e.target.value)}
                placeholder="Application ID,Roll Number,Full Name,Email Address,Phone Number,Academic Level,Admission Pathway,Category,Income Tier,Application Status..."
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-300 focus:outline-none focus:border-emerald-400 placeholder-slate-600"
              />
            </div>

            {/* Live Preview Table */}
            {importParsedPreview.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Parsed Preview:</span>
                    <strong className="text-emerald-400 font-mono">{importParsedPreview.length}</strong> valid rows ready
                  </span>
                  <span className="text-[10px] text-slate-500">Showing first {Math.min(3, importParsedPreview.length)} records</span>
                </div>

                <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden text-[11px]">
                  <table className="w-full text-left">
                    <thead className="bg-slate-900 text-slate-400 font-bold border-b border-slate-800">
                      <tr>
                        <th className="py-2 px-3">Roll</th>
                        <th className="py-2 px-3">Name</th>
                        <th className="py-2 px-3">Level</th>
                        <th className="py-2 px-3">Amount</th>
                        <th className="py-2 px-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 font-mono">
                      {importParsedPreview.slice(0, 3).map((st, i) => (
                        <tr key={i} className="text-slate-300">
                          <td className="py-2 px-3 text-amber-400 font-bold">{st.roll}</td>
                          <td className="py-2 px-3 text-white font-sans">{st.name}</td>
                          <td className="py-2 px-3">{st.level}</td>
                          <td className="py-2 px-3 text-emerald-400 font-bold">₹{st.payment?.amount || 0}</td>
                          <td className="py-2 px-3">{st.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => setShowImportModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleExecuteImport}
                disabled={importParsedPreview.length === 0 || isImporting}
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition flex items-center gap-2 shadow disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isImporting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                <span>Import {importParsedPreview.length} Records</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
