import React from 'react';
import { useAuth, useTheme } from '../context/ErpAuthContext';
import {
  Shield,
  UserCheck,
  GraduationCap,
  Sun,
  Moon,
  LogOut,
  Database,
  Building2,
  CheckCircle2,
  Lock,
  Radio,
  FileCheck2,
  CheckSquare,
  Award,
  ArrowLeft
} from 'lucide-react';
import iitKgpLogo from '../assets/logo';

export const ErpNavbar = ({ onBackToHome }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  if (!user) return null;

  // 1. SUPER ADMIN UPPER AREA (Deep Corporate Red & Gold - Matches Image 3)
  if (user.role === 'admin') {
    return (
      <header className="sticky top-0 z-50 bg-white/98 backdrop-blur shadow-sm border-b border-red-200 transition-colors">
        {/* Institutional Super Admin Strip */}
        <div className="bg-[#800000] text-amber-50 text-[11px] px-4 py-1.5 flex flex-wrap items-center justify-between border-b border-amber-900/60">
          <div className="flex items-center gap-3">
            <span className="font-semibold tracking-wider text-amber-200 font-serif">
              🏛️ भारतीय प्रौद्योगिकी संस्थान खड़गपुर • MASTER ADMINISTRATION DIRECTORATE
            </span>
            <span className="text-amber-300/40 hidden md:inline">|</span>
            <span className="text-amber-100/90 hidden md:inline font-mono">
              Executive Super Admin Supreme Console • Room 204 Main Building
            </span>
          </div>
          <div className="flex items-center gap-3">
            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="inline-flex items-center gap-1 text-[11px] text-amber-300 hover:text-white bg-black/20 hover:bg-black/40 border border-amber-500/40 px-2 py-0.5 rounded cursor-pointer transition"
              >
                <ArrowLeft className="w-3 h-3" />
                <span>Return to Public Website</span>
              </button>
            )}
            <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-300 bg-emerald-950/80 border border-emerald-700/70 px-2 py-0.5 rounded font-mono font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              PostgreSQL ACID Master Online
            </span>
            <span className="text-amber-200 font-mono text-[11px] hidden sm:inline">
              ACADEMIC CYCLE: 2026-TERM-1
            </span>
          </div>
        </div>

        {/* Super Admin Identity Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <img
              src={iitKgpLogo}
              alt="IIT Kharagpur Crest"
              className="w-11 h-11 object-contain drop-shadow-xs"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-slate-900 text-base leading-tight tracking-tight font-serif">
                  IIT Kharagpur Super Admin Directorate
                </h1>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-red-100 text-[#800000] border border-red-300 font-mono flex items-center gap-1">
                  <Shield className="w-3 h-3 text-[#800000]" />
                  Master Console
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Academic Governance • Staff Workflows • Candidate Shortlisting • System Audit
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-red-50 text-[#800000] border border-red-200 text-xs font-semibold font-mono">
              <Shield className="w-3.5 h-3.5 text-[#800000]" />
              Super Admin Authority Active
            </span>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200 cursor-pointer"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-bold text-slate-900 flex items-center justify-end gap-1.5 font-serif">
                  {user.full_name}
                  <span className="text-[10px] uppercase font-bold font-mono px-1.5 py-0.5 rounded bg-red-100 text-[#800000] border border-red-200">
                    Super Admin
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 font-mono">
                  {user.user_code || 'KGP-ADM-0001'}
                </div>
              </div>

              <button
                onClick={logout}
                className="px-3.5 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-[#800000] border border-red-200 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                title="Sign Out to Login Gate"
              >
                <LogOut className="w-3.5 h-3.5 text-red-600" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>
    );
  }

  // 2. STAFF OFFICER UPPER AREA (Deep Institutional Navy Blue & Ice Blue)
  if (user.role === 'employee') {
    return (
      <header className="sticky top-0 z-50 bg-white/98 backdrop-blur shadow-sm border-b border-sky-300 transition-colors">
        {/* Staff Institutional Strip */}
        <div className="bg-[#0f2744] text-sky-50 text-[11px] px-4 py-1.5 flex flex-wrap items-center justify-between border-b border-sky-950">
          <div className="flex items-center gap-3">
            <span className="font-semibold tracking-wider text-sky-200 font-serif">
              📋 भारतीय प्रौद्योगिकी संस्थान खड़गपुर • OFFICE OF ACADEMIC AFFAIRS & SCRUTINY
            </span>
            <span className="text-sky-400/40 hidden md:inline">|</span>
            <span className="text-sky-100/90 hidden md:inline font-mono">
              Staff Officer Operations & Document Verification Center
            </span>
          </div>
          <div className="flex items-center gap-3">
            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="inline-flex items-center gap-1 text-[11px] text-sky-300 hover:text-white bg-black/20 hover:bg-black/40 border border-sky-500/40 px-2 py-0.5 rounded cursor-pointer transition"
              >
                <ArrowLeft className="w-3 h-3" />
                <span>Return to Public Website</span>
              </button>
            )}
            <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-300 bg-emerald-950/80 border border-emerald-700/70 px-2 py-0.5 rounded font-mono font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              Live Telemetry Heartbeat Active
            </span>
            <span className="text-sky-200 font-mono text-[11px] hidden sm:inline">
              OPERATIONS DESK
            </span>
          </div>
        </div>

        {/* Staff Identity Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0f2744] to-[#1e3a5f] text-white flex items-center justify-center font-bold text-sm shadow-sm border border-sky-800 font-serif">
              STAFF
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-slate-900 text-base leading-tight tracking-tight font-serif">
                  IIT Kharagpur Staff Operations Center
                </h1>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-300 font-mono flex items-center gap-1">
                  <UserCheck className="w-3 h-3 text-blue-700" />
                  Staff Officer
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {user.department || 'Admissions & Document Verification Cell'} • Academic Task Workflows
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Session Online & Time Tracked
            </span>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200 cursor-pointer"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-bold text-slate-900 flex items-center justify-end gap-1.5 font-serif">
                  {user.full_name}
                  <span className="text-[10px] uppercase font-bold font-mono px-1.5 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-200">
                    Officer
                  </span>
                </div>
                <div className="text-[11px] text-blue-700 font-mono font-semibold">
                  {user.user_code}
                </div>
              </div>

              <button
                onClick={logout}
                className="px-3.5 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-[#800000] border border-red-200 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                title="Sign Out to Login Gate"
              >
                <LogOut className="w-3.5 h-3.5 text-red-600" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>
    );
  }

  // 3. STUDENT UPPER AREA
  return (
    <header className="sticky top-0 z-50 bg-white/98 backdrop-blur shadow-sm border-b border-emerald-200 transition-colors">
      <div className="bg-[#064e3b] text-emerald-50 text-[11px] px-4 py-1.5 flex flex-wrap items-center justify-between border-b border-emerald-950">
        <div className="flex items-center gap-3">
          <span className="font-semibold tracking-wider text-emerald-200 font-serif">
            🎓 भारतीय प्रौद्योगिकी संस्थान खड़गपुर • DIRECTORATE OF ONLINE DEGREES
          </span>
          <span className="text-emerald-400/40 hidden md:inline">|</span>
          <span className="text-emerald-100/90 hidden md:inline font-mono">
            BS Degree Qualifier Learning Hub & Candidate Assessment
          </span>
        </div>
        <div className="flex items-center gap-3">
          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-1 text-[11px] text-emerald-300 hover:text-white bg-black/20 hover:bg-black/40 border border-emerald-500/40 px-2 py-0.5 rounded cursor-pointer transition"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Return to Public Website</span>
            </button>
          )}
          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-200 bg-emerald-900/80 border border-emerald-700 px-2 py-0.5 rounded font-mono font-medium">
            TERM 1 QUALIFIER
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#064e3b] to-[#047857] text-white flex items-center justify-center font-bold text-sm shadow-sm border border-emerald-700 font-serif">
            STUDENT
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-slate-900 text-base leading-tight tracking-tight font-serif">
                IIT Kharagpur BS Qualifier Student Hub
              </h1>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300 font-mono flex items-center gap-1">
                <GraduationCap className="w-3 h-3 text-emerald-700" />
                Candidate
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              BS in Data Science & Artificial Intelligence • Indian Institute of Technology Kharagpur
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold font-mono">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Enrolled Candidate Dossier
          </span>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200 cursor-pointer"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold text-slate-900 flex items-center justify-end gap-1.5 font-serif">
                {user.full_name}
                <span className="text-[10px] uppercase font-bold font-mono px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-200">
                  Student
                </span>
              </div>
              <div className="text-[11px] text-emerald-700 font-mono font-semibold">
                {user.user_code}
              </div>
            </div>

            <button
              onClick={logout}
              className="px-3.5 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-[#800000] border border-red-200 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
              title="Sign Out to Login Gate"
            >
              <LogOut className="w-3.5 h-3.5 text-red-600" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
export default ErpNavbar;
