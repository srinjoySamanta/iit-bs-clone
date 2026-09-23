import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, CreditCard, ArrowRight, ArrowLeft, UserCheck, ShieldCheck, 
  Award, QrCode, FileText, Sparkles, Lock, ChevronRight, ChevronLeft,
  Upload, Check, AlertCircle, Building, BookOpen, MapPin, Calendar, 
  Camera, Download, Printer, Info, AlertTriangle, Eye, RefreshCw
} from 'lucide-react';
import { IIT_KGP_INFO } from '../../data/portalData';
import iitKgpLogo from '../../assets/logo';

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Delhi (NCR)", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", 
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", 
  "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", 
  "Jammu & Kashmir", "Ladakh", "Chandigarh", "Puducherry"
];

const EXAM_CITIES = [
  "Kharagpur (IIT Campus)", "Kolkata (North)", "Kolkata (South)", "Delhi (NCR - Central)",
  "Bengaluru (Central)", "Mumbai (Suburban)", "Chennai (City)", "Hyderabad (HITEC City)",
  "Pune", "Ahmedabad", "Patna", "Bhubaneswar", "Guwahati", "Lucknow", "Jaipur", 
  "Ranchi", "Chandigarh", "Bhopal", "Visakhapatnam", "Kochi", "Indore", "Varanasi"
];

const BOARDS_LIST = [
  "Central Board of Secondary Education (CBSE)",
  "Council for the Indian School Certificate Examinations (CISCE / ICSE / ISC)",
  "West Bengal Council of Higher Secondary Education (WBCHSE)",
  "Maharashtra State Board of Secondary and Higher Secondary Education",
  "Karnataka Department of Pre-University Education (PUE)",
  "Tamil Nadu State Board of School Examinations",
  "Telangana Board of Intermediate Education",
  "Board of Intermediate Education, Andhra Pradesh",
  "Uttar Pradesh Madhyamik Shiksha Parishad (UPMSP)",
  "Bihar School Examination Board (BSEB)",
  "National Institute of Open Schooling (NIOS)",
  "Other Recognized State / Central / International Board"
];

