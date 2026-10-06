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
  };

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
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200 transition-all">

      {/* Main Brand & Navigation Header */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                      type="button"
                      onClick={() => { onNavigate('student-login'); setSupportDropdown(false); }} 
                      className="w-full text-left px-4 py-2 hover:bg-emerald-50 text-slate-800 hover:text-emerald-800 transition flex items-center justify-between border-t border-slate-100"
                    >
                      <div>
                        <div className="font-bold text-xs flex items-center gap-1.5 text-emerald-800">
                          <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Student Portal Login</span>
                        </div>
                        <div className="text-[11px] text-slate-500">Sign in, application tracker &amp; LMS access</div>
                      </div>
                    </button>
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
              className="flex items-center space-x-1.5 px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-kgp-crimson hover:bg-kgp-darkred rounded-full shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 cursor-pointer uppercase font-sans tracking-wide"
            >
              <UserPlus className="w-4 h-4" />
              <span>Apply Now</span>
            </button>
          </div>

          {/* Mobile Navigation Controls */}
          <div className="lg:hidden flex items-center space-x-2">
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

          {/* Apply Now */}
          <button
            onClick={() => { onNavigate('student-login'); setMobileMenuOpen(false); }}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-kgp-crimson to-red-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Apply Now (IIT Portal)</span>
          </button>

          <div className="pt-1 pb-1">
            <button
              onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
              className="w-full py-2 text-xs font-bold text-slate-800 border border-slate-300 rounded-lg bg-slate-50 text-center cursor-pointer"
            >
              Home Page
            </button>
          </div>

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
            <a 
              href="#institutional-gateways" 
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-left py-2.5 text-slate-900 font-bold flex items-center justify-between border-t border-slate-200 mt-2"
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>Institutional Logins (Student, Staff &amp; Admin)</span>
              </div>
              <span className="text-xs text-amber-700">↓ Bottom</span>
            </a>


          </div>
        </div>
      )}
    </header>
  );
}
