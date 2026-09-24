import React, { useState } from 'react';
import { 
  ArrowLeft, ShieldCheck, Search, Users, CheckCircle2, 
  XCircle, Filter, Download, ExternalLink, Key, Award, 
  FileText, Check, Clock, RefreshCw, Mail, Phone, 
  ChevronRight, Lock, Eye, AlertCircle, Database, Bell
} from 'lucide-react';
import { IIT_KGP_INFO, SAMPLE_STUDENT, SAMPLE_ALL_STUDENTS, SAMPLE_QUALIFIER_CANDIDATES } from '../data/portalData';
import iitKgpLogo from '../assets/logo';

// Rich mock student data for admin inspection
const ENRICHED_STUDENTS = [
  {
    roll: "24BS0001",
    name: "Subhashis Roy",
    email: "subho.roy@kgp.ac.in",
    phone: "+91 98301 11223",
    level: "Foundation Level",
    pathway: "Direct Entry: WBJEE Rank #412",
    category: "General",
    income: "< 1 LPA (75% Fee Waiver)",
    marks: "WBJEE Direct Exempt",
    status: "Verified",
    qualifierScore: "Exempt",
    cgpa: "8.92",
    docs: {
      genInfo: "Verified",
      education: "Verified (WBJEE Rank #412)",
      photo: "Verified",
      fee: "Verified (₹375 Paid)"
    }
  },
  {
    roll: "24BS0002",
    name: "Priyanka Sen",
    email: "priyanka.s@kgp.ac.in",
    phone: "+91 98312 44556",
    level: "Diploma in Data Science & AI",
    pathway: "Qualifier CBT (Score: 92.5%)",
    category: "OBC-NCL",
    income: "1 - 5 LPA (50% Fee Waiver)",
    marks: "92.5 / 100",
    status: "Verified",
    qualifierScore: "92.5%",
    cgpa: "9.14",
    docs: {
      genInfo: "Verified",
      education: "Verified (Class 10 & 12)",
      photo: "Verified",
      fee: "Verified (₹750 Paid)"
    }
  },
  {
    roll: "24BS0003",
    name: "Debojyoti Ghosh",
    email: "debo.g@kgp.ac.in",
    phone: "+91 94330 77889",
    level: "Foundation Level",
    pathway: "Direct Entry: Tripura JEE Rank #84",
    category: "General",
    income: "> 5 LPA (Standard Fee)",
    marks: "Tripura JEE Direct Exempt",
    status: "Verified",
    qualifierScore: "Exempt",
    cgpa: "8.65",
    docs: {
      genInfo: "Verified",
      education: "Verified (Tripura JEE Card)",
      photo: "Verified",
      fee: "Verified (₹1,500 Paid)"
    }
  },
  {
    roll: "24BS0004",
    name: "Ananya Mukherjee",
    email: "ananya.m@kgp.ac.in",
    phone: "+91 98305 99001",
    level: "B.Sc. Degree Level",
    pathway: "Direct Entry: JEE Advanced Rank #3842",
    category: "General",
    income: "1 - 5 LPA (50% Fee Waiver)",
    marks: "JEE Adv Direct Exempt",
    status: "Pending Review",
    qualifierScore: "Exempt",
    cgpa: "9.30",
    docs: {
      genInfo: "Verified",
      education: "Pending (Rank Card Verification)",
      photo: "Verified",
      fee: "Verified"
    }
  },
  {
    roll: "24BS0005",
    name: "Rajesh Kumar Mandal",
    email: "rajesh.km@kgp.ac.in",
    phone: "+91 94340 22334",
    level: "Foundation Level",
    pathway: "Qualifier CBT (Score: 88.0%)",
    category: "SC",
    income: "< 1 LPA (75% Fee Waiver)",
    marks: "88.0 / 100",
    status: "Verified",
    qualifierScore: "88.0%",
    cgpa: "8.78",
    docs: {
      genInfo: "Verified",
      education: "Verified",
      photo: "Verified",
      fee: "Verified"
    }
  },
  {
    roll: "24BS0006",
    name: "Tanmay Singha",
    email: "tanmay.s@kgp.ac.in",
    phone: "+91 98320 88990",
    level: "Foundation Level",
    pathway: "Qualifier CBT (Score: 79.5%)",
    category: "EWS",
    income: "< 1 LPA (75% Fee Waiver)",
    marks: "79.5 / 100",
    status: "Pending Review",
    qualifierScore: "79.5%",
    cgpa: "8.40",
    docs: {
      genInfo: "Verified",
      education: "Verified",
      photo: "Verified",
      fee: "Pending (Income Certificate Review)"
    }
  },
  {
    roll: "24BS0007",
    name: "Sneha Chakraborty",
    email: "sneha.c@kgp.ac.in",
    phone: "+91 98315 33445",
    level: "Diploma in Programming",
    pathway: "Qualifier CBT (Score: 94.0%)",
    category: "General",
    income: "> 5 LPA (Standard Fee)",
    marks: "94.0 / 100",
    status: "Verified",
    qualifierScore: "94.0%",
    cgpa: "9.45",
    docs: {
      genInfo: "Verified",
      education: "Verified",
      photo: "Verified",
      fee: "Verified"
    }
  },
  {
    roll: "24BS0008",
    name: "Ayan Bhattacharya",
    email: "ayan.b@kgp.ac.in",
    phone: "+91 94331 66778",
    level: "4-Year BS Degree Level",
    pathway: "Direct Entry: WBJEE Rank #180",
    category: "General",
    income: "1 - 5 LPA (50% Fee Waiver)",
    marks: "WBJEE Direct Exempt",
    status: "Verified",
    qualifierScore: "Exempt",
    cgpa: "9.62",
    docs: {
      genInfo: "Verified",
      education: "Verified",
      photo: "Verified",
      fee: "Verified"
    }
  }
];

