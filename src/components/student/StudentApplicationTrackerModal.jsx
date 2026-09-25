import React, { useState, useEffect } from 'react';
import { 
  X, Search, ShieldCheck, CheckCircle2, Clock, XCircle, 
  AlertTriangle, FileText, CreditCard, RefreshCw, Send, 
  ArrowRight, Download, ExternalLink, HelpCircle 
} from 'lucide-react';
import { getStoredApplications, studentResolvePaymentQuery, subscribeToStore } from '../../data/applicationStore';

export default function StudentApplicationTrackerModal({ isOpen, onClose, initialQuery = '' }) {
  const [queryInput, setQueryInput] = useState(initialQuery);
  const [searchedApp, setSearchedApp] = useState(null);
  const [correctedUtr, setCorrectedUtr] = useState('');
  const [receiptFile, setReceiptFile] = useState(null);
  const [toastMsg, setToastMsg] = useState('');
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    // Try last applied or initial query or default
    const lastRoll = localStorage.getItem('iit_kgp_last_applied_roll') || initialQuery || '24BS0003';
    setQueryInput(lastRoll);
    lookupApplication(lastRoll);

    const unsubscribe = subscribeToStore((allApps) => {
      if (searchedApp) {
        const found = allApps.find(a => a.roll === searchedApp.roll || a.id === searchedApp.id);
        if (found) setSearchedApp(found);
      }
    });
    return () => unsubscribe();
  }, [isOpen, initialQuery]);

  const lookupApplication = (searchTerm) => {
    if (!searchTerm || !searchTerm.trim()) return;
    const term = searchTerm.trim().toLowerCase();
    const all = getStoredApplications();
    const match = all.find(a => 
      a.roll.toLowerCase() === term || 
      a.id.toLowerCase() === term || 
      a.email.toLowerCase() === term ||
      a.phone.replace(/[\s+-]/g, '').includes(term.replace(/[\s+-]/g, ''))
    );

    if (match) {
      setSearchedApp(match);
      setCorrectedUtr(match.payment?.utr || '');
      setNotFound(false);
    } else {
      setSearchedApp(null);
      setNotFound(true);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    lookupApplication(queryInput);
  };

  const handleResolveSubmit = (e) => {
    e.preventDefault();
    if (!correctedUtr.trim()) {
      alert("Please enter the updated 12-digit transaction UTR number.");
      return;
    }
    const receiptName = receiptFile ? receiptFile.name : 'updated_bank_receipt.pdf';
    studentResolvePaymentQuery(searchedApp.roll, correctedUtr.trim(), receiptName);
    setToastMsg("Updated payment transaction details submitted to Admin for immediate verification!");
    setTimeout(() => setToastMsg(''), 4000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-kgp-navy to-slate-900 text-white p-5 flex items-center justify-between flex-shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-bold flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold font-serif-title">
                  Track Application &amp; Payment Status
                </h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-500/40">
                  Student Portal
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Live verification status and administrative scrutiny updates
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-xs text-slate-700">
          
          {/* Search Box */}
          <form onSubmit={handleSearchSubmit} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
            <label className="block text-slate-700 font-bold text-xs">
              Enter Application ID, Roll Number, or Registered Email:
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. 24BS0003, KGP-2026-0841, or debo.g@kgp.ac.in"
                  value={queryInput}
                  onChange={(e) => setQueryInput(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold focus:outline-none focus:border-kgp-crimson"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-kgp-navy hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition flex items-center gap-1.5"
              >
                <span>Track Status</span>
              </button>
            </div>
          </form>

          {/* Toast Notification */}
          {toastMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl font-semibold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>{toastMsg}</span>
            </div>
          )}

          {/* Not Found */}
          {notFound && (
            <div className="p-6 text-center bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 space-y-2">
              <AlertTriangle className="w-8 h-8 text-rose-500 mx-auto" />
              <div className="font-bold text-sm">No Application Found</div>
              <p className="text-xs text-rose-600">
                Please verify your entered Roll Number or Application ID. You can also try searching with demo roll numbers: <code className="font-bold">24BS0001</code>, <code className="font-bold">24BS0002</code>, or <code className="font-bold">24BS0003</code>.
              </p>
            </div>
          )}

          {/* Found Application Details */}
          {searchedApp && (
            <div className="space-y-5 animate-in fade-in">
              
              {/* Top Status Card */}
              <div className="p-5 rounded-2xl border bg-slate-50 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <div>
                    <div className="text-[11px] font-mono text-slate-500 font-bold">
                      {searchedApp.id} • Roll: {searchedApp.roll}
                    </div>
                    <div className="text-base font-bold text-slate-900 font-serif-title">
                      {searchedApp.name}
                    </div>
                    <div className="text-xs text-slate-500">{searchedApp.email} • {searchedApp.phone}</div>
                  </div>

                  {/* Status Badge */}
                  <div>
                    {searchedApp.status === 'Verified' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Application Verified ✓</span>
                      </span>
                    )}
                    {searchedApp.status === 'Pending Review' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300 text-xs font-bold">
                        <Clock className="w-4 h-4 text-amber-600 animate-spin" />
                        <span>Under Admin Scrutiny ⏳</span>
                      </span>
                    )}
                    {searchedApp.status === 'Rejected' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-300 text-xs font-bold">
                        <XCircle className="w-4 h-4 text-rose-600" />
                        <span>Application Rejected ❌</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Degree Track</span>
                    <span className="font-semibold text-slate-800">{searchedApp.level}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Entrance Pathway</span>
                    <span className="font-semibold text-slate-800">{searchedApp.pathway}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Category</span>
                    <span className="font-semibold text-slate-800">{searchedApp.category}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Fee Concession</span>
                    <span className="font-semibold text-emerald-700">{searchedApp.incomeTier}</span>
                  </div>
                </div>

                {/* Rejection Note if any */}
                {searchedApp.status === 'Rejected' && searchedApp.rejectionReason && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs space-y-1">
                    <span className="font-bold flex items-center gap-1 text-rose-900">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                      <span>Rejection Reason from Admissions Directorate:</span>
                    </span>
                    <p className="text-[11px] leading-relaxed pl-4">{searchedApp.rejectionReason}</p>
                  </div>
                )}
              </div>

              {/* PAYMENT VERIFICATION & TRANSACTION QUERY MODULE */}
              <div className="p-5 rounded-2xl border-2 border-slate-200 bg-white space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-kgp-crimson" />
                    <span className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                      Fee Payment &amp; Transaction Verification
                    </span>
                  </div>

                  {/* Payment status badge */}
                  <div>
                    {searchedApp.payment.status === 'Verified' && (
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        Payment Reconciled &amp; Confirmed ✓
                      </span>
                    )}
                    {searchedApp.payment.status === 'Pending Review' && (
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                        Payment Reconciliation in Progress ⏳
                      </span>
                    )}
                    {searchedApp.payment.status === 'Query Raised' && (
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-300 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                        <span>Action Required: Payment Issue Flagged</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Payment Breakdown details */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Amount Paid</span>
                    <span className="font-extrabold text-kgp-crimson text-sm">₹{searchedApp.payment.amount}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Transaction / UTR</span>
                    <span className="font-mono font-bold text-slate-800">{searchedApp.payment.utr}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Payment Channel</span>
                    <span className="font-semibold text-slate-800">{searchedApp.payment.mode}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Bank Clearing</span>
                    <span className="font-semibold text-slate-800">{searchedApp.payment.bankStatus}</span>
                  </div>
                </div>

                {/* IF ADMIN FLAGGED A TRANSACTION QUERY: SHOW STUDENT RESOLUTION FORM */}
                {searchedApp.payment.status === 'Query Raised' && (
                  <div className="p-4 rounded-xl bg-amber-50 border-2 border-amber-300 space-y-3">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-slate-900 text-xs">
                          Administrative Payment Scrutiny Query:
                        </div>
                        <p className="text-xs text-amber-900 mt-1 leading-relaxed bg-white/70 p-2.5 rounded-lg border border-amber-200">
                          {searchedApp.payment.queryRemarks || "Transaction reference could not be reconciled. Please verify your 12-digit UTR or attach your official bank debit passbook screenshot."}
                        </p>
                      </div>
                    </div>

                    <form onSubmit={handleResolveSubmit} className="pt-2 border-t border-amber-200 space-y-3">
                      <div className="font-bold text-slate-800 text-xs">
                        Resolve &amp; Re-submit Transaction Details:
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                            Updated 12-Digit UTR / Transaction ID *
                          </label>
                          <input
                            type="text"
                            required
                            value={correctedUtr}
                            onChange={(e) => setCorrectedUtr(e.target.value)}
                            placeholder="e.g. SBI202694821034"
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-mono text-xs font-bold text-slate-800 focus:outline-none focus:border-amber-500"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                            Upload Bank Passbook / UPI Receipt
                          </label>
                          <input
                            type="file"
                            onChange={(e) => setReceiptFile(e.target.files?.[0] || null)}
                            className="w-full text-xs text-slate-600 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-amber-100 file:text-amber-800 hover:file:bg-amber-200"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold rounded-xl text-xs shadow transition flex items-center justify-center gap-2"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Updated Transaction to Admin</span>
                      </button>
                    </form>
                  </div>
                )}

              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            Admissions Directorate • Indian Institute of Technology Kharagpur
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