export default function QualifierRoundPortal({ initialCandidate, onStartExam, onBackToHome }) {
  // Navigation tabs matching IIT Madras BS portal (/application_form/...)
  const [activeTab, setActiveTab] = useState('personal'); // 'personal' | 'address' | 'academic' | 'exam_city' | 'documents' | 'payment' | 'completed'
  const [maxReachedTab, setMaxReachedTab] = useState(1);
  const [formError, setFormError] = useState('');
  const [sameAsPermanent, setSameAsPermanent] = useState(true);
  const todayDateString = new Date().toISOString().split('T')[0];

  // Form State covering all IITM BS Degree application fields
  const [formData, setFormData] = useState({
    // Tab 1: Personal Details (/personal)
    fullName: initialCandidate?.name || '',
    email: initialCandidate?.email || '',
    phone: '',
    altPhone: '',
    dob: '2005-08-15',
    gender: 'Male',
    nationality: 'Indian',
    category: 'General',
    isPwd: 'No',
    pwdPercent: '',
    needScribe: 'No',
    guardianName: '',
    guardianRelation: 'Father',
    guardianPhone: '',
    familyIncome: '> 5 lakhs per annum / not applicable for fee waiver based on family income',

    // Tab 2: Address (/address)
    permLine1: '',
    permLine2: '',
    permCity: '',
    permDistrict: '',
    permState: 'West Bengal',
    permPincode: '',
    permCountry: 'India',

    commLine1: '',
    commLine2: '',
    commCity: '',
    commDistrict: '',
    commState: 'West Bengal',
    commPincode: '',
    commCountry: 'India',

    // Tab 3: Academic Qualifications (/academic)
    class10Board: 'Central Board of Secondary Education (CBSE)',
    class10Year: '2021',
    class10School: '',
    class10MathStudied: 'Yes',
    class10EnglishStudied: 'Yes',
    class10Score: '89.4',

    class12Status: 'Passed',
    class12Board: 'Central Board of Secondary Education (CBSE)',
    class12Stream: 'Science (Mathematics, Physics, Chemistry / Comp Science)',
    class12Year: '2023',
    class12School: '',
    class12RollNo: '',
    class12Score: '88.2',

    higherEduStatus: 'Currently Enrolled in College / University',
    currentInstitution: 'Jadavpur University, Kolkata',
    currentDegree: 'B.Tech / B.Sc (1st / 2nd Year)',

    // Tab 4: Exam City Preferences (/exam_city)
    examMode: 'Computer-Based Test (CBT) at Partner Test Centre',
    examSlot: 'Shift 1: Forenoon (9:00 AM – 1:00 PM)',
    cityPref1: 'Kolkata (North)',
    cityPref2: 'Kharagpur (IIT Campus)',
    cityPref3: 'Bhubaneswar',

    // Tab 5: Documents (/documents)
    photoUploaded: true,
    photoName: 'passport_size_photo.jpg',
    signUploaded: true,
    signName: 'candidate_signature.png',
    idType: 'Aadhaar Card',
    idNumber: '8921-4451-9012',
    idUploaded: true,
    idFileName: 'aadhaar_card_front_back.pdf',
    categoryCertUploaded: false,
    categoryCertName: '',

    // Final Application Info
    applicationNumber: '',
    paymentMode: 'UPI'
  });

  // Keep Google verified credentials synced
  useEffect(() => {
    if (initialCandidate) {
      setFormData(prev => ({
        ...prev,
        fullName: prev.fullName || initialCandidate.name || '',
        email: initialCandidate.email || prev.email
      }));
    }
  }, [initialCandidate]);

  // Handle "Same as Permanent Address" sync
  useEffect(() => {
    if (sameAsPermanent) {
      setFormData(prev => ({
        ...prev,
        commLine1: prev.permLine1,
        commLine2: prev.permLine2,
        commCity: prev.permCity,
        commDistrict: prev.permDistrict,
        commState: prev.permState,
        commPincode: prev.permPincode,
        commCountry: prev.permCountry
      }));
    }
  }, [sameAsPermanent, formData.permLine1, formData.permLine2, formData.permCity, formData.permDistrict, formData.permState, formData.permPincode, formData.permCountry]);

  // Fee calculation logic identical to IIT Madras fee waiver rules
  const baseFee = 1500;
  const isIncomeUnder1LPA = formData.familyIncome.includes('< 1 Lakh');
  const isIncome1to5LPA = formData.familyIncome.includes('1 - 5 Lakhs');
  const isCategoryWaiver = ['SC', 'ST', 'PwD'].includes(formData.category);

  let payableAmount = 1500;
  let feeWaiverPercent = 0;

  if (isIncomeUnder1LPA || isCategoryWaiver) {
    payableAmount = 375; // 75% fee waiver
    feeWaiverPercent = 75;
  } else if (isIncome1to5LPA || formData.category === 'OBC-NCL' || formData.category === 'GEN-EWS') {
    payableAmount = 750; // 50% fee waiver
    feeWaiverPercent = 50;
  }

  // TABS CONFIGURATION
  const TABS = [
    { id: 'personal', label: '1. Personal Details', stepNum: 1, sub: 'Biodata & Category' },
    { id: 'address', label: '2. Address', stepNum: 2, sub: 'Permanent & Communication' },
    { id: 'academic', label: '3. Academic Details', stepNum: 3, sub: 'Class 10, 12 & College' },
    { id: 'exam_city', label: '4. Exam Cities', stepNum: 4, sub: 'CBT Preferences' },
    { id: 'documents', label: '5. Documents', stepNum: 5, sub: 'Photo, Sign & ID Proof' },
    { id: 'payment', label: '6. Review & Pay', stepNum: 6, sub: 'Fee Reconciliation' },
  ];

  // Tab Navigation Validators
  const handleNextTab = (current) => {
    setFormError('');

    if (current === 'personal') {
      if (!formData.fullName.trim()) {
        setFormError('Please enter candidate Full Legal Name as per Class 10 certificate.');
        return;
      }
      if (!formData.email.trim()) {
        setFormError('Please enter candidate Email address.');
        return;
      }
      if (!formData.phone.trim()) {
        setFormError('Please enter candidate 10-digit Mobile Number.');
        return;
      }
      if (!formData.dob) {
        setFormError('Please select candidate Date of Birth.');
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
      const ageInYears = (todayStart - dobTime) / (1000 * 60 * 60 * 24 * 365.25);
      if (ageInYears < 13) {
        setFormError('Invalid Date of Birth: Candidate must be at least 13 years of age to register.');
        return;
      }
      // Check IIT Madras fee waiver rule
      const hasWaiverCategory = ['SC', 'ST', 'OBC-NCL', 'GEN-EWS', 'PwD'].includes(formData.category);
      const requestedIncomeWaiver = formData.familyIncome.includes('< 1 Lakh') || formData.familyIncome.includes('1 - 5 Lakhs');
      if (requestedIncomeWaiver && !hasWaiverCategory && formData.category === 'General') {
        setFormError(
          "Fee Waiver Rule: If you wish to avail fee waiver based on family income, category selected must be SC / ST / OBC-NCL / EWS. If applying under General category without reservation, please select family income as '> 5 lakhs per annum / not applicable for fee waiver based on family income'."
        );
        return;
      }
      setActiveTab('address');
      setMaxReachedTab(prev => Math.max(prev, 2));
    } else if (current === 'address') {
      if (!formData.permCity.trim() || !formData.permPincode.trim()) {
        setFormError('Please fill in City/District and PIN Code for Permanent Address.');
        return;
      }
      setActiveTab('academic');
      setMaxReachedTab(prev => Math.max(prev, 3));
    } else if (current === 'academic') {
      if (formData.class10MathStudied !== 'Yes' || formData.class10EnglishStudied !== 'Yes') {
        setFormError('Eligibility Requirement: Mathematics and English are mandatory subjects in Class 10 for IIT Kharagpur BS admissions.');
        return;
      }
      setActiveTab('exam_city');
      setMaxReachedTab(prev => Math.max(prev, 4));
    } else if (current === 'exam_city') {
      if (formData.cityPref1 === formData.cityPref2) {
        setFormError('Please select distinct exam cities for Choice 1 and Choice 2.');
        return;
      }
      setActiveTab('documents');
      setMaxReachedTab(prev => Math.max(prev, 5));
    } else if (current === 'documents') {
      if (!formData.photoUploaded || !formData.signUploaded || !formData.idUploaded) {
        setFormError('Please ensure Photograph, Signature, and Government Photo ID are uploaded.');
        return;
      }
      // Generate official application number
      if (!formData.applicationNumber) {
        const generatedAppNo = "IITKGP-BS-2026-" + Math.floor(100000 + Math.random() * 900000);
        setFormData(prev => ({ ...prev, applicationNumber: generatedAppNo }));
      }
      setActiveTab('payment');
      setMaxReachedTab(prev => Math.max(prev, 6));
    }
  };

  const handleCompletePayment = () => {
    // Generate official roll number
    const finalRoll = "KGP-QUAL-2026-" + Math.floor(1000 + Math.random() * 9000);
    setFormData(prev => ({ ...prev, finalRollNo: finalRoll }));
    setActiveTab('completed');
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-slate-800 font-sans selection:bg-amber-500 selection:text-white pb-20">
      
      {/* 1. OFFICIAL TOP NAVBAR (Exact to IIT Madras Study Portal) */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-white border border-slate-200 p-1 flex items-center justify-center shadow-xs">
              <img src={iitKgpLogo} alt="IIT KGP" className="w-9 h-9 object-contain" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-kgp-crimson uppercase tracking-wider">
                {IIT_KGP_INFO.hindiName}
              </div>
              <div className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <span>IIT Kharagpur BS Admissions Portal</span>
                <span className="hidden sm:inline-block text-[10px] bg-amber-100 text-amber-900 font-semibold px-2 py-0.5 rounded-full border border-amber-300">
                  Sept 2026 Batch
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Authenticated Candidate Google Chip */}
            <div className="hidden sm:flex items-center gap-2.5 bg-slate-50 border border-slate-200 rounded-full px-3 py-1 text-xs">
              <div className="w-6 h-6 rounded-full bg-[#1a73e8] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                {formData.fullName ? formData.fullName.charAt(0).toUpperCase() : 'G'}
              </div>
              <div className="text-left pr-1">
                <div className="text-[11px] font-bold text-slate-800 leading-tight">
                  {formData.fullName || 'Candidate'}
                </div>
                <div className="text-[9px] text-emerald-700 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                  {formData.email || 'Verified Google Account'}
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
        </div>
      </header>

      {/* 2. SUB-BANNER WITH PROGRAMME SUMMARY */}
      <div className="bg-[#800000] text-white py-4 px-4 sm:px-8 border-b-2 border-amber-400 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          <div>
            <div className="font-extrabold text-base sm:text-lg flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-300" />
              <span>BS in Data Science and Artificial Intelligence (AI)</span>
            </div>
            <p className="text-amber-100 text-[11px] mt-0.5">
              Reference Application Form | Modelled after National IIT BS Admission Framework (study.iitm.ac.in)
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-white/10 px-3 py-1 rounded-lg border border-white/20 text-amber-200 font-mono text-[11px]">
              Session: 2026-27 (Term 1)
            </span>
            <span className="bg-emerald-600 text-white px-3 py-1 rounded-lg font-bold text-[11px] shadow-xs">
              Qualifier Route
            </span>
          </div>
        </div>
      </div>

      {/* 3. MAIN FORM CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
        
        {/* TABS NAVIGATION BAR (Matches IIT Madras /application_form/personal tabs) */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-2 mb-6 overflow-x-auto scrollbar-none">
          <div className="flex items-center min-w-[700px] justify-between gap-1">
            {TABS.map((tab, idx) => {
              const isActive = activeTab === tab.id;
              const isPast = tab.stepNum < (TABS.find(t => t.id === activeTab)?.stepNum || 1);
              const isClickable = tab.stepNum <= maxReachedTab;

              return (
                <button
                  key={tab.id}
                  disabled={!isClickable && activeTab !== 'completed'}
                  onClick={() => {
                    if (isClickable) setActiveTab(tab.id);
                  }}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-left transition flex items-center gap-2.5 ${
                    isActive 
                      ? 'bg-kgp-crimson text-white shadow-sm' 
                      : isPast 
                        ? 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-200' 
                        : isClickable 
                          ? 'text-slate-700 hover:bg-slate-100' 
                          : 'text-slate-400 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                    isActive 
                      ? 'bg-amber-400 text-slate-950 font-black' 
                      : isPast 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-slate-200 text-slate-600'
                  }`}>
                    {isPast ? <Check className="w-4 h-4 stroke-[3]" /> : tab.stepNum}
                  </div>
                  <div className="truncate">
                    <div className="font-bold text-xs leading-snug truncate">
                      {tab.label.split('. ')[1]}
                    </div>
                    <div className={`text-[10px] truncate ${isActive ? 'text-amber-100' : 'text-slate-400'}`}>
                      {tab.sub}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ERROR / GUIDELINE ALERT (Exact to IIT Madras /application_form/personal warning) */}
        {formError && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-300 rounded-2xl text-xs text-red-800 flex items-start gap-3 shadow-xs animate-in fade-in">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-bold text-red-900">Attention Required Before Proceeding:</div>
              <p className="leading-relaxed">{formError}</p>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 1: PERSONAL DETAILS (/application_form/personal)                      */}
        {/* ========================================================================= */}
        {activeTab === 'personal' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8 animate-in fade-in">
            
            {/* IIT Madras Official Notice Box */}
            <div className="bg-amber-50/90 border border-amber-300 rounded-2xl p-4.5 text-xs text-amber-950 flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold text-amber-900 uppercase tracking-wide text-[11px] block">
                  Official IIT Fee Waiver Guidelines &amp; Category Verification:
                </span>
                <p className="leading-relaxed text-slate-800">
                  If you wish to avail fee waiver based on family income, category selected must be <strong>SC / ST / OBC-NCL / EWS / PwD</strong>. If you do not wish to avail fee waiver based on family income or are applying under Unreserved General, please select family income as <em>“&gt; 5 lakhs per annum / not applicable for fee waiver based on family income”</em>.
                </p>
              </div>
            </div>

            <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold font-serif-title text-slate-900">
                  Personal Details &amp; Identity Verification
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Fields marked with an asterisk (<span className="text-red-500">*</span>) are mandatory as per IIT Kharagpur records.
                </p>
              </div>
              <span className="text-[11px] bg-slate-100 text-slate-600 font-mono px-2.5 py-1 rounded-lg border border-slate-200">
                Route: /application_form/personal
              </span>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleNextTab('personal'); }} className="space-y-6 text-xs">
              
              {/* Row 1: Legal Name & Google Verified Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">
                    Full Legal Name of Candidate (as per Class 10 Certificate / Govt ID) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Enter Candidate Full Name"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-kgp-crimson focus:ring-1 focus:ring-kgp-crimson focus:outline-none text-sm font-semibold transition"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">This name will be printed on your official BS Degree and transcript.</p>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1.5 flex items-center justify-between">
                    <span>Google Authenticated Email ID *</span>
                    <span className="text-emerald-700 font-semibold text-[10px] bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      Verified
                    </span>
                  </label>
                  <input
                    type="email"
                    readOnly
                    value={formData.email}
                    className="w-full px-4 py-2.5 rounded-xl border border-emerald-300 bg-emerald-50/50 text-slate-800 text-sm font-mono font-medium focus:outline-none cursor-not-allowed"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">All admissions letters, CBT login OTPs, and marksheets will be sent here.</p>
                </div>
              </div>

              {/* Row 2: Date of Birth, Gender, Nationality */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Date of Birth *</span>
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
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-kgp-crimson focus:outline-none text-sm transition"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Must be a valid past date (cannot exceed today).</p>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Gender *</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white focus:border-kgp-crimson focus:outline-none text-sm font-medium transition"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Third Gender</option>
                    <option>Prefer not to disclose</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Nationality *</label>
                  <select
                    value={formData.nationality}
                    onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white focus:border-kgp-crimson focus:outline-none text-sm font-medium transition"
                  >
                    <option>Indian</option>
                    <option>OCI (Overseas Citizen of India)</option>
                    <option>PIO (Person of Indian Origin)</option>
                    <option>Foreign National</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Category & Family Annual Income (The Fee Waiver Trigger) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <div>
                  <label className="block text-slate-800 font-bold mb-1.5">
                    Social Category / Reservation Status *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white focus:border-kgp-crimson focus:outline-none text-sm font-semibold transition"
                  >
                    <option value="General">General (Unreserved)</option>
                    <option value="OBC-NCL">OBC-NCL (Other Backward Classes - Non-Creamy Layer)</option>
                    <option value="SC">SC (Scheduled Caste)</option>
                    <option value="ST">ST (Scheduled Tribe)</option>
                    <option value="GEN-EWS">GEN-EWS (General - Economically Weaker Section)</option>
                    <option value="PwD">Persons with Benchmark Disability (PwD &ge; 40%)</option>
                  </select>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Valid Central Govt category certificate is mandatory during Document Upload.
                  </p>
                </div>

                <div>
                  <label className="block text-slate-800 font-bold mb-1.5 flex items-center justify-between">
                    <span>Family Annual Income (For Fee Waiver) *</span>
                    {feeWaiverPercent > 0 && (
                      <span className="text-[10px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded-md">
                        {feeWaiverPercent}% IIT Aid Applied
                      </span>
                    )}
                  </label>
                  <select
                    value={formData.familyIncome}
                    onChange={(e) => setFormData({ ...formData, familyIncome: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white focus:border-kgp-crimson focus:outline-none text-sm font-semibold transition"
                  >
                    <option value="< 1 Lakh per annum (75% Fee Waiver)">
                      &lt; 1 Lakh per annum (Eligible for 75% fee waiver)
                    </option>
                    <option value="1 - 5 Lakhs per annum (50% Fee Waiver)">
                      1 - 5 Lakhs per annum (Eligible for 50% fee waiver)
                    </option>
                    <option value="> 5 lakhs per annum / not applicable for fee waiver based on family income">
                      &gt; 5 lakhs per annum / not applicable for fee waiver based on family income
                    </option>
                  </select>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Applicable Exam Fee: <strong>₹{payableAmount}</strong> (Standard fee ₹1,500)
                  </p>
                </div>
              </div>

              {/* Row 4: PwD & Scribe Requirements */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">
                    Person with Benchmark Disability (PwD)?
                  </label>
                  <select
                    value={formData.isPwd}
                    onChange={(e) => setFormData({ ...formData, isPwd: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes (&ge; 40% disability)</option>
                  </select>
                </div>

                {formData.isPwd === 'Yes' && (
                  <>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1.5">Disability Percentage</label>
                      <input
                        type="number"
                        placeholder="e.g. 45%"
                        value={formData.pwdPercent}
                        onChange={(e) => setFormData({ ...formData, pwdPercent: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1.5">Require Scribe during CBT?</label>
                      <select
                        value={formData.needScribe}
                        onChange={(e) => setFormData({ ...formData, needScribe: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm"
                      >
                        <option>No</option>
                        <option>Yes (Scribe requested)</option>
                      </select>
                    </div>
                  </>
                )}
              </div>

              {/* Row 5: Mobile & Parent Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Candidate Mobile (10 Digits) *</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-300 bg-slate-100 text-slate-600 font-mono text-xs">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      placeholder="9830122419"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-r-xl border border-slate-300 focus:border-kgp-crimson focus:outline-none text-sm font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Parent / Guardian Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Father / Mother / Guardian"
                    value={formData.guardianName}
                    onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Parent / Guardian Mobile *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 94321 00000"
                    value={formData.guardianPhone}
                    onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-mono"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onBackToHome}
                  className="px-6 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold transition flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Return to Home</span>
                </button>

                <button
                  type="submit"
                  className="px-8 py-3 bg-kgp-crimson hover:bg-kgp-darkred text-white font-bold rounded-xl shadow-md transition flex items-center gap-2 text-sm"
                >
                  <span>Save Personal Details &amp; Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: ADDRESS DETAILS (/application_form/address)                         */}
        {/* ========================================================================= */}
        {activeTab === 'address' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8 animate-in fade-in">
            <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold font-serif-title text-slate-900">
                  Address Details (Permanent &amp; Correspondence)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Provide your permanent residential address and mailing address for all official communications.
                </p>
              </div>
              <span className="text-[11px] bg-slate-100 text-slate-600 font-mono px-2.5 py-1 rounded-lg border border-slate-200">
                Route: /application_form/address
              </span>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleNextTab('address'); }} className="space-y-8 text-xs">
              
              {/* SECTION A: PERMANENT ADDRESS */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <MapPin className="w-4 h-4 text-kgp-crimson" />
                  <span>A. Permanent Address</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-slate-700 font-semibold mb-1">Address Line 1 (House/Flat No, Building, Street) *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Flat 4B, Heritage Enclave, Technology Campus Road"
                      value={formData.permLine1}
                      onChange={(e) => setFormData({ ...formData, permLine1: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">City / Town / Village *</label>
                    <input
                      type="text"
                      required
                      placeholder="Kolkata / Kharagpur / Patna"
                      value={formData.permCity}
                      onChange={(e) => setFormData({ ...formData, permCity: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">District *</label>
                    <input
                      type="text"
                      required
                      placeholder="Paschim Medinipur / North 24 Parganas"
                      value={formData.permDistrict}
                      onChange={(e) => setFormData({ ...formData, permDistrict: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">State / Union Territory *</label>
                    <select
                      value={formData.permState}
                      onChange={(e) => setFormData({ ...formData, permState: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm"
                    >
                      {INDIAN_STATES.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Postal PIN Code (6 Digits) *</label>
                    <input
                      type="text"
                      required
                      maxLength="6"
                      placeholder="721302"
                      value={formData.permPincode}
                      onChange={(e) => setFormData({ ...formData, permPincode: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 font-mono text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION B: CORRESPONDENCE ADDRESS */}
              <div className="space-y-4 pt-6 border-t border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <MapPin className="w-4 h-4 text-emerald-700" />
                    <span>B. Communication / Correspondence Address</span>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition">
                    <input
                      type="checkbox"
                      checked={sameAsPermanent}
                      onChange={(e) => setSameAsPermanent(e.target.checked)}
                      className="w-4 h-4 rounded text-kgp-crimson focus:ring-kgp-crimson"
                    />
                    <span>Same as Permanent Address</span>
                  </label>
                </div>

                {!sameAsPermanent && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in">
                    <div className="sm:col-span-2">
                      <label className="block text-slate-700 font-semibold mb-1">Mailing Address Line 1 *</label>
                      <input
                        type="text"
                        required
                        value={formData.commLine1}
                        onChange={(e) => setFormData({ ...formData, commLine1: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">City / Town *</label>
                      <input
                        type="text"
                        required
                        value={formData.commCity}
                        onChange={(e) => setFormData({ ...formData, commCity: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">State / UT *</label>
                      <select
                        value={formData.commState}
                        onChange={(e) => setFormData({ ...formData, commState: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm"
                      >
                        {INDIAN_STATES.map((st) => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">PIN Code *</label>
                      <input
                        type="text"
                        required
                        maxLength="6"
                        value={formData.commPincode}
                        onChange={(e) => setFormData({ ...formData, commPincode: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 font-mono text-sm"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveTab('personal')}
                  className="px-6 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold transition flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous: Personal</span>
                </button>

                <button
                  type="submit"
                  className="px-8 py-3 bg-kgp-crimson hover:bg-kgp-darkred text-white font-bold rounded-xl shadow-md transition flex items-center gap-2 text-sm"
                >
                  <span>Save Address &amp; Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: ACADEMIC DETAILS (/application_form/academic)                      */}
        {/* ========================================================================= */}
        {activeTab === 'academic' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8 animate-in fade-in">
            <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold font-serif-title text-slate-900">
                  Academic Qualifications (Class 10, Class 12 &amp; College)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Confirm study of Mathematics and English as mandatory admission prerequisites.
                </p>
              </div>
              <span className="text-[11px] bg-slate-100 text-slate-600 font-mono px-2.5 py-1 rounded-lg border border-slate-200">
                Route: /application_form/academic
              </span>
            </div>

            {/* Eligibility Prerequisite Notice */}
            <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 text-xs text-emerald-950 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-emerald-900 uppercase tracking-wide text-[11px] block">
                  Mandatory IIT Kharagpur Subject Requirements:
                </span>
                <p className="text-emerald-900 mt-0.5 leading-relaxed">
                  Anyone who has passed Class 12 or equivalent with <strong>Mathematics and English</strong> in Class 10 is eligible to apply. There is no age limit, stream restriction, or prior coding prerequisite.
                </p>
              </div>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleNextTab('academic'); }} className="space-y-8 text-xs">
              
              {/* SECTION A: CLASS 10 (SECONDARY) */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-4">
                <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>A. Class 10 (Secondary Examination)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-slate-700 font-semibold mb-1">Education Board *</label>
                    <select
                      value={formData.class10Board}
                      onChange={(e) => setFormData({ ...formData, class10Board: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-slate-300 bg-white text-sm"
                    >
                      {BOARDS_LIST.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Year of Passing *</label>
                    <select
                      value={formData.class10Year}
                      onChange={(e) => setFormData({ ...formData, class10Year: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-slate-300 bg-white text-sm"
                    >
                      {[2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010].map(y => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Mathematics Studied in Class 10? *</label>
                    <select
                      value={formData.class10MathStudied}
                      onChange={(e) => setFormData({ ...formData, class10MathStudied: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-900 font-bold text-sm"
                    >
                      <option value="Yes">Yes (Studied Mathematics)</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">English Studied in Class 10? *</label>
                    <select
                      value={formData.class10EnglishStudied}
                      onChange={(e) => setFormData({ ...formData, class10EnglishStudied: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-900 font-bold text-sm"
                    >
                      <option value="Yes">Yes (Studied English)</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Class 10 Percentage / CGPA *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 89.4%"
                      value={formData.class10Score}
                      onChange={(e) => setFormData({ ...formData, class10Score: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-slate-300 text-sm font-semibold"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION B: CLASS 12 / EQUIVALENT */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-4">
                <div className="font-bold text-slate-900 text-sm flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-kgp-crimson" />
                    <span>B. Class 12 / Higher Secondary / Polytechnic Diploma</span>
                  </div>
                  <span className="text-xs text-slate-500 font-normal">Qualifying Level</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Current Status *</label>
                    <select
                      value={formData.class12Status}
                      onChange={(e) => setFormData({ ...formData, class12Status: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-slate-300 bg-white text-sm"
                    >
                      <option>Passed Class 12</option>
                      <option>Appearing in Class 12 (Results Awaited)</option>
                      <option>Completed 3-Year Polytechnic Diploma</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Stream *</label>
                    <select
                      value={formData.class12Stream}
                      onChange={(e) => setFormData({ ...formData, class12Stream: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-slate-300 bg-white text-sm"
                    >
                      <option>Science (PCM / PCB / Comp Science)</option>
                      <option>Commerce with Mathematics</option>
                      <option>Arts / Humanities with Statistics/Maths</option>
                      <option>Polytechnic / Technical Diploma</option>
                      <option>Other Stream</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Class 12 Percentage / Grade *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 88.2%"
                      value={formData.class12Score}
                      onChange={(e) => setFormData({ ...formData, class12Score: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-slate-300 text-sm font-semibold"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION C: CURRENT COLLEGE / PROFESSIONAL ENROLLMENT */}
              <div className="p-5 rounded-2xl border border-slate-200 space-y-4">
                <div className="font-bold text-slate-900 text-sm">
                  C. Dual-Degree &amp; Working Professional Status (Optional)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Are you currently pursuing another degree?</label>
                    <select
                      value={formData.higherEduStatus}
                      onChange={(e) => setFormData({ ...formData, higherEduStatus: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-slate-300 bg-white text-sm"
                    >
                      <option>Currently Enrolled in College / University</option>
                      <option>Working Professional</option>
                      <option>Dedicated IIT BS Learner (Single Degree)</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Current College / University / Employer Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Jadavpur University / TCS / Infosys"
                      value={formData.currentInstitution}
                      onChange={(e) => setFormData({ ...formData, currentInstitution: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-slate-300 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveTab('address')}
                  className="px-6 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold transition flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous: Address</span>
                </button>

                <button
                  type="submit"
                  className="px-8 py-3 bg-kgp-crimson hover:bg-kgp-darkred text-white font-bold rounded-xl shadow-md transition flex items-center gap-2 text-sm"
                >
                  <span>Save Academic Details &amp; Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: EXAM CITY PREFERENCES (/application_form/exam_city)                */}
        {/* ========================================================================= */}
        {activeTab === 'exam_city' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8 animate-in fade-in">
            <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold font-serif-title text-slate-900">
                  Exam City Preferences &amp; Testing Mode
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Select your test mode and preferred physical test centres across India for the Qualifier Examination.
                </p>
              </div>
              <span className="text-[11px] bg-slate-100 text-slate-600 font-mono px-2.5 py-1 rounded-lg border border-slate-200">
                Route: /application_form/exam_city
              </span>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleNextTab('exam_city'); }} className="space-y-8 text-xs">
              
              {/* Exam Mode Selector */}
              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-300 space-y-3">
                <label className="block text-slate-900 font-bold text-sm">
                  Qualifier Round Examination Mode *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className={`p-4 rounded-xl border-2 flex items-start gap-3 cursor-pointer transition ${
                    formData.examMode.includes('CBT') 
                      ? 'border-kgp-crimson bg-white shadow-sm' 
                      : 'border-slate-200 bg-slate-50 hover:bg-white'
                  }`}>
                    <input
                      type="radio"
                      name="examMode"
                      value="Computer-Based Test (CBT) at Partner Test Centre"
                      checked={formData.examMode.includes('CBT')}
                      onChange={(e) => setFormData({ ...formData, examMode: e.target.value })}
                      className="mt-1 text-kgp-crimson focus:ring-kgp-crimson"
                    />
                    <div>
                      <div className="font-bold text-slate-900 text-sm">In-Person CBT at Partner Test Centre</div>
                      <div className="text-slate-600 text-xs mt-0.5">
                        Conduct at TCS iON accredited physical test centres equipped with high-speed computers.
                      </div>
                    </div>
                  </label>

                  <label className={`p-4 rounded-xl border-2 flex items-start gap-3 cursor-pointer transition ${
                    formData.examMode.includes('Online') 
                      ? 'border-kgp-crimson bg-white shadow-sm' 
                      : 'border-slate-200 bg-slate-50 hover:bg-white'
                  }`}>
                    <input
                      type="radio"
                      name="examMode"
                      value="Online AI-Proctored Test (Remote from Home)"
                      checked={formData.examMode.includes('Online')}
                      onChange={(e) => setFormData({ ...formData, examMode: e.target.value })}
                      className="mt-1 text-kgp-crimson focus:ring-kgp-crimson"
                    />
                    <div>
                      <div className="font-bold text-slate-900 text-sm">Online AI-Proctored Test (Live Remote)</div>
                      <div className="text-slate-600 text-xs mt-0.5">
                        Take test from home on laptop/desktop with webcam, microphone, and stable internet.
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Exam Shift */}
              <div>
                <label className="block text-slate-700 font-bold mb-1.5">Exam Shift / Slot Preference *</label>
                <select
                  value={formData.examSlot}
                  onChange={(e) => setFormData({ ...formData, examSlot: e.target.value })}
                  className="w-full sm:w-1/2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm"
                >
                  <option>Shift 1: Forenoon (9:00 AM – 1:00 PM)</option>
                  <option>Shift 2: Afternoon (2:00 PM – 6:00 PM)</option>
                </select>
              </div>

              {/* 3 City Preferences */}
              <div className="space-y-4">
                <div className="font-bold text-slate-900 text-sm">
                  Test City Preferences (Order of Priority)
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-kgp-crimson text-white text-[10px] font-bold flex items-center justify-center">1</span>
                      <span>City Preference 1 *</span>
                    </label>
                    <select
                      value={formData.cityPref1}
                      onChange={(e) => setFormData({ ...formData, cityPref1: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-semibold"
                    >
                      {EXAM_CITIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-slate-300 text-slate-800 text-[10px] font-bold flex items-center justify-center">2</span>
                      <span>City Preference 2 *</span>
                    </label>
                    <select
                      value={formData.cityPref2}
                      onChange={(e) => setFormData({ ...formData, cityPref2: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-semibold"
                    >
                      {EXAM_CITIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-slate-300 text-slate-800 text-[10px] font-bold flex items-center justify-center">3</span>
                      <span>City Preference 3 *</span>
                    </label>
                    <select
                      value={formData.cityPref3}
                      onChange={(e) => setFormData({ ...formData, cityPref3: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-semibold"
                    >
                      {EXAM_CITIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveTab('academic')}
                  className="px-6 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold transition flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous: Academic</span>
                </button>

                <button
                  type="submit"
                  className="px-8 py-3 bg-kgp-crimson hover:bg-kgp-darkred text-white font-bold rounded-xl shadow-md transition flex items-center gap-2 text-sm"
                >
                  <span>Save Exam Preferences &amp; Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: DOCUMENT UPLOAD (/application_form/documents)                      */}
        {/* ========================================================================= */}
        {activeTab === 'documents' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8 animate-in fade-in">
            <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold font-serif-title text-slate-900">
                  Document Upload (Photo, Signature &amp; Govt ID)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Upload crisp scans for your official admit card and verification desk.
                </p>
              </div>
              <span className="text-[11px] bg-slate-100 text-slate-600 font-mono px-2.5 py-1 rounded-lg border border-slate-200">
                Route: /application_form/documents
              </span>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleNextTab('documents'); }} className="space-y-8 text-xs">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* 1. Passport Size Photo Upload */}
                <div className="p-5 rounded-2xl border-2 border-dashed border-slate-300 hover:border-kgp-crimson bg-slate-50/50 space-y-3 transition">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <Camera className="w-4 h-4 text-kgp-crimson" />
                      <span>Passport-size Photograph *</span>
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Uploaded
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Recent color photo with white background. Max size: 2MB (JPEG / PNG).
                  </p>
                  
                  {/* Photo Preview Box */}
                  <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-slate-200">
                    <div className="w-16 h-20 bg-slate-200 rounded-lg overflow-hidden border border-slate-300 flex items-center justify-center flex-shrink-0">
                      <img 
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" 
                        alt="Candidate Photo" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="font-bold text-slate-800 text-xs">{formData.photoName}</div>
                      <div className="text-[10px] text-slate-400">Dimensions: 3.5cm x 4.5cm | 240 DPI</div>
                      <button 
                        type="button"
                        onClick={() => alert('Simulated photo re-upload dialog.')}
                        className="text-[11px] text-kgp-crimson hover:underline font-semibold flex items-center gap-1"
                      >
                        <RefreshCw className="w-3 h-3" /> Change Photo
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2. Signature Upload */}
                <div className="p-5 rounded-2xl border-2 border-dashed border-slate-300 hover:border-kgp-crimson bg-slate-50/50 space-y-3 transition">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <FileText className="w-4 h-4 text-emerald-700" />
                      <span>Candidate Signature *</span>
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Uploaded
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Signature in black or dark blue ink on clean white unruled paper. Max size: 1MB.
                  </p>

                  {/* Signature Preview Box */}
                  <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-slate-200">
                    <div className="w-28 h-12 bg-white rounded-lg border border-slate-300 flex items-center justify-center font-serif italic text-slate-800 text-base font-bold select-none">
                      {formData.fullName || 'S. Samanta'}
                    </div>
                    <div className="space-y-1">
                      <div className="font-bold text-slate-800 text-xs">{formData.signName}</div>
                      <div className="text-[10px] text-slate-400">Resolution: 300 DPI | Verified</div>
                      <button 
                        type="button"
                        onClick={() => alert('Simulated signature re-upload dialog.')}
                        className="text-[11px] text-kgp-crimson hover:underline font-semibold flex items-center gap-1"
                      >
                        <RefreshCw className="w-3 h-3" /> Change Signature
                      </button>
                    </div>
                  </div>
                </div>

                {/* 3. Govt Photo ID Proof */}
                <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3 sm:col-span-2">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    <span>Government Issued Photo ID Card *</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Photo ID Type *</label>
                      <select
                        value={formData.idType}
                        onChange={(e) => setFormData({ ...formData, idType: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl border border-slate-300 bg-white text-sm"
                      >
                        <option>Aadhaar Card (UIDAI)</option>
                        <option>PAN Card</option>
                        <option>Passport</option>
                        <option>Voter ID Card</option>
                        <option>Driving License</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">ID Number *</label>
                      <input
                        type="text"
                        required
                        value={formData.idNumber}
                        onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl border border-slate-300 text-sm font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Uploaded PDF / Image *</label>
                      <div className="px-4 py-2 rounded-xl border border-slate-300 bg-slate-50 flex items-center justify-between text-xs text-slate-700">
                        <span className="truncate">{formData.idFileName}</span>
                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Category Certificate (Conditional if Fee Waiver requested) */}
                {['SC', 'ST', 'OBC-NCL', 'GEN-EWS'].includes(formData.category) && (
                  <div className="p-5 rounded-2xl border border-amber-300 bg-amber-50/50 space-y-3 sm:col-span-2">
                    <div className="font-bold text-amber-950 text-sm flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-700" />
                      <span>Category / Income Certificate (Required for {formData.category} &amp; Fee Waiver)</span>
                    </div>
                    <p className="text-[11px] text-amber-900">
                      Upload central format Caste / EWS / Income certificate issued by competent authority (Tahsildar / SDO / DM).
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1.5 bg-white border border-amber-300 rounded-xl text-xs font-mono text-slate-700">
                        central_category_certificate_{formData.category}.pdf
                      </span>
                      <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Attached
                      </span>
                    </div>
                  </div>
                )}

              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveTab('exam_city')}
                  className="px-6 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold transition flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous: Exam Cities</span>
                </button>

                <button
                  type="submit"
                  className="px-8 py-3 bg-kgp-crimson hover:bg-kgp-darkred text-white font-bold rounded-xl shadow-md transition flex items-center gap-2 text-sm"
                >
                  <span>Review Application &amp; Proceed to Payment</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: REVIEW & PAYMENT GATEWAY (/application_form/payment)                */}
        {/* ========================================================================= */}
        {activeTab === 'payment' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8 animate-in fade-in">
            <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold font-serif-title text-slate-900">
                  Application Review &amp; Qualifier Fee Payment
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Confirm all entered data before final submission and payment processing.
                </p>
              </div>
              <span className="text-[11px] bg-slate-100 text-slate-600 font-mono px-2.5 py-1 rounded-lg border border-slate-200">
                Route: /application_form/payment
              </span>
            </div>

            {/* APPLICATION SUMMARY SHEET */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-6 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Application Number</div>
                  <div className="text-lg font-mono font-black text-kgp-crimson">{formData.applicationNumber}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Programme Applied</div>
                  <div className="font-bold text-slate-800">BS in Data Science &amp; AI (IIT Kharagpur)</div>
                </div>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Candidate Full Name:</span>
                  <strong className="text-slate-900 text-sm">{formData.fullName}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Google Authenticated Email:</span>
                  <strong className="text-slate-900 font-mono">{formData.email}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Contact Mobile:</span>
                  <strong className="text-slate-900 font-mono">+91 {formData.phone}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Social Category:</span>
                  <strong className="text-slate-900">{formData.category}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Family Income:</span>
                  <strong className="text-slate-900">{formData.familyIncome}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Exam Mode:</span>
                  <strong className="text-slate-900">{formData.examMode}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Test City Preferences:</span>
                  <strong className="text-slate-900">{formData.cityPref1}, {formData.cityPref2}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Class 10 (Math &amp; Eng):</span>
                  <strong className="text-emerald-700">Verified ({formData.class10Score}%)</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Class 12 Stream &amp; Score:</span>
                  <strong className="text-slate-900">{formData.class12Stream.split(' ')[0]} ({formData.class12Score}%)</strong>
                </div>
              </div>
            </div>

            {/* PAYMENT SECTION */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              
              {/* Fee Breakdown Card */}
              <div className="p-6 rounded-2xl border-2 border-slate-200 bg-white space-y-4 text-xs">
                <div className="font-bold text-slate-900 text-sm flex items-center justify-between">
                  <span>Fee Calculation Breakdown</span>
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
                    Official IIT Tariff
                  </span>
                </div>

                <div className="space-y-2 border-t border-slate-100 pt-3">
                  <div className="flex justify-between text-slate-600">
                    <span>Base Qualifier Application Fee:</span>
                    <span>₹1,500</span>
                  </div>
                  {feeWaiverPercent > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Category / Income Fee Waiver ({feeWaiverPercent}%):</span>
                      <span>- ₹{1500 - payableAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-600">
                    <span>CBT Testing Infrastructure &amp; AI Proctoring:</span>
                    <span className="text-emerald-700 font-bold">Waived (₹0)</span>
                  </div>
                  <div className="pt-3 border-t border-slate-200 flex justify-between font-black text-lg text-slate-950">
                    <span>Total Amount Payable:</span>
                    <span className="text-kgp-crimson">₹{payableAmount}</span>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-[11px] text-emerald-800 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Secured via IIT Kharagpur Official SBI &amp; Canara Bank Gateway.</span>
                </div>
              </div>

              {/* UPI & Payment Selector */}
              <div className="p-6 rounded-2xl border-2 border-slate-200 bg-slate-50 space-y-4 text-xs text-center">
                <div className="font-bold text-slate-800 text-sm">Instant Fee Payment via UPI QR Code</div>
                
                {/* Simulated QR Code */}
                <div className="w-48 h-48 mx-auto border-2 border-slate-300 rounded-2xl p-2.5 bg-white flex flex-col items-center justify-center shadow-md">
                  <QrCode className="w-36 h-36 text-slate-900" />
                  <span className="text-[10px] text-slate-500 font-mono mt-1">UPI: iitkgp.bs@sbi</span>
                </div>

                <p className="text-[11px] text-slate-500">
                  Scan using Google Pay, PhonePe, Paytm or BHIM UPI app.
                </p>

                <button
                  type="button"
                  onClick={handleCompletePayment}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl shadow-lg transition flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Confirm Payment of ₹{payableAmount} &amp; Submit Application</span>
                </button>
              </div>

            </div>

            {/* Back Button */}
            <div className="pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setActiveTab('documents')}
                className="px-6 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold transition flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back to Documents</span>
              </button>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* COMPLETED STATE: APPLICATION SUBMITTED & LAUNCH CBT EXAM                  */}
        {/* ========================================================================= */}
        {activeTab === 'completed' && (
          <div className="bg-gradient-to-br from-slate-900 via-kgp-navy to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8 animate-in zoom-in-95 text-center">
            
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                Application Successfully Verified &amp; Fee Paid
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-serif-title">
                Congratulations, {formData.fullName}!
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
                Your application for the <strong>IIT Kharagpur BS in Data Science &amp; AI (Qualifier Round 2026)</strong> is fully confirmed.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="max-w-lg mx-auto bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-5 text-xs text-left space-y-3">
              <div className="flex justify-between pb-2 border-b border-white/10">
                <span className="text-slate-300">Candidate Name:</span>
                <strong className="text-white">{formData.fullName}</strong>
              </div>
              <div className="flex justify-between pb-2 border-b border-white/10">
                <span className="text-slate-300">Qualifier Roll Number:</span>
                <strong className="text-amber-400 font-mono text-sm">{formData.finalRollNo}</strong>
              </div>
              <div className="flex justify-between pb-2 border-b border-white/10">
                <span className="text-slate-300">Application Number:</span>
                <strong className="text-slate-200 font-mono">{formData.applicationNumber}</strong>
              </div>
              <div className="flex justify-between pb-2 border-b border-white/10">
                <span className="text-slate-300">Amount Paid:</span>
                <strong className="text-emerald-400 font-bold">₹{payableAmount} (Verified)</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">CBT Test Format:</span>
                <span className="text-slate-200 font-semibold">45 Mins | 4 AI &amp; Math Sections | Proctored</span>
              </div>
            </div>

            {/* Direct Launch Button */}
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
