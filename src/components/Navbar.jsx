import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ExternalLink, ChevronDown, GraduationCap, ShieldCheck, 
  LogIn, UserPlus, BookOpen, Phone, HelpCircle, User, Home, Sparkles, Globe 
} from 'lucide-react';
import { IIT_KGP_INFO, ANNOUNCEMENT_TICKER } from '../data/portalData';
import iitKgpLogo from '../assets/logo';

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
  const [lang, setLang] = useState('en');

  useEffect(() => {
    try {
      const match = document.cookie.match(/googtrans=\/en\/([a-z]{2})/);
      if (match && match[1]) {
        setLang(match[1]);
      }
    } catch (e) {}
  }, []);

  const changeLanguage = (newLang) => {
    setLang(newLang);
    try {
      document.cookie = `googtrans=/en/${newLang}; path=/;`;
      const combo = document.querySelector('.goog-te-combo');
      if (combo) {
        combo.value = newLang;
        combo.dispatchEvent(new Event('change'));
      }
      if (document.body && document.body.style) {
        document.body.style.top = '0px';
      }
      const frames = document.querySelectorAll('.goog-te-banner-frame, iframe[class*="goog-te-banner"], iframe.skiptranslate, .VIpgJd-ZVi9od-aHeUd-OwkiMe-hTkFd, .VIpgJd-ZVi9od-ORHb-OEVmcd');
      frames.forEach(f => {
        f.style.setProperty('display', 'none', 'important');
        f.style.setProperty('visibility', 'hidden', 'important');
        f.style.setProperty('height', '0px', 'important');
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200 transition-all">

      {/* 0. INSTITUTIONAL TOP BAR & FLASH NOTIFICATION (IIT KGP MOTTO: योगः कर्मसु कौशलम्) */}
      <div className="bg-slate-950 text-slate-300 text-[11px] py-1.5 px-4 sm:px-6 lg:px-8 border-b border-slate-800 shadow-inner">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-6">
          
          {/* Left: IIT KGP & Flash Notification Ticker */}
          <div className="flex items-center gap-3 min-w-0 flex-1 overflow-hidden">
            {/* IIT KGP Brand Badge */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              <span className="font-black tracking-wider text-amber-400 uppercase text-xs">
                IIT Kharagpur
              </span>
            </div>

            <span className="text-slate-700 flex-shrink-0 hidden sm:inline">|</span>

            {/* Flash Notification / Motto Ticker */}
            <div className="flex items-center gap-2 min-w-0 flex-1 overflow-hidden">
              <span className="flex-shrink-0 px-2 py-0.5 rounded-md bg-gradient-to-r from-red-600 to-amber-600 text-white font-black text-[9px] uppercase tracking-wider shadow-xs animate-pulse flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" />
                <span>FLASH</span>
              </span>

              {/* Animated Scroller with Motto & Pause on Hover */}
              <div className="overflow-hidden whitespace-nowrap text-[11px] flex-1">
                <div className="flash-marquee flex items-center gap-5 cursor-default select-none" title="IIT Kharagpur Official Motto • Hover to Pause">
                  {/* Track 1 */}
                  <span className="inline-flex items-center gap-1.5 font-bold text-amber-300 tracking-wide font-serif text-xs">
                    “योगः कर्मसु कौशलम्”
                  </span>
                  <span className="text-slate-400 text-[10px] hidden md:inline">
                    (Excellence in Action is Yoga)
                  </span>
                  <span className="text-amber-500/70 font-black">•</span>
                  <span className="text-slate-200 font-semibold">
                    Admissions 2026 Live Now
                  </span>
                  <span className="text-amber-500/70 font-black">•</span>
                  <span className="text-emerald-400 font-semibold">
                    BS &amp; Diploma in Data Science &amp; Artificial Intelligence
                  </span>
                  <span className="text-amber-500/70 font-black">•</span>

                  {/* Duplicate Track for Seamless Infinite Marquee */}
                  <span className="inline-flex items-center gap-1.5 font-bold text-amber-300 tracking-wide font-serif text-xs">
                    “योगः कर्मसु कौशलम्”
                  </span>
                  <span className="text-slate-400 text-[10px] hidden md:inline">
                    (Excellence in Action is Yoga)
                  </span>
                  <span className="text-amber-500/70 font-black">•</span>
                  <span className="text-slate-200 font-semibold">
                    Admissions 2026 Live Now
                  </span>
                  <span className="text-amber-500/70 font-black">•</span>
                  <span className="text-emerald-400 font-semibold">
                    BS &amp; Diploma in Data Science &amp; Artificial Intelligence
                  </span>
                  <span className="text-amber-500/70 font-black">•</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Trilingual Language Selector (English, Bengali, Hindi) */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="flex items-center gap-1 text-amber-300 font-bold text-[11px] mr-0.5">
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Translate:</span>
            </div>
            <div className="inline-flex rounded-lg p-0.5 bg-slate-900 border border-slate-700">
              <button
                type="button"
                onClick={() => changeLanguage('en')}
                className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold transition ${
                  lang === 'en'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
                title="Switch to English"
              >
                English
              </button>
              <button
                type="button"
                onClick={() => changeLanguage('bn')}
                className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold transition ${
                  lang === 'bn'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
                title="বাংলায় অনুবাদ করুন (Translate to Bengali)"
              >
                বাংলা
              </button>
              <button
                type="button"
                onClick={() => changeLanguage('hi')}
                className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold transition ${
                  lang === 'hi'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
                title="हिन्दी में अनुवाद करें (Translate to Hindi)"
              >
                हिन्दी
              </button>
            </div>
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
                src={iitKgpLogo} 
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

            <a href="#campus" onClick={() => onNavigate('home')} className="hover:text-kgp-crimson transition py-2">Campus Life &amp; Placement</a>
            <a href="#faqs" onClick={() => onNavigate('home')} className="hover:text-kgp-crimson transition py-2">FAQs</a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
            {/* Site Translator Selector */}
            <div className="flex items-center gap-1 px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-xl text-xs">
              <Globe className="w-3.5 h-3.5 text-kgp-crimson mr-0.5" />
              <div className="inline-flex rounded-lg p-0.5 bg-slate-200/70">
                <button
                  type="button"
                  onClick={() => changeLanguage('en')}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold transition ${
                    lang === 'en' ? 'bg-white text-kgp-crimson shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="English"
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => changeLanguage('bn')}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold transition ${
                    lang === 'bn' ? 'bg-white text-kgp-crimson shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="বাংলা (Bengali)"
                >
                  বাংলা
                </button>
                <button
                  type="button"
                  onClick={() => changeLanguage('hi')}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold transition ${
                    lang === 'hi' ? 'bg-white text-kgp-crimson shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="हिन्दी (Hindi)"
                >
                  हिन्दी
                </button>
              </div>
            </div>

            {/* Apply Now */}
            <button
              onClick={() => onNavigate('student-login')}
              className="flex items-center space-x-1.5 px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-kgp-crimson to-red-800 hover:from-kgp-darkred hover:to-kgp-crimson rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
            >
              <UserPlus className="w-4 h-4" />
              <span>Apply Now</span>
            </button>
          </div>

          {/* Mobile Navigation Controls */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={() => onNavigate('student-login')}
              className="px-3 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-kgp-crimson to-red-800 rounded-lg shadow flex items-center gap-1"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Apply</span>
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
          {/* Mobile Trilingual Selector */}
          <div className="flex items-center justify-between p-2.5 bg-slate-100 rounded-xl border border-slate-200 text-xs">
            <div className="flex items-center gap-1.5 text-slate-700 font-bold">
              <Globe className="w-4 h-4 text-kgp-crimson" />
              <span>Language / ভাষা / भाषा:</span>
            </div>
            <div className="inline-flex rounded-lg p-0.5 bg-slate-200/80">
              <button
                type="button"
                onClick={() => changeLanguage('en')}
                className={`px-2.5 py-1 rounded text-[11px] font-bold transition ${
                  lang === 'en' ? 'bg-white text-kgp-crimson shadow-xs' : 'text-slate-600'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => changeLanguage('bn')}
                className={`px-2.5 py-1 rounded text-[11px] font-bold transition ${
                  lang === 'bn' ? 'bg-white text-kgp-crimson shadow-xs' : 'text-slate-600'
                }`}
              >
                বাংলা
              </button>
              <button
                type="button"
                onClick={() => changeLanguage('hi')}
                className={`px-2.5 py-1 rounded text-[11px] font-bold transition ${
                  lang === 'hi' ? 'bg-white text-kgp-crimson shadow-xs' : 'text-slate-600'
                }`}
              >
                हिन्दी
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1 pb-2">
            <button
              onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
              className="w-full py-2 text-xs font-bold text-slate-800 border border-slate-300 rounded-lg bg-slate-50 text-center"
            >
              Home Page
            </button>
            <button
              onClick={() => { onNavigate('student-login'); setMobileMenuOpen(false); }}
              className="w-full py-2 text-xs font-bold text-kgp-crimson border border-kgp-crimson/40 rounded-lg bg-red-50/50 text-center"
            >
              Student Login
            </button>
          </div>

          <button
            onClick={() => { onNavigate('student-login'); setMobileMenuOpen(false); }}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-kgp-crimson to-red-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow"
          >
            <UserPlus className="w-4 h-4" />
            <span>Apply Now (IIT Portal)</span>
          </button>

          <div className="space-y-1 text-sm font-medium text-slate-700 divide-y divide-slate-100">
            <button 
              onClick={() => { onNavigate('qualifier'); setMobileMenuOpen(false); }}
              className="w-full text-left py-2.5 text-emerald-700 font-bold flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Qualifier Round Exam Portal (Register, Pay & Test)</span>
            </button>
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
              Fee Structure &amp; Scholarship Calculator
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
