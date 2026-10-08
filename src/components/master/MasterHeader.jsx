import React from 'react';
import iitKgpLogo from '../../assets/logo';
import { useDropdownGate } from '../../context/DropdownGateContext';

export default function MasterHeader({ onNavigate, onScrollToHighlights }) {
  const { requireUserInformationBeforeDropdown } = useDropdownGate();

  const handleLinkClick = (id, e) => {
    if (id === 'home') {
      e.preventDefault();
      const el = document.getElementById('home');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      try {
        window.history.replaceState(null, '', '#home');
      } catch (err) {}
      return;
    }

    if (id === 'programme') {
      e.preventDefault();
      // Gated check if visitor info needed
      requireUserInformationBeforeDropdown('programme', () => {
        if (onScrollToHighlights) {
          onScrollToHighlights();
        } else {
          document.getElementById('programme-highlights')?.scrollIntoView({ behavior: 'smooth' });
        }
      });
      return;
    }

    if (['academics', 'admissions', 'student-support', 'news-events'].includes(id)) {
      e.preventDefault();
      // Gated check
      requireUserInformationBeforeDropdown(id, () => {
        // Verified: placeholder action
      });
      return;
    }

    if (id === 'contact-us' || id === 'faqs') {
      e.preventDefault();
      // Placeholder anchor as requested
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'programme', label: 'Programme', href: '#' },
    { id: 'academics', label: 'Academics', href: '#' },
    { id: 'admissions', label: 'Admissions', href: '#' },
    { id: 'student-support', label: 'Student Support', href: '#' },
    { id: 'news-events', label: 'News & Events', href: '#' },
    { id: 'contact-us', label: 'Contact us', href: '#' },
    { id: 'faqs', label: 'FAQs', href: '#' },
  ];

  return (
    <header className="w-full bg-white select-none">
      {/* ============================================================
          LEVEL 1 — CENTERED IIT KHARAGPUR BRANDING
         ============================================================ */}
      <div className="w-full pt-6 pb-4 sm:pt-7 sm:pb-5 px-4 text-center">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center justify-center">
          
          {/* Centered Large IIT Kharagpur Crest Logo */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick('home', e)}
            className="inline-block transition-transform hover:scale-[1.02] cursor-pointer mb-3 sm:mb-4 focus:outline-hidden"
            title="Indian Institute of Technology Kharagpur"
          >
            <img
              src={iitKgpLogo}
              alt="Indian Institute of Technology Kharagpur Crest"
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain mx-auto drop-shadow-2xs"
            />
          </a>

          {/* Centered Institute Names (Trilingual) */}
          <div className="flex flex-col items-center text-center space-y-0.5">
            {/* Bengali Name */}
            <div
              className="text-[13.5px] sm:text-[15.5px] md:text-[17px] font-semibold text-[#15803d] leading-tight"
              style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}
            >
              ভারতীয় প্রযুক্তিবিদ্যা প্রতিষ্ঠান খড়গপুর
            </div>

            {/* Hindi (Devanagari) Name */}
            <div
              className="text-[13.5px] sm:text-[15.5px] md:text-[17px] font-bold text-[#0f172a] leading-tight pt-0.5"
              style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
            >
              भारतीय प्रौद्योगिकी संस्थान खड़गपुर
            </div>

            {/* English Official Name (Strongest & Largest) */}
            <div className="text-[15px] sm:text-[18px] md:text-[21px] lg:text-[23px] font-black text-[#b91c1c] tracking-[0.035em] leading-snug pt-1 uppercase font-sans">
              INDIAN INSTITUTE OF TECHNOLOGY KHARAGPUR
            </div>
          </div>

        </div>
      </div>

      {/* ============================================================
          LEVEL 2 — SIMPLE NAVIGATION DOWNLINE
         ============================================================ */}
      <nav className="w-full bg-white border-t border-b border-slate-200/90 py-2.5 sm:py-3 px-4 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
        <div className="max-w-[1200px] mx-auto flex flex-wrap items-center justify-center text-[13.5px] sm:text-[14.5px] md:text-[15px] text-[#0f2942]">
          {navLinks.map((item, index) => (
            <React.Fragment key={item.id}>
              <a
                href={item.href}
                onClick={(e) => handleLinkClick(item.id, e)}
                className="px-2 sm:px-3 py-1 font-semibold text-[#0f2942] hover:text-[#b91c1c] transition-colors whitespace-nowrap cursor-pointer"
              >
                {item.label}
              </a>
              {index < navLinks.length - 1 && (
                <span className="text-slate-300 select-none px-0.5 sm:px-1 hidden sm:inline" aria-hidden="true">
                  |
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </nav>
    </header>
  );
}
