import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, ExternalLink, Sparkles, FileText, GraduationCap, BookOpen, Layers, Award, Calendar, HelpCircle, Phone } from 'lucide-react';
import iitKgpLogo from '../../assets/logo';
import { useDropdownGate } from '../../context/DropdownGateContext';

export default function MasterHeader({ currentPage = 'home', onNavigate, onOpenCertificate, onOpenHowToApply }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
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

    // Gated trigger: Require visitor info before opening if not submitted
    requireUserInformationBeforeDropdown(key, () => {
      setOpenDropdown(key);
      setActiveDropdownKey(key);
    });
  };

  const closeDropdown = () => {
    setOpenDropdown(null);
    setActiveDropdownKey(null);
  };

  return (
    <header ref={headerRef} className="w-full bg-white border-b border-slate-200/80 sticky top-0 z-50 shadow-xs">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[78px] sm:h-[84px]">
          
          {/* Left: IIT Kharagpur Crest Logo & Trilingual Official Identity */}
          <a 
            href="#home" 
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault();
                onNavigate('home');
              }
            }}
            className="flex items-center gap-3 group text-left flex-shrink-0"
          >
            <img 
              src={iitKgpLogo} 
              alt="IIT Kharagpur Crest" 
              className="w-12 h-12 sm:w-14 sm:h-14 object-contain flex-shrink-0"
            />
            <div className="flex flex-col justify-center">
              {/* Bengali Line */}
              <div 
                className="text-[12px] sm:text-[13.5px] font-semibold text-[#15803d] leading-tight pb-0.5 border-b border-slate-300/70"
                style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}
              >
                ভারতীয় প্রযুক্তিবিদ্যা প্রতিষ্ঠান খড়গপুর
              </div>
              {/* Hindi Line */}
              <div 
                className="text-[12px] sm:text-[13.5px] font-bold text-[#0f172a] leading-tight py-0.5 border-b border-slate-300/70"
                style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
              >
                भारतीय प्रौद्योगिकी संस्थान खड़गपुर
              </div>
              {/* English Line */}
              <div className="text-[11px] sm:text-[12.5px] font-extrabold text-[#b91c1c] tracking-wider leading-tight pt-0.5 uppercase">
                INDIAN INSTITUTE OF TECHNOLOGY KHARAGPUR
              </div>
            </div>
          </a>

          {/* Right: Desktop Navigation Links + Apply Now Button */}
          <nav className="hidden xl:flex items-center space-x-5 text-[14px]">
            
            {/* 1. Home Link (Page 1) */}
            <a
              href="#home"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate('home');
                }
              }}
              className={`relative px-0.5 py-1 text-[14px] font-bold transition ${
                currentPage === 'home' ? 'text-[#0f2942]' : 'text-[#0f2942]/80 hover:text-[#003893]'
              }`}
            >
              Home
              {currentPage === 'home' && (
                <span className="absolute bottom-[-4px] left-0 w-full h-[3px] bg-[#eab308] rounded-full" />
              )}
            </a>

            {/* 2. Programme Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={(e) => handleDropdownTrigger('programme', e)}
                className={`flex items-center gap-1 px-1 py-1 text-[14px] font-medium transition cursor-pointer relative ${
                  openDropdown === 'programme' || currentPage === 'programme' ? 'text-[#003893] font-bold' : 'text-[#0f2942] hover:text-[#003893]'
                }`}
                aria-expanded={openDropdown === 'programme'}
              >
                <span>Programme</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === 'programme' ? 'rotate-180 text-[#003893]' : 'text-slate-400'}`} />
                {currentPage === 'programme' && (
                  <span className="absolute bottom-[-4px] left-0 w-full h-[3px] bg-[#eab308] rounded-full" />
                )}
              </button>

              {openDropdown === 'programme' && (
                <div className="absolute left-0 top-full pt-2 w-80 z-50 animate-in fade-in slide-in-from-top-1">
                  <div className="bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2.5 overflow-hidden">
                    <a 
                      href="#programme" 
                      onClick={(e) => {
                        e.preventDefault();
                        if (onNavigate) onNavigate('programme');
                        closeDropdown();
                      }} 
                      className="block px-4 py-2 hover:bg-slate-50 transition"
                    >
                      <div className="font-bold text-xs text-[#0f2942]">Programme Highlights (Page 2)</div>
                      <div className="text-[11px] text-slate-500">8 key pillars &amp; Director's Note</div>
                    </a>
                    <a href="#" onClick={(e) => { e.preventDefault(); closeDropdown(); }} className="block px-4 py-2 hover:bg-slate-50 transition">
                      <div className="font-bold text-xs text-[#0f2942]">Curriculum Overview &amp; Roadmap</div>
                      <div className="text-[11px] text-slate-500">142 Credits multi-tier modular syllabus</div>
                    </a>
                    <a href="#" onClick={(e) => { e.preventDefault(); closeDropdown(); }} className="block px-4 py-2 hover:bg-slate-50 transition">
                      <div className="font-bold text-xs text-[#0f2942]">How Will You Learn</div>
                      <div className="text-[11px] text-slate-500">Online video modules, doubt sessions &amp; CBT exams</div>
                    </a>
                    <a href="#" onClick={(e) => { e.preventDefault(); closeDropdown(); }} className="block px-4 py-2 hover:bg-slate-50 transition border-t border-slate-100 mt-1">
                      <div className="font-bold text-xs text-[#0f2942]">Who Should Apply</div>
                      <div className="text-[11px] text-slate-500">Class 12th passouts, college students &amp; professionals</div>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Academics Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={(e) => handleDropdownTrigger('academics', e)}
                className={`flex items-center gap-1 px-1 py-1 text-[14px] font-medium transition cursor-pointer ${
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
                    <a href="#" onClick={(e) => { e.preventDefault(); closeDropdown(); }} className="block px-4 py-2 hover:bg-slate-50 transition">
                      <div className="font-bold text-xs text-[#0f2942]">Academic Levels (NEP 2020)</div>
                      <div className="text-[11px] text-slate-500">Foundation, Diploma, BSc, and 4-Year BS Degree</div>
                    </a>
                    <a href="#" onClick={(e) => { e.preventDefault(); closeDropdown(); }} className="block px-4 py-2 hover:bg-slate-50 transition">
                      <div className="font-bold text-xs text-[#0f2942]">Data Science &amp; AI Syllabus</div>
                      <div className="text-[11px] text-slate-500">Comprehensive course credit structure</div>
                    </a>
                    <a href="#" onClick={(e) => { e.preventDefault(); closeDropdown(); }} className="block px-4 py-2 hover:bg-slate-50 transition">
                      <div className="font-bold text-xs text-[#0f2942]">Central Library &amp; Academic Access</div>
                      <div className="text-[11px] text-slate-500">Digital IEEE/ACM library and physical campus access</div>
                    </a>
                    {onOpenCertificate && (
                      <button
                        type="button"
                        onClick={() => { onOpenCertificate(); closeDropdown(); }}
                        className="w-full text-left px-4 py-2 hover:bg-slate-50 text-kgp-crimson font-bold text-xs flex items-center justify-between border-t border-slate-100 mt-1 cursor-pointer"
                      >
                        <span>Sample Degree Certificate</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* 4. Admissions Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={(e) => handleDropdownTrigger('admissions', e)}
                className={`flex items-center gap-1 px-1 py-1 text-[14px] font-medium transition cursor-pointer ${
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
                    <a href="#" onClick={(e) => { e.preventDefault(); closeDropdown(); }} className="block px-4 py-2 hover:bg-slate-50 transition">
                      <div className="font-bold text-xs text-[#0f2942]">Direct Admission Pathways</div>
                      <div className="text-[11px] text-slate-500">WBJEE / JEE Advanced / Tripura JEE Ranks</div>
                    </a>
                    <button
                      type="button"
                      onClick={() => { if (onNavigate) onNavigate('qualifier'); closeDropdown(); }}
                      className="w-full text-left px-4 py-2 hover:bg-emerald-50 text-emerald-900 transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <div>
                        <div className="font-bold text-xs">Qualifier Round Examination</div>
                        <div className="text-[11px] text-slate-500">Register, Pay &amp; Take Computer-Based Test</div>
                      </div>
                    </button>
                    <a href="#" onClick={(e) => { e.preventDefault(); closeDropdown(); }} className="block px-4 py-2 hover:bg-slate-50 transition border-t border-slate-100 mt-1">
                      <div className="font-bold text-xs text-[#0f2942]">Fee &amp; Scholarship Calculator</div>
                      <div className="text-[11px] text-slate-500">Modular pay-per-credit with fee waivers up to 75%</div>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* 5. Student Support Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={(e) => handleDropdownTrigger('student-support', e)}
                className={`flex items-center gap-1 px-1 py-1 text-[14px] font-medium transition cursor-pointer ${
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
                        <div className="text-[11px] text-slate-500">Courseware, video lectures &amp; grades</div>
                      </div>
                    </button>
                    <a href="#" onClick={(e) => { e.preventDefault(); closeDropdown(); }} className="block px-4 py-2 hover:bg-slate-50 transition">
                      <div className="font-bold text-xs text-[#0f2942]">Frequently Asked Questions</div>
                      <div className="text-[11px] text-slate-500">Bilingual English &amp; Bengali assistance</div>
                    </a>
                    <a href="#" onClick={(e) => { e.preventDefault(); closeDropdown(); }} className="block px-4 py-2 hover:bg-slate-50 transition border-t border-slate-100 mt-1">
                      <div className="font-bold text-xs text-[#0f2942]">Helpdesk &amp; Admissions Office</div>
                      <div className="text-[11px] text-slate-500">Helpline email and CET campus desk</div>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* 6. News & Events Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={(e) => handleDropdownTrigger('news-events', e)}
                className={`flex items-center gap-1 px-1 py-1 text-[14px] font-medium transition cursor-pointer ${
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
                    <a href="#" onClick={(e) => { e.preventDefault(); closeDropdown(); }} className="block px-4 py-2 hover:bg-slate-50 transition">
                      <div className="font-bold text-xs text-[#0f2942]">Admission Notification 2026-27</div>
                      <div className="text-[11px] text-slate-500">Applications open for Qualifier Round 1</div>
                    </a>
                    <a 
                      href="#programme" 
                      onClick={(e) => { 
                        e.preventDefault(); 
                        if (onNavigate) onNavigate('programme'); 
                        closeDropdown(); 
                      }} 
                      className="block px-4 py-2 hover:bg-amber-50 text-amber-900 transition"
                    >
                      <div className="font-bold text-xs flex items-center justify-between">
                        <span>Director's Message</span>
                        <span className="text-[9px] font-bold bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded">TOI Feature</span>
                      </div>
                      <div className="text-[11px] text-slate-500">Vision of Prof. Suman Chakraborty, Director</div>
                    </a>
                    <a href="#" onClick={(e) => { e.preventDefault(); closeDropdown(); }} className="block px-4 py-2 hover:bg-slate-50 transition border-t border-slate-100 mt-1">
                      <div className="font-bold text-xs text-[#0f2942]">National Education Day Conclave</div>
                      <div className="text-[11px] text-slate-500">IIT Kharagpur outreach events</div>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* 7. Contact us Link */}
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="text-[#0f2942] hover:text-[#003893] font-medium text-[14px] px-1 py-1 transition-colors"
            >
              Contact us
            </a>

            {/* 8. FAQs Link */}
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="text-[#0f2942] hover:text-[#003893] font-medium text-[14px] px-1 py-1 transition-colors"
            >
              FAQs
            </a>

            {/* 9. Apply Now Hyperlink Button */}
            <button
              type="button"
              onClick={() => { if (onNavigate) onNavigate('student-login'); }}
              className="ml-3 inline-flex items-center justify-center px-6 py-2 bg-[#003893] hover:bg-[#002b70] text-white text-[14px] font-semibold rounded-full shadow-sm hover:shadow transition-all cursor-pointer"
            >
              Apply Now
            </button>
          </nav>

          {/* Mobile / Tablet Menu Button */}
          <div className="xl:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={() => { if (onNavigate) onNavigate('student-login'); }}
              className="px-4 py-1.5 bg-[#003893] hover:bg-[#002b70] text-white text-xs font-semibold rounded-full shadow-xs cursor-pointer"
            >
              Apply Now
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-1 max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col space-y-1">
            <a
              href="#home"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate('home');
                }
                setMobileMenuOpen(false);
              }}
              className={`py-2 px-3 rounded-lg text-sm font-bold ${
                currentPage === 'home' ? 'text-[#003893] bg-blue-50/80' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Home
            </a>

            {/* Mobile Programme Dropdown Button */}
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
                  href="#programme" 
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) onNavigate('programme');
                    setMobileMenuOpen(false);
                  }} 
                  className="block py-1.5 text-slate-700 font-semibold"
                >
                  Programme Highlights (Page 2)
                </a>
                <a href="#" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); }} className="block py-1.5 text-slate-600">Curriculum Overview &amp; Roadmap</a>
                <a href="#" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); }} className="block py-1.5 text-slate-600">How Will You Learn</a>
                <a href="#" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); }} className="block py-1.5 text-slate-600">Who Should Apply</a>
              </div>
            )}

            {/* Mobile Academics Dropdown Button */}
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
                <a href="#" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); }} className="block py-1.5 text-slate-700 font-semibold">Course Structure (4 Levels)</a>
                <a href="#" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); }} className="block py-1.5 text-slate-600">DS &amp; AI Syllabus Roadmap</a>
                <a href="#" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); }} className="block py-1.5 text-slate-600">Central Library Access</a>
                {onOpenCertificate && (
                  <button
                    type="button"
                    onClick={() => { onOpenCertificate(); setMobileMenuOpen(false); }}
                    className="w-full text-left py-1.5 text-kgp-crimson font-bold flex items-center justify-between"
                  >
                    <span>Sample Degree Certificate</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}
              </div>
            )}

            {/* Mobile Admissions Dropdown Button */}
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
                    className="w-full text-left py-1.5 text-kgp-crimson font-bold"
                  >
                    How to Apply (Instructions)
                  </button>
                )}
                <a href="#" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); }} className="block py-1.5 text-slate-700 font-semibold">Direct Admission Pathways</a>
                <button
                  type="button"
                  onClick={() => { if (onNavigate) onNavigate('qualifier'); setMobileMenuOpen(false); }}
                  className="w-full text-left py-1.5 text-emerald-800 font-bold"
                >
                  Qualifier Round CBT Exam
                </button>
                <a href="#" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); }} className="block py-1.5 text-slate-600">Fee &amp; Scholarship Calculator</a>
              </div>
            )}

            {/* Mobile Student Support Dropdown Button */}
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
                  className="w-full text-left py-1.5 text-blue-900 font-bold"
                >
                  Student Portal &amp; LMS
                </button>
                <a href="#" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); }} className="block py-1.5 text-slate-600">Frequently Asked Questions</a>
                <a href="#" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); }} className="block py-1.5 text-slate-600">Helpdesk &amp; Admissions Office</a>
              </div>
            )}

            {/* Mobile News & Events Dropdown Button */}
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
                <a href="#" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); }} className="block py-1.5 text-slate-700 font-semibold">Admission Notification 2026-27</a>
                <a 
                  href="#programme" 
                  onClick={(e) => { 
                    e.preventDefault(); 
                    if (onNavigate) onNavigate('programme'); 
                    setMobileMenuOpen(false); 
                  }} 
                  className="block py-1.5 text-amber-800 font-bold"
                >
                  Director's Message (TOI)
                </a>
              </div>
            )}

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
              }}
              className="py-2 px-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Contact us
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
              }}
              className="py-2 px-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              FAQs
            </a>

            <button
              type="button"
              onClick={() => { if (onNavigate) onNavigate('student-login'); setMobileMenuOpen(false); }}
              className="mt-3 w-full py-2.5 bg-[#003893] hover:bg-[#002b70] text-white font-semibold text-sm rounded-xl text-center shadow-xs block cursor-pointer"
            >
              Apply Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
