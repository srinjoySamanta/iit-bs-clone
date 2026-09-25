import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, ShieldCheck, CheckCircle2, Award, Calendar, 
  Sparkles, Download, Users, BookOpen, ChevronRight, ChevronLeft,
  Building2, MapPin, Eye, GraduationCap, Clock
} from 'lucide-react';
import { IIT_KGP_INFO } from '../data/portalData';
import iitKgpLogo from '../assets/logo';

import imgMainBuilding from '../assets/images/iit-kgp-main-building.jpg';
import imgTowerFacade from '../assets/images/iit-kgp-tower-facade.jpg';
import imgCentralLibrary from '../assets/images/iit-kgp-central-library.jpg';
import imgPuriGate from '../assets/images/iit-kgp-puri-gate.jpg';

export default function Hero({ onOpenSignUp, onOpenDiagram, onOpenCertificate, onOpenQualifier }) {
  // 1st option is the Historic Main Building as requested
  const slides = [
    {
      id: 'main-building',
      title: 'Historic Main Building (Hijli Detention Camp)',
      shortTitle: 'Main Building',
      caption: 'Birthplace of the IIT System (Estd. 1951)',
      badge: 'Heritage Monument',
      src: imgMainBuilding,
      alt: 'IIT Kharagpur Historic Main Building',
      highlight: 'Estd. 1951'
    },
    {
      id: 'tower-facade',
      title: 'Iconic Clock Tower Facade',
      shortTitle: 'Clock Tower',
      caption: 'The celebrated architectural emblem of IIT Kharagpur',
      badge: 'Architectural Emblem',
      src: imgTowerFacade,
      alt: 'IIT Kharagpur Clock Tower Facade',
      highlight: '75+ Years'
    },
    {
      id: 'central-library',
      title: 'Central Library Archives',
      shortTitle: 'Central Library',
      caption: 'Asia\'s premier technical library with 400,000+ volumes',
      badge: 'Academic Powerhouse',
      src: imgCentralLibrary,
      alt: 'IIT Kharagpur Central Library',
      highlight: '400K+ Books'
    },
    {
      id: 'puri-gate',
      title: 'Puri Gate (Main Campus Entrance)',
      shortTitle: 'Puri Gate',
      caption: 'Grand ceremonial entrance to the 2,100-acre green campus',
      badge: 'Campus Gateway',
      src: imgPuriGate,
      alt: 'IIT Kharagpur Puri Gate Main Entrance',
      highlight: '2,100 Acres'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section 
      className="relative min-h-[640px] lg:min-h-[700px] flex items-center justify-center text-white overflow-hidden py-14 sm:py-18 border-b-4 border-amber-500"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      
      {/* 1. BACKGROUND SLIDESHOW LAYER (Smooth Cross-fade) */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              currentSlide === idx 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-105 pointer-events-none'
            }`}
          >
            <img 
              src={slide.src} 
              alt={slide.alt}
              className="w-full h-full object-cover object-center" 
            />
          </div>
        ))}
      </div>

      {/* 2. SOPHISTICATED MULTI-STAGE CONTRAST OVERLAYS */}
      {/* Base deep tinted vignette */}
      <div className="absolute inset-0 z-[1] bg-slate-950/65 backdrop-brightness-[0.7]" />
      
      {/* Vertical gradient to frame text and blend smoothly with navbar and bottom border */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/65" />
      
      {/* Institute crimson & amber ambient color wash */}
      <div className="absolute inset-0 z-[3] bg-gradient-to-r from-red-950/40 via-transparent to-amber-950/30 mix-blend-multiply" />

      {/* Engineering blueprint grid overlay for authentic IIT tech aesthetics */}
      <div className="absolute inset-0 z-[4] opacity-15 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="kgp-hero-pattern" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#f59e0b" strokeWidth="0.5" strokeOpacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#kgp-hero-pattern)" />
        </svg>
      </div>

      {/* 3. FOREGROUND MAIN CONTENT (Z-10, High Legibility, Centered & Prestigious) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center w-full">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-slate-900/85 text-amber-300 border border-amber-500/40 shadow-lg backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="tracking-wider uppercase text-[11px]">
              First IIT of India • Estd. 1951
            </span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-950/85 text-emerald-300 border border-emerald-500/40 shadow-lg backdrop-blur-md">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Direct Entry: WBJEE, JEE Advanced &amp; Tripura JEE</span>
          </div>

          <div className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-blue-950/85 text-blue-300 border border-blue-500/40 shadow-lg backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Universal Qualifier (No Age Limit)</span>
          </div>
        </div>

        {/* IIT Kharagpur Crest & Institutional Name */}
        <div className="flex items-center justify-center gap-3.5 mb-2">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/95 p-1.5 shadow-2xl border-2 border-amber-400 flex items-center justify-center flex-shrink-0 backdrop-blur-md">
            <img 
              src={iitKgpLogo} 
              alt="Indian Institute of Technology Kharagpur" 
              className="w-11 h-11 sm:w-13 sm:h-13 object-contain"
            />
          </div>
          <div className="text-left">
            <div className="text-base sm:text-xl font-bold font-serif-title text-white leading-tight tracking-wide drop-shadow-md">
              Indian Institute of Technology Kharagpur
            </div>
            <div className="text-xs sm:text-sm text-amber-300 font-semibold leading-tight mt-0.5 font-serif drop-shadow-sm">
              भारतीय प्रौद्योगिकी संस्थान खड़गपुर
            </div>
          </div>
        </div>

        {/* Degree Sub-title & Eyebrow */}
        <div className="mt-2 mb-1">
          <span className="px-3.5 py-1 rounded-md bg-stone-900/90 text-amber-400 border border-amber-500/30 text-xs font-extrabold uppercase tracking-widest backdrop-blur-md shadow-sm">
            Official 4-Year Undergraduate Degree Programme
          </span>
        </div>

        {/* Master Heading */}
        <h1 className="mt-3 text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight font-serif-title leading-[1.12] text-white drop-shadow-lg">
          Bachelor of Science <span className="text-amber-400">(BS)</span> in <br />
          <span className="text-amber-300 underline decoration-amber-400/80 decoration-4 underline-offset-8">
            Data Science &amp; Artificial Intelligence
          </span>
        </h1>

        {/* Program Narrative Description */}
        <p className="mt-4 text-sm sm:text-base md:text-lg text-slate-200 font-normal max-w-3xl mx-auto leading-relaxed drop-shadow-md">
          Earn an authentic undergraduate degree from the <strong className="text-white font-bold">Indian Institute of Technology Kharagpur</strong>. 
          Enjoy flexible online learning with in-person proctored exams, on-campus lab immersion, modular exit awards (<span className="text-amber-300 font-semibold">Certificate, Diploma, B.Sc., BS</span>), and lifelong <strong className="text-white font-semibold">IIT KGP Alumni Status</strong>.
        </p>

        {/* Primary Call to Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          
          {/* Main Qualifier Exam Button */}
          <button
            onClick={onOpenQualifier}
            className="group px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-xl hover:shadow-2xl flex items-center justify-center gap-2.5 transition transform hover:-translate-y-0.5 border border-emerald-400/50 ring-4 ring-emerald-500/20"
          >
            <div className="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            </div>
            <div className="text-left">
              <div className="text-[10px] text-emerald-100 font-semibold uppercase tracking-wider leading-none">
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
            className="group px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-kgp-crimson to-red-800 hover:from-kgp-darkred hover:to-kgp-crimson text-white font-bold text-sm sm:text-base rounded-2xl shadow-xl hover:shadow-2xl flex items-center justify-center gap-2.5 transition transform hover:-translate-y-0.5 border border-red-500/50 ring-4 ring-red-500/20"
          >
            <div className="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center">
              <Award className="w-4 h-4 text-amber-300" />
            </div>
            <div className="text-left">
              <div className="text-[10px] text-red-100 font-semibold uppercase tracking-wider leading-none">
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
            className="px-5 py-3.5 sm:py-4 bg-slate-900/80 hover:bg-slate-900 text-slate-100 hover:text-amber-300 font-semibold text-xs sm:text-sm rounded-2xl border border-slate-700/80 backdrop-blur-md flex items-center justify-center gap-2 transition shadow-lg"
          >
            <span>Fees &amp; Waivers (Up to 75% Off)</span>
            <ChevronRight className="w-4 h-4 text-amber-400" />
          </a>

        </div>

        {/* 4. SLIDESHOW CAPTION & LANDMARK SELECTOR CONTROLLER */}
        <div className="mt-10 pt-5 border-t border-white/20 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Current Landmark Caption */}
          <div className="flex items-center gap-2.5 text-left">
            <span className="w-3 h-3 rounded-full bg-amber-400 animate-pulse flex-shrink-0" />
            <div>
              <div className="text-amber-300 font-bold uppercase tracking-wider text-[11px] flex items-center gap-2">
                <span>Campus Landmark ({currentSlide + 1}/{slides.length}):</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-400/20 border border-amber-400/40 text-amber-200">
                  {slides[currentSlide].badge}
                </span>
              </div>
              <div className="text-white font-bold text-xs sm:text-sm">
                {slides[currentSlide].title}
              </div>
            </div>
          </div>

          {/* Interactive Slide Switcher Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prevSlide}
              className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white transition border border-white/20 hover:border-amber-400"
              aria-label="Previous Campus Photo"
              title="Previous Photo"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    currentSlide === idx
                      ? 'bg-amber-400 text-slate-950 shadow-md font-black ring-2 ring-white/50 scale-105'
                      : 'bg-slate-900/70 text-slate-200 hover:text-white hover:bg-slate-900 border border-white/15'
                  }`}
                  title={s.title}
                >
                  <span>{idx + 1}.</span>
                  <span className="hidden md:inline">{s.shortTitle}</span>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={nextSlide}
              className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white transition border border-white/20 hover:border-amber-400"
              aria-label="Next Campus Photo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
