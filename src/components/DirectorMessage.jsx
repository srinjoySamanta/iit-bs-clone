import React, { useState } from 'react';
import { 
  Quote, Newspaper, Award, ExternalLink, Sparkles, CheckCircle2, 
  ArrowRight, BookOpen, GraduationCap, Building2, Globe2, ChevronDown, ChevronUp 
} from 'lucide-react';
import directorPic from '../assets/images/director-suman-chakraborty.jpg';
import iitKgpLogo from '../assets/logo';

export default function DirectorMessage({ onOpenQualifier, onOpenSignUp }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="director-message" className="py-12 sm:py-16 bg-gradient-to-b from-stone-50 via-white to-stone-50 border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Badge */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-red-100 text-kgp-crimson border border-red-300">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          
          {/* Col 1: Current Director Profile Card (4 cols on lg) */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-stone-200 text-center relative overflow-hidden">
            {/* Top Accent Strip */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-kgp-crimson via-amber-500 to-kgp-crimson" />

            {/* Director Official Photo */}
            <div className="relative mx-auto w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden shadow-md border-4 border-amber-100 group">
              <img 
                src={directorPic} 
                alt="Prof. Suman Chakraborty, Director, IIT Kharagpur" 
                className="w-full h-full object-cover object-top transition duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent py-1.5 text-white">
                <span className="text-[10px] font-black tracking-wider uppercase text-amber-300">
                  IIT Kharagpur Director
                </span>
              </div>
            </div>

            {/* Name & Academic Credentials */}
            <div className="mt-4">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold mb-1.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Current Director in Office</span>
              </div>
              
              <h3 className="text-xl sm:text-2xl font-bold font-serif-title text-slate-950 leading-tight">
                Prof. Suman Chakraborty
              </h3>
              
              <p className="text-xs sm:text-sm font-semibold text-kgp-crimson mt-0.5">
                Director, Indian Institute of Technology Kharagpur
              </p>
              
              <p className="text-xs text-slate-600 mt-0.5">
                Professor, Mechanical Engineering &amp; SMST
              </p>
            </div>

            {/* Distinctions / Honors */}
            <div className="mt-3.5 pt-3.5 border-t border-slate-100 text-left space-y-1.5 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <Award className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                <span><strong>Shanti Swarup Bhatnagar Awardee</strong> &amp; Infosys Laureate</span>
              </div>
              <div className="flex items-start gap-2">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Pioneer in Biomedical AI &amp; Microfluidics</span>
              </div>
              <div className="flex items-start gap-2">
                <Globe2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>NEP 2020 Vernacular Tech Education Advocate</span>
              </div>
            </div>

            {/* Institution Badge */}
            <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-center gap-2 text-slate-700">
              <img src={iitKgpLogo} alt="IIT KGP" className="w-5 h-5 object-contain" />
              <span className="text-xs font-serif font-bold">योगः कर्मसु कौशलम्</span>
            </div>
          </div>

          {/* Col 2: Times of India Feature & Direct Message (8 cols on lg) */}
          <div className="lg:col-span-8 space-y-5">
            
            {/* TOI Header Headline */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-stone-200">
              <div className="flex items-center gap-2 text-xs font-bold text-kgp-crimson uppercase tracking-wider mb-2">
                <Newspaper className="w-4 h-4" />
                <span>Reported in The Times of India • Renaissance 2.0 Global Summit</span>
              </div>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black font-serif-title text-slate-950 leading-snug">
                "Democratizing World-Class AI &amp; Data Science: Language &amp; Background Will Never Be a Barrier at IIT Kharagpur"
              </h2>

              <p className="mt-2 text-xs sm:text-sm text-slate-500 italic">
                — Excerpts from Director Prof. Suman Chakraborty's address to the nation, published in <strong>The Times of India</strong>.
              </p>

              {/* Primary Quote Box */}
              <div className="mt-5 relative bg-gradient-to-br from-amber-50/60 via-white to-red-50/30 p-4 sm:p-5 rounded-2xl border-l-4 border-kgp-crimson shadow-2xs">
                <Quote className="w-8 h-8 text-kgp-crimson/15 absolute top-3 right-3" />
                <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-serif italic relative z-10">
                  "Artificial Intelligence and Data Science are the defining frontiers of our generation. 
                  Our vision with the 4-Year Bachelor of Science (BS) Degree is to make world-class education from 
                  India's first IIT universally accessible. 
                  We believe that language, traditional entry bottlenecks, or socioeconomic background must never prevent 
                  a talented student from mastering cutting-edge technology."
                </p>
                <div className="mt-2.5 text-xs font-bold text-slate-900 not-italic">
                  Prof. Suman Chakraborty <span className="font-normal text-slate-600">| Director, IIT Kharagpur</span>
                </div>
              </div>

              {/* Expandable Toggle for NEP 2020 Pedagogical Framework */}
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => setIsExpanded(prev => !prev)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition border border-slate-200 cursor-pointer"
                >
                  <span>{isExpanded ? 'Hide Detailed Excerpts & Framework' : 'Read Full TOI Address & NEP 2020 Pedagogical Pillars'}</span>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-600" /> : <ChevronDown className="w-4 h-4 text-slate-600" />}
                </button>
              </div>

              {/* Detailed Content (Expandable) */}
              {isExpanded && (
                <div className="mt-5 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <p>
                    As reported in <em>The Times of India</em>, IIT Kharagpur's landmark BS Programme introduces an innovative 
                    pedagogical model designed around the tenets of the <strong>National Education Policy (NEP) 2020</strong>:
                  </p>

                  {/* 4 Pillars Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="font-bold text-slate-950 text-xs sm:text-sm flex items-center gap-1.5 mb-1 text-emerald-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>Universal Qualifier Entry</span>
                      </div>
                      <p className="text-[12px] text-slate-600 leading-normal">
                        No mandatory JEE ranking cutoff. Anyone with Class 12 Mathematics can register and qualify through our 4-week foundation course.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="font-bold text-slate-950 text-xs sm:text-sm flex items-center gap-1.5 mb-1 text-blue-800">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        <span>Bilingual Accessibility</span>
                      </div>
                      <p className="text-[12px] text-slate-600 leading-normal">
                        Lectures &amp; discussion mentors provided in Bengali and English for conceptual clarity, with global English technical terms.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="font-bold text-slate-950 text-xs sm:text-sm flex items-center gap-1.5 mb-1 text-purple-800">
                        <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0" />
                        <span>Modular NEP Exit Milestones</span>
                      </div>
                      <p className="text-[12px] text-slate-600 leading-normal">
                        Flexible exits: Foundation Certificate (Year 1), Double Diplomas (Year 2), B.Sc. Degree (Year 3), and 4-Year BS Degree with honours.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="font-bold text-slate-950 text-xs sm:text-sm flex items-center gap-1.5 mb-1 text-amber-800">
                        <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                        <span>Campus Immersion &amp; Alumni Status</span>
                      </div>
                      <p className="text-[12px] text-slate-600 leading-normal">
                        Hands-on immersion on the 2,100-acre Kharagpur campus, Central Library access, and permanent IIT Kharagpur Alumni membership upon graduation.
                      </p>
                    </div>

                  </div>

                  {/* Director Closing Statement */}
                  <p className="pt-2 text-slate-700 italic border-t border-slate-100">
                    "Through this pioneering BS degree, we welcome every passionate learner across India, Bengal, and international borders to become part of the IIT Kharagpur innovation family."
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
                <button
                  onClick={onOpenQualifier}
                  className="px-5 py-2.5 bg-kgp-crimson hover:bg-kgp-darkred text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer"
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
