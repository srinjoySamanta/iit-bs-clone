import React from 'react';
import { 
  Cpu, 
  Layers, 
  Tv, 
  FileCheck2, 
  Users, 
  Lightbulb, 
  Cog, 
  Globe, 
  Award, 
  Newspaper, 
  CheckCircle2 
} from 'lucide-react';
import MasterHeader from './MasterHeader';
import directorPic from '../../assets/images/director-suman-chakraborty.jpg';
import iitKgpLogo from '../../assets/logo';
import { PROGRAMME_HIGHLIGHTS } from '../../data/masterReferenceData';

export default function MasterPageTwo({ onNavigate, onOpenCertificate, onOpenHowToApply }) {
  const getHighlightIcon = (iconType) => {
    const iconClass = "w-6 h-6 sm:w-7 sm:h-7 text-[#1d4ed8] stroke-[1.8]";
    switch (iconType) {
      case 'ai-chip':
        return <Cpu className={iconClass} />;
      case 'layers':
        return <Layers className={iconClass} />;
      case 'video-class':
        return <Tv className={iconClass} />;
      case 'exam':
        return <FileCheck2 className={iconClass} />;
      case 'library':
        return <Users className={iconClass} />;
      case 'projects':
        return <Lightbulb className={iconClass} />;
      case 'gear':
        return <Cog className={iconClass} />;
      case 'globe':
        return <Globe className={iconClass} />;
      default:
        return <Cpu className={iconClass} />;
    }
  };

  // Duplicate highlight items for seamless infinite marquee loop
  const marqueeItems = [...PROGRAMME_HIGHLIGHTS, ...PROGRAMME_HIGHLIGHTS];

  return (
    <div className="w-full min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top Header (Strict Master Reference Navigation) */}
      <MasterHeader 
        currentPage="programme"
        onNavigate={onNavigate} 
        onOpenCertificate={onOpenCertificate} 
        onOpenHowToApply={onOpenHowToApply} 
      />

      {/* PAGE 2 MAIN CONTENT: DIRECTOR'S MESSAGE (LEFT) + PROGRAMME HIGHLIGHTS (RIGHT) */}
      <main className="w-full flex-1 bg-[#fafcff] py-8 sm:py-12">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Split 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            
            {/* ====================================================
                LEFT SIDE: DIRECTOR'S MESSAGE (ONLY ON PAGE 2)
               ==================================================== */}
            <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-between bg-[#0a192f] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800">
              <div>
                {/* TOI Exclusive Feature Badge */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-red-950/80 text-red-300 border border-red-800/60">
                    <Newspaper className="w-3.5 h-3.5 text-red-400" />
                    <span>The Times of India Feature</span>
                  </span>
                </div>

                {/* Director Header: Photo & Credentials */}
                <div className="flex items-center gap-4 mb-5 pb-5 border-b border-white/10">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-[#eab308] shadow-md flex-shrink-0">
                    <img
                      src={directorPic}
                      alt="Prof. Suman Chakraborty, Director, IIT Kharagpur"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 block mb-0.5">
                      Director's Address
                    </span>
                    <h3 className="text-white text-base sm:text-lg font-bold font-serif-title leading-snug">
                      Prof. Suman Chakraborty
                    </h3>
                    <p className="text-slate-300 text-xs font-medium mt-0.5">
                      Director, IIT Kharagpur
                    </p>
                    <p className="text-amber-300/90 text-[11px] mt-1 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                      <span>Shanti Swarup Bhatnagar Awardee &amp; Infosys Laureate</span>
                    </p>
                  </div>
                </div>

                {/* Director Visionary Message */}
                <div className="space-y-3.5 text-slate-200">
                  <p className="font-serif italic text-[14px] sm:text-[15px] leading-relaxed text-white">
                    “Artificial Intelligence and Data Science are the defining frontiers of our generation. 
                    Our vision with the 4-Year Bachelor of Science (BS) Degree is to make world-class education from 
                    India's first IIT universally accessible.”
                  </p>
                  <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-sans">
                    “Language, rigid entry barriers, or socioeconomic background must never prevent 
                    a talented student from mastering cutting-edge technology. Through this degree, 
                    we prepare visionary technologists who will shape industry, academia, and global innovation.”
                  </p>
                </div>

                {/* Key Highlights of the Initiative */}
                <div className="mt-5 pt-4 border-t border-white/10 space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Universal Qualifier pathway without mandatory JEE cutoff</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0" />
                    <span>Bilingual support (Bangla explanations + English terminology)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>Permanent IIT Kharagpur Alumni Status &amp; Convocation Degree</span>
                  </div>
                </div>
              </div>

              {/* Bottom Institutional Seal */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <img src={iitKgpLogo} alt="IIT KGP" className="w-5 h-5 object-contain" />
                  <span className="font-serif text-amber-300 font-bold">योगঃ कर्मसु कौशलम्</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/80 border border-emerald-700/60 px-2.5 py-0.5 rounded-full">
                  First IIT • Estd. 1951
                </span>
              </div>
            </div>

            {/* ====================================================
                RIGHT SIDE: PROGRAMME HIGHLIGHTS (RIGHT → LEFT MARQUEE)
               ==================================================== */}
            <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center">
              
              {/* Section Header */}
              <div className="mb-5">
                <h2 className="text-[28px] sm:text-[34px] font-extrabold text-[#0a2540] leading-tight">
                  Programme Highlights
                </h2>
                <div className="w-16 h-1.5 bg-[#eab308] rounded-full mt-2.5 mb-3" />
                <p className="text-xs sm:text-[13.5px] text-[#475569] leading-relaxed max-w-xl">
                  Key foundational pillars of the Bachelor of Science in Data Science &amp; Artificial Intelligence from IIT Kharagpur.
                </p>
              </div>

              {/* Continuous Infinite Marquee: RIGHT → LEFT */}
              <div className="relative w-full overflow-hidden bg-white rounded-3xl border border-slate-200/90 shadow-sm py-8">
                {/* Infinite Marquee Track Moving from RIGHT to LEFT */}
                <div className="marquee-right-to-left flex items-center">
                  {marqueeItems.map((item, index) => (
                    <a
                      key={`${item.id}-${index}`}
                      href="#"
                      className="flex flex-col items-center text-center px-6 py-4 w-[240px] sm:w-[260px] flex-shrink-0 group/item transition-transform hover:scale-[1.03] cursor-pointer"
                      title={item.title}
                    >
                      {/* Clickable Icon */}
                      <div className="mb-3.5 p-3.5 rounded-2xl bg-blue-50/90 group-hover/item:bg-blue-100 transition-colors flex items-center justify-center shadow-xs">
                        {getHighlightIcon(item.iconType)}
                      </div>

                      {/* Title */}
                      <h4 className="font-bold text-[13.5px] text-[#0f172a] group-hover/item:text-[#1d4ed8] leading-[1.3] mb-2 transition-colors">
                        {item.title}
                      </h4>

                      {/* Description Subtitle */}
                      <p className="text-[12px] text-[#64748b] leading-[1.45]">
                        {item.description}
                      </p>
                    </a>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>

      {/* PAGE 2 ENDS */}
    </div>
  );
}
