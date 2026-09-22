import React from 'react';
import { 
  Building, BookOpen, Users, Award, Briefcase, GraduationCap, 
  MapPin, CheckCircle2, TrendingUp, Sparkles 
} from 'lucide-react';
import { RECRUITERS, IIT_KGP_INFO } from '../data/portalData';

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
          <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-kgp-crimson/10 text-kgp-crimson flex items-center justify-center mb-5">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-serif-title mb-2">
              Campus Immersion Experience
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Step onto the historic Kharagpur campus for an annual student-led techno-cultural festival, hackathons, sports meets, and a 1-month intensive summer/winter lab immersion.
            </p>
            <ul className="text-xs text-slate-700 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Interact with on-campus faculty & researchers</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Hostel stay & dining hall experience</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Hands-on lab workshops at CoEAI</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Central Library Access */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center mb-5">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-serif-title mb-2">
              Central Library Digital Access
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              All enrolled students gain verified remote institutional credentials to IIT Kharagpur's renowned Central Library, one of the largest academic repositories in Asia.
            </p>
            <ul className="text-xs text-slate-700 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Access to IEEE Xplore, ACM, Springer & ScienceDirect</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>400,000+ textbooks, journals & research dissertations</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Institutional OpenVPN for campus-licensed software</span>
              </li>
            </ul>
          </div>

          {/* Card 3: Alumni Status */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-5">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-serif-title mb-2">
              Official Alumni Status (Degree Level)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Graduating with the B.Sc. or BS Degree inducts you into the prestigious <strong>IIT Kharagpur Global Alumni Association</strong> with permanent alumni privileges.
            </p>
            <ul className="text-xs text-slate-700 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Official IIT KGP Alumni Card & Email ID</span>
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

        {/* Placements & Recruiter Showcase */}
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-kgp-navy to-slate-900 text-white p-8 sm:p-10 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Briefcase className="w-4 h-4" />
                <span>Dedicated Career Placement Cell</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif-title text-white">
                Internships & Top Industry Recruiters
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl font-light">
                Our active industry placement cell connects BS learners with top tech firms, fintech corporations, research organizations, and AI startups for internships and full-time hiring.
              </p>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-serif-title">480+</div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider">Hiring Partners</div>
              </div>
              <div className="w-px h-10 bg-slate-700" />
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-serif-title">₹18.5 LPA</div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider">Average Package</div>
              </div>
            </div>
          </div>

          {/* Recruiter Logos / Tags */}
          <div className="pt-8">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 text-center">
              Companies Hiring Our BS Programme Learners & Alumni
            </h4>
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
              {RECRUITERS.map((company, idx) => (
                <div 
                  key={idx}
                  className="px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-200 tracking-wide transition shadow-sm"
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
