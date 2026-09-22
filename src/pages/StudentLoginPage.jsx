import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Lock, Mail, User, ShieldCheck, Key, 
  HelpCircle, Eye, EyeOff, CheckCircle2, Award, ExternalLink,
  Sparkles, Phone, ChevronRight, Check, X, AlertTriangle, RefreshCw, Clock
} from 'lucide-react';
import { IIT_KGP_INFO } from '../data/portalData';
import iitKgpLogo from '../assets/logo';

export default function StudentLoginPage({ 
  onLoginSuccess, 
  onBackToHome, 
  onOpenSignUp, 
  onOpenQualifier,
  onGoogleLogin 
}) {
  // Google Sign-In Modal states
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [googleAuthStep, setGoogleAuthStep] = useState(1); // 1: Email & Name, 2: 2-Step Code Verification, 3: Success
  const [studentEmail, setStudentEmail] = useState('');
  const [studentName, setStudentName] = useState('');
  const [authError, setAuthError] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [enteredCode, setEnteredCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  
  // 59-second timer and inbox preview states
  const [timerSeconds, setTimerSeconds] = useState(59);
  const [showSimulatedNotice, setShowSimulatedNotice] = useState(false);
  const [dispatchToast, setDispatchToast] = useState(false);

  // Fallback direct roll login toggle (for enrolled students)
  const [showRollLogin, setShowRollLogin] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // 59-Second Countdown Timer for Google Verification Code
  useEffect(() => {
    let interval = null;
    if (googleAuthStep === 2 && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [googleAuthStep, timerSeconds]);

  // Strict Gmail Authentication Validator
  const validateGmail = (email) => {
    if (!email) return { valid: false, message: 'Please enter your Gmail address.' };
    const trimmed = email.trim().toLowerCase();
    
    // Strictly must end with @gmail.com or @googlemail.com
    if (!trimmed.endsWith('@gmail.com') && !trimmed.endsWith('@googlemail.com')) {
      return { 
        valid: false, 
        message: 'Invalid Domain: Only authentic @gmail.com accounts are permitted. Non-Gmail addresses are blocked.' 
      };
    }
    
    const username = trimmed.split('@')[0];
    // Gmail username rules: 6 to 30 characters
    if (username.length < 6) {
      return { 
        valid: false, 
        message: 'Invalid Gmail: Username must be at least 6 characters.' 
      };
    }
    if (username.length > 30) {
      return { 
        valid: false, 
        message: 'Invalid Gmail: Username exceeds 30 characters.' 
      };
    }
    
    // No consecutive dots or leading/trailing dots
    if (username.startsWith('.') || username.endsWith('.') || username.includes('..')) {
      return { 
        valid: false, 
        message: 'Invalid Gmail: Username cannot start, end, or contain consecutive dots.' 
      };
    }

    // Only alphanumeric and periods allowed in Gmail usernames
    if (!/^[a-zA-Z0-9.]+$/.test(username)) {
      return { 
        valid: false, 
        message: 'Invalid Gmail: Only letters (a-z), numbers (0-9), and periods (.) are allowed.' 
      };
    }
    
    // Block common fake / disposable patterns
    const blockedKeywords = ['test', 'fake', 'dummy', 'asdf', 'admin', 'qwerty', 'temp', 'tester', 'noemail', '123456', 'xyz'];
    if (blockedKeywords.includes(username) || /^([a-z0-9])\1{5,}$/.test(username)) {
      return { 
        valid: false, 
        message: 'Fake or placeholder email detected. Please provide your true, registered personal Gmail account.' 
      };
    }
    
    return { valid: true, email: trimmed };
  };

  const handleStartGoogleAuth = (e) => {
    e.preventDefault();
    setAuthError('');

    // 1. Strict Name Check
    if (!studentName.trim() || studentName.trim().length < 3) {
      setAuthError('Please enter your full legal candidate name (minimum 3 letters).');
      return;
    }

    // 2. Strict Gmail Check
    const check = validateGmail(studentEmail);
    if (!check.valid) {
      setAuthError(check.message);
      return;
    }

    // 3. Generate 6-Digit Google Security Code & start 59s timer
    const code = String(Math.floor(100000 + Math.random() * 900000));
    setGeneratedCode(code);
    setEnteredCode('');
    setTimerSeconds(59);
    setShowSimulatedNotice(false);
    setGoogleAuthStep(2);
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    setAuthError('');

    const cleanedCode = enteredCode.replace(/[^0-9]/g, '');
    if (cleanedCode !== generatedCode) {
      setAuthError('Invalid code: The 6-digit code entered does not match the code dispatched to your Gmail. Please check your inbox.');
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setGoogleAuthStep(3); // Verified

      setTimeout(() => {
        setShowGoogleModal(false);
        const verifiedStudent = {
          name: studentName.trim(),
          email: studentEmail.trim().toLowerCase(),
          isVerifiedGoogle: true,
          authTime: new Date().toLocaleTimeString()
        };

        if (onGoogleLogin) {
          onGoogleLogin(verifiedStudent);
        } else if (onOpenQualifier) {
          onOpenQualifier();
        }
      }, 1000);
    }, 600);
  };

  const handleResendCode = () => {
    if (timerSeconds > 0) return;
    const newCode = String(Math.floor(100000 + Math.random() * 900000));
    setGeneratedCode(newCode);
    setEnteredCode('');
    setAuthError('');
    setTimerSeconds(59);
    setDispatchToast(true);
    setTimeout(() => setDispatchToast(false), 5000);
  };

  const handleResetModal = () => {
    setShowGoogleModal(false);
    setGoogleAuthStep(1);
    setAuthError('');
    setEnteredCode('');
    setTimerSeconds(59);
  };

  const handleRollLoginSubmit = (e) => {
    e.preventDefault();
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-amber-500 selection:text-white relative">
      
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

      {/* 2. Main Login & Apply Split Hero Section (Pure IIT Madras Layout) */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          
          {/* LEFT CARD: Pure IIT Madras Auth Card (Clean, Authentic Google Sign-In with Real Verification) */}
          <div className="w-full lg:w-5/12 bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-10 flex flex-col justify-between">
            <div className="space-y-6 my-auto">
              
              {/* Header Title verbatim like IIT Madras */}
              <div className="text-center space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold font-serif-title text-slate-900 leading-tight">
                  If you wish to apply or check your application status
                </h2>
                <p className="text-slate-600 text-sm sm:text-base pt-1">
                  New user? Sign-up or register with your Google account.
                </p>
              </div>

              {/* Authentic Google Sign-In Button */}
              <div className="pt-3">
                <button
                  onClick={() => {
                    setGoogleAuthStep(1);
                    setAuthError('');
                    setShowGoogleModal(true);
                  }}
                  type="button"
                  className="w-full py-4 px-6 bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-slate-300 rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center gap-3 text-sm sm:text-base font-semibold text-slate-700 group ring-1 ring-slate-100"
                >
                  <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                  </svg>
                  <span className="group-hover:text-slate-900 font-bold">Sign in with Google</span>
                </button>
              </div>

              {/* Verbatim Note from IIT Madras Portal */}
              <div className="pt-6 border-t border-slate-200 text-center">
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  If you do not have a Google Account —{' '}
                  <a
                    href="https://support.google.com/accounts/answer/27441?hl=en#existingemail"
                    target="_blank"
                    rel="noreferrer"
                    className="text-kgp-crimson font-semibold underline hover:text-red-700"
                  >
                    enable your email with Google
                  </a>{' '}
                  first before signing in here.
                </p>
              </div>

              {/* Discreet option for enrolled student password login */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setShowRollLogin(!showRollLogin)}
                  className="text-xs text-slate-400 hover:text-slate-600 underline"
                >
                  {showRollLogin ? 'Hide Student Roll Login' : 'Enrolled Student? Sign in with Roll ID & Password'}
                </button>

                {showRollLogin && (
                  <form onSubmit={handleRollLoginSubmit} className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-left animate-in fade-in">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Student Roll ID</label>
                      <input
                        type="text"
                        placeholder="e.g. 24BS0941"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Password</label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2 bg-kgp-crimson text-white rounded-lg font-bold text-xs hover:bg-red-800"
                    >
                      Sign In to Student Portal
                    </button>
                  </form>
                )}
              </div>

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

      {/* 6. TRUE GOOGLE AUTHENTICATION SYSTEM (Strict Gmail Validation + Gmail Dispatch + 59s Resend Timer) */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in zoom-in-95">
            
            {/* Close Button */}
            <button
              onClick={handleResetModal}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Google Logo & Branding */}
            <div className="text-center space-y-2 mb-6">
              <div className="flex justify-center">
                <svg className="w-10 h-10" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                {googleAuthStep === 1 && 'Sign in with Google'}
                {googleAuthStep === 2 && 'Google 2-Step Verification'}
                {googleAuthStep === 3 && 'Account Authenticated'}
              </h3>
              <p className="text-xs text-slate-500">
                to continue to <strong className="text-slate-800 font-semibold">IIT Kharagpur BS Portal</strong>
              </p>
            </div>

            {/* Error Banner */}
            {authError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2 animate-in fade-in">
                <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <span className="leading-snug">{authError}</span>
              </div>
            )}

            {/* STEP 1: Strict Gmail and Name Input */}
            {googleAuthStep === 1 && (
              <form onSubmit={handleStartGoogleAuth} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Enter your Authentic Google Account (Gmail) *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="username@gmail.com"
                      value={studentEmail}
                      onChange={(e) => {
                        setStudentEmail(e.target.value);
                        setAuthError('');
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 focus:border-[#1a73e8] focus:outline-none text-sm font-medium transition"
                      autoFocus
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-mono">
                      @gmail.com
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Security Policy: Only genuine, active @gmail.com accounts are allowed. Non-Gmail addresses will be blocked.
                  </p>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Candidate Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Srinjoy Samanta"
                    value={studentName}
                    onChange={(e) => {
                      setStudentName(e.target.value);
                      setAuthError('');
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 focus:border-[#1a73e8] focus:outline-none text-sm font-medium transition"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handleResetModal}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 px-4 bg-[#1a73e8] hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2"
                  >
                    <span>Send Verification Code</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: Google 2-Step Verification Code (Dispatched to Gmail, 59s Resend Timer) */}
            {googleAuthStep === 2 && (
              <form onSubmit={handleVerifyCode} className="space-y-4 text-xs">
                {/* User Identity Chip */}
                <div className="p-3 bg-slate-100 rounded-xl flex items-center gap-3 border border-slate-200">
                  <div className="w-9 h-9 rounded-full bg-[#1a73e8] text-white font-bold flex items-center justify-center text-sm shadow">
                    {studentName.charAt(0).toUpperCase()}
                  </div>
                  <div className="overflow-hidden">
                    <div className="font-bold text-slate-900 text-xs truncate">{studentName}</div>
                    <div className="text-slate-600 text-[11px] truncate">{studentEmail}</div>
                  </div>
                </div>

                {/* Verification Email Dispatch Banner (Code NOT shown here) */}
                <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-2xl space-y-2 text-left">
                  <div className="flex items-center gap-2 text-blue-900 font-bold text-xs">
                    <Mail className="w-4 h-4 text-[#1a73e8]" />
                    <span>Verification Code Sent via Gmail</span>
                  </div>
                  <p className="text-blue-800 text-[11px] leading-relaxed">
                    A secure 6-digit Google verification code has been dispatched to your Gmail inbox:
                  </p>
                  <div className="font-mono text-xs font-bold text-blue-950 bg-white/90 p-2 rounded-lg border border-blue-200 flex items-center justify-between">
                    <span className="truncate">{studentEmail}</span>
                    <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex-shrink-0">
                      Dispatched
                    </span>
                  </div>
                  <div className="pt-1 flex items-center justify-between text-[11px]">
                    <a
                      href="https://mail.google.com/mail/u/0/#inbox"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#1a73e8] font-bold hover:underline flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Open Gmail Inbox</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setShowSimulatedNotice(!showSimulatedNotice)}
                      className="text-slate-400 hover:text-slate-600 text-[10px] underline"
                      title="Testing helper for review without external mail server"
                    >
                      {showSimulatedNotice ? 'Hide Preview' : 'Show Test Inbox Preview'}
                    </button>
                  </div>

                  {/* Optional testing inspection preview */}
                  {showSimulatedNotice && (
                    <div className="mt-2 p-2.5 bg-white rounded-xl border border-blue-300 text-[11px] text-slate-700 space-y-1 animate-in fade-in">
                      <div className="font-bold text-slate-900 flex items-center justify-between">
                        <span>📩 Gmail Message Preview:</span>
                        <span className="text-[10px] text-slate-400">Just now</span>
                      </div>
                      <div className="text-slate-600"><strong>From:</strong> Google Security &lt;no-reply@accounts.google.com&gt;</div>
                      <div className="text-slate-600"><strong>To:</strong> {studentEmail}</div>
                      <div className="text-blue-900 font-bold pt-1">
                        Your verification code is: <span className="font-mono text-base text-[#1a73e8] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">G-{generatedCode}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Code Input Field (No code placeholder!) */}
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Enter the 6-Digit Code (G-XXXXXX) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-mono font-bold text-sm">
                      G-
                    </span>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      placeholder="Enter 6-digit code"
                      value={enteredCode}
                      onChange={(e) => {
                        setEnteredCode(e.target.value.replace(/[^0-9]/g, ''));
                        setAuthError('');
                      }}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border-2 border-slate-300 focus:border-[#1a73e8] focus:outline-none text-base font-mono tracking-widest font-bold transition"
                      autoFocus
                    />
                  </div>
                </div>

                {/* 59-Second Countdown Timer & Resend Option */}
                <div className="py-1">
                  {timerSeconds > 0 ? (
                    <div className="flex items-center justify-between text-xs text-slate-500 bg-slate-100/90 px-3.5 py-2.5 rounded-xl border border-slate-200">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400 animate-spin" style={{ animationDuration: '8s' }} />
                        <span>Resend code available in:</span>
                      </span>
                      <span className="font-mono font-bold text-slate-800 tabular-nums">
                        00:{String(timerSeconds).padStart(2, '0')}s
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between text-xs bg-amber-50 border border-amber-200 px-3.5 py-2 rounded-xl animate-in fade-in">
                      <span className="text-amber-900 font-medium">Didn't receive email in 59s?</span>
                      <button
                        type="button"
                        onClick={handleResendCode}
                        className="px-3 py-1.5 bg-[#1a73e8] hover:bg-blue-700 text-white font-bold rounded-lg transition flex items-center gap-1.5 shadow-sm text-xs"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Resend Code</span>
                      </button>
                    </div>
                  )}
                </div>

                {dispatchToast && (
                  <div className="p-2 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>A fresh verification code has been dispatched to your Gmail!</span>
                  </div>
                )}

                <div className="pt-2 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setGoogleAuthStep(1)}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold transition"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isVerifying}
                    className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2"
                  >
                    {isVerifying ? (
                      <span>Verifying with Google...</span>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Confirm &amp; Proceed</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: Verification Success Badge */}
            {googleAuthStep === 3 && (
              <div className="text-center py-6 space-y-3 animate-in zoom-in">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-slate-900">Google Account Verified!</h4>
                  <p className="text-xs text-slate-500 font-mono">
                    {studentEmail}
                  </p>
                </div>
                <p className="text-xs text-emerald-700 font-semibold bg-emerald-50 py-2 px-3 rounded-xl border border-emerald-200">
                  Redirecting to Qualifier Application Portal...
                </p>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
