import React, { useState } from 'react';
import { 
  ArrowLeft, ShieldCheck, Lock, User, Key, 
  AlertTriangle, CheckCircle2, Shield, ExternalLink, HelpCircle 
} from 'lucide-react';
import { IIT_KGP_INFO } from '../data/portalData';

export default function AdminLoginPage({ onLoginSuccess, onBackToHome }) {
  const [adminId, setAdminId] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [securityPin, setSecurityPin] = useState('');
  const [role, setRole] = useState('controller');

  const fillDemoAdmin = () => {
    setAdminId('ADMIN-KGP-2026');
    setAdminPass('IITKgp@Admin#Master');
    setSecurityPin('721302');
    setRole('controller');
  };

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    if (!adminId || !adminPass) {
      alert("Please enter Admin ID and Password.");
      return;
    }
    // Grant access to Admin management console
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-between font-sans text-white">
      
      {/* Top Header */}
      <header className="bg-kgp-darknavy py-4 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-full bg-white p-1 border border-amber-400 flex items-center justify-center overflow-hidden shadow">
              <img src="/iitkgp-logo.png" alt="IIT KGP" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
                Restricted Administration
              </div>
              <h1 className="text-sm sm:text-base font-bold font-serif-title">
                {IIT_KGP_INFO.name} — Admin Console Login
              </h1>
            </div>
          </div>

          <button
            onClick={onBackToHome}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition border border-slate-700"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Main Website (Single Page)</span>
          </button>
        </div>
      </header>

      {/* Main Form Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md bg-slate-800/90 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden backdrop-blur">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-kgp-navy to-slate-950 p-6 text-center border-b border-slate-700">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider mb-2 border border-amber-500/40">
              <Shield className="w-3 h-3" />
              Staff & Faculty Gateway
            </div>
            <h2 className="text-xl font-bold font-serif-title text-white">
              Administrative Control Console
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Authorized BS Academic & Examination Staff Access
            </p>
          </div>

          {/* Quick Demo Credentials */}
          <div className="bg-slate-900/80 p-2.5 text-center border-b border-slate-700">
            <button
              onClick={fillDemoAdmin}
              type="button"
              className="text-[11px] font-bold text-amber-400 hover:underline flex items-center justify-center gap-1 mx-auto"
            >
              <span>Auto-Fill Demo Admin Credentials (ID: ADMIN-KGP-2026)</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          {/* Admin Form */}
          <form onSubmit={handleAdminSubmit} className="p-6 sm:p-8 space-y-4 text-xs">
            
            {/* Staff ID */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Faculty / Staff Administrator ID *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. ADMIN-KGP-2026"
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-600 bg-slate-900/90 text-white focus:outline-none focus:border-amber-400 font-mono"
                />
              </div>
            </div>

            {/* Master Password */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Master Security Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="Enter administrator password"
                  value={adminPass}
                  onChange={(e) => setAdminPass(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-600 bg-slate-900/90 text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* 2FA PIN */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Two-Factor Security Token / 2FA PIN *
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="6-digit PIN (721302)"
                  value={securityPin}
                  onChange={(e) => setSecurityPin(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-600 bg-slate-900/90 text-white focus:outline-none focus:border-amber-400 font-mono tracking-widest"
                />
              </div>
            </div>

            {/* Admin Role Selection */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Administrative Role Authorization</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-600 bg-slate-900 text-white focus:outline-none focus:border-amber-400"
              >
                <option value="controller">Examination Controller & Center Allocator</option>
                <option value="dean">Dean of Academic Courses (Approvals)</option>
                <option value="verifier">Admissions Verification Officer</option>
                <option value="ta">Lead Course Coordinator & Grading TA</option>
                <option value="superadmin">Super Administrator (Full Rights)</option>
              </select>
            </div>

            {/* Warning Box */}
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-2 text-slate-300 text-[11px] leading-relaxed">
              <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <span>
                All actions, grading modifications, and roll number freeze operations are recorded in the central audit ledger.
              </span>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-kgp-darknavy font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-sm"
            >
              <span>Authenticate & Enter Console</span>
              <ShieldCheck className="w-4 h-4" />
            </button>

          </form>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-kgp-darknavy py-4 px-4 border-t border-slate-800 text-center text-xs text-slate-500">
        <div>IIT Kharagpur Center for Educational Technology (CET) & Computer and Informatics Centre (CIC)</div>
      </footer>

    </div>
  );
}
