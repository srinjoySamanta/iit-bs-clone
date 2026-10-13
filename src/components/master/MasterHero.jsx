import React from 'react';
import { GraduationCap, Check } from 'lucide-react';
import heroCampusImg from '../../assets/images/hero-student-campus-clean.png';
import { HERO_CONTENT } from '../../data/masterReferenceData';

export default function MasterHero({ onExploreProgramme }) {
  return (
    <section id="home" className="w-full bg-white pt-4 pb-6 sm:py-8 overflow-hidden scroll-mt-6">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* Left Column: Title, Description, Direct Entry Box & CTA */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center">
            
            {/* Main Hero Heading */}
            <h1 className="text-[32px] sm:text-[42px] lg:text-[44px] xl:text-[48px] font-extrabold text-[#0a2540] leading-[1.12] tracking-tight mb-4">
              {HERO_CONTENT.headingLine1} <br />
              <span className="text-[#0a2540]">{HERO_CONTENT.headingLine2}</span> <br />
              <span className="text-[#0a2540]">{HERO_CONTENT.headingLine3}</span>
            </h1>

            {/* Description Paragraph */}
            <p className="text-[14px] sm:text-[15.5px] text-[#475569] leading-[1.55] max-w-[530px] mb-5">
              {HERO_CONTENT.description}
            </p>

            {/* Minimalist Card: Direct Entry for Top Rankers */}
            <div className="bg-slate-50/90 border border-slate-200/80 rounded-2xl p-4 sm:p-5 max-w-[520px] mb-6 shadow-2xs">
              {/* Header inside Box */}
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#003893] flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-slate-900 text-[14.5px] sm:text-[15px] leading-tight">
                  {HERO_CONTENT.directEntryTitle}
                </h3>
              </div>

              {/* 2-Column List with Clean Checkmarks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 text-[13px] text-slate-700 font-normal">
                {HERO_CONTENT.directEntryItems.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#003893] stroke-[2.5] flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Outlined Explore Programme Hyperlink Button */}
            <div>
              <a
                href="#programme"
                onClick={(e) => {
                  if (onExploreProgramme) {
                    e.preventDefault();
                    onExploreProgramme();
                  }
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-[#003893] text-[#003893] hover:bg-[#003893] hover:text-white text-[14px] font-semibold transition-all cursor-pointer group shadow-2xs"
              >
                <span>Explore Programme</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>

          </div>

          {/* Right Column: Master Reference Visual Composition */}
          <div className="lg:col-span-6 xl:col-span-6 flex items-center justify-center">
            <div className="relative w-full max-w-[620px] rounded-2xl overflow-hidden shadow-sm">
              <img
                src={heroCampusImg}
                alt="IIT Kharagpur BS in Data Science & AI Students and Iconic Campus"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
