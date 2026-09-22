import React, { useState, useEffect } from 'react';
import { 
  Clock, ShieldCheck, CheckCircle2, AlertCircle, Calculator, 
  HelpCircle, ChevronRight, ChevronLeft, ArrowRight, Printer, 
  Download, Award, X, Sparkles, Video, UserCheck 
} from 'lucide-react';
import { QUALIFIER_QUESTIONS, IIT_KGP_INFO } from '../../data/portalData';

export default function QualifierExamEngine({ candidateName, candidateRoll, onExit }) {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState({});
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 minutes
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [calcInput, setCalcInput] = useState('');

  // Countdown timer
  useEffect(() => {
    if (isSubmitted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleSelectOption = (optIndex) => {
    setUserAnswers((prev) => ({ ...prev, [currentQIndex]: optIndex }));
  };

  const handleClearResponse = () => {
    setUserAnswers((prev) => {
      const next = { ...prev };
      delete next[currentQIndex];
      return next;
    });
  };

  const handleToggleReview = () => {
    setMarkedForReview((prev) => ({ ...prev, [currentQIndex]: !prev[currentQIndex] }));
    if (currentQIndex < QUALIFIER_QUESTIONS.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    }
  };

  const handleSaveAndNext = () => {
    if (currentQIndex < QUALIFIER_QUESTIONS.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    }
  };

  const handleSubmitExam = () => {
    setIsSubmitted(true);
    setShowConfirmSubmit(false);
  };

  // Calculate score
  let correctCount = 0;
  QUALIFIER_QUESTIONS.forEach((q, idx) => {
    if (userAnswers[idx] === q.correctIndex) {
      correctCount += 1;
    }
  });
  const totalQuestions = QUALIFIER_QUESTIONS.length;
  const percentage = Math.round((correctCount / totalQuestions) * 100);
  const isQualified = percentage >= 40;

  const q = QUALIFIER_QUESTIONS[currentQIndex];

  // SUBMITTED RESULT VIEW
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-100 py-10 px-4 sm:px-6 flex items-center justify-center font-sans">
        <div className="bg-white rounded-3xl border border-slate-300 shadow-2xl max-w-3xl w-full p-6 sm:p-10 space-y-6">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-white border-2 border-amber-400 p-1 flex items-center justify-center shadow">
                <img src="/iitkgp-logo.png" alt="IIT KGP" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="text-xs font-bold text-kgp-crimson uppercase tracking-wider">
                  {IIT_KGP_INFO.hindiName}
                </div>
                <h3 className="text-lg font-bold font-serif-title text-slate-900">
                  Qualifier Round Examination Official Result
                </h3>
              </div>
            </div>

            <button
              onClick={onExit}
              className="px-3.5 py-1.5 text-xs font-bold bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 transition"
            >
              Exit to Portal
            </button>
          </div>

          {/* Qualification Banner */}
          <div className={`p-6 rounded-2xl border text-center space-y-2 ${
            isQualified ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-red-50 border-red-300 text-red-900'
          }`}>
            {isQualified ? (
              <>
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow">
                  <Award className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-extrabold font-serif-title text-emerald-800">
                  CONGRATULATIONS! QUALIFIED
                </h4>
                <p className="text-xs sm:text-sm text-emerald-700 max-w-xl mx-auto">
                  You have successfully passed the Qualifier Round Examination and are formally eligible for admission into the 
                  <strong> BS in Data Science & Artificial Intelligence</strong> at Indian Institute of Technology Kharagpur!
                </p>
              </>
            ) : (
              <>
                <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto shadow">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-extrabold font-serif-title text-red-800">
                  Did Not Meet Cutoff (40%)
                </h4>
                <p className="text-xs text-red-700">
                  Minimum passing requirement is 40%. You can apply for a retest in the upcoming term.
                </p>
              </>
            )}
          </div>

          {/* Scorecard Table */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                <div className="text-[10px] uppercase font-bold text-slate-500">Candidate Name</div>
                <div className="text-sm font-bold text-slate-900 mt-1">{candidateName || 'Arindam Banerjee'}</div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                <div className="text-[10px] uppercase font-bold text-slate-500">Roll Number</div>
                <div className="text-sm font-bold text-kgp-crimson font-mono mt-1">{candidateRoll || 'KGP-QUAL-2026-0842'}</div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                <div className="text-[10px] uppercase font-bold text-slate-500">Total Score</div>
                <div className="text-lg font-bold text-slate-900 mt-1">{correctCount} / {totalQuestions} ({percentage}%)</div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                <div className="text-[10px] uppercase font-bold text-slate-500">Qualifier Cutoff</div>
                <div className="text-lg font-bold text-emerald-700 mt-1">40.0% Minimum</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => window.print()}
              className="flex-1 py-3 bg-kgp-crimson hover:bg-kgp-darkred text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print Official Qualifier Scorecard</span>
            </button>
            <button
              onClick={onExit}
              className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-2"
            >
              <span>Proceed to Foundation Enrollment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    );
  }

  // ACTIVE EXAM INTERFACE (CBT SIMULATOR)
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans select-none">
      
      {/* Top Bar with Timer & AI Proctor */}
      <header className="bg-kgp-darknavy px-4 sm:px-6 py-3 border-b border-slate-800 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-white p-1 flex items-center justify-center overflow-hidden shadow">
            <img src="/iitkgp-logo.png" alt="IIT KGP" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="text-xs font-bold text-amber-400">
              IIT Kharagpur — Qualifier Round Examination 2026
            </div>
            <div className="text-[11px] text-slate-400">
              BS in Data Science & Artificial Intelligence (AI)
            </div>
          </div>
        </div>

        {/* Live Timer & Proctor Status */}
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold border border-emerald-500/30">
            <Video className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>AI Proctor Active: Verified</span>
          </div>

          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border font-mono font-bold text-sm sm:text-base ${
            timeLeft < 300 
              ? 'bg-red-500/20 border-red-500 text-red-400 animate-pulse' 
              : 'bg-slate-800 border-slate-700 text-amber-300'
          }`}>
            <Clock className="w-4 h-4" />
            <span>{formatTime(timeLeft)}</span>
          </div>

          <button
            onClick={() => setShowCalculator(!showCalculator)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            title="Scientific Calculator"
          >
            <Calculator className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Examination Body */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* Left: Question Area (8 cols) */}
        <div className="flex-1 flex flex-col justify-between p-4 sm:p-8 bg-slate-950 overflow-y-auto">
          
          <div className="space-y-4">
            
            {/* Question Header & Section */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {q.section}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Question {currentQIndex + 1} of {totalQuestions}
              </span>
            </div>

            {/* Question Text */}
            <div className="py-2">
              <h3 className="text-base sm:text-lg font-medium text-slate-100 leading-relaxed">
                <span className="font-bold mr-2 text-amber-400">Q{currentQIndex + 1}.</span>
                {q.question}
              </h3>
            </div>

            {/* Options List */}
            <div className="space-y-3 pt-2">
              {q.options.map((opt, optIdx) => {
                const isSelected = userAnswers[currentQIndex] === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-xl border text-xs sm:text-sm font-medium transition flex items-center space-x-3 ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-md'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850 hover:border-slate-700'
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                      isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="flex-1 leading-relaxed">{opt}</span>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Action Navigation Footer */}
          <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={handleClearResponse}
                className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-white transition"
              >
                Clear Response
              </button>
              <button
                onClick={handleToggleReview}
                className={`px-3 py-2 rounded-lg border font-semibold transition ${
                  markedForReview[currentQIndex]
                    ? 'bg-purple-600 border-purple-500 text-white'
                    : 'bg-slate-900 border-slate-700 text-purple-400 hover:bg-slate-850'
                }`}
              >
                {markedForReview[currentQIndex] ? 'Marked for Review ✓' : 'Mark for Review & Next'}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={currentQIndex === 0}
                onClick={() => setCurrentQIndex(currentQIndex - 1)}
                className="px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 disabled:opacity-30 transition"
              >
                Previous
              </button>
              <button
                onClick={handleSaveAndNext}
                className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow transition"
              >
                Save & Next
              </button>
            </div>
          </div>

        </div>

        {/* Right: Question Palette & Candidate Card (4 cols) */}
        <div className="w-full md:w-72 bg-slate-900 border-l border-slate-800 p-4 sm:p-5 flex flex-col justify-between flex-shrink-0 overflow-y-auto">
          
          <div className="space-y-4">
            
            {/* Candidate Card */}
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-kgp-crimson text-white font-bold flex items-center justify-center text-sm shadow">
                {candidateName ? candidateName.charAt(0) : 'A'}
              </div>
              <div className="overflow-hidden">
                <div className="text-xs font-bold text-white truncate">{candidateName || 'Arindam Banerjee'}</div>
                <div className="text-[10px] text-amber-400 font-mono">{candidateRoll || 'KGP-QUAL-2026-0842'}</div>
              </div>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400">
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Answered</div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Unanswered</div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> For Review</div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-600" /> Not Visited</div>
            </div>

            {/* Question Grid Buttons */}
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Question Palette
              </div>
              <div className="grid grid-cols-4 gap-2">
                {QUALIFIER_QUESTIONS.map((item, idx) => {
                  const isAnswered = userAnswers[idx] !== undefined;
                  const isMarked = markedForReview[idx];
                  const isCurrent = currentQIndex === idx;

                  let bgClass = "bg-slate-800 border-slate-700 text-slate-300";
                  if (isMarked) bgClass = "bg-purple-600 border-purple-400 text-white font-bold";
                  else if (isAnswered) bgClass = "bg-emerald-600 border-emerald-400 text-white font-bold";
                  else if (idx < currentQIndex) bgClass = "bg-red-600/80 border-red-500 text-white";

                  return (
                    <button
                      key={idx}
                      onClick={() => setCurrentQIndex(idx)}
                      className={`h-9 rounded-lg text-xs font-mono transition border ${bgClass} ${
                        isCurrent ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-slate-900 scale-105' : ''
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Submit Exam Button */}
          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={() => setShowConfirmSubmit(true)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg transition flex items-center justify-center gap-2"
            >
              <span>Submit Examination</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

      {/* Confirmation Modal Before Final Submit */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl border border-slate-700 p-6 max-w-sm w-full space-y-4 text-center shadow-2xl">
            <h4 className="text-base font-bold text-white font-serif-title">
              Confirm Final Examination Submission?
            </h4>
            <div className="text-xs text-slate-300 space-y-1">
              <div>Total Questions: <strong>{totalQuestions}</strong></div>
              <div>Answered Questions: <strong className="text-emerald-400">{Object.keys(userAnswers).length}</strong></div>
              <div>Marked for Review: <strong className="text-purple-400">{Object.keys(markedForReview).filter(k => markedForReview[k]).length}</strong></div>
              <div>Remaining Time: <strong className="text-amber-400">{formatTime(timeLeft)}</strong></div>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowConfirmSubmit(false)}
                className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold"
              >
                Back to Test
              </button>
              <button
                onClick={handleSubmitExam}
                className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold"
              >
                Yes, Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Calculator Modal */}
      {showCalculator && (
        <div className="fixed bottom-16 right-6 z-50 bg-slate-800 border border-slate-700 rounded-2xl p-4 shadow-2xl w-64 text-slate-100">
          <div className="flex items-center justify-between pb-2 border-b border-slate-700 text-xs font-bold">
            <span>Exam Calculator</span>
            <button onClick={() => setShowCalculator(false)}><X className="w-3.5 h-3.5" /></button>
          </div>
          <div className="my-2 bg-slate-900 p-2 rounded-lg text-right font-mono text-base font-bold truncate">
            {calcInput || '0'}
          </div>
          <div className="grid grid-cols-4 gap-1.5 text-xs font-bold">
            {['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+'].map((char) => (
              <button
                key={char}
                onClick={() => {
                  if (char === '=') {
                    try { 
                      const sanitized = calcInput.replace(/[^0-9+\-*/.]/g, '');
                      setCalcInput(String(Function(`"use strict"; return (${sanitized})`)())); 
                    } catch(e) { 
                      setCalcInput('Err'); 
                    }
                  } else {
                    setCalcInput(prev => prev + char);
                  }
                }}
                className="p-2 bg-slate-700 hover:bg-slate-600 rounded-md transition"
              >
                {char}
              </button>
            ))}
          </div>
          <button
            onClick={() => setCalcInput('')}
            className="w-full mt-2 py-1 bg-red-600/80 hover:bg-red-500 text-[10px] font-bold rounded"
          >
            Clear
          </button>
        </div>
      )}

    </div>
  );
}
