import React from 'react';
import { 
  Building, BookOpen, Users, Award, Briefcase, GraduationCap, 
  MapPin, CheckCircle2, TrendingUp, Sparkles 
} from 'lucide-react';
import { RECRUITERS, IIT_KGP_INFO } from '../data/portalData';

import imgMainBuilding from '../assets/images/iit-kgp-main-building.jpg';
import imgCentralLibrary from '../assets/images/iit-kgp-central-library.jpg';
import imgPuriGate from '../assets/images/iit-kgp-puri-gate.jpg';

export default function CampusLifePlacement() {
  return (
    <section id="campus" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-kgp-crimson bg-red-50 px-3.5 py-1 rounded-full border border-red-200">
            Immersion & Careers
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif-title">
            Campus Immersion, Library & Placement Ecosystem
          </h2>
          <p className="mt-3 text-slate-600">
            A hybrid education that connects you directly to the 2,100-acre Kharagpur campus, world-class library archives, and top global recruiters.
          </p>
        </div>

        {/* 3 Pillar Cards: Campus Immersion, Library Access, Alumni Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          
          {/* Card 1: Campus Immersion */}
          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition flex flex-col">
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
              <img 
                src={imgMainBuilding} 
                alt="IIT Kharagpur Historic Campus" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-xs text-[11px] font-bold text-amber-300 border border-amber-400/30">
                2,100-Acre Heritage Campus
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-kgp-crimson flex-shrink-0" />
                <h3 className="text-lg font-bold text-slate-900 font-serif-title">
                  Campus Immersion Experience
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Step onto the historic Kharagpur campus for an annual student-led techno-cultural festival, hackathons, sports meets, and a 1-month intensive summer/winter lab immersion.
              </p>
              <ul className="text-xs text-slate-700 space-y-2 mt-auto">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Interact with on-campus faculty &amp; researchers</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Hostel stay &amp; dining hall experience</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Hands-on lab workshops at CoEAI</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card 2: Central Library Access */}
          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition flex flex-col">
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
              <img 
                src={imgCentralLibrary} 
                alt="IIT Kharagpur Central Library" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-xs text-[11px] font-bold text-amber-300 border border-amber-400/30">
                Asia's Premier Tech Library
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <h3 className="text-lg font-bold text-slate-900 font-serif-title">
                  Central Library Digital Access
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                All enrolled students gain verified remote institutional credentials to IIT Kharagpur's renowned Central Library, one of the largest academic repositories in Asia.
              </p>
              <ul className="text-xs text-slate-700 space-y-2 mt-auto">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Access to IEEE Xplore, ACM, Springer &amp; ScienceDirect</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>400,000+ textbooks, journals &amp; research dissertations</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Institutional OpenVPN for campus-licensed software</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card 3: Alumni Status */}
          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition flex flex-col">
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
              <img 
                src={imgPuriGate} 
                alt="IIT Kharagpur Puri Gate" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-xs text-[11px] font-bold text-amber-300 border border-amber-400/30">
                Puri Gate &amp; Convocation
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <h3 className="text-lg font-bold text-slate-900 font-serif-title">
                  Official Alumni Status (Degree Level)
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Graduating with the B.Sc. or BS Degree inducts you into the prestigious <strong>IIT Kharagpur Global Alumni Association</strong> with permanent alumni privileges.
              </p>
              <ul className="text-xs text-slate-700 space-y-2 mt-auto">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Official IIT KGP Alumni Card &amp; Email ID</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Worldwide chapters (Silicon Valley, London, Singapore)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Formal In-Person Convocation Ceremony on campus</span>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Placements & Recruiter Showcase */}
        <div className="rounded-2xl bg-stone-50/90 border-2 border-stone-200/90 text-slate-900 p-8 sm:p-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-kgp-crimson via-amber-500 to-kgp-crimson" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-stone-200">
            <div>
              <div className="flex items-center gap-2 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
                <Briefcase className="w-4 h-4 text-amber-600" />
                <span>Dedicated Career Placement Cell</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif-title text-slate-950">
                Internships &amp; Top Industry Recruiters
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl font-normal">
                Our active industry placement cell connects BS learners with top tech firms, fintech corporations, research organizations, and AI startups for internships and full-time hiring.
              </p>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-6 bg-stone-50 border border-stone-200/80 rounded-2xl px-5 py-3">
              <div className="text-center sm:text-left">
                <div className="text-sm sm:text-base font-bold text-kgp-crimson font-serif-title">Inaugural Cohort</div>
                <div className="text-[11px] text-slate-600 uppercase tracking-wider font-medium">Batch 2026–2027</div>
              </div>
              <div className="hidden sm:block w-px h-8 bg-stone-300" />
              <div className="text-center sm:text-left">
                <div className="text-sm sm:text-base font-bold text-emerald-800 font-serif-title">Career Cell Support</div>
                <div className="text-[11px] text-slate-600 uppercase tracking-wider font-medium">Internships &amp; Mentorship</div>
              </div>
            </div>
          </div>

          {/* Recruiter Logos / Tags */}
          <div className="pt-8">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-4 text-center">
              Target Industry Sectors &amp; Placement Ecosystem
            </h4>
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
              {RECRUITERS.map((company, idx) => (
                <div 
                  key={idx}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-amber-50/40 border border-stone-300 text-xs font-bold text-slate-800 hover:text-kgp-crimson hover:border-amber-400 tracking-wide transition shadow-sm"
                >
                  {company}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
