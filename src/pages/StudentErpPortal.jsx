import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  GraduationCap,
  BookOpen,
  CreditCard,
  FileCheck2,
  CheckCircle2,
  Clock,
  Play,
  FileText,
  HelpCircle,
  Award,
  ChevronRight,
  Download,
  AlertCircle,
  QrCode,
  Building,
  ShieldCheck,
  Check,
  Printer,
  Sparkles,
  ArrowRight,
  Code2,
  RefreshCw,
  LogOut,
  ArrowLeft,
  X,
  User
} from 'lucide-react';
import iitKgpLogo from '../assets/logo';

// Default Qualifier Courses & LMS Syllabus
const DEFAULT_COURSES = [
  {
    id: 1,
    code: 'BS10001',
    title: 'Computational Thinking & Python Programming',
    credits: 4,
    desc: 'Fundamental algorithms, control flow, functions, object-oriented concepts, and algorithmic problem solving in Python 3.x.',
    instructor_name: 'Prof. Partha Pratim Das',
    instructor_designation: 'Department of Computer Science & Engineering',
    banner_color: 'from-blue-600 to-indigo-800',
    progress_pct: 75,
    modules: [
      {
        id: 101,
        week: 1,
        title: 'Week 1: Algorithmic Thinking, Variables & Flow of Control',
        description: 'Introduction to algorithmic structures, memory variables, operators, and conditional branching.',
        contents: [
          { id: 1001, title: 'Lecture 1.1: Core Foundations & Theoretical Concepts', duration_minutes: 42, watched_percentage: 100, is_completed: true },
          { id: 1002, title: 'Lecture 1.2: Hands-on Code Demonstration & Edge Cases', duration_minutes: 35, watched_percentage: 100, is_completed: true }
        ]
      },
      {
        id: 102,
        week: 2,
        title: 'Week 2: Loops, Nested Iterations & String Manipulation',
        description: 'While and for loops, break/continue semantics, slice syntax, and string functions.',
        contents: [
          { id: 1003, title: 'Lecture 2.1: Iteration Logic & While/For Deep Dive', duration_minutes: 38, watched_percentage: 100, is_completed: true },
          { id: 1004, title: 'Lecture 2.2: String Manipulation and Formatting Patterns', duration_minutes: 32, watched_percentage: 80, is_completed: false }
        ]
      },
      {
        id: 103,
        week: 3,
        title: 'Week 3: Data Structures (Lists, Tuples, Sets, Dictionaries)',
        description: 'List comprehensions, mutability, hash maps, sets, and tuple packing/unpacking.',
        contents: [
          { id: 1005, title: 'Lecture 3.1: Python Compound Data Types & Mutability', duration_minutes: 45, watched_percentage: 60, is_completed: false },
          { id: 1006, title: 'Lecture 3.2: Dictionaries, Sets and Hash Complexity', duration_minutes: 40, watched_percentage: 0, is_completed: false }
        ]
      },
      {
        id: 104,
        week: 4,
        title: 'Week 4: Functions, Recursion & File Input/Output',
        description: 'Function scopes, lambda expressions, recursion tree analysis, and file handling.',
        contents: [
          { id: 1007, title: 'Lecture 4.1: First-Class Functions and Recursion', duration_minutes: 50, watched_percentage: 0, is_completed: false },
          { id: 1008, title: 'Lecture 4.2: File Handling, Context Managers & Exceptions', duration_minutes: 36, watched_percentage: 0, is_completed: false }
        ]
      }
    ]
  },
  {
    id: 2,
    code: 'BS10002',
    title: 'Mathematics for Data Science I',
    credits: 4,
    desc: 'Set theory, functions, linear algebra, vector spaces, eigenvalues, matrix transformations, and multi-variable calculus.',
    instructor_name: 'Prof. Somesh Kumar',
    instructor_designation: 'Department of Mathematics',
    banner_color: 'from-emerald-600 to-teal-800',
    progress_pct: 60,
    modules: [
      {
        id: 201,
        week: 1,
        title: 'Week 1: Sets, Relations, Functions & Logic',
        description: 'Foundations of mathematical reasoning, sets, subsets, injections, and surjections.',
        contents: [
          { id: 2001, title: 'Lecture 1.1: Sets, Set Operations & Venn Logic', duration_minutes: 40, watched_percentage: 100, is_completed: true },
          { id: 2002, title: 'Lecture 1.2: Functions, Domain/Range & Inverse Mappings', duration_minutes: 35, watched_percentage: 100, is_completed: true }
        ]
      },
      {
        id: 202,
        week: 2,
        title: 'Week 2: Matrices, Systems of Linear Equations & Row Operations',
        description: 'Gaussian elimination, matrix rank, echelon forms, and consistency criteria.',
        contents: [
          { id: 2003, title: 'Lecture 2.1: Systems of Linear Equations & Row Echelon', duration_minutes: 45, watched_percentage: 70, is_completed: false }
        ]
      }
    ]
  },
  {
    id: 3,
    code: 'BS10003',
    title: 'English for Academic Communication',
    credits: 2,
    desc: 'Grammar mechanics, academic writing style, scientific reading comprehension, vocabulary precision, and technical presentation.',
    instructor_name: 'Prof. Anjali Ray',
    instructor_designation: 'Department of Humanities & Social Sciences',
    banner_color: 'from-amber-600 to-orange-800',
    progress_pct: 90,
    modules: [
      {
        id: 301,
        week: 1,
        title: 'Week 1: Sentence Architecture & Grammatical Precision',
        description: 'Clausal structures, subject-verb agreement, and technical punctuation.',
        contents: [
          { id: 3001, title: 'Lecture 1.1: Academic Writing Principles & Concise Style', duration_minutes: 30, watched_percentage: 100, is_completed: true },
          { id: 3002, title: 'Lecture 1.2: Research Summaries & Abstract Formulation', duration_minutes: 28, watched_percentage: 100, is_completed: true }
        ]
      }
    ]
  },
  {
    id: 4,
    code: 'BS10004',
    title: 'Statistics & Exploratory Data Analysis',
    credits: 4,
    desc: 'Descriptive statistics, probability spaces, random variables, distributions (Binomial, Poisson, Normal), and hypothesis testing.',
    instructor_name: 'Prof. Debasis Sengupta',
    instructor_designation: 'Department of Industrial & Systems Engineering',
    banner_color: 'from-purple-600 to-pink-800',
    progress_pct: 50,
    modules: [
      {
        id: 401,
        week: 1,
        title: 'Week 1: Descriptive Statistics & Data Visualization',
        description: 'Measures of central tendency, spread, box plots, and exploratory patterns.',
        contents: [
          { id: 4001, title: 'Lecture 1.1: Mean, Median, Variance and Standard Deviation', duration_minutes: 42, watched_percentage: 100, is_completed: true },
          { id: 4002, title: 'Lecture 1.2: Quantiles, Boxplots & Skewness Analysis', duration_minutes: 36, watched_percentage: 50, is_completed: false }
        ]
      }
    ]
  }
];

