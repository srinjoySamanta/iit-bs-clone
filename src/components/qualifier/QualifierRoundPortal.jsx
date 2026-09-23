import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle2, CreditCard, ArrowRight, ArrowLeft, ShieldCheck, 
  Award, QrCode, FileText, Lock, ChevronRight, ChevronLeft,
  Check, AlertCircle, Building, BookOpen, MapPin, Calendar, 
  Printer, Info, AlertTriangle, RotateCcw, Upload, FileUp, 
  Camera, Briefcase, GraduationCap, Eye, Trash2, Sparkles
} from 'lucide-react';
import { IIT_KGP_INFO } from '../../data/portalData';
import iitKgpLogo from '../../assets/logo';

// All 23 Districts of West Bengal
const DISTRICTS_WEST_BENGAL = [
  "Paschim Medinipur (Kharagpur / Midnapore)",
  "Kolkata",
  "Howrah",
  "Hooghly",
  "North 24 Parganas",
  "South 24 Parganas",
  "Purba Medinipur",
  "Jhargram",
  "Bankura",
  "Purulia",
  "Birbhum",
  "Nadia",
  "Murshidabad",
  "Paschim Bardhaman (Asansol / Durgapur)",
  "Purba Bardhaman",
  "Malda",
  "Uttar Dinajpur (Raiganj)",
  "Dakshin Dinajpur (Balurghat)",
  "Jalpaiguri",
  "Alipurduar",
  "Cooch Behar",
  "Darjeeling (Siliguri)",
  "Kalimpong"
];

// All 8 Districts of Tripura
const DISTRICTS_TRIPURA = [
  "West Tripura (Agartala)",
  "Dhalai (Ambassa)",
  "Gomati (Udaipur)",
  "Khowai",
  "North Tripura (Dharmanagar)",
  "Sepahijala (Bishramganj)",
  "South Tripura (Belonia)",
  "Unakoti (Kailashahar)"
];

// State Options restricted strictly to West Bengal and Tripura
const EXAM_STATES = ["West Bengal", "Tripura"];

