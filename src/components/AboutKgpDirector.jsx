import React from 'react';
import { Award, BookOpen, Quote, Sparkles, Building2, Compass, Shield } from 'lucide-react';
import { IIT_KGP_INFO, DIRECTORS_MESSAGE } from '../data/portalData';

export default function AboutKgpDirector() {
  return (
    <section id="about" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-kgp-crimson bg-red-50 px-3 py-1 rounded-full border border-red-200">
            Institutional Legacy & Leadership
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif-title">
            About IIT Kharagpur & Director's Vision
          </h2>
          <p className="mt-3 text-slate-600">
            The mother of all IITs, shaping India’s technological leadership since 1951.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* About IIT KGP (Left 6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-stone-50/70 border-2 border-stone-200/90 rounded-2xl p-7 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-kgp-crimson via-amber-500 to-kgp-crimson" />
              
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-kgp-crimson text-amber-300 flex items-center justify-center font-bold shadow-sm">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-serif-title">
                    The Mother of All IITs (Estd. 1951)
                  </h3>
                  <p className="text-xs text-slate-500">{IIT_KGP_INFO.motto}</p>
                </div>
              </div>

              <p className="text-slate-700 leading-relaxed text-sm">
                Established in May 1951 at the historic site of the Hijli Detention Camp in Midnapore, West Bengal, 
                <strong className="text-slate-900"> Indian Institute of Technology Kharagpur</strong> is the very first IIT founded in independent India. 
                Inaugurated by Pandit Jawaharlal Nehru and Maulana Abul Kalam Azad, the institute was established as an Institute of National Importance.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-sm">
                  <div className="text-xl font-extrabold text-kgp-crimson font-serif-title">2,100 Acres</div>
                  <div className="text-xs text-slate-600 font-medium">Largest Academic Campus in India</div>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-sm">
                  <div className="text-xl font-extrabold text-kgp-crimson font-serif-title">85,000+</div>
                  <div className="text-xs text-slate-600 font-medium">Distinguished Global Alumni Network</div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-stone-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Academic Excellence In Numbers
                </h4>
                <ul className="text-xs text-slate-600 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    <strong className="text-slate-800">Central Library:</strong> Over 400,000 volumes, 30,000+ e-journals &amp; digital research repos.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    <strong className="text-slate-800">Centers of Excellence:</strong> Center of Excellence in Artificial Intelligence (CoEAI).
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                    <strong className="text-slate-800">Supercomputing Facility:</strong> Home to "Param Shakti" Supercomputer under NSM.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Director's Message (Right 6 cols) */}
          <div className="lg:col-span-6">
            <div className="bg-stone-50/70 border-2 border-stone-200/90 rounded-2xl p-7 text-slate-900 shadow-sm relative overflow-hidden hover:border-amber-400/60 transition">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-kgp-crimson via-amber-500 to-kgp-crimson" />
              
              {/* Decorative Quote mark */}
              <Quote className="absolute top-4 right-4 w-20 h-20 text-stone-300/40 pointer-events-none" />

              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 rounded-full border-2 border-amber-500 bg-red-50 flex items-center justify-center font-serif text-2xl font-bold text-kgp-crimson shadow-sm flex-shrink-0">
                  VK
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-950 font-serif-title">
                    {DIRECTORS_MESSAGE.directorName}
                  </h3>
                  <p className="text-xs text-kgp-crimson font-semibold">
                    {DIRECTORS_MESSAGE.directorTitle}
                  </p>
                  <span className="inline-block mt-1 text-[11px] bg-amber-50 text-amber-900 px-2 py-0.5 rounded border border-amber-300/80 font-semibold">
                    Official Message on the BS Programme
                  </span>
                </div>
              </div>

              <div className="bg-amber-50/80 border-l-4 border-amber-500 p-3.5 rounded-r-lg mb-4 text-xs italic text-slate-800 font-medium">
                "{DIRECTORS_MESSAGE.quote}"
              </div>

              <div className="text-slate-700 text-xs sm:text-sm leading-relaxed space-y-3 font-normal">
                {DIRECTORS_MESSAGE.body.split('\n\n').map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-stone-200 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>IIT Kharagpur Directorate</span>
                <span className="text-kgp-crimson font-semibold">BS Admissions Cycle 2026</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
