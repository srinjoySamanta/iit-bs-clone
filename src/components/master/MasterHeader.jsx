import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import iitKgpLogo from '../../assets/logo';
import { HEADER_NAV_LINKS, APPLY_NOW_LINK } from '../../data/masterReferenceData';

export default function MasterHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-slate-200/80 sticky top-0 z-50">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[78px] sm:h-[84px]">
          
          {/* Left: IIT Kharagpur Crest Logo & Trilingual Official Identity */}
          <a href="#" className="flex items-center gap-3 group text-left flex-shrink-0">
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
          <nav className="hidden xl:flex items-center space-x-6 text-[14px]">
            {HEADER_NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`relative px-0.5 py-1 text-[14px] transition-colors ${
                  link.active
                    ? 'text-[#0f2942] font-bold'
                    : 'text-[#0f2942] hover:text-[#003893] font-medium'
                }`}
              >
                {link.label}
                {link.active && (
                  <span className="absolute bottom-[-4px] left-0 w-full h-[3px] bg-[#eab308] rounded-full" />
                )}
              </a>
            ))}

            {/* Apply Now Hyperlink Button */}
            <a
              href={APPLY_NOW_LINK.href}
              className="ml-3 inline-flex items-center justify-center px-6 py-2 bg-[#003893] hover:bg-[#002b70] text-white text-[14px] font-semibold rounded-full shadow-sm hover:shadow transition-all"
            >
              {APPLY_NOW_LINK.label}
            </a>
          </nav>

          {/* Mobile / Tablet Menu Button */}
          <div className="xl:hidden flex items-center gap-2">
            <a
              href={APPLY_NOW_LINK.href}
              className="px-4 py-1.5 bg-[#003893] hover:bg-[#002b70] text-white text-xs font-semibold rounded-full shadow-xs"
            >
              {APPLY_NOW_LINK.label}
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-1">
          <div className="flex flex-col space-y-2">
            {HEADER_NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-3 rounded-lg text-sm font-medium transition ${
                  link.active
                    ? 'text-[#003893] bg-blue-50/80 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href={APPLY_NOW_LINK.href}
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 w-full py-2.5 bg-[#003893] hover:bg-[#002b70] text-white font-semibold text-sm rounded-xl text-center shadow-xs block"
            >
              {APPLY_NOW_LINK.label}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
