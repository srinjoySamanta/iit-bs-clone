import React from 'react';
import { 
  Cpu, 
  Layers, 
  Tv, 
  FileCheck2, 
  Users, 
  Lightbulb, 
  Cog, 
  Globe 
} from 'lucide-react';
import { PROGRAMME_HIGHLIGHTS } from '../../data/masterReferenceData';

export default function MasterProgrammeHighlights() {
  const getHighlightIcon = (iconType) => {
    const iconClass = "w-7 h-7 text-[#1d4ed8] stroke-[1.8]";
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

  // Duplicate items array twice for a seamless infinite loop
  const marqueeItems = [...PROGRAMME_HIGHLIGHTS, ...PROGRAMME_HIGHLIGHTS];

  return (
    <section id="programme-highlights" className="w-full bg-white border-t border-slate-200 py-8 sm:py-10 overflow-hidden">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8">
          
          {/* Left Side: Fixed Section Heading & Yellow Accent Underline */}
          <div className="flex-shrink-0 lg:w-[200px] xl:w-[220px] pr-4 border-b lg:border-b-0 lg:border-r border-slate-200/80 pb-4 lg:pb-0">
            <h2 className="text-[26px] sm:text-[30px] font-extrabold text-[#0a2540] leading-[1.15] tracking-tight">
              Programme <br />
              Highlights
            </h2>
            <div className="w-14 h-1.5 bg-[#eab308] rounded-full mt-2.5" />
          </div>

          {/* Right Side: Continuous Left-to-Right Marquee Carousel */}
          <div className="flex-1 overflow-hidden relative group">
            
            {/* Infinite Marquee Track moving from LEFT TO RIGHT */}
            <div className="marquee-left-to-right flex items-center py-2">
              {marqueeItems.map((item, index) => (
                <a
                  key={`${item.id}-${index}`}
                  href={item.href}
                  className="flex flex-col items-center text-center px-6 py-2 w-[190px] sm:w-[210px] flex-shrink-0 group/item transition-transform hover:scale-[1.03] cursor-pointer"
                  title={item.title}
                >
                  {/* Clickable Icon */}
                  <div className="mb-2 p-2 rounded-xl bg-blue-50/60 group-hover/item:bg-blue-100/80 transition-colors flex items-center justify-center">
                    {getHighlightIcon(item.iconType)}
                  </div>

                  {/* Title */}
                  <h4 className="font-bold text-[13px] text-[#0f172a] group-hover/item:text-[#1d4ed8] leading-[1.25] mb-1 transition-colors">
                    {item.title}
                  </h4>

                  {/* Description Subtitle */}
                  <p className="text-[11.5px] text-[#64748b] leading-[1.35]">
                    {item.description}
                  </p>
                </a>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
