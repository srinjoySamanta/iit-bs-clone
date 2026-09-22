import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Lock, Mail, User, ShieldCheck, Key, 
  HelpCircle, Eye, EyeOff, CheckCircle2, Award, ExternalLink,
  Sparkles, Phone, ChevronRight, Check, Search, AlertCircle
} from 'lucide-react';
import { IIT_KGP_INFO } from '../data/portalData';
import iitKgpLogo from '../assets/logo';

export default function StudentLoginPage({ 
  onLoginSuccess, 
  onBackToHome, 
  onOpenSignUp, 
  onOpenQualifier 
}) {
  // Mode: 'apply' (Apply for Qualifier) | 'login' (Student Login) | 'status' (Check Status)
  const [activeTab, setActiveTab] = useState('apply');
  
  // Login Form States
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState('8K4P9');
  const [rememberMe, setRememberMe] = useState(true);

  // Application / Qualifier Intake Form States
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantCategory, setApplicantCategory] = useState('General');
  const [applicantIncome, setApplicantIncome] = useState('below_1lpa');

  // Status Search State
  const [statusRoll, setStatusRoll] = useState('');
  const [statusResult, setStatusResult] = useState(null);

  // Check query param or hash for initial tab
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes('login')) {
      setActiveTab('login');
    } else {
      setActiveTab('apply');
    }
  }, []);

  const fillDemoStudent = () => {
    setActiveTab('login');
    setIdentifier('24BS0941');
    setPassword('KgpStudent@2026');
    setCaptchaInput(captchaCode);
  };

  const fillDemoApplicant = () => {
    setActiveTab('apply');
    setApplicantName('Srinjoy Samanta');
    setApplicantEmail('srinjoy.candidate@example.com');
    setApplicantPhone('9876543210');
    setApplicantCategory('General');
    setApplicantIncome('below_1lpa');
  };

  const handleGoogleSignIn = () => {
    // Simulated Google Auth Flow
    const confirmed = window.confirm(
      "Simulated Google Sign-In:\n\nSigned in as: srinjoy.samanta@gmail.com (Google Account)\n\nClick OK to proceed to the Qualifier Application & CBT Exam."
    );
    if (confirmed) {
      if (activeTab === 'login') {
        onLoginSuccess();
      } else {
        if (onOpenQualifier) onOpenQualifier();
        else if (onOpenSignUp) onOpenSignUp();
      }
    }
  };

  const handleStudentLogin = (e) => {
    e.preventDefault();
    if (captchaInput.toUpperCase() !== captchaCode.toUpperCase()) {
      alert("CAPTCHA code mismatch! Please enter: " + captchaCode);
      return;
    }
    onLoginSuccess();
  };

  const handleApplicantSubmit = (e) => {
    e.preventDefault();
    if (onOpenQualifier) {
      onOpenQualifier();
    } else if (onOpenSignUp) {
      onOpenSignUp();
    }
  };

  const handleCheckStatus = (e) => {
    e.preventDefault();
    if (!statusRoll.trim()) return;
    setStatusResult({
      roll: statusRoll.trim().toUpperCase(),
      name: 'Srinjoy Samanta',
      program: 'BS in Data Science & Artificial Intelligence',
      batch: 'Qualifier Batch 2026 (Term 1)',
      feeStatus: 'Paid (₹375 - 75% Income Waiver Applied)',
      examStatus: 'CBT Examination Completed',
      score: '88 / 100 (94th Percentile)',
      admitStatus: 'QUALIFIED FOR ADMISSION TO FOUNDATION LEVEL',
      verificationDate: '22 September 2026'
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-amber-500 selection:text-white">
      
      {/* 1. Header (Navbar style exact to IIT Madras Portal) */}
      <header className="bg-[#f8f9fa] border-b border-slate-200 shadow-sm py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo & Program Title */}
          <button 
            onClick={onBackToHome}
            className="flex items-center gap-3 text-left group"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white border border-slate-300 p-1 flex items-center justify-center overflow-hidden shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform">
              <img src={iitKgpLogo} alt="IIT Kharagpur" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
            </div>
            <div>
              <div className="text-[10px] sm:text-xs font-semibold text-kgp-crimson uppercase tracking-wide">
                {IIT_KGP_INFO.hindiName}
              </div>
              <div className="text-sm sm:text-base font-bold font-serif-title text-slate-900 group-hover:text-kgp-crimson transition">
                {IIT_KGP_INFO.name}
              </div>
              <div className="text-[11px] sm:text-xs text-slate-600 font-medium hidden sm:block">
                BS Degree Programme in Data Science & Artificial Intelligence
              </div>
            </div>
          </button>

          {/* Quick Nav Links */}
          <div className="flex items-center space-x-3 text-xs">
            <button
              onClick={onBackToHome}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-medium transition shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Main Website</span>
            </button>
          </div>

        </div>
      </header>

      {/* 2. Main Login & Apply Split Hero Section */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          
          {/* LEFT CARD: Authentication & Application Form Card */}
          <div className="w-full lg:w-5/12 bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Header Title verbatim like IIT Madras */}
              <div className="text-center mb-5">
                <h2 className="text-xl sm:text-2xl font-bold font-serif-title text-slate-900 leading-tight">
                  If you wish to apply or check your application status
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm mt-1.5">
                  New user? Sign-up or register with your Google account.
                </p>
              </div>

              {/* Authentic Google Sign-In Button */}
              <div className="mb-5">
                <button
                  onClick={handleGoogleSignIn}
                  type="button"
                  className="w-full py-3 px-4 bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 rounded-xl shadow-sm hover:shadow transition flex items-center justify-center gap-3 text-sm font-semibold text-slate-700 group"
                >
                  <svg className="w-5 h-5" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                  </svg>
                  <span className="group-hover:text-slate-900">Sign in with Google</span>
                </button>
              </div>

              {/* Divider */}
              <div className="relative flex py-2 items-center mb-5">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  OR CHOOSE OPTION
                </span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              {/* Tab Selector: Apply vs Login vs Status */}
              <div className="flex rounded-xl bg-slate-100 p-1 mb-5 text-xs">
                <button
                  type="button"
                  onClick={() => setActiveTab('apply')}
                  className={`flex-1 py-2 rounded-lg font-bold transition flex items-center justify-center gap-1 ${
                    activeTab === 'apply' 
                      ? 'bg-emerald-600 text-white shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Apply Qualifier</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('login')}
                  className={`flex-1 py-2 rounded-lg font-bold transition flex items-center justify-center gap-1 ${
                    activeTab === 'login' 
                      ? 'bg-kgp-crimson text-white shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Student Login</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('status')}
                  className={`flex-1 py-2 rounded-lg font-bold transition flex items-center justify-center gap-1 ${
                    activeTab === 'status' 
                      ? 'bg-slate-800 text-white shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Check Status</span>
                </button>
              </div>

              {/* TAB 1: APPLY FOR QUALIFIER 2026 */}
              {activeTab === 'apply' && (
                <form onSubmit={handleApplicantSubmit} className="space-y-3.5 text-xs">
                  <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl text-[11px] text-emerald-800 flex items-center justify-between">
                    <span className="font-semibold">Batch 2026 Qualifier Registration Open</span>
                    <button
                      type="button"
                      onClick={fillDemoApplicant}
                      className="text-emerald-700 underline font-bold"
                    >
                      Fill Demo
                    </button>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Candidate Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Srinjoy Samanta"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-600 font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="srinjoy@example.com"
                        value={applicantEmail}
                        onChange={(e) => setApplicantEmail(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="9876543210"
                        value={applicantPhone}
                        onChange={(e) => setApplicantPhone(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Category *</label>
                      <select
                        value={applicantCategory}
                        onChange={(e) => setApplicantCategory(e.target.value)}
                        className="w-full px-2.5 py-2 rounded-lg border border-slate-300 bg-white"
                      >
                        <option value="General">General / Open</option>
                        <option value="EWS">GEN-EWS</option>
                        <option value="OBC-NCL">OBC-NCL</option>
                        <option value="SC">SC</option>
                        <option value="ST">ST</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Family Income *</label>
                      <select
                        value={applicantIncome}
                        onChange={(e) => setApplicantIncome(e.target.value)}
                        className="w-full px-2.5 py-2 rounded-lg border border-slate-300 bg-white"
                      >
                        <option value="below_1lpa">&lt; 1 LPA (75% Waiver - ₹375)</option>
                        <option value="1_to_5lpa">1 to 5 LPA (50% Waiver - ₹750)</option>
                        <option value="above_5lpa">&gt; 5 LPA (Standard - ₹1,500)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-sm mt-3"
                  >
                    <span>Proceed to Qualifier Round &amp; CBT Exam</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* TAB 2: ENROLLED STUDENT LOGIN */}
              {activeTab === 'login' && (
                <form onSubmit={handleStudentLogin} className="space-y-3.5 text-xs">
                  <div className="bg-red-50 border border-red-200 p-2.5 rounded-xl text-[11px] text-red-900 flex items-center justify-between">
                    <span className="font-semibold">Registered Student / Candidate Login</span>
                    <button
                      type="button"
                      onClick={fillDemoStudent}
                      className="text-kgp-crimson underline font-bold"
                    >
                      Fill Demo (24BS0941)
                    </button>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Roll Number / Application ID / Registered Email *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. 24BS0941 or candidate email"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-kgp-crimson font-medium"
                      />
                    </div>
                  </div>

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
                        placeholder="Enter account password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-9 pr-10 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-kgp-crimson"
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

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Security Code (CAPTCHA) *</label>
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-200 px-3.5 py-1.5 rounded-lg font-mono font-bold tracking-widest text-slate-800 select-none text-sm line-through decoration-slate-400">
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

                  <div className="flex items-center justify-between">
                    <label className="flex items-center text-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-3.5 h-3.5 rounded text-kgp-crimson mr-2"
                      />
                      Remember this terminal
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-kgp-crimson to-red-800 hover:from-kgp-darkred hover:to-kgp-crimson text-white font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-sm"
                  >
                    <span>Sign In to Student Learning Portal</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* TAB 3: CHECK APPLICATION STATUS */}
              {activeTab === 'status' && (
                <div className="space-y-3.5 text-xs">
                  <form onSubmit={handleCheckStatus} className="space-y-3">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        Enter Qualifier Roll Number / Application ID *
                      </label>
                      <div className="relative">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. KGP-QUAL-2026-0842"
                          value={statusRoll}
                          onChange={(e) => setStatusRoll(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 uppercase font-mono font-medium"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl shadow transition"
                    >
                      Search Application &amp; Exam Status
                    </button>
                  </form>

                  {statusResult && (
                    <div className="bg-slate-50 border border-slate-300 rounded-xl p-3.5 space-y-2 text-[11px] animate-in fade-in">
                      <div className="font-bold text-slate-900 text-xs flex items-center justify-between border-b pb-1.5">
                        <span>Roll: {statusResult.roll}</span>
                        <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-extrabold text-[10px]">
                          QUALIFIED
                        </span>
                      </div>
                      <div><strong>Name:</strong> {statusResult.name}</div>
                      <div><strong>Program:</strong> {statusResult.program}</div>
                      <div><strong>Fee Status:</strong> {statusResult.feeStatus}</div>
                      <div><strong>Exam Score:</strong> {statusResult.score}</div>
                      <div className="text-emerald-800 font-bold bg-emerald-50 p-2 rounded border border-emerald-200">
                        {statusResult.admitStatus}
                      </div>
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Verbatim Note from IIT Madras Portal */}
            <div className="pt-5 mt-5 border-t border-slate-200 text-center">
              <p className="text-slate-500 text-xs leading-relaxed">
                If you do not have a Google Account —{' '}
                <a
                  href="https://support.google.com/accounts/answer/27441?hl=en#existingemail"
                  target="_blank"
                  rel="noreferrer"
                  className="text-kgp-crimson font-medium underline hover:text-red-700"
                >
                  enable your email with Google
                </a>{' '}
                first before signing in here.
              </p>
            </div>
          </div>

          {/* RIGHT CARD: Program Highlights Card (Navy Card exact to IIT Madras updates-card) */}
          <div className="w-full lg:w-7/12 bg-[#081528] rounded-2xl p-6 sm:p-10 text-white flex flex-col justify-between border border-amber-500/30 shadow-2xl relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-red-800/20 blur-[90px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-amber-500/10 blur-[80px] rounded-full pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-serif-title tracking-tight text-white mb-1">
                  BS in Data Science &amp; Artificial Intelligence
                </h2>
                <h4 className="text-amber-400 font-bold tracking-widest text-xs uppercase font-sans">
                  LEARN AT IIT KHARAGPUR.
                </h4>
              </div>

              {/* Institute Ranking Badges */}
              <div className="space-y-1.5 pt-1">
                <div className="text-lg sm:text-xl font-bold text-slate-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                  #1 First Indian Institute of Technology (Estd. 1951)
                </div>
                <div className="text-sm sm:text-base font-medium text-slate-300">
                  Pioneering Center of Excellence in Artificial Intelligence &amp; Data Science
                </div>
              </div>

              <hr className="border-slate-700/80 my-4" />

              {/* Sub Highlights */}
              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <h3 className="text-base font-bold text-amber-300 mb-1 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>No Age Limits</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Anyone who has completed class 12 / Higher Secondary (with Mathematics at 10th level) can apply, regardless of age, background, or stream.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <h3 className="text-base font-bold text-amber-300 mb-1 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Learn from anywhere.</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    All coursework is delivered online with weekly live tutorials. In-person proctored exams are conducted across 150+ exam centers in India, Sri Lanka, UAE, and designated overseas locations.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <h3 className="text-base font-bold text-amber-300 mb-1 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Modular Degree Exits</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Flexibility to exit with Foundation Certificate, Diploma in Programming, Diploma in Data Science, B.Sc. Degree, or the complete 4-Year BS Degree with lifelong <strong>IIT KGP Alumni Status</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Quick Helpdesk info */}
            <div className="relative z-10 pt-6 mt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Admissions Helpline: +91 (03222) 282000</span>
              </div>
              <div>admissions@iitkgp.ac.in</div>
            </div>
          </div>

        </div>
      </main>

      {/* 3. Section: "WHY JOIN OUR PROGRAM?" (verbatim structure like IIT Madras) */}
      <section className="bg-[#F5F5F5] py-14 px-4 sm:px-6 lg:px-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="space-y-2">
            <h6 className="text-xs font-extrabold uppercase tracking-wider text-kgp-crimson">
              WHY JOIN OUR PROGRAM?
            </h6>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif-title text-slate-900 leading-tight">
              There’s a rapidly increasing demand for <br className="hidden sm:inline" />
              <span className="text-kgp-crimson">well trained</span> Programmers, AI Engineers and Data Scientists.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-4 h-4 font-bold" />
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                Lectures by <strong className="text-slate-900 font-semibold">distinguished faculty</strong> at IIT Kharagpur with deep domain research.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-4 h-4 font-bold" />
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                <strong className="text-slate-900 font-semibold">Interactive sessions</strong> with mentors and teaching assistants to guide your assignments and projects.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-4 h-4 font-bold" />
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                <strong className="text-slate-900 font-semibold">Study groups &amp; discourse forums</strong> for interacting with and learning from motivated peers across India.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-4 h-4 font-bold" />
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                Flexibility of our unique program allows you to <strong className="text-slate-900 font-semibold">study at your own pace</strong>. Take only as many courses (1 to 4) as you wish in any given term.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Section: "Testimonials from our learners" (verbatim from IIT Madras structure) */}
      <section className="bg-white py-14 px-4 sm:px-6 lg:px-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif-title text-slate-900">
              Testimonials from our learners
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Read how students and working professionals are shaping their futures with IIT online degrees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Testimonial 1 */}
            <div className="bg-[#F5F5F5] rounded-2xl p-6 flex flex-col justify-between border border-slate-200 shadow-sm">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic mb-4">
                "I just want to let you know that the IIT team is doing an amazing job running this program. I'm really lucky to be enrolled into this program. Right from the program design and course content, every minute detail is well planned and carried out. Hats off to the faculty and mentors!"
              </p>
              <div>
                <h5 className="text-sm font-bold text-slate-900">S Nithish Kumar</h5>
                <div className="text-xs text-slate-500 italic">from Coimbatore, Tamil Nadu, India</div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-[#F5F5F5] rounded-2xl p-6 flex flex-col justify-between border border-slate-200 shadow-sm">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic mb-4">
                "The concept of solving questions with the professors and live tutorial problem solving has drastically helped me in improving my performance in graded assignments and Python programming. It plays a highly relevant role in making deep concepts clear."
              </p>
              <div>
                <h5 className="text-sm font-bold text-slate-900">Parth Shukla</h5>
                <div className="text-xs text-slate-500 italic">from Lucknow, Uttar Pradesh, India</div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-[#F5F5F5] rounded-2xl p-6 flex flex-col justify-between border border-slate-200 shadow-sm">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic mb-4">
                "Balancing my full-time work while pursuing an authentic BS degree in Data Science &amp; AI has been seamless. The modular exit options and weekend mentorship fit perfectly into a working professional's schedule."
              </p>
              <div>
                <h5 className="text-sm font-bold text-slate-900">Ananya Sengupta</h5>
                <div className="text-xs text-slate-500 italic">from Kolkata, West Bengal, India</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Footer */}
      <footer className="bg-slate-900 text-white py-6 px-4 sm:px-8 border-t border-slate-800 text-center text-xs">
        <div className="max-w-7xl mx-auto space-y-2">
          <div className="text-slate-300 font-semibold">
            Indian Institute of Technology Kharagpur — BS Admissions &amp; Examination Controller Desk
          </div>
          <div className="text-slate-500 text-[11px]">
            © 2026 Indian Institute of Technology Kharagpur. All rights reserved. | Protected by IIT KGP Campus SSL Encryption
          </div>
        </div>
      </footer>

    </div>
  );
}
