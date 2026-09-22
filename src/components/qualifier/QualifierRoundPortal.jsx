import React, { useState } from 'react';
import { 
  CheckCircle2, CreditCard, ArrowRight, UserCheck, ShieldCheck, 
  Award, QrCode, FileText, Sparkles, Users, Lock, ChevronRight 
} from 'lucide-react';
import { IIT_KGP_INFO, SAMPLE_QUALIFIER_CANDIDATES } from '../../data/portalData';
import iitKgpLogo from '../../assets/logo';

export default function QualifierRoundPortal({ onStartExam, onBackToHome }) {
  const [step, setStep] = useState(1); // 1: Details, 2: Payment, 3: Exam Ready
  const [candidates, setCandidates] = useState(SAMPLE_QUALIFIER_CANDIDATES);

  const [formData, setFormData] = useState({
    name: 'Srinjoy Samanta',
    email: 'srinjoy@example.com',
    phone: '+91 98300 12345',
    category: 'General',
    income: '< 1 LPA (75% Waiver)',
    mode: 'Online AI-Proctored Test'
  });

  const [rollNo, setRollNo] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Fee calculation
  const baseFee = 1500;
  const isWaiver = formData.income.includes('75% Waiver');
  const payableAmount = isWaiver ? 375 : 1500;

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    const generatedRoll = "KGP-QUAL-2026-" + Math.floor(1000 + Math.random() * 9000);
    setRollNo(generatedRoll);
    setStep(2); // proceed to payment
  };

  const handlePayNow = () => {
    setPaymentSuccess(true);
    // Add to candidate host list
    const newEntry = {
      roll: rollNo,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      feeStatus: `Paid (₹${payableAmount})`,
      examStatus: "Ready for Test",
      score: "-",
      result: "Registered"
    };
    setCandidates([newEntry, ...candidates]);
    setTimeout(() => {
      setStep(3); // proceed to exam ready
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4 sm:px-6 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-kgp-navy to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-amber-500/30">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-full bg-white p-1 flex items-center justify-center overflow-hidden shadow-lg flex-shrink-0">
              <img src={iitKgpLogo} alt="IIT KGP" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                {IIT_KGP_INFO.hindiName}
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold font-serif-title">
                Qualifier Round Examination Portal 2026
              </h1>
              <p className="text-xs text-slate-300 mt-0.5">
                BS in Data Science & Artificial Intelligence (AI) — Candidate Intake & Testing System
              </p>
            </div>
          </div>

          <button
            onClick={onBackToHome}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition"
          >
            Back to Main Website
          </button>
        </div>

        {/* Step Indicator */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center justify-between max-w-2xl mx-auto text-xs font-bold">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-kgp-crimson' : 'text-slate-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-kgp-crimson text-white' : 'bg-slate-200 text-slate-600'}`}>
              1
            </span>
            <span>1. Candidate Details</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300" />
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-kgp-crimson' : 'text-slate-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-kgp-crimson text-white' : 'bg-slate-200 text-slate-600'}`}>
              2
            </span>
            <span>2. Pay Examination Fee</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300" />
          <div className={`flex items-center gap-2 ${step >= 3 ? 'text-emerald-700' : 'text-slate-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
              3
            </span>
            <span>3. Take Qualifier Exam</span>
          </div>
        </div>

        {/* STEP 1: CANDIDATE DETAILS REGISTRATION */}
        {step === 1 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-md">
            <h3 className="text-lg font-bold font-serif-title text-slate-900 mb-1">
              Step 1: Enter Candidate Details for Qualifier Round
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Register your profile to receive your official IIT KGP Qualifier Roll Number.
            </p>

            <form onSubmit={handleDetailsSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Full Candidate Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-kgp-crimson"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Email Address (For Admit Card & Results) *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-kgp-crimson"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Mobile Number (ISD + 10 Digits) *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-kgp-crimson"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Social Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white"
                  >
                    <option>General</option>
                    <option>OBC-NCL</option>
                    <option>SC / ST</option>
                    <option>PwD</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Family Annual Income (For Fee Waiver)</label>
                  <select
                    value={formData.income}
                    onChange={(e) => setFormData({ ...formData, income: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white"
                  >
                    <option>&lt; 1 LPA (75% Waiver)</option>
                    <option>1 - 5 LPA (50% Waiver)</option>
                    <option>&gt; 5 LPA (Standard Fee)</option>
                  </select>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-center justify-between">
                <span>Calculated Qualifier Exam Fee: <strong>₹{payableAmount}</strong> ({isWaiver ? '75% Income Waiver Applied' : 'Standard Rate'})</span>
                <span className="text-emerald-700 font-bold">IIT KGP Aid Eligible</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-kgp-crimson hover:bg-kgp-darkred text-white font-bold text-sm rounded-xl shadow-lg transition flex items-center justify-center gap-2"
              >
                <span>Save Details & Proceed to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* STEP 2: PAYMENT GATEWAY */}
        {step === 2 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-md space-y-6">
            <h3 className="text-lg font-bold font-serif-title text-slate-900">
              Step 2: Pay Qualifier Examination Fee
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              
              {/* Fee Receipt Card */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                <div className="text-slate-500 font-bold uppercase text-[10px]">Candidate Details Summary</div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Name:</span>
                  <strong>{formData.name}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Qualifier Roll No:</span>
                  <strong className="text-kgp-crimson font-mono">{rollNo}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Exam Mode:</span>
                  <strong>{formData.mode}</strong>
                </div>
                <div className="pt-3 border-t border-slate-200 flex justify-between font-bold text-base text-slate-900">
                  <span>Payable Amount:</span>
                  <span className="text-kgp-crimson">₹{payableAmount}</span>
                </div>
              </div>

              {/* UPI & Payment Selector */}
              <div className="p-6 rounded-2xl border border-slate-200 space-y-4 text-xs text-center">
                <div className="font-bold text-slate-800">Scan UPI QR Code to Complete Payment</div>
                
                {/* Simulated QR Code */}
                <div className="w-44 h-44 mx-auto border-2 border-slate-300 rounded-xl p-2 bg-white flex flex-col items-center justify-center shadow-sm">
                  <QrCode className="w-36 h-36 text-slate-800" />
                  <span className="text-[10px] text-slate-500 font-mono mt-0.5">UPI: iitkgp.bs@sbi</span>
                </div>

                <button
                  type="button"
                  onClick={handlePayNow}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{paymentSuccess ? 'Payment Confirmed! Proceeding...' : `Confirm Payment of ₹${payableAmount}`}</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* STEP 3: EXAM READY — LAUNCH TEST */}
        {step === 3 && (
          <div className="bg-gradient-to-br from-slate-900 via-kgp-navy to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold font-serif-title">
              Payment Successful — You Are Ready for the Exam!
            </h3>

            <div className="max-w-md mx-auto bg-slate-800/80 rounded-2xl border border-slate-700 p-4 text-xs text-slate-200 space-y-1">
              <div>Candidate: <strong>{formData.name}</strong></div>
              <div>Roll No: <strong className="text-amber-400 font-mono">{rollNo}</strong></div>
              <div>Test Subjects: <strong>Math for AI, Statistics for AI, Python & ML Concepts</strong></div>
              <div>Duration: <strong>45 Minutes (Automatic Evaluation)</strong></div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onStartExam({ name: formData.name, roll: rollNo })}
                className="px-10 py-4 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 font-extrabold text-base rounded-2xl shadow-2xl hover:scale-105 transition transform flex items-center justify-center gap-3 mx-auto"
              >
                <span>Launch Qualifier Round Examination</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* HOST OF STUDENTS LIVE ROSTER (FOR SUPERVISORS / ADMIN) */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200">
            <div>
              <h4 className="text-base font-bold font-serif-title text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-kgp-crimson" />
                <span>Host of Students — Qualifier Round Registrations</span>
              </h4>
              <p className="text-xs text-slate-500">Live feed of enrolled candidates, fee payment reconciliation, and test results.</p>
            </div>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full w-fit">
              {candidates.length} Registered Candidates
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 uppercase font-bold">
                <tr>
                  <th className="px-3 py-2.5">Roll No</th>
                  <th className="px-3 py-2.5">Candidate Name</th>
                  <th className="px-3 py-2.5">Email</th>
                  <th className="px-3 py-2.5">Fee Status</th>
                  <th className="px-3 py-2.5">Exam Status</th>
                  <th className="px-3 py-2.5 text-right">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {candidates.map((c, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="px-3 py-2.5 font-mono font-bold text-kgp-crimson">{c.roll}</td>
                    <td className="px-3 py-2.5 font-bold text-slate-900">{c.name}</td>
                    <td className="px-3 py-2.5 text-slate-500">{c.email}</td>
                    <td className="px-3 py-2.5 font-medium">{c.feeStatus}</td>
                    <td className="px-3 py-2.5">
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                        c.examStatus === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {c.examStatus}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-right font-bold text-emerald-700">{c.result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
