import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronDown, 
  ExternalLink, 
  FileText, 
  Sparkles, 
  GraduationCap, 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  HelpCircle, 
  Clock, 
  CheckCircle2, 
  Award, 
  BookOpen, 
  UserPlus 
} from 'lucide-react';
import iitKgpLogo from '../../assets/logo';
import logo75Years from '../../assets/images/iitkgp-75-years.png';
import headerBanner from '../../assets/images/iitkgp-header-banner.png';
import { useDropdownGate } from '../../context/DropdownGateContext';

export default function MasterHeader({ 
  onNavigate, 
  onOpenCertificate, 
  onOpenHowToApply, 
  onScrollToHighlights 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showFaqModal, setShowFaqModal] = useState(false);
  const headerRef = useRef(null);

  const { requireUserInformationBeforeDropdown, activeDropdownKey, setActiveDropdownKey } = useDropdownGate();

  // Sync if context triggered dropdown to open
  useEffect(() => {
    if (activeDropdownKey) {
      setOpenDropdown(activeDropdownKey);
    }
  }, [activeDropdownKey]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setOpenDropdown(null);
        setActiveDropdownKey(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [setActiveDropdownKey]);

  const handleDropdownTrigger = (key, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // Toggle if already open
    if (openDropdown === key) {
      setOpenDropdown(null);
      setActiveDropdownKey(null);
      return;
    }

    // Gated trigger: Require visitor info before opening if unverified
    requireUserInformationBeforeDropdown(key, () => {
      setOpenDropdown(key);
      setActiveDropdownKey(key);
    });
  };

  const closeDropdown = () => {
    setOpenDropdown(null);
    setActiveDropdownKey(null);
  };

  const handleHomeClick = (e) => {
    if (e) e.preventDefault();
    const el = document.getElementById('home');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    try {
      window.history.replaceState(null, '', '#home');
    } catch (err) {}
    closeDropdown();
    setMobileMenuOpen(false);
  };

  const handleProgrammeScroll = (e) => {
    if (e) e.preventDefault();
    if (onScrollToHighlights) {
      onScrollToHighlights();
    } else {
      const el = document.getElementById('programme-highlights');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    closeDropdown();
    setMobileMenuOpen(false);
  };

  return (
    <header ref={headerRef} className="w-full bg-white border-b border-slate-200/90 sticky top-0 z-50 shadow-xs select-none">
      
      {/* ============================================================
          LEVEL 1: OFFICIAL IIT KHARAGPUR COMPACT HEADER BANNER
         ============================================================ */}
      <div className="w-full bg-[#05132d] py-1 sm:py-1.5 px-4 flex items-center justify-center relative overflow-hidden">
        <a 
          href="#home" 
          onClick={handleHomeClick}
          className="block cursor-pointer select-none mx-auto"
          title="Indian Institute of Technology Kharagpur"
        >
          <img
            src={headerBanner}
            alt="Indian Institute of Technology Kharagpur - 75 Years Dedicated to the Service of the Nation"
            className="h-[68px] sm:h-[85px] md:h-[100px] lg:h-[115px] w-auto max-w-full object-contain mx-auto block select-none"
          />
        </a>

        {/* Mobile Hamburger Menu Toggle on small screens */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 lg:hidden z-20">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 bg-black/50 hover:bg-black/70 text-white rounded-lg backdrop-blur-xs transition cursor-pointer border border-white/20 shadow-xs"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </div>
      </div>

      {/* ============================================================
          LEVEL 2: HORIZONTAL NAVIGATION DOWNLINE (ALL WORKING)
         ============================================================ */}
      <nav className="w-full bg-[#f8fafc] border-t border-slate-200/90 px-4 sm:px-6 lg:px-8 py-1.5 sm:py-2">
        <div className="max-w-[1380px] mx-auto flex items-center justify-between gap-3 sm:gap-4 flex-wrap sm:flex-nowrap">
          {/* Navigation Links (Home, Programme, Academics, Admissions, etc.) */}
          <div className="flex items-center flex-wrap gap-x-1 sm:gap-x-2 md:gap-x-3 text-[13.5px] sm:text-[14px]">
          
          {/* 1. Home Link */}
          <a
            href="#home"
            onClick={handleHomeClick}
            className="px-2.5 py-1 font-bold text-[#0f2942] hover:text-[#003893] transition-colors relative cursor-pointer"
          >
            Home
            <span className="absolute bottom-[-2px] left-2 right-2 h-[2.5px] bg-[#eab308] rounded-full" />
          </a>

          <span className="text-slate-300 hidden sm:inline select-none">|</span>

          {/* 2. Programme Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={(e) => handleDropdownTrigger('programme', e)}
              className={`flex items-center gap-1 px-2.5 py-1 font-semibold transition cursor-pointer ${
                openDropdown === 'programme' ? 'text-[#003893] font-bold' : 'text-[#0f2942] hover:text-[#003893]'
              }`}
              aria-expanded={openDropdown === 'programme'}
            >
              <span>Programme</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === 'programme' ? 'rotate-180 text-[#003893]' : 'text-slate-400'}`} />
            </button>

            {openDropdown === 'programme' && (
              <div className="absolute left-0 top-full pt-2 w-80 z-50 animate-in fade-in slide-in-from-top-1">
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2.5 overflow-hidden">
                  <a 
                    href="#programme-highlights" 
                    onClick={handleProgrammeScroll} 
                    className="block px-4 py-2 hover:bg-blue-50/70 transition"
                  >
                    <div className="font-bold text-xs text-[#0f2942]">Programme Highlights &amp; Director's Note</div>
                    <div className="text-[11px] text-slate-500">8 key foundational pillars &amp; leadership vision</div>
                  </a>
                  <a 
                    href="#programme-highlights" 
                    onClick={handleProgrammeScroll} 
                    className="block px-4 py-2 hover:bg-slate-50 transition border-t border-slate-100"
                  >
                    <div className="font-bold text-xs text-[#0f2942]">Curriculum Overview &amp; Roadmap</div>
                    <div className="text-[11px] text-slate-500">142 Credits multi-tier modular syllabus (NEP 2020)</div>
                  </a>
                  <a 
                    href="#programme-highlights" 
                    onClick={handleProgrammeScroll} 
                    className="block px-4 py-2 hover:bg-slate-50 transition"
                  >
                    <div className="font-bold text-xs text-[#0f2942]">How Will You Learn</div>
                    <div className="text-[11px] text-slate-500">Online video modules, doubt sessions &amp; CBT exams</div>
                  </a>
                  <a 
                    href="#programme-highlights" 
                    onClick={handleProgrammeScroll} 
                    className="block px-4 py-2 hover:bg-slate-50 transition border-t border-slate-100 mt-1"
                  >
                    <div className="font-bold text-xs text-[#0f2942]">Who Should Apply</div>
                    <div className="text-[11px] text-slate-500">Class 12th passouts, college students &amp; professionals</div>
                  </a>
                </div>
              </div>
            )}
          </div>

          <span className="text-slate-300 hidden sm:inline select-none">|</span>

          {/* 3. Academics Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={(e) => handleDropdownTrigger('academics', e)}
              className={`flex items-center gap-1 px-2.5 py-1 font-semibold transition cursor-pointer ${
                openDropdown === 'academics' ? 'text-[#003893] font-bold' : 'text-[#0f2942] hover:text-[#003893]'
              }`}
              aria-expanded={openDropdown === 'academics'}
            >
              <span>Academics</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === 'academics' ? 'rotate-180 text-[#003893]' : 'text-slate-400'}`} />
            </button>

            {openDropdown === 'academics' && (
              <div className="absolute left-0 top-full pt-2 w-80 z-50 animate-in fade-in slide-in-from-top-1">
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2.5 overflow-hidden">
                  <div className="px-4 py-2 hover:bg-slate-50 transition">
                    <div className="font-bold text-xs text-[#0f2942]">Academic Levels (NEP 2020)</div>
                    <div className="text-[11px] text-slate-500">Foundation (32 Cr), Diploma, BSc (114 Cr), 4-Yr BS</div>
                  </div>
                  <div className="px-4 py-2 hover:bg-slate-50 transition">
                    <div className="font-bold text-xs text-[#0f2942]">Data Science &amp; AI Syllabus</div>
                    <div className="text-[11px] text-slate-500">Core CS, Python, ML, Deep Learning &amp; Capstones</div>
                  </div>
                  <div className="px-4 py-2 hover:bg-slate-50 transition">
                    <div className="font-bold text-xs text-[#0f2942]">Central Library &amp; Academic Access</div>
                    <div className="text-[11px] text-slate-500">Digital IEEE/ACM library and physical campus immersion</div>
                  </div>
                  {onOpenCertificate && (
                    <button
                      type="button"
                      onClick={() => { onOpenCertificate(); closeDropdown(); }}
                      className="w-full text-left px-4 py-2 hover:bg-red-50 text-kgp-crimson font-bold text-xs flex items-center justify-between border-t border-slate-100 mt-1 cursor-pointer"
                    >
                      <span className="flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-kgp-crimson" />
                        <span>Sample Degree Certificate</span>
                      </span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          <span className="text-slate-300 hidden sm:inline select-none">|</span>

          {/* 4. Admissions Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={(e) => handleDropdownTrigger('admissions', e)}
              className={`flex items-center gap-1 px-2.5 py-1 font-semibold transition cursor-pointer ${
                openDropdown === 'admissions' ? 'text-[#003893] font-bold' : 'text-[#0f2942] hover:text-[#003893]'
              }`}
              aria-expanded={openDropdown === 'admissions'}
            >
              <span>Admissions</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === 'admissions' ? 'rotate-180 text-[#003893]' : 'text-slate-400'}`} />
            </button>

            {openDropdown === 'admissions' && (
              <div className="absolute left-0 top-full pt-2 w-84 z-50 animate-in fade-in slide-in-from-top-1">
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2.5 overflow-hidden">
                  {onOpenHowToApply && (
                    <button
                      type="button"
                      onClick={() => { onOpenHowToApply(); closeDropdown(); }}
                      className="w-full text-left px-4 py-2 hover:bg-red-50 text-kgp-crimson transition flex items-center justify-between cursor-pointer"
                    >
                      <div className="font-bold text-xs flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5" />
                        <span>How to Apply</span>
                      </div>
                      <span className="text-[9px] font-bold bg-red-100 text-red-800 px-1.5 py-0.5 rounded">Instructions</span>
                    </button>
                  )}
                  <div className="px-4 py-2 hover:bg-slate-50 transition">
                    <div className="font-bold text-xs text-[#0f2942]">Direct Admission Pathways</div>
                    <div className="text-[11px] text-slate-500">WBJEE / JEE Advanced / Tripura JEE Ranks</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => { if (onNavigate) onNavigate('qualifier'); closeDropdown(); }}
                    className="w-full text-left px-4 py-2 hover:bg-emerald-50 text-emerald-900 transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <div>
                      <div className="font-bold text-xs">Qualifier Round Examination</div>
                      <div className="text-[11px] text-slate-500">Universal entrance test without mandatory JEE cutoff</div>
                    </div>
                  </button>
                  <div className="px-4 py-2 hover:bg-slate-50 transition border-t border-slate-100 mt-1">
                    <div className="font-bold text-xs text-[#0f2942]">Fee &amp; Scholarship Calculator</div>
                    <div className="text-[11px] text-slate-500">Modular pay-per-credit with fee waivers up to 75%</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <span className="text-slate-300 hidden sm:inline select-none">|</span>

          {/* 5. Student Support Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={(e) => handleDropdownTrigger('student-support', e)}
              className={`flex items-center gap-1 px-2.5 py-1 font-semibold transition cursor-pointer ${
                openDropdown === 'student-support' ? 'text-[#003893] font-bold' : 'text-[#0f2942] hover:text-[#003893]'
              }`}
              aria-expanded={openDropdown === 'student-support'}
            >
              <span>Student Support</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === 'student-support' ? 'rotate-180 text-[#003893]' : 'text-slate-400'}`} />
            </button>

            {openDropdown === 'student-support' && (
              <div className="absolute left-0 top-full pt-2 w-80 z-50 animate-in fade-in slide-in-from-top-1">
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2.5 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => { if (onNavigate) onNavigate('student-login'); closeDropdown(); }}
                    className="w-full text-left px-4 py-2 hover:bg-blue-50 text-blue-900 transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <GraduationCap className="w-4 h-4 text-[#003893]" />
                    <div>
                      <div className="font-bold text-xs">Student Portal &amp; LMS</div>
                      <div className="text-[11px] text-slate-500">Courseware, recorded lectures &amp; grades</div>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowFaqModal(true); closeDropdown(); }}
                    className="w-full text-left px-4 py-2 hover:bg-slate-50 text-[#0f2942] transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
                    <div>
                      <div className="font-bold text-xs">Frequently Asked Questions</div>
                      <div className="text-[11px] text-slate-500">Bilingual English &amp; Bengali assistance</div>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowContactModal(true); closeDropdown(); }}
                    className="w-full text-left px-4 py-2 hover:bg-slate-50 text-[#0f2942] transition flex items-center gap-1.5 border-t border-slate-100 mt-1 cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5 text-slate-500" />
                    <div>
                      <div className="font-bold text-xs">Helpdesk &amp; Admissions Office</div>
                      <div className="text-[11px] text-slate-500">Helpline email and CET campus desk</div>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>

          <span className="text-slate-300 hidden sm:inline select-none">|</span>

          {/* 6. News & Events Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={(e) => handleDropdownTrigger('news-events', e)}
              className={`flex items-center gap-1 px-2.5 py-1 font-semibold transition cursor-pointer ${
                openDropdown === 'news-events' ? 'text-[#003893] font-bold' : 'text-[#0f2942] hover:text-[#003893]'
              }`}
              aria-expanded={openDropdown === 'news-events'}
            >
              <span>News &amp; Events</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === 'news-events' ? 'rotate-180 text-[#003893]' : 'text-slate-400'}`} />
            </button>

            {openDropdown === 'news-events' && (
              <div className="absolute left-0 top-full pt-2 w-80 z-50 animate-in fade-in slide-in-from-top-1">
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2.5 overflow-hidden">
                  <div className="px-4 py-2 hover:bg-slate-50 transition">
                    <div className="font-bold text-xs text-[#0f2942]">Admission Notification 2026-27</div>
                    <div className="text-[11px] text-slate-500">Applications open for Qualifier Round 1</div>
                  </div>
                  <a 
                    href="#programme-highlights" 
                    onClick={handleProgrammeScroll} 
                    className="block px-4 py-2 hover:bg-amber-50 text-amber-900 transition"
                  >
                    <div className="font-bold text-xs flex items-center justify-between">
                      <span>Director's Message</span>
                      <span className="text-[9px] font-bold bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded">TOI Feature</span>
                    </div>
                    <div className="text-[11px] text-slate-500">Vision of Prof. Suman Chakraborty, Director</div>
                  </a>
                  <div className="px-4 py-2 hover:bg-slate-50 transition border-t border-slate-100 mt-1">
                    <div className="font-bold text-xs text-[#0f2942]">National Education Day Conclave</div>
                    <div className="text-[11px] text-slate-500">IIT Kharagpur academic outreach events</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <span className="text-slate-300 hidden sm:inline select-none">|</span>

          {/* 7. Contact us Link */}
          <button
            type="button"
            onClick={() => setShowContactModal(true)}
            className="px-2.5 py-1 font-semibold text-[#0f2942] hover:text-[#003893] transition-colors cursor-pointer"
          >
            Contact us
          </button>

          <span className="text-slate-300 hidden sm:inline select-none">|</span>

          {/* 8. FAQs Link */}
          <button
            type="button"
            onClick={() => setShowFaqModal(true)}
            className="px-2.5 py-1 font-semibold text-[#0f2942] hover:text-[#003893] transition-colors cursor-pointer"
          >
            FAQs
          </button>
        </div>

        {/* Active Apply Now Button alongside (Home, Programme, Academics, Admissions...) Navigation */}
        <button
          type="button"
          onClick={() => {
            if (onNavigate) onNavigate('student-login');
          }}
          className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-1.5 sm:py-2 bg-[#003893] hover:bg-[#002b70] text-white text-[12.5px] sm:text-[13px] font-bold rounded-full shadow-sm hover:shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer uppercase tracking-wider flex-shrink-0"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Apply Now</span>
        </button>

      </div>
    </nav>

      {/* ============================================================
          MOBILE DRAWER
         ============================================================ */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-1 max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col space-y-1">
            <a
              href="#home"
              onClick={handleHomeClick}
              className="py-2 px-3 rounded-lg text-sm font-bold text-[#003893] bg-blue-50/80"
            >
              Home
            </a>

            {/* Mobile Programme Dropdown */}
            <button
              type="button"
              onClick={(e) => handleDropdownTrigger('programme', e)}
              className="w-full py-2.5 px-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-between text-left cursor-pointer"
            >
              <span>Programme</span>
              <ChevronDown className={`w-4 h-4 transition ${openDropdown === 'programme' ? 'rotate-180 text-[#003893]' : ''}`} />
            </button>
            {openDropdown === 'programme' && (
              <div className="pl-4 pr-2 py-1 space-y-1 text-xs border-l-2 border-blue-500 ml-3 bg-slate-50/70 rounded-r-lg">
                <a 
                  href="#programme-highlights" 
                  onClick={handleProgrammeScroll} 
                  className="block py-1.5 text-slate-700 font-semibold"
                >
                  Programme Highlights &amp; Director's Note
                </a>
                <a href="#programme-highlights" onClick={handleProgrammeScroll} className="block py-1.5 text-slate-600">Curriculum Roadmap</a>
                <a href="#programme-highlights" onClick={handleProgrammeScroll} className="block py-1.5 text-slate-600">How Will You Learn</a>
                <a href="#programme-highlights" onClick={handleProgrammeScroll} className="block py-1.5 text-slate-600">Who Should Apply</a>
              </div>
            )}

            {/* Mobile Academics Dropdown */}
            <button
              type="button"
              onClick={(e) => handleDropdownTrigger('academics', e)}
              className="w-full py-2.5 px-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-between text-left cursor-pointer"
            >
              <span>Academics</span>
              <ChevronDown className={`w-4 h-4 transition ${openDropdown === 'academics' ? 'rotate-180 text-[#003893]' : ''}`} />
            </button>
            {openDropdown === 'academics' && (
              <div className="pl-4 pr-2 py-1 space-y-1 text-xs border-l-2 border-blue-500 ml-3 bg-slate-50/70 rounded-r-lg">
                <div className="py-1.5 text-slate-700 font-semibold">Course Structure (4 Levels)</div>
                <div className="py-1.5 text-slate-600">DS &amp; AI Syllabus Roadmap</div>
                {onOpenCertificate && (
                  <button
                    type="button"
                    onClick={() => { onOpenCertificate(); setMobileMenuOpen(false); }}
                    className="w-full text-left py-1.5 text-kgp-crimson font-bold flex items-center justify-between cursor-pointer"
                  >
                    <span>Sample Degree Certificate</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}
              </div>
            )}

            {/* Mobile Admissions Dropdown */}
            <button
              type="button"
              onClick={(e) => handleDropdownTrigger('admissions', e)}
              className="w-full py-2.5 px-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-between text-left cursor-pointer"
            >
              <span>Admissions</span>
              <ChevronDown className={`w-4 h-4 transition ${openDropdown === 'admissions' ? 'rotate-180 text-[#003893]' : ''}`} />
            </button>
            {openDropdown === 'admissions' && (
              <div className="pl-4 pr-2 py-1 space-y-1 text-xs border-l-2 border-blue-500 ml-3 bg-slate-50/70 rounded-r-lg">
                {onOpenHowToApply && (
                  <button
                    type="button"
                    onClick={() => { onOpenHowToApply(); setMobileMenuOpen(false); }}
                    className="w-full text-left py-1.5 text-kgp-crimson font-bold cursor-pointer"
                  >
                    How to Apply (Instructions)
                  </button>
                )}
                <div className="py-1.5 text-slate-700 font-semibold">Direct Admission Pathways</div>
                <button
                  type="button"
                  onClick={() => { if (onNavigate) onNavigate('qualifier'); setMobileMenuOpen(false); }}
                  className="w-full text-left py-1.5 text-emerald-800 font-bold cursor-pointer"
                >
                  Qualifier Round CBT Exam
                </button>
              </div>
            )}

            {/* Mobile Student Support Dropdown */}
            <button
              type="button"
              onClick={(e) => handleDropdownTrigger('student-support', e)}
              className="w-full py-2.5 px-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-between text-left cursor-pointer"
            >
              <span>Student Support</span>
              <ChevronDown className={`w-4 h-4 transition ${openDropdown === 'student-support' ? 'rotate-180 text-[#003893]' : ''}`} />
            </button>
            {openDropdown === 'student-support' && (
              <div className="pl-4 pr-2 py-1 space-y-1 text-xs border-l-2 border-blue-500 ml-3 bg-slate-50/70 rounded-r-lg">
                <button
                  type="button"
                  onClick={() => { if (onNavigate) onNavigate('student-login'); setMobileMenuOpen(false); }}
                  className="w-full text-left py-1.5 text-blue-900 font-bold cursor-pointer"
                >
                  Student Portal &amp; LMS
                </button>
                <button
                  type="button"
                  onClick={() => { setShowFaqModal(true); setMobileMenuOpen(false); }}
                  className="w-full text-left py-1.5 text-slate-700 cursor-pointer"
                >
                  Frequently Asked Questions
                </button>
                <button
                  type="button"
                  onClick={() => { setShowContactModal(true); setMobileMenuOpen(false); }}
                  className="w-full text-left py-1.5 text-slate-700 cursor-pointer"
                >
                  Helpdesk &amp; Admissions Office
                </button>
              </div>
            )}

            {/* Mobile News & Events Dropdown */}
            <button
              type="button"
              onClick={(e) => handleDropdownTrigger('news-events', e)}
              className="w-full py-2.5 px-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-between text-left cursor-pointer"
            >
              <span>News &amp; Events</span>
              <ChevronDown className={`w-4 h-4 transition ${openDropdown === 'news-events' ? 'rotate-180 text-[#003893]' : ''}`} />
            </button>
            {openDropdown === 'news-events' && (
              <div className="pl-4 pr-2 py-1 space-y-1 text-xs border-l-2 border-blue-500 ml-3 bg-slate-50/70 rounded-r-lg">
                <div className="py-1.5 text-slate-700 font-semibold">Admission Notification 2026-27</div>
                <a 
                  href="#programme-highlights" 
                  onClick={handleProgrammeScroll} 
                  className="block py-1.5 text-amber-800 font-bold"
                >
                  Director's Message (TOI)
                </a>
              </div>
            )}

            <button
              type="button"
              onClick={() => { setShowContactModal(true); setMobileMenuOpen(false); }}
              className="w-full text-left py-2 px-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              Contact us
            </button>
            <button
              type="button"
              onClick={() => { setShowFaqModal(true); setMobileMenuOpen(false); }}
              className="w-full text-left py-2 px-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              FAQs
            </button>

            <button
              type="button"
              onClick={() => { if (onNavigate) onNavigate('student-login'); setMobileMenuOpen(false); }}
              className="mt-3 w-full py-2.5 bg-[#003893] hover:bg-[#002b70] text-white font-bold text-sm rounded-xl text-center shadow-xs block cursor-pointer uppercase tracking-wider"
            >
              Apply Now
            </button>
          </div>
        </div>
      )}

      {/* ============================================================
          BUILT-IN CONTACT MODAL (WORKING)
         ============================================================ */}
      {showContactModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
            {/* Header */}
            <div className="bg-[#0a192f] text-white p-6 relative">
              <button
                type="button"
                onClick={() => setShowContactModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3 mb-2">
                <img src={iitKgpLogo} alt="IIT KGP" className="w-8 h-8 object-contain" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">IIT Kharagpur Helpdesk</span>
              </div>
              <h3 className="text-xl font-bold font-serif-title">Admissions Office &amp; Support</h3>
              <p className="text-xs text-slate-300 mt-1">4-Year Bachelor of Science in Data Science &amp; Artificial Intelligence</p>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4 text-xs text-slate-700">
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <MapPin className="w-5 h-5 text-kgp-crimson flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900 text-sm">Centre for Educational Technology (CET)</div>
                  <div className="text-slate-600 mt-0.5">Indian Institute of Technology Kharagpur, Paschim Medinipur, West Bengal - 721302, India</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <Phone className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">Telephone Helpline</div>
                    <div className="text-slate-600 mt-0.5">+91 (03222) 282000</div>
                    <div className="text-slate-600">+91 (03222) 282022</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <Mail className="w-5 h-5 text-[#003893] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">Admissions Email</div>
                    <a href="mailto:bs-admissions@iitkgp.ac.in" className="text-[#003893] hover:underline font-semibold block mt-0.5 break-all">
                      bs-admissions@iitkgp.ac.in
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-blue-50/80 rounded-xl border border-blue-100 text-blue-900">
                <Clock className="w-4 h-4 flex-shrink-0" />
                <span>Office Hours: Monday – Friday, 9:30 AM – 5:30 PM IST (Excluding Institute Holidays)</span>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">Official BS Admissions Desk</span>
              <button
                type="button"
                onClick={() => setShowContactModal(false)}
                className="px-5 py-2 bg-[#003893] hover:bg-[#002b70] text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          BUILT-IN FAQS MODAL (WORKING)
         ============================================================ */}
      {showFaqModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="bg-[#0a192f] text-white p-6 relative flex-shrink-0">
              <button
                type="button"
                onClick={() => setShowFaqModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3 mb-2">
                <img src={iitKgpLogo} alt="IIT KGP" className="w-8 h-8 object-contain" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Admissions FAQ</span>
              </div>
              <h3 className="text-xl font-bold font-serif-title">Frequently Asked Questions</h3>
              <p className="text-xs text-slate-300 mt-1">Key information about the 4-Year BS in Data Science &amp; AI</p>
            </div>

            {/* FAQ Q&A Scrollable List */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-700 divide-y divide-slate-100">
              
              <div className="pt-2 first:pt-0">
                <h4 className="font-bold text-sm text-[#0f2942] mb-1">1. Is JEE Advanced qualification mandatory for admission?</h4>
                <p className="text-slate-600 leading-relaxed">
                  <strong>No.</strong> While high rankers in JEE Advanced, WBJEE, and Tripura JEE are eligible for direct admission, all other candidates can qualify through the <strong>Universal Qualifier Examination</strong> conducted by IIT Kharagpur.
                </p>
              </div>

              <div className="pt-3">
                <h4 className="font-bold text-sm text-[#0f2942] mb-1">2. In which language are lectures delivered?</h4>
                <p className="text-slate-600 leading-relaxed">
                  Lectures feature <strong>bilingual explanations in Bangla</strong> with standard <strong>technical terminology and study materials in English</strong>, ensuring concepts are thoroughly understood without language barriers.
                </p>
              </div>

              <div className="pt-3">
                <h4 className="font-bold text-sm text-[#0f2942] mb-1">3. Is this degree recognized for higher education and government exams?</h4>
                <p className="text-slate-600 leading-relaxed">
                  <strong>Yes.</strong> The degree is approved by the <strong>IIT Kharagpur Senate</strong>. Graduates earn full IIT Kharagpur Alumni status and are eligible for GATE, UPSC, CAT, MS/PhD admissions in India and abroad.
                </p>
              </div>

              <div className="pt-3">
                <h4 className="font-bold text-sm text-[#0f2942] mb-1">4. How does the Multi Entry-Exit system (NEP 2020) work?</h4>
                <p className="text-slate-600 leading-relaxed">
                  Students may exit after Year 1 with a <em>Foundation Certificate</em> (32 credits), after Year 2 with a <em>Diploma in Programming/Data Science</em>, after Year 3 with a <em>B.Sc. Degree</em> (114 credits), or complete Year 4 for the flagship <em>Bachelor of Science (BS) Degree</em> (142 credits).
                </p>
              </div>

              <div className="pt-3">
                <h4 className="font-bold text-sm text-[#0f2942] mb-1">5. Are scholarships and fee waivers available?</h4>
                <p className="text-slate-600 leading-relaxed">
                  Yes, up to <strong>75% fee waivers</strong> are provided for eligible candidates based on family annual income criteria, SC/ST/PwD categories, and top academic merit.
                </p>
              </div>

            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between flex-shrink-0">
              <span className="text-[11px] text-slate-500">Still have queries? Contact bs-admissions@iitkgp.ac.in</span>
              <button
                type="button"
                onClick={() => setShowFaqModal(false)}
                className="px-5 py-2 bg-[#003893] hover:bg-[#002b70] text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </header>
  );
}