export default function QualifierRoundPortal({ initialCandidate, onStartExam, onBackToHome }) {
  // Wizard steps: 
  // 1 = Section 1: Personal Details
  // 2 = Section 2: Exam City Options
  // 3 = Section 3: File & Document Uploads
  // 4 = Review & Pay
  // 5 = Completed & CBT Engine
  const [section, setSection] = useState(1);
  const [formError, setFormError] = useState('');

  // Dynamically compute today's date in YYYY-MM-DD
  const todayDateString = new Date().toISOString().split('T')[0];

  // Master Form State
  const [formData, setFormData] = useState({
    // Section 1 of 3: Personal Details
    program: "BS in Data Science and Artificial Intelligence (AI)",
    fullName: (initialCandidate?.name || "SRINJOY SAMANTA").toUpperCase(),
    email: initialCandidate?.email || "",
    dob: "2002-10-25",
    gender: "Male",
    citizenship: "India",
    idType: "Aadhar Card",
    idNumber: "459976368473",
    category: "General",
    jeeAdvancedQualified: "No",
    isPwd: "No",
    isDefencePersonnel: "No",
    isWorkingProfessional: "No",
    class12Status: "Already completed/ Awaiting result",
    class12PassingYear: "2020",
    phoneCountryCode: "+91",
    phone: "7586948359",
    declarationPersonal: false,

    // Section 2 of 3: Exam City Options
    examCountry: "India",
    pref1State: "West Bengal",
    pref1City: "Paschim Medinipur (Kharagpur / Midnapore)",
    pref2State: "West Bengal",
    pref2City: "Kolkata",
    agreeExamCityTerms: false,

    // Section 3 of 3: Higher Secondary Selection (Option A: Class 12th vs Option B: Polytechnic Diploma)
    higherSecChoice: "class12", // 'class12' | 'diploma'

    // Document Files Registry
    docs: {
      photo: { uploaded: true, name: "passport_photo_applicant.jpg", size: "78 KB", type: "image/jpeg" },
      signature: { uploaded: true, name: "applicant_signature.jpg", size: "26 KB", type: "image/jpeg" },
      idProof: { uploaded: true, name: "aadhaar_card_scan.pdf", size: "450 KB", type: "application/pdf" },
      categoryCert: { uploaded: false, name: "", size: "", type: "" },
      pwdCert: { uploaded: false, name: "", size: "", type: "" },
      defenceCert: { uploaded: false, name: "", size: "" },
      jeeProof: { uploaded: false, name: "", size: "" },
      class10: { uploaded: true, name: "std_x_marksheet_certificate.pdf", size: "620 KB", type: "application/pdf" },
      class12: { uploaded: true, name: "std_xii_senior_secondary_marksheet.pdf", size: "840 KB", type: "application/pdf" },
      diplomaCert: { uploaded: false, name: "", size: "" },
      ugDegree: { uploaded: false, name: "", size: "" },
      pgDegree: { uploaded: false, name: "", size: "" },
      phdDegree: { uploaded: false, name: "", size: "" },
      employmentProof: { uploaded: false, name: "", size: "" }
    },

    // Generated Roll & Meta
    finalRollNo: "",
    applicationNo: ""
  });

  // Keep Google verified credentials in sync
  useEffect(() => {
    if (initialCandidate) {
      setFormData(prev => ({
        ...prev,
        fullName: prev.fullName || (initialCandidate.name || "").toUpperCase(),
        email: initialCandidate.email || prev.email
      }));
    }
  }, [initialCandidate]);

  // Fee calculation logic
  const isWaiverEligible = 
    formData.category === 'SC' || 
    formData.category === 'ST' || 
    formData.isPwd === 'Yes' || 
    formData.isDefencePersonnel === 'Yes';

  const isHalfWaiver = 
    formData.category === 'EWS' || 
    formData.category === 'OBC-NCL';

  let payableAmount = 1500;
  let feeWaiverText = "Standard Rate";

  if (isWaiverEligible) {
    payableAmount = 375; // 75% fee waiver
    feeWaiverText = "75% Fee Waiver Applied (SC/ST/PwD/Defence)";
  } else if (isHalfWaiver) {
    payableAmount = 750; // 50% fee waiver
    feeWaiverText = "50% Fee Waiver Applied (OBC-NCL/EWS)";
  }

  // Get cities based on selected state (West Bengal or Tripura)
  const getCitiesForState = (stateName) => {
    if (stateName === "Tripura") return DISTRICTS_TRIPURA;
    return DISTRICTS_WEST_BENGAL;
  };

  // Helper for simulated file upload on each document slot
  const handleFileUpload = (docKey, file) => {
    if (!file) return;
    const formattedSize = file.size > 1024 * 1024 
      ? (file.size / (1024 * 1024)).toFixed(1) + " MB" 
      : Math.round(file.size / 1024) + " KB";

    setFormData(prev => ({
      ...prev,
      docs: {
        ...prev.docs,
        [docKey]: {
          uploaded: true,
          name: file.name,
          size: formattedSize,
          type: file.type
        }
      }
    }));
  };

  // Pre-fill sample document attachments for testing
  const handlePreFillDocuments = () => {
    setFormData(prev => ({
      ...prev,
      docs: {
        photo: { uploaded: true, name: "passport_photo_applicant.jpg", size: "78 KB", type: "image/jpeg" },
        signature: { uploaded: true, name: "applicant_signature.jpg", size: "26 KB", type: "image/jpeg" },
        idProof: { uploaded: true, name: "aadhaar_card_scan.pdf", size: "450 KB", type: "application/pdf" },
        categoryCert: prev.category !== 'General' ? { uploaded: true, name: `category_certificate_${prev.category}.pdf`, size: "520 KB", type: "application/pdf" } : { uploaded: false, name: "", size: "" },
        pwdCert: prev.isPwd === 'Yes' ? { uploaded: true, name: "pwd_medical_board_certificate.pdf", size: "480 KB", type: "application/pdf" } : { uploaded: false, name: "", size: "" },
        defenceCert: prev.isDefencePersonnel === 'Yes' ? { uploaded: true, name: "defence_service_ward_proof.pdf", size: "390 KB", type: "application/pdf" } : { uploaded: false, name: "", size: "" },
        jeeProof: prev.jeeAdvancedQualified === 'Yes' ? { uploaded: true, name: "jee_advanced_admit_score.pdf", size: "340 KB", type: "application/pdf" } : { uploaded: false, name: "", size: "" },
        class10: { uploaded: true, name: "std_x_marksheet_certificate.pdf", size: "620 KB", type: "application/pdf" },
        class12: prev.higherSecChoice === 'class12' ? { uploaded: true, name: "std_xii_senior_secondary_marksheet.pdf", size: "840 KB", type: "application/pdf" } : { uploaded: false, name: "", size: "" },
        diplomaCert: prev.higherSecChoice === 'diploma' ? { uploaded: true, name: "polytechnic_diploma_certificate.pdf", size: "910 KB", type: "application/pdf" } : { uploaded: false, name: "", size: "" },
        ugDegree: { uploaded: false, name: "", size: "" },
        pgDegree: { uploaded: false, name: "", size: "" },
        phdDegree: { uploaded: false, name: "", size: "" },
        employmentProof: prev.isWorkingProfessional === 'Yes' ? { uploaded: true, name: "employer_noc_id_card.pdf", size: "420 KB", type: "application/pdf" } : { uploaded: false, name: "", size: "" }
      }
    }));
  };

  // Section 1 validation
  const handleProceedToSection2 = (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.fullName.trim()) {
      setFormError("Please enter Applicant's Full Name as per Class 10/12 marksheet.");
      return;
    }

    if (!formData.dob) {
      setFormError("Please select Date of Birth.");
      return;
    }

    if (formData.dob > todayDateString) {
      setFormError("Invalid Date of Birth: Date of birth cannot exceed today's date.");
      return;
    }

    const dobTime = new Date(formData.dob).getTime();
    const todayStart = new Date().setHours(0, 0, 0, 0);
    if (dobTime >= todayStart) {
      setFormError("Invalid Date of Birth: Date of birth cannot be today or in the future.");
      return;
    }

    if (!formData.idNumber.trim()) {
      setFormError("Please enter ID Number of the selected ID type.");
      return;
    }

    if (!formData.phone.trim()) {
      setFormError("Please enter Mobile Phone number.");
      return;
    }

    if (!formData.declarationPersonal) {
      setFormError("Declaration Required: You must agree to the personal information declaration to proceed.");
      return;
    }

    setSection(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Section 2 validation
  const handleProceedToSection3 = (e) => {
    e.preventDefault();
    setFormError('');

    if (formData.pref1City === formData.pref2City && formData.pref1State === formData.pref2State) {
      setFormError("Exam City Conflict: Please select two different preferences for the Exam City. (Preference 1 and Preference 2 cannot be the same).");
      return;
    }

    if (!formData.agreeExamCityTerms) {
      setFormError("Exam City Agreement Required: You must read and agree to the exam centre allocation terms.");
      return;
    }

    setSection(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Section 3 (Documents) validation
  const handleProceedToReview = (e) => {
    e.preventDefault();
    setFormError('');

    // Check mandatory core documents
    if (!formData.docs.photo.uploaded) {
      setFormError("Missing Document: Please upload your recent passport-size photograph (50KB to 150KB).");
      return;
    }
    if (!formData.docs.signature.uploaded) {
      setFormError("Missing Document: Please upload your signature (4KB to 150KB).");
      return;
    }
    if (!formData.docs.idProof.uploaded) {
      setFormError("Missing Document: Please upload your Photo ID Card scan (50KB to 2MB).");
      return;
    }
    if (!formData.docs.class10.uploaded) {
      setFormError("Missing Document: Please upload your Class 10th / Secondary Marksheet & Certificate (50KB to 2MB).");
      return;
    }

    // Higher secondary validation (Class 12 or Diploma)
    if (formData.higherSecChoice === 'class12' && !formData.docs.class12.uploaded) {
      setFormError("Missing Document: Please upload your Class 12th / Senior Secondary Marksheet & Passing Certificate (50KB to 2MB).");
      return;
    }
    if (formData.higherSecChoice === 'diploma' && !formData.docs.diplomaCert.uploaded) {
      setFormError("Missing Document: Please upload your Diploma Completion Certificate & Marksheets (50KB to 2MB).");
      return;
    }

    // Conditional checks based on Section 1
    if (['SC', 'ST', 'OBC-NCL', 'EWS'].includes(formData.category) && !formData.docs.categoryCert.uploaded) {
      setFormError(`Missing Document: Category Certificate is mandatory for ${formData.category} candidates to avail fee waiver / cutoff relaxations.`);
      return;
    }
    if (formData.isPwd === 'Yes' && !formData.docs.pwdCert.uploaded) {
      setFormError("Missing Document: PwD Certificate (40% or more disability) is mandatory as indicated in Personal Details.");
      return;
    }
    if (formData.isDefencePersonnel === 'Yes' && !formData.docs.defenceCert.uploaded) {
      setFormError("Missing Document: Defence Personnel Ward / Disability Certificate is required as indicated in Personal Details.");
      return;
    }
    if (formData.jeeAdvancedQualified === 'Yes' && !formData.docs.jeeProof.uploaded) {
      setFormError("Missing Document: Proof of eligibility to write JEE Advanced is required as indicated in Personal Details.");
      return;
    }
    if (formData.isWorkingProfessional === 'Yes' && !formData.docs.employmentProof.uploaded) {
      setFormError("Missing Document: Employment Verification (Employee ID / Letter / NOC) is required for working professionals.");
      return;
    }

    const generatedAppNo = "IITKGP-BS-2026-" + Math.floor(100000 + Math.random() * 900000);
    setFormData(prev => ({ ...prev, applicationNo: generatedAppNo }));
    setSection(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset exam city preferences
  const handleResetCities = () => {
    setFormData(prev => ({
      ...prev,
      pref1State: "West Bengal",
      pref1City: DISTRICTS_WEST_BENGAL[0],
      pref2State: "West Bengal",
      pref2City: DISTRICTS_WEST_BENGAL[1],
      agreeExamCityTerms: false
    }));
    setFormError('');
  };

  // Complete Payment and generate final roll
  const handleCompletePayment = () => {
    const finalRoll = "KGP-QUAL-2026-" + Math.floor(1000 + Math.random() * 9000);
    setFormData(prev => ({ ...prev, finalRollNo: finalRoll }));
    setSection(5);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Document Upload Item Component for reusability & clean UI
  const DocUploadCard = ({ 
    docKey, 
    title, 
    specs, 
    requirementType = "Mandatory", 
    isConditional = false, 
    conditionalNote = "" 
  }) => {
    const docData = formData.docs[docKey] || { uploaded: false, name: "", size: "" };
    const fileInputRef = useRef(null);

    return (
      <div className={`p-4.5 rounded-2xl border-2 transition ${
        docData.uploaded 
          ? 'bg-emerald-50/40 border-emerald-300' 
          : requirementType === 'Mandatory' 
            ? 'bg-white border-slate-300 hover:border-kgp-crimson' 
            : 'bg-slate-50/60 border-slate-200'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <div>
            <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span>{title}</span>
              {requirementType === 'Mandatory' && (
                <span className="text-[10px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full">
                  Mandatory
                </span>
              )}
              {requirementType === 'Conditional' && (
                <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                  Required if Applicable
                </span>
              )}
              {requirementType === 'Optional' && (
                <span className="text-[10px] bg-slate-200 text-slate-600 font-bold px-2 py-0.5 rounded-full">
                  Optional
                </span>
              )}
            </div>
            <div className="text-[11px] text-slate-500 font-mono mt-0.5">{specs}</div>
            {conditionalNote && (
              <div className="text-[11px] text-amber-800 font-medium mt-0.5">{conditionalNote}</div>
            )}
          </div>

          {/* Upload Status Badge */}
          {docData.uploaded ? (
            <span className="w-fit text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5 flex-shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Attached ({docData.size})</span>
            </span>
          ) : (
            <span className="w-fit text-[10px] text-slate-400 font-semibold flex-shrink-0">
              Not Uploaded
            </span>
          )}
        </div>

        {/* File Actions */}
        <div className="pt-2 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => handleFileUpload(docKey, e.target.files[0])}
          />

          {docData.uploaded ? (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 truncate max-w-xs sm:max-w-md">
                <FileText className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="truncate">{docData.name}</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-[11px] text-kgp-crimson hover:underline font-bold px-2 py-1 rounded-md hover:bg-slate-100"
                >
                  Change File
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      docs: { ...prev.docs, [docKey]: { uploaded: false, name: "", size: "" } }
                    }));
                  }}
                  className="text-[11px] text-slate-400 hover:text-red-600 p-1 rounded-md transition"
                  title="Remove file"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              <span className="text-[11px] text-slate-400">Supported format within specified file size.</span>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3.5 py-1.5 bg-slate-900 hover:bg-kgp-crimson text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Document</span>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-slate-800 font-sans selection:bg-amber-500 selection:text-white pb-20">
      
      {/* 1. TOP NAVBAR */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white border border-slate-200 p-1 flex items-center justify-center shadow-xs flex-shrink-0">
              <img src={iitKgpLogo} alt="IIT KGP" className="w-8 h-8 object-contain" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-kgp-crimson uppercase tracking-wider">
                {IIT_KGP_INFO.hindiName}
              </div>
              <div className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <span>IIT Kharagpur BS Admissions Portal</span>
              </div>
            </div>
          </div>

          <button
            onClick={onBackToHome}
            className="px-3.5 py-1.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold transition"
          >
            Exit to Home
          </button>
        </div>
      </header>

      {/* 2. PROGRAM SUB-BANNER */}
      <div className="bg-[#800000] text-white py-3.5 px-4 sm:px-6 border-b-2 border-amber-400 shadow-sm">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 font-bold text-sm">
            <BookOpen className="w-4 h-4 text-amber-300" />
            <span>Online Application Form — Qualifier Round 2026</span>
          </div>
          <div className="text-amber-200 text-[11px] font-mono">
            IIT Kharagpur Admissions Desk
          </div>
        </div>
      </div>

      {/* 3. STEPPER PROGRESS TABS (4 Clean Steps) */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-2 flex items-center justify-between text-xs font-bold gap-1.5 overflow-x-auto">
          
          {/* Step 1 */}
          <button
            onClick={() => { if (section >= 1) setSection(1); }}
            className={`flex-1 py-2 px-2.5 rounded-xl flex items-center justify-center gap-1.5 transition ${
              section === 1 
                ? 'bg-kgp-crimson text-white shadow-xs' 
                : section > 1 
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                  : 'text-slate-400'
            }`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
              section === 1 ? 'bg-amber-400 text-slate-950 font-black' : section > 1 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
            }`}>
              {section > 1 ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : '1'}
            </span>
            <span className="truncate">1. Personal</span>
          </button>

          <ChevronRight className="w-3.5 h-3.5 text-slate-300 flex-shrink-0" />

          {/* Step 2 */}
          <button
            onClick={() => { if (section >= 2) setSection(2); }}
            className={`flex-1 py-2 px-2.5 rounded-xl flex items-center justify-center gap-1.5 transition ${
              section === 2 
                ? 'bg-kgp-crimson text-white shadow-xs' 
                : section > 2 
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                  : 'text-slate-400'
            }`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
              section === 2 ? 'bg-amber-400 text-slate-950 font-black' : section > 2 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
            }`}>
              {section > 2 ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : '2'}
            </span>
            <span className="truncate">2. Exam Cities</span>
          </button>

          <ChevronRight className="w-3.5 h-3.5 text-slate-300 flex-shrink-0" />

          {/* Step 3 (Newly Added: File & Document Uploads) */}
          <button
            onClick={() => { if (section >= 3) setSection(3); }}
            className={`flex-1 py-2 px-2.5 rounded-xl flex items-center justify-center gap-1.5 transition ${
              section === 3 
                ? 'bg-kgp-crimson text-white shadow-xs' 
                : section > 3 
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                  : 'text-slate-400'
            }`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
              section === 3 ? 'bg-amber-400 text-slate-950 font-black' : section > 3 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
            }`}>
              {section > 3 ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : '3'}
            </span>
            <span className="truncate">3. Document Uploads</span>
          </button>

          <ChevronRight className="w-3.5 h-3.5 text-slate-300 flex-shrink-0" />

          {/* Step 4 */}
          <button
            onClick={() => { if (section >= 4) setSection(4); }}
            className={`flex-1 py-2 px-2.5 rounded-xl flex items-center justify-center gap-1.5 transition ${
              section >= 4 ? 'bg-kgp-crimson text-white shadow-xs' : 'text-slate-400'
            }`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
              section >= 4 ? 'bg-amber-400 text-slate-950 font-black' : 'bg-slate-200 text-slate-600'
            }`}>
              4
            </span>
            <span className="truncate">Review &amp; Pay</span>
          </button>

        </div>
      </div>

      {/* 4. MAIN FORM WRAPPER */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        
        {/* Error Alert */}
        {formError && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-300 rounded-2xl text-xs text-red-800 flex items-start gap-3 shadow-xs animate-in fade-in">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-bold text-red-900">Please review the following before continuing:</div>
              <p className="leading-relaxed">{formError}</p>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 1 OF 3: PERSONAL DETAILS                                          */}
        {/* ========================================================================= */}
        {section === 1 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-7 animate-in fade-in">
            
            {/* Form Section Header */}
            <div className="border-b border-slate-200 pb-4">
              <div className="text-xs uppercase font-extrabold tracking-wider text-kgp-crimson">
                application form
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif-title text-slate-900 mt-0.5">
                Section 1 of 3: Personal Details
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                All fields marked with <span className="text-red-600 font-bold">*</span> are mandatory
              </p>
            </div>

            <form onSubmit={handleProceedToSection2} className="space-y-7 text-xs">
              
              {/* Field 1: Program */}
              <div className="space-y-1.5">
                <label className="block text-slate-800 font-bold text-sm">
                  Which is the program you are most likely to pursue? <span className="text-red-600">*</span>
                </label>
                <p className="text-[11px] text-slate-500">
                  You can change it later as per the allowed rules, if you wish.
                </p>
                <select
                  value={formData.program}
                  onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white font-semibold text-slate-800 text-sm focus:border-kgp-crimson focus:outline-none"
                >
                  <option value="BS in Data Science and Artificial Intelligence (AI)">BS in Data Science and Artificial Intelligence (AI)</option>
                  <option value="Diploma in Data Science and AI">Diploma in Data Science and AI</option>
                </select>
              </div>

              {/* Field 2: Applicant's Full Name (Only Capital Letters Allowed) */}
              <div className="space-y-1.5">
                <label className="block text-slate-800 font-bold text-sm">
                  Applicant's Full Name <span className="text-red-600">*</span>
                </label>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Name should be identical to the Name list on the Std X/Std XII marksheet. This name will be used on your final degree certificate, and no change is possible on this. <strong>Only Capital letters are allowed.</strong>
                </p>
                <input
                  type="text"
                  required
                  placeholder="SRINJOY SAMANTA"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value.toUpperCase() })}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 focus:border-kgp-crimson focus:outline-none text-sm font-bold uppercase tracking-wide transition"
                />
              </div>

              {/* Field 3: Date of Birth & Gender & Country */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                
                {/* DOB with max restriction */}
                <div className="space-y-1.5">
                  <label className="block text-slate-800 font-bold">
                    Date of Birth <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    max={todayDateString}
                    min="1940-01-01"
                    value={formData.dob}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val > todayDateString) {
                        setFormError("Invalid Date of Birth: Date of birth cannot exceed today's date.");
                        return;
                      }
                      setFormError('');
                      setFormData({ ...formData, dob: val });
                    }}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-kgp-crimson focus:outline-none text-sm font-semibold transition"
                  />
                  <p className="text-[10px] text-slate-400">Must not exceed today's date.</p>
                </div>

                {/* Gender */}
                <div className="space-y-1.5">
                  <label className="block text-slate-800 font-bold">
                    Gender <span className="text-red-600">*</span>
                  </label>
                  <div className="flex items-center gap-4 pt-2">
                    {["Male", "Female", "Other"].map((g) => (
                      <label key={g} className="flex items-center gap-1.5 cursor-pointer font-medium text-slate-700">
                        <input
                          type="radio"
                          name="gender"
                          value={g}
                          checked={formData.gender === g}
                          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                          className="text-kgp-crimson focus:ring-kgp-crimson"
                        />
                        <span>{g}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Country of Citizenship (Fixed to India) */}
                <div className="space-y-1.5">
                  <label className="block text-slate-800 font-bold">
                    Country of Citizenship <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    readOnly
                    value="India"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-100 text-slate-800 text-sm font-bold cursor-not-allowed select-none"
                  />
                  <p className="text-[10px] text-slate-400">Fixed (India)</p>
                </div>
              </div>

              {/* Field 4: ID Type & ID Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <div className="space-y-1.5">
                  <label className="block text-slate-800 font-bold">
                    ID Type <span className="text-red-600">*</span>
                  </label>
                  <p className="text-[11px] text-slate-500">
                    ID selected here will need to be uploaded for verification.
                  </p>
                  <select
                    value={formData.idType}
                    onChange={(e) => setFormData({ ...formData, idType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white font-medium text-sm"
                  >
                    <option value="Aadhar Card">Aadhar Card</option>
                    <option value="PAN Card">PAN Card</option>
                    <option value="Passport">Passport</option>
                    <option value="Voter ID">Voter ID</option>
                    <option value="Driving License">Driving License</option>
                    <option value="Government Photo ID">Other Government ID with photo</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-slate-800 font-bold">
                    ID Number <span className="text-red-600">*</span>
                  </label>
                  <p className="text-[11px] text-slate-500">
                    ID number of the ID selected above.
                  </p>
                  <input
                    type="text"
                    required
                    placeholder="459976368473"
                    value={formData.idNumber}
                    onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 font-mono text-sm font-bold"
                  />
                </div>
              </div>

              {/* Field 5: Category */}
              <div className="space-y-1.5">
                <label className="block text-slate-800 font-bold text-sm">
                  Category <span className="text-red-600">*</span>
                </label>
                <p className="text-[11px] text-slate-500">
                  If selecting SC / ST / EWS / OBC-NCL please upload relevant documents to avail waivers in fee / cut-off scores.
                </p>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full sm:w-1/2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white font-semibold text-sm"
                >
                  <option value="General">General</option>
                  <option value="OBC-NCL">OBC-NCL</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                  <option value="EWS">EWS</option>
                </select>
              </div>

              {/* Field 6: JEE Advanced */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                <label className="block text-slate-800 font-bold">
                  Did you qualify to appear for JEE Advanced in last 2 years? <span className="text-red-600">*</span>
                </label>
                <p className="text-[11px] text-slate-500">
                  If selecting "yes", please upload relevant document in the document upload section.
                </p>
                <div className="flex items-center gap-6 pt-1">
                  {["Yes", "No"].map((choice) => (
                    <label key={choice} className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
                      <input
                        type="radio"
                        name="jeeAdvanced"
                        value={choice}
                        checked={formData.jeeAdvancedQualified === choice}
                        onChange={(e) => setFormData({ ...formData, jeeAdvancedQualified: e.target.value })}
                        className="text-kgp-crimson focus:ring-kgp-crimson"
                      />
                      <span>{choice}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Field 7: Person with Disabilities */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                <label className="block text-slate-800 font-bold">
                  Are you a Person with Disabilities (40% or more / "severe" where percentage is not defined)? <span className="text-red-600">*</span>
                </label>
                <p className="text-[11px] text-slate-500">
                  If selecting "yes", please upload relevant document in the document upload section.
                </p>
                <div className="flex items-center gap-6 pt-1">
                  {["Yes", "No"].map((choice) => (
                    <label key={choice} className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
                      <input
                        type="radio"
                        name="pwd"
                        value={choice}
                        checked={formData.isPwd === choice}
                        onChange={(e) => setFormData({ ...formData, isPwd: e.target.value })}
                        className="text-kgp-crimson focus:ring-kgp-crimson"
                      />
                      <span>{choice}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Field 8: Defence / Paramilitary Personnel */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                <label className="block text-slate-800 font-bold leading-snug">
                  Are you a defence / paramilitary personnel permanently disabled OR is your parent a defence / paramilitary personnel permanently disabled or killed, during war or peacetime operations? <span className="text-red-600">*</span>
                </label>
                <p className="text-[11px] text-slate-500">
                  If selecting "yes", please upload relevant document in the document upload section.
                </p>
                <div className="flex items-center gap-6 pt-1">
                  {["Yes", "No"].map((choice) => (
                    <label key={choice} className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
                      <input
                        type="radio"
                        name="defence"
                        value={choice}
                        checked={formData.isDefencePersonnel === choice}
                        onChange={(e) => setFormData({ ...formData, isDefencePersonnel: e.target.value })}
                        className="text-kgp-crimson focus:ring-kgp-crimson"
                      />
                      <span>{choice}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Field 9: Working Professional Question */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                <label className="block text-slate-800 font-bold">
                  Are you currently an employed working professional? <span className="text-red-600">*</span>
                </label>
                <p className="text-[11px] text-slate-500">
                  If selecting "yes", employment verification document (Employee ID / Letter / NOC) will be required.
                </p>
                <div className="flex items-center gap-6 pt-1">
                  {["Yes", "No"].map((choice) => (
                    <label key={choice} className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
                      <input
                        type="radio"
                        name="workingPro"
                        value={choice}
                        checked={formData.isWorkingProfessional === choice}
                        onChange={(e) => setFormData({ ...formData, isWorkingProfessional: choice })}
                        className="text-kgp-crimson focus:ring-kgp-crimson"
                      />
                      <span>{choice}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Field 10: Completion of Class 12 */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                <label className="block text-slate-800 font-bold">
                  Completion of Class 12 or equivalent examination. <span className="text-red-600">*</span>
                </label>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-1">
                  {["Already completed/ Awaiting result", "Yet to Complete"].map((status) => (
                    <label key={status} className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
                      <input
                        type="radio"
                        name="class12Status"
                        value={status}
                        checked={formData.class12Status === status}
                        onChange={(e) => setFormData({ ...formData, class12Status: e.target.value })}
                        className="text-kgp-crimson focus:ring-kgp-crimson"
                      />
                      <span>{status}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Field 11: Year of Passing Class 12 */}
              <div className="space-y-1.5">
                <label className="block text-slate-800 font-bold">
                  Year of Passing Class 12 or Equivalent Exam <span className="text-red-600">*</span>
                </label>
                <select
                  value={formData.class12PassingYear}
                  onChange={(e) => setFormData({ ...formData, class12PassingYear: e.target.value })}
                  className="w-full sm:w-48 px-4 py-2.5 rounded-xl border border-slate-300 bg-white font-mono font-bold text-sm"
                >
                  {[2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2010].map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>

              {/* Field 12: Mobile Phone Number */}
              <div className="space-y-1.5">
                <label className="block text-slate-800 font-bold">
                  Mobile Phone number <span className="text-red-600">*</span>
                </label>
                <div className="flex max-w-sm">
                  <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-slate-300 bg-slate-100 text-slate-700 font-mono text-sm font-bold">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    placeholder="75869 48359"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/[^0-9]/g, '') })}
                    className="w-full px-4 py-2.5 rounded-r-xl border border-slate-300 focus:border-kgp-crimson focus:outline-none font-mono text-sm font-bold"
                  />
                </div>
              </div>

              {/* Field 13: Declaration Checkbox */}
              <div className="p-4.5 rounded-2xl bg-amber-50/80 border-2 border-amber-300 space-y-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.declarationPersonal}
                    onChange={(e) => setFormData({ ...formData, declarationPersonal: e.target.checked })}
                    className="w-5 h-5 rounded text-kgp-crimson focus:ring-kgp-crimson mt-0.5 flex-shrink-0"
                  />
                  <span className="text-slate-800 font-medium text-xs leading-relaxed">
                    <strong>I hereby declare that all personal information furnished above is correct.</strong> If any of the details furnished above is found to be false, I agree to have my application / admission cancelled or terminated.
                  </span>
                </label>
              </div>

              {/* Next Button */}
              <div className="pt-4 border-t border-slate-200 flex justify-end">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-kgp-crimson hover:bg-kgp-darkred text-white font-extrabold text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2"
                >
                  <span>Save Personal Details &amp; Continue to Exam Cities</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 2 OF 3: EXAM CITY OPTIONS                                         */}
        {/* ========================================================================= */}
        {section === 2 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-7 animate-in fade-in">
            
            {/* Form Section Header */}
            <div className="border-b border-slate-200 pb-4">
              <div className="text-xs uppercase font-extrabold tracking-wider text-kgp-crimson">
                application form
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif-title text-slate-900 mt-0.5">
                Section 2 of 3: Exam City Options
              </h2>
              <div className="inline-block mt-2 px-3 py-1 bg-amber-100 border border-amber-300 rounded-lg text-amber-950 font-bold text-xs">
                Qualifier Exam Date: 15 November, 2026
              </div>
            </div>

            {/* Explanatory Policy Notes */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2 text-xs text-slate-700 leading-relaxed">
              <p>
                <strong>Please be sure to select two different preferences for the Exam City.</strong> If you wish to change your preferences, click <strong>“RESET”</strong> to be able to pick your preferences again.
              </p>
              <p className="text-slate-500">
                <em>Note:</em> There will be an additional exam fee added for applicants opting to write exams outside India.
              </p>
              <p className="text-slate-600 pt-1 border-t border-slate-200">
                For students applying to JEE route, if you choose to start course work in September 2026 term, this set of cities will be used for Quiz 1 on 15 November, 2026. You don't have to write the Qualifier exam. During course registration, you will be asked to select cities for Quiz 2 and End term exam. You can change cities up to 4 weeks before each exam.
              </p>
            </div>

            <form onSubmit={handleProceedToSection3} className="space-y-7 text-xs">
              
              {/* Country Selection (Fixed to India) */}
              <div className="space-y-1.5">
                <label className="block text-slate-800 font-bold text-sm">
                  Country <span className="text-red-600">*</span>
                </label>
                <div className="relative sm:w-1/2">
                  <input
                    type="text"
                    readOnly
                    value="India"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-100 text-slate-800 font-bold text-sm cursor-not-allowed select-none"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                    Fixed (India)
                  </span>
                </div>
              </div>

              {/* Preference 1 Card */}
              <div className="p-5 rounded-2xl border-2 border-slate-200 bg-white space-y-4">
                <div className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-kgp-crimson text-white text-xs flex items-center justify-center font-bold">1</span>
                  <span>Exam City Preference 1</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">State <span className="text-red-600">*</span></label>
                    <select
                      value={formData.pref1State}
                      onChange={(e) => {
                        const newState = e.target.value;
                        const cities = getCitiesForState(newState);
                        setFormData({
                          ...formData,
                          pref1State: newState,
                          pref1City: cities[0] || ""
                        });
                      }}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white font-semibold text-sm"
                    >
                      {EXAM_STATES.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">City of Preference 1 <span className="text-red-600">*</span></label>
                    <select
                      value={formData.pref1City}
                      onChange={(e) => setFormData({ ...formData, pref1City: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white font-semibold text-sm"
                    >
                      {getCitiesForState(formData.pref1State).map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                    {formData.pref1State === "West Bengal" && (
                      <p className="text-[10px] text-emerald-700 mt-1 font-medium">
                        Showing all 23 districts of West Bengal
                      </p>
                    )}
                    {formData.pref1State === "Tripura" && (
                      <p className="text-[10px] text-emerald-700 mt-1 font-medium">
                        Showing all 8 districts of Tripura
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Preference 2 Card */}
              <div className="p-5 rounded-2xl border-2 border-slate-200 bg-white space-y-4">
                <div className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-300 text-slate-800 text-xs flex items-center justify-center font-bold">2</span>
                  <span>Exam City Preference 2</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">State <span className="text-red-600">*</span></label>
                    <select
                      value={formData.pref2State}
                      onChange={(e) => {
                        const newState = e.target.value;
                        const cities = getCitiesForState(newState);
                        setFormData({
                          ...formData,
                          pref2State: newState,
                          pref2City: cities[1] || cities[0] || ""
                        });
                      }}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white font-semibold text-sm"
                    >
                      {EXAM_STATES.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">City of Preference 2 <span className="text-red-600">*</span></label>
                    <select
                      value={formData.pref2City}
                      onChange={(e) => setFormData({ ...formData, pref2City: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white font-semibold text-sm"
                    >
                      {getCitiesForState(formData.pref2State).map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                    {formData.pref2State === "West Bengal" && (
                      <p className="text-[10px] text-emerald-700 mt-1 font-medium">
                        Showing all 23 districts of West Bengal
                      </p>
                    )}
                    {formData.pref2State === "Tripura" && (
                      <p className="text-[10px] text-emerald-700 mt-1 font-medium">
                        Showing all 8 districts of Tripura
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* RESET BUTTON */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleResetCities}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs flex items-center gap-1.5 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>RESET Exam City Preferences</span>
                </button>
              </div>

              {/* Terms & Undertaking Box */}
              <div className="p-5 rounded-2xl bg-amber-50/70 border-2 border-amber-300 space-y-3">
                <div className="font-bold text-amber-950 text-xs uppercase tracking-wide">
                  Exam Centre Allocation Terms:
                </div>
                <ul className="list-disc list-inside text-xs text-slate-800 space-y-1.5 leading-relaxed pl-1">
                  <li>I understand that I will be allotted an exam centre for the Exam in any one of the two cities I have selected above.</li>
                  <li>I understand and agree that once an exam centre gets allotted, I will not be able to have it changed.</li>
                  <li>Exam centers can be located anywhere [north, south, east, west] within the chosen city, and we cannot guarantee allocation to the selected option. Center assignment will depend on availability and capacity in that city.</li>
                </ul>

                <label className="flex items-start gap-2.5 cursor-pointer pt-2 border-t border-amber-200">
                  <input
                    type="checkbox"
                    required
                    checked={formData.agreeExamCityTerms}
                    onChange={(e) => setFormData({ ...formData, agreeExamCityTerms: e.target.checked })}
                    className="w-5 h-5 rounded text-kgp-crimson focus:ring-kgp-crimson mt-0.5 flex-shrink-0"
                  />
                  <span className="text-slate-900 font-extrabold text-xs">
                    I have read the above terms and I agree to them <span className="text-red-600">*</span>
                  </span>
                </label>
              </div>

              {/* Navigation Buttons */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => { setSection(1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="px-6 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold transition flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back to Personal Details</span>
                </button>

                <button
                  type="submit"
                  className="px-8 py-3.5 bg-kgp-crimson hover:bg-kgp-darkred text-white font-extrabold text-sm rounded-xl shadow-md transition flex items-center gap-2"
                >
                  <span>Save Exam Cities &amp; Proceed to Document Uploads</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 3 OF 3: FILE & DOCUMENT UPLOADS (EXACT USER SPECIFICATION)        */}
        {/* ========================================================================= */}
        {section === 3 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-7 animate-in fade-in">
            
            {/* Form Section Header */}
            <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="text-xs uppercase font-extrabold tracking-wider text-kgp-crimson">
                  application form
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-serif-title text-slate-900 mt-0.5">
                  Section 3 of 3: File &amp; Document Uploads
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Upload official scans for admission audit, admit card generation, and reservation verification.
                </p>
              </div>

              <button
                type="button"
                onClick={handlePreFillDocuments}
                className="px-3.5 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs rounded-xl border border-amber-300 flex items-center gap-1.5 transition self-start sm:self-auto"
              >
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>Auto-Attach Sample Docs</span>
              </button>
            </div>

            <form onSubmit={handleProceedToReview} className="space-y-6 text-xs">
              
              {/* PART A: ESSENTIAL IDENTITY DOCUMENTS */}
              <div className="space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-2">
                  <Camera className="w-4 h-4 text-kgp-crimson" />
                  <span>A. Candidate Photograph, Signature &amp; Identity</span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {/* 1. Passport Photograph */}
                  <DocUploadCard
                    docKey="photo"
                    title="Passport size photograph"
                    specs="JPEG / JPG format – 50KB to 150KB"
                    requirementType="Mandatory"
                  />

                  {/* 2. Signature */}
                  <DocUploadCard
                    docKey="signature"
                    title="Candidate Signature"
                    specs="JPEG / JPG format – 4KB to 150KB"
                    requirementType="Mandatory"
                  />

                  {/* 3. Photo ID Card Scan */}
                  <DocUploadCard
                    docKey="idProof"
                    title={`Photo ID Card Scan (${formData.idType})`}
                    specs="Aadhaar Card / PAN Card / Passport / Voter ID / Driving License / other Government ID with photo (JPEG / JPG / PDF format) – 50KB to 2MB"
                    requirementType="Mandatory"
                    conditionalNote={`Matching ID Number: ${formData.idNumber}`}
                  />
                </div>
              </div>

              {/* PART B: RESERVATION & CATEGORY CERTIFICATES */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>B. Category, Disability &amp; Quota Proofs (Based on Section 1)</span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {/* 4. Category Certificate */}
                  <DocUploadCard
                    docKey="categoryCert"
                    title={`Category Certificate (${formData.category})`}
                    specs="Only for applicants who select SC / ST / OBC-NCL / EWS (JPEG / JPG / PDF format) – 50KB to 2MB"
                    requirementType={['SC', 'ST', 'OBC-NCL', 'EWS'].includes(formData.category) ? 'Mandatory' : 'Optional'}
                    isConditional={true}
                    conditionalNote={['SC', 'ST', 'OBC-NCL', 'EWS'].includes(formData.category) ? `Required to validate ${formData.category} quota & fee waiver.` : 'Not required for General category.'}
                  />

                  {/* 5. PwD Certificate */}
                  <DocUploadCard
                    docKey="pwdCert"
                    title="PwD Certificate"
                    specs="Only for applicants with 40% or more disability (JPEG / JPG / PDF format) – 50KB to 2MB"
                    requirementType={formData.isPwd === 'Yes' ? 'Mandatory' : 'Optional'}
                    isConditional={true}
                    conditionalNote={formData.isPwd === 'Yes' ? 'Required as Person with Disability was selected in Section 1.' : 'Not required if non-disabled.'}
                  />

                  {/* 6. Defence Personnel Ward Certificate */}
                  <DocUploadCard
                    docKey="defenceCert"
                    title="Defence Personnel Ward / Disability Certificate"
                    specs="Proof of applicant having been permanently disabled OR parent having been permanently disabled / killed during war or peacetime operations while serving as a defence / paramilitary personnel (JPEG / JPG / PDF format) – 50KB to 2MB"
                    requirementType={formData.isDefencePersonnel === 'Yes' ? 'Mandatory' : 'Optional'}
                    isConditional={true}
                    conditionalNote={formData.isDefencePersonnel === 'Yes' ? 'Required as Defence Personnel was selected in Section 1.' : 'Not applicable.'}
                  />

                  {/* 7. JEE-Based Entry Proof */}
                  <DocUploadCard
                    docKey="jeeProof"
                    title="JEE-Based Entry Proof"
                    specs="Scoresheet / admit card / registration receipt as proof of eligibility to write JEE Advanced (PDF format) – 50KB to 2MB"
                    requirementType={formData.jeeAdvancedQualified === 'Yes' ? 'Mandatory' : 'Optional'}
                    isConditional={true}
                    conditionalNote={formData.jeeAdvancedQualified === 'Yes' ? 'Required to claim direct JEE Advanced pathway admission.' : 'Not applicable.'}
                  />
                </div>
              </div>

              {/* PART C: ACADEMIC QUALIFICATIONS */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-700" />
                  <span>C. Academic Qualification Marksheets &amp; Certificates</span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {/* 8. Class 10th / Secondary Marksheet */}
                  <DocUploadCard
                    docKey="class10"
                    title="Class 10th / Secondary Marksheet &amp; Certificate"
                    specs="PDF / JPG format – 50KB to 2MB"
                    requirementType="Mandatory"
                    conditionalNote="Mandatory proof of Mathematics and English study."
                  />

                  {/* 9. Higher Secondary Qualification (Either A or B) */}
                  <div className="p-4.5 rounded-2xl bg-amber-50/50 border border-amber-300 space-y-3">
                    <div className="font-bold text-slate-900 text-sm flex items-center justify-between">
                      <span>Higher Secondary Qualification (Either A or B):</span>
                      <span className="text-[10px] bg-amber-200 text-amber-900 font-extrabold px-2 py-0.5 rounded">
                        Mandatory
                      </span>
                    </div>

                    {/* Radio Choice between A and B */}
                    <div className="flex flex-col sm:flex-row gap-4 bg-white p-3 rounded-xl border border-amber-200">
                      <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                        <input
                          type="radio"
                          name="higherSecChoice"
                          value="class12"
                          checked={formData.higherSecChoice === 'class12'}
                          onChange={() => setFormData({ ...formData, higherSecChoice: 'class12' })}
                          className="text-kgp-crimson focus:ring-kgp-crimson"
                        />
                        <span>Option A: Class 12th / Senior Secondary</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                        <input
                          type="radio"
                          name="higherSecChoice"
                          value="diploma"
                          checked={formData.higherSecChoice === 'diploma'}
                          onChange={() => setFormData({ ...formData, higherSecChoice: 'diploma' })}
                          className="text-kgp-crimson focus:ring-kgp-crimson"
                        />
                        <span>Option B: 3-Year Polytechnic / Diploma</span>
                      </label>
                    </div>

                    {formData.higherSecChoice === 'class12' ? (
                      <DocUploadCard
                        docKey="class12"
                        title="A. Class 12th / Senior Secondary Marksheet &amp; Passing Certificate"
                        specs="PDF / JPG format – 50KB to 2MB"
                        requirementType="Mandatory"
                      />
                    ) : (
                      <DocUploadCard
                        docKey="diplomaCert"
                        title="B. Diploma Completion Certificate &amp; Marksheets"
                        specs="For candidates who pursued a Polytechnic/Diploma instead of 11th &amp; 12th (PDF format) – 50KB to 2MB"
                        requirementType="Mandatory"
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* PART D: HIGHER DEGREES & EMPLOYMENT VERIFICATION */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-blue-700" />
                  <span>D. Higher Degrees &amp; Employment Proofs (If Applicable)</span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {/* 10. Undergraduate (UG) */}
                  <DocUploadCard
                    docKey="ugDegree"
                    title="Undergraduate (UG) Degree Certificate &amp; Consolidated Marksheet"
                    specs="If applicable (PDF format) – 50KB to 2MB"
                    requirementType="Optional"
                  />

                  {/* 11. Postgraduate (PG) */}
                  <DocUploadCard
                    docKey="pgDegree"
                    title="Postgraduate (PG) Degree Certificate &amp; Marksheet"
                    specs="If applicable (PDF format) – 50KB to 2MB"
                    requirementType="Optional"
                  />

                  {/* 12. Doctoral (Ph.D.) */}
                  <DocUploadCard
                    docKey="phdDegree"
                    title="Doctoral (Ph.D.) Degree / Provisional Certificate / Coursework Completion Proof"
                    specs="If applicable (PDF format) – 50KB to 2MB"
                    requirementType="Optional"
                  />

                  {/* 13. Employment Verification */}
                  <DocUploadCard
                    docKey="employmentProof"
                    title="Employment Verification (For Working Professionals)"
                    specs="Current Employee ID Card or Official Employment Letter / NOC from the organization (PDF / JPG format) – 50KB to 2MB"
                    requirementType={formData.isWorkingProfessional === 'Yes' ? 'Mandatory' : 'Optional'}
                    conditionalNote={formData.isWorkingProfessional === 'Yes' ? 'Required because you selected Working Professional in Section 1.' : 'Only required if you are an employed professional.'}
                  />
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => { setSection(2); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="px-6 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold transition flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back to Exam Cities</span>
                </button>

                <button
                  type="submit"
                  className="px-8 py-3.5 bg-kgp-crimson hover:bg-kgp-darkred text-white font-extrabold text-sm rounded-xl shadow-md transition flex items-center gap-2"
                >
                  <span>Review Application &amp; Proceed to Fee Payment</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 4: APPLICATION REVIEW & FEE PAYMENT                                */}
        {/* ========================================================================= */}
        {section === 4 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-7 animate-in fade-in">
            
            <div className="border-b border-slate-200 pb-4">
              <div className="text-xs uppercase font-extrabold tracking-wider text-kgp-crimson">
                Review &amp; Confirmation
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif-title text-slate-900 mt-0.5">
                Review Application &amp; Complete Qualifier Fee Payment
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Please verify your entered details and attached documents before completing fee payment.
              </p>
            </div>

            {/* Application Review Sheet */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-5 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Application Number</div>
                  <div className="text-base font-mono font-black text-kgp-crimson">{formData.applicationNo}</div>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Selected Programme</div>
                  <div className="font-bold text-slate-800">{formData.program}</div>
                </div>
              </div>

              {/* Data Summary Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Applicant's Full Name:</span>
                  <strong className="text-slate-900 text-sm font-bold uppercase">{formData.fullName}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Date of Birth:</span>
                  <strong className="text-slate-900 font-mono">{formData.dob}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Gender / Citizenship:</span>
                  <strong className="text-slate-900">{formData.gender} ({formData.citizenship})</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Photo ID Details:</span>
                  <strong className="text-slate-900">{formData.idType}: {formData.idNumber}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Category:</span>
                  <strong className="text-slate-900">{formData.category}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">JEE Advanced Qualified:</span>
                  <strong className="text-slate-900">{formData.jeeAdvancedQualified}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Person with Disabilities:</span>
                  <strong className="text-slate-900">{formData.isPwd}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Working Professional:</span>
                  <strong className="text-slate-900">{formData.isWorkingProfessional}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Mobile Phone:</span>
                  <strong className="text-slate-900 font-mono">+91 {formData.phone}</strong>
                </div>
              </div>

              {/* Exam City Preferences Summary */}
              <div className="pt-3 border-t border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase mb-1">Allocated Exam City Choices (15 Nov 2026):</span>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 font-semibold text-slate-800">
                    <span className="text-kgp-crimson font-bold">Preference 1:</span> {formData.pref1City}, {formData.pref1State}
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 font-semibold text-slate-800">
                    <span className="text-slate-500 font-bold">Preference 2:</span> {formData.pref2City}, {formData.pref2State}
                  </div>
                </div>
              </div>

              {/* Document Uploads Verified Summary */}
              <div className="pt-3 border-t border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase mb-1.5">Attached Document Scans:</span>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(formData.docs)
                    .filter(([_, d]) => d.uploaded)
                    .map(([key, d]) => (
                      <span key={key} className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-[11px] font-medium text-slate-700 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="truncate max-w-[200px]">{d.name}</span>
                      </span>
                    ))}
                </div>
              </div>
            </div>

            {/* Payment Breakdown & UPI */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              
              {/* Fee Card */}
              <div className="p-6 rounded-2xl border-2 border-slate-200 bg-white space-y-4 text-xs">
                <div className="font-bold text-slate-900 text-sm flex items-center justify-between">
                  <span>Qualifier Examination Tariff</span>
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
                    IIT Kharagpur
                  </span>
                </div>

                <div className="space-y-2 border-t border-slate-100 pt-3">
                  <div className="flex justify-between text-slate-600">
                    <span>Base Qualifier Application Fee:</span>
                    <span>₹1,500</span>
                  </div>
                  {payableAmount < 1500 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>{feeWaiverText}:</span>
                      <span>- ₹{1500 - payableAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-600">
                    <span>Computer-Based Testing (CBT) Infrastructure:</span>
                    <span className="text-emerald-700 font-bold">Included (₹0)</span>
                  </div>
                  <div className="pt-3 border-t border-slate-200 flex justify-between font-black text-lg text-slate-950">
                    <span>Total Amount Payable:</span>
                    <span className="text-kgp-crimson">₹{payableAmount}</span>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-[11px] text-emerald-800 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Secured via IIT Kharagpur Official Examination Gateway.</span>
                </div>
              </div>

              {/* UPI QR Payment */}
              <div className="p-6 rounded-2xl border-2 border-slate-200 bg-slate-50 space-y-4 text-xs text-center">
                <div className="font-bold text-slate-800 text-sm">Scan UPI QR Code to Pay</div>
                
                <div className="w-44 h-44 mx-auto border-2 border-slate-300 rounded-2xl p-2.5 bg-white flex flex-col items-center justify-center shadow-md">
                  <QrCode className="w-32 h-32 text-slate-900" />
                  <span className="text-[10px] text-slate-500 font-mono mt-1">UPI: iitkgp.bs@sbi</span>
                </div>

                <p className="text-[11px] text-slate-500">
                  Google Pay, PhonePe, Paytm or BHIM UPI
                </p>

                <button
                  type="button"
                  onClick={handleCompletePayment}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl shadow-lg transition flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Confirm Payment of ₹{payableAmount}</span>
                </button>
              </div>

            </div>

            {/* Back Button */}
            <div className="pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => { setSection(3); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="px-6 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold transition flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back to Document Uploads</span>
              </button>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 5: PAYMENT SUCCESS & LAUNCH QUALIFIER CBT EXAM                     */}
        {/* ========================================================================= */}
        {section === 5 && (
          <div className="bg-gradient-to-br from-slate-900 via-kgp-navy to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8 animate-in zoom-in-95 text-center">
            
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                Application Successfully Verified &amp; Fee Received
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-serif-title uppercase">
                {formData.fullName}
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
                Your application and uploaded documents for the <strong>{formData.program}</strong> have been accepted for the <strong>15 November, 2026 Qualifier Exam</strong>.
              </p>
            </div>

            {/* Summary Card */}
            <div className="max-w-lg mx-auto bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-5 text-xs text-left space-y-3">
              <div className="flex justify-between pb-2 border-b border-white/10">
                <span className="text-slate-300">Qualifier Roll Number:</span>
                <strong className="text-amber-400 font-mono text-sm">{formData.finalRollNo}</strong>
              </div>
              <div className="flex justify-between pb-2 border-b border-white/10">
                <span className="text-slate-300">Application Number:</span>
                <strong className="text-slate-200 font-mono">{formData.applicationNo}</strong>
              </div>
              <div className="flex justify-between pb-2 border-b border-white/10">
                <span className="text-slate-300">Allocated City Choices:</span>
                <strong className="text-white">{formData.pref1City}, {formData.pref2City}</strong>
              </div>
              <div className="flex justify-between pb-2 border-b border-white/10">
                <span className="text-slate-300">Attached Documents:</span>
                <strong className="text-emerald-300">{Object.values(formData.docs).filter(d => d.uploaded).length} Verified Files</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Amount Paid:</span>
                <strong className="text-emerald-400 font-bold">₹{payableAmount} (Confirmed)</strong>
              </div>
            </div>

            {/* Direct Launch Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onStartExam({ name: formData.fullName, roll: formData.finalRollNo })}
                className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 font-extrabold text-base rounded-2xl shadow-2xl hover:scale-105 transition transform flex items-center justify-center gap-3"
              >
                <span>Launch Qualifier Round Examination</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl border border-white/30 text-white hover:bg-white/10 font-bold text-xs transition flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Application Summary</span>
              </button>
            </div>

          </div>
        )}

      </main>

    </div>
  );
}
