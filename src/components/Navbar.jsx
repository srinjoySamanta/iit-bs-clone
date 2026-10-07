import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ExternalLink, ChevronDown, GraduationCap, ShieldCheck, 
  LogIn, UserPlus, BookOpen, Phone, HelpCircle, User, Home, Sparkles, Globe,
  UserCheck, ArrowRight, Layers, Building2, Quote, Award, Briefcase, FileText, CheckCircle2
} from 'lucide-react';
import { IIT_KGP_INFO, ANNOUNCEMENT_TICKER } from '../data/portalData';
import iitKgpLogo from '../assets/logo';
import logo75Years from '../assets/images/iitkgp-75-years.png';
import { getErpLoginUrl, redirectToErpPortal } from '../config/portalConfig';
import SubnavTabs from './SubnavTabs';

export default function Navbar({ 
  onNavigate,
  onOpenDiagram, 
  onOpenSignUp,
  onOpenCertificate,
  onOpenHowToApply,
  currentView
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState('en');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
    <>
      <header 
        id="main-fixed-navbar"
        className="fixed top-0 left-0 right-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200"
        style={{ position: 'fixed', top: 0, left: 0, right: 0, width: '100%', zIndex: 50 }}
      >

      {/* Main Brand & Navigation Header */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between gap-3 sm:gap-4 transition-all duration-200 ${isScrolled ? 'min-h-[62px] py-1.5' : 'min-h-[82px] sm:min-h-[88px] py-2 sm:py-2.5'}`}>
          
          {/* Logo & Institute Identity (Strictly aligned, zero text overlap) */}
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 sm:gap-3.5 md:gap-4 group text-left flex-shrink-0"
          >
            {/* Official IIT KGP Logo Image - Bigger Size, Fixed in Same Left Position */}
            <div className={`rounded-2xl bg-white p-1 border-2 border-amber-500/60 shadow-md flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-all overflow-hidden ${
              isScrolled ? 'w-11 h-11 sm:w-13 sm:h-13' : 'w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20'
            }`}>
              <img 
                src={iitKgpLogo} 
                alt="IIT Kharagpur Official Crest" 
                className="w-full h-full object-contain transition-all"
              />
            </div>
            
            <div className="flex flex-col justify-center">
              {/* Hindi Title */}
              {!isScrolled && (
                <div className="text-[11px] sm:text-xs font-semibold text-kgp-crimson tracking-wide leading-tight transition-all">
                  {IIT_KGP_INFO.hindiName}
                </div>
              )}
              {/* English Institution Name */}
              <div className={`font-bold font-serif-title text-slate-900 leading-tight group-hover:text-kgp-crimson transition-all ${isScrolled ? 'text-sm sm:text-base' : 'text-sm sm:text-lg md:text-xl'}`}>
                {IIT_KGP_INFO.name}
              </div>
              {/* Degree Subtitle */}
              <div className="text-[11px] sm:text-xs font-semibold text-amber-700 flex items-center gap-1.5 leading-tight mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                <span>BS in Data Science &amp; Artificial Intelligence</span>
              </div>
            </div>
          </button>

          {/* Right Section: Language Switcher, Apply CTA, & 75 Years Celebration Emblem */}
          <div className="flex items-center space-x-2.5 sm:space-x-3.5 md:space-x-4 flex-shrink-0">
            {/* Desktop Site Translator Selector */}
            <div className="hidden lg:flex items-center gap-1 px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-xl text-xs">
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

            {/* Desktop Apply Now Button */}
            <button
              onClick={() => onNavigate('student-login')}
              className="hidden lg:flex items-center space-x-1.5 px-5 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-white bg-kgp-crimson hover:bg-kgp-darkred rounded-full shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 cursor-pointer uppercase font-sans tracking-wide"
            >
              <UserPlus className="w-4 h-4" />
              <span>Apply Now</span>
            </button>

            {/* Official IIT KGP 75 Years Emblem - Placed to the RIGHT side of the Apply Now option */}
            <div 
              className="flex items-center flex-shrink-0 group cursor-pointer pl-0.5 sm:pl-1"
              onClick={() => onNavigate('campus')}
              title="75 Years of IIT Kharagpur (1951-2026) - Dedicated to the Service of the Nation / राष्ट्र सेवार्थ समर्पित"
            >
              <img 
                src={logo75Years} 
                alt="IIT Kharagpur 75 Years (1951-2026) - राष्ट्र सेवार्थ समर्पित" 
                className={`w-auto object-contain mix-blend-multiply transition-all group-hover:scale-105 drop-shadow-xs ${
                  isScrolled ? 'h-9 sm:h-11' : 'h-11 sm:h-13 md:h-15'
                }`}
              />
            </div>

            {/* Mobile Navigation Controls */}
            <div className="lg:hidden flex items-center space-x-1.5 sm:space-x-2">
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
      </div>

      {/* Row 2: 13-Tab Standby Subnav Bar (Permanently standby on top, never disappears) */}
      <SubnavTabs onNavigate={onNavigate} />

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
      {/* Structural layout spacer so hero content begins cleanly right below the fixed header */}
      <div 
        className={`w-full transition-all duration-200 ${isScrolled ? 'h-[112px]' : 'h-[134px] sm:h-[140px]'}`} 
        aria-hidden="true" 
      />
    </>
  );
}
