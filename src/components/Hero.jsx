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
  // Option 1 is the Historic Main Building as requested
  const slides = [
    {
      id: 'main-building',
      title: 'Historic Main Building (Hijli Detention Camp)',
      shortTitle: 'Historic Main Building',
      caption: 'The Birthplace of the IIT System (Estd. 1951)',
      badge: 'Heritage Monument',
      src: imgMainBuilding,
      alt: 'IIT Kharagpur Historic Main Building'
    },
    {
      id: 'tower-facade',
      title: 'Iconic Clock Tower Facade',
      shortTitle: 'Clock Tower Facade',
      caption: 'The celebrated architectural emblem of IIT Kharagpur',
      badge: 'Architectural Emblem',
      src: imgTowerFacade,
      alt: 'IIT Kharagpur Clock Tower Facade'
    },
    {
      id: 'central-library',
      title: 'Central Library Archives',
      shortTitle: 'Central Library',
      caption: 'Asia\'s premier technical library with 400,000+ volumes',
      badge: 'Academic Powerhouse',
      src: imgCentralLibrary,
      alt: 'IIT Kharagpur Central Library'
    },
    {
      id: 'puri-gate',
      title: 'Puri Gate (Main Campus Entrance)',
      shortTitle: 'Puri Gate Entrance',
      caption: 'Grand ceremonial entrance to the 2,100-acre green campus',
      badge: 'Campus Gateway',
      src: imgPuriGate,
      alt: 'IIT Kharagpur Puri Gate Main Entrance'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide every 5.5 seconds, pauses on hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
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
      className="relative min-h-[660px] lg:min-h-[720px] flex flex-col justify-between overflow-hidden py-8 sm:py-12 border-b-4 border-kgp-crimson"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      
      {/* 1. BRIGHT, HIGH-VISIBILITY BACKGROUND SLIDESHOW (Cross-fade) */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentSlide === idx 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-102 pointer-events-none'
            }`}
            style={{ transitionProperty: 'opacity, transform', transitionDuration: '1000ms' }}
          >
            {/* The photo is rendered bright, clear, and visible */}
            <img 
              src={slide.src} 
              alt={slide.alt}
              className="w-full h-full object-cover object-center brightness-100 saturate-105" 
            />
          </div>
        ))}
      </div>

      {/* 2. LIGHT, AIRY CONTRAST OVERLAYS (NO DARK FILTERS) */}
      {/* Gentle top & bottom white gradients to blend smoothly with navbar and bottom border */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-white/70 via-white/20 to-white/75 pointer-events-none" />
      
      {/* Soft warm sunlit vignette keeping the background bright & natural */}
      <div className="absolute inset-0 z-[2] bg-radial-gradient from-transparent via-white/10 to-amber-50/30 pointer-events-none" />

      {/* 3. FOREGROUND CONTENT: LIGHT FROSTED GLASS ELEVATED CONTAINER (Z-10) */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 w-full my-auto">
        <div className="bg-white/92 backdrop-blur-md rounded-3xl border-2 border-stone-200/90 shadow-2xl p-6 sm:p-9 text-center space-y-4">
          
          {/* Top Heritage Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-red-50 text-kgp-crimson border border-red-200 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-kgp-crimson animate-ping" />
              <span>First IIT of India • Estd. 1951</span>
            </span>

            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Direct Entry: WBJEE, JEE Advanced &amp; Tripura JEE</span>
            </span>

            <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-900 border border-blue-200 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Universal Qualifier (No Age Limit)</span>
            </span>
          </div>

          {/* IIT Kharagpur Official Crest Display */}
          <div className="flex items-center justify-center gap-3.5 pt-1">
            <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-white p-1 shadow-md border-2 border-amber-400 flex items-center justify-center flex-shrink-0">
              <img 
                src={iitKgpLogo} 
                alt="IIT Kharagpur Crest" 
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
              />
            </div>
            <div className="text-left">
              <div className="text-base sm:text-lg md:text-xl font-bold font-serif-title text-slate-950 leading-tight">
                Indian Institute of Technology Kharagpur
              </div>
              <div className="text-xs sm:text-sm text-amber-800 font-semibold leading-tight mt-0.5 font-serif">
                भारतीय प्रौद्योगिकी संस्थान खड़गपुर
              </div>
            </div>
          </div>

          {/* Program Eyebrow */}
          <div className="pt-0.5">
            <span className="px-3.5 py-1 rounded-md bg-stone-100 text-amber-900 border border-amber-300 font-bold text-xs uppercase tracking-widest shadow-2xs">
              Official 4-Year Undergraduate Degree Programme
            </span>
          </div>

          {/* Master Degree Title in High-Contrast Light Scheme */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight font-serif-title leading-[1.12] text-slate-950">
            Bachelor of Science <span className="text-kgp-crimson">(BS)</span> in <br />
            <span className="text-kgp-crimson underline decoration-amber-500/70 decoration-4 underline-offset-8">
              Data Science &amp; Artificial Intelligence
            </span>
          </h1>

          {/* Program Narrative Description */}
          <p className="text-sm sm:text-base text-slate-700 font-normal max-w-3xl mx-auto leading-relaxed pt-1">
            Earn an authentic undergraduate degree from the <strong className="text-slate-950 font-bold">Indian Institute of Technology Kharagpur</strong>. 
            Enjoy flexible online learning with in-person proctored exams, on-campus laboratory immersion, modular exit awards (<span className="text-kgp-crimson font-semibold">Certificate, Diploma, B.Sc., BS</span>), and lifelong <strong className="text-slate-950 font-bold">IIT KGP Alumni Status</strong>.
          </p>

          {/* Primary Action Buttons */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            
            {/* Pathway 1: Qualifier Round Exam */}
            <button
              onClick={onOpenQualifier}
              className="group px-6 sm:px-7 py-3.5 sm:py-4 bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 hover:from-emerald-800 hover:to-teal-800 text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 transition transform hover:-translate-y-0.5 border border-emerald-600/40 ring-2 ring-emerald-500/20"
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

            {/* Pathway 2: Direct Admission (WBJEE / JEE) */}
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
              className="px-5 py-3.5 sm:py-4 bg-white hover:bg-slate-50 text-slate-800 hover:text-kgp-crimson font-semibold text-xs sm:text-sm rounded-2xl border border-stone-300 flex items-center justify-center gap-2 transition shadow-xs"
            >
              <span>Fees &amp; Waivers (Up to 75% Off)</span>
              <ChevronRight className="w-4 h-4 text-amber-600" />
            </a>

          </div>

        </div>
      </div>

      {/* 4. LIGHT FROSTED BACKGROUND SLIDESHOW CONTROLLER & LANDMARK CAPTION (Z-10) */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 w-full mt-6">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-stone-300 shadow-lg p-3 sm:p-4 flex flex-col md:flex-row items-center justify-between gap-3 text-slate-800">
          
          {/* Landmark Information Bar */}
          <div className="flex items-center gap-3 text-left w-full md:w-auto">
            <div className="w-8 h-8 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center flex-shrink-0">
              <Building2 className="w-4 h-4 text-amber-800" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-kgp-crimson uppercase tracking-wider">
                  Campus Photo ({currentSlide + 1}/4):
                </span>
                <span className="text-[10px] px-2 py-0.2 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-semibold">
                  {slides[currentSlide].badge}
                </span>
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-950 font-serif-title">
                {slides[currentSlide].title}
                <span className="text-[11px] font-normal text-slate-600 hidden lg:inline"> — {slides[currentSlide].caption}</span>
              </div>
            </div>
          </div>

          {/* Interactive Slide Switcher Buttons */}
          <div className="flex items-center gap-2 flex-shrink-0 w-full md:w-auto justify-end">
            <button
              type="button"
              onClick={prevSlide}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition border border-slate-300"
              aria-label="Previous Campus Photo"
              title="Previous Photo"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5 overflow-x-auto py-1">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition flex items-center gap-1 whitespace-nowrap ${
                    currentSlide === idx
                      ? 'bg-kgp-crimson text-white shadow-xs font-black ring-2 ring-red-300'
                      : 'bg-stone-100 text-slate-700 hover:bg-stone-200 border border-stone-200'
                  }`}
                  title={s.title}
                >
                  <span>{idx + 1}.</span>
                  <span>{s.shortTitle}</span>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={nextSlide}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition border border-slate-300"
              aria-label="Next Campus Photo"
              title="Next Photo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

    </section>
  );
}
