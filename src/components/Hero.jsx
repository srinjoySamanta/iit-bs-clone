import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, ShieldCheck, CheckCircle2, Award, Calendar, 
  Sparkles, Download, Layers, Users, BookOpen, Clock 
} from 'lucide-react';
import { IIT_KGP_INFO, STATS } from '../data/portalData';

export default function Hero({ onOpenSignUp, onOpenDiagram, onOpenCertificate }) {
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
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-kgp-navy to-slate-900 text-white pt-12 pb-20">
      {/* Background Subtle Heritage Accents */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#d4af37" strokeWidth="0.7" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-red-700/20 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 backdrop-blur">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            First IIT in India • Established 1951
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 backdrop-blur">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Direct Admission via WBJEE & JEE Advanced
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/40 backdrop-blur">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            Universal Qualifier Process (No Age Limits)
          </span>
        </div>

        {/* Center Official Crest */}
        <div className="flex justify-center mb-5">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white p-2 shadow-2xl border-4 border-amber-400/80 flex items-center justify-center group hover:scale-105 transition-transform">
            <img 
              src="/iitkgp-logo.png" 
              alt="Indian Institute of Technology Kharagpur" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-serif-title leading-tight sm:leading-none">
            Bachelor of Science <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">(BS)</span> in <br className="hidden sm:inline" />
            <span className="text-white underline decoration-amber-500/60 underline-offset-8">Data Science & AI</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 font-light max-w-3xl mx-auto leading-relaxed">
            Earn an authentic undergraduate degree from the <span className="text-amber-300 font-medium">Indian Institute of Technology Kharagpur</span>. 
            Enjoy complete flexibility to learn online with in-person proctored exams, modular exit awards (Certificate, Diploma, BSc, BS), and official IIT KGP Alumni status.
          </p>
        </div>

        {/* Live Admission Countdown Card */}
        <div className="mt-8 max-w-2xl mx-auto bg-slate-800/80 backdrop-blur border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-xl bg-kgp-crimson/80 flex items-center justify-center text-amber-400 flex-shrink-0">
                <Clock className="w-5 h-5 animate-spin" style={{ animationDuration: '8s' }} />
              </div>
              <div>
                <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  Applications Closing Soon
                </div>
                <div className="text-sm font-bold text-white">
                  Qualifier Term 2026 Batch
                </div>
              </div>
            </div>

            {/* Countdown Blocks */}
            <div className="flex items-center space-x-2 text-center">
              <div className="bg-slate-900/90 border border-slate-700 px-3 py-1.5 rounded-lg">
                <span className="text-lg font-bold text-white tabular-nums">{timeLeft.days}</span>
                <span className="block text-[10px] text-slate-400 uppercase">Days</span>
              </div>
              <span className="text-slate-500 font-bold">:</span>
              <div className="bg-slate-900/90 border border-slate-700 px-3 py-1.5 rounded-lg">
                <span className="text-lg font-bold text-white tabular-nums">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="block text-[10px] text-slate-400 uppercase">Hours</span>
              </div>
              <span className="text-slate-500 font-bold">:</span>
              <div className="bg-slate-900/90 border border-slate-700 px-3 py-1.5 rounded-lg">
                <span className="text-lg font-bold text-white tabular-nums">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="block text-[10px] text-slate-400 uppercase">Mins</span>
              </div>
              <span className="text-slate-500 font-bold">:</span>
              <div className="bg-slate-900/90 border border-slate-700 px-3 py-1.5 rounded-lg">
                <span className="text-lg font-bold text-amber-400 tabular-nums">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="block text-[10px] text-slate-400 uppercase">Secs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Call to Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={onOpenQualifier}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-600 text-white font-extrabold rounded-xl shadow-2xl flex items-center justify-center gap-2 group transition transform hover:-translate-y-0.5 ring-2 ring-amber-400"
          >
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span>Qualifier Exam (Register, Pay & Give Exam)</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onOpenSignUp}
            className="w-full sm:w-auto px-7 py-4 bg-gradient-to-r from-kgp-crimson to-red-800 hover:from-kgp-darkred hover:to-kgp-crimson text-white font-bold rounded-xl shadow-xl flex items-center justify-center gap-2 transition"
          >
            <span>Direct Admission (WBJEE/JEE)</span>
          </button>

          <button
            onClick={onOpenDiagram}
            className="w-full sm:w-auto px-6 py-4 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-semibold rounded-xl border border-amber-500/40 flex items-center justify-center gap-2 transition"
          >
            <Layers className="w-5 h-5" />
            <span>Interactive Portal Diagram</span>
          </button>
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-serif-title">
              {STATS[0].value}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-200 mt-1">
              {STATS[0].label}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">{STATS[0].desc}</div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-serif-title">
              {STATS[1].value}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-200 mt-1">
              {STATS[1].label}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">{STATS[1].desc}</div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-serif-title">
              {STATS[2].value}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-200 mt-1">
              {STATS[2].label}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">{STATS[2].desc}</div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-serif-title">
              {STATS[3].value}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-200 mt-1">
              {STATS[3].label}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">{STATS[3].desc}</div>
          </div>
        </div>

      </div>
    </section>
  );
}
