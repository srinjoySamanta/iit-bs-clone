import React, { useState } from 'react';
import { 
  ArrowLeft, Lock, Mail, User, ShieldCheck, Key, 
  HelpCircle, Eye, EyeOff, CheckCircle2, Award, ExternalLink 
} from 'lucide-react';
import { IIT_KGP_INFO } from '../data/portalData';

export default function StudentLoginPage({ onLoginSuccess, onBackToHome, onOpenSignUp }) {
  const [loginMethod, setLoginMethod] = useState('password'); // 'password' or 'otp'
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState('7K9P2');
  const [rememberMe, setRememberMe] = useState(true);

  const fillDemo = () => {
    setIdentifier('24BS0941');
    setPassword('KgpStudent@2026');
    setCaptchaInput(captchaCode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (captchaInput.toUpperCase() !== captchaCode) {
      alert("Captcha does not match! Please enter: " + captchaCode);
      return;
    }
    // Grant access into student portal
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between font-sans">
      
      {/* Top Bar */}
      <header className="bg-kgp-navy text-white py-3.5 px-4 sm:px-8 border-b border-amber-500/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-kgp-crimson border border-amber-400 flex items-center justify-center font-bold text-amber-400">
              IIT
            </div>
            <div>
              <div className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider">
                {IIT_KGP_INFO.hindiName}
              </div>
              <h1 className="text-sm sm:text-base font-bold font-serif-title">
                {IIT_KGP_INFO.name} — Student Login Portal
              </h1>
            </div>
          </div>

          <button
            onClick={onBackToHome}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-slate-200 hover:text-white transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Main Portal (Single Page)</span>
          </button>
        </div>
      </header>

      {/* Main Login Area */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
          
          {/* Card Banner */}
          <div className="bg-gradient-to-r from-kgp-crimson to-red-800 text-white p-6 text-center">
            <h2 className="text-xl font-bold font-serif-title">
              Candidate & Student Sign In
            </h2>
            <p className="text-xs text-amber-200 mt-1">
              BS in Data Science & AI Academic Term 2026
            </p>
          </div>

          {/* Quick Demo Credentials Pill */}
          <div className="bg-amber-50 p-2.5 text-center border-b border-amber-200">
            <button
              onClick={fillDemo}
              type="button"
              className="text-[11px] font-bold text-kgp-crimson hover:underline flex items-center justify-center gap-1 mx-auto"
            >
              <span>Auto-Fill Demo Student Credentials (Roll: 24BS0941)</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4 text-xs">
            
            {/* Login Method Toggle */}
            <div className="flex rounded-lg bg-slate-100 p-1 mb-2">
              <button
                type="button"
                onClick={() => setLoginMethod('password')}
                className={`flex-1 py-1.5 rounded-md font-bold transition text-center ${
                  loginMethod === 'password' ? 'bg-white text-kgp-crimson shadow-sm' : 'text-slate-600'
                }`}
              >
                Password Login
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod('otp')}
                className={`flex-1 py-1.5 rounded-md font-bold transition text-center ${
                  loginMethod === 'otp' ? 'bg-white text-kgp-crimson shadow-sm' : 'text-slate-600'
                }`}
              >
                OTP Verification
              </button>
            </div>

            {/* Roll Number or Email */}
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Roll Number / Application ID / Registered Email *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. 24BS0941 or user@example.com"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-kgp-crimson font-medium"
                />
              </div>
            </div>

            {/* Password or OTP */}
            {loginMethod === 'password' ? (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-slate-700 font-semibold">Account Password *</label>
                  <button 
                    type="button" 
                    onClick={() => alert("Password reset link will be sent to your registered email.")}
                    className="text-[11px] text-kgp-crimson hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter candidate password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-10 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-kgp-crimson"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Enter 6-Digit Mobile/Email OTP *</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="721302"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex-1 px-3 py-2.5 rounded-lg border border-slate-300 font-mono text-center tracking-widest text-base"
                  />
                  <button
                    type="button"
                    onClick={() => alert("OTP 721302 sent to registered mobile.")}
                    className="px-3 py-2.5 bg-slate-800 text-white font-bold rounded-lg hover:bg-slate-900"
                  >
                    Resend
                  </button>
                </div>
              </div>
            )}

            {/* Captcha Box */}
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Security Code (CAPTCHA) *</label>
              <div className="flex items-center gap-3">
                <div className="bg-slate-200 px-4 py-2 rounded-lg font-mono font-bold tracking-widest text-slate-800 select-none text-sm line-through decoration-slate-400">
                  {captchaCode}
                </div>
                <input
                  type="text"
                  required
                  placeholder="Enter code"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border border-slate-300 uppercase font-mono"
                />
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3.5 h-3.5 rounded text-kgp-crimson focus:ring-kgp-crimson"
              />
              <label htmlFor="remember" className="ml-2 text-slate-600 cursor-pointer">
                Remember this terminal for 30 days
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-kgp-crimson hover:bg-kgp-darkred text-white font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-sm"
            >
              <span>Sign In to Student Dashboard</span>
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </button>

            {/* Registration CTA */}
            <div className="pt-4 border-t border-slate-200 text-center">
              <span className="text-slate-500">Not registered yet? </span>
              <button
                type="button"
                onClick={onOpenSignUp}
                className="font-bold text-kgp-crimson hover:underline"
              >
                Apply for Qualifier / Direct Admission 2026
              </button>
            </div>

          </form>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-4 px-4 border-t border-slate-200 text-center text-xs text-slate-500">
        <div>Indian Institute of Technology Kharagpur — BS Admissions & Examination Controller Desk</div>
        <div className="text-[11px] text-slate-400 mt-0.5">Protected by IIT KGP Campus Firewall & SSL Encryption</div>
      </footer>

    </div>
  );
}
