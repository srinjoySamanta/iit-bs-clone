import React, { useState } from 'react';
import { 
  ArrowLeft, ShieldCheck, Lock, User, Key, 
  AlertTriangle, CheckCircle2, Shield, ExternalLink, RefreshCw, XCircle
} from 'lucide-react';
import { IIT_KGP_INFO } from '../data/portalData';
import iitKgpLogo from '../assets/logo';
import { adminLogin, generateStudentTestToken } from '../services/apiService';

export default function AdminLoginPage({ onLoginSuccess, onBackToHome }) {
  const [adminId, setAdminId] = useState('admin@iitkgp.ac.in');
  const [adminPass, setAdminPass] = useState('Admin@KGP2026!');
  const [securityPin, setSecurityPin] = useState('721302');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successNotice, setSuccessNotice] = useState('');

  const fillAdminCredentials = (type) => {
    setErrorMessage('');
    setSuccessNotice('');
    if (type === 'dean') {
      setAdminId('admin@iitkgp.ac.in');
      setAdminPass('Admin@KGP2026!');
      setSecurityPin('721302');
    } else if (type === 'officer') {
      setAdminId('officer@iitkgp.ac.in');
      setAdminPass('Officer@KGP2026!');
      setSecurityPin('721302');
    }
  };

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessNotice('');

    if (!adminId || !adminPass) {
      setErrorMessage("Please enter your administrator ID/email and password.");
      return;
    }

    setIsLoading(true);
    try {
      const result = await adminLogin(adminId, adminPass);
      if (result.success) {
        setSuccessNotice(`Authentication successful. Logged in as ${result.user.name} (${result.user.role}). Redirecting...`);
        setTimeout(() => {
          onLoginSuccess(result.user, result.token);
        }, 600);
      } else {
        setErrorMessage(result.error || "Authentication failed. Invalid administrator credentials.");
      }
    } catch (err) {
      setErrorMessage("Network error connecting to authentication service.");
    } finally {
      setIsLoading(false);
    }
  };

  // RBAC TEST: Log in with student credentials to demonstrate 403 Forbidden on Admin Dashboard
  const handleTestStudentDenial = async () => {
    setIsLoading(true);
    setErrorMessage('');
    setSuccessNotice('');
    try {
      const result = await generateStudentTestToken('24BS0001', 'subho.roy@kgp.ac.in');
      if (result.success) {
        setSuccessNotice("Authenticated as Student (Subhashis Roy). Redirecting to verify 403 Forbidden Access Denial...");
        setTimeout(() => {
          onLoginSuccess(result.user, result.token);
        }, 800);
      } else {
        setErrorMessage("Failed to generate student test session.");
      }
    } catch (err) {
      setErrorMessage("Error simulating student session.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-between font-sans text-white">
      
      {/* Top Header */}
      <header className="bg-slate-900/90 backdrop-blur py-4 px-4 sm:px-8 border-b border-slate-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-full bg-white p-1 border border-amber-400 flex items-center justify-center overflow-hidden shadow">
              <img src={iitKgpLogo} alt="IIT KGP" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Restricted Access Control (RBAC)</span>
              </div>
              <h1 className="text-sm sm:text-base font-bold font-serif-title">
                {IIT_KGP_INFO.name} — Administrative Login
              </h1>
            </div>
          </div>

          <button
            onClick={onBackToHome}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition border border-slate-700 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Portal</span>
          </button>
        </div>
      </header>

      {/* Main Form Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-6">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden backdrop-blur">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-kgp-navy to-slate-900 p-6 text-center border-b border-slate-800">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider mb-2 border border-amber-500/40">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>JWT + bcrypt Secure Gateway</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif-title text-white">
              Staff &amp; Faculty Admin Console
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto">
              Authorized BS Academic Affairs Directorate, Scrutiny Officers &amp; Accounts Reconcilers
            </p>
          </div>

          {/* Quick Demo Credentials Switcher */}
          <div className="bg-slate-950 p-3 border-b border-slate-800 space-y-2">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">
              Quick 1-Click Institutional Credentials:
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => fillAdminCredentials('dean')}
                className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-amber-500/40 text-amber-300 text-[11px] font-semibold transition text-left"
              >
                <div className="font-bold">Dean of Academics</div>
                <div className="text-[9px] text-slate-400 font-mono truncate">admin@iitkgp.ac.in</div>
              </button>
              <button
                type="button"
                onClick={() => fillAdminCredentials('officer')}
                className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-[11px] font-semibold transition text-left"
              >
                <div className="font-bold">Scrutiny Officer</div>
                <div className="text-[9px] text-slate-400 font-mono truncate">officer@iitkgp.ac.in</div>
              </button>
            </div>
          </div>

          {/* Feedback Messages */}
          {errorMessage && (
            <div className="m-4 p-3 rounded-xl bg-rose-950/80 border border-rose-500/50 flex items-start gap-2 text-rose-200 text-xs animate-in fade-in">
              <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successNotice && (
            <div className="m-4 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 flex items-start gap-2 text-emerald-200 text-xs animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>{successNotice}</span>
            </div>
          )}

          {/* Admin Form */}
          <form onSubmit={handleAdminSubmit} className="p-6 sm:p-7 space-y-4 text-xs">
            
            {/* Staff ID or Email */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Administrator Email or ID *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="admin@iitkgp.ac.in"
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white focus:outline-none focus:border-amber-400 font-mono text-xs"
                />
              </div>
            </div>

            {/* Master Password */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={adminPass}
                  onChange={(e) => setAdminPass(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white focus:outline-none focus:border-amber-400 text-xs"
                />
              </div>
            </div>

            {/* 2FA Security Token */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Security PIN / 2FA Token
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="6-digit PIN (721302)"
                  value={securityPin}
                  onChange={(e) => setSecurityPin(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white focus:outline-none focus:border-amber-400 font-mono tracking-widest text-xs"
                />
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-xs uppercase tracking-wider disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Authenticate &amp; Open Dashboard</span>
                </>
              )}
            </button>

            {/* RBAC Security Verification Demo Button */}
            <div className="pt-2 border-t border-slate-800 text-center">
              <button
                type="button"
                onClick={handleTestStudentDenial}
                disabled={isLoading}
                className="text-[11px] text-rose-400 hover:text-rose-300 underline font-medium transition cursor-pointer"
                title="Generates a regular student JWT token to demonstrate the 403 Forbidden restriction on the Admin Dashboard"
              >
                ⚡ Test RBAC Defense: Login as Student (Triggers 403 Forbidden)
              </button>
            </div>

          </form>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 py-4 px-4 border-t border-slate-800 text-center text-[11px] text-slate-500">
        <div>IIT Kharagpur Computer and Informatics Centre (CIC) • Role-Based Access Control Active</div>
      </footer>

    </div>
  );
}
