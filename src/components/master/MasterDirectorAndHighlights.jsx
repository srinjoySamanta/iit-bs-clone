import React, { useState, useRef, useEffect } from 'react';
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
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import directorPic from '../../assets/images/director-suman-chakraborty.jpg';
import iitKgpLogo from '../../assets/logo';
import { PROGRAMME_HIGHLIGHTS } from '../../data/masterReferenceData';

export default function MasterDirectorAndHighlights() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const scrollRef = useRef(null);
  const pauseTimerRef = useRef(null);

  const getHighlightIcon = (iconType) => {
    const iconClass = "w-6 h-6 sm:w-6.5 sm:h-6.5 text-[#1d4ed8] stroke-[1.8]";
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

  // Duplicate items 3 times for continuous infinite loop without any edge gaps
  const carouselItems = [
    ...PROGRAMME_HIGHLIGHTS, 
    ...PROGRAMME_HIGHLIGHTS, 
    ...PROGRAMME_HIGHLIGHTS
  ];

  const pauseAutoScrollTemporarily = () => {
    setIsHovered(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 3000);
  };

  const handlePrev = () => {
    pauseAutoScrollTemporarily();
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -250, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    pauseAutoScrollTemporarily();
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 250, behavior: 'smooth' });
    }
  };

  // Continuous auto-scrolling animation from RIGHT to LEFT with pause on hover
  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;

    let animationFrameId;
    let lastTime = performance.now();

    const step = (now) => {
      const delta = now - lastTime;
      lastTime = now;

      if (!isHovered && scroller) {
        // Continuous smooth scrolling speed (~36px/sec)
        scroller.scrollLeft += (36 * delta) / 1000;

        // Loop seamlessly through the 3 duplicate sets
        const singleSetWidth = scroller.scrollWidth / 3;
        if (scroller.scrollLeft >= singleSetWidth * 2) {
          scroller.scrollLeft -= singleSetWidth;
        } else if (scroller.scrollLeft <= 0) {
          scroller.scrollLeft += singleSetWidth;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    };
  }, [isHovered]);

  return (
    <section 
      id="programme-highlights" 
      className="w-full bg-[#fafcff] py-8 sm:py-12 border-t border-slate-100 scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split 2-Column Grid: Top-aligned, balanced side-by-side on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* ====================================================
              1. LEFT SIDE: COMPACT DIRECTOR'S MESSAGE CARD
             ==================================================== */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-between bg-[#0a192f] text-white rounded-3xl p-5 sm:p-6 shadow-xl border border-slate-800 transition-all duration-300">
            <div>
              {/* TOI Exclusive Feature Badge */}
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold uppercase tracking-wider bg-red-950/80 text-red-300 border border-red-800/60">
                  <Newspaper className="w-3 h-3 text-red-400" />
                  <span>The Times of India Feature</span>
                </span>
              </div>

              {/* Director Header: Photo, Name, Designation & Laureate Award */}
              <div className="flex items-center gap-3.5 mb-3.5 pb-3 border-b border-white/10">
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 border-[#eab308] shadow-md flex-shrink-0">
                  <img
                    src={directorPic}
                    alt="Prof. Suman Chakraborty, Director, IIT Kharagpur"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <span className="text-[9.5px] font-bold uppercase tracking-widest text-amber-400 block leading-tight">
                    Director's Address
                  </span>
                  <h3 className="text-white text-[15px] sm:text-[16px] font-bold font-serif-title leading-snug">
                    Prof. Suman Chakraborty
                  </h3>
                  <p className="text-slate-300 text-[11px] font-medium leading-tight mt-0.5">
                    Director, IIT Kharagpur
                  </p>
                  <p className="text-amber-300/90 text-[10px] sm:text-[10.5px] mt-1 flex items-center gap-1 leading-tight">
                    <Award className="w-3 h-3 text-amber-400 flex-shrink-0" />
                    <span>Shanti Swarup Bhatnagar Awardee &amp; Infosys Laureate</span>
                  </p>
                </div>
              </div>

              {/* Director Visionary Message (Preview by default, expandable with Read More) */}
              <div className="text-slate-200">
                <p className="font-serif italic text-[12.5px] sm:text-[13px] leading-relaxed text-slate-100">
                  “Artificial Intelligence and Data Science are the defining frontiers of our generation. 
                  Our vision with the 4-Year Bachelor of Science (BS) Degree is to make world-class education from 
                  India's first IIT universally accessible...”
                </p>

                {/* Clearly Visible Read More / Read Less Toggle */}
                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="inline-flex items-center gap-1 text-[11px] sm:text-[11.5px] font-bold text-amber-400 hover:text-amber-300 transition-colors mt-1.5 cursor-pointer focus:outline-none"
                  aria-expanded={isExpanded}
                >
                  <span>{isExpanded ? 'Read Less' : 'Read More'}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                </button>

                {/* Expanded Full Message Content */}
                {isExpanded && (
                  <div className="mt-2.5 pt-2.5 border-t border-white/10 space-y-2 animate-in fade-in duration-200">
                    <p className="font-serif italic text-[12.5px] sm:text-[13px] leading-relaxed text-slate-200">
                      “Our vision with the 4-Year Bachelor of Science (BS) Degree is to make world-class education from India's first IIT universally accessible.”
                    </p>
                    <p className="text-[11.5px] sm:text-[12px] text-slate-300 leading-relaxed font-sans">
                      “Language, rigid entry barriers, or socioeconomic background must never prevent 
                      a talented student from mastering cutting-edge technology. Through this degree, 
                      we prepare visionary technologists who will shape industry, academia, and global innovation.”
                    </p>
                  </div>
                )}
              </div>

              {/* Compact Key Highlights */}
              <div className="mt-3 pt-2.5 border-t border-white/10 space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span className="text-[11px] sm:text-[11.5px]">Universal Qualifier pathway without mandatory JEE cutoff</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                  <span className="text-[11px] sm:text-[11.5px]">Bilingual support (Bangla explanations + English terminology)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span className="text-[11px] sm:text-[11.5px]">Permanent IIT Kharagpur Alumni Status &amp; Convocation Degree</span>
                </div>
              </div>
            </div>

            {/* Bottom Institutional Seal */}
            <div className="mt-3.5 pt-2.5 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <img src={iitKgpLogo} alt="IIT KGP" className="w-4 h-4 object-contain" />
                <span className="font-serif text-amber-300 font-bold text-[11px]">योगঃ कर्मसु कौशलम्</span>
              </div>
              <span className="text-[9.5px] text-emerald-400 font-bold bg-emerald-950/80 border border-emerald-700/60 px-2 py-0.5 rounded-full">
                First IIT • Estd. 1951
              </span>
            </div>
          </div>

          {/* ====================================================
              2. RIGHT SIDE: SCROLLING PROGRAMME HIGHLIGHTS
             ==================================================== */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-start">
            
            {/* Section Header with Left/Right Navigation Arrows */}
            <div className="flex items-start justify-between gap-4 mb-3 sm:mb-4">
              <div>
                <h2 className="text-[24px] sm:text-[28px] lg:text-[30px] font-extrabold text-[#0a2540] leading-tight">
                  Programme Highlights
                </h2>
                <div className="w-14 h-1.5 bg-[#eab308] rounded-full mt-1.5 mb-2" />
                <p className="text-xs sm:text-[13px] text-[#475569] leading-relaxed max-w-lg">
                  Key foundational pillars of the Bachelor of Science in Data Science &amp; Artificial Intelligence from IIT Kharagpur.
                </p>
              </div>

              {/* Navigation Arrows for Manual Browsing */}
              <div className="flex items-center gap-1.5 flex-shrink-0 pt-1">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous highlight"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-[#003893] hover:border-[#003893] hover:bg-blue-50/50 shadow-xs flex items-center justify-center transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#003893]"
                  title="Previous highlight"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next highlight"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-[#003893] hover:border-[#003893] hover:bg-blue-50/50 shadow-xs flex items-center justify-center transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#003893]"
                  title="Next highlight"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Clean, White, Rounded Highlights Container */}
            <div 
              className="relative w-full overflow-hidden bg-white rounded-3xl border border-slate-200/90 shadow-sm py-5 px-3 sm:px-4 group/carousel"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onTouchStart={() => setIsHovered(true)}
              onTouchEnd={() => {
                if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
                pauseTimerRef.current = setTimeout(() => setIsHovered(false), 2500);
              }}
            >
              {/* Overlay Navigation Button - Left */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Scroll left"
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/95 backdrop-blur-xs border border-slate-200 text-slate-700 hover:text-[#003893] hover:bg-white shadow-md items-center justify-center transition opacity-0 group-hover/carousel:opacity-100 cursor-pointer hidden sm:flex"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Overlay Navigation Button - Right */}
              <button
                type="button"
                onClick={handleNext}
                aria-label="Scroll right"
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/95 backdrop-blur-xs border border-slate-200 text-slate-700 hover:text-[#003893] hover:bg-white shadow-md items-center justify-center transition opacity-0 group-hover/carousel:opacity-100 cursor-pointer hidden sm:flex"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Horizontally Scrolling Highlight Track */}
              <div 
                ref={scrollRef}
                className="flex items-center overflow-x-auto scrollbar-none scroll-smooth select-none py-1"
              >
                {carouselItems.map((item, index) => (
                  <a
                    key={`${item.id}-${index}`}
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="flex flex-col items-center text-center px-4 py-2 w-[220px] sm:w-[240px] md:w-[250px] flex-shrink-0 group/item transition-transform hover:scale-[1.03] cursor-pointer"
                    title={item.title}
                  >
                    {/* Clickable Icon */}
                    <div className="mb-3 p-3.5 rounded-2xl bg-blue-50/90 group-hover/item:bg-blue-100 group-hover/item:shadow-xs transition-all flex items-center justify-center shadow-xs">
                      {getHighlightIcon(item.iconType)}
                    </div>

                    {/* Title */}
                    <h4 className="font-bold text-[13px] sm:text-[13.5px] text-[#0f2942] group-hover/item:text-[#1d4ed8] leading-[1.3] mb-1.5 transition-colors line-clamp-2">
                      {item.title}
                    </h4>

                    {/* Description Subtitle */}
                    <p className="text-[11.5px] sm:text-[12px] text-[#64748b] leading-[1.4] line-clamp-2">
                      {item.description}
                    </p>
                  </a>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
