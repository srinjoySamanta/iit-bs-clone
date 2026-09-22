import React, { useState } from 'react';
import { 
  X, CheckCircle2, ArrowRight, ArrowLeft, Upload, 
  ShieldCheck, AlertCircle, Sparkles, CreditCard, Mail, Phone, Lock 
} from 'lucide-react';
import { IIT_KGP_INFO } from '../../data/portalData';

export default function SignUpWizardModal({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [photoFrozen, setPhotoFrozen] = useState(false);
  const [profileCreatedModal, setProfileCreatedModal] = useState(false);
  const [generatedAppId, setGeneratedAppId] = useState('');
  const [otpSent, setOtpSent] = useState({ mail: false, phone: false });
  const [otpValue, setOtpValue] = useState({ mail: '', phone: '' });

  // Form State matching the exact fields in block diagram
  const [formData, setFormData] = useState({
    // 1. General Information
    firstName: '',
    lastName: '',
    birthday: '',
    ageProof: 'Birth Certificate',
    ageUpload: null,
    addressPerm: '',
    addressPres: '',
    mail: '',
    mailVerified: false,
    isdCode: '+91',
    phone: '',
    phoneVerified: false,
    category: 'GEN',
    catDoc: null,
    ph: 'No',
    phDoc: null,
    nationality: 'Indian',
    profession: 'Student',
    gender: 'Male',
    guardian: '',
    relation: 'Father',
    gcontact: '',
    income: '< 1 LPA',

    // 2. Education
    highestQual: 'Higher',
    directAdmission: 'WBJEE Rank',
    rankNumber: '',
    c10Result: '',
    c10Marks: '',
    c10Total: '500',
    c10Upload: null,
    degreeResult: '',
    degreeMarks: '',
    degreeTotal: '500',
    degreeUpload: null,

    // 3. Photo & Signature
    photoFile: null,
    signatureFile: null,

    // 4. Declaration
    declarationAgreed: false,

    // 5. Payment
    paymentMethod: 'UPI'
  });

  if (!isOpen) return null;

  const handleSendOtp = (type) => {
    setOtpSent(prev => ({ ...prev, [type]: true }));
    alert(`Simulation: 6-digit OTP sent to your ${type === 'mail' ? formData.mail || 'email' : formData.phone || 'mobile number'}. (Test Code: 721302)`);
  };

  const handleVerifyOtp = (type) => {
    if (otpValue[type] === '721302' || otpValue[type].length === 6) {
      setFormData(prev => ({ ...prev, [type === 'mail' ? 'mailVerified' : 'phoneVerified']: true }));
      alert(`${type === 'mail' ? 'Email ID' : 'Phone Number'} verified successfully!`);
    } else {
      alert("Invalid OTP! Try entering 721302.");
    }
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    const newId = "KGP-BS-2026-" + Math.floor(100000 + Math.random() * 900000);
    setGeneratedAppId(newId);
    setProfileCreatedModal(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-300">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-kgp-crimson to-kgp-navy text-white p-4 sm:p-5 flex items-center justify-between flex-shrink-0">
          <div>
            <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
              BS Admissions 2026 Batch
            </div>
            <h3 className="text-lg sm:text-xl font-bold font-serif-title">
              Applicant Profile Creation & Registration
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Bar */}
        <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex-shrink-0">
          <div className="flex items-center justify-between max-w-2xl mx-auto text-xs font-semibold">
            {[
              { num: 1, label: "General" },
              { num: 2, label: "Education & Direct" },
              { num: 3, label: "Photo & Sign" },
              { num: 4, label: "Declaration" },
              { num: 5, label: "Payment & Submit" }
            ].map((s) => (
              <div key={s.num} className="flex items-center space-x-1.5">
                <div 
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    currentStep === s.num
                      ? 'bg-kgp-crimson text-white shadow'
                      : currentStep > s.num
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-300 text-slate-700'
                  }`}
                >
                  {currentStep > s.num ? '✓' : s.num}
                </div>
                <span className={`hidden sm:inline ${currentStep === s.num ? 'text-kgp-crimson font-bold' : 'text-slate-500'}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Content Area */}
        <div className="p-6 overflow-y-auto flex-1 text-xs">
          
          {/* STEP 1: GENERAL INFORMATION */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900 border-b pb-2 uppercase tracking-wider text-kgp-crimson">
                Stage 1: General Information
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Candidate First Name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-kgp-crimson"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Last Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Candidate Surname"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-kgp-crimson"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">
                    Birthday (dd-mm-yyyy) *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.birthday}
                    onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-kgp-crimson"
                  />
                  <span className="text-[10px] text-slate-500 block mt-0.5">Minimum 15 years as on date</span>
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Age Proof *</label>
                  <select
                    value={formData.ageProof}
                    onChange={(e) => setFormData({ ...formData, ageProof: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-kgp-crimson bg-white"
                  >
                    <option>Birth Certificate</option>
                    <option>Class 10 Admit Card</option>
                    <option>Passport</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Upload Age Proof *</label>
                  <input
                    type="file"
                    className="w-full text-[11px] text-slate-500 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:bg-slate-200 file:text-xs"
                  />
                </div>
              </div>

              {/* Email with OTP Verification */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Mail ID *</label>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="e.g. yourname@gmail.com"
                      value={formData.mail}
                      onChange={(e) => setFormData({ ...formData, mail: e.target.value })}
                      className="flex-1 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-kgp-crimson"
                    />
                    <button
                      type="button"
                      onClick={() => handleSendOtp('mail')}
                      className="px-3 py-1.5 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-900 transition flex-shrink-0"
                    >
                      Send OTP
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Verify Email OTP</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter 6-digit OTP (721302)"
                      value={otpValue.mail}
                      onChange={(e) => setOtpValue({ ...otpValue, mail: e.target.value })}
                      className="flex-1 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleVerifyOtp('mail')}
                      className={`px-3 py-1.5 font-bold rounded-lg transition ${
                        formData.mailVerified 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                      }`}
                    >
                      {formData.mailVerified ? 'Verified ✓' : 'Verify'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Phone with ISD code + OTP verification */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Phone Number (ISD + 10 Digits) *</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="w-16 px-2 py-2 text-center rounded-lg border border-slate-300 bg-slate-100 font-mono"
                      value={formData.isdCode}
                      onChange={(e) => setFormData({ ...formData, isdCode: e.target.value })}
                    />
                    <input
                      type="tel"
                      placeholder="10 digit mobile"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="flex-1 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-kgp-crimson"
                    />
                    <button
                      type="button"
                      onClick={() => handleSendOtp('phone')}
                      className="px-3 py-1.5 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-900 transition flex-shrink-0"
                    >
                      Send OTP
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Verify Mobile OTP</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter 6-digit OTP (721302)"
                      value={otpValue.phone}
                      onChange={(e) => setOtpValue({ ...otpValue, phone: e.target.value })}
                      className="flex-1 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleVerifyOtp('phone')}
                      className={`px-3 py-1.5 font-bold rounded-lg transition ${
                        formData.phoneVerified 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                      }`}
                    >
                      {formData.phoneVerified ? 'Verified ✓' : 'Verify'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Category, PH, Income */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white"
                  >
                    <option>GEN</option>
                    <option>SC</option>
                    <option>ST</option>
                    <option>OBC</option>
                    <option>EWS</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Physically Handicapped (PH)?</label>
                  <select
                    value={formData.ph}
                    onChange={(e) => setFormData({ ...formData, ph: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white"
                  >
                    <option>No</option>
                    <option>Yes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Annual Family Income *</label>
                  <select
                    value={formData.income}
                    onChange={(e) => setFormData({ ...formData, income: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white"
                  >
                    <option>&lt; 1 LPA (75% Fee Waiver)</option>
                    <option>1 - 5 LPA (50% Fee Waiver)</option>
                    <option>&gt; 5 LPA (Standard Fee)</option>
                  </select>
                </div>
              </div>

              {/* Addresses */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Permanent Address *</label>
                  <textarea
                    rows={2}
                    placeholder="Full permanent postal address with PIN code"
                    value={formData.addressPerm}
                    onChange={(e) => setFormData({ ...formData, addressPerm: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Present Address *</label>
                  <textarea
                    rows={2}
                    placeholder="Full communication address"
                    value={formData.addressPres}
                    onChange={(e) => setFormData({ ...formData, addressPres: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              {/* Guardian info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Guardian Name *</label>
                  <input
                    type="text"
                    placeholder="Father / Mother / Guardian"
                    value={formData.guardian}
                    onChange={(e) => setFormData({ ...formData, guardian: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Relation with Guardian</label>
                  <input
                    type="text"
                    placeholder="e.g. Father"
                    value={formData.relation}
                    onChange={(e) => setFormData({ ...formData, relation: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Guardian Contact No *</label>
                  <input
                    type="tel"
                    placeholder="10 digit mobile"
                    value={formData.gcontact}
                    onChange={(e) => setFormData({ ...formData, gcontact: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: EDUCATION & DIRECT ADMISSION */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <h4 className="text-sm font-bold text-slate-900 border-b pb-2 uppercase tracking-wider text-kgp-crimson">
                Stage 2: Education & Direct Admission Eligibility
              </h4>

              {/* Direct Admission Channel (As requested in user block diagram!) */}
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 space-y-3">
                <div className="flex items-center gap-2 text-amber-900 font-bold">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Direct Admission Eligibility for BS Degree Course</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Select Entrance Examination</label>
                    <select
                      value={formData.directAdmission}
                      onChange={(e) => setFormData({ ...formData, directAdmission: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-amber-300 bg-white"
                    >
                      <option>WBJEE Rank</option>
                      <option>IIT JEE Advanced Qualifier</option>
                      <option>Tripura JEE</option>
                      <option>None (Regular Qualifier Admission)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Rank / Score Number</label>
                    <input
                      type="text"
                      placeholder="e.g. GMR Rank 4120 / JEE Adv Roll"
                      value={formData.rankNumber}
                      onChange={(e) => setFormData({ ...formData, rankNumber: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-amber-300 bg-white font-mono"
                    />
                  </div>
                </div>

                <div className="text-[11px] text-amber-800">
                  {formData.directAdmission !== 'None (Regular Qualifier Admission)'
                    ? '✓ Candidates with valid ranks in WBJEE, JEE Advanced, or Tripura JEE are exempt from the 4-week qualifier exam!'
                    : 'Universal Qualifier Process selected: Complete 4-week online study and score >= 40% in in-person qualifier exam.'}
                </div>
              </div>

              {/* Highest Qualification */}
              <div>
                <label className="block text-slate-700 font-bold mb-1 uppercase tracking-wider text-[11px]">
                  Highest Qualification Dropdown
                </label>
                <select
                  value={formData.highestQual}
                  onChange={(e) => setFormData({ ...formData, highestQual: e.target.value })}
                  className="w-full sm:w-64 px-3 py-2 rounded-lg border border-slate-300 bg-white"
                >
                  <option>Class 10</option>
                  <option>Higher</option>
                </select>
              </div>

              {/* Class 10 Details */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <div className="font-bold text-slate-800">Class 10 Examination Details</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-600 mb-1">Class 10 Result / Board</label>
                    <input
                      type="text"
                      placeholder="e.g. WBBSE / CBSE / ICSE"
                      value={formData.c10Result}
                      onChange={(e) => setFormData({ ...formData, c10Result: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1">Marks Obtained</label>
                    <input
                      type="number"
                      placeholder="e.g. 450"
                      value={formData.c10Marks}
                      onChange={(e) => setFormData({ ...formData, c10Marks: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1">Total Marks</label>
                    <input
                      type="number"
                      placeholder="e.g. 500"
                      value={formData.c10Total}
                      onChange={(e) => setFormData({ ...formData, c10Total: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-600 mb-1">Upload Class 10 Result Document *</label>
                  <input
                    type="file"
                    className="w-full text-xs text-slate-500 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:bg-slate-200 file:text-xs"
                  />
                </div>
              </div>

              {/* If Higher, Additional Degree Details */}
              {formData.highestQual === 'Higher' && (
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                  <div className="font-bold text-slate-800">Higher Qualification (Class 12 / Diploma / Degree)</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-slate-600 mb-1">Highest Degree Result / Stream</label>
                      <input
                        type="text"
                        placeholder="e.g. Class 12 Science / B.Tech"
                        value={formData.degreeResult}
                        onChange={(e) => setFormData({ ...formData, degreeResult: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 mb-1">Marks Obtained</label>
                      <input
                        type="number"
                        placeholder="e.g. 460"
                        value={formData.degreeMarks}
                        onChange={(e) => setFormData({ ...formData, degreeMarks: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 mb-1">Total Marks</label>
                      <input
                        type="number"
                        placeholder="e.g. 500"
                        value={formData.degreeTotal}
                        onChange={(e) => setFormData({ ...formData, degreeTotal: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-600 mb-1">Upload Highest Degree Result / Certificate *</label>
                    <input
                      type="file"
                      className="w-full text-xs text-slate-500 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:bg-slate-200 file:text-xs"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: PHOTO & SIGNATURE FREEZE */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h4 className="text-sm font-bold text-slate-900 border-b pb-2 uppercase tracking-wider text-kgp-crimson">
                Stage 3: Photo & Signature (Upload & Freeze)
              </h4>

              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 space-y-1">
                <strong>Format & Specification Requirements:</strong>
                <div>• Allowed File Formats: <strong>.jpg</strong> and <strong>.png</strong> only.</div>
                <div>• Photo Size Limit: Maximum 200 KB (clear passport headshot, white background).</div>
                <div>• Signature Size Limit: Maximum 100 KB (black/blue ink on white paper).</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Photo Upload Box */}
                <div className="p-5 rounded-xl border border-slate-300 bg-slate-50 text-center space-y-3">
                  <div className="w-24 h-28 mx-auto border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center bg-white">
                    <span className="text-slate-400 text-xs">Passport Photo</span>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-800 mb-1">Upload Candidate Photo</label>
                    <input
                      type="file"
                      accept=".jpg,.png"
                      disabled={photoFrozen}
                      className="text-xs text-slate-500 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:bg-slate-200"
                    />
                  </div>
                </div>

                {/* Signature Upload Box */}
                <div className="p-5 rounded-xl border border-slate-300 bg-slate-50 text-center space-y-3">
                  <div className="w-48 h-20 mx-auto border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center bg-white">
                    <span className="text-slate-400 text-xs">Signature</span>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-800 mb-1">Upload Specimen Signature</label>
                    <input
                      type="file"
                      accept=".jpg,.png"
                      disabled={photoFrozen}
                      className="text-xs text-slate-500 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:bg-slate-200"
                    />
                  </div>
                </div>

              </div>

              {/* Save & Freeze Button */}
              <div className="text-center pt-4">
                <button
                  type="button"
                  onClick={() => { setPhotoFrozen(true); alert("Photo and Signature Saved and Frozen successfully! Changes locked."); }}
                  className={`px-6 py-2.5 rounded-xl font-bold text-xs transition shadow flex items-center gap-2 mx-auto ${
                    photoFrozen 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-amber-500 hover:bg-amber-400 text-kgp-darknavy'
                  }`}
                >
                  <Lock className="w-4 h-4" />
                  <span>{photoFrozen ? 'Saved & Frozen (Locked) ✓' : 'Save & Freeze Photo/Signature'}</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: DECLARATION */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h4 className="text-sm font-bold text-slate-900 border-b pb-2 uppercase tracking-wider text-kgp-crimson">
                Stage 4: Declaration Undertaking
              </h4>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 space-y-3 text-xs leading-relaxed">
                <div className="font-bold text-slate-900 text-sm">
                  Applicant Solemn Undertaking & Declaration
                </div>
                <p>
                  1. I hereby declare that all information furnished by me in this registration form is authentic, true, complete, and correct to the best of my knowledge and belief.
                </p>
                <p>
                  2. I understand that if any information is found incorrect, fraudulent, or non-compliant with IIT Kharagpur regulations at any stage, my candidature and admission shall stand summarily cancelled without any refund of fees.
                </p>
                <p>
                  3. I agree to abide by all academic ordinances, exam honor codes, and rules of the Indian Institute of Technology Kharagpur BS Degree Programme.
                </p>

                <div className="pt-4 flex items-start gap-3 border-t border-slate-200">
                  <input
                    type="checkbox"
                    id="declCheck"
                    checked={formData.declarationAgreed}
                    onChange={(e) => setFormData({ ...formData, declarationAgreed: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded text-kgp-crimson focus:ring-kgp-crimson"
                  />
                  <label htmlFor="declCheck" className="text-xs font-bold text-slate-900 cursor-pointer">
                    I have read, understood, and solemnly accept the Declaration and Guidelines of the IIT Kharagpur BS Programme.
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: PAYMENT & SUBMISSION */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h4 className="text-sm font-bold text-slate-900 border-b pb-2 uppercase tracking-wider text-kgp-crimson">
                Stage 5: Application Fee Payment & Submission
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
                
                {/* Fee Summary */}
                <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                  <h5 className="font-bold text-slate-900 text-sm">Application Fee Breakdown</h5>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Applicant Category:</span>
                    <strong className="text-slate-800">{formData.category}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Admission Mode:</span>
                    <strong className="text-slate-800">{formData.directAdmission}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Standard Application Fee:</span>
                    <span className="line-through text-slate-400">₹3,000</span>
                  </div>
                  <div className="pt-2 border-t flex justify-between font-bold text-sm text-kgp-crimson">
                    <span>Payable Fee:</span>
                    <span>₹1,500</span>
                  </div>
                </div>

                {/* Payment Gateway Options */}
                <div className="p-5 rounded-xl border border-slate-200 space-y-3">
                  <h5 className="font-bold text-slate-900 text-sm">Select Payment Method</h5>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
                      <input
                        type="radio"
                        name="pay"
                        value="UPI"
                        checked={formData.paymentMethod === 'UPI'}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      />
                      <span>UPI (Google Pay / PhonePe / Paytm / BHIM)</span>
                    </label>
                    <label className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
                      <input
                        type="radio"
                        name="pay"
                        value="Cards"
                        checked={formData.paymentMethod === 'Cards'}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      />
                      <span>Debit Card / Credit Card (Visa / Mastercard / RuPay)</span>
                    </label>
                    <label className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
                      <input
                        type="radio"
                        name="pay"
                        value="NetBanking"
                        checked={formData.paymentMethod === 'NetBanking'}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      />
                      <span>Net Banking (SBI / HDFC / ICICI / Axis & others)</span>
                    </label>
                  </div>
                </div>

              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs">
                <strong>Instant Automated Acknowledgment:</strong> Upon successful submission, you will receive an Application Confirmation Email and a generated Candidate Reference ID.
              </div>

            </div>
          )}

        </div>

        {/* Wizard Footer Navigation */}
        <div className="bg-slate-100 px-6 py-4 border-t border-slate-200 flex items-center justify-between flex-shrink-0">
          <button
            type="button"
            disabled={currentStep === 1}
            onClick={() => setCurrentStep(prev => prev - 1)}
            className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(prev => prev + 1)}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-kgp-crimson text-white hover:bg-kgp-darkred transition shadow flex items-center gap-1.5"
            >
              <span>Next Stage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinalSubmit}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition shadow-lg flex items-center gap-1.5"
            >
              <span>Pay & Submit Profile</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>

      {/* Profile Created Pop-up Modal (Specified in block diagram!) */}
      {profileCreatedModal && (
        <div className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-center shadow-2xl border-2 border-emerald-500 animate-in fade-in zoom-in">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h4 className="text-xl font-bold font-serif-title text-slate-900">
              Profile Created Successfully!
            </h4>
            <p className="text-xs text-slate-600 mt-2">
              Your application has been registered with the Indian Institute of Technology Kharagpur BS Admissions Office.
            </p>

            <div className="my-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-slate-500 text-[10px] uppercase font-bold">Your Application Reference ID</div>
              <div className="text-lg font-mono font-bold text-kgp-crimson mt-1">{generatedAppId}</div>
              <div className="text-[11px] text-slate-500 mt-1">
                Candidate Name: <strong>{formData.firstName} {formData.lastName || 'Candidate'}</strong>
              </div>
            </div>

            <div className="text-left text-xs text-slate-600 bg-blue-50 p-3 rounded-lg border border-blue-200 space-y-1 mb-5">
              <div className="font-bold text-blue-900">Confirmation Mail Dispatched:</div>
              <div>• A confirmation receipt has been sent to {formData.mail || 'your email'}.</div>
              <div>• After document verification, your permanent Login ID, Password & Course Card will be issued.</div>
            </div>

            <button
              onClick={() => { setProfileCreatedModal(false); onClose(); }}
              className="w-full py-3 bg-kgp-crimson hover:bg-kgp-darkred text-white font-bold text-xs rounded-xl shadow transition"
            >
              Return to Website Portal
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
