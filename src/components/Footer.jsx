import React from 'react';
import { Layers, Mail, Phone, MapPin, ExternalLink, ShieldCheck, Award, Lock } from 'lucide-react';
import { IIT_KGP_INFO } from '../data/portalData';
import iitKgpLogo from '../assets/logo';

export default function Footer({ onOpenDiagram, onOpenStudentLogin, onOpenAdminLogin, onOpenCertificate }) {
  return (
    <footer className="bg-kgp-darknavy text-white pt-14 pb-8 border-t-4 border-kgp-crimson">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          
          {/* Col 1 & 2: Branding & Address */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-white p-1 border border-amber-400 flex items-center justify-center overflow-hidden">
                <img src={iitKgpLogo} alt="IIT KGP" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="text-xs text-amber-300 font-bold uppercase tracking-wider">
                  {IIT_KGP_INFO.hindiName}
                </div>
                <h4 className="text-base font-bold font-serif-title text-white">
                  {IIT_KGP_INFO.name}
                </h4>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The flagship 4-Year Bachelor of Science (BS) Degree in Data Science & Artificial Intelligence from India's first Indian Institute of Technology (Estd. 1951).
            </p>

            <div className="text-xs text-slate-400 space-y-1.5 pt-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>Kharagpur, Paschim Medinipur, West Bengal - 721302, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{IIT_KGP_INFO.helpline}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>{IIT_KGP_INFO.email}</span>
              </div>
            </div>
          </div>

          {/* Col 3: Academic Levels */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Academic Levels
            </h5>
            <ul className="text-xs text-slate-400 space-y-2">
              <li><a href="#structure" className="hover:text-white transition">Foundation Level (32 Credits)</a></li>
              <li><a href="#structure" className="hover:text-white transition">Diploma in Programming</a></li>
              <li><a href="#structure" className="hover:text-white transition">Diploma in Data Science</a></li>
              <li><a href="#structure" className="hover:text-white transition">B.Sc. Degree (114 Credits)</a></li>
              <li><a href="#structure" className="hover:text-white transition">4-Year BS Degree (142 Credits)</a></li>
              <li>
                <button onClick={onOpenCertificate} className="text-amber-400 hover:underline flex items-center gap-1">
                  <span>Sample Degree Certificate</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Admissions & Direct Entry */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Admissions
            </h5>
            <ul className="text-xs text-slate-400 space-y-2">
              <li><a href="#eligibility" className="hover:text-white transition">WBJEE Direct Admission</a></li>
              <li><a href="#eligibility" className="hover:text-white transition">JEE Advanced Qualifier Entry</a></li>
              <li><a href="#eligibility" className="hover:text-white transition">Tripura JEE Direct Entry</a></li>
              <li><a href="#eligibility" className="hover:text-white transition">Regular Qualifier Exam</a></li>
              <li><a href="#fees" className="hover:text-white transition">Fee & Scholarship Calculator</a></li>
              <li><a href="#faqs" className="hover:text-white transition">FAQs (English & Bengali)</a></li>
            </ul>
          </div>

          {/* Col 5: Portal Gateways */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              System Portals
            </h5>
            <div className="space-y-2">
              <button
                onClick={onOpenStudentLogin}
                className="w-full text-left p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition flex items-center justify-between"
              >
                <span>Student Login Portal</span>
                <span className="text-[10px] bg-emerald-900/60 text-emerald-300 px-1.5 py-0.5 rounded">Active</span>
              </button>

              <a
                href="#qualifier"
                className="w-full text-left p-2 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/30 text-xs font-semibold text-emerald-300 transition flex items-center justify-between"
              >
                <span>Qualifier Exam Portal</span>
                <span className="text-[10px] bg-emerald-700 text-white px-1.5 py-0.5 rounded">CBT Live</span>
              </a>

              <button
                onClick={onOpenDiagram}
                className="w-full text-left p-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-xs font-semibold text-amber-300 transition flex items-center justify-between"
              >
                <div className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Portal Block Diagram</span>
                </div>
                <span className="text-[10px] bg-amber-400 text-kgp-darknavy font-bold px-1.5 py-0.5 rounded">Tree</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright & accreditation */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © 2026 Indian Institute of Technology Kharagpur. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="text-slate-400">NIRF Ranked Institute of National Importance</span>
            <span>•</span>
            <span className="text-slate-400">NEP 2020 Compliant</span>
            <span>•</span>
            <span className="text-slate-400">UGC / MoE Approved BS Degree</span>
            <span>•</span>
            <button
              onClick={onOpenAdminLogin}
              className="text-slate-400 hover:text-amber-400 transition flex items-center gap-1 font-semibold group cursor-pointer"
              title="Restricted Staff & Admin Login"
            >
              <Lock className="w-3 h-3 text-amber-500/80 group-hover:text-amber-400" />
              <span>Staff Login</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
