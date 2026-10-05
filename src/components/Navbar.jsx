import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, ExternalLink, ChevronDown, GraduationCap, ShieldCheck, 
  LogIn, UserPlus, BookOpen, Phone, HelpCircle, User, Home, Sparkles, Globe,
  UserCheck, ArrowRight, Layers, Building2, Quote, Award, Briefcase, FileText, CheckCircle2
} from 'lucide-react';
import { IIT_KGP_INFO, ANNOUNCEMENT_TICKER } from '../data/portalData';
import iitKgpLogo from '../assets/logo';
import { getErpLoginUrl, redirectToErpPortal } from '../config/portalConfig';

export default function Navbar({ 
  onNavigate,
  onOpenDiagram, 
  onOpenSignUp,
  onOpenCertificate,
  onOpenHowToApply,
  currentView
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [academicsDropdown, setAcademicsDropdown] = useState(false);
  const [admissionsDropdown, setAdmissionsDropdown] = useState(false);
  const [campusDropdown, setCampusDropdown] = useState(false);
  const [supportDropdown, setSupportDropdown] = useState(false);
  const [loginDropdown, setLoginDropdown] = useState(false);
  const loginDropdownRef = useRef(null);
  const dropdownTimers = useRef({});
  const [lang, setLang] = useState('en');

  const openDropdown = (key) => {
    if (dropdownTimers.current[key]) {
      clearTimeout(dropdownTimers.current[key]);
      delete dropdownTimers.current[key];
    }
    if (key === 'academics') setAcademicsDropdown(true);
    if (key === 'admissions') setAdmissionsDropdown(true);
    if (key === 'campus') setCampusDropdown(true);
    if (key === 'support') setSupportDropdown(true);
    if (key === 'login') setLoginDropdown(true);
  };

  const closeDropdownWithDelay = (key, delay = 350) => {
    if (dropdownTimers.current[key]) {
      clearTimeout(dropdownTimers.current[key]);
    }
    dropdownTimers.current[key] = setTimeout(() => {
      if (key === 'academics') setAcademicsDropdown(false);
      if (key === 'admissions') setAdmissionsDropdown(false);
      if (key === 'campus') setCampusDropdown(false);
      if (key === 'support') setSupportDropdown(false);
      if (key === 'login') setLoginDropdown(false);
      delete dropdownTimers.current[key];
    }, delay);
  };

  const toggleDropdown = (key, e) => {
    if (e) e.stopPropagation();
    if (dropdownTimers.current[key]) {
      clearTimeout(dropdownTimers.current[key]);
      delete dropdownTimers.current[key];
    }
    if (key === 'academics') setAcademicsDropdown(prev => !prev);
    if (key === 'admissions') setAdmissionsDropdown(prev => !prev);
    if (key === 'campus') setCampusDropdown(prev => !prev);
    if (key === 'support') setSupportDropdown(prev => !prev);
    if (key === 'login') setLoginDropdown(prev => !prev);
  };

  // Keep dropdown open stably and close only on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (loginDropdownRef.current && !loginDropdownRef.current.contains(event.target)) {
        if (dropdownTimers.current['login']) clearTimeout(dropdownTimers.current['login']);
        setLoginDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      Object.values(dropdownTimers.current).forEach(t => clearTimeout(t));
    };
  }, []);

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

          {/* Desktop Navigation Links (Organized into Eye-Soothing Dropdowns matching Block Diagram) */}
          <nav className="hidden xl:flex items-center space-x-6 text-sm font-semibold text-slate-700">
            
            {/* 1. Academics Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => openDropdown('academics')}
              onMouseLeave={() => closeDropdownWithDelay('academics', 350)}
            >
              <button 
                type="button"
                onClick={(e) => toggleDropdown('academics', e)}
                className="flex items-center space-x-1 hover:text-kgp-crimson transition py-2"
              >
                <span>Academics</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${academicsDropdown ? 'rotate-180' : ''}`} />
              </button>
              {academicsDropdown && (
                <div 
                  className="absolute left-0 top-full pt-1.5 w-76 z-50 animate-in fade-in slide-in-from-top-1"
                  onMouseEnter={() => openDropdown('academics')}
                  onMouseLeave={() => closeDropdownWithDelay('academics', 350)}
                >
                  <div className="bg-white rounded-2xl shadow-xl border border-slate-200 py-2.5">
                    <a href="#structure" onClick={() => { onNavigate('structure'); setAcademicsDropdown(false); }} className="block px-4 py-2 hover:bg-slate-50 text-slate-800 hover:text-kgp-crimson transition">
                      <div className="font-bold text-xs">Course Structure</div>
                      <div className="text-[11px] text-slate-500">Foundation, Diploma, BSc &amp; BS (4 Levels)</div>
                    </a>
                    <a href="#structure" onClick={() => { onNavigate('structure'); setAcademicsDropdown(false); }} className="block px-4 py-2 hover:bg-slate-50 text-slate-800 hover:text-kgp-crimson transition">
                      <div className="font-bold text-xs">DS &amp; AI Syllabus Roadmap</div>
                      <div className="text-[11px] text-slate-500">142 Credits modular curriculum</div>
                    </a>
                    <a href="#structure" onClick={() => { onNavigate('structure'); setAcademicsDropdown(false); }} className="block px-4 py-2 hover:bg-slate-50 text-slate-800 hover:text-kgp-crimson transition">
                      <div className="font-bold text-xs">Academic Aspects</div>
                      <div className="text-[11px] text-slate-500">Online video lectures &amp; offline proctored exams</div>
                    </a>
                    <a href="#campus" onClick={() => { onNavigate('campus'); setAcademicsDropdown(false); }} className="block px-4 py-2 hover:bg-slate-50 text-slate-800 hover:text-kgp-crimson transition">
                      <div className="font-bold text-xs">Central Library Access</div>
                      <div className="text-[11px] text-slate-500">Physical campus library &amp; digital IEEE/ACM access</div>
                    </a>
                    <a href="#campus" onClick={() => { onNavigate('campus'); setAcademicsDropdown(false); }} className="block px-4 py-2 hover:bg-slate-50 text-slate-800 hover:text-kgp-crimson transition">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs">Alumni Status</span>
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">Only Degree Level</span>
                      </div>
                      <div className="text-[11px] text-slate-500">Official IIT KGP Alumni Association membership</div>
                    </a>
                    <button 
                      onClick={() => { onOpenCertificate(); setAcademicsDropdown(false); }} 
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 text-kgp-crimson font-bold text-xs flex items-center justify-between border-t border-slate-100 mt-1"
                    >
                      <span>Sample Degree Certificate</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Admissions Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => openDropdown('admissions')}
              onMouseLeave={() => closeDropdownWithDelay('admissions', 350)}
            >
              <button 
                type="button"
                onClick={(e) => toggleDropdown('admissions', e)}
                className="flex items-center space-x-1 hover:text-kgp-crimson transition py-2"
              >
                <span>Admissions</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${admissionsDropdown ? 'rotate-180' : ''}`} />
              </button>
              {admissionsDropdown && (
                <div 
                  className="absolute left-0 top-full pt-1.5 w-80 z-50 animate-in fade-in slide-in-from-top-1"
                  onMouseEnter={() => openDropdown('admissions')}
                  onMouseLeave={() => closeDropdownWithDelay('admissions', 350)}
                >
                  <div className="bg-white rounded-2xl shadow-xl border border-slate-200 py-2.5">
                    <button 
                      onClick={() => { if (onOpenHowToApply) onOpenHowToApply(); setAdmissionsDropdown(false); }} 
                      className="w-full text-left px-4 py-2.5 hover:bg-red-50 text-kgp-crimson transition"
                    >
                      <div className="font-bold text-xs flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5" />
                          <span>How to Apply</span>
                        </span>
                        <span className="text-[9px] font-bold bg-red-100 text-red-800 px-1.5 py-0.5 rounded">Instructions</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Complete application guide, documents &amp; age criteria</div>
                    </button>

                    <button 
                      onClick={() => { onNavigate('qualifier'); setAdmissionsDropdown(false); }} 
                      className="w-full text-left px-4 py-2 hover:bg-emerald-50 text-emerald-900 transition"
                    >
                      <div className="font-bold text-xs flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Qualifier Round Examination
                      </div>
                      <div className="text-[11px] text-slate-500">Register, Pay &amp; Take Computer-Based Exam</div>
                    </button>

                    <a href="#eligibility" onClick={() => { onNavigate('eligibility'); setAdmissionsDropdown(false); }} className="block px-4 py-2 hover:bg-slate-50 text-slate-800 hover:text-amber-800 transition">
                      <div className="font-bold text-xs">Direct Admission Pathways</div>
                      <div className="text-[11px] text-slate-500">WBJEE / JEE Advanced / Tripura JEE Ranks</div>
                    </a>

                    <a href="#fees" onClick={() => { onNavigate('fees'); setAdmissionsDropdown(false); }} className="block px-4 py-2 hover:bg-slate-50 text-slate-800 hover:text-kgp-crimson transition border-t border-slate-100 mt-1">
                      <div className="font-bold text-xs">Fee &amp; Scholarship Calculator</div>
                      <div className="text-[11px] text-slate-500">Modular pay-per-credit with up to 75% fee waivers</div>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Campus & Institute Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => openDropdown('campus')}
              onMouseLeave={() => closeDropdownWithDelay('campus', 350)}
            >
              <button 
                type="button"
                onClick={(e) => toggleDropdown('campus', e)}
                className="flex items-center space-x-1 hover:text-kgp-crimson transition py-2"
              >
                <span>Campus &amp; Institute</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${campusDropdown ? 'rotate-180' : ''}`} />
              </button>
              {campusDropdown && (
                <div 
                  className="absolute left-0 top-full pt-1.5 w-76 z-50 animate-in fade-in slide-in-from-top-1"
                  onMouseEnter={() => openDropdown('campus')}
                  onMouseLeave={() => closeDropdownWithDelay('campus', 350)}
                >
                  <div className="bg-white rounded-2xl shadow-xl border border-slate-200 py-2.5">
                    <a href="#campus" onClick={() => { onNavigate('campus'); setCampusDropdown(false); }} className="block px-4 py-2 hover:bg-slate-50 text-slate-800 hover:text-kgp-crimson transition">
                      <div className="font-bold text-xs">About IIT Kharagpur</div>
                      <div className="text-[11px] text-slate-500">Estd. 1951 • India's First &amp; Premier IIT</div>
                    </a>
                    <a href="#director-message" onClick={() => { onNavigate('director'); setCampusDropdown(false); }} className="block px-4 py-2 hover:bg-amber-50 text-amber-900 transition">
                      <div className="font-bold text-xs flex items-center justify-between">
                        <span>Director's Message</span>
                        <span className="text-[9px] font-bold bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded">TOI Feature</span>
                      </div>
                      <div className="text-[11px] text-slate-500">Vision of Prof. Suman Chakraborty, Director</div>
                    </a>
                    <a href="#campus" onClick={() => { onNavigate('campus'); setCampusDropdown(false); }} className="block px-4 py-2 hover:bg-slate-50 text-slate-800 hover:text-kgp-crimson transition">
                      <div className="font-bold text-xs">Campus Immersion</div>
                      <div className="text-[11px] text-slate-500">Annual Fest &amp; on-campus immersion at Kharagpur</div>
                    </a>
                    <a href="#campus" onClick={() => { onNavigate('campus'); setCampusDropdown(false); }} className="block px-4 py-2 hover:bg-slate-50 text-slate-800 hover:text-kgp-crimson transition border-t border-slate-100 mt-1">
                      <div className="font-bold text-xs">Internship &amp; Placement</div>
                      <div className="text-[11px] text-slate-500">Dedicated career placement cell &amp; industry ecosystem</div>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Support & Info Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => openDropdown('support')}
              onMouseLeave={() => closeDropdownWithDelay('support', 350)}
            >
              <button 
                type="button"
                onClick={(e) => toggleDropdown('support', e)}
                className="flex items-center space-x-1 hover:text-kgp-crimson transition py-2"
              >
                <span>Support &amp; Info</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${supportDropdown ? 'rotate-180' : ''}`} />
              </button>
              {supportDropdown && (
                <div 
                  className="absolute left-0 top-full pt-1.5 w-76 z-50 animate-in fade-in slide-in-from-top-1"
                  onMouseEnter={() => openDropdown('support')}
                  onMouseLeave={() => closeDropdownWithDelay('support', 350)}
                >
                  <div className="bg-white rounded-2xl shadow-xl border border-slate-200 py-2.5">
                    <a href="#faqs" onClick={() => { onNavigate('faqs'); setSupportDropdown(false); }} className="block px-4 py-2 hover:bg-slate-50 text-slate-800 hover:text-kgp-crimson transition">
                      <div className="font-bold text-xs">Frequently Asked Questions</div>
                      <div className="text-[11px] text-slate-500">Bilingual Support (English &amp; বাংলা)</div>
                    </a>
                    <a href="#contact" onClick={() => { onNavigate('contact'); setSupportDropdown(false); }} className="block px-4 py-2 hover:bg-slate-50 text-slate-800 hover:text-kgp-crimson transition">
                      <div className="font-bold text-xs">Contact Details</div>
                      <div className="text-[11px] text-slate-500">Admissions email, helpline &amp; campus address</div>
                    </a>
                    <button 
                      onClick={() => { onOpenDiagram(); setSupportDropdown(false); }} 
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 text-kgp-crimson font-bold text-xs flex items-center justify-between border-t border-slate-100 mt-1"
                    >
                      <div className="flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-kgp-crimson" />
                        <span>Portal Architecture (Block Diagram)</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

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
              className="flex items-center space-x-1.5 px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-kgp-crimson to-red-800 hover:from-kgp-darkred hover:to-kgp-crimson rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>Apply Now</span>
            </button>

            {/* Login Button (Directly beside Apply Now) with Student / Staff / Admin options */}
            <div 
              ref={loginDropdownRef}
              className="relative"
              onMouseEnter={() => openDropdown('login')}
              onMouseLeave={() => closeDropdownWithDelay('login', 400)}
            >
              <button
                type="button"
                onClick={(e) => toggleDropdown('login', e)}
                className={`flex items-center space-x-1.5 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl shadow-xs transition cursor-pointer select-none ${
                  loginDropdown 
                    ? 'bg-slate-900 text-white border-2 border-slate-900' 
                    : 'text-slate-800 bg-white hover:bg-slate-50 border-2 border-slate-300 hover:border-kgp-crimson'
                }`}
                title="Institutional Login: Student / Staff / Admin"
              >
                <LogIn className={`w-4 h-4 ${loginDropdown ? 'text-amber-400' : 'text-kgp-crimson'}`} />
                <span>Login</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${loginDropdown ? 'rotate-180 text-white' : 'text-slate-500'}`} />
              </button>

              {loginDropdown && (
                <div 
                  className="absolute right-0 top-full pt-1.5 w-84 z-50 animate-in fade-in slide-in-from-top-1"
                  onMouseEnter={() => openDropdown('login')}
                  onMouseLeave={() => closeDropdownWithDelay('login', 400)}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 py-3">
                    <div className="px-4 pb-2.5 border-b border-slate-100 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Institutional Access</div>
                        <div className="text-xs font-bold text-slate-900 font-serif">Select Login Portal</div>
                      </div>
                      <span className="text-[9px] font-mono bg-amber-50 text-amber-800 border border-amber-200 px-1.5 py-0.5 rounded font-bold">ERP &amp; LMS</span>
                    </div>

                    <div className="p-2 space-y-1">
                      {/* Student Section */}
                      <button
                        type="button"
                        onClick={() => {
                          setLoginDropdown(false);
                          onNavigate('student-erp');
                        }}
                        className="w-full text-left group flex items-start gap-3 p-2.5 rounded-xl hover:bg-emerald-50 transition border border-transparent hover:border-emerald-200 cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-105 transition shadow-2xs">
                          <GraduationCap className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-800">Student Login</span>
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">ERP &amp; LMS</span>
                          </div>
                          <p className="text-[11px] text-slate-500 line-clamp-1">Admission journey, videos, fees &amp; CBT exam</p>
                        </div>
                      </button>

                      {/* Staff Section */}
                      <a
                        href={getErpLoginUrl('employee')}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => setLoginDropdown(false)}
                        className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-sky-50 transition border border-transparent hover:border-sky-200"
                      >
                        <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-105 transition shadow-2xs">
                          <UserCheck className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900 group-hover:text-sky-800">Staff Login</span>
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-sky-100 text-sky-800">Staff ERP</span>
                          </div>
                          <p className="text-[11px] text-slate-500 line-clamp-1">Verification queue, tasks &amp; progress</p>
                        </div>
                      </a>

                      {/* Admin Section */}
                      <button
                        type="button"
                        onClick={() => {
                          setLoginDropdown(false);
                          onNavigate('admin-login');
                        }}
                        className="w-full text-left group flex items-start gap-3 p-2.5 rounded-xl hover:bg-amber-50 transition border border-transparent hover:border-amber-200 cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-105 transition shadow-2xs">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900 group-hover:text-amber-800">Admin Login</span>
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900">Admin</span>
                          </div>
                          <p className="text-[11px] text-slate-500 line-clamp-1">Master console, admissions &amp; cutoffs</p>
                        </div>
                      </button>
                    </div>

                    <div className="px-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <button
                        type="button"
                        onClick={() => {
                          setLoginDropdown(false);
                          onNavigate('student-login');
                        }}
                        className="text-kgp-crimson hover:underline font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <span>Unified Sign In Screen</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                      <span className="text-[10px] text-slate-400 font-mono">ERP &amp; LMS</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Navigation Controls */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={() => onNavigate('student-login')}
              className="px-2.5 py-1.5 text-xs font-bold text-slate-800 bg-white border border-slate-300 rounded-lg shadow-2xs flex items-center gap-1 cursor-pointer"
              title="Institutional Login"
            >
              <LogIn className="w-3.5 h-3.5 text-kgp-crimson" />
              <span>Login</span>
            </button>
            <button
              onClick={() => onNavigate('student-login')}
              className="px-3 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-kgp-crimson to-red-800 rounded-lg shadow flex items-center gap-1 cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Apply</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-100 transition cursor-pointer"
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

          {/* Institutional Role Gates (ERP / LMS / Admin) */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
              <span>Institutional Access Gates (ERP)</span>
              <span className="text-[9px] font-mono text-amber-700 font-bold bg-amber-100/60 px-1.5 py-0.5 rounded">ERP Hub</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 text-center text-xs">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('student-erp');
                }}
                className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold flex flex-col items-center gap-1 hover:bg-emerald-100 transition shadow-2xs cursor-pointer"
              >
                <GraduationCap className="w-4 h-4 text-emerald-600" />
                <span className="text-[11px]">Student ERP</span>
              </button>
              <a
                href={getErpLoginUrl('employee')}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-sky-50 border border-sky-200 text-sky-900 font-bold flex flex-col items-center gap-1 hover:bg-sky-100 transition shadow-2xs"
              >
                <UserCheck className="w-4 h-4 text-sky-600" />
                <span className="text-[11px]">Staff</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('admin-login');
                }}
                className="p-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 font-bold flex flex-col items-center gap-1 hover:bg-amber-100 transition shadow-2xs cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span className="text-[11px]">Admin</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1 pb-1">
            <button
              onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
              className="w-full py-2 text-xs font-bold text-slate-800 border border-slate-300 rounded-lg bg-slate-50 text-center cursor-pointer"
            >
              Home Page
            </button>
            <button
              type="button"
              onClick={() => { onNavigate('student-login'); setMobileMenuOpen(false); }}
              className="w-full py-2 text-xs font-bold text-kgp-crimson border border-kgp-crimson/40 rounded-lg bg-red-50/50 text-center flex items-center justify-center gap-1 cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In Screen</span>
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
              onClick={() => { if (onOpenHowToApply) onOpenHowToApply(); setMobileMenuOpen(false); }} 
              className="w-full text-left py-2.5 text-kgp-crimson font-bold flex items-center justify-between"
            >
              <div className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-kgp-crimson" />
                <span>How to Apply (Instructions &amp; Eligibility)</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
            <button 
              onClick={() => { onNavigate('qualifier'); setMobileMenuOpen(false); }}
              className="w-full text-left py-2.5 text-emerald-700 font-bold flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Qualifier Round Exam Portal (Register, Pay &amp; Test)</span>
            </button>
            <a 
              href="#structure" 
              onClick={() => { onNavigate('structure'); setMobileMenuOpen(false); }}
              className="block py-2 hover:text-kgp-crimson"
            >
              Course Structure &amp; Syllabus (Data Science &amp; AI)
            </a>
            <a 
              href="#eligibility" 
              onClick={() => { onNavigate('eligibility'); setMobileMenuOpen(false); }}
              className="block py-2 hover:text-kgp-crimson font-semibold text-amber-700"
            >
              Direct Admission (WBJEE / JEE Advanced / Tripura JEE)
            </a>
            <a 
              href="#fees" 
              onClick={() => { onNavigate('fees'); setMobileMenuOpen(false); }}
              className="block py-2 hover:text-kgp-crimson"
            >
              Fee Structure &amp; Scholarship Calculator
            </a>
            <a 
              href="#director-message" 
              onClick={() => { onNavigate('director'); setMobileMenuOpen(false); }}
              className="block py-2 hover:text-kgp-crimson"
            >
              Director's Message (Times of India Exclusive)
            </a>
            <a 
              href="#campus" 
              onClick={() => { onNavigate('campus'); setMobileMenuOpen(false); }}
              className="block py-2 hover:text-kgp-crimson"
            >
              Campus Immersion &amp; Placement Cell
            </a>
            <a 
              href="#faqs" 
              onClick={() => { onNavigate('faqs'); setMobileMenuOpen(false); }}
              className="block py-2 hover:text-kgp-crimson"
            >
              Frequently Asked Questions (FAQs)
            </a>
            <button 
              onClick={() => { onOpenDiagram(); setMobileMenuOpen(false); }}
              className="w-full text-left py-2 hover:text-kgp-crimson flex items-center justify-between"
            >
              <span>Portal Architecture (Block Diagram)</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
