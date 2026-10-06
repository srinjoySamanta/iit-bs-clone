import React, { useState } from 'react';
import { 
  GraduationCap, Award, BookOpen, Layers, CheckCircle2, 
  ArrowRight, ShieldCheck, Sparkles, Building2, Users, FileText, 
  HelpCircle, Phone, ExternalLink, Calendar, MapPin, Check, X, 
  ChevronDown, ChevronUp, Download, Clock, Laptop, Compass, HeartHandshake
} from 'lucide-react';
import iitKgpLogo from '../assets/logo';
import { IIT_KGP_INFO } from '../data/portalData';

export default function HomeOverview({ 
  onNavigate, 
  onOpenCertificate, 
  onOpenHowToApply, 
  onOpenQualifier, 
  onOpenSignUp 
}) {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: "Is this BS Degree an authentic undergraduate degree awarded by IIT Kharagpur?",
      a: "Yes. The 4-Year Bachelor of Science (BS) in Data Science & Artificial Intelligence is an authentic undergraduate degree approved by the Senate of IIT Kharagpur, UGC, and the Ministry of Education (MoE). Graduates receive full lifelong IIT Kharagpur Alumni Status and are invited to the physical convocation."
    },
    {
      q: "Is JEE Advanced mandatory to join this programme?",
      a: "No. While students with valid WBJEE, JEE Advanced, or Tripura JEE ranks receive direct admission exemptions, all other candidates can enter via the Universal Qualifier Examination. Any candidate with Class 12 Mathematics can register without any JEE cutoff."
    },
    {
      q: "Can I pursue this BS Degree along with another offline college degree or full-time job?",
      a: "Yes! Aligned with NEP 2020 guidelines, UGC permits pursuing two degrees simultaneously (one online and one on-campus). The curriculum is designed with flexible asynchronous learning, recorded lectures, weekend doubt-clearing sessions, and proctored examinations."
    },
    {
      q: "Are fee waivers or scholarships available?",
      a: "Yes. IIT Kharagpur offers up to 75% fee waivers for eligible candidates belonging to SC / ST / PwD categories and families with annual family income below ₹1 Lakh, and 50% waivers for income between ₹1 Lakh and ₹5 Lakhs."
    },
    {
      q: "How are examinations conducted?",
      a: "Weekly assignments and quizzes are conducted online through the Student Portal LMS. Comprehensive end-of-semester final examinations are in-person proctored exams held at designated TCS iON / NPTEL examination centers across 100+ cities in India."
    }
  ];

  return (
    <div className="w-full space-y-20 sm:space-y-28 py-10 bg-white text-slate-900 font-sans">
      
      {/* 1. PROGRAMME HIGHLIGHTS (#programme-highlights) */}
      <section id="programme-highlights" className="scroll-mt-[120px] w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-kgp-crimson bg-red-50 px-3.5 py-1 rounded-full border border-red-200">
            Institutional Excellence
          </span>
          <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold text-slate-950 font-serif-title">
            Programme Highlights
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Engineered by the Center for Educational Technology (CET) at India's first Indian Institute of Technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200 hover:border-kgp-crimson shadow-xs hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-red-100 text-kgp-crimson flex items-center justify-center mb-4">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5 font-serif-title">
              Degree from IIT Kharagpur
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Receive a prestigious 4-Year Bachelor of Science (BS) degree in Data Science &amp; AI from India's first and premier IIT (Estd. 1951).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200 hover:border-amber-500 shadow-xs hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5 font-serif-title">
              Lifelong Alumni Status
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Obtain lifetime IIT Kharagpur Alumni membership, official Institute Alumni Card, and lifelong institutional email credentials upon degree completion.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200 hover:border-blue-500 shadow-xs hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center mb-4">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5 font-serif-title">
              Modular NEP 2020 Exits
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Flexible multi-tier exits: Foundation Certificate (Year 1), Double Diplomas (Year 2), B.Sc. Degree (Year 3), and 4-Year BS Degree with honours.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200 hover:border-emerald-500 shadow-xs hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5 font-serif-title">
              Universal Qualifier Entry
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              No mandatory JEE rank cutoff. Open to anyone who completed Class 12 with Mathematics through a structured 4-week qualifier framework.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CURRICULUM OVERVIEW ROADMAP (#curriculum-overview) */}
      <section id="curriculum-overview" className="scroll-mt-[120px] w-full bg-[#F8FAFC] py-16 border-y border-slate-200">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-100 px-3.5 py-1 rounded-full border border-amber-300">
              Curriculum Architecture
            </span>
            <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold text-slate-950 font-serif-title">
              4-Year Modular Curriculum Overview
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              142 Credits structured systematically from computational foundations to frontier Agentic AI and industrial capstone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Level 1: Foundation */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Year 1 • 32 Credits
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-2 font-serif-title">
                  Foundation Level
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Exit Credential: <strong className="text-slate-800">Certificate in Computing</strong>
                </p>
                <ul className="mt-4 space-y-1.5 text-xs text-slate-600">
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> Python Programming</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> Linear Algebra &amp; Calculus</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> Computational Thinking</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> Statistics &amp; Probability</li>
                </ul>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 text-[11px] font-bold text-emerald-800">
                Foundational Math &amp; Code
              </div>
            </div>

            {/* Level 2: Diplomas */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-sky-700 uppercase tracking-wider bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                  Year 2 • 62 Credits
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-2 font-serif-title">
                  Diploma Level
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Exit Credential: <strong className="text-slate-800">Dual Diplomas (Prog &amp; DS)</strong>
                </p>
                <ul className="mt-4 space-y-1.5 text-xs text-slate-600">
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-sky-600" /> Data Structures &amp; Algorithms</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-sky-600" /> Database Management (DBMS)</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-sky-600" /> Machine Learning Foundations</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-sky-600" /> Big Data Tools &amp; Pipelines</li>
                </ul>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 text-[11px] font-bold text-sky-800">
                Core Data Science Rigour
              </div>
            </div>

            {/* Level 3: BSc Degree */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                  Year 3 • 114 Credits
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-2 font-serif-title">
                  B.Sc. Degree Level
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Exit Credential: <strong className="text-slate-800">B.Sc. in Applied Data Science</strong>
                </p>
                <ul className="mt-4 space-y-1.5 text-xs text-slate-600">
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-purple-600" /> Deep Learning &amp; Neural Nets</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-purple-600" /> Computer Vision &amp; NLP</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-purple-600" /> Cloud Computing &amp; MLOps</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-purple-600" /> Business Analytics &amp; Strategy</li>
                </ul>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 text-[11px] font-bold text-purple-800">
                Undergraduate Degree Tier
              </div>
            </div>

            {/* Level 4: 4-Year BS Degree */}
            <div className="bg-white rounded-2xl p-6 border-2 border-kgp-crimson shadow-md flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-kgp-crimson text-white text-[9px] font-bold uppercase tracking-widest px-3 py-0.5 rounded-bl-lg">
                Flagship
              </div>
              <div>
                <span className="text-[10px] font-bold text-kgp-crimson uppercase tracking-wider bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200">
                  Year 4 • 142 Credits
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-2 font-serif-title">
                  4-Year BS Degree
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Final Credential: <strong className="text-kgp-crimson">BS in Data Science &amp; AI</strong>
                </p>
                <ul className="mt-4 space-y-1.5 text-xs text-slate-600">
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-kgp-crimson" /> Generative &amp; Agentic AI</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-kgp-crimson" /> Autonomous Robotic Systems</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-kgp-crimson" /> Capstone Industrial Thesis</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-kgp-crimson" /> Lifelong KGP Alumni Card</li>
                </ul>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 text-[11px] font-bold text-kgp-crimson">
                Full Alumni Status &amp; Convocation
              </div>
            </div>

          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => onNavigate('structure')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md transition cursor-pointer"
            >
              <span>View Full 142 Credits Detailed Syllabus Roadmap</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. HOW WILL YOU LEARN (#how-will-you-learn) */}
      <section id="how-will-you-learn" className="scroll-mt-[120px] w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
            Pedagogy &amp; Delivery
          </span>
          <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold text-slate-950 font-serif-title">
            How Will You Learn?
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            A scientifically validated hybrid delivery model combining self-paced flexibility with in-person academic rigour.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mb-3">
              <Laptop className="w-5 h-5 text-kgp-crimson" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Recorded Video Modules</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              High-definition asynchronous video lectures delivered directly by distinguished IIT Kharagpur faculty members.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mb-3">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Live TA Mentorship</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Weekly live interactive doubt-clearing sessions and hands-on coding labs conducted in English and Bengali.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">In-Person Proctored Exams</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Semester exams conducted offline in designated proctored centers across 100+ cities in India to ensure credential integrity.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mb-3">
              <Building2 className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Annual Campus Immersion</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              On-campus workshops, annual technology immersion, Central Library access, and convocation at the 2,100-acre Kharagpur campus.
            </p>
          </div>
        </div>
      </section>

      {/* 4. WHO SHOULD APPLY (#who-should-apply) */}
      <section id="who-should-apply" className="scroll-mt-[120px] w-full bg-[#F8FAFC] py-16 border-y border-slate-200">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-800 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
              Audience Personas
            </span>
            <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold text-slate-950 font-serif-title">
              Who Should Apply?
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              The BS in Data Science &amp; AI is architected for learners at various career and academic crossroads.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[10px] font-bold text-kgp-crimson uppercase tracking-wider bg-red-50 px-2.5 py-0.5 rounded-full">
                Track 1
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-2 font-serif-title">
                Class 12 / 10+2 Graduates
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Students who completed Class 12 with Mathematics and English who aspire to graduate with an elite IIT undergraduate degree without the constraints of traditional JEE rank quotas.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider bg-blue-50 px-2.5 py-0.5 rounded-full">
                Track 2
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-2 font-serif-title">
                Concurrent Degree Students
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                College students enrolled in engineering, science, or commerce degrees who want to pursue a concurrent BS degree from IIT Kharagpur under the NEP 2020 dual-degree framework.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-full">
                Track 3
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-2 font-serif-title">
                Working Professionals
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Software developers, business analysts, and corporate professionals aiming to future-proof their careers by earning a verified degree in modern AI, Deep Learning, and MLOps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ADMISSION PROCESS & ELIGIBILITY (#admission-process & #eligibility) */}
      <section id="admission-process" className="scroll-mt-[120px] w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-kgp-crimson bg-red-50 px-3.5 py-1 rounded-full border border-red-200">
            Transparent Selection
          </span>
          <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold text-slate-950 font-serif-title">
            Admission Process &amp; Dual Pathways
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Equal opportunity admissions with merit-based verification and direct entry exemptions.
          </p>
        </div>

        {/* 4 Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-12">
          <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center mb-3">
              1
            </div>
            <h4 className="text-sm font-bold text-slate-900">Online Registration</h4>
            <p className="text-xs text-slate-600 mt-1">Submit basic profile details, Class 10/12 marksheets, and choose your preferred pathway.</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center mb-3">
              2
            </div>
            <h4 className="text-sm font-bold text-slate-900">Qualifier / Direct Route</h4>
            <p className="text-xs text-slate-600 mt-1">Complete the 4-week qualifier preparation or submit your WBJEE / JEE Adv rank card for direct admission.</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center mb-3">
              3
            </div>
            <h4 className="text-sm font-bold text-slate-900">Qualifier Exam / Verification</h4>
            <p className="text-xs text-slate-600 mt-1">Take the in-person Qualifier Examination or undergo direct institutional document scrutiny.</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200 bg-amber-50/60">
            <div className="w-8 h-8 rounded-full bg-kgp-crimson text-white font-bold text-xs flex items-center justify-center mb-3">
              4
            </div>
            <h4 className="text-sm font-bold text-slate-900">Formal Admission Offer</h4>
            <p className="text-xs text-slate-600 mt-1">Receive official IIT Kharagpur admission letter, student roll number, and LMS portal credentials.</p>
          </div>
        </div>

        {/* Direct Pathway Callout (#eligibility) */}
        <div id="eligibility" className="scroll-mt-[120px] bg-white rounded-2xl p-6 sm:p-8 border-2 border-emerald-500/40 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
              Direct Admission Pathways
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-serif-title text-slate-950 mt-2">
              Qualified in WBJEE, JEE Advanced, or Tripura JEE?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 max-w-2xl">
              Candidates with qualifying rank cards are granted complete exemption from the Qualifier Exam and receive direct admission into the Foundation Level.
            </p>
          </div>
          <button
            onClick={onOpenSignUp}
            className="px-6 py-3 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow-md transition whitespace-nowrap cursor-pointer"
          >
            Apply for Direct Admission
          </button>
        </div>
      </section>

      {/* 6. FEES STRUCTURE & WAIVERS (#fees-structure) */}
      <section id="fees-structure" className="scroll-mt-[120px] w-full bg-[#F8FAFC] py-16 border-y border-slate-200">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-100 px-3.5 py-1 rounded-full border border-amber-300">
              Affordable Education
            </span>
            <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold text-slate-950 font-serif-title">
              Fees Structure &amp; Up to 75% Scholarships
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              Pay-per-credit modular fee structure. Pay only for the subjects you register in each semester.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-xs">
              <div className="text-xs text-slate-500 font-bold uppercase">Foundation Level</div>
              <div className="text-xl font-extrabold text-slate-900 mt-1">₹32,000</div>
              <div className="text-[11px] text-slate-500 mt-0.5">8 Foundation Courses (32 cr)</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-xs">
              <div className="text-xs text-slate-500 font-bold uppercase">Diploma Level</div>
              <div className="text-xl font-extrabold text-slate-900 mt-1">₹94,500</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Programming &amp; DS (62 cr)</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-xs">
              <div className="text-xs text-slate-500 font-bold uppercase">B.Sc. Degree Level</div>
              <div className="text-xl font-extrabold text-slate-900 mt-1">₹1,14,000</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Core Degree Courses (114 cr)</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border-2 border-kgp-crimson text-center shadow-xs bg-red-50/20">
              <div className="text-xs text-kgp-crimson font-bold uppercase">4-Year BS Degree Total</div>
              <div className="text-xl font-extrabold text-kgp-crimson mt-1">~₹3,15,000</div>
              <div className="text-[11px] text-slate-600 mt-0.5">Full 142 Credits Degree</div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => onNavigate('fees')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-kgp-crimson hover:bg-kgp-darkred text-white font-bold text-xs sm:text-sm shadow-md transition cursor-pointer"
            >
              <Award className="w-4 h-4 text-amber-300" />
              <span>Open Real-Time Fee &amp; Scholarship Calculator</span>
            </button>
          </div>
        </div>
      </section>

      {/* 7. WHY THIS COURSE / COMPARISON TABLE (#how-is-this-course-different) */}
      <section id="how-is-this-course-different" className="scroll-mt-[120px] w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-kgp-crimson bg-red-50 px-3.5 py-1 rounded-full border border-red-200">
            Comparative Benchmark
          </span>
          <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold text-slate-950 font-serif-title">
            Why B.S. in DS &amp; AI from IIT Kharagpur?
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            See how our curriculum, credentials, and institutional backing compare against alternative paths.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-900 text-white divide-x divide-slate-800">
                  <th className="py-4 px-6 font-bold uppercase tracking-wider text-[11px] w-2/5">
                    Feature Parameter
                  </th>
                  <th className="py-4 px-6 font-bold uppercase tracking-wider text-[11px] text-amber-300 bg-slate-950 text-center w-1/5">
                    B.S. from IIT Kharagpur
                  </th>
                  <th className="py-4 px-6 font-bold uppercase tracking-wider text-[11px] text-slate-400 text-center w-1/5">
                    Other Online Degrees
                  </th>
                  <th className="py-4 px-6 font-bold uppercase tracking-wider text-[11px] text-slate-400 text-center w-1/5">
                    Traditional Offline Colleges
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="hover:bg-slate-50/70 transition">
                  <td className="py-3.5 px-6 font-bold text-slate-900">
                    Degree from India's Premier IIT of National Importance (Estd. 1951)
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
                    Permanent IIT Kharagpur Alumni Status &amp; Convocation Invitation
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
                    NEP 2020 Multi-Level Exit Milestones (Cert, Diploma, BSc, BS)
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
                    Universal Qualifier (No JEE Rank Cutoff Required)
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
      </section>

      {/* 8. ABOUT INSTITUTE (#about-institute) */}
      <section id="about-institute" className="scroll-mt-[120px] w-full bg-[#F8FAFC] py-16 border-y border-slate-200">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-700 bg-slate-200 px-3.5 py-1 rounded-full">
              Heritage &amp; Pedigree
            </span>
            <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold text-slate-950 font-serif-title">
              About IIT Kharagpur
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              Estd. 1951 • The first, largest, and mother institute of the prestigious Indian Institute of Technology system.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div className="text-3xl sm:text-4xl font-extrabold text-kgp-crimson">1951</div>
              <div className="text-xs text-slate-600 mt-1 font-semibold">Established at Hijli Camp</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900">2,100</div>
              <div className="text-xs text-slate-600 mt-1 font-semibold">Acres Green Campus</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900">70,000+</div>
              <div className="text-xs text-slate-600 mt-1 font-semibold">Global Alumni Leaders</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-600">Top 5</div>
              <div className="text-xs text-slate-600 mt-1 font-semibold">NIRF National Rank</div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FREQUENTLY ASKED QUESTIONS (#faqs) */}
      <section id="faqs" className="scroll-mt-[120px] w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-800 bg-sky-50 px-3.5 py-1 rounded-full border border-sky-200">
            Support &amp; Answers
          </span>
          <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold text-slate-950 font-serif-title">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-2xs">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-xs sm:text-sm hover:text-kgp-crimson transition cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 flex-shrink-0" />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 10. CONTACT DETAILS (#contact-us) */}
      <section id="contact-us" className="scroll-mt-[120px] w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">
              BS Programme Office
            </span>
            <h3 className="text-2xl font-bold font-serif-title">
              Have Questions? Reach Out to Our Helpdesk
            </h3>
            <p className="text-xs text-slate-300">
              Center for Educational Technology (CET), IIT Kharagpur, Paschim Medinipur, West Bengal - 721302
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-slate-300 pt-2">
              <div className="flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>{IIT_KGP_INFO.helpline}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-sky-400" />
                <span>{IIT_KGP_INFO.email}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 flex-shrink-0">
            <a
              href="#institutional-gateways"
              className="px-6 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition cursor-pointer"
            >
              Institutional Logins ↓
            </a>
            <button
              onClick={onOpenSignUp}
              className="px-6 py-3.5 rounded-full bg-kgp-crimson hover:bg-kgp-darkred text-white font-bold text-xs sm:text-sm shadow-md transition cursor-pointer"
            >
              Apply Now
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
