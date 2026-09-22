import React, { useState } from 'react';
import { Calculator, DollarSign, Award, Check, HelpCircle, ShieldCheck } from 'lucide-react';

export default function FeesStructure() {
  const [selectedLevel, setSelectedLevel] = useState('foundation');
  const [incomeCategory, setIncomeCategory] = useState('low'); // low (<1L), mid (1-5L), high (>5L)
  const [socialCategory, setSocialCategory] = useState('gen'); // gen, obc, sc_st_pwd

  // Base Fee Matrix
  const baseFees = {
    foundation: { name: "Foundation Level (32 Credits)", standard: 32000, terms: 2, courses: 8 },
    diploma: { name: "Diploma Level (Both Tracks)", standard: 94500, terms: 4, courses: 10 },
    bsc: { name: "B.Sc. Degree (114 Credits Total)", standard: 221000, terms: 6, courses: 28 },
    bs: { name: "4-Year BS Degree (142 Credits Total)", standard: 315000, terms: 8, courses: 36 }
  };

  // Determine scholarship percentage
  let waiverPercent = 0;
  if (incomeCategory === 'low') {
    waiverPercent = 75; // < 1 LPA gets 75% waiver
  } else if (incomeCategory === 'mid') {
    waiverPercent = 50; // 1-5 LPA gets 50% waiver
  } else if (socialCategory === 'sc_st_pwd') {
    waiverPercent = 50;
  } else {
    waiverPercent = 0;
  }

  const currentPlan = baseFees[selectedLevel];
  const standardFee = currentPlan.standard;
  const waiverAmount = (standardFee * waiverPercent) / 100;
  const netPayable = standardFee - waiverAmount;
  const perTermFee = Math.round(netPayable / currentPlan.terms);

  return (
    <section id="fees" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-3 py-1 rounded-full">
            Transparent Pay-As-You-Go Model
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif-title">
            Fee Structure & Scholarship Estimator
          </h2>
          <p className="mt-3 text-slate-600">
            Pay only for the courses you register for in each 4-month term. No upfront multi-year lump sum payments. Substantial scholarships up to 75% based on family income.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Fee Table & Scholarship Policy (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 font-serif-title mb-4">
                Modular Fee Schedule (Standard Rates)
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 text-slate-700 uppercase font-semibold">
                    <tr>
                      <th className="px-3 py-2.5 rounded-l-lg">Program Level</th>
                      <th className="px-3 py-2.5">Courses</th>
                      <th className="px-3 py-2.5">Duration</th>
                      <th className="px-3 py-2.5 rounded-r-lg text-right">Standard Fee</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                    <tr>
                      <td className="px-3 py-3 font-bold text-kgp-crimson">Foundation Level</td>
                      <td className="px-3 py-3">8 Courses</td>
                      <td className="px-3 py-3">8 - 12 Months</td>
                      <td className="px-3 py-3 text-right font-bold">₹32,000</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-3 font-bold text-kgp-crimson">Diploma in Programming</td>
                      <td className="px-3 py-3">5 Courses + 1 Project</td>
                      <td className="px-3 py-3">8 - 12 Months</td>
                      <td className="px-3 py-3 text-right font-bold">₹47,250</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-3 font-bold text-kgp-crimson">Diploma in Data Science</td>
                      <td className="px-3 py-3">5 Courses + 1 Project</td>
                      <td className="px-3 py-3">8 - 12 Months</td>
                      <td className="px-3 py-3 text-right font-bold">₹47,250</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-3 font-bold text-kgp-crimson">B.Sc. Degree (Cumulative)</td>
                      <td className="px-3 py-3">28 Courses total</td>
                      <td className="px-3 py-3">3 Years</td>
                      <td className="px-3 py-3 text-right font-bold">₹2,21,000</td>
                    </tr>
                    <tr className="bg-amber-50/50">
                      <td className="px-3 py-3 font-bold text-amber-900">4-Year BS Degree (Full)</td>
                      <td className="px-3 py-3">36 Courses + Thesis</td>
                      <td className="px-3 py-3">4 Years</td>
                      <td className="px-3 py-3 text-right font-bold text-amber-900">₹3,15,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Institutional Scholarship Policy
                </h4>
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex items-center justify-between">
                    <span>Family Annual Income &lt; ₹1,00,000:</span>
                    <span className="font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">75% Fee Waiver</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Family Annual Income ₹1,00,000 - ₹5,00,000:</span>
                    <span className="font-bold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded">50% Fee Waiver</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>SC / ST / PwD Candidates:</span>
                    <span className="font-bold text-purple-700 bg-purple-100/70 px-2 py-0.5 rounded">50% to 75% Support</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Interactive Calculator (6 cols) */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-2xl border-2 border-kgp-crimson/30 p-6 sm:p-7 shadow-lg">
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-kgp-crimson text-amber-400 flex items-center justify-center">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-serif-title">
                    Interactive Scholarship & Fee Calculator
                  </h3>
                  <p className="text-xs text-slate-500">Calculate your net payable fee according to NEP guidelines</p>
                </div>
              </div>

              {/* Step 1: Select Target Level */}
              <div className="space-y-4 mb-6">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  1. Select Target Level
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.keys(baseFees).map((key) => (
                    <button
                      key={key}
                      onClick={() => setSelectedLevel(key)}
                      className={`p-2.5 rounded-lg text-xs font-semibold text-left border transition ${
                        selectedLevel === key
                          ? 'border-kgp-crimson bg-red-50/50 text-kgp-crimson'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {baseFees[key].name.split(' (')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Family Annual Income */}
              <div className="space-y-4 mb-6">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  2. Annual Family Income
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setIncomeCategory('low')}
                    className={`p-2.5 rounded-lg text-xs font-semibold border text-center transition ${
                      incomeCategory === 'low'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div>&lt; ₹1 Lakh</div>
                    <span className="text-[10px] text-emerald-600 block">75% Waiver</span>
                  </button>

                  <button
                    onClick={() => setIncomeCategory('mid')}
                    className={`p-2.5 rounded-lg text-xs font-semibold border text-center transition ${
                      incomeCategory === 'mid'
                        ? 'border-blue-600 bg-blue-50 text-blue-800'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div>₹1L - ₹5 Lakhs</div>
                    <span className="text-[10px] text-blue-600 block">50% Waiver</span>
                  </button>

                  <button
                    onClick={() => setIncomeCategory('high')}
                    className={`p-2.5 rounded-lg text-xs font-semibold border text-center transition ${
                      incomeCategory === 'high'
                        ? 'border-slate-800 bg-slate-100 text-slate-900'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div>&gt; ₹5 Lakhs</div>
                    <span className="text-[10px] text-slate-500 block">Standard Fee</span>
                  </button>
                </div>
              </div>

              {/* Step 3: Social Category */}
              <div className="space-y-4 mb-6">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  3. Social Reservation Category
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSocialCategory('gen')}
                    className={`p-2 rounded-lg text-xs font-semibold border text-center transition ${
                      socialCategory === 'gen'
                        ? 'border-kgp-crimson bg-red-50/50 text-kgp-crimson'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    General / OBC (Non-PwD)
                  </button>
                  <button
                    onClick={() => setSocialCategory('sc_st_pwd')}
                    className={`p-2 rounded-lg text-xs font-semibold border text-center transition ${
                      socialCategory === 'sc_st_pwd'
                        ? 'border-purple-600 bg-purple-50 text-purple-800'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    SC / ST / PwD
                  </button>
                </div>
              </div>

              {/* Calculator Results Box */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-slate-900 to-kgp-navy text-white space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Standard Total Fee:</span>
                  <span className="line-through text-slate-400">₹{standardFee.toLocaleString()}</span>
                </div>

                {waiverPercent > 0 && (
                  <div className="flex items-center justify-between text-xs text-emerald-400 font-semibold">
                    <span>Applicable Scholarship ({waiverPercent}%):</span>
                    <span>- ₹{waiverAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-slate-700 flex items-baseline justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300">Net Total Payable:</span>
                  <span className="text-2xl font-extrabold text-white font-serif-title">
                    ₹{netPayable.toLocaleString()}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-300">
                  <span>Approx. Payable Per Term ({currentPlan.terms} Terms):</span>
                  <span className="font-bold text-amber-400">₹{perTermFee.toLocaleString()} / term</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
