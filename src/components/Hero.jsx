import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, ShieldCheck, CheckCircle2, Award, Calendar, 
  Sparkles, Download, Layers, Users, BookOpen, Clock, ChevronRight 
} from 'lucide-react';
import { IIT_KGP_INFO, STATS } from '../data/portalData';

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
    <section className="relative overflow-hidden bg-gradient-to-b from-[#081528] via-[#0d223f] to-[#081528] text-white pt-8 pb-16 lg:pt-10 lg:pb-20">
      
      {/* Background Subtle Heritage Grid & Atmospheric Glow */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="kgp-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#d4af37" strokeWidth="0.6" strokeOpacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#kgp-grid)" />
        </svg>
      </div>

      {/* Atmospheric Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-red-800/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[250px] bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Heritage Pill Badge */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30 backdrop-blur shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="font-bold tracking-wider uppercase text-[11px]">
              First IIT of India • Estd. 1951
            </span>
          </div>
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 backdrop-blur">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Direct Entry: WBJEE & JEE Advanced</span>
          </div>
          <div className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-300 border border-blue-500/30 backdrop-blur">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Universal Qualifier (No Age Limit)</span>
          </div>
        </div>

        {/* Main Headline & Degree Title (Prominent, High-Contrast & Centered) */}
        <div className="text-center max-w-4xl mx-auto space-y-3">
          
          <div className="text-xs sm:text-sm uppercase tracking-widest text-amber-400 font-bold font-sans">
            Official 4-Year Undergraduate Degree Programme
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-serif-title leading-tight sm:leading-none text-white drop-shadow-md">
            Bachelor of Science <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">(BS)</span> in <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-100 to-white underline decoration-amber-500/80 decoration-2 sm:decoration-4 underline-offset-8">
              Data Science & Artificial Intelligence
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-200 font-light max-w-3xl mx-auto leading-relaxed pt-2">
            Earn an authentic undergraduate degree from the <strong className="text-amber-300 font-semibold">Indian Institute of Technology Kharagpur</strong>. 
            Enjoy flexible online learning with in-person proctored exams, modular exit awards (<span className="text-white font-medium">Certificate, Diploma, BSc, BS</span>), and lifelong <strong className="text-white font-medium">IIT KGP Alumni Status</strong>.
          </p>
        </div>

        {/* Primary Call to Action Buttons (Clearly visible on any laptop screen) */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          
          {/* Main Qualifier Exam Button */}
          <button
            onClick={onOpenQualifier}
            className="group px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-600 text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-xl hover:shadow-2xl flex items-center justify-center gap-2.5 transition transform hover:-translate-y-0.5 ring-2 ring-amber-400 border border-emerald-400/50"
          >
            <div className="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            </div>
            <div className="text-left">
              <div className="text-xs text-amber-200 font-semibold uppercase tracking-wider leading-none">
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
            className="group px-6 sm:px-7 py-3.5 sm:py-4 bg-gradient-to-r from-kgp-crimson to-red-800 hover:from-kgp-darkred hover:to-kgp-crimson text-white font-bold text-sm sm:text-base rounded-2xl shadow-lg hover:shadow-xl flex items-center justify-center gap-2.5 transition transform hover:-translate-y-0.5 border border-red-400/30"
          >
            <div className="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center">
              <Award className="w-4 h-4 text-amber-300" />
            </div>
            <div className="text-left">
              <div className="text-xs text-red-200 font-semibold uppercase tracking-wider leading-none">
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
            className="px-5 py-3.5 sm:py-4 bg-slate-800/80 hover:bg-slate-700/80 text-amber-300 hover:text-amber-200 font-semibold text-xs sm:text-sm rounded-2xl border border-amber-500/30 flex items-center justify-center gap-2 transition backdrop-blur shadow-md"
          >
            <span>Fees & Waivers (Up to 75% Off)</span>
            <ChevronRight className="w-4 h-4 text-amber-400" />
          </a>

          {/* Interactive Block Diagram Button */}
          <button
            onClick={onOpenDiagram}
            className="px-4 py-3.5 sm:py-4 bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white text-xs sm:text-sm font-medium rounded-2xl border border-slate-700 flex items-center justify-center gap-1.5 transition"
            title="Open Interactive Portal Block Diagram"
          >
            <Layers className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Block Diagram</span>
          </button>

        </div>

        {/* Live Admission Deadline Countdown Strip (Compact & Elegant) */}
        <div className="mt-6 max-w-xl mx-auto bg-slate-900/90 backdrop-blur-md border border-amber-500/30 rounded-2xl p-3 sm:p-3.5 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
          
          <div className="flex items-center space-x-2.5 text-center sm:text-left">
            <div className="w-8 h-8 rounded-lg bg-kgp-crimson flex items-center justify-center text-amber-300 flex-shrink-0 shadow">
              <Clock className="w-4 h-4 animate-spin" style={{ animationDuration: '10s' }} />
            </div>
            <div>
              <div className="text-[10px] sm:text-[11px] font-bold text-amber-400 uppercase tracking-wider leading-none">
                Qualifier Term 2026 Batch
              </div>
              <div className="text-xs sm:text-sm font-extrabold text-white leading-tight">
                Applications Closing Soon
              </div>
            </div>
          </div>

          {/* Countdown Blocks */}
          <div className="flex items-center space-x-1.5 text-center">
            <div className="bg-slate-950 border border-slate-800 px-2.5 py-1 rounded-lg">
              <span className="text-base font-extrabold text-white tabular-nums">{timeLeft.days}</span>
              <span className="block text-[9px] text-slate-400 uppercase font-semibold">Days</span>
            </div>
            <span className="text-amber-500 font-bold">:</span>
            <div className="bg-slate-950 border border-slate-800 px-2.5 py-1 rounded-lg">
              <span className="text-base font-extrabold text-white tabular-nums">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="block text-[9px] text-slate-400 uppercase font-semibold">Hours</span>
            </div>
            <span className="text-amber-500 font-bold">:</span>
            <div className="bg-slate-950 border border-slate-800 px-2.5 py-1 rounded-lg">
              <span className="text-base font-extrabold text-white tabular-nums">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="block text-[9px] text-slate-400 uppercase font-semibold">Mins</span>
            </div>
            <span className="text-amber-500 font-bold">:</span>
            <div className="bg-slate-950 border border-slate-800 px-2.5 py-1 rounded-lg">
              <span className="text-base font-extrabold text-amber-400 tabular-nums">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="block text-[9px] text-slate-400 uppercase font-semibold">Secs</span>
            </div>
          </div>

        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-center">
          <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-3 sm:p-4 backdrop-blur transition">
            <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-amber-400 font-serif-title">
              {STATS[0].value}
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-100 mt-1">
              {STATS[0].label}
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">{STATS[0].desc}</div>
          </div>

          <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-3 sm:p-4 backdrop-blur transition">
            <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-amber-400 font-serif-title">
              {STATS[1].value}
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-100 mt-1">
              {STATS[1].label}
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">{STATS[1].desc}</div>
          </div>

          <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-3 sm:p-4 backdrop-blur transition">
            <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-amber-400 font-serif-title">
              {STATS[2].value}
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-100 mt-1">
              {STATS[2].label}
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">{STATS[2].desc}</div>
          </div>

          <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-3 sm:p-4 backdrop-blur transition">
            <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-amber-400 font-serif-title">
              {STATS[3].value}
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-100 mt-1">
              {STATS[3].label}
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">{STATS[3].desc}</div>
          </div>
        </div>

      </div>
    </section>
  );
}
