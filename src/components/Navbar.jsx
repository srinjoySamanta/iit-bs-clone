import React, { useState } from 'react';
import { 
  Menu, X, ExternalLink, ChevronDown, GraduationCap, ShieldCheck, 
  LogIn, UserPlus, BookOpen, Layers, Phone, HelpCircle, User, Home 
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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur shadow-md transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-kgp-navy text-white text-xs py-1.5 px-4 border-b border-amber-600/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-3 overflow-hidden">
            <span className="bg-amber-500 text-kgp-darknavy font-bold px-2 py-0.5 rounded text-[10px] tracking-wider uppercase flex-shrink-0 animate-pulse">
              ANNOUNCEMENT
            </span>
            <div className="truncate text-slate-200">
              {ANNOUNCEMENT_TICKER[0]}
            </div>
          </div>
          <div className="flex items-center space-x-4 text-slate-300 text-xs flex-shrink-0">
            <button
              onClick={() => onNavigate('home')}
              className={`hover:text-white flex items-center gap-1 transition ${currentView === 'home' ? 'text-amber-400 font-bold' : ''}`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Main Website (Single Page)</span>
            </button>
            <span className="text-slate-500">|</span>
            <button 
              onClick={onOpenDiagram}
              className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 transition"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Block Diagram</span>
            </button>
            <span className="text-slate-500">|</span>
            <button 
              onClick={() => onNavigate('admin-login')}
              className={`hover:text-white flex items-center gap-1 transition ${currentView === 'admin-login' ? 'text-amber-400 font-bold' : ''}`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin Gateway</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Brand & Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Institute Identity */}
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-3 group text-left"
          >
            {/* Official IIT KGP Logo Image */}
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-white p-1 border-2 border-kgp-gold shadow-md flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform overflow-hidden">
              <img 
                src="/iitkgp-logo.png" 
                alt="IIT Kharagpur Official Crest" 
                className="w-11 h-11 sm:w-12 sm:h-12 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="text-[11px] sm:text-xs font-semibold text-kgp-crimson tracking-wider uppercase">
                  {IIT_KGP_INFO.hindiName}
                </span>
              </div>
              <span className="text-base sm:text-lg font-bold font-serif-title text-slate-900 leading-tight group-hover:text-kgp-crimson transition">
                {IIT_KGP_INFO.name}
              </span>
              <span className="text-xs font-semibold text-kgp-gold tracking-wide flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                BS Programme in Data Science & Artificial Intelligence
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium text-slate-700">
            <button 
              onClick={() => onNavigate('home')} 
              className={`hover:text-kgp-crimson transition py-2 ${currentView === 'home' ? 'text-kgp-crimson font-bold' : ''}`}
            >
              Main Website
            </button>
            <a href="#about" onClick={() => onNavigate('home')} className="hover:text-kgp-crimson transition py-2">About KGP</a>
            
            {/* Academics Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setAcademicsDropdown(true)}
              onMouseLeave={() => setAcademicsDropdown(false)}
            >
              <button className="flex items-center space-x-1 hover:text-kgp-crimson transition py-2">
                <span>Academics</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>
              {academicsDropdown && (
                <div className="absolute left-0 mt-0 w-64 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50">
                  <a href="#structure" onClick={() => onNavigate('home')} className="block px-4 py-2 hover:bg-slate-50 text-slate-700 hover:text-kgp-crimson">
                    <div className="font-semibold">Course Structure</div>
                    <div className="text-xs text-slate-500">Foundation, Diploma, BSc & BS</div>
                  </a>
                  <a href="#structure" onClick={() => onNavigate('home')} className="block px-4 py-2 hover:bg-slate-50 text-slate-700 hover:text-kgp-crimson">
                    <div className="font-semibold">Syllabus Details</div>
                    <div className="text-xs text-slate-500">142 Credits curriculum roadmap</div>
                  </a>
                  <button 
                    onClick={onOpenCertificate} 
                    className="w-full text-left px-4 py-2 hover:bg-slate-50 text-kgp-crimson font-medium text-xs flex items-center justify-between"
                  >
                    <span>Sample Degree Certificate</span>
                    <ExternalLink className="w-3.5 h-3.5" />
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
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>
              {admissionsDropdown && (
                <div className="absolute left-0 mt-0 w-72 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50">
                  <a href="#eligibility" onClick={() => onNavigate('home')} className="block px-4 py-2 hover:bg-slate-50 text-slate-700 hover:text-kgp-crimson">
                    <div className="font-semibold text-emerald-700">Direct Admission Pathways</div>
                    <div className="text-xs text-slate-500">WBJEE / JEE Advanced / Tripura JEE</div>
                  </a>
                  <a href="#eligibility" onClick={() => onNavigate('home')} className="block px-4 py-2 hover:bg-slate-50 text-slate-700 hover:text-kgp-crimson">
                    <div className="font-semibold">Regular Qualifier Process</div>
                    <div className="text-xs text-slate-500">4-Week Online Study + Offline Exam</div>
                  </a>
                  <a href="#fees" onClick={() => onNavigate('home')} className="block px-4 py-2 hover:bg-slate-50 text-slate-700 hover:text-kgp-crimson">
                    <div className="font-semibold">Fee & Scholarship Calculator</div>
                    <div className="text-xs text-slate-500">Up to 75% fee concession</div>
                  </a>
                </div>
              )}
            </div>

            <a href="#campus" onClick={() => onNavigate('home')} className="hover:text-kgp-crimson transition py-2">Campus & Placement</a>
            <a href="#faqs" onClick={() => onNavigate('home')} className="hover:text-kgp-crimson transition py-2">FAQs</a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center space-x-2">
            <button
              onClick={() => onNavigate('qualifier')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 text-sm font-bold rounded-lg shadow transition ${
                currentView === 'qualifier'
                  ? 'bg-emerald-700 text-white ring-2 ring-amber-400'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping" />
              <span>Qualifier Exam Portal</span>
            </button>

            <button
              onClick={() => onNavigate('student-login')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 text-sm font-semibold rounded-lg transition ${
                currentView === 'student-login'
                  ? 'bg-kgp-crimson text-white shadow'
                  : 'text-kgp-crimson border border-kgp-crimson/30 hover:border-kgp-crimson hover:bg-red-50/50'
              }`}
            >
              <LogIn className="w-4 h-4" />
              <span>Student Login</span>
            </button>

            <button
              onClick={() => onNavigate('admin-login')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 text-sm font-semibold rounded-lg transition ${
                currentView === 'admin-login'
                  ? 'bg-slate-900 text-amber-400 shadow'
                  : 'text-slate-800 border border-slate-300 hover:border-slate-400 hover:bg-slate-50'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>Admin Login</span>
            </button>

            <button
              onClick={onOpenSignUp}
              className="flex items-center space-x-1.5 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-kgp-crimson to-red-800 hover:from-kgp-darkred hover:to-kgp-crimson rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
            >
              <UserPlus className="w-4 h-4" />
              <span>Apply Now</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={() => onNavigate('student-login')}
              className="px-2.5 py-1.5 text-xs font-semibold text-kgp-crimson border border-kgp-crimson/40 rounded-md"
            >
              Student
            </button>
            <button
              onClick={() => onNavigate('admin-login')}
              className="px-2.5 py-1.5 text-xs font-semibold text-kgp-navy border border-kgp-navy/40 rounded-md"
            >
              Admin
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-2xl">
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
              onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
              className="w-full text-left py-2 hover:text-kgp-crimson font-bold"
            >
              Main Single Page (All Sections)
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
              Course Structure & Syllabus
            </a>
            <a 
              href="#eligibility" 
              onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
              className="block py-2 hover:text-kgp-crimson font-semibold text-emerald-700"
            >
              Direct Admission (WBJEE / JEE / Tripura)
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
