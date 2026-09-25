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
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const campusPhotos = [
    {
      id: 'main-building',
      title: 'Historic Main Building',
      subtitle: 'The Birthplace of the IIT System (Estd. 1951)',
      tag: 'Heritage Landmark',
      src: imgMainBuilding,
      desc: 'The celebrated heritage monument where India\'s very first Indian Institute of Technology was inaugurated by Pandit Jawaharlal Nehru.',
      highlight: '2,100-Acre Campus Core'
    },
    {
      id: 'tower-facade',
      title: 'Iconic Clock Tower Facade',
      subtitle: 'The Architectural Emblem of IIT Kharagpur',
      tag: 'Historic Architecture',
      src: imgTowerFacade,
      desc: 'Recognized worldwide as the quintessential symbol of academic preeminence, scientific discovery, and engineering leadership.',
      highlight: '75+ Years of Excellence'
    },
    {
      id: 'central-library',
      title: 'Central Library Archives',
      subtitle: 'Asia\'s Premier Technical & Digital Library',
      tag: 'Academic Powerhouse',
      src: imgCentralLibrary,
      desc: 'Over 400,000+ volumes, IEEE/ACM international subscriptions, and research databases accessible remotely to all enrolled BS students.',
      highlight: '400K+ Research Volumes'
    },
    {
      id: 'puri-gate',
      title: 'Puri Gate (Main Campus Entrance)',
      subtitle: 'Gateway to Kharagpur\'s Sprawling Green Campus',
      tag: 'Campus Gateway',
      src: imgPuriGate,
      desc: 'The grand ceremonial entrance welcoming scholars, international faculty, and industry pioneers to India\'s largest IIT campus.',
      highlight: 'Sprawling Green Campus'
    }
  ];

  // Auto-advance campus photos every 5 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % campusPhotos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, campusPhotos.length]);

  const activePhoto = campusPhotos[currentPhotoIndex];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-stone-100 via-white to-stone-50 text-slate-900 pt-6 pb-16 lg:pt-8 lg:pb-20 border-b border-stone-200">
      
      {/* Background Architectural Blueprint Grid & Atmospheric Glow */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="kgp-hero-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#991b1b" strokeWidth="0.5" strokeOpacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#kgp-hero-grid)" />
        </svg>
      </div>

      {/* Atmospheric Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-red-800/5 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/10 w-[500px] h-[300px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Heritage Ribbon & Announcements */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-stone-200/80">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-red-100 text-kgp-crimson border border-red-200">
              <span className="w-2 h-2 rounded-full bg-kgp-crimson animate-ping" />
              <span>Estd. 1951 • Mother of all IITs</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200">
              <Award className="w-3.5 h-3.5 text-amber-600" />
              <span>NIRF Ranked Institute of National Importance</span>
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Admissions 2026–2027 Portal Active</span>
          </div>
        </div>

        {/* MAIN SPLIT HERO GRID: Left Content & Right IIT KGP Campus Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* LEFT COLUMN: Academic Proposition & Action CTAs (Col 7) */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Institute Identity Banner */}
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white p-1.5 shadow-md border-2 border-amber-500/50 flex items-center justify-center flex-shrink-0">
                <img 
                  src={iitKgpLogo} 
                  alt="Indian Institute of Technology Kharagpur" 
                  className="w-11 h-11 sm:w-13 sm:h-13 object-contain"
                />
              </div>
              <div>
                <div className="text-base sm:text-lg font-bold font-serif-title text-slate-950 leading-tight">
                  Indian Institute of Technology Kharagpur
                </div>
                <div className="text-xs sm:text-sm text-amber-800 font-semibold leading-tight mt-0.5 font-serif">
                  भारतीय प्रौद्योगिकी संस्थान खड़गपुर
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  Kharagpur, West Bengal • 2,100-Acre Campus
                </div>
              </div>
            </div>

            {/* Program Eyebrow */}
            <div className="inline-block">
              <span className="px-3 py-1 rounded-md bg-stone-900 text-amber-400 font-black text-xs uppercase tracking-widest shadow-xs">
                Official 4-Year Undergraduate Degree Programme
              </span>
            </div>

            {/* Master Degree Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-black tracking-tight font-serif-title leading-[1.12] text-slate-950">
              Bachelor of Science <span className="text-kgp-crimson">(BS)</span> in <br className="hidden sm:inline" />
              <span className="text-kgp-crimson underline decoration-amber-500/70 decoration-4 underline-offset-8">
                Data Science &amp; Artificial Intelligence
              </span>
            </h1>

            {/* Value Proposition Description */}
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-2xl font-normal">
              Earn an authentic undergraduate degree from the <strong className="text-slate-950 font-bold">Indian Institute of Technology Kharagpur</strong>. 
              Featuring world-class coursework, in-person proctored exams, on-campus lab immersion, NEP 2020 modular exit awards (<span className="text-kgp-crimson font-semibold">Certificate, Diploma, B.Sc., BS</span>), and permanent <strong className="text-slate-950 font-bold">IIT KGP Alumni Status</strong>.
            </p>

            {/* Primary Action Buttons: Pathway 1 vs Pathway 2 */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              
              {/* Pathway 1: Qualifier Round Exam */}
              <button
                onClick={onOpenQualifier}
                className="group flex-1 px-5 py-3.5 bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 hover:from-emerald-800 hover:to-teal-800 text-white font-extrabold text-sm rounded-xl shadow-md hover:shadow-lg flex items-center justify-between gap-3 transition transform hover:-translate-y-0.5 border border-emerald-600/50"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] text-emerald-200 font-semibold uppercase tracking-wider leading-none">
                      Admission Pathway 1
                    </div>
                    <div className="font-extrabold text-sm leading-tight text-white">
                      Qualifier Exam Portal
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-200 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Pathway 2: Direct Admission (WBJEE / JEE) */}
              <button
                onClick={onOpenSignUp}
                className="group flex-1 px-5 py-3.5 bg-gradient-to-r from-kgp-crimson to-red-800 hover:from-kgp-darkred hover:to-kgp-crimson text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg flex items-center justify-between gap-3 transition transform hover:-translate-y-0.5 border border-red-700/40"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Award className="w-4 h-4 text-amber-300" />
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] text-red-200 font-semibold uppercase tracking-wider leading-none">
                      Admission Pathway 2
                    </div>
                    <div className="font-extrabold text-sm leading-tight text-white">
                      Direct Entry (WBJEE/JEE)
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-red-200 group-hover:translate-x-1 transition-transform" />
              </button>

            </div>

            {/* Quick Informational Links */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
              <a
                href="#fees"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-stone-300 text-slate-800 hover:text-kgp-crimson hover:border-kgp-crimson font-semibold transition shadow-2xs"
              >
                <span>Fee Structure &amp; Waivers (Up to 75% Off)</span>
                <ChevronRight className="w-3.5 h-3.5 text-amber-600" />
              </a>

              <button
                type="button"
                onClick={onOpenCertificate}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-slate-800 font-semibold transition border border-stone-200"
              >
                <Eye className="w-3.5 h-3.5 text-blue-600" />
                <span>View Sample Degree Certificate</span>
              </button>
            </div>

            {/* Academic Highlights Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-stone-200">
              <div className="p-2.5 rounded-xl bg-white border border-stone-200 shadow-2xs">
                <div className="text-base font-black text-kgp-crimson">4-Year BS</div>
                <div className="text-[10px] text-slate-600 leading-tight font-medium">NEP 2020 Multi-Exit</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-stone-200 shadow-2xs">
                <div className="text-base font-black text-emerald-700">In-Person</div>
                <div className="text-[10px] text-slate-600 leading-tight font-medium">Campus Immersion</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-stone-200 shadow-2xs">
                <div className="text-base font-black text-amber-700">Permanent</div>
                <div className="text-[10px] text-slate-600 leading-tight font-medium">IIT KGP Alumni Status</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-stone-200 shadow-2xs">
                <div className="text-base font-black text-blue-700">Direct Entry</div>
                <div className="text-[10px] text-slate-600 leading-tight font-medium">WBJEE &amp; JEE Adv.</div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: IIT KGP Iconic Campus Photography Showcase (Col 5) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-3 sm:p-4 border-2 border-stone-300/80 shadow-xl relative">
              
              {/* Main Featured Photo Box */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-900 shadow-inner group">
                <img 
                  src={activePhoto.src} 
                  alt={activePhoto.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Gradient vignette for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-black/30 pointer-events-none" />

                {/* Top Floating Badge */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-300 font-bold text-xs border border-amber-400/40 shadow-md">
                    <Building2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>IIT Kharagpur Campus</span>
                  </span>

                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-kgp-crimson/90 backdrop-blur-md text-white font-bold text-[11px] shadow-md">
                    <span>{activePhoto.highlight}</span>
                  </span>
                </div>

                {/* Bottom Overlay Info Banner */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <div className="text-[10px] font-bold text-amber-300 uppercase tracking-wider mb-0.5">
                    {activePhoto.tag}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold font-serif-title leading-snug">
                    {activePhoto.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 mt-1 leading-relaxed">
                    {activePhoto.desc}
                  </p>
                </div>

                {/* Left / Right Quick Carousel Navigation Arrows */}
                <button
                  type="button"
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentPhotoIndex((prev) => (prev - 1 + campusPhotos.length) % campusPhotos.length);
                  }}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition backdrop-blur-xs opacity-70 hover:opacity-100"
                  aria-label="Previous Photo"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentPhotoIndex((prev) => (prev + 1) % campusPhotos.length);
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition backdrop-blur-xs opacity-70 hover:opacity-100"
                  aria-label="Next Photo"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Photo Selector Thumbnail Strip */}
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs text-slate-600 mb-2 px-1">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-kgp-crimson" />
                    <span>Explore Campus Landmarks ({currentPhotoIndex + 1}/{campusPhotos.length})</span>
                  </span>
                  <span className="text-[11px] text-amber-700 font-semibold">
                    Click to view photo
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {campusPhotos.map((photo, idx) => (
                    <button
                      key={photo.id}
                      type="button"
                      onClick={() => {
                        setCurrentPhotoIndex(idx);
                        setIsAutoPlaying(false);
                      }}
                      className={`relative rounded-xl overflow-hidden aspect-[4/3] border-2 transition-all group ${
                        currentPhotoIndex === idx 
                          ? 'border-kgp-crimson ring-2 ring-red-400/30 scale-[1.02] shadow-sm' 
                          : 'border-stone-200 opacity-70 hover:opacity-100 hover:border-stone-400'
                      }`}
                      title={photo.title}
                    >
                      <img 
                        src={photo.src} 
                        alt={photo.title}
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-transparent transition" />
                      {currentPhotoIndex === idx && (
                        <div className="absolute bottom-0 inset-x-0 bg-kgp-crimson text-white text-[8px] font-black text-center py-0.5 tracking-tighter truncate px-0.5">
                          ACTIVE
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Campus Immersion Notice Callout */}
              <div className="mt-3 p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-slate-700 flex items-center gap-2.5">
                <GraduationCap className="w-4 h-4 text-kgp-crimson flex-shrink-0" />
                <span className="text-[11px] leading-tight">
                  Enrolled BS students attend annual <strong>in-person campus immersion</strong>, laboratory workshops, and formal convocation on this historic campus.
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* CAMPUS PHOTO STRIP & LANDMARKS ROW (MAIN AREA PHOTO FEATURE) */}
        <div className="mt-12 pt-8 border-t border-stone-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <div className="text-xs font-bold text-kgp-crimson uppercase tracking-wider flex items-center gap-1.5">
                <Building2 className="w-4 h-4" />
                <span>The Kharagpur Heritage</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif-title text-slate-950 mt-0.5">
                Life &amp; Learning at India's First IIT Campus
              </h2>
            </div>
            <div className="text-xs text-slate-600 sm:text-right max-w-sm">
              Sprawling over 2,100 acres with Asia's largest technical library and advanced AI research laboratories.
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {campusPhotos.map((photo, idx) => (
              <div 
                key={photo.id}
                onClick={() => {
                  setCurrentPhotoIndex(idx);
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
                className="group cursor-pointer rounded-2xl bg-white border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition transform hover:-translate-y-1"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img 
                    src={photo.src} 
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-slate-950/70 backdrop-blur-xs text-[10px] font-bold text-amber-300">
                    {photo.tag}
                  </div>
                </div>
                <div className="p-3.5 space-y-1">
                  <div className="text-xs font-bold font-serif-title text-slate-900 group-hover:text-kgp-crimson transition flex items-center justify-between">
                    <span>{photo.title}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <div className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {photo.subtitle}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
