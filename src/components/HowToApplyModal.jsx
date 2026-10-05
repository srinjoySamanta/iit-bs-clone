import React from 'react';
import { 
  X, CheckCircle2, FileText, ArrowRight, User, GraduationCap, 
  UploadCloud, ShieldCheck, CreditCard, Mail, Phone, Calendar, 
  HelpCircle, AlertCircle, Sparkles, Building, ExternalLink 
} from 'lucide-react';

export default function HowToApplyModal({ isOpen, onClose, onStartApplication }) {
  if (!isOpen) return null;

  const STEPS = [
    {
      num: "01",
      title: "Applicant Profile Creation",
      icon: User,
      color: "from-blue-600 to-indigo-600",
      details: [
        "First Name & Last Name (identical to Class 10 marksheet).",
        "Birthday: dd-mm-yyyy (Minimum 15 years of age required as on application date).",
        "Age Proof: Dropdown selection (Birth Certificate / Class 10 Admit Card) with scanned upload.",
        "Address: Permanent and present communication address with PIN code.",
        "Mail ID: Verified via real-time One Time Password (OTP).",
        "Mobile Number: Country ISD code + exact 10 digits with OTP verification.",
        "Category: GEN / SC / ST / OBC-NCL / EWS (Upload valid certificate for fee & cutoff concessions).",
        "PwD Status: Upload disability certificate if 40% or more.",
        "Guardian details, relation, emergency contact & annual family income slab."
      ]
    },
    {
      num: "02",
      title: "Educational Qualifications & Entry Pathway",
      icon: GraduationCap,
      color: "from-emerald-600 to-teal-600",
      details: [
        "Highest Qualification Selection: Class 10 or Higher (Class 12 / Diploma / Bachelor's / Master's).",
        "Marks Entry: Board name, year of passing, marks obtained & total marks.",
        "Direct Admission Selection (Optional waiver of Qualifier Exam):",
        "• Valid WBJEE Rank Card & Roll Number, OR",
        "• Qualified to appear in JEE Advanced in last 2 years, OR",
        "• Valid Tripura JEE Rank Card.",
        "Candidates without Direct Entry automatically appear for the Regular Qualifier Round Examination."
      ]
    },
    {
      num: "03",
      title: "Document & Photo Upload",
      icon: UploadCloud,
      color: "from-amber-600 to-orange-600",
      details: [
        "Passport Photo: Recent colour photograph in .jpg or .png format.",
        "Signature: Clear signature on plain white paper in .jpg or .png format.",
        "Marksheets: Class 10 / Class 12 / Degree Marksheet PDF or high-res image.",
        "Category / PwD Certificate: Government authorized document (if claiming concession).",
        "Save & Freeze: Review previews and freeze documents before moving to payment."
      ]
    },
    {
      num: "04",
      title: "Candidate Undertaking & Declaration",
      icon: ShieldCheck,
      color: "from-purple-600 to-indigo-600",
      details: [
        "Confirmation of accuracy of all academic and personal records.",
        "Acceptance of IIT Kharagpur online degree honor code and conduct policies.",
        "Acknowledgement that name on Class 10 marksheet will appear on final degree certificate."
      ]
    },
    {
      num: "05",
      title: "Fee Payment & Instant Confirmation",
      icon: CreditCard,
      color: "from-kgp-crimson to-red-800",
      details: [
        "Application / Qualifier Exam Fee payment via secure gateway (UPI, Netbanking, Cards).",
        "Automatic Fee Waivers applied for SC / ST / PwD / Low-income candidates.",
        "Instant Application Confirmation Email dispatched to verified email address.",
        "After verification: Login ID + Password + Course Registration Card issued."
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-kgp-crimson via-red-900 to-slate-900 text-white p-5 sm:p-6 flex items-start justify-between gap-4 flex-shrink-0">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-bold uppercase tracking-wider mb-2 border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Application Guide • BS Programme</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif-title">
              How to Apply: Complete Step-by-Step Instructions
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Standard operating procedure for Profile Creation, Eligibility Verification, Document Upload, and Admission Confirmation as per IIT Kharagpur guidelines.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition flex-shrink-0"
            title="Close Guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body - Scrollable */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6 flex-1 bg-slate-50/50">
          
          {/* Quick Notice Banner */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 leading-relaxed">
              <span className="font-bold">Important Eligibility Requirement:</span> Candidates must be at least <strong>15 years of age</strong> as on the application date. Minimum qualification is Class 10 with Mathematics. Direct entry options are available for valid <strong>WBJEE</strong>, <strong>JEE Advanced</strong> qualifiers, and <strong>Tripura JEE</strong> rank holders.
            </div>
          </div>

          {/* 5-Step Process Cards */}
          <div className="space-y-4">
            {STEPS.map((step) => {
              const IconComp = step.icon;
              return (
                <div 
                  key={step.num}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-slate-300 transition"
                >
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-r ${step.color} text-white font-bold flex items-center justify-center text-xs shadow-xs flex-shrink-0`}>
                      {step.num}
                    </div>
                    <div className="flex items-center gap-2">
                      <IconComp className="w-4 h-4 text-slate-600" />
                      <h3 className="text-sm sm:text-base font-bold text-slate-900">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  <ul className="mt-3.5 space-y-1.5 text-xs text-slate-600 pl-2">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-kgp-crimson flex-shrink-0 mt-1.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Help & Support note */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
            <div>
              <span className="font-bold text-slate-800">Need Assistance? </span>
              <span>Contact Admissions Cell at <strong>bs-admissions@iitkgp.ac.in</strong> or helpline <strong>+91 (03222) 282000</strong>.</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">IIT Kharagpur Helpdesk</span>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs transition"
          >
            Close Guide
          </button>

          <button
            onClick={() => {
              onClose();
              if (onStartApplication) onStartApplication();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-kgp-crimson to-red-800 hover:from-kgp-darkred hover:to-kgp-crimson text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
          >
            <span>Proceed to Registration Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
