import React from 'react';
import { Mail, Phone, MapPin, ExternalLink, ShieldCheck, Award, Lock, GraduationCap, UserCheck } from 'lucide-react';
import { IIT_KGP_INFO } from '../data/portalData';
import iitKgpLogo from '../assets/logo';
import { getErpLoginUrl } from '../config/portalConfig';

export default function Footer({ onOpenDiagram, onOpenStudentLogin, onOpenAdminLogin, onOpenCertificate, onNavigate }) {
  return (
    <footer className="w-full bg-kgp-darknavy text-white pt-14 pb-8 border-t-4 border-kgp-crimson">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dedicated Institutional Portal Gateways Section (Student, Staff & Admin Login) - Small Size matching Footer */}
        <div id="institutional-gateways" className="scroll-mt-[135px] mb-8 pb-8 border-b border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 mb-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <h5 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Official Portal Gateways (Single Sign-On)
              </h5>
            </div>
            <p className="text-[11px] text-slate-400">
              Authorized entry points for candidates, faculty staff &amp; administration
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* 1. Student Portal */}
            <div className="bg-slate-900/70 rounded-xl p-3.5 border border-emerald-500/20 hover:border-emerald-500/40 transition-all flex flex-col justify-between gap-2.5">
              <div>
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Applicant &amp; Enrolled</span>
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <h6 className="text-xs font-bold text-white">Student Portal &amp; LMS</h6>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Track admission application, complete semester fee payments, access live video lectures, courseware, and grades.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate ? onNavigate('student-login') : (onOpenStudentLogin ? onOpenStudentLogin() : null)}
                className="w-full py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition cursor-pointer"
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Student Login</span>
              </button>
            </div>

            {/* 2. Staff Operations Portal */}
            <div className="bg-slate-900/70 rounded-xl p-3.5 border border-sky-500/20 hover:border-sky-500/40 transition-all flex flex-col justify-between gap-2.5">
              <div>
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider">Operations &amp; Faculty</span>
                  <UserCheck className="w-3.5 h-3.5 text-sky-400" />
                </div>
                <h6 className="text-xs font-bold text-white">Staff Operations Portal</h6>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Faculty verification desk, candidate document scrutiny, qualifier attendance records, and student workflow management.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate ? onNavigate('staff-login') : null}
                className="w-full py-1.5 px-3 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition cursor-pointer"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Staff Login</span>
              </button>
            </div>

            {/* 3. Super Admin Directorate */}
            <div className="bg-slate-900/70 rounded-xl p-3.5 border border-amber-500/20 hover:border-amber-500/40 transition-all flex flex-col justify-between gap-2.5">
              <div>
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Super Directorate</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <h6 className="text-xs font-bold text-white">Admin Directorate Console</h6>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Admin authorization console, strict approval/rejection oversight, system security audit, and batch performance metrics.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate ? onNavigate('admin-login') : (onOpenAdminLogin ? onOpenAdminLogin() : null)}
                className="w-full py-1.5 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-slate-950" />
                <span>Admin Login</span>
              </button>
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
              <li><a href="#fees" className="hover:text-white transition">Fee &amp; Scholarship Calculator</a></li>
              <li><a href="#faqs" className="hover:text-white transition">FAQs (English &amp; Bengali)</a></li>
              <li className="pt-2 border-t border-slate-800">
                <button 
                  type="button"
                  onClick={() => onNavigate ? onNavigate('student-login') : (onOpenStudentLogin ? onOpenStudentLogin() : null)} 
                  className="hover:text-emerald-300 transition text-[11px] flex items-center gap-1.5 text-slate-400 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                  <span>Student Portal &amp; LMS</span>
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => onNavigate ? onNavigate('staff-login') : null} 
                  className="hover:text-sky-300 transition text-[11px] flex items-center gap-1.5 text-slate-400 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 flex-shrink-0" />
                  <span>Staff Operations Portal</span>
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => onNavigate ? onNavigate('admin-login') : (onOpenAdminLogin ? onOpenAdminLogin() : null)} 
                  className="hover:text-amber-300 transition text-[11px] flex items-center gap-1.5 text-slate-400 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Admin Directorate Console</span>
                </button>
              </li>
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
