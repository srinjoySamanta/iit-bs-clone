import React from 'react';
import { 
  GraduationCap, Award, BookOpen, Layers, CheckCircle2, 
  ArrowRight, ShieldCheck, Sparkles, Building2, Users, FileText, 
  HelpCircle, Phone, ExternalLink, Calendar, MapPin, Check, X, Minus
} from 'lucide-react';
import iitKgpLogo from '../assets/logo';

export default function HomeOverview({ 
  onNavigate, 
  onOpenCertificate, 
  onOpenHowToApply, 
  onOpenQualifier,
  onOpenSignUp 
}) {
  return (
    <div className="w-full space-y-16 sm:space-y-24 py-12 bg-white">
      
      {/* 1. PROGRAMME HIGHLIGHTS (Matched to Reference PDF Page 3) */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-kgp-crimson bg-red-50 px-3.5 py-1 rounded-full border border-red-200">
            Institutional Excellence
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif-title">
            Programme Highlights
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Designed for aspiring data scientists, AI engineers, and technology leaders across India and abroad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Degree from IIT Kharagpur */}
          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 shadow-2xs hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-red-100 text-kgp-crimson flex items-center justify-center mb-4">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1.5 font-serif-title">
              Degree from IIT Kharagpur
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Receive a prestigious 4-Year Bachelor of Science (BS) degree in Data Science &amp; AI from India's first and largest IIT.
            </p>
          </div>

          {/* Card 2: Alumni Card & Email ID */}
          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 shadow-2xs hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1.5 font-serif-title">
              Alumni Card &amp; Email ID
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Obtain lifetime-valid IIT Kharagpur Alumni membership, official Alumni Card, and lifelong institutional email credentials.
            </p>
          </div>

          {/* Card 3: Modular NEP 2020 Exits */}
          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 shadow-2xs hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center mb-4">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1.5 font-serif-title">
              Flexible Modular Exits
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Aligned with NEP 2020: Foundation Certificate (Year 1), Double Diplomas (Year 2), B.Sc. Degree (Year 3), or full BS (Year 4).
            </p>
          </div>

          {/* Card 4: Universal Qualifier Entry */}
          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 shadow-2xs hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1.5 font-serif-title">
              Universal Qualifier Entry
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              No mandatory JEE rank cutoff. Open to anyone who completed Class 12 with Mathematics through a 4-week qualifier framework.
            </p>
          </div>

        </div>
      </section>

      {/* 2. DEGREE, CREDENTIALS & CAMPUS ACCESS (Matched to Reference PDF Page 4) */}
      <section className="w-full bg-stone-50 py-16 border-y border-stone-200">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3.5 py-1 rounded-full border border-amber-300">
              Verified Credentials
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif-title">
              Credentials &amp; Campus Experience
            </h2>
            <p className="mt-3 text-slate-600 text-sm">
              Authentic IIT Kharagpur degree certification, alumni association rights, and full campus privileges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Box 1: Sample Degree Certificate */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="aspect-[4/3] rounded-xl bg-slate-100 border border-slate-200 p-3 mb-4 flex flex-col items-center justify-center text-center relative overflow-hidden group cursor-pointer" onClick={onOpenCertificate}>
                  <img src={iitKgpLogo} alt="IIT KGP" className="w-10 h-10 object-contain mb-1.5 opacity-80" />
                  <div className="text-[10px] font-bold text-slate-900 font-serif">Indian Institute of Technology Kharagpur</div>
                  <div className="text-[8px] text-kgp-crimson font-serif mt-0.5">Bachelor of Science in Data Science &amp; AI</div>
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xs font-bold gap-1">
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View Sample</span>
                  </div>
                </div>
                <h4 className="font-bold text-slate-900 text-base mb-1">Authentic Degree</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Conferred under the authority of the IIT Kharagpur Senate with official seal and hologram.
                </p>
              </div>
              <button
                type="button"
                onClick={onOpenCertificate}
                className="mt-4 text-xs font-bold text-kgp-crimson hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View Sample Degree</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Box 2: Alumni Card & Status */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-amber-700 to-amber-900 text-white p-4 mb-4 flex flex-col justify-between shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black uppercase tracking-wider text-amber-200">IIT Kharagpur</span>
                    <span className="text-[8px] bg-white/20 px-1.5 py-0.5 rounded font-mono">LIFETIME</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold font-serif">Alumni Association</div>
                    <div className="text-[9px] text-amber-100">Permanent Member ID Card</div>
                  </div>
                  <div className="text-[8px] text-amber-200/80 font-mono">Issued upon completion of 4-Year BS</div>
                </div>
                <h4 className="font-bold text-slate-900 text-base mb-1">Lifetime Alumni Status</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Join the global network of 80,000+ IIT Kharagpur alumni spanning top Fortune 500s and academia.
                </p>
              </div>
              <span className="mt-4 text-[11px] font-semibold text-amber-800">
                Granted upon completion of degree
              </span>
            </div>

            {/* Box 3: Campus Access */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="aspect-[4/3] rounded-xl bg-slate-100 border border-slate-200 p-4 mb-4 flex flex-col items-center justify-center text-center">
                  <Building2 className="w-10 h-10 text-slate-700 mb-2" />
                  <div className="text-xs font-bold text-slate-900">2,100-Acre Campus</div>
                  <div className="text-[10px] text-slate-500">Central Library &amp; Labs</div>
                </div>
                <h4 className="font-bold text-slate-900 text-base mb-1">Campus Access</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Access IIT Kharagpur Central Library resources, digital journals (IEEE, ACM), and campus facilities.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('campus')}
                className="mt-4 text-xs font-bold text-kgp-crimson hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Explore Campus Privileges</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Box 4: Graduation Ceremony */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="aspect-[4/3] rounded-xl bg-slate-100 border border-slate-200 p-4 mb-4 flex flex-col items-center justify-center text-center">
                  <GraduationCap className="w-10 h-10 text-emerald-700 mb-2" />
                  <div className="text-xs font-bold text-slate-900">In-Person Convocation</div>
                  <div className="text-[10px] text-slate-500">Kharagpur Main Campus</div>
                </div>
                <h4 className="font-bold text-slate-900 text-base mb-1">Graduation on Campus</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Celebrate your hard-earned graduation with a formal convocation ceremony on the historic Kharagpur campus.
                </p>
              </div>
              <span className="mt-4 text-[11px] font-semibold text-emerald-800">
                Eligible upon completion of Year 4
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* 3. PROGRAMME DIRECTORY (THE HYPERLINK DIRECTORY: Click to view each dedicated sub-page) */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-kgp-crimson bg-red-50 px-3.5 py-1 rounded-full border border-red-200">
            Navigation Directory
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif-title">
            Explore Programme Details
          </h2>
          <p className="mt-3 text-slate-600 text-sm">
            Click on any section below or use the top menu to view the full, dedicated information pages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* 1. Course Structure & Syllabus */}
          <div 
            onClick={() => onNavigate('structure')}
            className="group p-6 rounded-2xl bg-white border-2 border-stone-200 hover:border-kgp-crimson shadow-2xs hover:shadow-lg transition cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-red-50 text-kgp-crimson flex items-center justify-center mb-3 group-hover:scale-105 transition">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-kgp-crimson transition font-serif-title">
                Course Structure &amp; Syllabus Roadmap
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Full 142 Credits curriculum: Foundation (32 cr), Diplomas in Programming &amp; AI (64 cr), B.Sc. (104 cr), and BS Degree (142 cr).
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-kgp-crimson">
              <span>View Full Syllabus &amp; Credits</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 2. Eligibility & Direct Pathways */}
          <div 
            onClick={() => onNavigate('eligibility')}
            className="group p-6 rounded-2xl bg-white border-2 border-stone-200 hover:border-kgp-crimson shadow-2xs hover:shadow-lg transition cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3 group-hover:scale-105 transition">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-kgp-crimson transition font-serif-title">
                Eligibility &amp; Direct Entry Pathways
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Dual admission routes: Direct entry for WBJEE, JEE Advanced &amp; Tripura JEE qualifiers, or universal entry via the 4-week Qualifier Round.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-800">
              <span>Check Eligibility Rules</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 3. Fees Structure & Calculator */}
          <div 
            onClick={() => onNavigate('fees')}
            className="group p-6 rounded-2xl bg-white border-2 border-stone-200 hover:border-kgp-crimson shadow-2xs hover:shadow-lg transition cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center mb-3 group-hover:scale-105 transition">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-kgp-crimson transition font-serif-title">
                Fees Structure &amp; Scholarships
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Affordable modular pay-per-credit structure with up to 75% fee waivers for SC / ST / PwD candidates and low-income families.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-800">
              <span>Open Fee &amp; Waiver Calculator</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 4. Campus Immersion & Placements */}
          <div 
            onClick={() => onNavigate('campus')}
            className="group p-6 rounded-2xl bg-white border-2 border-stone-200 hover:border-kgp-crimson shadow-2xs hover:shadow-lg transition cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-3 group-hover:scale-105 transition">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-kgp-crimson transition font-serif-title">
                Campus Immersion &amp; Placements
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Experience student life on the 2,100-acre green campus, participate in annual tech fests, and leverage the dedicated placement cell.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-800">
              <span>View Campus &amp; Placement Data</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 5. How to Apply Guide */}
          <div 
            onClick={() => onNavigate('how-to-apply')}
            className="group p-6 rounded-2xl bg-white border-2 border-stone-200 hover:border-kgp-crimson shadow-2xs hover:shadow-lg transition cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-3 group-hover:scale-105 transition">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-kgp-crimson transition font-serif-title">
                How to Apply (5-Stage Guide)
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Step-by-step instructions for profile creation, age proof, Class 10/12 documents, photo/signature specifications, and fee checkout.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-800">
              <span>Read Application Instructions</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 6. Bilingual FAQs & Helpdesk */}
          <div 
            onClick={() => onNavigate('faqs')}
            className="group p-6 rounded-2xl bg-white border-2 border-stone-200 hover:border-kgp-crimson shadow-2xs hover:shadow-lg transition cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center mb-3 group-hover:scale-105 transition">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-kgp-crimson transition font-serif-title">
                Frequently Asked Questions
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Clear answers in English and বাংলা covering exams, eligibility, fee refunds, deferral policy, degree recognition, and LMS access.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-800">
              <span>Browse All Bilingual FAQs</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </section>

      {/* 4. COMPARISON TABLE: WHY IIT KHARAGPUR BS VS OTHERS (Matched to Reference PDF Page 11-12) */}
      <section className="w-full bg-stone-50 py-16 border-y border-stone-200">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-kgp-crimson bg-red-50 px-3.5 py-1 rounded-full border border-red-200">
              Comparative Analysis
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif-title">
              Why B.S. in DS &amp; AI from IIT Kharagpur?
            </h2>
            <p className="mt-3 text-slate-600 text-sm">
              See how our curriculum, credentials, and institutional backing compare against alternatives.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-900 text-white divide-x divide-slate-800">
                    <th className="py-4 px-6 font-bold uppercase tracking-wider text-[11px] w-2/5">
                      Parameter
                    </th>
                    <th className="py-4 px-6 font-bold uppercase tracking-wider text-[11px] text-amber-300 bg-slate-950 text-center w-1/5">
                      B.S. from IIT Kharagpur
                    </th>
                    <th className="py-4 px-6 font-bold uppercase tracking-wider text-[11px] text-slate-400 text-center w-1/5">
                      Other Online Degrees
                    </th>
                    <th className="py-4 px-6 font-bold uppercase tracking-wider text-[11px] text-slate-400 text-center w-1/5">
                      Traditional Programs
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  
                  <tr className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-6 font-bold text-slate-900">
                      Degree from a Premier Institute of National Importance (Estd. 1951)
                    </td>
                    <td className="py-3.5 px-6 text-center bg-amber-50/30">
                      <Check className="w-5 h-5 text-emerald-600 mx-auto" />
                    </td>
                    <td className="py-3.5 px-6 text-center text-slate-400">
                      <X className="w-4 h-4 text-slate-400 mx-auto" />
                    </td>
                    <td className="py-3.5 px-6 text-center text-slate-400">
                      <X className="w-4 h-4 text-slate-400 mx-auto" />
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-6 font-bold text-slate-900">
                      AI &amp; Data Science directly integrated into core foundation
                    </td>
                    <td className="py-3.5 px-6 text-center bg-amber-50/30">
                      <Check className="w-5 h-5 text-emerald-600 mx-auto" />
                    </td>
                    <td className="py-3.5 px-6 text-center text-slate-500 font-medium">
                      Rarely
                    </td>
                    <td className="py-3.5 px-6 text-center text-slate-400">
                      <X className="w-4 h-4 text-slate-400 mx-auto" />
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-6 font-bold text-slate-900">
                      Live interaction &amp; doubt-clearing sessions with IIT faculty &amp; mentors
                    </td>
                    <td className="py-3.5 px-6 text-center bg-amber-50/30">
                      <Check className="w-5 h-5 text-emerald-600 mx-auto" />
                    </td>
                    <td className="py-3.5 px-6 text-center text-slate-400">
                      <X className="w-4 h-4 text-slate-400 mx-auto" />
                    </td>
                    <td className="py-3.5 px-6 text-center text-slate-400">
                      <X className="w-4 h-4 text-slate-400 mx-auto" />
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-6 font-bold text-slate-900">
                      Recognised NEP 2020 credentials at every stage (Certificate, Diploma, B.Sc., BS)
                    </td>
                    <td className="py-3.5 px-6 text-center bg-amber-50/30">
                      <Check className="w-5 h-5 text-emerald-600 mx-auto" />
                    </td>
                    <td className="py-3.5 px-6 text-center text-slate-400">
                      <X className="w-4 h-4 text-slate-400 mx-auto" />
                    </td>
                    <td className="py-3.5 px-6 text-center text-slate-500 font-medium">
                      Partially
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-6 font-bold text-slate-900">
                      Physical on-campus immersion on the 2,100-acre Kharagpur campus
                    </td>
                    <td className="py-3.5 px-6 text-center bg-amber-50/30">
                      <Check className="w-5 h-5 text-emerald-600 mx-auto" />
                    </td>
                    <td className="py-3.5 px-6 text-center text-slate-400">
                      <X className="w-4 h-4 text-slate-400 mx-auto" />
                    </td>
                    <td className="py-3.5 px-6 text-center text-slate-400">
                      <X className="w-4 h-4 text-slate-400 mx-auto" />
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-6 font-bold text-slate-900">
                      Permanent IIT Kharagpur Alumni membership upon degree completion
                    </td>
                    <td className="py-3.5 px-6 text-center bg-amber-50/30">
                      <Check className="w-5 h-5 text-emerald-600 mx-auto" />
                    </td>
                    <td className="py-3.5 px-6 text-center text-slate-400">
                      <X className="w-4 h-4 text-slate-400 mx-auto" />
                    </td>
                    <td className="py-3.5 px-6 text-center text-slate-400">
                      <X className="w-4 h-4 text-slate-400 mx-auto" />
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-6 font-bold text-slate-900">
                      Flexible self-paced schedule for working professionals &amp; concurrent degree students
                    </td>
                    <td className="py-3.5 px-6 text-center bg-amber-50/30">
                      <Check className="w-5 h-5 text-emerald-600 mx-auto" />
                    </td>
                    <td className="py-3.5 px-6 text-center">
                      <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                    </td>
                    <td className="py-3.5 px-6 text-center text-slate-400">
                      <X className="w-4 h-4 text-slate-400 mx-auto" />
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-6 font-bold text-slate-900">
                      No mandatory JEE Advanced rank required (Universal Qualifier pathway)
                    </td>
                    <td className="py-3.5 px-6 text-center bg-amber-50/30">
                      <Check className="w-5 h-5 text-emerald-600 mx-auto" />
                    </td>
                    <td className="py-3.5 px-6 text-center">
                      <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                    </td>
                    <td className="py-3.5 px-6 text-center text-slate-400">
                      <X className="w-4 h-4 text-slate-400 mx-auto" />
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* 5. ADMISSION ACTION CALLOUT STRIP */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-kgp-darkred rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl text-center md:text-left">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">
              Admissions Open • Academic Year 2026–27
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-serif-title mt-2 leading-tight">
              Begin Your IIT Kharagpur Journey Today
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              Register for the Qualifier Examination or enter directly through WBJEE, JEE Advanced, or Tripura JEE credentials.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 flex-shrink-0">
            <button
              onClick={onOpenQualifier}
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Apply for Qualifier Exam</span>
            </button>

            <button
              onClick={onOpenSignUp}
              className="px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <span>Direct Entry Sign Up</span>
              <ArrowRight className="w-4 h-4 text-kgp-crimson" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
