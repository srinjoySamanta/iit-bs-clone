import React from 'react';
import { X, Award, Download, CheckCircle2, ShieldCheck, Printer } from 'lucide-react';
import { IIT_KGP_INFO } from '../data/portalData';

export default function SampleCertificateModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden border border-amber-500/40 animate-in fade-in zoom-in flex flex-col">
        
        {/* Header Actions */}
        <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-sm sm:text-base font-serif-title">
              Official Sample Degree Certificate Preview | IIT Kharagpur
            </h3>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-kgp-darknavy font-bold text-xs flex items-center gap-1.5 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Specimen</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Display Canvas */}
        <div className="p-6 sm:p-10 bg-amber-50/40 flex items-center justify-center overflow-x-auto">
          <div className="w-full max-w-3xl bg-[#fdfcf7] border-8 border-double border-amber-800/60 p-8 sm:p-12 shadow-2xl relative text-center text-slate-900 rounded-sm">
            
            {/* Corner Decorative Elements */}
            <div className="absolute top-2 left-2 text-amber-800 text-xl font-serif">❧</div>
            <div className="absolute top-2 right-2 text-amber-800 text-xl font-serif">☙</div>
            <div className="absolute bottom-2 left-2 text-amber-800 text-xl font-serif">❧</div>
            <div className="absolute bottom-2 right-2 text-amber-800 text-xl font-serif">☙</div>

            {/* Inner Border */}
            <div className="border border-amber-700/30 p-6 sm:p-8 relative">
              
              {/* Seal / Crest */}
              <div className="w-20 h-20 mx-auto rounded-full bg-kgp-crimson border-2 border-amber-400 p-1.5 flex items-center justify-center shadow-lg mb-4">
                <svg className="w-16 h-16 text-amber-400" viewBox="0 0 100 100" fill="currentColor">
                  <circle cx="50" cy="50" r="46" fill="#7A1C1C" stroke="#D4AF37" strokeWidth="3"/>
                  <polygon points="50,22 65,68 35,68" fill="#D4AF37"/>
                  <circle cx="50" cy="48" r="8" fill="#FFFFFF"/>
                  <text x="50" y="80" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">1951</text>
                </svg>
              </div>

              {/* Bilingual Institute Name */}
              <div className="text-xs sm:text-sm font-semibold text-kgp-crimson tracking-widest uppercase">
                {IIT_KGP_INFO.hindiName}
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold font-serif-title tracking-wider text-slate-900 mt-1 uppercase">
                {IIT_KGP_INFO.name}
              </h2>
              <div className="text-[11px] font-serif italic text-slate-600 mt-0.5">
                {IIT_KGP_INFO.motto}
              </div>

              <div className="my-6 w-32 h-0.5 bg-gradient-to-r from-transparent via-amber-700 to-transparent mx-auto" />

              {/* Award Text */}
              <p className="text-xs sm:text-sm font-serif italic text-slate-700 mb-2">
                Upon the recommendation of the Senate of the Institute, hereby confers upon
              </p>

              {/* Candidate Name */}
              <div className="text-2xl sm:text-3xl font-extrabold text-kgp-crimson font-serif-title tracking-wide my-3 border-b-2 border-dashed border-amber-700/40 pb-2 max-w-md mx-auto">
                ARINDAM BANERJEE
              </div>

              <p className="text-xs sm:text-sm font-serif italic text-slate-700 mt-2 mb-3">
                the degree of
              </p>

              {/* Degree Title */}
              <h3 className="text-xl sm:text-2xl font-bold font-serif-title text-slate-900 uppercase tracking-wide">
                Bachelor of Science
              </h3>
              <div className="text-sm font-bold text-amber-900 font-serif mt-1">
                in Data Science and Artificial Intelligence
              </div>

              <p className="text-xs font-serif text-slate-600 max-w-xl mx-auto mt-4 leading-relaxed">
                with all the honours, rights, privileges and responsibilities pertaining thereto, having completed all prescribed academic ordinances and requirements.
              </p>

              {/* Date & Campus Location */}
              <div className="mt-8 text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-4 px-4">
                <div className="text-left">
                  <div>Given at Kharagpur, India</div>
                  <div className="font-mono text-[11px] text-slate-500">Degree No: KGP-BS-2026-00941</div>
                </div>

                {/* Gold Foil Seal Graphic */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 via-yellow-200 to-amber-600 border-2 border-amber-700 flex items-center justify-center shadow-md rotate-12">
                  <span className="text-[9px] font-bold text-slate-900 uppercase tracking-tighter text-center font-serif">
                    Official<br />Seal
                  </span>
                </div>

                <div className="text-right">
                  <div className="font-mono text-[11px] text-slate-500">CGPA: 9.14 / 10.0</div>
                  <div className="text-emerald-700 font-semibold">First Class with Distinction</div>
                </div>
              </div>

              {/* Signatures Row */}
              <div className="mt-10 pt-6 border-t border-slate-300 grid grid-cols-3 gap-4 text-center text-xs">
                <div>
                  <div className="font-serif italic font-bold text-slate-800">B. N. Singh</div>
                  <div className="border-t border-slate-400 mt-1 pt-0.5 text-[10px] text-slate-600 uppercase">
                    Registrar
                  </div>
                </div>

                <div>
                  <div className="font-serif italic font-bold text-slate-800">Prof. V. K. Tewari</div>
                  <div className="border-t border-slate-400 mt-1 pt-0.5 text-[10px] text-slate-600 uppercase">
                    Director
                  </div>
                </div>

                <div>
                  <div className="font-serif italic font-bold text-slate-800">Dr. R. Chidambaram</div>
                  <div className="border-t border-slate-400 mt-1 pt-0.5 text-[10px] text-slate-600 uppercase">
                    Chairman, BOG
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="bg-slate-100 p-4 border-t border-slate-200 text-xs text-slate-600 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Digital Verifiable Credential compliant with National Academic Depository (NAD).</span>
          </span>
          <span className="font-mono text-slate-500">Specimen Copy — For Demonstration</span>
        </div>

      </div>
    </div>
  );
}
