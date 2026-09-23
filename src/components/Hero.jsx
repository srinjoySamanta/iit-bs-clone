import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, ShieldCheck, CheckCircle2, Award, Calendar, 
  Sparkles, Download, Users, BookOpen, Clock, ChevronRight 
} from 'lucide-react';
import { IIT_KGP_INFO } from '../data/portalData';
import iitKgpLogo from '../assets/logo';

export default function Hero({ onOpenSignUp, onOpenDiagram, onOpenCertificate, onOpenQualifier }) {
  // Countdown to application deadline
  const [timeLeft, setTimeLeft] = useState({ days: 38, hours: 14, minutes: 22, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#faf9f6] via-white to-[#f4f1ea] text-slate-900 pt-8 pb-16 lg:pt-10 lg:pb-20 border-b border-stone-200">
      
      {/* Background Subtle Heritage Grid & Atmospheric Glow */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="kgp-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#b45309" strokeWidth="0.5" strokeOpacity="0.15" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#kgp-grid)" />
        </svg>
      </div>

      {/* Atmospheric Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-red-700/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[250px] bg-amber-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Heritage Pill Badge */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-kgp-crimson border border-red-200 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-kgp-crimson animate-ping" />
            <span className="font-bold tracking-wider uppercase text-[11px]">
              First IIT of India • Estd. 1951
            </span>
          </div>
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Direct Entry: WBJEE, JEE Advanced &amp; Tripura JEE</span>
          </div>
          <div className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-900 border border-blue-200 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Universal Qualifier (No Age Limit)</span>
          </div>
        </div>

        {/* Main Headline & Degree Title (Prominent, High-Contrast & Centered) */}
        <div className="text-center max-w-4xl mx-auto space-y-3">
          
          {/* Official IIT Kharagpur Crest Display */}
          <div className="flex items-center justify-center gap-3.5 mb-1">
            <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-white p-1.5 shadow-md border-2 border-amber-500/60 flex items-center justify-center">
              <img 
                src={iitKgpLogo} 
                alt="Indian Institute of Technology Kharagpur" 
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
              />
            </div>
            <div className="text-left">
              <div className="text-sm sm:text-base font-bold font-serif-title text-slate-900 leading-tight">
                Indian Institute of Technology Kharagpur
              </div>
              <div className="text-xs text-amber-800 font-semibold leading-tight mt-0.5">
                भारतीय प्रौद्योगिकी संस्थान खड़गपुर
              </div>
            </div>
          </div>

          <div className="text-xs sm:text-sm uppercase tracking-widest text-amber-800 font-bold font-sans">
            Official 4-Year Undergraduate Degree Programme
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-serif-title leading-tight text-slate-950">
            Bachelor of Science <span className="text-kgp-crimson">(BS)</span> in <br />
            <span className="text-kgp-crimson underline decoration-amber-500/60 decoration-2 sm:decoration-4 underline-offset-8">
              Data Science &amp; Artificial Intelligence
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-700 font-normal max-w-3xl mx-auto leading-relaxed pt-2">
            Earn an authentic undergraduate degree from the <strong className="text-kgp-crimson font-bold">Indian Institute of Technology Kharagpur</strong>. 
            Enjoy flexible online learning with in-person proctored exams, modular exit awards (<span className="text-slate-900 font-semibold">Certificate, Diploma, BSc, BS</span>), and lifelong <strong className="text-slate-900 font-semibold">IIT KGP Alumni Status</strong>.
          </p>
        </div>

        {/* Primary Call to Action Buttons */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          
          {/* Main Qualifier Exam Button */}
          <button
            onClick={onOpenQualifier}
            className="group px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 hover:from-emerald-800 hover:to-teal-800 text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 transition transform hover:-translate-y-0.5 border border-emerald-600/40 ring-2 ring-emerald-500/20"
          >
            <div className="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            </div>
            <div className="text-left">
              <div className="text-xs text-emerald-100 font-semibold uppercase tracking-wider leading-none">
                Admission Pathway 1
              </div>
              <div className="font-bold leading-tight">
                Qualifier Exam Portal
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform ml-1" />
          </button>

          {/* Direct Admission Button */}
          <button
            onClick={onOpenSignUp}
            className="group px-6 sm:px-7 py-3.5 sm:py-4 bg-gradient-to-r from-kgp-crimson to-red-800 hover:from-kgp-darkred hover:to-kgp-crimson text-white font-bold text-sm sm:text-base rounded-2xl shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 transition transform hover:-translate-y-0.5 border border-red-700/30"
          >
            <div className="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center">
              <Award className="w-4 h-4 text-amber-300" />
            </div>
            <div className="text-left">
              <div className="text-xs text-red-100 font-semibold uppercase tracking-wider leading-none">
                Admission Pathway 2
              </div>
              <div className="font-bold leading-tight">
                Direct Entry (WBJEE/JEE)
              </div>
            </div>
          </button>

          {/* Fees & Waiver Calculator Shortcut */}
          <a
            href="#fees"
            className="px-5 py-3.5 sm:py-4 bg-white hover:bg-slate-50 text-slate-800 hover:text-kgp-crimson font-semibold text-xs sm:text-sm rounded-2xl border border-stone-300 flex items-center justify-center gap-2 transition shadow-sm"
          >
            <span>Fees &amp; Waivers (Up to 75% Off)</span>
            <ChevronRight className="w-4 h-4 text-amber-600" />
          </a>

        </div>

        {/* Live Admission Deadline Countdown Strip (Sober & Prestigious Academic Style) */}
        <div className="mt-7 max-w-xl mx-auto bg-white border-2 border-amber-300/80 rounded-2xl p-3 sm:p-3.5 shadow-md flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-900">
          
          <div className="flex items-center space-x-2.5 text-center sm:text-left">
            <div className="w-8 h-8 rounded-lg bg-red-50 text-kgp-crimson border border-red-200 flex items-center justify-center flex-shrink-0 shadow-sm">
              <Clock className="w-4 h-4 animate-spin" style={{ animationDuration: '10s' }} />
            </div>
            <div>
              <div className="text-[10px] sm:text-[11px] font-bold text-amber-800 uppercase tracking-wider leading-none">
                Qualifier Term 2026 Batch
              </div>
              <div className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">
                Applications Closing Soon
              </div>
            </div>
          </div>

          {/* Countdown Blocks */}
          <div className="flex items-center space-x-1.5 text-center">
            <div className="bg-stone-50 border border-stone-200 px-2.5 py-1 rounded-lg">
              <span className="text-base font-extrabold text-slate-900 tabular-nums">{timeLeft.days}</span>
              <span className="block text-[9px] text-slate-500 uppercase font-semibold">Days</span>
            </div>
            <span className="text-amber-600 font-bold">:</span>
            <div className="bg-stone-50 border border-stone-200 px-2.5 py-1 rounded-lg">
              <span className="text-base font-extrabold text-slate-900 tabular-nums">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="block text-[9px] text-slate-500 uppercase font-semibold">Hours</span>
            </div>
            <span className="text-amber-600 font-bold">:</span>
            <div className="bg-stone-50 border border-stone-200 px-2.5 py-1 rounded-lg">
              <span className="text-base font-extrabold text-slate-900 tabular-nums">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="block text-[9px] text-slate-500 uppercase font-semibold">Mins</span>
            </div>
            <span className="text-amber-600 font-bold">:</span>
            <div className="bg-stone-50 border border-stone-200 px-2.5 py-1 rounded-lg">
              <span className="text-base font-extrabold text-kgp-crimson tabular-nums">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="block text-[9px] text-slate-500 uppercase font-semibold">Secs</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
