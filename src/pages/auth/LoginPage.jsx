import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/ErpAuthContext';
import {
  Shield,
  UserCheck,
  GraduationCap,
  Lock,
  User,
  ArrowRight,
  Database,
  ShieldAlert,
  Clock,
  Send,
  AlertCircle,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';
import iitKgpLogo from '../../assets/logo';

export const LoginPage = ({ onNavigate, onBackToHome, initialRole = 'admin' }) => {
  const { login, logout, authFetch } = useAuth();
  const [authMode, setAuthMode] = useState('login');
  
  // Login State
  const [selectedRoleTab, setSelectedRoleTab] = useState(initialRole);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('Admin@123');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isPendingNotice, setIsPendingNotice] = useState(false);
  const [isRejectedNotice, setIsRejectedNotice] = useState(false);

  useEffect(() => {
    if (initialRole) {
      handleSelectRole(initialRole);
    }
  }, [initialRole]);

  // Registration Request Form State
  const [regRole, setRegRole] = useState('student');
  const [regForm, setRegForm] = useState({
    full_name: '',
    username: '',
    email: '',
    password: '',
    phone: '',
    department: 'Admissions & Document Verification Cell',
    designation: 'Verification Officer',
    category: 'GEN',
    dob: '2005-04-15',
    gender: 'Male',
    percentage_12th: 88.5,
    stream_12th: 'Science (PCM)',
    guardian_name: '',
    city: 'Kolkata',
    state: 'West Bengal',
    address: ''
  });
  const [regSubmitting, setRegSubmitting] = useState(false);
  const [regSuccess, setRegSuccess] = useState(null);
  const [regError, setRegError] = useState('');

  // Handle Role selection on login tab
  const handleSelectRole = (role) => {
    setSelectedRoleTab(role);
    setErrorMessage('');
    setIsPendingNotice(false);
    setIsRejectedNotice(false);
    if (role === 'admin') {
      setUsername('admin');
      setPassword('Admin@123');
    } else if (role === 'employee' || role === 'staff') {
      setUsername('staff');
      setPassword('Staff@123');
    } else if (role === 'student') {
      setUsername('student');
      setPassword('Student@123');
    }
  };

  const handleLoginSubmit = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setErrorMessage('');
    setIsPendingNotice(false);
    setIsRejectedNotice(false);

    let loginUser = username.trim();
    let loginPass = password.trim();

    if (!loginUser || !loginPass) {
      if (selectedRoleTab === 'admin') {
        loginUser = 'admin';
        loginPass = 'Admin@123';
      } else if (selectedRoleTab === 'employee' || selectedRoleTab === 'staff') {
        loginUser = 'staff';
        loginPass = 'Staff@123';
      } else if (selectedRoleTab === 'student') {
        loginUser = 'student';
        loginPass = 'Student@123';
      }
    }

    // Role gate guard before network call
    if ((selectedRoleTab === 'employee' || selectedRoleTab === 'staff') && loginUser.toLowerCase() === 'admin') {
      setErrorMessage('Gate Role Mismatch: You entered Super Admin credentials while on the Staff Officer Gate. Please select the "Super Admin" gate tab above, or use valid staff credentials (staff / Staff@123).');
      return;
    }
    if (selectedRoleTab === 'student' && loginUser.toLowerCase() === 'admin') {
      setErrorMessage('Gate Role Mismatch: You entered Super Admin credentials while on the Student Gate. Please select the "Super Admin" gate tab above, or use valid student credentials (student / Student@123).');
      return;
    }

    setIsSubmitting(true);
    try {
      const authenticatedUser = await login(loginUser, loginPass);

      // Strict Role Gate: Ensure credentials match the selected login tab
      if (selectedRoleTab === 'admin' && authenticatedUser.role !== 'admin') {
        logout();
        setErrorMessage('Access denied. These credentials do not have Super Admin authority. Please select the correct portal gate tab.');
        return;
      }
      if ((selectedRoleTab === 'employee' || selectedRoleTab === 'staff') && authenticatedUser.role !== 'employee') {
        logout();
        setErrorMessage('Access denied. These credentials do not belong to an authorized Staff Officer account.');
        return;
      }
      if (selectedRoleTab === 'student' && authenticatedUser.role !== 'student') {
        logout();
        setErrorMessage('Access denied. These credentials do not belong to an enrolled BS Qualifier Student account.');
        return;
      }

      // Explicit navigation strictly to respective isolated portal
      if (authenticatedUser.role === 'admin') {
        if (onNavigate) onNavigate('admin-portal');
        else window.location.hash = 'admin-portal';
      } else if (authenticatedUser.role === 'employee') {
        if (onNavigate) onNavigate('staff-portal');
        else window.location.hash = 'staff-portal';
      } else if (authenticatedUser.role === 'student') {
        if (onNavigate) onNavigate('student-erp');
        else window.location.hash = 'student-erp';
      }
    } catch (err) {
      const msg = err.message || 'Authentication failed: Invalid credentials or account unauthorized.';
      setErrorMessage(msg);
      if (msg.toLowerCase().includes('pending') || msg.toLowerCase().includes('awaiting') || msg.toLowerCase().includes('approval required')) {
        setIsPendingNotice(true);
        setIsRejectedNotice(false);
      } else if (msg.toLowerCase().includes('rejected') || msg.toLowerCase().includes('denied')) {
        setIsRejectedNotice(true);
        setIsPendingNotice(false);
      } else {
        setIsPendingNotice(false);
        setIsRejectedNotice(false);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegError('');
    setRegSubmitting(true);

    try {
      const res = await authFetch('/api/auth/register-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: regRole,
          ...regForm
        })
      });

      let data = {};
      try {
        data = await res.json();
      } catch {
        throw new Error('Authentication gateway returned an unexpected response format. Please try again.');
      }

      if (!res.ok || data.error) {
        throw new Error(data.error || 'Failed to submit registration request');
      }

      setRegSuccess(data.request || {
        full_name: regForm.full_name,
        role: regRole,
        username: regForm.username,
        created_at: new Date().toISOString()
      });
    } catch (err) {
      setRegError(err.message || 'Error submitting registration request');
    } finally {
      setRegSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f7ff] text-slate-800 flex flex-col justify-center items-center p-4 sm:p-6 relative">
      {/* Return to Main Website Button */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
        <button
          onClick={onBackToHome || (() => { window.location.hash = 'home'; })}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-sky-300 hover:bg-sky-50 text-slate-700 text-xs font-bold shadow-2xs transition cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Main Website</span>
        </button>
      </div>

      {/* Authentic IIT Kharagpur Institution Header (Matching Image 2) */}
      <div className="max-w-xl w-full text-center mb-6 pt-6 sm:pt-0">
        <img
          src={iitKgpLogo}
          alt="IIT Kharagpur Official Logo"
          className="w-20 h-20 object-contain mx-auto mb-3 drop-shadow-sm"
        />
        <h2 className="text-xs font-serif font-bold tracking-wider text-[#800000]">
          भारतीय प्रौद्योगिकी संस्थान खड़गपुर
        </h2>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-0.5 font-serif">
          INDIAN INSTITUTE OF TECHNOLOGY KHARAGPUR
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
          BS Program Qualifier Directorate • Enterprise Admin ERP & LMS Portal
        </p>
        <p className="text-[11px] italic text-[#800000] font-serif mt-1">
          "योगः कर्मसु कौशलम्" — Dedicated to the Service of the Nation
        </p>
        <div className="inline-flex items-center gap-1.5 text-[11px] text-sky-900 bg-sky-100 border border-sky-200 px-3 py-0.5 rounded-full mt-2 font-mono">
          <Database className="w-3.5 h-3.5 text-[#800000]" />
          PostgreSQL ACID Schema • Super Admin Authorization Gate
        </div>
      </div>

      {/* Main Card with Deep Corporate Red & Light Sky Blue Theme */}
      <div className="max-w-xl w-full bg-white rounded-2xl p-6 sm:p-8 border border-sky-200 shadow-md space-y-6">
        {/* Toggle Mode: Sign In vs Registration Request */}
        <div className="flex border-b border-sky-100 pb-3 gap-2">
          <button
            type="button"
            onClick={() => {
              setAuthMode('login');
              setRegSuccess(null);
            }}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
              authMode === 'login'
                ? 'bg-[#800000] text-white shadow-sm'
                : 'bg-sky-50 text-slate-600 hover:bg-sky-100 border border-sky-200'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Sign In to Portal</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setAuthMode('register');
              setErrorMessage('');
            }}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
              authMode === 'register'
                ? 'bg-[#800000] text-white shadow-sm'
                : 'bg-sky-50 text-slate-600 hover:bg-sky-100 border border-sky-200'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Submit Registration Request</span>
          </button>
        </div>

        {/* MODE 1: LOGIN GATE */}
        {authMode === 'login' && (
          <div className="space-y-5">
            {/* Role Gate Tabs */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 font-mono">
                Select Isolated Portal Gateway:
              </label>
              <div className="grid grid-cols-3 gap-2 bg-[#f0f7ff] p-1.5 rounded-2xl border border-sky-200">
                <button
                  type="button"
                  onClick={() => handleSelectRole('admin')}
                  className={`py-2.5 px-2 text-xs font-bold rounded-xl transition-all flex flex-col items-center gap-1 cursor-pointer ${
                    selectedRoleTab === 'admin'
                      ? 'bg-[#800000] text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <Shield className={`w-4 h-4 ${selectedRoleTab === 'admin' ? 'text-amber-300' : 'text-slate-400'}`} />
                  <span>Super Admin</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectRole('employee')}
                  className={`py-2.5 px-2 text-xs font-bold rounded-xl transition-all flex flex-col items-center gap-1 cursor-pointer ${
                    selectedRoleTab === 'employee' || selectedRoleTab === 'staff'
                      ? 'bg-[#0f2744] text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <UserCheck className={`w-4 h-4 ${selectedRoleTab === 'employee' || selectedRoleTab === 'staff' ? 'text-sky-300' : 'text-slate-400'}`} />
                  <span>Staff Officer</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectRole('student')}
                  className={`py-2.5 px-2 text-xs font-bold rounded-xl transition-all flex flex-col items-center gap-1 cursor-pointer ${
                    selectedRoleTab === 'student'
                      ? 'bg-[#064e3b] text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <GraduationCap className={`w-4 h-4 ${selectedRoleTab === 'student' ? 'text-emerald-300' : 'text-slate-400'}`} />
                  <span>BS Student</span>
                </button>
              </div>
            </div>

            {/* Dynamic Gate Information Header Card */}
            <div className={`p-4 rounded-2xl border space-y-1.5 transition-colors ${
              selectedRoleTab === 'admin'
                ? 'bg-red-50/70 border-red-200'
                : selectedRoleTab === 'employee' || selectedRoleTab === 'staff'
                ? 'bg-blue-50/70 border-blue-200'
                : 'bg-emerald-50/70 border-emerald-200'
            }`}>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold font-serif ${
                  selectedRoleTab === 'admin'
                    ? 'text-[#800000]'
                    : selectedRoleTab === 'employee' || selectedRoleTab === 'staff'
                    ? 'text-[#0f2744]'
                    : 'text-[#064e3b]'
                }`}>
                  {selectedRoleTab === 'admin' && 'Executive Super Admin Directorate Gate'}
                  {(selectedRoleTab === 'employee' || selectedRoleTab === 'staff') && 'Staff Officer Academic Operations Gate'}
                  {selectedRoleTab === 'student' && 'BS Qualifier Student Assessment Gate'}
                </span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                  selectedRoleTab === 'admin'
                    ? 'bg-red-200 text-red-900'
                    : selectedRoleTab === 'employee' || selectedRoleTab === 'staff'
                    ? 'bg-blue-200 text-blue-900'
                    : 'bg-emerald-200 text-emerald-900'
                }`}>
                  {selectedRoleTab === 'admin' && 'Admin Only'}
                  {(selectedRoleTab === 'employee' || selectedRoleTab === 'staff') && 'Staff Only'}
                  {selectedRoleTab === 'student' && 'Student Only'}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                {selectedRoleTab === 'admin' && 'Sign in to access the Super Admin control panel, pending approvals, live staff presence tracking, and global settings.'}
                {(selectedRoleTab === 'employee' || selectedRoleTab === 'staff') && 'Sign in to access the Staff Operations Center, assigned workflow tasks, progress sliders, and document verification queue.'}
                {selectedRoleTab === 'student' && 'Sign in to access your personal BS degree learning hub, course video lectures, fee ledger, and qualifier examination.'}
              </p>
            </div>

            {/* Error Message Alert */}
            {errorMessage && (
              <div className={`p-3.5 rounded-xl text-xs font-semibold flex items-start gap-2.5 ${
                isPendingNotice
                  ? 'bg-amber-50 border-2 border-amber-400 text-amber-950'
                  : isRejectedNotice
                  ? 'bg-red-50 border-2 border-red-500 text-red-950'
                  : 'bg-red-50 border border-red-300 text-red-900'
              }`}>
                {isPendingNotice ? (
                  <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                ) : isRejectedNotice ? (
                  <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                )}
                <div className="space-y-1">
                  <div className="font-bold font-serif">
                    {isPendingNotice && 'Registration Pending Super Admin Verification'}
                    {isRejectedNotice && 'Registration Request Strictly Rejected'}
                    {!isPendingNotice && !isRejectedNotice && 'Authentication Warning'}
                  </div>
                  <p className="text-[11px] leading-relaxed font-normal">{errorMessage}</p>
                </div>
              </div>
            )}

            {/* Login Credentials Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  {selectedRoleTab === 'student' ? 'Candidate Username or Email' : (selectedRoleTab === 'employee' || selectedRoleTab === 'staff') ? 'Staff Username or Official ID' : 'Super Admin Username'}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={
                      selectedRoleTab === 'admin'
                        ? 'admin'
                        : selectedRoleTab === 'student'
                        ? 'student'
                        : 'staff'
                    }
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-sky-200 bg-white text-slate-900 text-xs font-medium focus:ring-2 focus:ring-[#800000] focus:border-[#800000] outline-none font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter account password..."
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-sky-200 bg-white text-slate-900 text-xs font-medium focus:ring-2 focus:ring-[#800000] focus:border-[#800000] outline-none font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2.5 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-50 cursor-pointer ${
                  selectedRoleTab === 'admin'
                    ? 'bg-[#800000] hover:bg-[#660000]'
                    : selectedRoleTab === 'student'
                    ? 'bg-[#064e3b] hover:bg-[#047857]'
                    : 'bg-[#0f2744] hover:bg-[#1e3a5f]'
                }`}
              >
                {isSubmitting ? (
                  'Authenticating with PostgreSQL...'
                ) : (
                  <>
                    <span>
                      {selectedRoleTab === 'admin' && 'Authenticate & Enter Master Admin Console'}
                      {(selectedRoleTab === 'employee' || selectedRoleTab === 'staff') && 'Authenticate & Enter Staff Operations Center'}
                      {selectedRoleTab === 'student' && 'Authenticate & Enter Student Learning Hub'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Quick 1-Click Credentials Helpers */}
            <div className="space-y-2 pt-1 border-t border-slate-100">
              {selectedRoleTab === 'admin' && (
                <div
                  onClick={() => {
                    setUsername('admin');
                    setPassword('Admin@123');
                  }}
                  className="p-3 bg-red-50/70 rounded-xl border border-red-200 text-xs text-slate-700 flex items-center justify-between cursor-pointer hover:bg-red-100/70 transition-colors"
                  title="Click to apply Super Admin credentials"
                >
                  <div>
                    <span className="font-bold text-[#800000]">Master Super Admin Credentials:</span>
                    <div className="text-[11px] font-mono text-slate-600 mt-0.5">
                      Username: <strong>admin</strong> • Password: <strong>Admin@123</strong>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Ready (Click to Apply)
                  </span>
                </div>
              )}

              {(selectedRoleTab === 'employee' || selectedRoleTab === 'staff') && (
                <div
                  onClick={() => {
                    setUsername('staff');
                    setPassword('Staff@123');
                  }}
                  className="p-3 bg-blue-50/70 rounded-xl border border-blue-200 text-xs text-slate-700 flex items-center justify-between cursor-pointer hover:bg-blue-100/70 transition-colors"
                  title="Click to apply Staff credentials"
                >
                  <div>
                    <span className="font-bold text-[#0f2744]">Approved Staff Officer Credentials:</span>
                    <div className="text-[11px] font-mono text-slate-600 mt-0.5">
                      Username: <strong>staff</strong> • Password: <strong>Staff@123</strong>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
                    Ready (Click to Apply)
                  </span>
                </div>
              )}

              {selectedRoleTab === 'student' && (
                <div
                  onClick={() => {
                    setUsername('student');
                    setPassword('Student@123');
                  }}
                  className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200 text-xs text-slate-700 flex items-center justify-between cursor-pointer hover:bg-emerald-100/70 transition-colors"
                  title="Click to apply Student credentials"
                >
                  <div>
                    <span className="font-bold text-[#064e3b]">Approved BS Candidate Credentials:</span>
                    <div className="text-[11px] font-mono text-slate-600 mt-0.5">
                      Username: <strong>student</strong> • Password: <strong>Student@123</strong>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Ready (Click to Apply)
                  </span>
                </div>
              )}

              {/* Registration Request Link */}
              <div className="p-3 bg-[#f0f7ff] rounded-xl border border-sky-200 text-xs flex items-center justify-between">
                <span className="text-[11px] text-slate-600">Need a brand new custom account?</span>
                <button
                  type="button"
                  onClick={() => setAuthMode('register')}
                  className="text-xs font-bold text-[#800000] hover:underline cursor-pointer"
                >
                  Submit Registration Request &rarr;
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODE 2: REGISTRATION REQUEST SUBMISSION */}
        {authMode === 'register' && (
          <div className="space-y-5">
            {regSuccess ? (
              <div className="p-5 rounded-2xl bg-[#f0f7ff] border-2 border-sky-300 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center mx-auto text-emerald-700">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 font-serif">
                    Registration Request Submitted!
                  </h3>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-100 border border-amber-300 px-3 py-1 rounded-full mt-2 font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    Status: Pending Admin Verification
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-sky-200 text-left text-xs space-y-2">
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span className="text-slate-500">Applicant Name:</span>
                    <span className="font-bold text-slate-900">{regSuccess.full_name}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span className="text-slate-500">Account Type:</span>
                    <span className="font-bold uppercase text-[#800000]">{regSuccess.role}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span className="text-slate-500">Username:</span>
                    <span className="font-mono font-bold text-slate-900">{regSuccess.username}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Submitted At:</span>
                    <span className="font-mono text-slate-700">{new Date(regSuccess.created_at).toLocaleString()}</span>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-left text-xs text-amber-900 space-y-1">
                  <div className="font-bold flex items-center gap-1 font-serif">
                    <Shield className="w-4 h-4 text-amber-700" />
                    Next Step: Super Admin Approval Required
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Your request has been placed in the <strong>Admissions Directorate Pending Approvals Queue</strong>. The Super Admin must log into the Admin Panel and click <strong>"Approve / Grant Permission"</strong> to activate your credentials.
                  </p>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('login');
                      setSelectedRoleTab(regSuccess.role);
                      setUsername(regSuccess.username);
                      setPassword('');
                      setRegSuccess(null);
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-[#800000] hover:bg-[#660000] text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    Go to Login Screen
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setRegSuccess(null);
                      setRegForm({
                        full_name: '',
                        username: '',
                        email: '',
                        password: '',
                        phone: '',
                        department: 'Admissions & Document Verification Cell',
                        designation: 'Verification Officer',
                        category: 'GEN',
                        dob: '2005-04-15',
                        gender: 'Male',
                        percentage_12th: 88.5,
                        stream_12th: 'Science (PCM)',
                        guardian_name: '',
                        city: 'Kolkata',
                        state: 'West Bengal',
                        address: ''
                      });
                    }}
                    className="px-4 py-2.5 rounded-xl bg-white border border-sky-300 text-slate-700 font-bold text-xs hover:bg-sky-50 transition-colors cursor-pointer"
                  >
                    Submit Another
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 font-mono">
                    Select Registration Category:
                  </label>
                  <div className="grid grid-cols-2 gap-2 bg-[#f0f7ff] p-1.5 rounded-xl border border-sky-200">
                    <button
                      type="button"
                      onClick={() => setRegRole('student')}
                      className={`py-2 px-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        regRole === 'student'
                          ? 'bg-[#800000] text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <GraduationCap className="w-4 h-4" />
                      <span>Qualifier Candidate</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRegRole('employee')}
                      className={`py-2 px-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        regRole === 'employee'
                          ? 'bg-[#800000] text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>Academic / Staff Officer</span>
                    </button>
                  </div>
                </div>

                {regError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{regError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Full Legal Name *</label>
                    <input
                      type="text"
                      required
                      value={regForm.full_name}
                      onChange={(e) => setRegForm({ ...regForm, full_name: e.target.value })}
                      placeholder="e.g. Suman Sengupta"
                      className="w-full px-3 py-2 rounded-xl border border-sky-200 text-xs focus:ring-1 focus:ring-[#800000] focus:border-[#800000] outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Desired Username *</label>
                    <input
                      type="text"
                      required
                      value={regForm.username}
                      onChange={(e) => setRegForm({ ...regForm, username: e.target.value })}
                      placeholder="e.g. suman.sengupta"
                      className="w-full px-3 py-2 rounded-xl border border-sky-200 text-xs font-mono focus:ring-1 focus:ring-[#800000] focus:border-[#800000] outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={regForm.email}
                      onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                      placeholder="e.g. suman@example.com"
                      className="w-full px-3 py-2 rounded-xl border border-sky-200 text-xs focus:ring-1 focus:ring-[#800000] focus:border-[#800000] outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Password *</label>
                    <input
                      type="password"
                      required
                      value={regForm.password}
                      onChange={(e) => setRegForm({ ...regForm, password: e.target.value })}
                      placeholder="Choose a secure password"
                      className="w-full px-3 py-2 rounded-xl border border-sky-200 text-xs font-mono focus:ring-1 focus:ring-[#800000] focus:border-[#800000] outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Phone Number *</label>
                    <input
                      type="text"
                      required
                      value={regForm.phone}
                      onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2 rounded-xl border border-sky-200 text-xs focus:ring-1 focus:ring-[#800000] focus:border-[#800000] outline-none"
                    />
                  </div>

                  {/* Student Specific Fields */}
                  {regRole === 'student' && (
                    <>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-700">Category *</label>
                        <select
                          value={regForm.category}
                          onChange={(e) => setRegForm({ ...regForm, category: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-sky-200 text-xs bg-white focus:ring-1 focus:ring-[#800000] focus:border-[#800000] outline-none"
                        >
                          <option value="GEN">General (Open Merit)</option>
                          <option value="OBC-NCL">OBC-NCL</option>
                          <option value="EWS">Economically Weaker Section (EWS)</option>
                          <option value="SC">Scheduled Caste (SC)</option>
                          <option value="ST">Scheduled Tribe (ST)</option>
                          <option value="PwD">Persons with Disabilities (PwD)</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-700">12th Board Percentage *</label>
                        <input
                          type="number"
                          step="0.01"
                          min="50"
                          max="100"
                          required
                          value={regForm.percentage_12th}
                          onChange={(e) => setRegForm({ ...regForm, percentage_12th: parseFloat(e.target.value) || 0 })}
                          className="w-full px-3 py-2 rounded-xl border border-sky-200 text-xs focus:ring-1 focus:ring-[#800000] focus:border-[#800000] outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-700">12th Stream *</label>
                        <input
                          type="text"
                          required
                          value={regForm.stream_12th}
                          onChange={(e) => setRegForm({ ...regForm, stream_12th: e.target.value })}
                          placeholder="e.g. Science (PCM/PCMB)"
                          className="w-full px-3 py-2 rounded-xl border border-sky-200 text-xs focus:ring-1 focus:ring-[#800000] focus:border-[#800000] outline-none"
                        />
                      </div>
                    </>
                  )}

                  {/* Employee Specific Fields */}
                  {regRole === 'employee' && (
                    <>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-700">Assigned Department *</label>
                        <select
                          value={regForm.department}
                          onChange={(e) => setRegForm({ ...regForm, department: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-sky-200 text-xs bg-white focus:ring-1 focus:ring-[#800000] focus:border-[#800000] outline-none"
                        >
                          <option value="Admissions & Document Verification Cell">Admissions & Document Verification Cell</option>
                          <option value="LMS Academic Operations">LMS Academic Operations</option>
                          <option value="Qualifier Examination Cell">Qualifier Examination Cell</option>
                          <option value="Admissions Directorate Office">Admissions Directorate Office</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-700">Staff Designation *</label>
                        <input
                          type="text"
                          required
                          value={regForm.designation}
                          onChange={(e) => setRegForm({ ...regForm, designation: e.target.value })}
                          placeholder="e.g. Senior Verification Officer"
                          className="w-full px-3 py-2 rounded-xl border border-sky-200 text-xs focus:ring-1 focus:ring-[#800000] focus:border-[#800000] outline-none"
                        />
                      </div>
                    </>
                  )}
                </div>

                <div className="p-3 bg-[#f0f7ff] rounded-xl border border-sky-200 text-[11px] text-slate-600 space-y-1">
                  <div className="font-bold text-[#800000] flex items-center gap-1 font-serif">
                    <Shield className="w-3.5 h-3.5" />
                    Mandatory Admin Approval Workflow:
                  </div>
                  <p>
                    Upon submission, your application will enter the <strong>Pending Admin Verification</strong> queue. The Admissions Directorate Super Admin must review and grant approval first.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={regSubmitting}
                  className="w-full py-2.5 rounded-xl bg-[#800000] hover:bg-[#660000] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {regSubmitting ? 'Submitting to Super Admin Queue...' : 'Submit Request for Admin Verification'}
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        )}
      </div>

      {/* Institutional Footer */}
      <footer className="mt-8 text-center text-xs text-slate-500 font-mono">
        Indian Institute of Technology Kharagpur • Kharagpur, West Bengal 721302
      </footer>
    </div>
  );
};
export default LoginPage;
