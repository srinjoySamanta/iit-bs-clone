import React, { useState } from 'react';
import { 
  ShieldCheck, Shield, Users, UserCheck, CheckCircle2, 
  Search, RefreshCw, Key, Bell, Send, Award, FileText, 
  Filter, Check, Clock, Database, ChevronRight, Lock, 
  ExternalLink, Sparkles, AlertTriangle, Layers
} from 'lucide-react';
import { SAMPLE_ALL_STUDENTS, IIT_KGP_INFO } from '../data/portalData';

// Extended administrative applicant roster for live demonstration
const INITIAL_APPLICANTS = [
  { 
    id: "KGP-2026-0841", 
    roll: "24BS0001", 
    name: "Subhashis Roy", 
    email: "subho.roy@kgp.ac.in", 
    pathway: "Direct Entry (WBJEE Rank #412)", 
    category: "General", 
    incomeTier: "< 1 LPA (75% Waiver)", 
    status: "Verified", 
    docs: "All Verified",
    score: "WBJEE Direct"
  },
  { 
    id: "KGP-2026-0842", 
    roll: "24BS0002", 
    name: "Priyanka Sen", 
    email: "priyanka.s@kgp.ac.in", 
    pathway: "Qualifier CBT (92.5%)", 
    category: "OBC-NCL", 
    incomeTier: "1 - 5 LPA (50% Waiver)", 
    status: "Verified", 
    docs: "All Verified",
    score: "92.5 / 100"
  },
  { 
    id: "KGP-2026-0843", 
    roll: "24BS0003", 
    name: "Debojyoti Ghosh", 
    email: "debo.g@kgp.ac.in", 
    pathway: "Direct Entry (Tripura JEE Rank #84)", 
    category: "General", 
    incomeTier: "> 5 LPA (Standard)", 
    status: "Verified", 
    docs: "All Verified",
    score: "Tripura JEE Direct"
  },
  { 
    id: "KGP-2026-0844", 
    roll: "24BS0004", 
    name: "Ananya Mukherjee", 
    email: "ananya.m@kgp.ac.in", 
    pathway: "Direct Entry (JEE Advanced Rank #3842)", 
    category: "General", 
    incomeTier: "1 - 5 LPA (50% Waiver)", 
    status: "Pending Review", 
    docs: "JEE Card Uploaded",
    score: "JEE Adv Direct"
  },
  { 
    id: "KGP-2026-0845", 
    roll: "24BS0005", 
    name: "Rajesh Kumar Mandal", 
    email: "rajesh.km@kgp.ac.in", 
    pathway: "Qualifier CBT (88.0%)", 
    category: "SC", 
    incomeTier: "< 1 LPA (75% Waiver)", 
    status: "Verified", 
    docs: "All Verified",
    score: "88.0 / 100"
  },
  { 
    id: "KGP-2026-0846", 
    roll: "24BS0006", 
    name: "Tanmay Singha", 
    email: "tanmay.s@kgp.ac.in", 
    pathway: "Qualifier CBT (79.5%)", 
    category: "EWS", 
    incomeTier: "< 1 LPA (75% Waiver)", 
    status: "Pending Review", 
    docs: "Income Certificate Awaiting",
    score: "79.5 / 100"
  }
];

