import React, { useState } from 'react';
import { 
  Play, Pause, Film, MapPin, Eye, Building2, BookOpen, 
  Award, Sparkles, ChevronRight, X, Maximize2, ExternalLink,
  Users, CheckCircle2, Compass
} from 'lucide-react';

import imgMainBuilding from '../assets/images/iit-kgp-main-building.jpg';
import imgTowerFacade from '../assets/images/iit-kgp-tower-facade.jpg';
import imgCentralLibrary from '../assets/images/iit-kgp-central-library.jpg';
import imgPuriGate from '../assets/images/iit-kgp-puri-gate.jpg';
import imgLakeside from '../assets/images/iit-kgp-lakeside-gymkhana.jpg';
import imgAvenue from '../assets/images/iit-kgp-campus-avenue.jpg';
import imgLabs from '../assets/images/iit-kgp-research-labs.jpg';

export default function CampusTourVideo() {
  // Video Tours
  const videoTours = [
    {
      id: 'FqqwdPBGS9k',
      title: 'IIT Kharagpur Comprehensive Campus Tour 2026',
      duration: '12 Minutes',
      category: 'Official Walkthrough',
      description: 'Comprehensive guided tour of the 2,100-acre Kharagpur campus featuring the Historic Main Building, Nalanda Complex, Central Library, research labs, hostels, and sports grounds.',
      badge: 'Most Popular Tour'
    },
    {
      id: 'Jbfr6wHEN8Y',
      title: 'First Impressions & Architectural Heritage Tour',
      duration: '9 Minutes',
      category: 'Heritage & History',
      description: 'In-depth exploration of the iconic 1951 Hijli Detention Camp monument, student activity centers, and the foundation history of India\'s first IIT.',
      badge: 'Heritage Focus'
    },
    {
      id: 'v0pbT0gjVkw',
      title: 'Campus Life & Aerial Perspectives',
      duration: '8 Minutes',
      category: 'Aerial & Student Life',
      description: 'Stunning 4K drone perspectives of the lush green campus, tech gymkhana lakes, student hubs, and annual festival grounds.',
      badge: 'Aerial Drone 4K'
    }
  ];

  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photoFilter, setPhotoFilter] = useState('all');

  const activeVideo = videoTours[activeVideoIndex];

  // Campus Landmarks Gallery
  const landmarks = [
    {
      id: 'main-building',
      title: 'Historic Main Building',
      category: 'heritage',
      subtitle: 'The Cradle of the IIT System • Estd. 1951',
      description: 'Originally the historic Hijli Detention Camp, inaugurated by Pandit Jawaharlal Nehru on August 18, 1951 as India\'s first IIT.',
      src: imgMainBuilding,
      badge: 'Heritage Monument'
    },
    {
      id: 'tower-facade',
      title: 'Clock Tower & Central Facade',
      category: 'heritage',
      subtitle: 'Global Emblem of Academic Preeminence',
      description: 'The celebrated red-brick clock tower known worldwide as the architectural identity of IIT Kharagpur.',
      src: imgTowerFacade,
      badge: 'Architectural Icon'
    },
    {
      id: 'central-library',
      title: 'Central Technical Library',
      category: 'academic',
      subtitle: 'Asia\'s Premier Engineering Library Archive',
      description: 'Houses over 400,000+ print volumes, 10,000+ e-journals, IEEE/ACM subscriptions, and digital study pavilions open to BS scholars.',
      src: imgCentralLibrary,
      badge: 'Academic Archive'
    },
    {
      id: 'puri-gate',
      title: 'Puri Gate (Main Entrance)',
      category: 'campus',
      subtitle: 'Gateway to the 2,100-Acre Smart Campus',
      description: 'The ceremonial main entrance gate welcoming scholars, international delegates, and students from across the globe.',
      src: imgPuriGate,
      badge: 'Grand Entrance'
    },
    {
      id: 'lakeside',
      title: 'Gymkhana & Campus Lake',
      category: 'student',
      subtitle: 'Technology Students\' Gymkhana Grounds',
      description: 'The heart of campus athletics, cultural activities, aquatic sports, and evening community gatherings beside the scenic lake.',
      src: imgLakeside,
      badge: 'Student Life Hub'
    },
    {
      id: 'avenue',
      title: 'Ardeshir Dalal Avenue',
      category: 'campus',
      subtitle: 'Lush 2,100-Acre Tree-Canopied Boulevard',
      description: 'Miles of tranquil tree-lined roadways connecting academic departments, student residences, and open-air auditoriums.',
      src: imgAvenue,
      badge: 'Green Campus'
    },
    {
      id: 'labs',
      title: 'Advanced Research Laboratories',
      category: 'academic',
      subtitle: 'Centres of Excellence in AI & Engineering',
      description: 'State-of-the-art supercomputing clusters, robotics workshops, and experimental laboratories where BS students do annual immersion.',
      src: imgLabs,
      badge: 'Research Labs'
    }
  ];

  const filteredLandmarks = photoFilter === 'all' 
    ? landmarks 
    : landmarks.filter(item => item.category === photoFilter);

  return (
    <section id="campus-tour" className="py-16 sm:py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-red-100 text-kgp-crimson border border-red-200 mb-3 shadow-2xs">
            <Film className="w-3.5 h-3.5 text-kgp-crimson" />
            <span>Virtual Campus Immersion &amp; Tour</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 font-serif-title tracking-tight leading-tight">
            Tour India's Largest &amp; Oldest IIT Campus
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
            Spanning over <strong>2,100 acres</strong> in Kharagpur, West Bengal. Enrolled BS in Data Science &amp; AI students step onto this historic campus for annual in-person laboratory immersions, student fests, and formal convocation.
          </p>
        </div>

        {/* 1. CAMPUS VIDEO TOUR THEATER */}
        <div className="bg-white rounded-3xl border-2 border-stone-200/90 shadow-xl overflow-hidden mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-stone-200">
            
            {/* Left 8 Cols: Responsive Embedded HD Video Player */}
            <div className="lg:col-span-8 p-4 sm:p-6 bg-slate-950">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-inner border border-slate-800">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.id}?rel=0&modestbranding=1`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Video Title & Meta Bar */}
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-white">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span>{activeVideo.category} • {activeVideo.duration}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold font-serif-title mt-0.5">
                    {activeVideo.title}
                  </h3>
                </div>

                <a 
                  href={`https://www.youtube.com/watch?v=${activeVideo.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition border border-slate-700"
                >
                  <span>Watch on YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Right 4 Cols: Tour Switcher & Highlights */}
            <div className="lg:col-span-4 p-5 sm:p-6 bg-stone-50/50 flex flex-col justify-between">
              <div>
                <div className="text-xs font-black uppercase tracking-wider text-slate-600 mb-3 flex items-center gap-2">
                  <Film className="w-4 h-4 text-kgp-crimson" />
                  <span>Select Campus Tour Episode:</span>
                </div>

                <div className="space-y-2.5">
                  {videoTours.map((tour, idx) => (
                    <button
                      key={tour.id}
                      type="button"
                      onClick={() => setActiveVideoIndex(idx)}
                      className={`w-full text-left p-3.5 rounded-2xl transition border flex items-start gap-3 ${
                        activeVideoIndex === idx
                          ? 'bg-white border-kgp-crimson shadow-md ring-2 ring-red-400/20'
                          : 'bg-white/70 hover:bg-white border-stone-200 text-slate-700'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        activeVideoIndex === idx ? 'bg-kgp-crimson text-white' : 'bg-stone-200 text-slate-600'
                      }`}>
                        <Play className="w-4 h-4 ml-0.5 fill-current" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between text-[10px] font-bold">
                          <span className={activeVideoIndex === idx ? 'text-kgp-crimson font-black' : 'text-slate-500'}>
                            {tour.badge}
                          </span>
                          <span className="text-slate-400">{tour.duration}</span>
                        </div>
                        <div className="text-xs font-bold text-slate-900 leading-snug mt-0.5">
                          {tour.title}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Tour Key Landmarks Checklist */}
                <div className="mt-6 pt-5 border-t border-stone-200 text-xs text-slate-700">
                  <div className="font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-amber-700" />
                    <span>Included in Virtual Tour:</span>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-1.5 text-[11px] text-slate-600">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                      <span>Historic Hijli Main Building (1951)</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                      <span>Nalanda Complex &amp; AI Computing Labs</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                      <span>Central Technical Library Archives</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                      <span>Technology Students' Gymkhana Lake</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom In-Person Immersion Badge */}
              <div className="mt-6 p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-center gap-2.5">
                <Building2 className="w-5 h-5 text-amber-700 flex-shrink-0" />
                <div className="text-[11px] leading-tight">
                  <strong>In-Person Immersion:</strong> BS scholars experience hands-on lab modules and stay inside the campus hostels annually.
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* 2. CAMPUS LANDMARKS PHOTO GALLERY (7 GENUINE PHOTOS) */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-kgp-crimson flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>Architectural Heritage &amp; Infrastructure</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-serif-title text-slate-950 mt-1">
                Explore the Campus Landmarks
              </h3>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 bg-stone-200/80 p-1 rounded-xl text-xs font-bold overflow-x-auto">
              <button
                type="button"
                onClick={() => setPhotoFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  photoFilter === 'all' ? 'bg-white text-kgp-crimson shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All ({landmarks.length})
              </button>
              <button
                type="button"
                onClick={() => setPhotoFilter('heritage')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  photoFilter === 'heritage' ? 'bg-white text-kgp-crimson shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Heritage
              </button>
              <button
                type="button"
                onClick={() => setPhotoFilter('academic')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  photoFilter === 'academic' ? 'bg-white text-kgp-crimson shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Academics &amp; Labs
              </button>
              <button
                type="button"
                onClick={() => setPhotoFilter('student')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  photoFilter === 'student' ? 'bg-white text-kgp-crimson shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Campus Life
              </button>
            </div>
          </div>

          {/* Photo Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredLandmarks.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedPhoto(item)}
                className="group cursor-pointer rounded-2xl bg-white border border-stone-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col"
              >
                <div className="relative aspect-[16/11] overflow-hidden bg-slate-950">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 brightness-100"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-xs text-[10px] font-bold text-amber-300 border border-amber-400/30">
                    {item.badge}
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-md">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <h4 className="text-sm font-bold font-serif-title text-slate-950 group-hover:text-kgp-crimson transition leading-snug">
                      {item.title}
                    </h4>
                    <div className="text-[11px] font-semibold text-amber-800 mt-0.5">
                      {item.subtitle}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed pt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* 3. KEY INSTITUTIONAL HIGHLIGHTS BANNER */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-red-950 text-white border-2 border-amber-400/40 shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-black font-serif-title text-amber-400">2,100</div>
              <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold mt-1">Acres Green Campus</div>
              <div className="text-[10px] text-slate-400">India's Largest IIT Campus</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black font-serif-title text-amber-400">1951</div>
              <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold mt-1">Year Established</div>
              <div className="text-[10px] text-slate-400">First IIT of India</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black font-serif-title text-amber-400">22,000+</div>
              <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold mt-1">Students &amp; Scholars</div>
              <div className="text-[10px] text-slate-400">Academic Powerhouse</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black font-serif-title text-amber-400">75,000+</div>
              <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold mt-1">Global Alumni</div>
              <div className="text-[10px] text-slate-400">Worldwide Network</div>
            </div>
          </div>
        </div>

      </div>

      {/* FULLSCREEN PHOTO LIGHTBOX MODAL */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-slate-950 rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] bg-black">
              <img 
                src={selectedPhoto.src} 
                alt={selectedPhoto.title}
                className="w-full h-full object-contain"
              />
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition border border-white/20"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 sm:p-6 text-white bg-slate-950">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                {selectedPhoto.badge}
              </div>
              <h3 className="text-xl font-bold font-serif-title mt-1">
                {selectedPhoto.title}
              </h3>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                {selectedPhoto.description}
              </p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
