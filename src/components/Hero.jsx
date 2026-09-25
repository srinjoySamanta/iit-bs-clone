import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, ShieldCheck, CheckCircle2, Award, Calendar, 
  Sparkles, Download, Users, BookOpen, ChevronRight, ChevronLeft,
  MapPin, Eye, GraduationCap, Clock
} from 'lucide-react';
import { IIT_KGP_INFO } from '../data/portalData';
import iitKgpLogo from '../assets/logo';

import imgMainBuilding from '../assets/images/iit-kgp-main-building.jpg';
import imgTowerFacade from '../assets/images/iit-kgp-tower-facade.jpg';
import imgCentralLibrary from '../assets/images/iit-kgp-central-library.jpg';
import imgPuriGate from '../assets/images/iit-kgp-puri-gate.jpg';
import imgLakeside from '../assets/images/iit-kgp-lakeside-gymkhana.jpg';
import imgAvenue from '../assets/images/iit-kgp-campus-avenue.jpg';

export default function Hero({ onOpenSignUp, onOpenDiagram, onOpenCertificate, onOpenQualifier }) {
  // Option 1 is the Historic Main Building as requested
  const slides = [
    {
      id: 'main-building',
      title: 'Historic Main Building (Hijli Detention Camp)',
      shortTitle: 'Historic Main Building',
      caption: 'Birthplace of the IIT System • Established 1951',
      badge: 'Heritage Monument',
      src: imgMainBuilding,
      alt: 'IIT Kharagpur Historic Main Building'
    },
    {
      id: 'tower-facade',
      title: 'Iconic Clock Tower Facade',
      shortTitle: 'Clock Tower Facade',
      caption: 'The celebrated architectural symbol of IIT Kharagpur',
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
    },
    {
      id: 'lakeside',
      title: 'Technology Students\' Gymkhana & Lake',
      shortTitle: 'Gymkhana Lake',
      caption: 'Lakeside athletic and cultural hub of student life',
      badge: 'Student Hub',
      src: imgLakeside,
      alt: 'IIT Kharagpur Gymkhana & Lake'
    },
    {
      id: 'avenue',
      title: 'Ardeshir Dalal Avenue & Green Canopy',
      shortTitle: 'Green Campus',
      caption: 'Lush tree-lined boulevard spanning the 2,100-acre smart campus',
      badge: 'Green Campus',
      src: imgAvenue,
      alt: 'IIT Kharagpur Ardeshir Dalal Avenue'
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
    <section className="bg-gradient-to-b from-stone-50 via-white to-stone-50 text-slate-900 border-b-4 border-kgp-crimson">
      
      {/* 1. TOP AREA: UNBLURRED, HIGH-DEFINITION CAMPUS IMAGE SLIDER BANNER */}
      <div 
        className="relative w-full aspect-[16/7] sm:aspect-[21/8] md:aspect-[24/8] min-h-[260px] sm:min-h-[350px] md:min-h-[440px] max-h-[560px] overflow-hidden bg-slate-950 group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Slides Container - 100% Unblurred, Sharp, Natural Color */}
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img 
              src={slide.src} 
              alt={slide.alt}
              className="w-full h-full object-cover object-center brightness-100 saturate-105" 
            />
          </div>
        ))}

        {/* Previous / Next Arrow Navigation Controls */}
        <button
          type="button"
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition shadow-lg opacity-80 hover:opacity-100"
          aria-label="Previous Photo"
          title="Previous Photo"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition shadow-lg opacity-80 hover:opacity-100"
          aria-label="Next Photo"
          title="Next Photo"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Selector Indicators (Clean Numbers 1 to 6 - No Text Names Over Image) */}
        <div className="absolute bottom-4 right-4 sm:right-8 z-30 flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-xs px-3 py-1.5 rounded-2xl border border-white/20 shadow-lg">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              className={`w-7 h-7 rounded-xl text-xs font-bold transition flex items-center justify-center ${
                currentSlide === idx
                  ? 'bg-amber-400 text-slate-950 font-black shadow-md scale-105'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
              aria-label={`Slide ${idx + 1}`}
              title={`Slide ${idx + 1}`}
            >
              <span>{idx + 1}</span>
            </button>
          ))}
        </div>

      </div>

      {/* 2. BOTTOM AREA: WORDS, TITLES, CREDENTIALS & ADMISSIONS ACTION BUTTONS */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-center">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-red-50 text-kgp-crimson border border-red-200 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-kgp-crimson animate-ping" />
            <span>First IIT of India • Estd. 1951</span>
          </span>

          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Direct Entry: WBJEE, JEE Advanced &amp; Tripura JEE</span>
          </span>

          <span className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-900 border border-blue-200 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Universal Qualifier (No Age Limit)</span>
          </span>
        </div>

        {/* IIT Kharagpur Official Crest & Names */}
        <div className="flex items-center justify-center gap-3.5 mb-3">
          <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-white p-1 shadow-md border-2 border-amber-400 flex items-center justify-center flex-shrink-0">
            <img 
              src={iitKgpLogo} 
              alt="Indian Institute of Technology Kharagpur" 
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
            />
          </div>
          <div className="text-left">
            <div className="text-base sm:text-xl font-bold font-serif-title text-slate-950 leading-tight">
              Indian Institute of Technology Kharagpur
            </div>
            <div className="text-xs sm:text-sm text-amber-800 font-semibold leading-tight mt-0.5 font-serif">
              भारतीय प्रौद्योगिकी संस्थान खड़गपुर
            </div>
          </div>
        </div>

        {/* Program Eyebrow */}
        <div className="mb-2">
          <span className="px-3.5 py-1 rounded-md bg-stone-100 text-amber-900 border border-amber-300 font-bold text-xs uppercase tracking-widest shadow-2xs">
            4-Year Undergraduate Degree Programme
          </span>
        </div>

        {/* Master Heading — NO UNDERLINE as requested */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight font-serif-title leading-[1.15] text-slate-950">
          Bachelor of Science <span className="text-kgp-crimson">(BS)</span> in <br />
          <span className="text-kgp-crimson">
            Data Science &amp; Artificial Intelligence
          </span>
        </h1>

        {/* Program Narrative Description */}
        <p className="mt-4 text-sm sm:text-base md:text-lg text-slate-700 font-normal max-w-3xl mx-auto leading-relaxed">
          Earn an authentic undergraduate degree from the <strong className="text-slate-950 font-bold">Indian Institute of Technology Kharagpur</strong>. 
          Enjoy flexible online learning with in-person proctored exams, campus immersion, modular exit awards (<span className="text-kgp-crimson font-semibold">Certificate, Diploma, B.Sc., BS</span>), and lifelong <strong className="text-slate-950 font-bold">IIT Kharagpur Alumni Status</strong>.
        </p>

        {/* Primary Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          
          {/* Pathway 1: Qualifier Round Exam */}
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

          {/* Pathway 2: Direct Admission (WBJEE / JEE) */}
          <button
            onClick={onOpenSignUp}
            className="group px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-kgp-crimson to-red-800 hover:from-kgp-darkred hover:to-kgp-crimson text-white font-bold text-sm sm:text-base rounded-2xl shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 transition transform hover:-translate-y-0.5 border border-red-700/30 ring-2 ring-red-500/20"
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

    </section>
  );
}
