import React from 'react';
import { Mail, Phone, MapPin, ExternalLink, ShieldCheck, Award, Lock, GraduationCap, UserCheck } from 'lucide-react';
import { IIT_KGP_INFO } from '../data/portalData';
import iitKgpLogo from '../assets/logo';
import { getErpLoginUrl } from '../config/portalConfig';

export default function Footer({ onOpenDiagram, onOpenStudentLogin, onOpenAdminLogin, onOpenCertificate, onNavigate }) {
  return (
    <footer className="w-full bg-kgp-darknavy text-white pt-14 pb-8 border-t-4 border-kgp-crimson">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dedicated Institutional Portal Gateways Section (Student, Staff & Admin Login) */}
        <div id="institutional-gateways" className="mb-14 pb-12 border-b border-slate-800">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
              Institutional Access &amp; Single Sign-On
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-serif-title text-white mt-2.5">
              Official Portal Gateways
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Authorized entry points for candidates, enrolled students, faculty staff, and institute administration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* 1. Student Portal */}
            <div className="bg-slate-900/90 rounded-2xl p-5 border border-emerald-500/30 hover:border-emerald-400 transition-all flex flex-col justify-between shadow-lg group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Applicant &amp; Enrolled</div>
                <h4 className="text-base font-bold text-white mt-0.5">Student Portal &amp; LMS</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Track admission application, complete semester fee payments, access live video lectures, courseware, and grades.
                </p>
              </div>
              <div className="pt-5 mt-4 border-t border-slate-800/80">
                <button
                  type="button"
                  onClick={() => onNavigate ? onNavigate('student-login') : (onOpenStudentLogin ? onOpenStudentLogin() : null)}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Student Login</span>
                </button>
              </div>
            </div>

            {/* 2. Staff Operations Portal */}
            <div className="bg-slate-900/90 rounded-2xl p-5 border border-sky-500/30 hover:border-sky-400 transition-all flex flex-col justify-between shadow-lg group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div className="text-[11px] font-bold text-sky-400 uppercase tracking-wider">Operations &amp; Faculty</div>
                <h4 className="text-base font-bold text-white mt-0.5">Staff Operations Portal</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Faculty verification desk, candidate document scrutiny, qualifier attendance records, and student workflow management.
                </p>
              </div>
              <div className="pt-5 mt-4 border-t border-slate-800/80">
                <button
                  type="button"
                  onClick={() => onNavigate ? onNavigate('staff-login') : null}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Staff Login</span>
                </button>
              </div>
            </div>

            {/* 3. Super Admin Directorate */}
            <div className="bg-slate-900/90 rounded-2xl p-5 border border-amber-500/30 hover:border-amber-400 transition-all flex flex-col justify-between shadow-lg group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Super Directorate</div>
                <h4 className="text-base font-bold text-white mt-0.5">Admin Directorate Console</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Admin authorization console, strict approval/rejection oversight, system security audit, and batch performance metrics.
                </p>
              </div>
              <div className="pt-5 mt-4 border-t border-slate-800/80">
                <button
                  type="button"
                  onClick={() => onNavigate ? onNavigate('admin-login') : (onOpenAdminLogin ? onOpenAdminLogin() : null)}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-slate-950" />
                  <span>Admin Login</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-slate-800">
          
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
              <li><a href="#director-message" className="hover:text-amber-300 transition text-amber-300 font-semibold">Director's Message (Times of India)</a></li>
              <li><a href="#eligibility" className="hover:text-white transition">WBJEE Direct Admission</a></li>
              <li><a href="#eligibility" className="hover:text-white transition">JEE Advanced Qualifier Entry</a></li>
              <li><a href="#eligibility" className="hover:text-white transition">Tripura JEE Direct Entry</a></li>
              <li><a href="#eligibility" className="hover:text-white transition">Regular Qualifier Exam</a></li>
              <li><a href="#fees" className="hover:text-white transition">Fee & Scholarship Calculator</a></li>
              <li><a href="#faqs" className="hover:text-white transition">FAQs (English & Bengali)</a></li>
            </ul>
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
            <div className="inline-flex items-center gap-2">
              <button
                type="button"
                onClick={() => onNavigate ? onNavigate('student-login') : (onOpenStudentLogin ? onOpenStudentLogin() : null)}
                className="text-slate-400 hover:text-emerald-400 transition flex items-center gap-1 font-semibold cursor-pointer"
                title="BS Student Portal & LMS Login"
              >
                <GraduationCap className="w-3 h-3 text-emerald-400" />
                <span>Student Login</span>
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => onNavigate ? onNavigate('staff-login') : null}
                className="text-slate-400 hover:text-sky-400 transition flex items-center gap-1 font-semibold cursor-pointer"
                title="Staff Operations Portal"
              >
                <UserCheck className="w-3 h-3 text-sky-400" />
                <span>Staff Login</span>
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => onNavigate ? onNavigate('admin-login') : (onOpenAdminLogin ? onOpenAdminLogin() : null)}
                className="text-slate-400 hover:text-amber-400 transition flex items-center gap-1 font-semibold cursor-pointer"
                title="Super Admin Directorate Login"
              >
                <ShieldCheck className="w-3 h-3 text-amber-400" />
                <span>Admin Login</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