export default function AdminPortalPage({ onBackToHome, onLogout, onOpenAdminModal }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTrack, setFilterTrack] = useState('ALL');
  const [students, setStudents] = useState(ENRICHED_STUDENTS);
  const [selectedStudent, setSelectedStudent] = useState(ENRICHED_STUDENTS[0]);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleToggleDoc = (docType) => {
    if (!selectedStudent) return;
    const currentVal = selectedStudent.docs[docType];
    const newVal = currentVal.includes('Verified') ? 'Pending Review' : 'Verified';
    
    const updated = {
      ...selectedStudent,
      docs: {
        ...selectedStudent.docs,
        [docType]: newVal
      }
    };
    setSelectedStudent(updated);
    setStudents(prev => prev.map(s => s.roll === updated.roll ? updated : s));
    showToast(`Updated ${docType} status to "${newVal}" for Roll: ${updated.roll}`);
  };

  const handleToggleOverallStatus = (roll) => {
    setStudents(prev => prev.map(s => {
      if (s.roll === roll) {
        const nextStatus = s.status === 'Verified' ? 'Pending Review' : 'Verified';
        showToast(`Roll ${roll} marked as "${nextStatus}"`);
        if (selectedStudent && selectedStudent.roll === roll) {
          setSelectedStudent(prevSel => ({ ...prevSel, status: nextStatus }));
        }
        return { ...s, status: nextStatus };
      }
      return s;
    }));
  };

  const filteredStudents = students.filter(s => {
    const matchesSearch = 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.roll.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.pathway.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterTrack === 'ALL') return matchesSearch;
    if (filterTrack === 'FOUNDATION') return matchesSearch && s.level.includes('Foundation');
    if (filterTrack === 'DIPLOMA') return matchesSearch && s.level.includes('Diploma');
    if (filterTrack === 'DIRECT') return matchesSearch && (s.pathway.includes('Direct') || s.pathway.includes('WBJEE') || s.pathway.includes('JEE') || s.pathway.includes('Tripura'));
    if (filterTrack === 'WAIVER') return matchesSearch && s.income.includes('Waiver');
    if (filterTrack === 'PENDING') return matchesSearch && s.status === 'Pending Review';
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans selection:bg-amber-500 selection:text-white">
      
      {/* 1. INSTITUTIONAL TOP BAR */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur border-b border-slate-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          
          {/* Left: IIT KGP Administration Brand */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-white p-1 border border-amber-400 flex items-center justify-center overflow-hidden shadow">
              <img src={iitKgpLogo} alt="IIT Kharagpur" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                  Admin Information System
                </span>
                <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.2 rounded border border-amber-500/40">
                  Staff Access: ADMIN-KGP-2026
                </span>
              </div>
              <h1 className="text-sm sm:text-base font-bold font-serif-title text-white">
                {IIT_KGP_INFO.name} — Student Details &amp; Records Console
              </h1>
            </div>
          </div>

          {/* Right Actions: Back to Home, Super-Admin Modal & Logout */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenAdminModal}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold transition"
            >
              <Key className="w-3.5 h-3.5" />
              <span>Full Admin Console</span>
            </button>

            <button
              onClick={onBackToHome}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Main Website</span>
            </button>

            {onLogout && (
              <button
                onClick={onLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/80 hover:bg-rose-900 border border-rose-500/40 text-rose-300 text-xs font-semibold transition"
                title="End Staff Session"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            )}
          </div>

        </div>
      </header>

      {/* 2. SUB-HEADER / NOTIFICATION TOAST */}
      {toastMessage && (
        <div className="bg-emerald-900/90 border-b border-emerald-500 text-emerald-200 text-xs py-2 px-4 text-center font-semibold shadow-inner animate-in fade-in">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* 3. MAIN DASHBOARD CONTENT */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Top Summary Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-kgp-navy to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-full bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider mb-2 border border-emerald-500/40">
                <Database className="w-3 h-3" />
                Live Candidate Roster &amp; Biodata Management
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif-title text-white">
                All Enrolled Students Database
              </h2>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Centralized examination controller and faculty dashboard to inspect complete student details, verify educational certificates, monitor WBJEE/JEE exemptions, and issue official hall passes.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-shrink-0">
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-center">
                <div className="text-[10px] uppercase font-bold text-slate-400">Total Enrolled</div>
                <div className="text-xl font-extrabold text-amber-400 font-mono mt-0.5">1,280</div>
              </div>
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-center">
                <div className="text-[10px] uppercase font-bold text-slate-400">CBT Qualified</div>
                <div className="text-xl font-extrabold text-white font-mono mt-0.5">840</div>
              </div>
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-center">
                <div className="text-[10px] uppercase font-bold text-slate-400">Direct JEE/WB</div>
                <div className="text-xl font-extrabold text-emerald-400 font-mono mt-0.5">440</div>
              </div>
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-center">
                <div className="text-[10px] uppercase font-bold text-slate-400">Fee Concessions</div>
                <div className="text-xl font-extrabold text-amber-300 font-mono mt-0.5">₹1.84 Cr</div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. MASTER WORKSPACE: TABLE (LEFT) + BIODATA INSPECTOR (RIGHT) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* COLUMN 1 & 2: MASTER STUDENT DETAILS TABLE */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Controls: Search & Category Filter */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow space-y-3">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by student name, roll no, pathway..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-amber-400"
                  />
                </div>

                <div className="text-[11px] text-slate-400 font-medium">
                  Showing <span className="font-bold text-white">{filteredStudents.length}</span> candidates
                </div>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1">
                  <Filter className="w-3 h-3" /> Filter:
                </span>
                {[
                  { key: 'ALL', label: 'All Students' },
                  { key: 'FOUNDATION', label: 'Foundation' },
                  { key: 'DIPLOMA', label: 'Diploma' },
                  { key: 'DIRECT', label: 'Direct Entry (WBJEE/JEE)' },
                  { key: 'WAIVER', label: 'Fee Waiver (< 1 LPA)' },
                  { key: 'PENDING', label: 'Pending Review' }
                ].map(pill => (
                  <button
                    key={pill.key}
                    onClick={() => setFilterTrack(pill.key)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                      filterTrack === pill.key
                        ? 'bg-amber-500 text-slate-950 shadow font-bold'
                        : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {pill.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Students Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 text-[11px] font-bold uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">Roll No.</th>
                      <th className="py-3 px-4">Student Name &amp; Contact</th>
                      <th className="py-3 px-4">Enrolled Track</th>
                      <th className="py-3 px-4">Pathway / Rank</th>
                      <th className="py-3 px-4">Fee Waiver Tier</th>
                      <th className="py-3 px-4 text-center">Status</th>
                      <th className="py-3 px-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-900/50">
                    {filteredStudents.map(student => {
                      const isSelected = selectedStudent && selectedStudent.roll === student.roll;
                      return (
                        <tr 
                          key={student.roll}
                          onClick={() => setSelectedStudent(student)}
                          className={`cursor-pointer transition ${
                            isSelected ? 'bg-amber-500/10 border-l-4 border-amber-400' : 'hover:bg-slate-800/40'
                          }`}
                        >
                          <td className="py-3.5 px-4 font-mono font-bold text-amber-400">
                            {student.roll}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-white text-xs">{student.name}</div>
                            <div className="text-[11px] text-slate-400">{student.email}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                              {student.level}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="text-slate-200 font-semibold text-[11px]">{student.pathway}</div>
                            <div className="text-[10px] text-emerald-400 font-mono">CGPA: {student.cgpa}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                              student.income.includes('75%') 
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30' 
                                : student.income.includes('50%')
                                  ? 'bg-amber-950 text-amber-300 border border-amber-500/30'
                                  : 'bg-slate-800 text-slate-300'
                            }`}>
                              {student.income}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                              student.status === 'Verified'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                            }`}>
                              {student.status === 'Verified' ? <Check className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                              <span>{student.status}</span>
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => setSelectedStudent(student)}
                              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 text-[11px] font-bold transition flex items-center gap-1 mx-auto"
                            >
                              <Eye className="w-3 h-3" />
                              <span>Inspect</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Attendance & Progression Venn Visuals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1 font-serif-title">
                  All Students' Attendance (Cohort Venn)
                </h4>
                <p className="text-[11px] text-slate-400 mb-3">Live Interactive vs Recorded Lectures vs Lab Immersion</p>
                <div className="relative w-full h-36 flex items-center justify-center bg-slate-950 rounded-xl border border-slate-800">
                  <svg viewBox="0 0 360 160" className="w-full h-full">
                    <circle cx="140" cy="80" r="50" fill="#3B82F6" fillOpacity="0.3" stroke="#3B82F6" strokeWidth="2" />
                    <circle cx="220" cy="80" r="50" fill="#10B981" fillOpacity="0.3" stroke="#10B981" strokeWidth="2" />
                    <text x="110" y="65" fontSize="10" fontWeight="bold" fill="#93C5FD">Live (68%)</text>
                    <text x="230" y="65" fontSize="10" fontWeight="bold" fill="#6EE7B7">Async (94%)</text>
                    <text x="180" y="85" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#F8FAFC">Dual 64%</text>
                  </svg>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1 font-serif-title">
                  Curriculum Track Completion (Cohort Venn)
                </h4>
                <p className="text-[11px] text-slate-400 mb-3">Programming in Python vs Statistics &amp; AI Algorithms</p>
                <div className="relative w-full h-36 flex items-center justify-center bg-slate-950 rounded-xl border border-slate-800">
                  <svg viewBox="0 0 360 160" className="w-full h-full">
                    <circle cx="140" cy="80" r="50" fill="#8B5CF6" fillOpacity="0.3" stroke="#8B5CF6" strokeWidth="2" />
                    <circle cx="220" cy="80" r="50" fill="#F59E0B" fillOpacity="0.3" stroke="#F59E0B" strokeWidth="2" />
                    <text x="105" y="65" fontSize="10" fontWeight="bold" fill="#C4B5FD">Coding (88%)</text>
                    <text x="230" y="65" fontSize="10" fontWeight="bold" fill="#FDE68A">AI Stats (82%)</text>
                    <text x="180" y="85" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#F8FAFC">Both 76%</text>
                  </svg>
                </div>
              </div>

            </div>

          </div>

          {/* COLUMN 3: SELECTED STUDENT BIODATA & VERIFICATION ACTIONS */}
          <div className="space-y-4">
            {selectedStudent ? (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl sticky top-20 space-y-5">
                
                {/* Header Profile Card */}
                <div className="pb-4 border-b border-slate-800 flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-base font-bold text-amber-400">
                        {selectedStudent.roll}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        selectedStudent.status === 'Verified' ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30' : 'bg-rose-950 text-rose-300 border border-rose-500/30'
                      }`}>
                        {selectedStudent.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white font-serif-title mt-1">
                      {selectedStudent.name}
                    </h3>
                    <div className="text-xs text-slate-400">{selectedStudent.email}</div>
                    <div className="text-xs text-slate-400">{selectedStudent.phone}</div>
                  </div>

                  <button
                    onClick={() => handleToggleOverallStatus(selectedStudent.roll)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                      selectedStudent.status === 'Verified'
                        ? 'bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border border-rose-500/40'
                        : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                    }`}
                  >
                    {selectedStudent.status === 'Verified' ? 'Flag Record' : 'Verify All'}
                  </button>
                </div>

                {/* Candidate Academic Details */}
                <div className="space-y-2.5 text-xs bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Current Track:</span>
                    <span className="font-bold text-white">{selectedStudent.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Admission Pathway:</span>
                    <span className="font-bold text-amber-300 text-right max-w-[180px]">{selectedStudent.pathway}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Category:</span>
                    <span className="font-bold text-white">{selectedStudent.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Fee Waiver Concession:</span>
                    <span className="font-bold text-emerald-400">{selectedStudent.income}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Cumulative CGPA:</span>
                    <span className="font-mono font-bold text-sky-400">{selectedStudent.cgpa} / 10.0</span>
                  </div>
                </div>

                {/* 4-Item Biodata Document Verification Checklist */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3 font-serif-title flex items-center justify-between">
                    <span>Document Verification Checklist</span>
                    <span className="text-[10px] text-slate-400 lowercase">(click to toggle)</span>
                  </h4>

                  <div className="space-y-2 text-xs">
                    
                    {/* Gen Info */}
                    <div 
                      onClick={() => handleToggleDoc('genInfo')}
                      className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 cursor-pointer flex items-center justify-between transition"
                    >
                      <div>
                        <div className="font-bold text-slate-200">1. General Information &amp; Age</div>
                        <div className="text-[10px] text-slate-400">Birth Certificate / Aadhaar OTP verified</div>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        selectedStudent.docs.genInfo.includes('Verified') ? 'bg-emerald-950 text-emerald-300' : 'bg-rose-950 text-rose-300'
                      }`}>
                        {selectedStudent.docs.genInfo}
                      </span>
                    </div>

                    {/* Education */}
                    <div 
                      onClick={() => handleToggleDoc('education')}
                      className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 cursor-pointer flex items-center justify-between transition"
                    >
                      <div>
                        <div className="font-bold text-slate-200">2. Education &amp; Rank Card</div>
                        <div className="text-[10px] text-slate-400">10+2 Marksheet / WBJEE / JEE Rank</div>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        selectedStudent.docs.education.includes('Verified') ? 'bg-emerald-950 text-emerald-300' : 'bg-rose-950 text-rose-300'
                      }`}>
                        {selectedStudent.docs.education}
                      </span>
                    </div>

                    {/* Photo & Signature */}
                    <div 
                      onClick={() => handleToggleDoc('photo')}
                      className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 cursor-pointer flex items-center justify-between transition"
                    >
                      <div>
                        <div className="font-bold text-slate-200">3. Photo &amp; Signature Clarity</div>
                        <div className="text-[10px] text-slate-400">Passport dimensions &amp; digital clarity</div>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        selectedStudent.docs.photo.includes('Verified') ? 'bg-emerald-950 text-emerald-300' : 'bg-rose-950 text-rose-300'
                      }`}>
                        {selectedStudent.docs.photo}
                      </span>
                    </div>

                    {/* Fee Payment Reconciliation */}
                    <div 
                      onClick={() => handleToggleDoc('fee')}
                      className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 cursor-pointer flex items-center justify-between transition"
                    >
                      <div>
                        <div className="font-bold text-slate-200">4. Payment &amp; Income Proof</div>
                        <div className="text-[10px] text-slate-400">Bank UTR &amp; Subsidized Income Certificate</div>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        selectedStudent.docs.fee.includes('Verified') ? 'bg-emerald-950 text-emerald-300' : 'bg-rose-950 text-rose-300'
                      }`}>
                        {selectedStudent.docs.fee}
                      </span>
                    </div>

                  </div>
                </div>

                {/* Ticket & Hall Pass Issuance */}
                <div className="pt-2 border-t border-slate-800 space-y-2">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Administrative Document Generation
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      onClick={() => showToast(`Generated Qualifier Admit Pass for Roll: ${selectedStudent.roll}`)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 text-center transition"
                    >
                      Qualifier Admit Pass
                    </button>
                    <button
                      onClick={() => showToast(`Generated Official Alumni Card for Roll: ${selectedStudent.roll}`)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 text-center transition"
                    >
                      Alumni ID Card
                    </button>
                  </div>
                </div>

                {/* System Actions */}
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                  <button
                    onClick={() => showToast(`Password reset link dispatched to ${selectedStudent.email}`)}
                    className="text-amber-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Key className="w-3 h-3" />
                    <span>Reset Password</span>
                  </button>

                  <button
                    onClick={() => showToast(`Roll ${selectedStudent.roll} permanently frozen in central IIT database.`)}
                    className="text-slate-400 hover:text-white transition text-[11px]"
                  >
                    Freeze Roll No
                  </button>
                </div>

              </div>
            ) : (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center text-slate-400">
                Select a candidate from the roster to inspect biodata details.
              </div>
            )}
          </div>

        </div>

      </main>

    </div>
  );
}
