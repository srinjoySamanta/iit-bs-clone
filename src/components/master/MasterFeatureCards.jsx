import React from 'react';
import { 
  BookOpen, 
  TrendingUp, 
  Users, 
  Briefcase, 
  GraduationCap, 
  Building2, 
  FileCheck2,
  IndianRupee
} from 'lucide-react';
import { FEATURE_CARDS } from '../../data/masterReferenceData';

export default function MasterFeatureCards() {
  const getCardIcon = (iconType) => {
    const iconClass = "w-4 h-4 text-[#003893]";
    switch (iconType) {
      case 'book':
        return <BookOpen className={iconClass} />;
      case 'chart':
        return <TrendingUp className={iconClass} />;
      case 'users':
        return <Users className={iconClass} />;
      case 'briefcase':
        return <Briefcase className={iconClass} />;
      case 'faculty':
        return <GraduationCap className={iconClass} />;
      case 'campus':
        return <Building2 className={iconClass} />;
      case 'rupee':
        return <span className="font-bold text-sm text-[#003893] leading-none">₹</span>;
      case 'degree':
        return <FileCheck2 className={iconClass} />;
      default:
        return <BookOpen className={iconClass} />;
    }
  };

  return (
    <section className="w-full bg-white pt-2 pb-8 sm:pb-12">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 8 Feature Cards Grid / Horizontal Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3 sm:gap-3.5">
          {FEATURE_CARDS.map((card) => (
            <a
              key={card.id}
              href={card.href}
              className="flex flex-col justify-between p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/60 transition-all hover:shadow-xs hover:-translate-y-0.5 text-left group cursor-pointer"
            >
              {/* Top: Icon + Title */}
              <div>
                <div className="mb-2.5 w-8 h-8 rounded-lg bg-blue-50/80 border border-blue-100/60 flex items-center justify-center group-hover:bg-blue-100/70 transition-colors">
                  {getCardIcon(card.iconType)}
                </div>
                <h4 className="font-semibold text-[12.5px] sm:text-[13px] text-slate-900 group-hover:text-[#003893] leading-[1.3] mb-1.5 transition-colors">
                  {card.title}
                </h4>
              </div>

              {/* Bottom: Description */}
              <p className="text-[11px] sm:text-[11.5px] text-slate-500 leading-relaxed mt-1">
                {card.description}
              </p>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
