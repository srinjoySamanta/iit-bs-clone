import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, ShieldCheck, Search, Users, CheckCircle2, 
  XCircle, Filter, Download, ExternalLink, Key, Award, 
  FileText, Check, Clock, RefreshCw, Mail, Phone, 
  ChevronRight, Lock, Eye, AlertCircle, Database, Bell, 
  CreditCard, AlertTriangle, Send, QrCode, ThumbsUp, ThumbsDown
} from 'lucide-react';
import { IIT_KGP_INFO } from '../data/portalData';
import iitKgpLogo from '../assets/logo';
import { 
  getStoredApplications, 
  updateApplicationVerification, 
  updatePaymentVerification, 
  subscribeToStore 
} from '../data/applicationStore';

export default function AdminPortalPage({ onBackToHome, onLogout, onOpenAdminModal }) {
  const [activeAdminTab, setActiveAdminTab] = useState('roster'); // 'roster' | 'payments'
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTrack, setFilterTrack] = useState('ALL');
  const [paymentFilter, setPaymentFilter] = useState('ALL');
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

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

    // Subscribe to reactive store changes (e.g. when student re-submits a payment or applies)
    const unsubscribe = subscribeToStore((updatedList) => {
      setStudents(updatedList);
      if (selectedStudent) {
        const found = updatedList.find(s => s.roll === selectedStudent.roll || s.id === selectedStudent.id);
        if (found) setSelectedStudent(found);
      }
    });

    return () => unsubscribe();
  }, []);

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

        {/* 4. PRIMARY MODULE SWITCHER TABS: [Applications Roster] vs [Payment Verification & Queries] */}
        <div className="flex flex-wrap items-center gap-3 border-b border-slate-800 pb-4">
          <button
            onClick={() => setActiveAdminTab('roster')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 ${
              activeAdminTab === 'roster'
                ? 'bg-amber-500 text-slate-950 shadow-lg'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Master Student Applications Roster ({students.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('payments')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 ${
              activeAdminTab === 'payments'
                ? 'bg-amber-500 text-slate-950 shadow-lg'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Payment Verification &amp; Transaction Queries</span>
            {totalQueryCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-extrabold animate-pulse">
                {totalQueryCount} Issues
              </span>
            )}
          </button>
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
                      {filteredStudents.map(student => {
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
                      })}
                    </tbody>
                  </table>
                </div>
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
                      {filteredPayments.map(student => {
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
                      })}
                    </tbody>
                  </table>
                </div>
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

    </div>
  );
}
