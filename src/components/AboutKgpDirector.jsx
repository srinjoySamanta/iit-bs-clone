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
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-7 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-kgp-crimson text-amber-400 flex items-center justify-center font-bold">
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
                <strong> Indian Institute of Technology Kharagpur</strong> is the very first IIT founded in independent India. 
                Inaugurated by Pandit Jawaharlal Nehru and Maulana Abul Kalam Azad, the institute was established as an Institute of National Importance.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <div className="text-xl font-extrabold text-kgp-crimson font-serif-title">2,100 Acres</div>
                  <div className="text-xs text-slate-600 font-medium">Largest Academic Campus in India</div>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <div className="text-xl font-extrabold text-kgp-crimson font-serif-title">85,000+</div>
                  <div className="text-xs text-slate-600 font-medium">Distinguished Global Alumni Network</div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200/80">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Academic Excellence In Numbers
                </h4>
                <ul className="text-xs text-slate-600 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <strong>Central Library:</strong> Over 400,000 volumes, 30,000+ e-journals & digital research repos.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <strong>Centers of Excellence:</strong> Center of Excellence in Artificial Intelligence (CoEAI).
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <strong>Supercomputing Facility:</strong> Home to "Param Shakti" Supercomputer under NSM.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Director's Message (Right 6 cols) */}
          <div className="lg:col-span-6">
            <div className="bg-gradient-to-br from-kgp-navy to-slate-900 rounded-2xl p-7 text-white shadow-xl relative overflow-hidden">
              
              {/* Decorative Quote mark */}
              <Quote className="absolute top-4 right-4 w-20 h-20 text-white/5 pointer-events-none" />

              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 rounded-full border-2 border-amber-400 bg-slate-800 flex items-center justify-center font-serif text-2xl font-bold text-amber-300 shadow-md">
                  VK
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-serif-title">
                    {DIRECTORS_MESSAGE.directorName}
                  </h3>
                  <p className="text-xs text-amber-300 font-medium">
                    {DIRECTORS_MESSAGE.directorTitle}
                  </p>
                  <span className="inline-block mt-1 text-[11px] bg-amber-500/20 text-amber-200 px-2 py-0.5 rounded border border-amber-500/30">
                    Official Message on the BS Programme
                  </span>
                </div>
              </div>

              <div className="bg-white/10 border-l-4 border-amber-400 p-3 rounded-r-lg mb-4 text-xs italic text-amber-100">
                "{DIRECTORS_MESSAGE.quote}"
              </div>

              <div className="text-slate-200 text-xs sm:text-sm leading-relaxed space-y-3 font-light">
                {DIRECTORS_MESSAGE.body.split('\n\n').map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                <span>IIT Kharagpur Directorate</span>
                <span className="text-amber-400 font-medium">BS Admissions Cycle 2026</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
