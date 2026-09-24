import React from 'react';
import { 
  ShieldCheck, Shield, Users, ArrowRight, ExternalLink, 
  Lock, Key, Database, FileCheck, CheckCircle2, Award, 
  UserCheck, Bell, ChevronRight, Layers, FileText
} from 'lucide-react';
import { IIT_KGP_INFO } from '../data/portalData';

export default function AdminSection({ onNavigate, onOpenAdminModal, onOpenAdminLogin }) {
  const handlePortalRedirect = () => {
    if (onNavigate) {
      onNavigate('admin-portal');
    } else {
      window.location.hash = 'admin-portal';
    }
  };

  return (
    <section id="admin" className="py-20 bg-slate-900 text-white border-y border-slate-800 relative overflow-hidden">
      
      {/* Background Decorative Accents */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-red-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Restricted Administration &amp; Governance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif-title tracking-tight text-white">
            IIT Kharagpur Administration Portal
          </h2>
          <p className="mt-3 text-sm text-slate-300 leading-relaxed">
            Centralized institutional gateway for IIT Kharagpur faculty, admissions officers, and qualifier examination controllers to manage student records, inspect biodata, verify WBJEE/JEE credentials, and issue official certifications.
          </p>
        </div>

        {/* Central Executive Administrative Gateway Card (With Direct Hyperlink) */}
        <div className="max-w-4xl mx-auto bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-slate-700/80">
            
            <div className="space-y-3 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-900/90 border border-slate-700 text-amber-300 text-xs font-mono font-semibold">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Level-3 Secure Faculty Gateway</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif-title text-white">
                Student Details &amp; Records Management System
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                To protect student data privacy, full applicant details, marks sheets, and biodata are housed in the dedicated IIT Kharagpur Administrative Information System.
              </p>
            </div>

            {/* PRIMARY HYPERLINK BUTTON */}
            <div className="flex-shrink-0 w-full sm:w-auto text-center">
              <a
                href="#admin-portal"
                onClick={(e) => {
                  e.preventDefault();
                  handlePortalRedirect();
                }}
                className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-7 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1 group"
              >
                <Users className="w-5 h-5 text-slate-950" />
                <span>Access Student Details Portal</span>
                <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
              </a>
              <div className="text-[11px] text-slate-400 mt-2 font-mono">
                Redirects to: <span className="text-amber-400">#admin-portal</span>
              </div>
            </div>

          </div>

          {/* Feature Highlights Grid of What is Inside the Hyperlink Portal */}
          <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-700/80 hover:border-amber-400/50 transition">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                <Database className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">All Students Roster</h4>
              <p className="text-[11px] text-slate-400 mt-1">
                Searchable master registry of enrolled candidates, contact info, and academic track progress.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-700/80 hover:border-amber-400/50 transition">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
                <FileCheck className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Document Verification</h4>
              <p className="text-[11px] text-slate-400 mt-1">
                Audit 10+2 marks, WBJEE/JEE rank cards, photo ID clarity, and income concession proof.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-700/80 hover:border-amber-400/50 transition">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-3">
                <Award className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Qualifier Scores &amp; Cutoffs</h4>
              <p className="text-[11px] text-slate-400 mt-1">
                Monitor 115+ CBT test center scores, pass benchmarks, and direct exemption statuses.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-700/80 hover:border-amber-400/50 transition">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center mb-3">
                <Key className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Pass &amp; Certificate Console</h4>
              <p className="text-[11px] text-slate-400 mt-1">
                Issue official Qualifier Hall Passes, Alumni ID Cards, and Degree Convocation credentials.
              </p>
            </div>

          </div>

          {/* Quick Staff Credentials & Secondary Links */}
          <div className="mt-8 pt-6 border-t border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Shield className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>
                Demo Staff Credentials: <code className="px-1.5 py-0.5 rounded bg-slate-950 text-amber-400 font-mono font-bold">ADMIN-KGP-2026</code>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="#admin-portal"
                onClick={(e) => {
                  e.preventDefault();
                  handlePortalRedirect();
                }}
                className="text-amber-400 hover:underline font-bold flex items-center gap-1"
              >
                <span>Direct Hyperlink to Student Details</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <span className="text-slate-600">•</span>
              <button
                onClick={onOpenAdminModal}
                className="text-slate-300 hover:text-white transition"
              >
                Open Admin Modal
              </button>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
