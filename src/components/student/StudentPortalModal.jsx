import React, { useState } from 'react';
import { 
  X, User, BookOpen, FileText, CheckCircle2, Award, Download, 
  Layers, CreditCard, ChevronRight, PieChart, BarChart3, HelpCircle, 
  ExternalLink, Calendar, Printer 
} from 'lucide-react';
import { SAMPLE_STUDENT, IIT_KGP_INFO } from '../../data/portalData';

export default function StudentPortalModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedSubject, setSelectedSubject] = useState(1);
  const [selectedAssignment, setSelectedAssignment] = useState(1);
  const [showAdmitPrint, setShowAdmitPrint] = useState(false);

  if (!isOpen) return null;

  const subjects = [
    { id: 1, name: "Mathematics for Data Science I", code: "BS101", faculty: "Prof. S. Sengupta" },
    { id: 2, name: "Statistics for Data Science I", code: "BS102", faculty: "Prof. D. Roy" },
    { id: 3, name: "Computational Thinking", code: "BS103", faculty: "Prof. A. Mukherjee" },
    { id: 4, name: "Programming in Python", code: "BS104", faculty: "Prof. P. Das" }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-300">
        
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-kgp-navy to-slate-900 text-white p-4 sm:p-5 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-kgp-crimson border border-amber-400 flex items-center justify-center font-bold text-amber-400">
              IIT
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold font-serif-title text-white">
                  Student Portal | BS Programme IIT Kharagpur
                </h3>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/40">
                  Enrolled Active
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Logged in as: <strong className="text-white">{SAMPLE_STUDENT.name}</strong> (Roll: {SAMPLE_STUDENT.rollNo})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body with Sidebar + Main Content */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 bg-slate-50 border-r border-slate-200 p-3 space-y-1 flex-shrink-0 overflow-y-auto text-xs font-medium">
            <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Academic Portal
            </div>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between transition ${
                activeTab === 'dashboard' ? 'bg-kgp-crimson text-white font-bold shadow' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <PieChart className="w-4 h-4" />
                <span>Dashboard & Venn Diagrams</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('courses')}
              className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between transition ${
                activeTab === 'courses' ? 'bg-kgp-crimson text-white font-bold shadow' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>Subjects 1 - 4 Courses</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('results')}
              className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between transition ${
                activeTab === 'results' ? 'bg-kgp-crimson text-white font-bold shadow' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                <span>Results & Qualifier Sheet</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('admit')}
              className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between transition ${
                activeTab === 'admit' ? 'bg-kgp-crimson text-white font-bold shadow' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>Admit Card & Permission</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('certificates')}
              className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between transition ${
                activeTab === 'certificates' ? 'bg-kgp-crimson text-white font-bold shadow' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>Download Certificates</span>
              </div>
            </button>

            <div className="px-3 pt-3 pb-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Account & Finance
            </div>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between transition ${
                activeTab === 'profile' ? 'bg-kgp-crimson text-white font-bold shadow' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Profile & Admission Status</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('payment')}
              className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between transition ${
                activeTab === 'payment' ? 'bg-kgp-crimson text-white font-bold shadow' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                <span>Passbook & Payment Ledger</span>
              </div>
            </button>
          </div>

          {/* Main Display Area */}
          <div className="flex-1 p-5 sm:p-7 overflow-y-auto bg-white">
            
            {/* TAB 1: DASHBOARD & VENN DIAGRAMS */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 font-serif-title">
                      Academic Progression Dashboard
                    </h4>
                    <p className="text-xs text-slate-500">
                      Venn diagrams representing course completion and cumulative score distribution.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="bg-amber-100 text-amber-900 font-bold px-3 py-1 rounded-full">
                      CGPA: {SAMPLE_STUDENT.cgpa} / 10.0
                    </span>
                    <span className="bg-blue-100 text-blue-900 font-bold px-3 py-1 rounded-full">
                      {SAMPLE_STUDENT.creditsEarned} Credits Earned
                    </span>
                  </div>
                </div>

                {/* Venn Diagrams Specified in User Block Diagram */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Venn Diagram 1: Course Follow-up Venn Diagram */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="text-sm font-bold text-slate-800">
                        Course Follow-up (Venn Diagram)
                      </h5>
                      <span className="text-[10px] text-slate-500 uppercase font-mono">Cohorts: 2026</span>
                    </div>
                    <p className="text-xs text-slate-500 mb-4">
                      Overlap between Lectures Attended, Code Practiced, and Assignments Submitted.
                    </p>

                    {/* SVG Venn Diagram Graphic */}
                    <div className="relative w-full h-56 flex items-center justify-center bg-white rounded-xl border border-slate-200 p-2">
                      <svg viewBox="0 0 400 240" className="w-full h-full">
                        {/* Circle 1: Lectures Attended */}
                        <circle cx="160" cy="110" r="75" fill="#3B82F6" fillOpacity="0.35" stroke="#2563EB" strokeWidth="2" />
                        {/* Circle 2: Assignments Submitted */}
                        <circle cx="240" cy="110" r="75" fill="#10B981" fillOpacity="0.35" stroke="#059669" strokeWidth="2" />
                        {/* Circle 3: Lab Practices */}
                        <circle cx="200" cy="160" r="60" fill="#F59E0B" fillOpacity="0.35" stroke="#D97706" strokeWidth="2" />

                        {/* Labels */}
                        <text x="120" y="80" fontSize="11" fontWeight="bold" fill="#1E3A8A">Lectures (96%)</text>
                        <text x="250" y="80" fontSize="11" fontWeight="bold" fill="#064E3B">Assignments (94%)</text>
                        <text x="200" y="210" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#78350F">Labs (91%)</text>
                        
                        {/* Center Overlap */}
                        <text x="200" y="125" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1E1B4B">Core 92%</text>
                        <text x="200" y="140" textAnchor="middle" fontSize="9" fill="#475569">Mastery</text>
                      </svg>
                    </div>

                    <div className="mt-3 flex items-center justify-center gap-4 text-[11px] text-slate-600">
                      <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-blue-500/50 inline-block"/> Lectures</span>
                      <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-emerald-500/50 inline-block"/> Assignments</span>
                      <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-amber-500/50 inline-block"/> Hands-on Labs</span>
                    </div>
                  </div>

                  {/* Venn Diagram 2: Total Marks Venn Diagram */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="text-sm font-bold text-slate-800">
                        Total Marks & Cut-off (Venn Diagram)
                      </h5>
                      <span className="text-[10px] text-emerald-700 bg-emerald-100 font-bold px-2 py-0.5 rounded">
                        Qualified
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mb-4">
                      Overlap of Continuous Assessments, Proctored Quizzes, and Qualifier Passing Threshold.
                    </p>

                    {/* SVG Venn Diagram Graphic */}
                    <div className="relative w-full h-56 flex items-center justify-center bg-white rounded-xl border border-slate-200 p-2">
                      <svg viewBox="0 0 400 240" className="w-full h-full">
                        {/* Circle 1: Continuous Assessment */}
                        <circle cx="160" cy="115" r="70" fill="#8B5CF6" fillOpacity="0.35" stroke="#7C3AED" strokeWidth="2" />
                        {/* Circle 2: Invigilated Quiz */}
                        <circle cx="240" cy="115" r="70" fill="#EC4899" fillOpacity="0.35" stroke="#DB2777" strokeWidth="2" />
                        {/* Passing Cutoff Region */}
                        <ellipse cx="200" cy="115" rx="42" ry="55" fill="#10B981" fillOpacity="0.25" stroke="#059669" strokeWidth="2" strokeDasharray="4 2" />

                        <text x="120" y="85" fontSize="11" fontWeight="bold" fill="#4C1D95">Assignment (93%)</text>
                        <text x="245" y="85" fontSize="11" fontWeight="bold" fill="#831843">Proctored Quiz (92%)</text>
                        <text x="200" y="115" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#064E3B">Pass</text>
                        <text x="200" y="132" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#047857">Cutoff &gt; 40%</text>
                      </svg>
                    </div>

                    <div className="mt-3 flex items-center justify-center gap-4 text-[11px] text-slate-600">
                      <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-purple-500/50 inline-block"/> Assignment</span>
                      <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-pink-500/50 inline-block"/> Proctored Exam</span>
                      <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-emerald-500/50 inline-block"/> Passing Cutoff</span>
                    </div>
                  </div>

                </div>

                {/* Enrolled Courses Summary */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                  <h5 className="text-sm font-bold text-slate-900 mb-3">Active Registered Term Courses</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {SAMPLE_STUDENT.courses.map((c, i) => (
                      <div key={i} className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs">
                        <div className="text-[10px] font-mono text-kgp-crimson font-bold">{c.code}</div>
                        <div className="font-bold text-slate-800 mt-1 line-clamp-1">{c.name}</div>
                        <div className="mt-2 flex items-center justify-between text-[11px]">
                          <span className="text-slate-500">Average:</span>
                          <span className="font-bold text-emerald-700">{c.score}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: SUBJECTS 1 TO 4 COURSE LINKS */}
            {activeTab === 'courses' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-slate-900 font-serif-title">
                    Course Links, Weekly Assignments & Solutions
                  </h4>
                  <p className="text-xs text-slate-500">
                    Subject 1 to Subject 4 coursework, assignment submissions, answer keys & queries.
                  </p>
                </div>

                {/* Subject Selector Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {subjects.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => setSelectedSubject(sub.id)}
                      className={`p-3 rounded-xl text-left border transition ${
                        selectedSubject === sub.id
                          ? 'bg-kgp-crimson text-white border-kgp-crimson shadow-md'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                      }`}
                    >
                      <div className="text-[10px] uppercase font-mono opacity-80">Subject {sub.id}</div>
                      <div className="text-xs font-bold truncate mt-0.5">{sub.name}</div>
                    </button>
                  ))}
                </div>

                {/* Selected Subject Content */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 mb-6">
                    <div>
                      <span className="text-[10px] bg-red-100 text-kgp-crimson font-bold px-2 py-0.5 rounded">
                        {subjects[selectedSubject - 1].code}
                      </span>
                      <h5 className="text-base font-bold text-slate-900 mt-1">
                        {subjects[selectedSubject - 1].name}
                      </h5>
                      <span className="text-xs text-slate-500">Instructor: {subjects[selectedSubject - 1].faculty}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href="#lecture"
                        onClick={(e) => { e.preventDefault(); alert("Opening Official IIT Kharagpur Lecture Streaming Portal..."); }}
                        className="px-3.5 py-2 bg-kgp-crimson text-white font-bold text-xs rounded-xl shadow hover:bg-kgp-darkred transition flex items-center gap-1.5"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Lecture Links</span>
                      </a>
                    </div>
                  </div>

                  {/* Assignment 1 to 4 Selection */}
                  <div className="mb-6">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Select Week-wise Assignment
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[1, 2, 3, 4].map((aNum) => (
                        <button
                          key={aNum}
                          onClick={() => setSelectedAssignment(aNum)}
                          className={`py-2 rounded-lg text-xs font-bold transition text-center border ${
                            selectedAssignment === aNum
                              ? 'bg-slate-900 text-amber-400 border-slate-900 shadow'
                              : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-300'
                          }`}
                        >
                          Assignment {aNum}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Assignment Details Box (Solutions & Q&A) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Solution Download Box */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-800">
                          Solution {selectedAssignment} (Official Key)
                        </span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                          Published
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mb-4">
                        Step-by-step mathematical proofs and python script answers for Assignment {selectedAssignment}.
                      </p>
                      <button
                        onClick={() => alert(`Downloading official Solution ${selectedAssignment} PDF...`)}
                        className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-lg transition flex items-center justify-center gap-1.5 border border-slate-300"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Solution {selectedAssignment} PDF</span>
                      </button>
                    </div>

                    {/* Queries & Answers (Discussion Forum) */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-800">
                          Queries & Answers (Assignment {selectedAssignment})
                        </span>
                        <span className="text-[10px] text-blue-700 bg-blue-100 font-bold px-2 py-0.5 rounded">
                          3 TAs Online
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mb-4">
                        Interactive discussion forum with course teaching assistants and professors.
                      </p>
                      <button
                        onClick={() => alert(`Opening Doubt Forum for Assignment ${selectedAssignment}...`)}
                        className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-800 font-bold text-xs rounded-lg transition flex items-center justify-center gap-1.5 border border-blue-200"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>View Discussion Thread & Ask TA</span>
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            )}

            {/* TAB 3: RESULTS & QUALIFIER MARKSHEET */}
            {activeTab === 'results' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-slate-900 font-serif-title">
                    Examination Results & Qualifier Marksheet
                  </h4>
                  <p className="text-xs text-slate-500">
                    Subject-wise weekly assignment scores, final totals, cut-off percentages, and qualifier marksheet.
                  </p>
                </div>

                {/* Subject-wise Weekly Assignment Marks Table */}
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="bg-slate-100 px-5 py-3 border-b border-slate-200 font-bold text-xs text-slate-800 uppercase tracking-wider">
                    Continuous Weekly Evaluation (Weeks 1 - 4)
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                        <tr>
                          <th className="px-4 py-3">Subject Name</th>
                          <th className="px-3 py-3 text-center">Assign 1 (100)</th>
                          <th className="px-3 py-3 text-center">Assign 2 (100)</th>
                          <th className="px-3 py-3 text-center">Assign 3 (100)</th>
                          <th className="px-3 py-3 text-center">Assign 4 (100)</th>
                          <th className="px-4 py-3 text-right">Aggregate Total</th>
                          <th className="px-4 py-3 text-center">Cut-off Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium">
                        {SAMPLE_STUDENT.courses.map((c, i) => (
                          <tr key={i} className="hover:bg-slate-50">
                            <td className="px-4 py-3 font-bold text-slate-900">
                              <span className="text-kgp-crimson font-mono mr-1">{c.code}</span> {c.name}
                            </td>
                            <td className="px-3 py-3 text-center">{c.weekMarks[0]}</td>
                            <td className="px-3 py-3 text-center">{c.weekMarks[1]}</td>
                            <td className="px-3 py-3 text-center">{c.weekMarks[2]}</td>
                            <td className="px-3 py-3 text-center">{c.weekMarks[3]}</td>
                            <td className="px-4 py-3 text-right font-bold text-slate-900">{c.score}%</td>
                            <td className="px-4 py-3 text-center">
                              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                                Above Cutoff (&gt;40%)
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Qualifier Examination Marksheet */}
                <div className="bg-gradient-to-br from-slate-900 to-kgp-navy text-white rounded-2xl p-6 shadow-md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-700">
                    <div>
                      <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                        Official Assessment Record
                      </div>
                      <h5 className="text-lg font-bold font-serif-title text-white">
                        Qualifier Examination Official Marksheet
                      </h5>
                    </div>
                    <div className="text-left sm:text-right">
                      <div className="text-xs text-slate-300">Attempt: <strong>1st Attempt</strong></div>
                      <div className="text-sm font-bold text-emerald-400">Result: PASSED (92.5%)</div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                    <div className="bg-white/10 p-3 rounded-xl">
                      <div className="text-slate-400">Total Marks Scored</div>
                      <div className="text-lg font-bold text-amber-300 mt-1">370 / 400</div>
                    </div>
                    <div className="bg-white/10 p-3 rounded-xl">
                      <div className="text-slate-400">Cut-off Requirement</div>
                      <div className="text-lg font-bold text-white mt-1">40.0% Minimum</div>
                    </div>
                    <div className="bg-white/10 p-3 rounded-xl">
                      <div className="text-slate-400">Degree Eligibility</div>
                      <div className="text-lg font-bold text-emerald-400 mt-1">Eligible for Foundation</div>
                    </div>
                    <div className="bg-white/10 p-3 rounded-xl">
                      <div className="text-slate-400">Retest Status</div>
                      <div className="text-lg font-bold text-slate-300 mt-1">Not Required</div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      onClick={() => alert("Downloading official Digitally Signed Marksheet PDF...")}
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-kgp-darknavy font-bold text-xs rounded-xl shadow transition flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Qualifier Marksheet PDF</span>
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 4: ADMIT CARD */}
            {activeTab === 'admit' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 font-serif-title">
                      Admit Card & Exam Center Permission
                    </h4>
                    <p className="text-xs text-slate-500">
                      In-Person Invigilated Examination Hall Ticket.
                    </p>
                  </div>
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 bg-kgp-crimson text-white font-bold text-xs rounded-xl shadow hover:bg-kgp-darkred transition flex items-center gap-2"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print / Save Admit Card</span>
                  </button>
                </div>

                {/* Authentic Printable Admit Card Container */}
                <div className="bg-white border-2 border-slate-400 rounded-2xl p-6 sm:p-8 shadow-md">
                  
                  {/* Admit Header */}
                  <div className="text-center pb-5 border-b-2 border-slate-300">
                    <div className="text-xs font-bold text-kgp-crimson tracking-wider uppercase">
                      {IIT_KGP_INFO.hindiName}
                    </div>
                    <h3 className="text-lg sm:text-xl font-extrabold font-serif-title text-slate-900">
                      {IIT_KGP_INFO.name}
                    </h3>
                    <div className="text-xs font-bold text-slate-700 mt-1">
                      BS IN DATA SCIENCE & AI — ADMIT CARD / HALL TICKET 2026
                    </div>
                    <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">
                      Permission Granted by Registrar & Controller of Examinations
                    </div>
                  </div>

                  {/* Candidate Details Grid */}
                  <div className="py-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs border-b border-slate-200">
                    <div className="space-y-1.5">
                      <div><span className="text-slate-500">Candidate Name:</span> <strong className="text-slate-900">{SAMPLE_STUDENT.name}</strong></div>
                      <div><span className="text-slate-500">Roll Number:</span> <strong className="text-kgp-crimson font-mono">{SAMPLE_STUDENT.rollNo}</strong></div>
                      <div><span className="text-slate-500">Admission Mode:</span> <strong>WBJEE Direct / Qualifier</strong></div>
                    </div>
                    <div className="space-y-1.5">
                      <div><span className="text-slate-500">Exam Date:</span> <strong>15 November 2026 (Sunday)</strong></div>
                      <div><span className="text-slate-500">Shift / Time:</span> <strong>Morning Shift (10:00 AM – 1:00 PM IST)</strong></div>
                      <div><span className="text-slate-500">Reporting Time:</span> <strong>09:00 AM Sharp</strong></div>
                    </div>
                    <div className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <div className="text-slate-500 text-[10px] uppercase font-bold">Allotted Test Center:</div>
                      <div className="font-bold text-slate-900">Kolkata Science City Auditorium Complex (Center Code: WB-KOL-04)</div>
                      <div className="text-slate-600 text-[11px]">J.B.S. Haldane Avenue, Kolkata - 700046</div>
                    </div>
                  </div>

                  {/* Exam Instructions */}
                  <div className="pt-4 text-xs text-slate-600 space-y-1.5">
                    <h6 className="font-bold text-slate-900 uppercase tracking-wider text-[10px]">
                      Mandatory Exam Day Instructions:
                    </h6>
                    <p>1. Carry this printed Admit Card along with original Government ID (Aadhaar / Voter ID / Passport).</p>
                    <p>2. Electronic calculators, mobile devices, and study sheets are strictly prohibited.</p>
                    <p>3. Biometric fingerprint scan and digital photo verification will be conducted at entry.</p>
                  </div>

                </div>
              </div>
            )}

            {/* TAB 5: CERTIFICATES DOWNLOAD */}
            {activeTab === 'certificates' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-slate-900 font-serif-title">
                    Download Accredited Certificates
                  </h4>
                  <p className="text-xs text-slate-500">
                    Digitally verifiable certificates for Foundation, Diploma, B.Sc. and BS Degree levels.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Foundation Certificate */}
                  <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                        Level 1 Completed
                      </span>
                      <Award className="w-5 h-5 text-blue-600" />
                    </div>
                    <h5 className="font-bold text-slate-900 text-sm">Foundation Certificate in Programming</h5>
                    <p className="text-xs text-slate-500">Awarded on completing 32 credits in core mathematics & programming.</p>
                    <button
                      onClick={() => alert("Downloading official Foundation Certificate PDF with IIT KGP Seal...")}
                      className="w-full py-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Foundation Certificate</span>
                    </button>
                  </div>

                  {/* Diploma Certificate */}
                  <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                        Level 2 Completed
                      </span>
                      <Award className="w-5 h-5 text-emerald-600" />
                    </div>
                    <h5 className="font-bold text-slate-900 text-sm">Diploma in Programming & Data Science</h5>
                    <p className="text-xs text-slate-500">Awarded on completing 54 credits across full-stack and ML courses.</p>
                    <button
                      onClick={() => alert("Downloading official Diploma Certificate PDF with IIT KGP Seal...")}
                      className="w-full py-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Diploma Certificate</span>
                    </button>
                  </div>

                  {/* B.Sc Certificate */}
                  <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                        Degree Level (114 Cr)
                      </span>
                      <Award className="w-5 h-5 text-amber-600" />
                    </div>
                    <h5 className="font-bold text-slate-900 text-sm">B.Sc. Degree in Data Science & Applications</h5>
                    <p className="text-xs text-slate-500">Official Bachelor Degree eligible for UPSC, GATE and Masters programs.</p>
                    <button
                      onClick={() => alert("Candidate enrolled. Requires 114 credits for final issuance.")}
                      className="w-full py-2 bg-slate-200 text-slate-500 font-bold text-xs rounded-xl transition cursor-not-allowed"
                    >
                      <span>In Progress (58 / 114 Credits)</span>
                    </button>
                  </div>

                  {/* BS Degree Certificate */}
                  <div className="p-5 rounded-2xl border border-amber-300 bg-amber-50/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase bg-kgp-crimson text-white px-2 py-0.5 rounded">
                        4-Year BS Honours (142 Cr)
                      </span>
                      <Award className="w-5 h-5 text-kgp-crimson" />
                    </div>
                    <h5 className="font-bold text-slate-900 text-sm">BS in Data Science & AI (IIT Kharagpur)</h5>
                    <p className="text-xs text-slate-600">Includes 8-month research/industry thesis & full Alumni status.</p>
                    <button
                      onClick={() => alert("Candidate enrolled. Requires 142 credits for convocation degree.")}
                      className="w-full py-2 bg-slate-200 text-slate-500 font-bold text-xs rounded-xl transition cursor-not-allowed"
                    >
                      <span>In Progress (58 / 142 Credits)</span>
                    </button>
                  </div>

                </div>
              </div>
            )}

            {/* TAB 6: PROFILE DETAILS */}
            {activeTab === 'profile' && (
              <div className="space-y-6 text-xs">
                <div>
                  <h4 className="text-xl font-bold text-slate-900 font-serif-title">
                    Candidate Profile & Verified Credentials
                  </h4>
                  <p className="text-slate-500">
                    Official registration biodata verified by the IIT Kharagpur Admissions Desk.
                  </p>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <span className="text-slate-400 block font-medium">Candidate Name:</span>
                      <strong className="text-slate-900 text-sm">{SAMPLE_STUDENT.name}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Institute Roll Number:</span>
                      <strong className="text-kgp-crimson text-sm font-mono">{SAMPLE_STUDENT.rollNo}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Registered Email:</span>
                      <strong className="text-slate-900 text-sm">{SAMPLE_STUDENT.email}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Social Category:</span>
                      <strong className="text-slate-900">{SAMPLE_STUDENT.category}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Fee Waiver Applied:</span>
                      <strong className="text-emerald-700 font-bold">{SAMPLE_STUDENT.income}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Current Enrolled Level:</span>
                      <strong className="text-slate-900">{SAMPLE_STUDENT.level}</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 7: PAYMENT DETAILS & PASSBOOK */}
            {activeTab === 'payment' && (
              <div className="space-y-6 text-xs">
                <div>
                  <h4 className="text-xl font-bold text-slate-900 font-serif-title">
                    Fee Passbook & Payment Ledger
                  </h4>
                  <p className="text-slate-500">
                    Term-wise fee payments, scholarship credits, and official GST tax invoices.
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-100 text-slate-700 font-bold uppercase">
                      <tr>
                        <th className="px-4 py-3">Transaction Date</th>
                        <th className="px-4 py-3">Term / Purpose</th>
                        <th className="px-4 py-3">Gross Fee</th>
                        <th className="px-4 py-3">Scholarship</th>
                        <th className="px-4 py-3">Net Paid</th>
                        <th className="px-4 py-3 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="px-4 py-3 font-mono">12 Jan 2026</td>
                        <td className="px-4 py-3 font-bold">Term 1 Course Fee (4 Courses)</td>
                        <td className="px-4 py-3">₹16,000</td>
                        <td className="px-4 py-3 text-emerald-700 font-bold">- ₹12,000 (75% Waiver)</td>
                        <td className="px-4 py-3 font-bold text-slate-900">₹4,000</td>
                        <td className="px-4 py-3 text-center">
                          <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">
                            Confirmed
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono">18 May 2026</td>
                        <td className="px-4 py-3 font-bold">Term 2 Course Fee (4 Courses)</td>
                        <td className="px-4 py-3">₹16,000</td>
                        <td className="px-4 py-3 text-emerald-700 font-bold">- ₹12,000 (75% Waiver)</td>
                        <td className="px-4 py-3 font-bold text-slate-900">₹4,000</td>
                        <td className="px-4 py-3 text-center">
                          <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">
                            Confirmed
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
