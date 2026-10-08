import React from 'react';
import { GraduationCap, Check } from 'lucide-react';
import heroCampusImg from '../../assets/images/hero-student-campus-clean.png';
import { HERO_CONTENT } from '../../data/masterReferenceData';

export default function MasterHero({ onExploreProgramme }) {
  return (
    <section className="w-full bg-white pt-4 pb-6 sm:py-8 overflow-hidden">
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

            {/* Yellow Highlighted Box: Direct Entry for Top Rankers */}
            <div className="bg-[#fef3c7]/85 border border-[#fcd34d] rounded-2xl p-4 sm:p-5 shadow-xs max-w-[520px] mb-6">
              {/* Header inside Box */}
              <div className="flex items-center gap-2.5 mb-3">
                <GraduationCap className="w-5 h-5 text-[#0f172a] flex-shrink-0" />
                <h3 className="font-bold text-[#0f172a] text-[15px] sm:text-[16px] leading-tight">
                  {HERO_CONTENT.directEntryTitle}
                </h3>
              </div>

              {/* 2-Column List with Gold Checkmark Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-[13px] sm:text-[13.5px] text-[#1e293b] font-medium">
                {/* WBJEE */}
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#f59e0b] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                  <span>{HERO_CONTENT.directEntryItems[0]}</span>
                </div>

                {/* Tripura JEE */}
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#f59e0b] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                  <span>{HERO_CONTENT.directEntryItems[1]}</span>
                </div>

                {/* JEE Main / Advanced */}
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#f59e0b] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                  <span>{HERO_CONTENT.directEntryItems[2]}</span>
                </div>

                {/* Teachers */}
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#f59e0b] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                  <span>{HERO_CONTENT.directEntryItems[3]}</span>
                </div>
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
                className="inline-flex items-center justify-center px-7 py-2.5 rounded-full border-2 border-[#1d4ed8] text-[#1d4ed8] hover:bg-[#1d4ed8]/5 text-[15px] font-bold transition-all shadow-xs cursor-pointer"
              >
                {HERO_CONTENT.exploreButton.label}
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