export default function AdminSection({ onOpenAdminModal, onOpenAdminLogin }) {
  const [activeTab, setActiveTab] = useState('roster'); // 'roster' | 'metrics' | 'cbt' | 'notices'
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPathway, setFilterPathway] = useState('ALL');
  const [applicants, setApplicants] = useState(INITIAL_APPLICANTS);
  const [broadcastNotice, setBroadcastNotice] = useState('');
  const [noticeCategory, setNoticeCategory] = useState('Admissions');
  const [recentBroadcasts, setRecentBroadcasts] = useState([
    { id: 1, title: "Direct Admission Document Verification Active for WBJEE & Tripura JEE", date: "Today", tag: "Admissions" },
    { id: 2, title: "Qualifier CBT Round 2 Mock Practice Exam Server Provisioned", date: "Yesterday", tag: "Examination" },
    { id: 3, title: "Family Income Subsidized Tuition Concessions Approved for Batch 2026", date: "22 Sep 2026", tag: "Scholarship" }
  ]);
  const [actionMessage, setActionMessage] = useState(null);

  const showNotification = (msg) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(null), 3500);
  };

  const handleToggleVerification = (roll) => {
    setApplicants(prev => prev.map(app => {
      if (app.roll === roll) {
        const newStatus = app.status === 'Verified' ? 'Pending Review' : 'Verified';
        const newDocs = newStatus === 'Verified' ? 'All Verified' : 'Awaiting Review';
        showNotification(`Application ${app.roll} status changed to ${newStatus}`);
        return { ...app, status: newStatus, docs: newDocs };
      }
      return app;
    }));
  };

  const handlePublishNotice = (e) => {
    e.preventDefault();
    if (!broadcastNotice.trim()) return;
    const newEntry = {
      id: Date.now(),
      title: broadcastNotice.trim(),
      date: "Just now",
      tag: noticeCategory
    };
    setRecentBroadcasts([newEntry, ...recentBroadcasts]);
    setBroadcastNotice('');
    showNotification("Administrative broadcast published successfully to the portal!");
  };

  const filteredApplicants = applicants.filter(app => {
    const matchesSearch = 
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.roll.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterPathway === 'ALL') return matchesSearch;
    if (filterPathway === 'QUALIFIER') return matchesSearch && app.pathway.includes('Qualifier');
    if (filterPathway === 'DIRECT') return matchesSearch && (app.pathway.includes('Direct') || app.pathway.includes('JEE') || app.pathway.includes('WBJEE'));
    if (filterPathway === 'PENDING') return matchesSearch && app.status === 'Pending Review';
    return matchesSearch;
  });

  return (
    <section id="admin" className="py-20 bg-slate-900 text-white border-y border-slate-800 relative overflow-hidden">
      
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-red-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-8 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Administrative Console &amp; Governance</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif-title tracking-tight text-white">
              Admissions, Examination &amp; Academic Administration
            </h2>
            <p className="mt-2 text-sm text-slate-300 max-w-3xl leading-relaxed">
              Official institutional governance hub for IIT Kharagpur faculty, admissions officers, and qualifier examination controllers to verify applicants, review scholarship waivers, coordinate CBT sessions, and broadcast circulars.
            </p>
          </div>

          {/* Quick Super-Admin Console Launcher */}
          <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
            <button
              onClick={onOpenAdminModal}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg transition transform hover:-translate-y-0.5"
            >
              <Key className="w-4 h-4" />
              <span>Open Full Super-Admin Modal</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </button>
            <button
              onClick={onOpenAdminLogin}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs transition"
            >
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>Dedicated Staff Login</span>
            </button>
          </div>
        </div>

        {/* Action Toast Notification */}
        {actionMessage && (
          <div className="mb-6 p-3.5 bg-emerald-950/80 border border-emerald-500/60 rounded-xl text-emerald-300 text-xs font-semibold flex items-center justify-between shadow-lg animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{actionMessage}</span>
            </div>
            <span className="text-[10px] text-emerald-400/80 uppercase tracking-wider">Live System Sync</span>
          </div>
        )}

        {/* Executive Stats Counter Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mb-8">
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3.5">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Registered</div>
            <div className="text-xl sm:text-2xl font-black text-amber-400 font-serif-title mt-1">4,892</div>
            <div className="text-[10px] text-emerald-400 mt-0.5 font-medium">↑ +142 this week</div>
          </div>
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3.5">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Qualifier CBT Slots</div>
            <div className="text-xl sm:text-2xl font-black text-white font-serif-title mt-1">3,140</div>
            <div className="text-[10px] text-slate-400 mt-0.5 font-medium">115+ Test Centers</div>
          </div>
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3.5">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Direct Pathways</div>
            <div className="text-xl sm:text-2xl font-black text-emerald-400 font-serif-title mt-1">1,752</div>
            <div className="text-[10px] text-slate-400 mt-0.5 font-medium">WBJEE / JEE / TJEE</div>
          </div>
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3.5">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Fee Waivers</div>
            <div className="text-xl sm:text-2xl font-black text-amber-300 font-serif-title mt-1">₹1.84 Cr</div>
            <div className="text-[10px] text-slate-400 mt-0.5 font-medium">Up to 75% income waiver</div>
          </div>
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3.5">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Awaiting Review</div>
            <div className="text-xl sm:text-2xl font-black text-rose-400 font-serif-title mt-1">18</div>
            <div className="text-[10px] text-rose-300 mt-0.5 font-medium">Pending verification</div>
          </div>
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3.5">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Pass Benchmark</div>
            <div className="text-xl sm:text-2xl font-black text-sky-400 font-serif-title mt-1">40.0%</div>
            <div className="text-[10px] text-slate-400 mt-0.5 font-medium">CBT Qualifier Cutoff</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('roster')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'roster' 
                ? 'bg-amber-500 text-slate-950 shadow-md' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Applicant Roster &amp; Verification</span>
          </button>

          <button
            onClick={() => setActiveTab('cbt')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'cbt' 
                ? 'bg-amber-500 text-slate-950 shadow-md' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Qualifier Exam Operations &amp; Centers</span>
          </button>

          <button
            onClick={() => setActiveTab('notices')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'notices' 
                ? 'bg-amber-500 text-slate-950 shadow-md' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Circulars &amp; Flash Broadcast</span>
          </button>
        </div>

        {/* TAB 1: APPLICANT ROSTER & VERIFICATION */}
        {activeTab === 'roster' && (
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur">
            
            {/* Table Controls: Search & Filter */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by candidate name, roll no, app ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-hidden focus:border-amber-400"
                />
              </div>

              <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1">
                  <Filter className="w-3 h-3" /> Filter:
                </span>
                {[
                  { key: 'ALL', label: 'All' },
                  { key: 'QUALIFIER', label: 'Qualifier CBT' },
                  { key: 'DIRECT', label: 'Direct Entry' },
                  { key: 'PENDING', label: 'Pending' }
                ].map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setFilterPathway(tab.key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
                      filterPathway === tab.key 
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                        : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-700">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/80 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-700">
                  <tr>
                    <th className="py-3 px-4">Applicant ID &amp; Roll</th>
                    <th className="py-3 px-4">Candidate Details</th>
                    <th className="py-3 px-4">Admission Pathway</th>
                    <th className="py-3 px-4">Fee Waiver Tier</th>
                    <th className="py-3 px-4">Document Status</th>
                    <th className="py-3 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/60 bg-slate-900/40">
                  {filteredApplicants.map(applicant => (
                    <tr key={applicant.id} className="hover:bg-slate-800/50 transition">
                      <td className="py-3.5 px-4">
                        <div className="font-mono font-bold text-amber-400">{applicant.roll}</div>
                        <div className="text-[10px] text-slate-400">{applicant.id}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white text-xs">{applicant.name}</div>
                        <div className="text-[11px] text-slate-400">{applicant.email}</div>
                        <span className="inline-block mt-0.5 px-1.5 py-0.2 rounded text-[9px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                          {applicant.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-200">{applicant.pathway}</div>
                        <div className="text-[10px] text-emerald-400 font-mono">Score/Rank: {applicant.score}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          applicant.incomeTier.includes('75%') 
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30' 
                            : applicant.incomeTier.includes('50%')
                              ? 'bg-amber-950 text-amber-300 border border-amber-500/30'
                              : 'bg-slate-800 text-slate-300'
                        }`}>
                          {applicant.incomeTier}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5">
                          {applicant.status === 'Verified' ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          ) : (
                            <Clock className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                          )}
                          <span className={applicant.status === 'Verified' ? 'text-emerald-300 font-medium' : 'text-amber-300 font-medium'}>
                            {applicant.docs}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => handleToggleVerification(applicant.roll)}
                          className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition flex items-center gap-1 mx-auto ${
                            applicant.status === 'Verified'
                              ? 'bg-emerald-500/20 text-emerald-300 hover:bg-rose-500/20 hover:text-rose-300 border border-emerald-500/40'
                              : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow'
                          }`}
                        >
                          {applicant.status === 'Verified' ? (
                            <>
                              <Check className="w-3 h-3" />
                              <span>Verified ✓</span>
                            </>
                          ) : (
                            <>
                              <ShieldCheck className="w-3 h-3" />
                              <span>Approve</span>
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
              <div>
                Showing {filteredApplicants.length} of {applicants.length} registered candidate records
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live connected to Admissions Verification Server</span>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: QUALIFIER CBT OPERATIONS */}
        {activeTab === 'cbt' && (
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* CBT Centers & Proctored Sessions */}
              <div className="bg-slate-900/80 border border-slate-700/80 rounded-xl p-5">
                <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2 mb-4 font-serif-title">
                  <Database className="w-4 h-4" />
                  <span>115+ Pan-India CBT Examination Centers</span>
                </h4>
                
                <div className="space-y-3">
                  {[
                    { city: "Kharagpur Campus (Main)", code: "WB-KGP-01", slots: "600 / 600 Filled", status: "Active & Monitored", isLive: true },
                    { city: "Kolkata (Salt Lake & Park Circus)", code: "WB-KOL-02", slots: "1,200 / 1,200 Filled", status: "Active & Monitored", isLive: true },
                    { city: "Siliguri & Jalpaiguri Centers", code: "WB-SLG-03", slots: "400 / 450", status: "Slots Available", isLive: true },
                    { city: "New Delhi (NCR Proctored Lab)", code: "DL-DEL-01", slots: "800 / 800 Filled", status: "Active & Monitored", isLive: true },
                    { city: "Bengaluru (Electronic City Lab)", code: "KA-BLR-01", slots: "500 / 500 Filled", status: "Active & Monitored", isLive: true }
                  ].map((center, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-slate-800 border border-slate-700 text-xs">
                      <div>
                        <div className="font-bold text-white">{center.city}</div>
                        <div className="text-[10px] text-slate-400 font-mono">Code: {center.code} • Capacity: {center.slots}</div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        {center.status}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Total Proctored Network Readiness:</span>
                  <span className="text-xs font-bold text-emerald-400">100% Online</span>
                </div>
              </div>

              {/* Exam Rules & Cutoff Engine */}
              <div className="bg-slate-900/80 border border-slate-700/80 rounded-xl p-5 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2 mb-4 font-serif-title">
                    <Award className="w-4 h-4" />
                    <span>Qualifier Assessment Framework &amp; Cutoffs</span>
                  </h4>

                  <div className="space-y-3.5 text-xs">
                    <div className="p-3 rounded-lg bg-slate-800/90 border border-slate-700">
                      <div className="text-[11px] text-slate-400 font-semibold mb-1">Qualifying Cutoff Criterion</div>
                      <div className="text-sm font-bold text-white flex items-center justify-between">
                        <span>Aggregate Minimum Passing Score</span>
                        <span className="text-emerald-400 font-mono text-base font-extrabold">≥ 40%</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        Candidates scoring 40% or above earn unconditional admission into the Foundation Level.
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-800/90 border border-slate-700">
                      <div className="text-[11px] text-slate-400 font-semibold mb-1">CBT Sections &amp; Marks Weightage</div>
                      <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 mt-1">
                        <div className="p-2 rounded bg-slate-950/60">
                          <span className="font-semibold text-white">Mathematics:</span> 25 Marks
                        </div>
                        <div className="p-2 rounded bg-slate-950/60">
                          <span className="font-semibold text-white">Statistics:</span> 25 Marks
                        </div>
                        <div className="p-2 rounded bg-slate-950/60">
                          <span className="font-semibold text-white">Algorithms:</span> 25 Marks
                        </div>
                        <div className="p-2 rounded bg-slate-950/60">
                          <span className="font-semibold text-white">Python Basics:</span> 25 Marks
                        </div>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-200">
                      <div className="font-bold text-xs flex items-center gap-1.5 mb-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Direct Pathway Automatic Exemption</span>
                      </div>
                      <p className="text-[10px] text-emerald-300/90 leading-relaxed">
                        Holders of valid ranks in WBJEE, JEE Advanced, or Tripura JEE are automatically marked as "Exempt - Direct Admission" with zero qualifier test burden.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800">
                  <button
                    onClick={onOpenAdminModal}
                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold border border-amber-500/30 flex items-center justify-center gap-2 transition"
                  >
                    <span>Manage Exam Papers &amp; Question Bank in Console</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* TAB 3: CIRCULARS & FLASH BROADCAST */}
        {activeTab === 'notices' && (
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Notice Publisher */}
              <div className="bg-slate-900/80 border border-slate-700/80 rounded-xl p-5">
                <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2 mb-2 font-serif-title">
                  <Send className="w-4 h-4" />
                  <span>Publish New Institutional Circular</span>
                </h4>
                <p className="text-xs text-slate-400 mb-4">
                  Broadcast notices to the applicant dashboard, main notification ticker, and candidate login area.
                </p>

                <form onSubmit={handlePublishNotice} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Circular Category
                    </label>
                    <select
                      value={noticeCategory}
                      onChange={(e) => setNoticeCategory(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-hidden focus:border-amber-400"
                    >
                      <option value="Admissions">Admissions &amp; Eligibility</option>
                      <option value="Examination">Qualifier CBT Examination</option>
                      <option value="Scholarship">Fee Concession &amp; Scholarships</option>
                      <option value="Urgent Flash">Urgent Flash Marquee Ticker</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Circular Notice Content *
                    </label>
                    <textarea
                      rows={4}
                      value={broadcastNotice}
                      onChange={(e) => setBroadcastNotice(e.target.value)}
                      placeholder="e.g. Verification window for WBJEE & Tripura JEE candidates extended till 15 October 2026..."
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-amber-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Broadcast Circular Immediately</span>
                  </button>
                </form>
              </div>

              {/* Active Circulars Stream */}
              <div className="bg-slate-900/80 border border-slate-700/80 rounded-xl p-5 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2 mb-4 font-serif-title">
                    <FileText className="w-4 h-4" />
                    <span>Recent Administrative Circulars</span>
                  </h4>

                  <div className="space-y-3">
                    {recentBroadcasts.map(notice => (
                      <div key={notice.id} className="p-3.5 rounded-xl bg-slate-800 border border-slate-700/80 text-xs">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                            notice.tag === 'Admissions' ? 'bg-blue-900/60 text-blue-300' :
                            notice.tag === 'Examination' ? 'bg-emerald-900/60 text-emerald-300' :
                            notice.tag === 'Urgent Flash' ? 'bg-rose-900/60 text-rose-300' :
                            'bg-amber-900/60 text-amber-300'
                          }`}>
                            {notice.tag}
                          </span>
                          <span className="text-[10px] text-slate-400">{notice.date}</span>
                        </div>
                        <p className="text-xs font-semibold text-slate-200 leading-snug">
                          {notice.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Sign-off: Office of the Academic Registrar</span>
                  <span className="text-amber-400 font-mono font-semibold">IIT Kharagpur</span>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* Security & Access Notice */}
        <div className="mt-8 p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center flex-shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-200">Restricted Administration Access Protocol</div>
              <div className="text-[11px] text-slate-400">
                Authorized access for faculty, admission officers, and examination controllers. Auto-fill credentials: <code className="text-amber-400 font-mono">ADMIN-KGP-2026</code>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenAdminModal}
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
            >
              Console Modal
            </button>
            <button
              onClick={onOpenAdminLogin}
              className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition"
            >
              Full Staff Login
            </button>
          </div>
        </div>

      </div>

    </section>
  );
}
