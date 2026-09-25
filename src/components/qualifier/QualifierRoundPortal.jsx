import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle2, CreditCard, ArrowRight, ArrowLeft, ShieldCheck, 
  Award, QrCode, FileText, Lock, ChevronRight, ChevronLeft,
  Check, AlertCircle, Building, BookOpen, MapPin, Calendar, 
  Printer, Info, AlertTriangle, RotateCcw, Upload, FileUp, 
  Camera, Briefcase, GraduationCap, Eye, Trash2, Sparkles, 
  X, ExternalLink, ShieldAlert, FileCheck, User, Languages, Globe
} from 'lucide-react';
import { IIT_KGP_INFO } from '../../data/portalData';
import iitKgpLogo from '../../assets/logo';
import { saveNewApplication } from '../../data/applicationStore';
import StudentApplicationTrackerModal from '../student/StudentApplicationTrackerModal';

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

// Strict Identity Proof Validation Rules & Format Specifications
export const ID_CONFIGS = {
  "Aadhar Card": {
    label: "Aadhaar Card",
    badgeLabel: "12 Digits (Numbers only)",
    placeholder: "Enter 12-digit Aadhaar Number (e.g. 567812349012)",
    helpText: "Aadhaar must be exactly 12 numeric digits.",
    maxLength: 12,
    pattern: /^\d{12}$/,
    sanitize: (val) => (val || '').replace(/\D/g, '').slice(0, 12),
    validate: (val) => {
      const clean = (val || '').replace(/\D/g, '');
      if (!clean) return { valid: false, error: "Please enter your 12-digit Aadhaar Number." };
      if (clean.length < 12) return { valid: false, error: `Incomplete Aadhaar Number: Entered ${clean.length} of 12 digits. Exactly 12 digits required.` };
      if (clean.length > 12 || !/^\d{12}$/.test(clean)) return { valid: false, error: "Invalid Aadhaar: Must contain exactly 12 numeric digits." };
      return { valid: true };
    }
  },
  "PAN Card": {
    label: "PAN Card",
    badgeLabel: "10 Characters (5 Letters + 4 Digits + 1 Letter)",
    placeholder: "Enter 10-character PAN (e.g. ABCDE1234F)",
    helpText: "PAN must be exactly 10 alphanumeric characters (5 uppercase letters, 4 digits, 1 uppercase letter).",
    maxLength: 10,
    pattern: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
    sanitize: (val) => (val || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10),
    validate: (val) => {
      const clean = (val || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
      if (!clean) return { valid: false, error: "Please enter your 10-character PAN Card Number." };
      if (clean.length !== 10) return { valid: false, error: `Invalid PAN Length: Must be exactly 10 characters (currently ${clean.length} characters).` };
      if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(clean)) return { valid: false, error: "Invalid PAN Format: Must consist of 5 uppercase letters, followed by 4 digits, and 1 letter (e.g. ABCDE1234F)." };
      return { valid: true };
    }
  },
  "Passport": {
    label: "Passport",
    badgeLabel: "8 Characters (1 Letter + 7 Digits)",
    placeholder: "Enter Passport Number (e.g. A1234567)",
    helpText: "Passport must have 1 letter followed by 7 digits (8 characters in total).",
    maxLength: 8,
    pattern: /^[A-Z][0-9]{7}$/,
    sanitize: (val) => (val || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8),
    validate: (val) => {
      const clean = (val || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
      if (!clean) return { valid: false, error: "Please enter your Passport Number." };
      if (clean.length !== 8) return { valid: false, error: `Invalid Passport Length: Must be exactly 8 characters (1 letter followed by 7 digits). Currently ${clean.length} characters.` };
      if (!/^[A-Z][0-9]{7}$/.test(clean)) return { valid: false, error: "Invalid Passport Format: Must start with 1 alphabet letter followed by 7 digits (e.g. A1234567)." };
      return { valid: true };
    }
  },
  "Voter ID": {
    label: "Voter ID",
    badgeLabel: "10-character Alphanumeric",
    placeholder: "Enter 10-character Voter ID (e.g. WBF1234567)",
    helpText: "Voter ID must be exactly 10 characters in alphanumeric format (3 letters followed by 7 digits).",
    maxLength: 10,
    pattern: /^[A-Z0-9]{10}$/,
    sanitize: (val) => (val || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10),
    validate: (val) => {
      const clean = (val || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
      if (!clean) return { valid: false, error: "Please enter your Voter ID (EPIC) Number." };
      if (clean.length !== 10) return { valid: false, error: `Invalid Voter ID Length: Must be exactly 10 alphanumeric characters (currently ${clean.length} characters).` };
      if (!/^[A-Z0-9]{10}$/.test(clean)) return { valid: false, error: "Invalid Voter ID: Must be 10 alphanumeric characters (e.g. WBF1234567)." };
      return { valid: true };
    }
  },
  "Driving License": {
    label: "Driving License",
    badgeLabel: "15 Characters (2 Letters + 13 Digits)",
    placeholder: "Enter 15-character DL (e.g. WB0120150001234)",
    helpText: "Driving License must be a 15-character alphanumeric code containing 2 letters and 13 digits.",
    maxLength: 15,
    pattern: /^[A-Z]{2}[0-9]{13}$/,
    sanitize: (val) => (val || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 15),
    validate: (val) => {
      const clean = (val || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
      if (!clean) return { valid: false, error: "Please enter your Driving License Number." };
      if (clean.length !== 15) return { valid: false, error: `Invalid Driving License Length: Must be exactly 15 characters (2 state letters + 13 digits). Currently ${clean.length} characters.` };
      if (!/^[A-Z]{2}[0-9]{13}$/.test(clean)) return { valid: false, error: "Invalid Driving License Format: Must contain 2 state letters followed by 13 digits (e.g. WB0120150001234)." };
      return { valid: true };
    }
  },
  "Government Photo ID": {
    label: "Other Government ID with photo",
    badgeLabel: "Flexible Length (n numbers / alphanumeric)",
    placeholder: "Enter Government Photo ID Number (any number of digits/characters)",
    helpText: "Flexible input: enter any valid government-issued photo ID (supports variable length / any number of digits).",
    maxLength: 50,
    pattern: /^[A-Z0-9/-]{3,}$/i,
    sanitize: (val) => (val || '').toUpperCase().slice(0, 50),
    validate: (val) => {
      const clean = (val || '').trim();
      if (!clean) return { valid: false, error: "Please enter your Government ID Number." };
      if (clean.length < 3) return { valid: false, error: "ID Number is too short (minimum 3 characters)." };
      return { valid: true };
    }
  }
};

// Country Calling Codes for Applicant Mobile Number
export const COUNTRY_CODES = [
  { code: "+91", label: "+91 (India)" },
  { code: "+1", label: "+1 (USA / Canada)" },
  { code: "+44", label: "+44 (United Kingdom)" },
  { code: "+971", label: "+971 (UAE)" },
  { code: "+65", label: "+65 (Singapore)" },
  { code: "+880", label: "+880 (Bangladesh)" },
  { code: "+977", label: "+977 (Nepal)" },
  { code: "+975", label: "+975 (Bhutan)" },
  { code: "+94", label: "+94 (Sri Lanka)" },
  { code: "+61", label: "+61 (Australia)" },
  { code: "+49", label: "+49 (Germany)" },
  { code: "+33", label: "+33 (France)" },
  { code: "+81", label: "+81 (Japan)" },
  { code: "+966", label: "+966 (Saudi Arabia)" },
  { code: "+968", label: "+968 (Oman)" },
  { code: "+974", label: "+974 (Qatar)" },
  { code: "+965", label: "+965 (Kuwait)" },
  { code: "+60", label: "+60 (Malaysia)" }
];

// Class 12 / Higher Secondary Qualifying Passing Years from 1970 toward current admission year
export const PASSING_YEARS = Array.from({ length: 2027 - 1970 + 1 }, (_, i) => 2027 - i);

// Trilingual Dictionary for Institutional Scrutiny Portal (English, Bengali, Hindi)
const TRANSLATIONS = {
  en: {
    govHeader: "IIT KGP",
    translateLabel: "Translate / ভাষা / भाषा",
    portalTitle: "IIT Kharagpur Admissions Directorate",
    qualifierRound: "Qualifier Round 2026",
    formTitle: "Online Application Form",
    cbtDate: "Qualifier CBT Exam: 15 Nov, 2026",
    sslNote: "256-Bit SSL Encrypted Scrutiny System",
    back: "Back",
    exitHome: "Exit to Home",
    applicantLabel: "Applicant",
    newApplicant: "New Applicant",
    appProgress: "Application Progress",
    degreeTrack: "Degree Track:",
    appSections: "Application Steps",
    step1Title: "1. Personal",
    step1Sub: "Personal details & category",
    step2Title: "2. Exam Cities",
    step2Sub: "WB & Tripura preferences",
    step3Title: "3. Document Uploads",
    step3Sub: "Biometrics & certificates",
    step4Title: "4. Review & Pay",
    step4Sub: "Summary & fee payment",
    completed: "Completed",
    current: "Current",
    paid: "Paid",
    helpdesk: "Admissions Helpdesk",
    helpdeskAddr: "IIT Kharagpur Admissions Office, Main Academic Complex, Kharagpur – 721302.",
    sslSecured: "256-Bit SSL Secured",
    govtStandards: "Govt of India MoE & DigiLocker Standards",
    sec1Heading: "Section 1 of 3: Personal Details",
    sec1Sub: "All fields marked with * are mandatory",
    programLabel: "Which is the program you are most likely to pursue?",
    programSub: "You can change it later as per the allowed rules, if you wish.",
    nameLabel: "Applicant's Full Name",
    nameSub: "Name should be identical to the Name list on the Std X/Std XII marksheet. This name will be used on your final degree certificate, and no change is possible on this. Only Capital letters are allowed.",
    namePlaceholder: "ENTER FULL NAME AS ON MARKSHEET",
    dobLabel: "Date of Birth",
    dobSub: "Must not exceed today's date.",
    genderLabel: "Gender",
    citizenshipLabel: "Country of Citizenship",
    idTypeLabel: "ID Type",
    idTypeSub: "ID selected here will need to be uploaded for verification.",
    idNumberLabel: "ID Number",
    idNumberSub: "ID number of the ID selected above.",
    idNumberPlaceholder: "Enter ID number (e.g. 12-digit Aadhaar / PAN)",
    categoryLabel: "Category",
    categorySub: "If selecting SC / ST / EWS / OBC-NCL please upload relevant documents to avail waivers in fee / cut-off scores.",
    jeeLabel: "Did you qualify to appear for JEE Advanced in last 2 years?",
    jeeSub: "If selecting \"yes\", please upload relevant document in the document upload section.",
    pwdLabel: "Are you a Person with Disabilities (40% or more)?",
    pwdSub: "If selecting \"yes\", please upload relevant document in the document upload section.",
    defenceLabel: "Are you a defence / paramilitary personnel permanently disabled or ward?",
    defenceSub: "If selecting \"yes\", please upload relevant document in the document upload section.",
    workingProLabel: "Are you currently an employed working professional?",
    workingProSub: "If selecting \"yes\", employment verification document will be required.",
    class12StatusLabel: "Completion of Class 12 or equivalent examination.",
    class12YearLabel: "Year of Passing Class 12 or Equivalent Exam",
    phoneLabel: "Mobile Phone number",
    phonePlaceholder: "Enter 10-digit mobile number",
    declarationText: "I hereby declare that all personal information furnished above is correct. If any of the details furnished above is found to be false, I agree to have my application / admission cancelled or terminated.",
    saveContinueCity: "Save Personal Details & Continue to Exam Cities",
    sec2Heading: "Section 2 of 3: Exam City Options",
    examDateBadge: "Qualifier Exam Date: 15 November, 2026",
    countryFixed: "Fixed (India)",
    cityPref1: "Exam City Preference 1",
    cityPref2: "Exam City Preference 2",
    stateLabel: "State",
    cityLabel: "City / District",
    resetCities: "RESET Exam City Preferences",
    agreeCityTerms: "I have read the above terms and I agree to them",
    backPersonal: "Back to Personal Details",
    saveContinueDocs: "Save Exam Cities & Proceed to Document Uploads",
    sec3Heading: "Section 3 of 3: File & Document Uploads",
    sec3Sub: "Submit compliant digital scans for identity verification, reservation quota validation, and official CBT admit card issuance.",
    biometricHeading: "1. Candidate Biometric Records (Admit Card & Degree Printing)",
    photoTitle: "Passport Size Photograph",
    photoSpecs: "3.5 × 4.5 cm • JPEG / JPG • 50 KB – 150 KB • 80% Face Coverage",
    signTitle: "Official Candidate Signature",
    signSpecs: "3.5 × 1.5 cm • JPEG / JPG • 4 KB – 150 KB • Blue or Black Ink",
    uploadDoc: "Upload Document",
    reuploadDoc: "Re-upload",
    previewDoc: "Preview",
    signaturePlaceholder: "Candidate Signature",
    feeReconciliation: "Qualifier Fee Reconciliation",
    liveScrutiny: "Live Scrutiny Checklist",
    cbtSchedule: "Admissions & CBT Schedule",
    wbTripuraPolicy: "West Bengal & Tripura Centers",
    sec4Heading: "Section 4: Review Application & Complete Qualifier Fee Payment",
    backDocs: "Back to Document Uploads",
    confirmPayment: "Confirm Payment"
  },
  bn: {
    govHeader: "আইআইটি খড়গপুর (IIT KGP)",
    translateLabel: "অনুবাদ / ভাষা / Translate",
    portalTitle: "আইআইটি খড়গপুর ভর্তি নির্দেশালয়",
    qualifierRound: "কোয়ালিফায়ার রাউন্ড ২০২৬",
    formTitle: "অনলাইন আবেদনপত্র",
    cbtDate: "কোয়ালিফায়ার পরীক্ষা: ১৫ নভেম্বর, ২০২৬",
    sslNote: "২৫৬-বিট এসএসএল সুরক্ষিত স্ক্রুটিনি ব্যবস্থা",
    back: "পেছনে",
    exitHome: "হোমে ফিরুন",
    applicantLabel: "আবেদনকারী",
    newApplicant: "নতুন আবেদনকারী",
    appProgress: "আবেদন অগ্রগতি",
    degreeTrack: "ডিগ্রি পাঠ্যক্রম:",
    appSections: "আবেদনের ধাপসমূহ",
    step1Title: "১. ব্যক্তিগত বিবরণ",
    step1Sub: "ব্যক্তিগত তথ্য ও সংরক্ষণ কোটা",
    step2Title: "২. পরীক্ষার শহর",
    step2Sub: "পশ্চিমবঙ্গ ও ত্রিপুরা কেন্দ্র পছন্দ",
    step3Title: "৩. নথি আপলোড",
    step3Sub: "বায়োমেট্রিক ও প্রশংসাপত্র স্ক্যান",
    step4Title: "৪. পর্যালোচনা ও ফি",
    step4Sub: "যাচাই ও ফি প্রদান",
    completed: "সম্পন্ন",
    current: "চলমান",
    paid: "প্রদত্ত",
    helpdesk: "ভর্তি সহায়তা কেন্দ্র",
    helpdeskAddr: "আইআইটি খড়গপুর ভর্তি কার্যালয়, মেইন একাডেমিক কমপ্লেক্স, খড়গপুর – ৭২১৩০২।",
    sslSecured: "২৫৬-বিট এসএসএল সুরক্ষিত",
    govtStandards: "ভারত সরকার শিক্ষা মন্ত্রক ও ডিজিলকার অনুমোদিত",
    sec1Heading: "বিভাগ ১ / ৩: ব্যক্তিগত বিবরণ",
    sec1Sub: "* চিহ্নিত সমস্ত ক্ষেত্র পূরণ করা বাধ্যতামূলক",
    programLabel: "আপনি কোন প্রোগ্রামে ভর্তি হতে ইচ্ছুক?",
    programSub: "পরবর্তীতে নিয়মাবলী অনুযায়ী পরিবর্তন করা যাবে।",
    nameLabel: "আবেদনকারীর পুরো নাম",
    nameSub: "নাম মাধ্যমিক/উচ্চমাধ্যমিক মার্কশিটের সাথে হুবহু মিলতে হবে। শুধুমাত্র বড় হাতের অক্ষর (CAPITAL) গ্রহণযোগ্য।",
    namePlaceholder: "মার্কশিট অনুযায়ী পুরো নাম লিখুন (CAPITAL)",
    dobLabel: "জন্ম তারিখ",
    dobSub: "আজকের তারিখ অতিক্রম করা যাবে না।",
    genderLabel: "লিঙ্গ",
    citizenshipLabel: "নাগরিকত্বের দেশ",
    idTypeLabel: "পরিচয়পত্রের ধরন",
    idTypeSub: "এখানে নির্বাচিত পরিচয়পত্রটি যাচাইয়ের জন্য আপলোড করতে হবে।",
    idNumberLabel: "পরিচয়পত্র নম্বর",
    idNumberSub: "নির্বাচিত পরিচয়পত্রের সঠিক নম্বর লিখুন।",
    idNumberPlaceholder: "পরিচয়পত্র নম্বর লিখুন (যেমন ১২-সংখ্যার আধার / প্যান)",
    categoryLabel: "শ্রেণী / সংরক্ষণ কোটা",
    categorySub: "SC / ST / EWS / OBC-NCL নির্বাচন করলে ফি ও নম্বরে ছাড় পেতে সংশ্লিষ্ট প্রশংসাপত্র আপলোড করুন।",
    jeeLabel: "আপনি কি বিগত ২ বছরে জেইই অ্যাডভান্সড পরীক্ষায় বসার যোগ্যতা অর্জন করেছেন?",
    jeeSub: "\"হ্যাঁ\" নির্বাচন করলে সংশ্লিষ্ট প্রমাণপত্র আপলোড করুন।",
    pwdLabel: "আপনি কি বিশেষ সক্ষম ব্যক্তি (PwD ৪০% বা ততোধিক)?",
    pwdSub: "\"হ্যাঁ\" নির্বাচন করলে বিশেষ সক্ষমতার মেডিকেল বোর্ড প্রশংসাপত্র আপলোড করুন।",
    defenceLabel: "আপনি কি প্রতিরক্ষা/আধাসামরিক বাহিনীর স্থায়ীভাবে অক্ষম সদস্য বা তাদের সন্তান?",
    defenceSub: "\"হ্যাঁ\" নির্বাচন করলে জেলা সৈনিক বোর্ডের প্রমাণপত্র আপলোড করুন।",
    workingProLabel: "আপনি কি বর্তমানে কর্মরত চাকুরিজীবী?",
    workingProSub: "\"হ্যাঁ\" নির্বাচন করলে কর্মসংস্থান প্রমাণপত্র / এনওসি প্রয়োজন হবে।",
    class12StatusLabel: "দ্বাদশ শ্রেণি বা সমমানের পরীক্ষা পাসের অবস্থা",
    class12YearLabel: "দ্বাদশ শ্রেণি বা সমমান পাসের বছর",
    phoneLabel: "মোবাইল ফোন নম্বর",
    phonePlaceholder: "১০-সংখ্যার মোবাইল নম্বর লিখুন",
    declarationText: "আমি ঘোষণা করছি যে উপরে প্রদত্ত সমস্ত ব্যক্তিগত তথ্য সম্পূর্ণ সত্য ও নির্ভুল। কোন তথ্য অসত্য প্রমাণিত হলে আবেদন বাতিল বলে গণ্য হবে।",
    saveContinueCity: "বিবরণ সংরক্ষণ করুন ও পরীক্ষার শহর নির্বাচন করুন",
    sec2Heading: "বিভাগ ২ / ৩: পরীক্ষার শহর পছন্দ",
    examDateBadge: "কোয়ালিফায়ার পরীক্ষার তারিখ: ১৫ নভেম্বর, ২০২৬",
    countryFixed: "নির্দিষ্ট (ভারত)",
    cityPref1: "পরীক্ষার শহর পছন্দ ১",
    cityPref2: "পরীক্ষার শহর পছন্দ ২",
    stateLabel: "রাজ্য",
    cityLabel: "শহর / জেলা",
    resetCities: "পছন্দ রিসেট করুন",
    agreeCityTerms: "আমি উপরের শর্তাবলী পড়েছি এবং সম্মত হয়েছি",
    backPersonal: "ব্যক্তিগত বিবরণে ফিরুন",
    saveContinueDocs: "শহর সংরক্ষণ করুন ও নথি আপলোডে এগিয়ে যান",
    sec3Heading: "বিভাগ ৩ / ৩: ফাইল ও নথি আপলোড",
    sec3Sub: "প্রবেশপত্র ও অফিসিয়াল পরীক্ষার জন্য স্পষ্ট ডিজিটাল স্ক্যান জমা দিন।",
    biometricHeading: "১. বায়োমেট্রিক রেকর্ড (অ্যাডমিট কার্ড ও ডিগ্রি মুদ্রণ)",
    photoTitle: "পাসপোর্ট সাইজ ছবি",
    photoSpecs: "৩.৫ × ৪.৫ সেমি • JPEG / JPG • ৫০KB – ১৫০KB • ৮০% মুখমণ্ডল",
    signTitle: "আবেদনকারীর ডিজিটাল স্বাক্ষর",
    signSpecs: "৩.৫ × ১.৫ সেমি • JPEG / JPG • ৪KB – ১৫০KB • নীল বা কালো কালি",
    uploadDoc: "নথি আপলোড করুন",
    reuploadDoc: "পুনরায় আপলোড",
    previewDoc: "প্রাকদর্শন",
    signaturePlaceholder: "আবেদনকারীর স্বাক্ষর",
    feeReconciliation: "আবেদন ফি বিবরণ",
    liveScrutiny: "লাইভ স্ক্রুটিনি চেকলিস্ট",
    cbtSchedule: "ভর্তি ও সিবিটি সময়সূচি",
    wbTripuraPolicy: "পশ্চিমবঙ্গ ও ত্রিপুরার জেলা কেন্দ্র",
    sec4Heading: "বিভাগ ৪: আবেদন পর্যালোচনা ও ফি প্রদান",
    backDocs: "নথি আপলোডে ফিরুন",
    confirmPayment: "ফি প্রদান নিশ্চিত করুন"
  },
  hi: {
    govHeader: "आईआईटी खड़गपुर (IIT KGP)",
    translateLabel: "अनुवाद / भाषा / Translate",
    portalTitle: "आईआईटी खड़गपुर प्रवेश निदेशालय",
    qualifierRound: "क्वालिफायर राउंड 2026",
    formTitle: "ऑनलाइन आवेदन पत्र",
    cbtDate: "क्वालिफायर परीक्षा तिथि: 15 नवंबर, 2026",
    sslNote: "256-बिट एसएसएल सुरक्षित स्क्रूटिनी प्रणाली",
    back: "वापस",
    exitHome: "होम पर जाएं",
    applicantLabel: "आवेदक",
    newApplicant: "नया आवेदक",
    appProgress: "आवेदन प्रगति",
    degreeTrack: "डिग्री पाठ्यक्रम:",
    appSections: "आवेदन के चरण",
    step1Title: "1. व्यक्तिगत विवरण",
    step1Sub: "व्यक्तिगत जानकारी एवं श्रेणी",
    step2Title: "2. परीक्षा शहर",
    step2Sub: "पश्चिम बंगाल व त्रिपुरा विकल्प",
    step3Title: "3. दस्तावेज़ अपलोड",
    step3Sub: "बायोमेट्रिक्स एवं प्रमाण पत्र",
    step4Title: "4. समीक्षा एवं शुल्क",
    step4Sub: "सत्यापन एवं ऑनलाइन शुल्क",
    completed: "पूर्ण",
    current: "सक्रिय",
    paid: "भुगतान हुआ",
    helpdesk: "प्रवेश सहायता केंद्र",
    helpdeskAddr: "आईआईटी खड़गपुर प्रवेश कार्यालय, मुख्य शैक्षणिक परिसर, खड़गपुर – 721302।",
    sslSecured: "256-बिट एसएसएल सुरक्षित",
    govtStandards: "भारत सरकार शिक्षा मंत्रालय एवं डिजिलॉकर मानकों के अनुरूप",
    sec1Heading: "भाग 1 / 3: व्यक्तिगत विवरण",
    sec1Sub: "* चिह्नित सभी फ़ील्ड अनिवार्य हैं",
    programLabel: "आप किस कार्यक्रम में प्रवेश लेना चाहते हैं?",
    programSub: "नियमों के अनुसार इसे बाद में बदला जा सकता है।",
    nameLabel: "आवेदक का पूरा नाम",
    nameSub: "नाम 10वीं/12वीं की अंकतालिका के अनुसार होना चाहिए। केवल बड़े अक्षर (CAPITAL) ही मान्य हैं।",
    namePlaceholder: "अंकतालिका के अनुसार पूरा नाम दर्ज करें (CAPITAL)",
    dobLabel: "जन्म तिथि",
    dobSub: "आज की तिथि से अधिक नहीं हो सकती।",
    genderLabel: "लिंग",
    citizenshipLabel: "नागरिकता का देश",
    idTypeLabel: "पहचान पत्र का प्रकार",
    idTypeSub: "सत्यापन के लिए इस पहचान पत्र की प्रति अपलोड करनी होगी।",
    idNumberLabel: "पहचान पत्र संख्या",
    idNumberSub: "चयनित पहचान पत्र की वैध संख्या दर्ज करें।",
    idNumberPlaceholder: "पहचान संख्या दर्ज करें (उदा. 12-अंकीय आधार / पैन)",
    categoryLabel: "श्रेणी / आरक्षण",
    categorySub: "SC / ST / EWS / OBC-NCL चुनने पर शुल्क व कट-ऑफ छूट हेतु प्रमाण पत्र अपलोड करें।",
    jeeLabel: "क्या आप पिछले 2 वर्षों में जेईई एडवांस्ड परीक्षा में शामिल होने के पात्र थे?",
    jeeSub: "\"हाँ\" चुनने पर दस्तावेज़ अपलोड अनुभाग में प्रमाण पत्र अपलोड करें।",
    pwdLabel: "क्या आप दिव्यांगजन (PwD 40% या अधिक) हैं?",
    pwdSub: "\"हाँ\" चुनने पर मेडिकल बोर्ड प्रमाण पत्र अपलोड करें।",
    defenceLabel: "क्या आप रक्षा/अर्धसैनिक बल के स्थायी रूप से अक्षम सदस्य या उनके आश्रित हैं?",
    defenceSub: "\"हाँ\" चुनने पर जिला सैनिक बोर्ड प्रमाण पत्र अपलोड करें।",
    workingProLabel: "क्या आप वर्तमान में कार्यरत पेशेवर हैं?",
    workingProSub: "\"हाँ\" चुनने पर रोजगार सत्यापन / एनओसी आवश्यक होगा।",
    class12StatusLabel: "12वीं कक्षा या समकक्ष परीक्षा की स्थिति",
    class12YearLabel: "12वीं कक्षा उत्तीर्ण करने का वर्ष",
    phoneLabel: "मोबाइल फ़ोन नंबर",
    phonePlaceholder: "10-अंकीय मोबाइल नंबर दर्ज करें",
    declarationText: "मैं एतद्द्वारा घोषणा करता/करती हूँ कि ऊपर दी गई सभी जानकारी पूर्णतः सत्य और सही है। यदि कोई विवरण गलत पाया गया तो आवेदन रद्द किया जा सकता है।",
    saveContinueCity: "विवरण सहेजें एवं परीक्षा शहर का चयन करें",
    sec2Heading: "भाग 2 / 3: परीक्षा शहर विकल्प",
    examDateBadge: "क्वालिफायर परीक्षा तिथि: 15 नवंबर, 2026",
    countryFixed: "निश्चित (भारत)",
    cityPref1: "परीक्षा शहर प्राथमिकता 1",
    cityPref2: "परीक्षा शहर प्राथमिकता 2",
    stateLabel: "राज्य",
    cityLabel: "शहर / ज़िला",
    resetCities: "प्राथमिकताएं रीसेट करें",
    agreeCityTerms: "मैंने उपरोक्त नियम व शर्तें पढ़ ली हैं और मैं सहमत हूँ",
    backPersonal: "व्यक्तिगत विवरण पर वापस जाएं",
    saveContinueDocs: "शहर सहेजें एवं दस्तावेज़ अपलोड पर जाएं",
    sec3Heading: "भाग 3 / 3: फ़ाइल एवं दस्तावेज़ अपलोड",
    sec3Sub: "प्रवेश पत्र एवं सत्यापन हेतु मूल दस्तावेज़ों के डिजिटल स्कैन अपलोड करें।",
    biometricHeading: "1. बायोमेट्रिक रिकॉर्ड (प्रवेश पत्र एवं डिग्री मुद्रण)",
    photoTitle: "पासपोर्ट आकार का फोटो",
    photoSpecs: "3.5 × 4.5 सेमी • JPEG / JPG • 50 KB – 150 KB • 80% चेहरा",
    signTitle: "आवेदक के डिजिटल हस्ताक्षर",
    signSpecs: "3.5 × 1.5 सेमी • JPEG / JPG • 4 KB – 150 KB • नीली या काली स्याही",
    uploadDoc: "दस्तावेज़ अपलोड करें",
    reuploadDoc: "पुनः अपलोड",
    previewDoc: "पूर्वावलोकन",
    signaturePlaceholder: "आवेदक के हस्ताक्षर",
    feeReconciliation: "शुल्क विवरण",
    liveScrutiny: "लाइव सत्यापन चेकलिस्ट",
    cbtSchedule: "प्रवेश एवं परीक्षा समय सारणी",
    wbTripuraPolicy: "पश्चिम बंगाल एवं त्रिपुरा ज़िला केंद्र",
    sec4Heading: "भाग 4: आवेदन समीक्षा एवं शुल्क भुगतान",
    backDocs: "दस्तावेज़ अपलोड पर वापस जाएं",
    confirmPayment: "भुगतान की पुष्टि करें"
  }
};

export default function QualifierRoundPortal({ initialCandidate, onStartExam, onBackToHome }) {
  // Wizard steps: 
  // 1 = Section 1: Personal Details
  // 2 = Section 2: Exam City Options
  // 3 = Section 3: File & Document Uploads
  // 4 = Review & Pay
  // 5 = Completed & CBT Engine
  const [section, setSection] = useState(1);
  const [formError, setFormError] = useState('');
  const [previewModalDoc, setPreviewModalDoc] = useState(null);

  // Active language state ('en' | 'bn' | 'hi')
  const [lang, setLang] = useState('en');
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  // Language switch handler with Google Translate synchronization and banner suppression
  const changeLanguage = (newLang) => {
    setLang(newLang);
    try {
      document.cookie = `googtrans=/en/${newLang}; path=/;`;
      const combo = document.querySelector('.goog-te-combo');
      if (combo) {
        combo.value = newLang;
        combo.dispatchEvent(new Event('change'));
      }
      if (document.body && document.body.style) {
        document.body.style.top = '0px';
      }
      const frames = document.querySelectorAll('.goog-te-banner-frame, iframe[class*="goog-te-banner"], iframe.skiptranslate, .VIpgJd-ZVi9od-aHeUd-OwkiMe-hTkFd, .VIpgJd-ZVi9od-ORHb-OEVmcd');
      frames.forEach(f => {
        f.style.setProperty('display', 'none', 'important');
        f.style.setProperty('visibility', 'hidden', 'important');
        f.style.setProperty('height', '0px', 'important');
      });
    } catch {
      // ignore
    }
  };

  // Dynamically compute today's date in YYYY-MM-DD
  const todayDateString = new Date().toISOString().split('T')[0];

  // Master Form State - completely clean and unpopulated by default
  const [formData, setFormData] = useState({
    // Section 1 of 3: Personal Details
    program: "BS in Data Science and Artificial Intelligence (AI)",
    fullName: initialCandidate?.name ? initialCandidate.name.toUpperCase() : "",
    email: initialCandidate?.email || "",
    dob: "",
    gender: "Male",
    citizenship: "India",
    idType: "Aadhar Card",
    idNumber: "",
    category: "General",
    jeeAdvancedQualified: "No",
    isPwd: "No",
    isDefencePersonnel: "No",
    isWorkingProfessional: "No",
    class12Status: "Already completed/ Awaiting result",
    class12PassingYear: "2024",
    phoneCountryCode: "+91",
    phone: "",
    declarationPersonal: false,

    // Section 2 of 3: Exam City Options
    examCountry: "India",
    pref1State: "West Bengal",
    pref1City: DISTRICTS_WEST_BENGAL[0],
    pref2State: "West Bengal",
    pref2City: DISTRICTS_WEST_BENGAL[1],
    agreeExamCityTerms: false,

    // Section 3 of 3: Higher Secondary Selection (Option A: Class 12th vs Option B: Polytechnic Diploma)
    higherSecChoice: "class12",

    // Document Files Registry (ALL EMPTY by default for genuine candidate uploads)
    docs: {
      photo: { uploaded: false, name: "", size: "", type: "", previewUrl: null },
      signature: { uploaded: false, name: "", size: "", type: "", previewUrl: null },
      idProof: { uploaded: false, name: "", size: "", type: "" },
      categoryCert: { uploaded: false, name: "", size: "", type: "" },
      pwdCert: { uploaded: false, name: "", size: "", type: "" },
      defenceCert: { uploaded: false, name: "", size: "", type: "" },
      jeeProof: { uploaded: false, name: "", size: "", type: "" },
      class10: { uploaded: false, name: "", size: "", type: "" },
      class12: { uploaded: false, name: "", size: "", type: "" },
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

  // Tracking Modal & Payment Transaction States
  const [showTrackerModal, setShowTrackerModal] = useState(false);
  const [paymentUtr, setPaymentUtr] = useState(() => 'SBI' + Math.floor(100000000 + Math.random() * 900000000));
  const [paymentMode, setPaymentMode] = useState('UPI (Google Pay)');
  const [paymentBank, setPaymentBank] = useState('State Bank of India');

  // Keep verified credentials in sync if candidate logs in via Google
  useEffect(() => {
    if (initialCandidate) {
      setFormData(prev => ({
        ...prev,
        fullName: initialCandidate.name ? initialCandidate.name.toUpperCase() : prev.fullName,
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

  // Calculate overall application progress percentage
  const calculateProgress = () => {
    if (section === 5) return 100;
    if (section === 4) return 85;
    if (section === 3) return 65;
    if (section === 2) return 40;
    return 20;
  };

  // Mandatory verification documents registry
  const mandatoryDocsKeys = ['photo', 'signature', 'idProof', 'class10', formData.higherSecChoice === 'diploma' ? 'diplomaCert' : 'class12'];
  const mandatoryUploadedCount = mandatoryDocsKeys.filter(k => formData.docs[k]?.uploaded).length;

  // Current ID Type configuration and live validation status
  const currentIdConfig = ID_CONFIGS[formData.idType] || ID_CONFIGS["Aadhar Card"];
  const currentIdValidation = currentIdConfig.validate(formData.idNumber);
  const isCurrentIdValid = currentIdValidation.valid;

  // Get cities based on selected state (West Bengal or Tripura)
  const getCitiesForState = (stateName) => {
    if (stateName === "Tripura") return DISTRICTS_TRIPURA;
    return DISTRICTS_WEST_BENGAL;
  };

  // Helper for real or simulated file upload
  const handleFileUpload = (docKey, file) => {
    if (!file) return;
    const formattedSize = file.size > 1024 * 1024 
      ? (file.size / (1024 * 1024)).toFixed(1) + " MB" 
      : Math.round(file.size / 1024) + " KB";

    let previewUrl = null;
    if (file.type && file.type.startsWith('image/')) {
      previewUrl = URL.createObjectURL(file);
    }

    setFormData(prev => ({
      ...prev,
      docs: {
        ...prev.docs,
        [docKey]: {
          uploaded: true,
          name: file.name,
          size: formattedSize,
          type: file.type || "application/pdf",
          previewUrl: previewUrl || prev.docs[docKey]?.previewUrl
        }
      }
    }));
  };

  // Pre-fill sample document attachments
  const handlePreFillDocuments = () => {
    setFormData(prev => ({
      ...prev,
      docs: {
        photo: { 
          uploaded: true, 
          name: "passport_photo_applicant.jpg", 
          size: "78 KB", 
          type: "image/jpeg",
          previewUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
        },
        signature: { 
          uploaded: true, 
          name: "applicant_signature.jpg", 
          size: "26 KB", 
          type: "image/jpeg",
          previewUrl: null
        },
        idProof: { 
          uploaded: true, 
          name: "aadhaar_card_front_back.pdf", 
          size: "450 KB", 
          type: "application/pdf" 
        },
        categoryCert: prev.category !== 'General' 
          ? { uploaded: true, name: `category_certificate_${prev.category}.pdf`, size: "520 KB", type: "application/pdf" } 
          : { uploaded: false, name: "", size: "" },
        pwdCert: prev.isPwd === 'Yes' 
          ? { uploaded: true, name: "pwd_medical_board_certificate.pdf", size: "480 KB", type: "application/pdf" } 
          : { uploaded: false, name: "", size: "" },
        defenceCert: prev.isDefencePersonnel === 'Yes' 
          ? { uploaded: true, name: "defence_service_ward_proof.pdf", size: "390 KB", type: "application/pdf" } 
          : { uploaded: false, name: "", size: "" },
        jeeProof: prev.jeeAdvancedQualified === 'Yes' 
          ? { uploaded: true, name: "jee_advanced_admit_score.pdf", size: "340 KB", type: "application/pdf" } 
          : { uploaded: false, name: "", size: "" },
        class10: { 
          uploaded: true, 
          name: "std_x_secondary_marksheet.pdf", 
          size: "620 KB", 
          type: "application/pdf" 
        },
        class12: prev.higherSecChoice === 'class12' 
          ? { uploaded: true, name: "std_xii_higher_secondary_certificate.pdf", size: "840 KB", type: "application/pdf" } 
          : { uploaded: false, name: "", size: "" },
        diplomaCert: prev.higherSecChoice === 'diploma' 
          ? { uploaded: true, name: "polytechnic_diploma_certificate.pdf", size: "910 KB", type: "application/pdf" } 
          : { uploaded: false, name: "", size: "" },
        ugDegree: { uploaded: false, name: "", size: "" },
        pgDegree: { uploaded: false, name: "", size: "" },
        phdDegree: { uploaded: false, name: "", size: "" },
        employmentProof: prev.isWorkingProfessional === 'Yes' 
          ? { uploaded: true, name: "employer_noc_id_card.pdf", size: "420 KB", type: "application/pdf" } 
          : { uploaded: false, name: "", size: "" }
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

    // Strict ID Type & Number validation as per institutional scrutiny rules
    const idValidation = currentIdConfig.validate(formData.idNumber);
    if (!idValidation.valid) {
      setFormError(idValidation.error);
      return;
    }

    // Parameter: Mobile number must be always exactly 10 digits
    if (!formData.phone.trim()) {
      setFormError("Please enter your 10-digit Mobile Phone number.");
      return;
    }
    if (formData.phone.length !== 10) {
      setFormError(`Invalid Mobile Number: Mobile number must be always exactly 10 digits (currently ${formData.phone.length} digits).`);
      return;
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      setFormError("Invalid Mobile Number: Mobile number must contain numbers only.");
      return;
    }

    // E-Document verification: If selecting "Yes", relevant document must be uploaded
    if (formData.jeeAdvancedQualified === 'Yes' && !formData.docs.jeeProof.uploaded) {
      setFormError("Missing E-Document: Since you selected 'Yes' for JEE Advanced eligibility, please upload your relevant document in the document upload section.");
      return;
    }
    if (formData.isPwd === 'Yes' && !formData.docs.pwdCert.uploaded) {
      setFormError("Missing E-Document: Since you selected 'Yes' for Person with Disabilities (PwD), please upload your relevant disability certificate in the document upload section.");
      return;
    }
    if (formData.isDefencePersonnel === 'Yes' && !formData.docs.defenceCert.uploaded) {
      setFormError("Missing E-Document: Since you selected 'Yes' for Defence personnel quota, please upload your relevant certificate in the document upload section.");
      return;
    }
    if (formData.isWorkingProfessional === 'Yes' && !formData.docs.employmentProof.uploaded) {
      setFormError("Missing E-Document: Since you selected 'Yes' for Working Professional, please upload your relevant employment verification in the document upload section.");
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
    const generatedAppNo = formData.applicationNo || ("KGP-2026-" + Math.floor(1000 + Math.random() * 9000));
    
    // Construct real-time application record for Admin scrutiny
    const appRecord = {
      id: generatedAppNo,
      roll: finalRoll,
      name: formData.fullName || "Candidate",
      email: formData.email || formData.emailAddress || (initialCandidate?.email || "applicant@kgp.ac.in"),
      phone: formData.phone || formData.phoneNo || "+91 98301 00000",
      level: formData.program || "Foundation Level",
      pathway: formData.jeeAdvancedQualified === 'Yes' ? "Direct Entry: JEE Advanced Exempt" : "Qualifier Round Examination",
      category: formData.category || "General",
      idType: formData.idType,
      idNumber: formData.idNumber,
      incomeTier: feeWaiverText || "> 5 LPA (Standard)",
      status: "Pending Review",
      rejectionReason: "",
      submissionDate: new Date().toLocaleString(),
      examCity: `${formData.pref1City}, ${formData.pref1State}`,
      docs: {
        genInfo: "Uploaded (Pending Review)",
        education: "Uploaded (Pending Review)",
        photo: "Uploaded",
        fee: "Pending Reconciliation"
      },
      payment: {
        amount: payableAmount,
        utr: paymentUtr || ("SBI" + Math.floor(100000000 + Math.random() * 900000000)),
        mode: paymentMode,
        bank: paymentBank,
        date: new Date().toLocaleString(),
        status: "Pending Review",
        bankStatus: "Awaiting Bank Settlement Scrutiny",
        queryRemarks: "",
        receiptName: "payment_receipt.pdf"
      }
    };

    // Save to shared application store
    saveNewApplication(appRecord);

    setFormData(prev => ({ 
      ...prev, 
      finalRollNo: finalRoll,
      applicationNo: generatedAppNo 
    }));
    setSection(5);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Header Back button handler
  const handleHeaderBack = () => {
    if (section > 1) {
      setSection(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (onBackToHome) onBackToHome();
      else window.history.back();
    }
  };

  // Institutional Academic Document Scrutiny Row / Card
  const AcademicDocRow = ({ 
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
      <div className={`p-4 sm:p-5 rounded-2xl border transition-all ${
        docData.uploaded 
          ? 'bg-white border-slate-300 shadow-xs hover:border-slate-400' 
          : requirementType === 'Mandatory'
            ? 'bg-white border-amber-300/80 shadow-xs'
            : 'bg-slate-50/70 border-slate-200'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Document Information & Specifications */}
          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-slate-900 text-sm">{title}</span>
              {requirementType === 'Mandatory' && (
                <span className="text-[10px] bg-red-50 text-red-700 font-extrabold px-2 py-0.5 rounded border border-red-200 uppercase tracking-wide">
                  Mandatory
                </span>
              )}
              {requirementType === 'Conditional' && (
                <span className="text-[10px] bg-amber-50 text-amber-800 font-extrabold px-2 py-0.5 rounded border border-amber-200 uppercase tracking-wide">
                  Quota Required
                </span>
              )}
              {requirementType === 'Optional' && (
                <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded border border-slate-200">
                  If Applicable
                </span>
              )}
            </div>

            <div className="text-[11px] text-slate-500 font-mono flex items-center gap-2">
              <span className="inline-block px-1.5 py-0.5 bg-slate-100 rounded text-slate-600 font-sans text-[10px] font-semibold">
                Permissible Formats
              </span>
              <span>{specs}</span>
            </div>

            {conditionalNote && (
              <div className="text-[11px] text-amber-900 bg-amber-50/60 px-2 py-0.5 rounded border border-amber-200/60 inline-block">
                {conditionalNote}
              </div>
            )}
          </div>

          {/* Upload Status & University Action Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:justify-end flex-shrink-0">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={(e) => handleFileUpload(docKey, e.target.files[0])}
            />

            {docData.uploaded ? (
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="text-left bg-emerald-50 border border-emerald-300 rounded-xl px-3 py-1.5 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <div>
                    <div className="text-[11px] font-bold text-slate-800 truncate max-w-[180px]">
                      {docData.name}
                    </div>
                    <div className="text-[9px] text-emerald-700 font-mono">
                      Scrutiny Ready • {docData.size}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setPreviewModalDoc({ title, ...docData })}
                    className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl border border-slate-300 flex items-center gap-1 transition"
                    title="View Document Scrutiny Preview"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-600" />
                    <span className="hidden sm:inline">Preview</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-2.5 py-1.5 bg-white hover:bg-slate-50 text-kgp-crimson font-bold text-xs rounded-xl border border-kgp-crimson/40 transition"
                  >
                    Re-upload
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        docs: { ...prev.docs, [docKey]: { uploaded: false, name: "", size: "" } }
                      }));
                    }}
                    className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition"
                    title="Remove attachment"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-slate-900 hover:bg-kgp-crimson text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-2"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Document</span>
              </button>
            )}
          </div>

        </div>
      </div>
    );
  };

  // Mini E-Document Uploader for Section 1 (when candidate selects "Yes")
  const InlineDocUploadBox = ({ docKey, label, description, fileAccept = ".pdf,image/jpeg,image/jpg" }) => {
    const docData = formData.docs[docKey] || { uploaded: false, name: "", size: "" };
    const inlineInputRef = useRef(null);

    return (
      <div className="mt-3 p-3.5 rounded-xl bg-amber-50/90 border border-amber-300 space-y-2 animate-in fade-in">
        <div className="flex items-center justify-between">
          <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-amber-700" />
            <span>{label}</span>
          </span>
          <span className="text-[10px] bg-red-100 text-red-800 font-extrabold px-2 py-0.5 rounded border border-red-200 uppercase tracking-wide">
            Mandatory for "Yes"
          </span>
        </div>
        <p className="text-[11px] text-slate-600">
          {description}
        </p>

        <input 
          ref={inlineInputRef}
          type="file" 
          accept={fileAccept}
          className="hidden" 
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFileUpload(docKey, e.target.files[0]);
              setFormError('');
            }
          }} 
        />

        {docData.uploaded ? (
          <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-white rounded-lg border border-emerald-300 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 truncate">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span className="truncate">{docData.name} ({docData.size})</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPreviewModalDoc({ title: label, ...docData })}
                className="text-[11px] text-slate-600 hover:text-slate-900 font-bold"
              >
                Preview
              </button>
              <span className="text-slate-300">•</span>
              <button
                type="button"
                onClick={() => inlineInputRef.current?.click()}
                className="text-[11px] text-kgp-crimson hover:underline font-bold"
              >
                Change E-Document
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inlineInputRef.current?.click()}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-900 hover:bg-kgp-crimson text-white font-bold text-xs rounded-xl shadow-xs transition"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload E-Document (PDF / JPG)</span>
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-slate-800 font-sans selection:bg-amber-500 selection:text-white pb-20">
      
      {/* 0. INSTITUTIONAL TOP BAR & FLASH NOTIFICATION (IIT KGP MOTTO: योगः कर्मसु कौशलम्) */}
      <div className="bg-slate-950 text-slate-300 text-[11px] py-1.5 px-4 sm:px-6 lg:px-8 border-b border-slate-800 shadow-inner">
        <div className="max-w-[1720px] mx-auto flex items-center justify-between gap-3 sm:gap-6">
          
          {/* Left: IIT KGP & Flash Notification Ticker */}
          <div className="flex items-center gap-3 min-w-0 flex-1 overflow-hidden">
            {/* IIT KGP Brand Badge */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              <span className="font-black tracking-wider text-amber-400 uppercase text-xs">
                {t.govHeader || "IIT KGP"}
              </span>
            </div>

            <span className="text-slate-700 flex-shrink-0 hidden sm:inline">|</span>

            {/* Flash Notification / Motto Ticker */}
            <div className="flex items-center gap-2 min-w-0 flex-1 overflow-hidden">
              <span className="flex-shrink-0 px-2 py-0.5 rounded-md bg-gradient-to-r from-red-600 to-amber-600 text-white font-black text-[9px] uppercase tracking-wider shadow-xs animate-pulse flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" />
                <span>FLASH</span>
              </span>

              {/* Animated Scroller with Motto & Pause on Hover */}
              <div className="overflow-hidden whitespace-nowrap text-[11px] flex-1">
                <div className="flash-marquee flex items-center gap-5 cursor-default select-none" title="IIT Kharagpur Official Motto • Hover to Pause">
                  {/* Track 1 */}
                  <span className="inline-flex items-center gap-1.5 font-bold text-amber-300 tracking-wide font-serif text-xs">
                    “योगः कर्मसु कौशलम्”
                  </span>
                  <span className="text-slate-400 text-[10px] hidden md:inline">
                    (Excellence in Action is Yoga)
                  </span>
                  <span className="text-amber-500/70 font-black">•</span>
                  <span className="text-slate-200 font-semibold">
                    Admissions 2026 Live Now
                  </span>
                  <span className="text-amber-500/70 font-black">•</span>
                  <span className="text-emerald-400 font-semibold">
                    BS &amp; Diploma in Data Science &amp; Artificial Intelligence
                  </span>
                  <span className="text-amber-500/70 font-black">•</span>

                  {/* Duplicate Track for Seamless Infinite Marquee */}
                  <span className="inline-flex items-center gap-1.5 font-bold text-amber-300 tracking-wide font-serif text-xs">
                    “योगः कर्मसु कौशलम्”
                  </span>
                  <span className="text-slate-400 text-[10px] hidden md:inline">
                    (Excellence in Action is Yoga)
                  </span>
                  <span className="text-amber-500/70 font-black">•</span>
                  <span className="text-slate-200 font-semibold">
                    Admissions 2026 Live Now
                  </span>
                  <span className="text-amber-500/70 font-black">•</span>
                  <span className="text-emerald-400 font-semibold">
                    BS &amp; Diploma in Data Science &amp; Artificial Intelligence
                  </span>
                  <span className="text-amber-500/70 font-black">•</span>
                </div>
              </div>
            </div>
          </div>

          {/* Trilingual Language Selector (English, Bengali, Hindi) */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-amber-300 font-bold text-[11px] mr-1">
              <Globe className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.translateLabel}:</span>
            </div>
            <div className="inline-flex rounded-lg p-0.5 bg-slate-800 border border-slate-700">
              <button
                type="button"
                onClick={() => changeLanguage('en')}
                className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold transition ${
                  lang === 'en'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => changeLanguage('bn')}
                className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold transition ${
                  lang === 'bn'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                বাংলা
              </button>
              <button
                type="button"
                onClick={() => changeLanguage('hi')}
                className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold transition ${
                  lang === 'hi'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                हिन्दी
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 1. TOP NAVBAR (FULL WIDESCREEN) */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white border border-slate-200 p-1 flex items-center justify-center shadow-xs flex-shrink-0">
              <img src={iitKgpLogo} alt="IIT KGP" className="w-8 h-8 object-contain" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-kgp-crimson uppercase tracking-wider">
                {IIT_KGP_INFO.hindiName}
              </div>
              <div className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <span>{t.portalTitle}</span>
                <span className="hidden sm:inline-block px-2 py-0.5 bg-amber-100 text-amber-900 text-[10px] font-bold rounded-full border border-amber-300">
                  {t.qualifierRound}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setShowTrackerModal(true)}
              className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold transition flex items-center gap-1.5 shadow-2xs"
              title="Track existing application and check payment scrutiny status"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
              <span>Track Application Status</span>
            </button>

            <button
              type="button"
              onClick={handleHeaderBack}
              className="px-3.5 py-1.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold transition flex items-center gap-1.5 shadow-2xs"
              title="Go back to previous step"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-slate-600" />
              <span>{t.back}</span>
            </button>

            <button
              onClick={onBackToHome}
              className="px-3.5 py-1.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold transition"
            >
              {t.exitHome}
            </button>
          </div>
        </div>
      </header>

      {/* 2. PROGRAM SUB-BANNER (FULL WIDESCREEN) */}
      <div className="bg-[#800000] text-white py-2.5 px-4 sm:px-6 lg:px-8 border-b-2 border-amber-400 shadow-sm">
        <div className="max-w-[1720px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 font-bold">
            <BookOpen className="w-4 h-4 text-amber-300" />
            <span>{t.formTitle} — {formData.program}</span>
          </div>
          <div className="flex items-center gap-4 text-amber-200 text-[11px] font-mono">
            <span>{t.cbtDate}</span>
            <span className="hidden md:inline text-white/40">•</span>
            <span className="hidden md:inline">{t.sslNote}</span>
          </div>
        </div>
      </div>

      {/* 3. WIDESCREEN WORKSPACE (SIDEBAR + MAIN FORM + RIGHT DOSSIER) */}
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          
          {/* ========================================================================= */}
          {/* LEFT SIDEBAR: THE 4 APPLICATION STEPS & APPLICANT DOSSIER                 */}
          {/* ========================================================================= */}
          <aside className="w-full lg:w-72 xl:w-80 flex-shrink-0 space-y-5 lg:sticky lg:top-20">
            
            {/* Applicant Profile Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center flex-shrink-0 shadow-inner">
                  {formData.docs.photo.uploaded && formData.docs.photo.previewUrl ? (
                    <img 
                      src={formData.docs.photo.previewUrl} 
                      alt="Candidate" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="font-extrabold text-kgp-crimson text-sm font-mono flex items-center justify-center">
                      {formData.fullName ? formData.fullName.trim().split(/\s+/).map(n => n[0]).join('').slice(0, 2).toUpperCase() : <User className="w-5 h-5 text-slate-400" />}
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] uppercase font-bold text-slate-400">{t.applicantLabel}</div>
                  <div className="font-extrabold text-slate-900 text-sm truncate uppercase">
                    {formData.fullName || t.newApplicant}
                  </div>
                  <div className="text-[10px] text-emerald-700 font-mono flex items-center gap-1 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>{formData.applicationNo || "KGP-2026-BS-DRAFT"}</span>
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-bold">
                  <span className="text-slate-600">{t.appProgress}</span>
                  <span className="text-kgp-crimson font-mono">{calculateProgress()}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-400 to-kgp-crimson transition-all duration-300 rounded-full"
                    style={{ width: `${calculateProgress()}%` }}
                  ></div>
                </div>
              </div>

              {/* Target Program Badge */}
              <div className="text-[11px] p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-semibold leading-snug">
                <span className="text-[9px] uppercase font-extrabold text-slate-400 block mb-0.5">{t.degreeTrack}</span>
                {formData.program}
              </div>
            </div>

            {/* THE 4 STEPS ON THE LEFT SIDE */}
            <div className="bg-white rounded-3xl border border-slate-200 p-3 shadow-xs space-y-2">
              <div className="px-3 pt-2 pb-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                {t.appSections}
              </div>

              {/* 1. Personal */}
              <button
                type="button"
                onClick={() => { if (section >= 1) { setSection(1); window.scrollTo({ top: 0, behavior: 'smooth' }); } }}
                className={`w-full p-3.5 rounded-2xl flex items-center gap-3 transition text-left ${
                  section === 1 
                    ? 'bg-[#800000] text-white shadow-md' 
                    : section > 1
                      ? 'hover:bg-slate-50 text-slate-800'
                      : 'text-slate-400 hover:bg-slate-50'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0 transition ${
                  section === 1 
                    ? 'bg-amber-400 text-slate-950 font-black shadow-xs' 
                    : section > 1 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                      : 'bg-slate-100 text-slate-400'
                }`}>
                  {section > 1 ? <Check className="w-4 h-4 stroke-[3]" /> : '1'}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-extrabold text-xs flex items-center justify-between">
                    <span>{t.step1Title}</span>
                    {section > 1 && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {t.completed}
                      </span>
                    )}
                    {section === 1 && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded font-black bg-amber-400 text-slate-950">
                        {t.current}
                      </span>
                    )}
                  </div>
                  <div className={`text-[11px] truncate ${section === 1 ? 'text-amber-200' : 'text-slate-500'}`}>
                    {t.step1Sub}
                  </div>
                </div>
              </button>

              {/* 2. Exam Cities */}
              <button
                type="button"
                onClick={() => { if (section >= 2) { setSection(2); window.scrollTo({ top: 0, behavior: 'smooth' }); } }}
                className={`w-full p-3.5 rounded-2xl flex items-center gap-3 transition text-left ${
                  section === 2 
                    ? 'bg-[#800000] text-white shadow-md' 
                    : section > 2
                      ? 'hover:bg-slate-50 text-slate-800'
                      : 'text-slate-400'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0 transition ${
                  section === 2 
                    ? 'bg-amber-400 text-slate-950 font-black shadow-xs' 
                    : section > 2 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                      : 'bg-slate-100 text-slate-400'
                }`}>
                  {section > 2 ? <Check className="w-4 h-4 stroke-[3]" /> : '2'}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-extrabold text-xs flex items-center justify-between">
                    <span>{t.step2Title}</span>
                    {section > 2 && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {t.completed}
                      </span>
                    )}
                    {section === 2 && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded font-black bg-amber-400 text-slate-950">
                        {t.current}
                      </span>
                    )}
                  </div>
                  <div className={`text-[11px] truncate ${section === 2 ? 'text-amber-200' : 'text-slate-500'}`}>
                    {t.step2Sub}
                  </div>
                </div>
              </button>

              {/* 3. Document Uploads */}
              <button
                type="button"
                onClick={() => { if (section >= 3) { setSection(3); window.scrollTo({ top: 0, behavior: 'smooth' }); } }}
                className={`w-full p-3.5 rounded-2xl flex items-center gap-3 transition text-left ${
                  section === 3 
                    ? 'bg-[#800000] text-white shadow-md' 
                    : section > 3
                      ? 'hover:bg-slate-50 text-slate-800'
                      : 'text-slate-400'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0 transition ${
                  section === 3 
                    ? 'bg-amber-400 text-slate-950 font-black shadow-xs' 
                    : section > 3 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                      : 'bg-slate-100 text-slate-400'
                }`}>
                  {section > 3 ? <Check className="w-4 h-4 stroke-[3]" /> : '3'}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-extrabold text-xs flex items-center justify-between">
                    <span>{t.step3Title}</span>
                    {section > 3 && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {t.completed}
                      </span>
                    )}
                    {section === 3 && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded font-black bg-amber-400 text-slate-950">
                        {t.current}
                      </span>
                    )}
                  </div>
                  <div className={`text-[11px] truncate ${section === 3 ? 'text-amber-200' : 'text-slate-500'}`}>
                    {t.step3Sub}
                  </div>
                </div>
              </button>

              {/* 4. Review & Pay */}
              <button
                type="button"
                onClick={() => { if (section >= 4) { setSection(4); window.scrollTo({ top: 0, behavior: 'smooth' }); } }}
                className={`w-full p-3.5 rounded-2xl flex items-center gap-3 transition text-left ${
                  section === 4 
                    ? 'bg-[#800000] text-white shadow-md' 
                    : section > 4
                      ? 'hover:bg-slate-50 text-slate-800'
                      : 'text-slate-400'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0 transition ${
                  section === 4 
                    ? 'bg-amber-400 text-slate-950 font-black shadow-xs' 
                    : section > 4 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                      : 'bg-slate-100 text-slate-400'
                }`}>
                  {section > 4 ? <Check className="w-4 h-4 stroke-[3]" /> : '4'}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-extrabold text-xs flex items-center justify-between">
                    <span>{t.step4Title}</span>
                    {section === 5 && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {t.paid}
                      </span>
                    )}
                    {section === 4 && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded font-black bg-amber-400 text-slate-950">
                        {t.current}
                      </span>
                    )}
                  </div>
                  <div className={`text-[11px] truncate ${section === 4 ? 'text-amber-200' : 'text-slate-500'}`}>
                    {t.step4Sub}
                  </div>
                </div>
              </button>
            </div>

            {/* Quick Support / Admissions Helpdesk Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-3 text-xs">
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <Building className="w-4 h-4 text-kgp-crimson" />
                <span>{t.helpdesk}</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {t.helpdeskAddr}
              </p>
              <div className="pt-2 border-t border-slate-100 space-y-1.5 text-[11px] font-mono text-slate-600">
                <div>📧 admissions@iitkgp.ac.in</div>
                <div>📞 +91 3222 282022</div>
                <div className="text-[10px] text-slate-400 font-sans">Mon–Fri: 9:30 AM – 5:30 PM IST</div>
              </div>
            </div>

            {/* Institutional Security Badge */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center gap-3 text-slate-600 text-[11px] shadow-xs">
              <Lock className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <div>
                <strong className="text-slate-900 block font-bold">{t.sslSecured}</strong>
                <span>{t.govtStandards}</span>
              </div>
            </div>

          </aside>

          {/* ========================================================================= */}
          {/* RIGHT AREA: FULL-FLEDGE WORKSPACE (FORM + LIVE SCRUTINY DOSSIER)          */}
          {/* ========================================================================= */}
          <main className="flex-1 min-w-0 w-full space-y-6">
            
            {/* Error Alert */}
            {formError && (
              <div className="p-4 bg-red-50 border-2 border-red-300 rounded-2xl text-xs text-red-800 flex items-start gap-3 shadow-xs animate-in fade-in">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-bold text-red-900">Please review the following before continuing:</div>
                  <p className="leading-relaxed">{formError}</p>
                </div>
              </div>
            )}

            {/* Grid for Active Form + Live Scrutiny Dossier */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8 items-start">
              
              {/* Form Column (Takes 8 cols on widescreen, full 12 cols on step 5) */}
              <div className={section === 5 ? "xl:col-span-12" : "xl:col-span-8 min-w-0"}>
                
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
                  placeholder={t.namePlaceholder}
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
                  <div className="flex items-center justify-between">
                    <label className="block text-slate-800 font-bold">
                      ID Type <span className="text-red-600">*</span>
                    </label>
                    <span className="text-[10px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {currentIdConfig.badgeLabel}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    ID selected here will need to be uploaded for verification in Section 3.
                  </p>
                  <select
                    value={formData.idType}
                    onChange={(e) => {
                      const newType = e.target.value;
                      const newConfig = ID_CONFIGS[newType] || ID_CONFIGS["Aadhar Card"];
                      const sanitized = newConfig.sanitize(formData.idNumber);
                      setFormData({ ...formData, idType: newType, idNumber: sanitized });
                      setFormError('');
                    }}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white font-semibold text-sm text-slate-900 focus:border-kgp-crimson focus:outline-none transition shadow-2xs"
                  >
                    <option value="Aadhar Card">Aadhar Card (12 Digits)</option>
                    <option value="PAN Card">PAN Card (10 Alphanumeric)</option>
                    <option value="Passport">Passport (1 Letter + 7 Digits)</option>
                    <option value="Voter ID">Voter ID (10 Alphanumeric)</option>
                    <option value="Driving License">Driving License (2 Letters + 13 Digits)</option>
                    <option value="Government Photo ID">Other Government ID with photo (n numbers / flexible)</option>
                  </select>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-[11px] text-slate-600 flex items-start gap-2 shadow-2xs">
                    <Info className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-700">Official Format: </span>
                      <span>{currentIdConfig.helpText}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-slate-800 font-bold">
                      ID Number <span className="text-red-600">*</span>
                    </label>
                    {/* Real-time status / counter badge */}
                    {formData.idNumber ? (
                      isCurrentIdValid ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full shadow-2xs">
                          <Check className="w-3 h-3 text-emerald-700 stroke-[3]" />
                          <span>Valid Format ({formData.idNumber.length} {formData.idType === 'Aadhar Card' ? 'digits' : 'chars'})</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full shadow-2xs">
                          <span>{formData.idNumber.length} / {currentIdConfig.maxLength} {formData.idType === 'Aadhar Card' ? 'digits' : 'chars'}</span>
                        </span>
                      )
                    ) : (
                      <span className="text-[10px] text-slate-400 font-mono">
                        {formData.idType === 'Government Photo ID' ? 'Flexible input (n numbers)' : `Required: ${currentIdConfig.maxLength} ${formData.idType === 'Aadhar Card' ? 'digits' : 'chars'}`}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Enter the unique identifier printed on your selected document.
                  </p>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      maxLength={currentIdConfig.maxLength}
                      placeholder={currentIdConfig.placeholder}
                      value={formData.idNumber}
                      onChange={(e) => {
                        const sanitized = currentIdConfig.sanitize(e.target.value);
                        setFormData({ ...formData, idNumber: sanitized });
                        if (formError) setFormError('');
                      }}
                      className={`w-full px-4 py-2.5 rounded-xl border-2 font-mono text-sm font-bold uppercase transition shadow-2xs ${
                        formData.idNumber
                          ? isCurrentIdValid 
                            ? 'border-emerald-500 bg-emerald-50/30 text-slate-950 focus:border-emerald-600 focus:outline-none'
                            : 'border-amber-400 bg-white text-slate-950 focus:border-kgp-crimson focus:outline-none'
                          : 'border-slate-300 bg-white text-slate-900 focus:border-kgp-crimson focus:outline-none'
                      }`}
                    />
                    {isCurrentIdValid && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600 pointer-events-none">
                        <CheckCircle2 className="w-4 h-4 fill-emerald-100" />
                      </div>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-500">
                    {formData.idType === "Government Photo ID" 
                      ? "When choosing 'Other', you can enter any number of digits (n numbers) or characters as on your ID card."
                      : currentIdConfig.helpText}
                  </p>
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

                {formData.jeeAdvancedQualified === 'Yes' && (
                  <InlineDocUploadBox
                    docKey="jeeProof"
                    label="E-Document Upload: JEE Advanced Eligibility Proof"
                    description="Upload your official JEE Advanced Admit Card or Rank Card (PDF / JPG format – 50KB to 2MB)."
                  />
                )}
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

                {formData.isPwd === 'Yes' && (
                  <InlineDocUploadBox
                    docKey="pwdCert"
                    label="E-Document Upload: PwD Disability Certificate"
                    description="Upload your official Disability Certificate / UDID Card (40% or more disability) issued by competent Medical Board (PDF / JPG format – 50KB to 2MB)."
                  />
                )}
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

                {formData.isDefencePersonnel === 'Yes' && (
                  <InlineDocUploadBox
                    docKey="defenceCert"
                    label="E-Document Upload: Defence Ward / Disability Proof"
                    description="Upload your official service / disability / casualty certificate issued by Record Office or Zila Sainik Board (PDF / JPG format – 50KB to 2MB)."
                  />
                )}
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

                {formData.isWorkingProfessional === 'Yes' && (
                  <InlineDocUploadBox
                    docKey="employmentProof"
                    label="E-Document Upload: Employment Verification Document"
                    description="Upload your Employee ID Card or Official Employment Letter / NOC from your organization (PDF / JPG format – 50KB to 2MB)."
                  />
                )}
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
                <div className="flex items-center justify-between max-w-sm">
                  <label className="block text-slate-800 font-bold">
                    Year of Passing Class 12 or Equivalent Exam <span className="text-red-600">*</span>
                  </label>
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    1970 – 2027
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Select your Class 12 qualifying year (eligible from 1970 toward current admissions year).
                </p>
                <select
                  value={formData.class12PassingYear}
                  onChange={(e) => setFormData({ ...formData, class12PassingYear: e.target.value })}
                  className="w-full sm:w-56 px-4 py-2.5 rounded-xl border border-slate-300 bg-white font-mono font-bold text-sm text-slate-900 focus:border-kgp-crimson focus:outline-none shadow-2xs"
                >
                  {PASSING_YEARS.map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>

              {/* Field 12: Mobile Phone Number */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between max-w-lg">
                  <label className="block text-slate-800 font-bold">
                    Mobile Phone number <span className="text-red-600">*</span>
                  </label>
                  {formData.phone ? (
                    formData.phone.length === 10 ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full shadow-2xs">
                        <Check className="w-3 h-3 text-emerald-700 stroke-[3]" />
                        <span>Valid 10 Digits</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full shadow-2xs">
                        <span>{formData.phone.length} / 10 Digits</span>
                      </span>
                    )
                  ) : (
                    <span className="text-[10px] text-slate-400 font-mono">
                      Strictly 10 digits required
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500">
                  Select your country code and enter your 10-digit mobile number (numbers only).
                </p>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 max-w-lg">
                  {/* Country Code Select */}
                  <select
                    value={formData.phoneCountryCode || "+91"}
                    onChange={(e) => setFormData({ ...formData, phoneCountryCode: e.target.value })}
                    className="sm:w-48 px-3 py-2.5 rounded-xl sm:rounded-r-none border border-slate-300 bg-slate-50 font-bold text-xs text-slate-800 focus:border-kgp-crimson focus:outline-none transition shadow-2xs"
                  >
                    {COUNTRY_CODES.map(c => (
                      <option key={c.code} value={c.code}>{c.label}</option>
                    ))}
                  </select>

                  {/* 10-Digit Mobile Input */}
                  <div className="relative flex-1">
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="Enter 10-digit mobile number"
                      value={formData.phone}
                      onChange={(e) => {
                        const clean = e.target.value.replace(/\D/g, '').slice(0, 10);
                        setFormData({ ...formData, phone: clean });
                        if (formError) setFormError('');
                      }}
                      className={`w-full px-4 py-2.5 rounded-xl sm:rounded-l-none border sm:border-l-0 font-mono text-sm font-bold transition shadow-2xs ${
                        formData.phone.length === 10
                          ? 'border-emerald-500 bg-emerald-50/20 text-slate-950 focus:border-emerald-600 focus:outline-none'
                          : 'border-slate-300 bg-white text-slate-900 focus:border-kgp-crimson focus:outline-none'
                      }`}
                    />
                    {formData.phone.length === 10 && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600 pointer-events-none">
                        <CheckCircle2 className="w-4 h-4 fill-emerald-100" />
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-[10px] text-slate-400">
                  Parameter: Mobile number must be always exactly 10 digits (digits only, max 10).
                </p>
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
        {/* SECTION 3 OF 3: FILE & DOCUMENT UPLOADS (UNIVERSITY SCRUTINY PORTAL)      */}
        {/* ========================================================================= */}
        {section === 3 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8 animate-in fade-in">
            
            {/* Form Section Header with Institutional Branding */}
            <div className="border-b border-slate-200 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase font-extrabold tracking-wider text-kgp-crimson">
                  <ShieldCheck className="w-4 h-4 text-kgp-crimson" />
                  <span>Admissions Scrutiny Board • Verification Desk</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-serif-title text-slate-900 mt-1">
                  Section 3 of 3: File &amp; E-Document Uploads
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Submit compliant digital scans and e-documents for identity verification, reservation quota validation, and official CBT admit card issuance.
                </p>
              </div>
            </div>

            {/* Official University Scrutiny Directive Notice */}
            <div className="bg-stone-50 border-l-4 border-kgp-crimson p-4 rounded-r-2xl text-xs space-y-1.5">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-kgp-crimson" />
                <span>OFFICIAL INSTRUCTION ON DIGITAL CERTIFICATE SUBMISSION</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                All certificates must be scanned from original documents at a minimum resolution of 200 DPI. Mobile phone photographs with glare, tilted angles, or obscured registration seals will be rejected during document scrutiny.
              </p>
            </div>

            {/* E-Document Upload Directive for Selecting "Yes" */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 p-4 rounded-2xl text-xs space-y-1.5 shadow-2xs">
              <div className="font-bold text-amber-950 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-amber-800" />
                <span>E-DOCUMENT UPLOAD DIRECTIVE FOR CONDITIONAL ELIGIBILITY:</span>
              </div>
              <p className="text-amber-900/90 leading-relaxed">
                If you selected <strong>"Yes"</strong> in Section 1 for <strong>JEE Advanced Qualified</strong>, <strong>Person with Disabilities (PwD)</strong>, <strong>Defence / Paramilitary Personnel</strong>, or <strong>Employed Working Professional</strong>, you are required to upload the corresponding valid verification e-document in the designated upload sections below.
              </p>
            </div>

            <form onSubmit={handleProceedToReview} className="space-y-8 text-xs">
              
              {/* ======================================================== */}
              {/* 1. BIOMETRIC STUDIO: PHOTOGRAPH & SIGNATURE PREVIEWS     */}
              {/* ======================================================== */}
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2 border-b border-slate-200 pb-2">
                  <Camera className="w-4 h-4 text-kgp-crimson" />
                  <span>1. Candidate Biometric Records (Admit Card &amp; Degree Printing)</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  
                  {/* Studio Card 1: Passport Size Photograph */}
                  <div className="p-5 rounded-2xl border-2 border-slate-200 bg-white hover:border-slate-300 transition shadow-2xs">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-slate-900 text-sm">Passport Size Photograph</span>
                      <span className="text-[10px] bg-red-50 text-red-700 font-extrabold px-2 py-0.5 rounded border border-red-200 uppercase">
                        Mandatory
                      </span>
                    </div>

                    <div className="flex items-start gap-4">
                      {/* 35mm x 45mm Photo Mount Frame */}
                      <div className="w-24 h-32 rounded-xl bg-slate-100 border-2 border-slate-300 overflow-hidden flex flex-col items-center justify-center flex-shrink-0 relative shadow-inner">
                        {formData.docs.photo.uploaded && formData.docs.photo.previewUrl ? (
                          <img 
                            src={formData.docs.photo.previewUrl} 
                            alt="Passport Photograph" 
                            className="w-full h-full object-cover" 
                          />
                        ) : (
                          <div className="text-center p-2 text-slate-400">
                            <Camera className="w-6 h-6 mx-auto mb-1 opacity-50" />
                            <span className="text-[9px] font-bold block leading-tight">3.5 × 4.5 cm</span>
                          </div>
                        )}
                        <span className="absolute bottom-0 inset-x-0 bg-slate-900/80 text-white text-[8px] text-center font-bold py-0.5">
                          80% Face
                        </span>
                      </div>

                      {/* Photo Specs & Controls */}
                      <div className="flex-1 space-y-2">
                        <div className="text-[11px] text-slate-500 leading-snug">
                          <strong>Format:</strong> JPEG / JPG<br />
                          <strong>Size Limit:</strong> 50 KB – 150 KB<br />
                          <strong>Background:</strong> Plain White / Light
                        </div>

                        {formData.docs.photo.uploaded ? (
                          <div className="space-y-2 pt-1">
                            <div className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg flex items-center gap-1.5 truncate">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                              <span className="truncate">{formData.docs.photo.name} ({formData.docs.photo.size})</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <label className="cursor-pointer text-[11px] text-kgp-crimson hover:underline font-bold">
                                <span>Change Photo</span>
                                <input 
                                  type="file" 
                                  accept="image/jpeg,image/jpg" 
                                  className="hidden" 
                                  onChange={(e) => handleFileUpload('photo', e.target.files[0])} 
                                />
                              </label>
                              <span className="text-slate-300">•</span>
                              <button
                                type="button"
                                onClick={() => setPreviewModalDoc({ title: "Passport Size Photograph", ...formData.docs.photo })}
                                className="text-[11px] text-slate-600 hover:text-slate-900 font-bold"
                              >
                                View Large
                              </button>
                            </div>
                          </div>
                        ) : (
                          <label className="mt-2 inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-900 hover:bg-kgp-crimson text-white font-bold text-xs rounded-xl cursor-pointer transition shadow-xs">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload Photo</span>
                            <input 
                              type="file" 
                              accept="image/jpeg,image/jpg" 
                              className="hidden" 
                              onChange={(e) => handleFileUpload('photo', e.target.files[0])} 
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Studio Card 2: Official Candidate Signature */}
                  <div className="p-5 rounded-2xl border-2 border-slate-200 bg-white hover:border-slate-300 transition shadow-2xs">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-slate-900 text-sm">Official Candidate Signature</span>
                      <span className="text-[10px] bg-red-50 text-red-700 font-extrabold px-2 py-0.5 rounded border border-red-200 uppercase">
                        Mandatory
                      </span>
                    </div>

                    <div className="flex items-start gap-4">
                      {/* Signature Box Frame */}
                      <div className="w-36 h-20 rounded-xl bg-white border-2 border-slate-300 flex flex-col items-center justify-center flex-shrink-0 relative shadow-inner overflow-hidden">
                        <div className="font-serif italic font-extrabold text-slate-800 text-base select-none px-2 text-center truncate">
                          {formData.fullName || t.signaturePlaceholder}
                        </div>
                        <span className="absolute bottom-0 inset-x-0 bg-slate-100 text-slate-500 text-[8px] text-center font-bold py-0.5 border-t border-slate-200">
                          Digital Seal • 3.5 × 1.5 cm
                        </span>
                      </div>

                      {/* Signature Specs & Controls */}
                      <div className="flex-1 space-y-2">
                        <div className="text-[11px] text-slate-500 leading-snug">
                          <strong>Format:</strong> JPEG / JPG<br />
                          <strong>Size Limit:</strong> 4 KB – 150 KB<br />
                          <strong>Ink:</strong> Blue or Black on White
                        </div>

                        {formData.docs.signature.uploaded ? (
                          <div className="space-y-2 pt-1">
                            <div className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg flex items-center gap-1.5 truncate">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                              <span className="truncate">{formData.docs.signature.name} ({formData.docs.signature.size})</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <label className="cursor-pointer text-[11px] text-kgp-crimson hover:underline font-bold">
                                <span>Change Sign</span>
                                <input 
                                  type="file" 
                                  accept="image/jpeg,image/jpg" 
                                  className="hidden" 
                                  onChange={(e) => handleFileUpload('signature', e.target.files[0])} 
                                />
                              </label>
                              <span className="text-slate-300">•</span>
                              <button
                                type="button"
                                onClick={() => setPreviewModalDoc({ title: "Candidate Signature", ...formData.docs.signature })}
                                className="text-[11px] text-slate-600 hover:text-slate-900 font-bold"
                              >
                                View Sign
                              </button>
                            </div>
                          </div>
                        ) : (
                          <label className="mt-2 inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-900 hover:bg-kgp-crimson text-white font-bold text-xs rounded-xl cursor-pointer transition shadow-xs">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload Signature</span>
                            <input 
                              type="file" 
                              accept="image/jpeg,image/jpg" 
                              className="hidden" 
                              onChange={(e) => handleFileUpload('signature', e.target.files[0])} 
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* ======================================================== */}
              {/* 2. STATUTORY IDENTITY & CITIZENSHIP VERIFICATION        */}
              {/* ======================================================== */}
              <div className="space-y-3 pt-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2 border-b border-slate-200 pb-2">
                  <ShieldCheck className="w-4 h-4 text-blue-700" />
                  <span>2. Statutory Government Photo ID Verification</span>
                </div>

                <AcademicDocRow
                  docKey="idProof"
                  title={`Photo ID Card Scan (${formData.idType})`}
                  specs="Aadhaar Card / PAN Card / Passport / Voter ID / Driving License / other Government ID with photo (JPEG / JPG / PDF format) – 50KB to 2MB"
                  requirementType="Mandatory"
                  conditionalNote={`Verification Key: ID Number matching ${formData.idNumber} entered in Section 1.`}
                />
              </div>

              {/* ======================================================== */}
              {/* 3. QUALIFYING ACADEMIC RECORDS (BOARD & DIPLOMA)         */}
              {/* ======================================================== */}
              <div className="space-y-3 pt-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2 border-b border-slate-200 pb-2">
                  <Award className="w-4 h-4 text-emerald-700" />
                  <span>3. Qualifying Board Certificates &amp; Marksheets</span>
                </div>

                <div className="space-y-3">
                  {/* Class 10 */}
                  <AcademicDocRow
                    docKey="class10"
                    title="Class 10th / Secondary Marksheet &amp; Certificate"
                    specs="PDF / JPG format – 50KB to 2MB"
                    requirementType="Mandatory"
                    conditionalNote="Mandatory documentary verification of studying Mathematics and English."
                  />

                  {/* Higher Secondary Qualification (Either A or B) */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/40 border border-amber-300/80 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                        <span>Higher Secondary Qualification (Select Option A or B):</span>
                        <span className="text-[10px] bg-red-50 text-red-700 font-extrabold px-2 py-0.5 rounded border border-red-200 uppercase">
                          Mandatory
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-semibold">
                        Choose your qualifying pathway
                      </div>
                    </div>

                    {/* Radio Choice between A and B */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-3 rounded-xl border border-amber-200">
                      <label className={`p-2.5 rounded-lg border flex items-center gap-2.5 cursor-pointer font-bold transition text-xs ${
                        formData.higherSecChoice === 'class12' 
                          ? 'border-kgp-crimson bg-red-50/30 text-kgp-crimson' 
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}>
                        <input
                          type="radio"
                          name="higherSecChoice"
                          value="class12"
                          checked={formData.higherSecChoice === 'class12'}
                          onChange={() => setFormData({ ...formData, higherSecChoice: 'class12' })}
                          className="text-kgp-crimson focus:ring-kgp-crimson"
                        />
                        <span>Pathway A: Class 12th / Senior Secondary</span>
                      </label>

                      <label className={`p-2.5 rounded-lg border flex items-center gap-2.5 cursor-pointer font-bold transition text-xs ${
                        formData.higherSecChoice === 'diploma' 
                          ? 'border-kgp-crimson bg-red-50/30 text-kgp-crimson' 
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}>
                        <input
                          type="radio"
                          name="higherSecChoice"
                          value="diploma"
                          checked={formData.higherSecChoice === 'diploma'}
                          onChange={() => setFormData({ ...formData, higherSecChoice: 'diploma' })}
                          className="text-kgp-crimson focus:ring-kgp-crimson"
                        />
                        <span>Pathway B: 3-Year Polytechnic / Diploma</span>
                      </label>
                    </div>

                    {formData.higherSecChoice === 'class12' ? (
                      <AcademicDocRow
                        docKey="class12"
                        title="A. Class 12th / Senior Secondary Marksheet &amp; Passing Certificate"
                        specs="PDF / JPG format – 50KB to 2MB"
                        requirementType="Mandatory"
                        conditionalNote="Original or Digilocker verified Senior Secondary certificate."
                      />
                    ) : (
                      <AcademicDocRow
                        docKey="diplomaCert"
                        title="B. Diploma Completion Certificate &amp; Marksheets"
                        specs="For candidates who pursued a Polytechnic/Diploma instead of 11th &amp; 12th (PDF format) – 50KB to 2MB"
                        requirementType="Mandatory"
                        conditionalNote="State Technical Board recognition required."
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* ======================================================== */}
              {/* 4. RESERVATION, DISABILITY & QUOTA ENTITLEMENTS         */}
              {/* ======================================================== */}
              <div className="space-y-3 pt-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2 border-b border-slate-200 pb-2">
                  <Building className="w-4 h-4 text-amber-700" />
                  <span>4. Statutory Quotas &amp; Central Government Entitlements</span>
                </div>

                <div className="space-y-3">
                  {/* Category Certificate */}
                  <AcademicDocRow
                    docKey="categoryCert"
                    title={`Category Certificate (${formData.category})`}
                    specs="Only for applicants who select SC / ST / OBC-NCL / EWS (JPEG / JPG / PDF format) – 50KB to 2MB"
                    requirementType={['SC', 'ST', 'OBC-NCL', 'EWS'].includes(formData.category) ? 'Conditional' : 'Optional'}
                    conditionalNote={['SC', 'ST', 'OBC-NCL', 'EWS'].includes(formData.category) 
                      ? `Mandatory to validate ${formData.category} quota tariff & cutoff waivers.` 
                      : 'Not required for Unreserved General category.'}
                  />

                  {/* PwD Certificate */}
                  <AcademicDocRow
                    docKey="pwdCert"
                    title="PwD Disability Certificate (UDID / Medical Board)"
                    specs="Only for applicants with 40% or more disability (JPEG / JPG / PDF format) – 50KB to 2MB"
                    requirementType={formData.isPwd === 'Yes' ? 'Conditional' : 'Optional'}
                    conditionalNote={formData.isPwd === 'Yes' 
                      ? 'Required for candidate claiming PwD reservation & CBT test centre accommodations.' 
                      : 'Not required.'}
                  />

                  {/* Defence Personnel */}
                  <AcademicDocRow
                    docKey="defenceCert"
                    title="Defence Personnel Ward / Disability Certificate"
                    specs="Proof of applicant having been permanently disabled OR parent having been permanently disabled / killed during war or peacetime operations while serving as a defence / paramilitary personnel (JPEG / JPG / PDF format) – 50KB to 2MB"
                    requirementType={formData.isDefencePersonnel === 'Yes' ? 'Conditional' : 'Optional'}
                    conditionalNote={formData.isDefencePersonnel === 'Yes' 
                      ? 'Issued by Record Office / Zila Sainik Board.' 
                      : 'Not applicable.'}
                  />

                  {/* JEE Advanced Proof */}
                  <AcademicDocRow
                    docKey="jeeProof"
                    title="JEE-Based Direct Entry Proof"
                    specs="Scoresheet / admit card / registration receipt as proof of eligibility to write JEE Advanced (PDF format) – 50KB to 2MB"
                    requirementType={formData.jeeAdvancedQualified === 'Yes' ? 'Conditional' : 'Optional'}
                    conditionalNote={formData.jeeAdvancedQualified === 'Yes' 
                      ? 'Exempts candidate from writing Qualifier Examination.' 
                      : 'Not applicable.'}
                  />
                </div>
              </div>

              {/* ======================================================== */}
              {/* 5. HIGHER DEGREES & EMPLOYMENT VERIFICATION              */}
              {/* ======================================================== */}
              <div className="space-y-3 pt-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2 border-b border-slate-200 pb-2">
                  <GraduationCap className="w-4 h-4 text-purple-700" />
                  <span>5. Higher Qualifications &amp; Employment Scrutiny (If Applicable)</span>
                </div>

                <div className="space-y-3">
                  <AcademicDocRow
                    docKey="ugDegree"
                    title="Undergraduate (UG) Degree Certificate &amp; Consolidated Marksheet"
                    specs="If applicable (PDF format) – 50KB to 2MB"
                    requirementType="Optional"
                  />

                  <AcademicDocRow
                    docKey="pgDegree"
                    title="Postgraduate (PG) Degree Certificate &amp; Marksheet"
                    specs="If applicable (PDF format) – 50KB to 2MB"
                    requirementType="Optional"
                  />

                  <AcademicDocRow
                    docKey="phdDegree"
                    title="Doctoral (Ph.D.) Degree / Provisional Certificate / Coursework Completion Proof"
                    specs="If applicable (PDF format) – 50KB to 2MB"
                    requirementType="Optional"
                  />

                  <AcademicDocRow
                    docKey="employmentProof"
                    title="Employment Verification (For Working Professionals)"
                    specs="Current Employee ID Card or Official Employment Letter / NOC from the organization (PDF / JPG format) – 50KB to 2MB"
                    requirementType={formData.isWorkingProfessional === 'Yes' ? 'Conditional' : 'Optional'}
                    conditionalNote={formData.isWorkingProfessional === 'Yes' 
                      ? 'Required to document working professional enrollment track.' 
                      : 'Only required if you are currently employed.'}
                  />
                </div>
              </div>

              {/* Navigation Action Buttons */}
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
                      <span key={key} className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-[11px] font-medium text-slate-700 flex items-center gap-1.5 shadow-2xs">
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

              {/* Payment Scrutiny & UPI Submission */}
              <div className="p-6 rounded-2xl border-2 border-slate-200 bg-slate-50 space-y-4 text-xs">
                <div className="text-center space-y-1">
                  <div className="font-bold text-slate-800 text-sm">Scan QR Code or Transfer to Official Account</div>
                  <p className="text-[11px] text-slate-500">
                    Google Pay, PhonePe, Paytm, BHIM UPI or Net Banking
                  </p>
                </div>
                
                <div className="w-40 h-40 mx-auto border-2 border-slate-300 rounded-2xl p-2 bg-white flex flex-col items-center justify-center shadow-md">
                  <QrCode className="w-28 h-28 text-slate-900" />
                  <span className="text-[10px] text-slate-500 font-mono mt-1">UPI: iitkgp.bs@sbi</span>
                </div>

                <div className="space-y-3 pt-2 border-t border-slate-200 text-left">
                  {/* Payment Channel */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Payment Channel / App <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={paymentMode}
                      onChange={(e) => setPaymentMode(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-kgp-crimson"
                    >
                      <option value="UPI (Google Pay)">UPI (Google Pay)</option>
                      <option value="UPI (PhonePe)">UPI (PhonePe)</option>
                      <option value="UPI (BHIM / Paytm)">UPI (BHIM / Paytm)</option>
                      <option value="Net Banking (SBI)">Net Banking (State Bank of India)</option>
                      <option value="Net Banking (HDFC)">Net Banking (HDFC Bank)</option>
                      <option value="Net Banking (ICICI)">Net Banking (ICICI Bank)</option>
                      <option value="Debit Card / RuPay">Debit Card / RuPay</option>
                    </select>
                  </div>

                  {/* Bank */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Remitter Bank <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={paymentBank}
                      onChange={(e) => setPaymentBank(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-kgp-crimson"
                    >
                      <option value="State Bank of India">State Bank of India</option>
                      <option value="HDFC Bank">HDFC Bank</option>
                      <option value="ICICI Bank">ICICI Bank</option>
                      <option value="Punjab National Bank">Punjab National Bank</option>
                      <option value="Axis Bank">Axis Bank</option>
                      <option value="Bank of Baroda">Bank of Baroda</option>
                      <option value="Canara Bank">Canara Bank</option>
                    </select>
                  </div>

                  {/* UTR / Transaction Reference */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[11px] font-bold text-slate-700">
                        Bank UTR / Transaction Ref No. <span className="text-red-500">*</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => setPaymentUtr('SBI' + Math.floor(100000000 + Math.random() * 900000000))}
                        className="text-[10px] text-kgp-crimson hover:underline font-semibold"
                      >
                        Generate Test UTR
                      </button>
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="e.g. SBI928410294821 or 12-digit number"
                      value={paymentUtr}
                      onChange={(e) => setPaymentUtr(e.target.value.toUpperCase())}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-kgp-crimson uppercase"
                    />
                    <p className="text-[10px] text-slate-500 mt-1">
                      IIT KGP Admissions Desk cross-references this UTR with bank settlement files.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCompletePayment}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl shadow-lg transition flex items-center justify-center gap-2 mt-4"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Confirm Payment &amp; Submit Application (₹{payableAmount})</span>
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
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 font-extrabold text-sm sm:text-base rounded-2xl shadow-2xl hover:scale-105 transition transform flex items-center justify-center gap-3"
              >
                <span>Launch Qualifier Round Examination</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => setShowTrackerModal(true)}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Track Application &amp; Payment Scrutiny</span>
              </button>

              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl border border-white/30 text-white hover:bg-white/10 font-bold text-xs transition flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Application</span>
              </button>
            </div>
          </div>
        )}
      </div>

            {/* Secondary Column: Live Admissions Dossier & Scrutiny Intelligence Panel */}
            {section !== 5 && (
              <div className="xl:col-span-4 space-y-6 lg:sticky lg:top-20">
                
                {/* Fee Reconciliation Card */}
                <div className="bg-gradient-to-br from-slate-900 via-kgp-navy to-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-md space-y-3.5 border border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
                      Qualifier Fee Reconciliation
                    </span>
                    <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded font-mono text-slate-300">
                      {formData.category} Quota
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="text-3xl font-black text-amber-400 font-mono">
                        ₹{payableAmount}
                      </div>
                      <div className="text-[11px] text-amber-200 mt-0.5">
                        {feeWaiverText}
                      </div>
                    </div>
                    <div className="text-right text-[10px] text-slate-400 leading-tight">
                      Standard: <span className="line-through">₹1,500</span><br />
                      CBT Test: Included (₹0)
                    </div>
                  </div>

                  <div className="pt-2.5 border-t border-white/10 text-[11px] text-slate-300 flex items-center justify-between">
                    <span>Gateway Status:</span>
                    <span className="font-bold text-amber-300">Due at Step 4</span>
                  </div>
                </div>

                {/* Live Document Scrutiny Checklist */}
                <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div className="flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-emerald-600" />
                      <span className="font-bold text-slate-900 text-sm">Live Scrutiny Checklist</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                      {mandatoryUploadedCount} / {mandatoryDocsKeys.length} Ready
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    {/* Photo */}
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-2">
                        <Camera className="w-3.5 h-3.5 text-slate-500" />
                        <span className="font-semibold text-slate-800">Passport Photo (3.5×4.5cm)</span>
                      </div>
                      {formData.docs.photo.uploaded ? (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                          <Check className="w-3 h-3 stroke-[3]" /> Attached
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                          Pending
                        </span>
                      )}
                    </div>

                    {/* Signature */}
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-2">
                        <Award className="w-3.5 h-3.5 text-slate-500" />
                        <span className="font-semibold text-slate-800">Digital Signature</span>
                      </div>
                      {formData.docs.signature.uploaded ? (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                          <Check className="w-3 h-3 stroke-[3]" /> Attached
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                          Pending
                        </span>
                      )}
                    </div>

                    {/* ID Proof */}
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                        <span className="font-semibold text-slate-800">Photo ID ({formData.idType})</span>
                      </div>
                      {formData.docs.idProof.uploaded ? (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                          <Check className="w-3 h-3 stroke-[3]" /> Attached
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                          Pending
                        </span>
                      )}
                    </div>

                    {/* Class 10 */}
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5 text-slate-500" />
                        <span className="font-semibold text-slate-800">Class 10 Marksheet</span>
                      </div>
                      {formData.docs.class10.uploaded ? (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                          <Check className="w-3 h-3 stroke-[3]" /> Attached
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                          Pending
                        </span>
                      )}
                    </div>

                    {/* Class 12 / Diploma */}
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
                        <span className="font-semibold text-slate-800">
                          {formData.higherSecChoice === 'diploma' ? 'Diploma Certificate' : 'Class 12 Marksheet'}
                        </span>
                      </div>
                      {(formData.higherSecChoice === 'diploma' ? formData.docs.diplomaCert.uploaded : formData.docs.class12.uploaded) ? (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                          <Check className="w-3 h-3 stroke-[3]" /> Attached
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                          Pending
                        </span>
                      )}
                    </div>

                    {/* Category Cert (if applicable) */}
                    {['SC', 'ST', 'OBC-NCL', 'EWS'].includes(formData.category) && (
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50/60 border border-amber-200">
                        <div className="flex items-center gap-2">
                          <Building className="w-3.5 h-3.5 text-amber-700" />
                          <span className="font-semibold text-amber-900">{formData.category} Quota Proof</span>
                        </div>
                        {formData.docs.categoryCert.uploaded ? (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                            <Check className="w-3 h-3 stroke-[3]" /> Attached
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded">
                            Required
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Important Dates */}
                <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm border-b border-slate-200 pb-3">
                    <Calendar className="w-4 h-4 text-kgp-crimson" />
                    <span>Admissions &amp; CBT Schedule</span>
                  </div>
                  <div className="space-y-2.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Registrations:</span>
                      <strong className="text-emerald-700 font-bold">Open</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Last Date to Submit:</span>
                      <strong className="text-slate-800">15 May, 2026</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Hall Ticket Release:</span>
                      <strong className="text-slate-800">28 May, 2026</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Qualifier Exam (CBT):</span>
                      <strong className="text-kgp-crimson font-bold">15 Nov, 2026</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Results &amp; Merit List:</span>
                      <strong className="text-emerald-700 font-bold">25 Nov, 2026</strong>
                    </div>
                  </div>
                </div>

                {/* State Center Preference Policy Badge */}
                <div className="bg-amber-50/80 border border-amber-200 rounded-3xl p-5 space-y-2 text-xs">
                  <div className="font-bold text-amber-950 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-amber-700" />
                    <span>West Bengal &amp; Tripura Centers</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Applicants choose 2 preferences strictly from 23 districts in West Bengal or 8 districts in Tripura. Admit cards will specify assigned test labs 2 weeks prior to exam date.
                  </p>
                </div>

              </div>
            )}

            </div>
          </main>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* UNIVERSITY DOCUMENT SCRUTINY PREVIEW MODAL                                */}
      {/* ========================================================================= */}
      {previewModalDoc && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 animate-in zoom-in-95">
            
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-4.5 px-6 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 p-1 flex items-center justify-center">
                  <FileCheck className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    IIT Kharagpur Scrutiny Desk
                  </div>
                  <h3 className="text-sm font-bold text-white truncate max-w-xs">
                    {previewModalDoc.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setPreviewModalDoc(null)}
                className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Canvas Body */}
            <div className="p-6 space-y-4 text-xs">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                
                {/* Meta details */}
                <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-200 text-[11px]">
                  <div>
                    <span className="text-slate-400 block">Candidate:</span>
                    <strong className="text-slate-800 font-bold">{formData.fullName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">File Size:</span>
                    <strong className="text-slate-800 font-mono">{previewModalDoc.size}</strong>
                  </div>
                </div>

                {/* Preview Viewport */}
                <div className="w-full min-h-[220px] bg-white rounded-xl border-2 border-dashed border-slate-300 p-4 flex flex-col items-center justify-center relative overflow-hidden">
                  {previewModalDoc.previewUrl ? (
                    <img 
                      src={previewModalDoc.previewUrl} 
                      alt="Scrutiny Preview" 
                      className="max-h-[200px] object-contain rounded-lg shadow-xs" 
                    />
                  ) : (
                    <div className="text-center space-y-2 py-4">
                      <FileText className="w-12 h-12 text-slate-400 mx-auto" />
                      <div className="font-mono font-bold text-slate-800 text-xs truncate max-w-[260px]">
                        {previewModalDoc.name}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Official Scanned Document • Resolution Verified (200 DPI)
                      </div>
                    </div>
                  )}

                  {/* University Scrutiny Watermark Seal */}
                  <div className="mt-3 px-3 py-1 bg-emerald-50 border border-emerald-300 rounded-full text-emerald-800 text-[10px] font-extrabold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>PASSED OFFICIAL PRE-ADMISSIONS AUDIT</span>
                  </div>
                </div>

              </div>

              {/* Close Button */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setPreviewModalDoc(null)}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition"
                >
                  Close Scrutiny Viewer
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Student Application & Payment Status Tracker Modal */}
      <StudentApplicationTrackerModal
        isOpen={showTrackerModal}
        onClose={() => setShowTrackerModal(false)}
        initialQuery={formData.applicationNo || formData.finalRollNo || formData.email}
      />

    </div>
  );
}
