import React, { useState } from 'react';
import { 
  Menu, X, ExternalLink, ChevronDown, GraduationCap, ShieldCheck, 
  LogIn, UserPlus, BookOpen, Layers, Phone, HelpCircle, User, Home, Sparkles 
} from 'lucide-react';
import { IIT_KGP_INFO, ANNOUNCEMENT_TICKER } from '../data/portalData';

export default function Navbar({ 
  onNavigate,
  onOpenDiagram, 
  onOpenSignUp,
  onOpenCertificate,
  currentView
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [academicsDropdown, setAcademicsDropdown] = useState(false);
  const [admissionsDropdown, setAdmissionsDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200 transition-all">
      {/* Top Announcement & Quick Links Bar */}
      <div className="bg-[#081528] text-white text-xs py-1.5 px-4 border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-1.5">
          
          {/* Announcement Ticker */}
          <div className="flex items-center space-x-2.5 overflow-hidden w-full md:w-auto">
            <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold px-2 py-0.5 rounded text-[10px] tracking-wider uppercase flex-shrink-0 shadow-sm animate-pulse">
              ANNOUNCEMENT
            </span>
            <div className="truncate text-slate-200 text-[11px] sm:text-xs font-medium">
              🚨 Admissions Open for Qualifier Batch 2026! Last Date to Apply: 30 October 2026
            </div>
          </div>

          {/* Quick Header Utilities */}
          <div className="flex items-center space-x-3 text-slate-300 text-xs flex-shrink-0">
            <button
              onClick={() => onNavigate('home')}
              className={`hover:text-white flex items-center gap-1 transition ${currentView === 'home' ? 'text-amber-400 font-semibold' : ''}`}
            >
              <Home className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Main Website</span>
            </button>
            <span className="text-slate-600">|</span>
            <button 
              onClick={onOpenDiagram}
              className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 transition"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Portal Diagram</span>
            </button>
            <span className="text-slate-600">|</span>
            <button 
              onClick={() => onNavigate('admin-login')}
              className={`hover:text-white flex items-center gap-1 transition ${currentView === 'admin-login' ? 'text-amber-400 font-semibold' : ''}`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin Gateway</span>
            </button>
            <span className="text-slate-600 hidden md:inline">|</span>
            <span className="text-slate-400 hidden lg:inline font-mono text-[11px]">
              Desk: +91 (03222) 282000
            </span>
          </div>

        </div>
      </div>

      {/* Main Brand & Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[72px] py-2 gap-4">
          
          {/* Logo & Institute Identity (Strictly aligned, zero text overlap) */}
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 group text-left flex-shrink-0"
          >
            {/* Official IIT KGP Logo Image */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white p-1 border-2 border-amber-500/60 shadow-md flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform overflow-hidden">
              <img 
                src="/iitkgp-logo.png" 
                alt="IIT Kharagpur Official Crest" 
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
              />
            </div>
            
            <div className="flex flex-col justify-center">
              {/* Hindi Title (Crisp, clean, no negative margins) */}
              <div className="text-[11px] sm:text-xs font-semibold text-kgp-crimson tracking-wide leading-tight">
                {IIT_KGP_INFO.hindiName}
              </div>
              {/* English Institution Name */}
              <div className="text-sm sm:text-base md:text-lg font-bold font-serif-title text-slate-900 leading-tight group-hover:text-kgp-crimson transition">
                {IIT_KGP_INFO.name}
              </div>
              {/* Degree Subtitle */}
              <div className="text-[11px] sm:text-xs font-semibold text-amber-700 flex items-center gap-1.5 leading-tight mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                <span>BS in Data Science & Artificial Intelligence</span>
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-5 text-sm font-medium text-slate-700">
            <a 
              href="#about" 
              onClick={() => onNavigate('home')} 
              className="hover:text-kgp-crimson transition py-2"
            >
              About KGP
            </a>
            
            {/* Academics Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setAcademicsDropdown(true)}
              onMouseLeave={() => setAcademicsDropdown(false)}
            >
              <button className="flex items-center space-x-1 hover:text-kgp-crimson transition py-2">
                <span>Academics</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
              {academicsDropdown && (
                <div className="absolute left-0 mt-0 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in">
                  <a href="#structure" onClick={() => onNavigate('home')} className="block px-4 py-2 hover:bg-slate-50 text-slate-700 hover:text-kgp-crimson">
                    <div className="font-semibold text-xs">Course Structure</div>
                    <div className="text-[11px] text-slate-500">Foundation, Diploma, BSc & BS</div>
                  </a>
                  <a href="#structure" onClick={() => onNavigate('home')} className="block px-4 py-2 hover:bg-slate-50 text-slate-700 hover:text-kgp-crimson">
                    <div className="font-semibold text-xs">DS & AI Syllabus Roadmap</div>
                    <div className="text-[11px] text-slate-500">142 Credits curriculum roadmap</div>
                  </a>
                  <button 
                    onClick={onOpenCertificate} 
                    className="w-full text-left px-4 py-2 hover:bg-slate-50 text-kgp-crimson font-medium text-xs flex items-center justify-between border-t border-slate-100"
                  >
                    <span>Sample Degree Certificate</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Admissions Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setAdmissionsDropdown(true)}
              onMouseLeave={() => setAdmissionsDropdown(false)}
            >
              <button className="flex items-center space-x-1 hover:text-kgp-crimson transition py-2">
                <span>Admissions</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
              {admissionsDropdown && (
                <div className="absolute left-0 mt-0 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in">
                  <button 
                    onClick={() => onNavigate('qualifier')} 
                    className="w-full text-left px-4 py-2 hover:bg-emerald-50 text-emerald-800"
                  >
                    <div className="font-semibold text-xs flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Qualifier Round Examination
                    </div>
                    <div className="text-[11px] text-slate-500">Register, Pay & take CBT Exam</div>
                  </button>
                  <a href="#eligibility" onClick={() => onNavigate('home')} className="block px-4 py-2 hover:bg-slate-50 text-slate-700 hover:text-kgp-crimson">
                    <div className="font-semibold text-xs text-amber-700">Direct Admission Pathways</div>
                    <div className="text-[11px] text-slate-500">WBJEE / JEE Advanced / Tripura JEE</div>
                  </a>
                  <a href="#fees" onClick={() => onNavigate('home')} className="block px-4 py-2 hover:bg-slate-50 text-slate-700 hover:text-kgp-crimson border-t border-slate-100">
                    <div className="font-semibold text-xs">Fee & Scholarship Calculator</div>
                    <div className="text-[11px] text-slate-500">Up to 75% fee waiver for income &lt; 1 LPA</div>
                  </a>
                </div>
              )}
            </div>

            <a href="#campus" onClick={() => onNavigate('home')} className="hover:text-kgp-crimson transition py-2">Campus & Placement</a>
            <a href="#faqs" onClick={() => onNavigate('home')} className="hover:text-kgp-crimson transition py-2">FAQs</a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center space-x-2 flex-shrink-0">
            {/* Standout Qualifier Exam Button */}
            <button
              onClick={() => onNavigate('qualifier')}
              className={`flex items-center space-x-1.5 px-3 py-2 text-xs sm:text-sm font-bold rounded-xl shadow transition ${
                currentView === 'qualifier'
                  ? 'bg-emerald-700 text-white ring-2 ring-amber-400'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Qualifier Portal</span>
            </button>

            {/* Student Login */}
            <button
              onClick={() => onNavigate('student-login')}
              className={`flex items-center space-x-1.5 px-3 py-2 text-xs sm:text-sm font-semibold rounded-xl transition ${
                currentView === 'student-login'
                  ? 'bg-kgp-crimson text-white shadow'
                  : 'text-kgp-crimson border border-kgp-crimson/40 hover:border-kgp-crimson hover:bg-red-50/50'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Student Login</span>
            </button>

            {/* Admin Login */}
            <button
              onClick={() => onNavigate('admin-login')}
              className={`flex items-center space-x-1.5 px-3 py-2 text-xs sm:text-sm font-semibold rounded-xl transition ${
                currentView === 'admin-login'
                  ? 'bg-slate-900 text-amber-400 shadow'
                  : 'text-slate-800 border border-slate-300 hover:border-slate-400 hover:bg-slate-50'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>Admin</span>
            </button>

            {/* Apply Now */}
            <button
              onClick={onOpenSignUp}
              className="flex items-center space-x-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-kgp-crimson to-red-800 hover:from-kgp-darkred hover:to-kgp-crimson rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Apply Now</span>
            </button>
          </div>

          {/* Mobile Navigation Controls */}
          <div className="lg:hidden flex items-center space-x-1.5">
            <button
              onClick={() => onNavigate('qualifier')}
              className="px-2 py-1.5 text-xs font-bold text-white bg-emerald-600 rounded-lg flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Exam</span>
            </button>
            <button
              onClick={() => onNavigate('student-login')}
              className="px-2 py-1.5 text-xs font-semibold text-kgp-crimson border border-kgp-crimson/40 rounded-lg"
            >
              Student
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-100 transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top-2">
          <div className="grid grid-cols-3 gap-2 pt-1 pb-2">
            <button
              onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
              className="w-full py-2 text-xs font-bold text-slate-800 border border-slate-300 rounded-lg bg-slate-50"
            >
              Home Page
            </button>
            <button
              onClick={() => { onNavigate('student-login'); setMobileMenuOpen(false); }}
              className="w-full py-2 text-xs font-bold text-kgp-crimson border border-kgp-crimson/40 rounded-lg bg-red-50/50"
            >
              Student Login
            </button>
            <button
              onClick={() => { onNavigate('admin-login'); setMobileMenuOpen(false); }}
              className="w-full py-2 text-xs font-bold text-kgp-navy border border-kgp-navy/40 rounded-lg bg-blue-50/50"
            >
              Admin Login
            </button>
          </div>

          <div className="space-y-1 text-sm font-medium text-slate-700 divide-y divide-slate-100">
            <button 
              onClick={() => { onNavigate('qualifier'); setMobileMenuOpen(false); }}
              className="w-full text-left py-2.5 text-emerald-700 font-bold flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Qualifier Round Exam Portal (Register, Pay & Test)</span>
            </button>
            <a 
              href="#about" 
              onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
              className="block py-2 hover:text-kgp-crimson"
            >
              About IIT Kharagpur
            </a>
            <a 
              href="#structure" 
              onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
              className="block py-2 hover:text-kgp-crimson"
            >
              Course Structure & Syllabus (Data Science & AI)
            </a>
            <a 
              href="#eligibility" 
              onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
              className="block py-2 hover:text-kgp-crimson font-semibold text-amber-700"
            >
              Direct Admission (WBJEE / JEE Advanced)
            </a>
            <a 
              href="#fees" 
              onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
              className="block py-2 hover:text-kgp-crimson"
            >
              Fee Structure & Scholarship Calculator
            </a>
            <button 
              onClick={() => { onOpenDiagram(); setMobileMenuOpen(false); }}
              className="w-full text-left py-2 text-amber-600 font-bold flex items-center justify-between"
            >
              <span>Explore Portal Block Diagram</span>
              <Layers className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