// Default Examination Question Bank (5 Questions across CS, Math, English, Stats)
const DEFAULT_QUESTIONS = [
  {
    id: 1,
    text: 'What is the asymptotic time complexity of searching for a key in a balanced Binary Search Tree (BST) with N nodes?',
    type: 'mcq',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
    correct_answer: 'O(log N)',
    marks: 20.00,
    negative_marks: 5.00,
    explanation: 'In a balanced BST, tree height is log2(N). Search requires traversing down a single path, resulting in O(log N) time.'
  },
  {
    id: 2,
    text: 'Consider the Python snippet below. What is the printed output?',
    type: 'code_snippet',
    code_snippet: 'numbers = [1, 2, 3, 4, 5, 6]\nresult = [x * 2 for x in numbers if x % 2 == 0]\nprint(result)',
    code_language: 'python',
    options: ['[2, 4, 6]', '[4, 8, 12]', '[2, 6, 10]', '[4, 16, 36]'],
    correct_answer: '[4, 8, 12]',
    marks: 20.00,
    negative_marks: 5.00,
    explanation: 'Even numbers in the list are 2, 4, 6. Multiplying each by 2 yields [4, 8, 12].'
  },
  {
    id: 3,
    text: 'Calculate the determinant of the 2x2 matrix: [[4, 2], [1, 3]].',
    type: 'numerical',
    options: null,
    correct_answer: '10',
    marks: 20.00,
    negative_marks: 0.00,
    explanation: 'Determinant = (4 * 3) - (2 * 1) = 12 - 2 = 10.'
  },
  {
    id: 4,
    text: 'Identify the sentence with correct formal academic grammar and punctuation:',
    type: 'mcq',
    options: [
      'Because the server crashed, the data was lost.',
      'Due to the server crashed the data lost.',
      'The data was lost, because server crashed.',
      'Having crashed the server data is lost.'
    ],
    correct_answer: 'Because the server crashed, the data was lost.',
    marks: 20.00,
    negative_marks: 5.00,
    explanation: 'Subordinate clause preceded by comma properly links to the independent clause.'
  },
  {
    id: 5,
    text: 'A discrete data set has values {14, 18, 22, 26, 30}. What is the arithmetic mean of this distribution?',
    type: 'numerical',
    options: null,
    correct_answer: '22',
    marks: 20.00,
    negative_marks: 0.00,
    explanation: 'Sum = 14 + 18 + 22 + 26 + 30 = 110. Mean = 110 / 5 = 22.0.'
  }
];

