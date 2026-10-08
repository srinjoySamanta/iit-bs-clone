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
  const getCardIcon = (iconType, color) => {
    switch (iconType) {
      case 'book':
        return <BookOpen className="w-5 h-5 flex-shrink-0" style={{ color }} />;
      case 'chart':
        return <TrendingUp className="w-5 h-5 flex-shrink-0" style={{ color }} />;
      case 'users':
        return <Users className="w-5 h-5 flex-shrink-0" style={{ color }} />;
      case 'briefcase':
        return <Briefcase className="w-5 h-5 flex-shrink-0" style={{ color }} />;
      case 'faculty':
        return <GraduationCap className="w-5 h-5 flex-shrink-0" style={{ color }} />;
      case 'campus':
        return <Building2 className="w-5 h-5 flex-shrink-0" style={{ color }} />;
      case 'rupee':
        return (
          <span 
            className="w-5 h-5 flex items-center justify-center font-bold text-base leading-none flex-shrink-0"
            style={{ color }}
          >
            ₹
          </span>
        );
      case 'degree':
        return <FileCheck2 className="w-5 h-5 flex-shrink-0" style={{ color }} />;
      default:
        return <BookOpen className="w-5 h-5 flex-shrink-0" style={{ color }} />;
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
              className="flex flex-col justify-between p-3.5 sm:p-4 rounded-2xl border transition-all hover:shadow-md hover:-translate-y-0.5 text-left group cursor-pointer"
              style={{
                backgroundColor: card.theme.bg,
                borderColor: card.theme.border,
              }}
            >
              {/* Top: Icon + Title */}
              <div>
                <div className="mb-2">
                  {getCardIcon(card.iconType, card.theme.iconColor)}
                </div>
                <h4 
                  className="font-bold text-[12.5px] sm:text-[13px] leading-[1.25] mb-1.5"
                  style={{ color: card.theme.titleColor }}
                >
                  {card.title}
                </h4>
              </div>

              {/* Bottom: Description */}
              <p className="text-[11px] sm:text-[11.5px] text-[#475569] leading-[1.4] mt-1">
                {card.description}
              </p>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
