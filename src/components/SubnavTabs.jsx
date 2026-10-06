import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function SubnavTabs({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('director-note');
  const scrollContainerRef = useRef(null);
  const isClickingRef = useRef(false);

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
      if (isClickingRef.current) return;
      const scrollPosition = window.scrollY + 220;

      for (let i = tabs.length - 1; i >= 0; i--) {
        const tab = tabs[i];
        const el = document.getElementById(tab.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveTab(tab.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tabs]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeBtn = scrollContainerRef.current.querySelector(`[data-tab-id="${activeTab}"]`);
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
      }
    }
  }, [activeTab]);

  const scrollHorizontally = (direction) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -220 : 220,
        behavior: 'smooth'
      });
    }
  };

  const scrollToSection = (id) => {
    setActiveTab(id);
    isClickingRef.current = true;

    const element = document.getElementById(id);
    if (element) {
      const headerHeight = document.querySelector('header')?.offsetHeight || 135;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight + 5;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Silently sync hash without reloading or triggering unmount
      try {
        window.history.replaceState(null, '', `#${id}`);
      } catch (e) {}

      setTimeout(() => {
        isClickingRef.current = false;
      }, 800);
    } else if (onNavigate) {
      onNavigate(id);
      setTimeout(() => {
        isClickingRef.current = false;
      }, 800);
    }
  };

  return (
    <div className="w-full bg-white/95 backdrop-blur-md py-1.5 sm:py-2 border-t border-slate-100 transition-all">
      <div className="max-w-[1400px] w-full mx-auto px-2 sm:px-4">
        
        {/* Floating Pill Capsule (Identical to IIT Jodhpur reference and user screenshot) */}
        <div className="flex items-center gap-1 sm:gap-2 bg-white border border-[#E5E7EB] rounded-full px-1.5 sm:px-2.5 py-1 sm:py-1.5 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.06)]">
          
          {/* Scroll Left Arrow */}
          <button
            type="button"
            onClick={() => scrollHorizontally('left')}
            className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[#6B7280] hover:text-[#1F2937] hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Scroll tabs left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Horizontally Scrollable Tabs Track */}
          <div
            ref={scrollContainerRef}
            className="flex-1 flex items-center gap-1 overflow-x-auto scroll-smooth py-0.5 no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  data-tab-id={tab.id}
                  type="button"
                  onClick={() => scrollToSection(tab.id)}
                  className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-[13px] font-medium whitespace-nowrap transition-all duration-300 ease-out cursor-pointer flex-shrink-0 ${
                    isActive
                      ? 'bg-[#050505] text-white shadow-xs font-semibold'
                      : 'text-[#4B5563] hover:text-[#111827] hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Scroll Right Arrow */}
          <button
            type="button"
            onClick={() => scrollHorizontally('right')}
            className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[#6B7280] hover:text-[#1F2937] hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Scroll tabs right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

        </div>

      </div>
    </div>
  );
}
