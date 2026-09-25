import React from 'react';
import { 
  Quote, Newspaper, Award, ExternalLink, Sparkles, CheckCircle2, 
  ArrowRight, BookOpen, GraduationCap, Building2, Globe2 
} from 'lucide-react';
import directorPic from '../assets/images/director-suman-chakraborty.jpg';
import iitKgpLogo from '../assets/logo';

export default function DirectorMessage({ onOpenQualifier, onOpenSignUp }) {
  return (
    <section id="director-message" className="py-14 sm:py-20 bg-gradient-to-b from-stone-50 via-white to-stone-50 border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Badge */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-red-100 text-kgp-crimson border border-red-300">
              <Newspaper className="w-3.5 h-3.5 text-kgp-crimson" />
              <span>The Times of India Exclusive Feature</span>
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Renaissance 2.0 Summit</span>
            </span>
          </div>

          <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            <span>Official Statement from IIT Kharagpur Directorate</span>
          </div>
        </div>

        {/* Main Content Grid: Director Profile & TOI Message */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Col 1: Current Director Profile Card (4 cols on lg) */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-7 shadow-lg border border-stone-200 text-center relative overflow-hidden">
            {/* Top Accent Strip */}
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-kgp-crimson via-amber-500 to-kgp-crimson" />

            {/* Director Official Photo */}
            <div className="relative mx-auto w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden shadow-md border-4 border-amber-100 group">
              <img 
                src={directorPic} 
                alt="Prof. Suman Chakraborty, Director, IIT Kharagpur" 
                className="w-full h-full object-cover object-top transition duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent py-2 text-white">
                <span className="text-[11px] font-black tracking-wider uppercase text-amber-300">
                  IIT Kharagpur Director
                </span>
              </div>
            </div>

            {/* Name & Academic Credentials */}
            <div className="mt-5">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold mb-2">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Current Director in Office</span>
              </div>
              
              <h3 className="text-xl sm:text-2xl font-bold font-serif-title text-slate-950 leading-tight">
                Prof. Suman Chakraborty
              </h3>
              
              <p className="text-xs sm:text-sm font-semibold text-kgp-crimson mt-1">
                Director, Indian Institute of Technology Kharagpur
              </p>
              
              <p className="text-xs text-slate-600 mt-0.5">
                Professor, Mechanical Engineering &amp; School of Medical Science and Technology
              </p>
            </div>

            {/* Distinctions / Honors */}
            <div className="mt-4 pt-4 border-t border-slate-100 text-left space-y-2 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <Award className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <span><strong>Shanti Swarup Bhatnagar Awardee</strong> &amp; Infosys Prize Laureate</span>
              </div>
              <div className="flex items-start gap-2">
                <GraduationCap className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Pioneer in Microfluidics, Biomedical AI &amp; Affordable Health Diagnostics</span>
              </div>
              <div className="flex items-start gap-2">
                <Globe2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>Champion of National Education Policy (NEP) 2020 Vernacular Tech Education</span>
              </div>
            </div>

            {/* Institution Badge */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-center gap-2.5 text-slate-700">
              <img src={iitKgpLogo} alt="IIT KGP" className="w-6 h-6 object-contain" />
              <span className="text-xs font-serif font-bold">योगः कर्मसु कौशलम्</span>
            </div>
          </div>

          {/* Col 2: Times of India Feature & Direct Message (8 cols on lg) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* TOI Header Headline */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200">
              <div className="flex items-center gap-2 text-xs font-bold text-kgp-crimson uppercase tracking-wider mb-2">
                <Newspaper className="w-4 h-4" />
                <span>Reported in The Times of India • Renaissance 2.0 Global Summit</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black font-serif-title text-slate-950 leading-snug">
                "Democratizing World-Class AI &amp; Data Science: Language &amp; Background Will Never Be a Barrier at IIT Kharagpur"
              </h2>

              <p className="mt-3 text-xs sm:text-sm text-slate-500 italic">
                — Excerpts from Director Prof. Suman Chakraborty's address to the nation, as published in <strong>The Times of India</strong>.
              </p>

              {/* Primary Quote Box */}
              <div className="mt-6 relative bg-gradient-to-br from-amber-50/70 via-white to-red-50/40 p-5 sm:p-6 rounded-2xl border-l-4 border-kgp-crimson shadow-xs">
                <Quote className="w-8 h-8 text-kgp-crimson/20 absolute top-4 right-4" />
                <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-serif italic relative z-10">
                  "Artificial Intelligence and Data Science are the defining frontiers of our generation. 
                  Our vision with the 4-Year Bachelor of Science (BS) Degree is to make world-class education from 
                  India's first IIT universally accessible. 
                  We believe that language, traditional entry bottlenecks, or socioeconomic background must never prevent 
                  a talented student from mastering cutting-edge technology."
                </p>
                <div className="mt-3 text-xs font-bold text-slate-900 not-italic">
                  Prof. Suman Chakraborty <span className="font-normal text-slate-600">| Director, IIT Kharagpur</span>
                </div>
              </div>

              {/* Secondary Details & Key Announcements reported by TOI */}
              <div className="mt-6 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>
                  As reported in <em>The Times of India</em>, IIT Kharagpur's landmark BS Programme introduces an innovative 
                  pedagogical model designed around the tenets of the <strong>National Education Policy (NEP) 2020</strong>:
                </p>

                {/* 4 Pillars Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="font-bold text-slate-950 text-xs sm:text-sm flex items-center gap-1.5 mb-1 text-emerald-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Universal Qualifier Entry</span>
                    </div>
                    <p className="text-[12px] text-slate-600 leading-normal">
                      Modelled like premier BS frameworks: No mandatory JEE ranking cutoff. Anyone with Class 12 Mathematics can register and qualify through our 4-week foundation course.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="font-bold text-slate-950 text-xs sm:text-sm flex items-center gap-1.5 mb-1 text-blue-800">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span>Bilingual Accessibility (Bengali &amp; English)</span>
                    </div>
                    <p className="text-[12px] text-slate-600 leading-normal">
                      Instructional video lectures &amp; discussion mentors provided in Bengali and English for deep conceptual understanding, while technical terms stay globally competitive in English.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="font-bold text-slate-950 text-xs sm:text-sm flex items-center gap-1.5 mb-1 text-purple-800">
                      <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0" />
                      <span>Modular NEP Exit Milestones</span>
                    </div>
                    <p className="text-[12px] text-slate-600 leading-normal">
                      Flexible academic exits: Foundation Certificate (Year 1), Double Diplomas (Year 2), B.Sc. Degree (Year 3), and complete 4-Year BS Degree with honours.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="font-bold text-slate-950 text-xs sm:text-sm flex items-center gap-1.5 mb-1 text-amber-800">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                      <span>On-Campus Immersion &amp; Alumni Status</span>
                    </div>
                    <p className="text-[12px] text-slate-600 leading-normal">
                      Hands-on practical laboratory immersion on the 2,100-acre Kharagpur campus, access to Central Library resources, and permanent IIT KGP Alumni membership upon graduation.
                    </p>
                  </div>

                </div>

                {/* Director Closing Statement */}
                <p className="pt-2 text-slate-700 italic border-t border-slate-100">
                  "Through this pioneering BS degree, we welcome every passionate learner across India, Bengal, and international borders to become part of the IIT Kharagpur innovation family."
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center gap-3">
                <button
                  onClick={onOpenQualifier}
                  className="px-5 py-2.5 bg-kgp-crimson hover:bg-kgp-darkred text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition flex items-center gap-2"
                >
                  <span>Apply for Qualifier Round 2026</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#structure"
                  className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-semibold rounded-xl border border-stone-300 shadow-2xs transition flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-amber-600" />
                  <span>Explore 4-Year Curriculum</span>
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