export default function StudentErpPortal({ 
  candidate = null, 
  onBackToHome, 
  onLogout 
}) {
  const [activeTab, setActiveTab] = useState('journey'); // 'journey' | 'payment' | 'lms' | 'exam'

  // Student Profile State (backed by localStorage)
  const [student, setStudent] = useState(() => {
    try {
      const stored = localStorage.getItem('iitkgp_erp_student');
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return {
      name: candidate?.name || 'Sourav Mukherjee',
      email: candidate?.email || 'sourav.mukherjee2026@gmail.com',
      rollNo: candidate?.roll || 'KGP-QUAL-2026-0842',
      applicationNo: 'KGP-BS-2026-99120',
      category: 'GEN',
      applicationStatus: 'verified',
      feeStatus: 'success', // 'success' | 'pending'
      feeAmount: 3000,
      transactionRef: 'SBI-MOPS-20260928-881920',
      paidAt: '28 Sep 2026, 11:34 AM',
      paymentGateway: 'SBI MOPS Gateway',
      paymentMethod: 'UPI (Instant Settlement)',
      identityDocStatus: 'verified'
    };
  });

  // LMS Courses & Player State
  const [courses, setCourses] = useState(DEFAULT_COURSES);
  const [selectedCourse, setSelectedCourse] = useState(DEFAULT_COURSES[0]);
  const [activeVideo, setActiveVideo] = useState(DEFAULT_COURSES[0].modules[0].contents[0]);
  const [videoProgress, setVideoProgress] = useState(DEFAULT_COURSES[0].modules[0].contents[0].watched_percentage);

  // Payment Modal State
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedGateway, setSelectedGateway] = useState('Razorpay');
  const [selectedMethod, setSelectedMethod] = useState('UPI');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccessReceipt, setPaymentSuccessReceipt] = useState(null);

  // Exam Engine State
  const [questions, setQuestions] = useState(DEFAULT_QUESTIONS);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [studentAnswers, setStudentAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState({});
  const [examTimeLeft, setExamTimeLeft] = useState(2700); // 45 mins in seconds
  const [isExamRunning, setIsExamRunning] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(null);

  // Sync candidate updates
  useEffect(() => {
    if (candidate) {
      setStudent(prev => ({
        ...prev,
        name: candidate.name || prev.name,
        email: candidate.email || prev.email,
        rollNo: candidate.roll || prev.rollNo
      }));
    }
  }, [candidate]);

  // Persist student state changes
  useEffect(() => {
    try {
      localStorage.setItem('iitkgp_erp_student', JSON.stringify(student));
    } catch (e) {}
  }, [student]);

  // Exam Countdown Timer
  useEffect(() => {
    let timer = null;
    if (isExamRunning && examTimeLeft > 0) {
      timer = setInterval(() => {
        setExamTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleAutoSubmitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isExamRunning, examTimeLeft]);

  // Format Timer MM:SS
  const formatTimer = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Video progress updater
  const handleUpdateWatchProgress = (pct) => {
    setVideoProgress(pct);
    if (!activeVideo) return;
    
    // Update courses state
    setCourses(prev => prev.map(c => {
      if (c.id !== selectedCourse.id) return c;
      const updatedModules = c.modules.map(m => ({
        ...m,
        contents: m.contents.map(cnt => cnt.id === activeVideo.id ? { ...cnt, watched_percentage: pct, is_completed: pct >= 90 } : cnt)
      }));
      return { ...c, modules: updatedModules };
    }));
  };

  // Process Mock Payment
  const handleProcessMockPayment = async () => {
    setIsProcessingPayment(true);
    await new Promise(r => setTimeout(r, 1400));
    
    const utr = `SBI${Math.floor(100000000000 + Math.random() * 900000000000)}`;
    const newReceipt = {
      transaction_ref: utr,
      amount: student.category === 'GEN' ? 3000.00 : 1500.00,
      gateway: selectedGateway === 'Razorpay' ? 'Razorpay Secure' : 'SBI MOPS Government Gateway',
      payment_method: selectedMethod === 'UPI' ? 'UPI (Google Pay / PhonePe QR)' : 'Net Banking (SBI)',
      bank_auth_code: `AUTH_KGP_${Math.floor(100000 + Math.random() * 900000)}`,
      student_name: student.name,
      application_no: student.applicationNo,
      paid_at: new Date().toLocaleString()
    };

    setStudent(prev => ({
      ...prev,
      feeStatus: 'success',
      feeAmount: newReceipt.amount,
      transactionRef: utr,
      paidAt: newReceipt.paid_at,
      paymentGateway: newReceipt.gateway,
      paymentMethod: newReceipt.payment_method
    }));

    setPaymentSuccessReceipt(newReceipt);
    setIsProcessingPayment(false);
    setShowPaymentModal(false);
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
  };

  // Start Assessment Exam
  const handleStartExam = () => {
    setIsExamRunning(true);
    setExamTimeLeft(2700);
    setCurrentQuestionIndex(0);
    setStudentAnswers({});
    setMarkedForReview({});
    setEvaluationResult(null);
    setActiveTab('exam');
  };

  // Submit Exam
  const handleSubmitExam = () => {
    if (!confirm('Are you sure you want to finish and submit your exam for auto-evaluation?')) return;
    executeExamGrading();
  };

  const handleAutoSubmitExam = () => {
    alert('Time limit reached! Your examination paper is automatically submitted to the auto-grading pipeline.');
    executeExamGrading();
  };

  const executeExamGrading = () => {
    let score = 0;
    let correctCount = 0;
    let wrongCount = 0;
    let unattemptedCount = 0;

    questions.forEach(q => {
      const studentAns = (studentAnswers[q.id] || '').trim().toLowerCase();
      const correctAns = (q.correct_answer || '').trim().toLowerCase();

      if (!studentAns) {
        unattemptedCount++;
      } else if (studentAns === correctAns) {
        score += q.marks;
        correctCount++;
      } else {
        score -= q.negative_marks;
        wrongCount++;
      }
    });

    const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);
    const percentage = Math.max(0, Math.round((score / totalMarks) * 100));
    const isPassed = percentage >= 40;

    const result = {
      score: Math.max(0, score),
      totalMarks,
      percentage,
      correctCount,
      wrongCount,
      unattemptedCount,
      is_passed: isPassed,
      cutoffCategory: student.category,
      cutoffThreshold: 50
    };

    setEvaluationResult(result);
    setIsExamRunning(false);

    if (isPassed) {
      confetti({ particleCount: 160, spread: 90, origin: { y: 0.5 } });
      setStudent(prev => ({ ...prev, applicationStatus: 'shortlisted' }));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-16">
      
      {/* 1. TOP INSTITUTIONAL STRIP & BREADCRUMB */}
      <div className="bg-[#800000] text-amber-50 text-[11px] px-4 sm:px-6 lg:px-8 py-2 border-b border-red-950 flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="text-amber-300 hover:text-white font-bold flex items-center gap-1.5 transition cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Main Website</span>
          </button>
          <span className="text-amber-300/40">|</span>
          <span className="font-serif font-bold text-amber-200">
            भारतीय प्रौद्योगिकी संस्थान खड़गपुर • BS STUDENT ERP &amp; LMS GATE
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="bg-emerald-950/90 text-emerald-300 border border-emerald-700/60 px-2 py-0.5 rounded font-mono font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Active Session Verified
          </span>
          <span className="text-amber-200 font-mono text-[11px] hidden sm:inline">
            TERM 1 QUALIFIER
          </span>
        </div>
      </div>

      {/* 2. STUDENT IDENTITY BAR */}
      <div className="bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            
            {/* Left: Crest & Student Details */}
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#800000] to-[#500000] text-white flex items-center justify-center font-bold text-lg shadow-sm border border-red-900 shrink-0">
                <GraduationCap className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 text-[10px] font-black rounded-md bg-red-100 text-[#800000] border border-red-200 uppercase tracking-wider">
                    BS Data Science &amp; AI
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    Roll: <strong className="text-slate-800">{student.rollNo}</strong>
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                    Category: {student.category}
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 font-serif tracking-tight">
                  BS Qualifier Student Learning &amp; Assessment Hub
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Logged in as: <strong className="text-slate-900">{student.name}</strong> ({student.email})
                </p>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2.5 self-start md:self-center">
              <button
                onClick={() => {
                  alert('Session refreshed with latest IIT Kharagpur records!');
                }}
                className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
                <span>Refresh</span>
              </button>

              <button
                onClick={onLogout || onBackToHome}
                className="px-3.5 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-[#800000] border border-red-200 text-xs font-bold flex items-center gap-1.5 transition shadow-2xs cursor-pointer"
                title="Sign Out of Student Hub"
              >
                <LogOut className="w-3.5 h-3.5 text-red-600" />
                <span>Sign Out</span>
              </button>

              <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border shadow-2xs ${
                student.applicationStatus === 'shortlisted'
                  ? 'bg-purple-50 text-purple-800 border-purple-200'
                  : student.feeStatus === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-amber-50 text-amber-800 border-amber-200'
              }`}>
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{student.applicationStatus === 'shortlisted' ? 'Qualifier Shortlisted' : 'Fee Settled (Enrolled)'}</span>
              </span>
            </div>

          </div>

          {/* Sub Navigation Tabs (From BS ERP Clone) */}
          <div className="flex items-center gap-1 overflow-x-auto mt-5 pt-2 border-t border-slate-200 no-scrollbar">
            <button
              onClick={() => setActiveTab('journey')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer ${
                activeTab === 'journey'
                  ? 'bg-[#800000] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Admission Journey</span>
            </button>

            <button
              onClick={() => setActiveTab('payment')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer ${
                activeTab === 'payment'
                  ? 'bg-[#800000] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Fee Management</span>
            </button>

            <button
              onClick={() => setActiveTab('lms')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer ${
                activeTab === 'lms'
                  ? 'bg-[#800000] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>LMS Learning Portal</span>
            </button>

            <button
              onClick={() => setActiveTab('exam')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer ${
                activeTab === 'exam'
                  ? 'bg-[#800000] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Qualifier Assessment</span>
              {isExamRunning && (
                <span className="w-2 h-2 rounded-full bg-red-400 animate-ping ml-1" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* 3. MAIN TAB CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* ================= TAB 1: ADMISSION JOURNEY TIMELINE ================= */}
        {activeTab === 'journey' && (
          <div className="space-y-6">
            
            {/* Step Timeline Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-serif">
                    IIT Kharagpur BS Program Qualifier Timeline
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Academic Cycle: 2026-TERM-1 • Official candidate milestone tracking
                  </p>
                </div>
                <span className="text-xs font-bold text-[#800000] bg-red-50 px-3 py-1 rounded-md border border-red-200 mt-2 sm:mt-0">
                  Qualifier Round In Progress
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {/* Step 1: Submit */}
                <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/50 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
                      ✓
                    </span>
                    <span className="text-[10px] font-bold uppercase text-emerald-800">Step 1</span>
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 mt-2">Dossier Submitted</h4>
                  <p className="text-[11px] text-slate-500">10+2 academic details &amp; personal profile registered</p>
                </div>

                {/* Step 2: Verification */}
                <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/50 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
                      ✓
                    </span>
                    <span className="text-[10px] font-bold uppercase text-slate-500">Step 2</span>
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 mt-2">Document Verification</h4>
                  <p className="text-[11px] text-slate-500">Aadhaar, Category &amp; Class 12 verified by Academic Cell</p>
                </div>

                {/* Step 3: Fee Payment */}
                <div className={`p-4 rounded-xl border space-y-1 ${
                  student.feeStatus === 'success'
                    ? 'border-emerald-300 bg-emerald-50/50'
                    : 'border-amber-300 bg-amber-50/50'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                      student.feeStatus === 'success' ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
                    }`}>
                      {student.feeStatus === 'success' ? '✓' : '3'}
                    </span>
                    <span className="text-[10px] font-bold uppercase text-slate-500">Step 3</span>
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 mt-2">Qualifier Fee Payment</h4>
                  <p className="text-[11px] text-slate-500">
                    {student.feeStatus === 'success' ? `₹${student.feeAmount} Paid & Settled` : 'Awaiting Payment Settlement'}
                  </p>
                </div>

                {/* Step 4: LMS Preparation */}
                <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/40 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                      4
                    </span>
                    <span className="text-[10px] font-bold uppercase text-blue-800">Step 4</span>
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 mt-2">LMS Learning</h4>
                  <p className="text-[11px] text-slate-500">
                    4 Weeks content: Python, Math, English, Stats
                  </p>
                </div>

                {/* Step 5: Qualifier Assessment */}
                <div className={`p-4 rounded-xl border space-y-1 ${
                  student.applicationStatus === 'shortlisted'
                    ? 'border-purple-300 bg-purple-50/50'
                    : 'border-slate-200 bg-slate-50'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                      student.applicationStatus === 'shortlisted' ? 'bg-purple-600 text-white' : 'bg-slate-300 text-slate-700'
                    }`}>
                      {student.applicationStatus === 'shortlisted' ? '✓' : '5'}
                    </span>
                    <span className="text-[10px] font-bold uppercase text-slate-500">Step 5</span>
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 mt-2">Cutoff Shortlisting</h4>
                  <p className="text-[11px] text-slate-500">
                    {student.applicationStatus === 'shortlisted' ? 'Qualified for BS Term 1!' : 'Diagnostic Testing Stage'}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 font-serif">
                    Access Qualifier Lectures &amp; Handouts
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Study Week 1-4 syllabus across Python, Math, English &amp; Statistics
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('lms')}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition shrink-0 cursor-pointer"
                >
                  <span>Open LMS</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 font-serif">
                    Timed Qualifier Diagnostic Test
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    45 minutes time-bound test with instant auto-grading engine
                  </p>
                </div>
                <button
                  onClick={handleStartExam}
                  className="px-4 py-2.5 rounded-xl bg-kgp-crimson hover:bg-kgp-darkred text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition shrink-0 cursor-pointer"
                >
                  <span>Start Test</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB 2: MOCK FEE MANAGEMENT ================= */}
        {activeTab === 'payment' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-5 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-serif flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-kgp-crimson" />
                    Qualifier Round Application Fee Settlement
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Official IIT Kharagpur Payment Portal (Razorpay &amp; SBI MOPS Gateway Integration)
                  </p>
                </div>

                {student.feeStatus === 'success' ? (
                  <span className="px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Payment Settled (₹{Number(student.feeAmount).toFixed(2)})</span>
                  </span>
                ) : (
                  <button
                    onClick={() => setShowPaymentModal(true)}
                    className="px-5 py-2.5 rounded-xl bg-kgp-crimson hover:bg-kgp-darkred text-white text-xs font-bold shadow-xs flex items-center gap-2 transition cursor-pointer"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Pay Qualifier Fee Now</span>
                  </button>
                )}
              </div>

              {/* Fee Breakdown Box */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] text-slate-500 font-medium">Candidate Category</span>
                  <div className="text-lg font-bold text-slate-900 mt-1">
                    {student.category}
                  </div>
                  <span className="text-[11px] text-slate-500">
                    Slab: {student.category === 'GEN' ? '₹3,000 (General / Unreserved)' : '₹1,500 (Concession)'}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] text-slate-500 font-medium">Total Amount Payable</span>
                  <div className="text-lg font-extrabold text-kgp-crimson font-mono mt-1">
                    ₹{student.category === 'GEN' ? '3,000.00' : '1,500.00'}
                  </div>
                  <span className="text-[11px] text-slate-500">Inclusive of 18% GST (CGST 9% + SGST 9%)</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] text-slate-500 font-medium">Transaction Reference</span>
                  <div className="text-xs font-mono font-bold text-slate-800 mt-2 truncate">
                    {student.transactionRef}
                  </div>
                  <span className="text-[11px] text-slate-500 block mt-1">
                    Gateway: {student.paymentGateway}
                  </span>
                </div>
              </div>

              {/* Printable Receipt Card if Paid */}
              {student.feeStatus === 'success' && (
                <div className="border border-emerald-200 rounded-2xl p-6 bg-emerald-50/40">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-sm text-emerald-900 flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-emerald-600" />
                        Official IIT Kharagpur Electronic Tax Voucher Issued
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 font-mono">
                        Ref: {student.transactionRef} • Settled via {student.paymentMethod}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Date: {student.paidAt}
                      </p>
                    </div>
                    <button
                      onClick={() => setPaymentSuccessReceipt({
                        transaction_ref: student.transactionRef,
                        amount: student.feeAmount,
                        gateway: student.paymentGateway,
                        payment_method: student.paymentMethod,
                        bank_auth_code: 'AUTH_VERIFIED_770192',
                        student_name: student.name,
                        application_no: student.applicationNo,
                        paid_at: student.paidAt
                      })}
                      className="px-4 py-2.5 rounded-xl bg-[#800000] hover:bg-kgp-darkred text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition shrink-0 cursor-pointer"
                    >
                      <Printer className="w-4 h-4" />
                      <span>View Official Tax Receipt</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 3: LMS QUALIFIER PORTAL ================= */}
        {activeTab === 'lms' && (
          <div className="space-y-6">
            
            {/* Header */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-serif flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-kgp-crimson" />
                  Qualifier Round Learning Management System (LMS)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  IIT Kharagpur BS Foundation Curriculum: Python Programming, Mathematics, Academic English, and Statistics.
                </p>
              </div>

              <div className="flex items-center gap-6 text-xs font-medium">
                <div className="text-right">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Lectures Completed</span>
                  <strong className="text-slate-900 font-mono text-sm">
                    6 / 8
                  </strong>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Engagement Score</span>
                  <strong className="text-emerald-700 font-mono text-sm">
                    78%
                  </strong>
                </div>
              </div>
            </div>

            {/* Course Selector Tabs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {courses.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedCourse(c);
                    if (c.modules?.length > 0 && c.modules[0].contents?.length > 0) {
                      setActiveVideo(c.modules[0].contents[0]);
                      setVideoProgress(c.modules[0].contents[0].watched_percentage);
                    }
                  }}
                  className={`p-4 rounded-2xl text-left border transition cursor-pointer ${
                    selectedCourse.id === c.id
                      ? 'border-kgp-crimson bg-red-50/50 shadow-xs ring-2 ring-kgp-crimson/20'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <span className="font-mono text-[10px] font-black text-kgp-crimson">
                    {c.code}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 mt-1 line-clamp-1">
                    {c.title}
                  </h4>
                  <div className="flex justify-between items-center text-[10px] text-slate-500 mt-2">
                    <span>{c.credits} Credits</span>
                    <span className="font-bold text-emerald-700">{c.progress_pct}% Done</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Video Player & Weekly Modules */}
            {selectedCourse && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left: Video Player Simulation & Handout */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-xs border border-slate-200">
                    
                    {/* Simulated Player Viewport */}
                    <div className="relative aspect-video bg-slate-950 flex flex-col items-center justify-center p-6 text-center text-white">
                      <div className="w-16 h-16 rounded-full bg-kgp-crimson/90 hover:bg-kgp-crimson text-white flex items-center justify-center cursor-pointer shadow-lg transition-transform hover:scale-105 mb-3">
                        <Play className="w-8 h-8 ml-1" />
                      </div>
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
                        {selectedCourse.code} • {activeVideo?.title || 'Qualifier Lecture Session'}
                      </span>
                      <p className="text-xs text-slate-300 max-w-md mt-1">
                        Instructor: {selectedCourse.instructor_name} ({selectedCourse.instructor_designation})
                      </p>

                      {/* Video Player Controls Simulation */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                        <div className="flex items-center justify-between text-xs mb-1 font-mono text-slate-200">
                          <span>Watch Progress: {videoProgress}%</span>
                          <span>Duration: {activeVideo?.duration_minutes || 40} mins</span>
                        </div>
                        {/* Progress slider simulation */}
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={videoProgress}
                          onChange={(e) => handleUpdateWatchProgress(parseInt(e.target.value, 10))}
                          className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-kgp-crimson"
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-white flex items-center justify-between text-xs border-t border-slate-100">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">
                          {activeVideo?.title}
                        </h4>
                        <span className="text-slate-500 text-[11px]">
                          Official IIT Kharagpur Lecture Handout Available (PDF)
                        </span>
                      </div>
                      <button
                        onClick={() => alert(`Official Lecture Handout downloaded for ${activeVideo?.title}`)}
                        className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold flex items-center gap-1.5 transition shadow-2xs cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download PDF</span>
                      </button>
                    </div>

                  </div>
                </div>

                {/* Right: Weekly Module Syllabus */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4 max-h-[500px] overflow-y-auto">
                  <h4 className="font-bold text-sm text-slate-900 font-serif">
                    Weekly Qualifier Modules
                  </h4>

                  {(selectedCourse.modules || []).map((m) => (
                    <div key={m.id} className="border border-slate-200 rounded-xl p-3.5 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-slate-900">
                          {m.title}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">{m.description}</p>

                      <div className="space-y-1.5 pt-1">
                        {(m.contents || []).map((cnt) => (
                          <div
                            key={cnt.id}
                            onClick={() => {
                              setActiveVideo(cnt);
                              setVideoProgress(cnt.watched_percentage || 0);
                            }}
                            className={`p-2 rounded-lg text-xs flex items-center justify-between cursor-pointer transition ${
                              activeVideo?.id === cnt.id
                                ? 'bg-red-50 text-kgp-crimson font-bold border border-red-200'
                                : 'hover:bg-slate-50 text-slate-700'
                            }`}
                          >
                            <span className="truncate flex-1 pr-2">{cnt.title}</span>
                            <span className="text-[10px] font-mono shrink-0">
                              {cnt.watched_percentage}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

          </div>
        )}

        {/* ================= TAB 4: QUALIFIER ASSESSMENT & EXAM ENGINE ================= */}
        {activeTab === 'exam' && (
          <div className="space-y-6">
            
            {/* If Exam is NOT running and no result: Launcher Screen */}
            {!isExamRunning && !evaluationResult && (
              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm max-w-3xl mx-auto text-center space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-red-100 text-kgp-crimson flex items-center justify-center mx-auto">
                  <GraduationCap className="w-8 h-8" />
                </div>
                
                <div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-50 text-kgp-crimson border border-red-200">
                    Proctored Diagnostic Engine
                  </span>
                  <h2 className="text-2xl font-bold font-serif-title text-slate-900 mt-2">
                    IIT Kharagpur BS Qualifier Comprehensive Examination
                  </h2>
                  <p className="text-xs text-slate-600 mt-1 max-w-lg mx-auto">
                    Mandatory assessment covering Python Programming, Mathematics for Data Science, Academic English, and Statistics.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Duration</span>
                    <div className="text-sm font-bold text-slate-900 mt-0.5">45 Minutes</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Total Marks</span>
                    <div className="text-sm font-bold text-slate-900 mt-0.5">100 Marks</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Questions</span>
                    <div className="text-sm font-bold text-slate-900 mt-0.5">{questions.length} Questions</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Passing Cutoff</span>
                    <div className="text-sm font-bold text-emerald-700 mt-0.5">40% Minimum</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-left text-xs text-amber-900 space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-amber-950">
                    <AlertCircle className="w-4 h-4 text-amber-700" />
                    Examination Instructions:
                  </div>
                  <ul className="list-disc list-inside space-y-0.5 text-amber-800 text-[11px]">
                    <li>Negative marking applies (-5.00 marks) for incorrect MCQ answers.</li>
                    <li>Numerical input questions carry no negative marking.</li>
                    <li>Timer starts immediately once you click "Begin Examination".</li>
                  </ul>
                </div>

                <button
                  onClick={handleStartExam}
                  className="px-8 py-3.5 bg-kgp-crimson hover:bg-kgp-darkred text-white font-extrabold text-sm rounded-xl shadow-md transition transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 mx-auto"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Begin Examination Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* If Exam IS Running: Live Test Viewport */}
            {isExamRunning && (
              <div className="space-y-4">
                
                {/* Exam Top Bar with Timer */}
                <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-md">
                  <div>
                    <span className="text-[10px] font-mono text-amber-300 uppercase tracking-widest">
                      Live Proctored Examination
                    </span>
                    <h3 className="text-base font-bold font-serif-title">
                      Question {currentQuestionIndex + 1} of {questions.length}
                    </h3>
                  </div>

                  {/* Countdown Timer */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-red-950 border border-red-800 text-amber-300 font-mono text-sm font-bold">
                      <Clock className="w-4 h-4 text-red-400 animate-pulse" />
                      <span>{formatTimer(examTimeLeft)}</span>
                    </div>

                    <button
                      onClick={handleSubmitExam}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition cursor-pointer"
                    >
                      Submit Exam
                    </button>
                  </div>
                </div>

                {/* Main Exam Grid: Question Area (2 cols) + Palette (1 col) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Left: Question Box */}
                  <div className="lg:col-span-2 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
                    {(() => {
                      const q = questions[currentQuestionIndex];
                      const selectedAns = studentAnswers[q.id] || '';

                      return (
                        <>
                          <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
                            <span className="font-bold text-slate-500">
                              Marks: <strong className="text-emerald-700">+{q.marks}</strong> | Negative: <strong className="text-red-700">-{q.negative_marks}</strong>
                            </span>
                            <button
                              onClick={() => setMarkedForReview(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
                              className={`px-3 py-1 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                                markedForReview[q.id]
                                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                              }`}
                            >
                              {markedForReview[q.id] ? '★ Marked for Review' : 'Mark for Review'}
                            </button>
                          </div>

                          <div className="text-sm font-medium text-slate-900 leading-relaxed">
                            {q.text}
                          </div>

                          {/* Code Snippet Display if present */}
                          {q.code_snippet && (
                            <pre className="p-4 rounded-xl bg-slate-900 text-amber-300 font-mono text-xs overflow-x-auto">
                              <code>{q.code_snippet}</code>
                            </pre>
                          )}

                          {/* Options or Numerical Input */}
                          {q.options ? (
                            <div className="space-y-2.5 pt-2">
                              {q.options.map((opt, optIdx) => (
                                <label
                                  key={optIdx}
                                  onClick={() => setStudentAnswers(prev => ({ ...prev, [q.id]: opt }))}
                                  className={`flex items-center gap-3 p-3.5 rounded-xl border text-xs cursor-pointer transition ${
                                    selectedAns === opt
                                      ? 'border-kgp-crimson bg-red-50 text-kgp-crimson font-bold shadow-2xs'
                                      : 'border-slate-200 hover:bg-slate-50 text-slate-800'
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name={`question-${q.id}`}
                                    checked={selectedAns === opt}
                                    onChange={() => {}}
                                    className="accent-kgp-crimson"
                                  />
                                  <span>{opt}</span>
                                </label>
                              ))}
                            </div>
                          ) : (
                            <div className="pt-2">
                              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                Enter Numerical Answer:
                              </label>
                              <input
                                type="text"
                                value={selectedAns}
                                onChange={(e) => setStudentAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                                placeholder="Type exact numerical value"
                                className="w-full sm:w-64 px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:outline-none focus:border-kgp-crimson"
                              />
                            </div>
                          )}

                          {/* Bottom Navigation Buttons */}
                          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                            <button
                              disabled={currentQuestionIndex === 0}
                              onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                              className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 disabled:opacity-40 transition cursor-pointer"
                            >
                              ← Previous
                            </button>

                            <button
                              onClick={() => {
                                if (currentQuestionIndex < questions.length - 1) {
                                  setCurrentQuestionIndex(prev => prev + 1);
                                } else {
                                  handleSubmitExam();
                                }
                              }}
                              className="px-5 py-2 rounded-xl bg-kgp-crimson hover:bg-kgp-darkred text-white text-xs font-bold transition shadow-xs cursor-pointer"
                            >
                              {currentQuestionIndex < questions.length - 1 ? 'Save & Next →' : 'Finish & Submit Exam'}
                            </button>
                          </div>
                        </>
                      );
                    })()}
                  </div>

                  {/* Right: Question Palette */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
                    <h4 className="font-bold text-sm text-slate-900 font-serif">
                      Question Palette
                    </h4>

                    <div className="grid grid-cols-5 gap-2">
                      {questions.map((q, idx) => {
                        const isAnswered = Boolean(studentAnswers[q.id]);
                        const isMarked = Boolean(markedForReview[q.id]);
                        const isCurrent = currentQuestionIndex === idx;

                        let colorClass = 'bg-slate-100 text-slate-700 border-slate-200';
                        if (isCurrent) colorClass = 'ring-2 ring-kgp-crimson font-bold';
                        if (isAnswered) colorClass = 'bg-emerald-600 text-white font-bold';
                        if (isMarked) colorClass = 'bg-amber-400 text-slate-950 font-bold';

                        return (
                          <button
                            key={q.id}
                            onClick={() => setCurrentQuestionIndex(idx)}
                            className={`w-9 h-9 rounded-xl text-xs flex items-center justify-center transition border ${colorClass} cursor-pointer`}
                          >
                            {idx + 1}
                          </button>
                        );
                      })}
                    </div>

                    <div className="pt-3 border-t border-slate-100 space-y-2 text-[11px] text-slate-600">
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded bg-emerald-600 inline-block" />
                        <span>Answered</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded bg-amber-400 inline-block" />
                        <span>Marked for Review</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded bg-slate-200 inline-block" />
                        <span>Unanswered</span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* If Exam Result is Ready: Scorecard */}
            {evaluationResult && (
              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm max-w-3xl mx-auto space-y-6">
                
                <div className="text-center space-y-2">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto text-white ${
                    evaluationResult.is_passed ? 'bg-emerald-600' : 'bg-red-600'
                  }`}>
                    {evaluationResult.is_passed ? <Award className="w-8 h-8" /> : <AlertCircle className="w-8 h-8" />}
                  </div>

                  <h2 className="text-2xl font-bold font-serif-title text-slate-900">
                    {evaluationResult.is_passed ? 'Congratulations! You Have Qualified!' : 'Examination Result Summary'}
                  </h2>
                  <p className="text-xs text-slate-500">
                    Official Qualifier Evaluation Report • Indian Institute of Technology Kharagpur
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Total Score</span>
                    <div className="text-xl font-black text-slate-900 mt-1 font-mono">
                      {evaluationResult.score} / {evaluationResult.totalMarks}
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Percentage</span>
                    <div className="text-xl font-black text-kgp-crimson mt-1 font-mono">
                      {evaluationResult.percentage}%
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Correct Answers</span>
                    <div className="text-xl font-black text-emerald-700 mt-1 font-mono">
                      {evaluationResult.correctCount}
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Result Status</span>
                    <div className={`text-base font-black mt-1 uppercase ${
                      evaluationResult.is_passed ? 'text-emerald-700' : 'text-red-700'
                    }`}>
                      {evaluationResult.is_passed ? 'QUALIFIED' : 'NOT QUALIFIED'}
                    </div>
                  </div>
                </div>

                {evaluationResult.is_passed && (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 space-y-1">
                    <div className="font-bold flex items-center gap-1.5 text-emerald-950">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Admission Offer Confirmed:
                    </div>
                    <p className="text-emerald-800 text-[11px] leading-relaxed">
                      You have met the required institutional cutoff for the BS in Data Science &amp; Artificial Intelligence program. Your provisional offer letter has been queued for dispatch.
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setActiveTab('journey')}
                    className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer"
                  >
                    Return to Admission Journey
                  </button>

                  <button
                    onClick={handleStartExam}
                    className="px-6 py-2.5 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs rounded-xl border border-slate-300 shadow-2xs transition cursor-pointer"
                  >
                    Retake Practice Test
                  </button>
                </div>

              </div>
            )}

          </div>
        )}

      </main>

      {/* PAYMENT MODAL (Simulated Razorpay / SBI MOPS Gateway) */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            <div className="bg-gradient-to-r from-[#800000] to-kgp-darkred text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-amber-300 uppercase tracking-widest">
                  Official Checkout Gateway
                </span>
                <h3 className="text-base font-bold font-serif-title">
                  Fee Payment: ₹{student.category === 'GEN' ? '3,000.00' : '1,500.00'}
                </h3>
              </div>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              
              {/* Select Gateway */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  Select Banking Gateway
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSelectedGateway('Razorpay')}
                    className={`p-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                      selectedGateway === 'Razorpay'
                        ? 'border-kgp-crimson bg-red-50 text-kgp-crimson shadow-2xs'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <Building className="w-4 h-4" />
                    <span>Razorpay Secure</span>
                  </button>

                  <button
                    onClick={() => setSelectedGateway('SBI_MOPS')}
                    className={`p-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                      selectedGateway === 'SBI_MOPS'
                        ? 'border-kgp-crimson bg-red-50 text-kgp-crimson shadow-2xs'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <Building className="w-4 h-4" />
                    <span>SBI MOPS Gateway</span>
                  </button>
                </div>
              </div>

              {/* Select Payment Method */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  Payment Mode
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSelectedMethod('UPI')}
                    className={`p-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                      selectedMethod === 'UPI'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-800 shadow-2xs'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <QrCode className="w-4 h-4" />
                    <span>UPI QR / VPA</span>
                  </button>

                  <button
                    onClick={() => setSelectedMethod('NetBanking')}
                    className={`p-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                      selectedMethod === 'NetBanking'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-800 shadow-2xs'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Net Banking / Card</span>
                  </button>
                </div>
              </div>

              {/* Mock QR / Card preview */}
              {selectedMethod === 'UPI' ? (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
                  <div className="w-28 h-28 mx-auto bg-white p-2 rounded-xl shadow-xs border border-slate-300 flex items-center justify-center">
                    <QrCode className="w-24 h-24 text-slate-900" />
                  </div>
                  <div className="text-[11px] font-mono font-bold text-slate-700">
                    UPI ID: iitkgp.bs.admissions@sbi
                  </div>
                  <p className="text-[10px] text-slate-500">
                    Scan via PhonePe, Google Pay, Paytm or any BHIM UPI app
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <div className="font-bold text-slate-800">State Bank of India Online Clearing</div>
                  <p className="text-[11px] text-slate-500">
                    Redirects to secure 256-bit encrypted SBI corporate payment gateway.
                  </p>
                </div>
              )}

              {/* Pay Button */}
              <button
                disabled={isProcessingPayment}
                onClick={handleProcessMockPayment}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessingPayment ? (
                  <span>Processing Payment Settlement...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-amber-300" />
                    <span>Simulate Instant Payment (₹{student.category === 'GEN' ? '3,000.00' : '1,500.00'})</span>
                  </>
                )}
              </button>

            </div>

          </div>
        </div>
      )}

      {/* OFFICIAL PRINTABLE TAX RECEIPT MODAL */}
      {paymentSuccessReceipt && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl border border-slate-300 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img src={iitKgpLogo} alt="IIT KGP" className="w-8 h-8 object-contain" />
                <div>
                  <h3 className="text-sm font-bold font-serif-title">
                    IIT Kharagpur Electronic Payment Voucher
                  </h3>
                  <p className="text-[10px] text-slate-400 font-mono">
                    Official Fee Receipt • 2026-TERM-1
                  </p>
                </div>
              </div>
              <button
                onClick={() => setPaymentSuccessReceipt(null)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-2 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-500">Transaction Ref:</span>
                  <strong className="text-slate-900">{paymentSuccessReceipt.transaction_ref}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Candidate Name:</span>
                  <strong className="text-slate-900">{paymentSuccessReceipt.student_name}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Application No:</span>
                  <strong className="text-slate-900">{paymentSuccessReceipt.application_no}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Payment Gateway:</span>
                  <strong className="text-slate-900">{paymentSuccessReceipt.gateway}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Settled Via:</span>
                  <strong className="text-slate-900">{paymentSuccessReceipt.payment_method}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Settlement Date:</span>
                  <strong className="text-slate-900">{paymentSuccessReceipt.paid_at}</strong>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-bold text-kgp-crimson">
                  <span>Total Amount Paid:</span>
                  <span>₹{Number(paymentSuccessReceipt.amount).toFixed(2)}</span>
                </div>
              </div>

              <div className="text-[10px] text-slate-500 text-center italic">
                This is a computer-generated tax invoice and requires no physical signature under IIT Kharagpur ERP norms.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt</span>
                </button>
                <button
                  onClick={() => setPaymentSuccessReceipt(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
