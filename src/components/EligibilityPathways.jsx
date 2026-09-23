import React, { useState } from 'react';
import { 
  CheckCircle2, ArrowRight, Award, Compass, Flame, 
  HelpCircle, UserCheck, ShieldAlert, Sparkles, FileText 
} from 'lucide-react';
import { DIRECT_ADMISSION_ELIGIBILITY } from '../data/portalData';

export default function EligibilityPathways({ onOpenSignUp }) {
  const [eligibilityCheck, setEligibilityCheck] = useState({
    passedClass10: true,
    studiedMaths: true,
    hasDirectRank: 'wbjee',
    calculatedEligible: true
  });

  return (
    <section id="eligibility" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
            Admissions & Pathways
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif-title">
            Eligibility & Direct Admission Channels
          </h2>
          <p className="mt-3 text-slate-600">
            IIT Kharagpur welcomes talent through both competitive entrance merit rankings and our inclusive universal Qualifier pathway.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {DIRECT_ADMISSION_ELIGIBILITY.map((item, idx) => (
            <div 
              key={idx}
              className={`rounded-2xl border p-6 transition-all shadow-sm hover:shadow-md flex flex-col justify-between ${item.color}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/90 shadow-sm border border-slate-200 text-slate-800">
                    {item.badge}
                  </span>
                  {idx === 0 && <Award className="w-5 h-5 text-blue-600" />}
                  {idx === 1 && <Flame className="w-5 h-5 text-amber-600" />}
                  {idx === 2 && <Compass className="w-5 h-5 text-emerald-600" />}
                  {idx === 3 && <CheckCircle2 className="w-5 h-5 text-purple-600" />}
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.criteria}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">
                  {idx < 3 ? 'Direct Foundation Entry' : 'Qualifier Test (40% Cutoff)'}
                </span>
                <span className="text-[11px] text-emerald-700 font-bold">Verified</span>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Quick Eligibility Checker & Step-by-Step Flow */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* How to Apply Workflow (7 Cols) */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
            <h3 className="text-xl font-bold text-slate-900 font-serif-title mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-kgp-crimson" />
              <span>Step-by-Step Application Process (How to Apply)</span>
            </h3>

            <div className="space-y-6 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-300">
              
              <div className="flex items-start gap-4 relative">
                <div className="w-7 h-7 rounded-full bg-kgp-crimson text-white font-bold text-xs flex items-center justify-center flex-shrink-0 z-10">
                  1
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Online Registration & Profile Creation</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Fill General Information, upload age proof (Birth Certificate or Class 10 Admit), enter mobile & email with OTP verification.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 relative">
                <div className="w-7 h-7 rounded-full bg-kgp-crimson text-white font-bold text-xs flex items-center justify-center flex-shrink-0 z-10">
                  2
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Select Admission Category & Upload Documents</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Choose <strong>Direct Admission</strong> (enter WBJEE / JEE Adv / Tripura JEE Rank & upload scorecard) OR choose <strong>Regular Qualifier</strong>.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 relative">
                <div className="w-7 h-7 rounded-full bg-kgp-crimson text-white font-bold text-xs flex items-center justify-center flex-shrink-0 z-10">
                  3
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Photo & Signature Freeze</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Upload passport photograph and signature in .jpg/.png format (below size limits) and freeze details.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 relative">
                <div className="w-7 h-7 rounded-full bg-kgp-crimson text-white font-bold text-xs flex items-center justify-center flex-shrink-0 z-10">
                  4
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Application Fee & Confirmation Mail</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Pay application fee online. Receive immediate application confirmation email and profile creation pop-up with candidate ID.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 relative">
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 z-10">
                  5
                </div>
                <div>
                  <h4 className="text-sm font-bold text-emerald-800">Verification & Course Card Issuance</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Upon document verification, receive permanent Student Login credentials, Roll No, and official Course Card.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Quick Eligibility Tool (5 Cols) */}
          <div className="lg:col-span-5 bg-stone-50/80 border-2 border-stone-200/90 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-kgp-crimson via-amber-500 to-kgp-crimson" />
            
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-amber-600" />
                <h3 className="text-lg font-bold font-serif-title text-slate-950">
                  Instant Eligibility Check
                </h3>
              </div>
              <p className="text-xs text-slate-600 mb-6">
                Verify your eligibility status in under 10 seconds.
              </p>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Do you have a valid entrance exam score?</label>
                  <select 
                    value={eligibilityCheck.hasDirectRank}
                    onChange={(e) => setEligibilityCheck({ ...eligibilityCheck, hasDirectRank: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-kgp-crimson shadow-sm"
                  >
                    <option value="wbjee">WBJEE Rank Holder</option>
                    <option value="jeeadv">IIT JEE Advanced Qualifier</option>
                    <option value="tripura">Tripura JEE Rank Holder</option>
                    <option value="none">None (Regular Qualifier Admission)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Highest Qualification</label>
                  <select className="w-full bg-white border border-stone-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-kgp-crimson shadow-sm">
                    <option>Class 12 Passed (Any Stream: Science, Arts, Commerce)</option>
                    <option>Diploma Holder (Polytechnic / 3-Year)</option>
                    <option>Enrolled in College / Degree</option>
                    <option>Working Professional</option>
                    <option>Class 10 Passed (Eligible for Qualifier)</option>
                  </select>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 mt-4 shadow-sm">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Eligible to Apply!</span>
                  </div>
                  <p className="text-[11px] text-emerald-900 leading-relaxed">
                    {eligibilityCheck.hasDirectRank !== 'none'
                      ? 'Congratulations! You qualify for DIRECT ADMISSION into the Foundation Level without writing the 4-week qualifier test.'
                      : 'You are eligible to apply through the universal Qualifier process. Score >= 40% to secure your seat.'}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenSignUp}
              className="mt-6 w-full py-3 bg-kgp-crimson hover:bg-kgp-darkred text-white font-bold text-sm rounded-xl transition flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              <span>Begin Application Profile</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
