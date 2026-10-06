import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, ShieldCheck, CheckCircle2, Award, Calendar, 
  Sparkles, Download, Users, BookOpen, ChevronRight, ChevronLeft,
  MapPin, Eye, GraduationCap, Clock, FileText
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
    <section id="topsection" className="w-full bg-[#EEEEEE] text-slate-900 border-b border-slate-200">
      
      {/* 1. TOP AREA: HEADLINE, SUBTITLE & ACTION PILLS (Exact match to IIT Jodhpur reference #topsection) */}
      <div className="pt-8 sm:pt-14 pb-8 sm:pb-10 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto">
        
        {/* Subtle Badge */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-kgp-crimson border border-red-200 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-kgp-crimson animate-ping" />
            <span>India's First IIT • Estd. 1951</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-white text-emerald-800 border border-emerald-200 shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Direct Entry: WBJEE, JEE Advanced &amp; Tripura JEE</span>
          </span>
        </div>

        {/* Master Heading */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-serif-title leading-[1.15] text-[#09090B]">
          IIT Kharagpur's B.S. in <br />
          <span className="text-kgp-crimson">
            Data Science &amp; Artificial Intelligence
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-sm sm:text-base md:text-lg text-slate-700 font-normal max-w-2xl mx-auto leading-relaxed">
          A future-ready online undergraduate degree combining data science, artificial intelligence, and cutting-edge engineering from the Indian Institute of Technology Kharagpur.
        </p>

        {/* Action Buttons (High-radius Pill Buttons matching Reference) */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={onOpenSignUp}
            className="px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-kgp-crimson hover:bg-kgp-darkred text-white font-bold text-sm sm:text-base tracking-wide shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 cursor-pointer uppercase font-sans"
          >
            Apply Now
          </button>

          <a
            href="#curriculum-overview"
            className="px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-black hover:bg-slate-800 text-white font-bold text-sm sm:text-base tracking-wide shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 cursor-pointer uppercase font-sans flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Syllabus</span>
          </a>

          <button
            type="button"
            onClick={onOpenQualifier}
            className="px-6 py-3.5 sm:py-4 rounded-full bg-white hover:bg-slate-50 text-slate-800 hover:text-emerald-700 font-bold text-xs sm:text-sm border border-slate-300 shadow-xs transition flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Qualifier Exam Portal</span>
          </button>
        </div>

      </div>

      {/* 2. CAMPUS IMAGE SLIDER BANNER (Full width, sharp, natural color) */}
      <div 
        className="relative w-full h-[280px] sm:h-[380px] md:h-[460px] lg:h-[520px] xl:h-[580px] overflow-hidden bg-slate-950 group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
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

        {/* Previous / Next Controls */}
        <button
          type="button"
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition shadow-lg opacity-80 hover:opacity-100 cursor-pointer"
          aria-label="Previous Photo"
          title="Previous Photo"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition shadow-lg opacity-80 hover:opacity-100 cursor-pointer"
          aria-label="Next Photo"
          title="Next Photo"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Counter Indicator */}
        <div className="absolute bottom-4 right-4 sm:right-8 z-30 flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-xs px-3 py-1.5 rounded-2xl border border-white/20 shadow-lg">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              className={`w-7 h-7 rounded-xl text-xs font-bold transition flex items-center justify-center cursor-pointer ${
                currentSlide === idx
                  ? 'bg-amber-400 text-slate-950 font-black shadow-md scale-105'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
              aria-label={`Slide ${idx + 1}`}
            >
              <span>{idx + 1}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. OVERLAPPING 5-STAT QUICK FACTS STRIP (Overlaps the bottom of the hero photo) */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-4 -mt-8 sm:-mt-12 pb-6">
        <div className="bg-white rounded-xl shadow-xl border border-slate-200/90 grid grid-cols-2 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-slate-200 text-center overflow-hidden">
          
          <div className="p-3.5 sm:p-5 hover:bg-slate-50 transition">
            <div className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">
              Entrance Test
            </div>
            <div className="text-xs sm:text-sm md:text-base font-extrabold text-slate-900 mt-1">
              Qualifier 2026 / Direct
            </div>
            <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">
              WBJEE / JEE Adv
            </div>
          </div>

          <div className="p-3.5 sm:p-5 hover:bg-slate-50 transition">
            <div className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">
              Batch Starts
            </div>
            <div className="text-xs sm:text-sm md:text-base font-extrabold text-slate-900 mt-1">
              Session 2026–27
            </div>
            <div className="text-[11px] text-amber-700 font-semibold mt-0.5">
              Admissions Open
            </div>
          </div>

          <div className="p-3.5 sm:p-5 hover:bg-slate-50 transition">
            <div className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">
              Duration
            </div>
            <div className="text-xs sm:text-sm md:text-base font-extrabold text-slate-900 mt-1">
              4 Years
            </div>
            <div className="text-[11px] text-slate-500 font-semibold mt-0.5">
              Modular Exit System
            </div>
          </div>

          <div className="p-3.5 sm:p-5 hover:bg-slate-50 transition">
            <div className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">
              Mode
            </div>
            <div className="text-xs sm:text-sm md:text-base font-extrabold text-slate-900 mt-1">
              Online Degree
            </div>
            <div className="text-[11px] text-slate-500 font-semibold mt-0.5">
              In-Person Exams
            </div>
          </div>

          <div className="p-3.5 sm:p-5 col-span-2 md:col-span-1 bg-amber-50/70 hover:bg-amber-100/60 transition">
            <div className="text-[10px] sm:text-[11px] font-bold text-amber-900 uppercase tracking-wider font-sans">
              Alumni Status*
            </div>
            <div className="text-xs sm:text-sm md:text-base font-black text-kgp-crimson mt-1">
              IIT Kharagpur
            </div>
            <div className="text-[11px] text-amber-800 font-semibold mt-0.5">
              Official Alumni Network
            </div>
          </div>

        </div>

        <p className="text-center text-[11px] md:text-xs text-slate-500 mt-2.5 italic">
          *Alumni Status is provided on completion of the full 4-year degree programme as per Institute statutes.
        </p>
      </div>

    </section>
  );
}
