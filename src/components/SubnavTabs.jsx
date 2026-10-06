import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function SubnavTabs() {
  const [activeTab, setActiveTab] = useState('director-note');

  const tabs = [
    { id: 'director-note', label: "Director's Note" },
    { id: 'programme-highlights', label: "Programme Highlights" },
    { id: 'curriculum-overview', label: "Curriculum Overview" },
    { id: 'how-will-you-learn', label: "How Will You Learn" },
    { id: 'who-should-apply', label: "Who Should Apply" },
    { id: 'admission-process', label: "Admission Process" },
    { id: 'eligibility', label: "Eligibility" },
    { id: 'fees-structure', label: "Fees Structure" },
    { id: 'how-is-this-course-different', label: "Why This Course" },
    { id: 'about-institute', label: "About Institute" },
    { id: 'faqs', label: "FAQs" },
    { id: 'contact-us', label: "Contact Us" },
    { id: 'institutional-gateways', label: "Portal Logins ↓" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const tab of tabs) {
        const el = document.getElementById(tab.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveTab(tab.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollContainer = (direction) => {
    const container = document.getElementById('subnav-scroll-container');
    if (container) {
      container.scrollBy({ left: direction === 'left' ? -200 : 200, behavior: 'smooth' });
    }
  };

  const scrollToSection = (id) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="sticky top-[72px] z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 py-2.5 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 flex items-center gap-1 sm:gap-2">
        <button
          type="button"
          onClick={() => scrollContainer('left')}
          className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer"
          aria-label="Scroll tabs left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div
          id="subnav-scroll-container"
          className="flex-1 flex items-center gap-1.5 overflow-x-auto scrollbar-none scroll-smooth py-1 px-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => scrollToSection(tab.id)}
                className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-[13px] font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => scrollContainer('right')}
          className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer"
          aria-label="Scroll tabs right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
