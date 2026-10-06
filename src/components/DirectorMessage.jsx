import React, { useState } from 'react';
import { 
  Quote, Newspaper, Award, ExternalLink, Sparkles, CheckCircle2, 
  ArrowRight, BookOpen, GraduationCap, Building2, Globe2, ChevronDown, ChevronUp 
} from 'lucide-react';
import directorPic from '../assets/images/director-suman-chakraborty.jpg';
import iitKgpLogo from '../assets/logo';

export default function DirectorMessage({ onOpenQualifier, onOpenSignUp }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section 
      id="director-note" 
      className="w-full scroll-mt-[135px] py-14 md:py-20 px-4 md:px-10 text-white border-y border-stone-800 transition-all"
      style={{ background: '#0A0103' }}
    >
      <div className="max-w-[1140px] mx-auto">
        
        {/* Header Title Matching Reference Site */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-red-950/70 text-red-300 border border-red-800/60 mb-2.5">
            <Newspaper className="w-3.5 h-3.5 text-red-400" />
            <span>The Times of India Exclusive Feature</span>
          </div>
          <h2 className="text-center text-2xl md:text-4xl font-bold font-serif-title text-white">
            Note from our Director
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl mx-auto">
            Visionary address by Prof. Suman Chakraborty on democratizing world-class AI &amp; Data Science at India's first IIT.
          </p>
        </div>

        {/* 2-Column Split: Media Card Left, Quotation & Narrative Right */}
        <div className="flex flex-col lg:flex-row justify-center items-stretch gap-8 lg:gap-14">
          
          {/* Left Column: Director Media Card */}
          <div className="w-full lg:w-[400px] flex-shrink-0 flex flex-col justify-between bg-white/5 border border-white/10 rounded-[24px] p-5 backdrop-blur-xs shadow-2xl">
            <div className="relative w-full aspect-square rounded-[20px] overflow-hidden border border-white/10 shadow-lg group">
              <img 
                src={directorPic} 
                alt="Prof. Suman Chakraborty, Director, IIT Kharagpur" 
                className="w-full h-full object-cover object-top transition duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 text-white">
                <span className="text-[10px] font-black tracking-wider uppercase text-amber-400 block">
                  IIT Kharagpur Director
                </span>
                <span className="text-xs font-semibold text-slate-200">
                  Renaissance 2.0 Global Summit
                </span>
              </div>
            </div>

            {/* Credentials Card */}
            <div className="mt-4 pt-3 border-t border-white/10 text-left space-y-1.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <Award className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Shanti Swarup Bhatnagar Awardee</strong> &amp; Infosys Laureate</span>
              </div>
              <div className="flex items-start gap-2">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Pioneer in Biomedical AI &amp; Microfluidics</span>
              </div>
              <div className="flex items-start gap-2">
                <Globe2 className="w-3.5 h-3.5 text-sky-400 flex-shrink-0 mt-0.5" />
                <span>Advocate for NEP 2020 Multidisciplinary Tech Education</span>
              </div>
            </div>

            <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center justify-between text-slate-400 text-xs">
              <div className="flex items-center gap-2">
                <img src={iitKgpLogo} alt="IIT KGP" className="w-5 h-5 object-contain" />
                <span className="font-serif text-amber-300 font-bold">योगः कर्मसु कौशलम्</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-700/50 px-2 py-0.5 rounded-full">
                In Office
              </span>
            </div>
          </div>

          {/* Right Column: Quotation, Narrative & Pedagogical Pillars */}
          <div className="flex-1 flex flex-col justify-center gap-4 md:gap-5">
            
            {/* SVG Quote Mark */}
            <div className="flex justify-center lg:justify-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="40" viewBox="0 0 44 40" fill="none">
                <path d="M26.1985 40V32.5523C26.3664 28.145 26.5903 23.9609 26.8702 20C27.2061 16.0391 28.1298 12.3849 29.6412 9.03766C31.1527 5.63459 33.7837 2.62204 37.5344 0L42.1527 5.27197C41.0891 6.22036 39.7176 8.17294 38.0382 11.1297C36.3588 14.0307 35.4631 18.0474 35.3511 23.1799L44 24.2678V40H26.1985ZM0 40V32.5523C0 28.2008 0.195929 24.0446 0.587786 20.0837C1.03562 16.1227 2.07125 12.4407 3.69466 9.03766C5.37405 5.63459 8.08906 2.62204 11.8397 0L16.458 5.27197C15.3944 6.22036 14.0229 8.14505 12.3435 11.046C10.6641 13.947 9.76845 17.9637 9.65649 23.0962L17.8015 24.2678V40H0Z" fill="#71717A" />
              </svg>
            </div>

            <p className="text-white text-sm sm:text-base md:text-lg font-light leading-relaxed text-center lg:text-left font-serif italic">
              “Artificial Intelligence and Data Science are the defining frontiers of our generation. 
              Our vision with the 4-Year Bachelor of Science (BS) Degree is to make world-class education from 
              India's first IIT universally accessible. 
              Language, rigid entry barriers, or socioeconomic background must never prevent 
              a talented student from mastering cutting-edge technology.”
            </p>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed text-center lg:text-left">
              “The professionals who will lead the next decade are those who can move fluently between 
              deep computational theory and real-world deployment. Through this pioneering BS degree, 
              we prepare visionary technologists who will shape industry, academia, and global innovation.”
            </p>

            {/* Divider */}
            <div className="h-px w-full bg-white/15 my-1"></div>

            {/* Director Signature & Details */}
            <div className="text-center lg:text-left">
              <h3 className="text-white text-lg sm:text-xl font-bold font-serif-title">
                Prof. Suman Chakraborty
              </h3>
              <p className="text-amber-400 text-xs sm:text-sm font-semibold mt-0.5">
                Director, Indian Institute of Technology Kharagpur
              </p>
              <p className="text-slate-400 text-xs mt-0.5">
                Professor, Mechanical Engineering &amp; School of Medical Science and Technology
              </p>
            </div>

            {/* Expandable NEP 2020 Pillars */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsExpanded(prev => !prev)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition border border-white/10 cursor-pointer"
              >
                <span>{isExpanded ? 'Hide Detailed Pillars' : 'View NEP 2020 Pedagogical Pillars (Times of India)'}</span>
                {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {isExpanded && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 animate-in fade-in duration-300">
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                    <div className="font-bold text-white flex items-center gap-1.5 mb-1 text-emerald-400">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>Universal Qualifier Entry</span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-normal">
                      No mandatory JEE ranking cutoff. Anyone with Class 12 Mathematics can register and qualify through our 4-week foundation course.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                    <div className="font-bold text-white flex items-center gap-1.5 mb-1 text-sky-400">
                      <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0" />
                      <span>Bilingual Accessibility</span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-normal">
                      Lectures and discussion mentors provided in Bengali and English for conceptual clarity, using global English technical terms.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                    <div className="font-bold text-white flex items-center gap-1.5 mb-1 text-purple-400">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      <span>Modular NEP Exit Milestones</span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-normal">
                      Flexible exits: Foundation Certificate (Yr 1), Diplomas (Yr 2), B.Sc. Degree (Yr 3), and full 4-Year BS Degree with honours.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                    <div className="font-bold text-white flex items-center gap-1.5 mb-1 text-amber-400">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span>Campus Immersion &amp; Alumni Status</span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-normal">
                      Hands-on immersion on the 2,100-acre Kharagpur campus, Library access, and lifelong IIT Kharagpur Alumni membership.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Direct Action Pills */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenQualifier}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-kgp-crimson to-red-800 hover:from-kgp-darkred hover:to-kgp-crimson text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition flex items-center gap-2 cursor-pointer"
              >
                <span>Apply for Qualifier Round 2026</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#curriculum-overview"
                className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold border border-white/20 transition flex items-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>Explore 4-Year Curriculum</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
