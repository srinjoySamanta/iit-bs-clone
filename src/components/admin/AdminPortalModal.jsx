import React, { useState } from 'react';
import { 
  X, ShieldCheck, Search, Users, CheckCircle2, XCircle, Edit3, 
  Trash2, RefreshCw, Key, Award, FileText, Upload, Send, Bell, 
  Layers, PieChart, HelpCircle, Check 
} from 'lucide-react';
import { SAMPLE_ALL_STUDENTS, IIT_KGP_INFO } from '../../data/portalData';

export default function AdminPortalModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('studentProfile');
  const [searchRoll, setSearchRoll] = useState('24BS0002');
  const [doubtCounts, setDoubtCounts] = useState({ pending: 14, solved: 1842 });
  const [generatedTicketType, setGeneratedTicketType] = useState(null);

  // Status for student biodata verification
  const [biodataStatus, setBiodataStatus] = useState({
    genInfo: 'Verified',
    eduEdit: 'Verified',
    photoEdit: 'Verified',
    payEdit: 'Verified'
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-300">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-kgp-darknavy via-kgp-navy to-slate-900 text-white p-4 sm:p-5 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-kgp-darknavy flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold font-serif-title text-white">
                  Admin Console | IIT Kharagpur BS Management System
                </h3>
                <span className="bg-amber-400 text-kgp-darknavy text-[10px] font-bold px-2 py-0.5 rounded">
                  Super Admin
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Academic Administration, Verification, Grading & Generation Gateway
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

        {/* Modal Layout */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          
          {/* Admin Sidebar Navigation */}
          <div className="w-full md:w-64 bg-slate-100 border-r border-slate-300 p-3 space-y-1 flex-shrink-0 overflow-y-auto text-xs font-semibold">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Administrative Modules
            </div>

            <button
              onClick={() => setActiveTab('studentProfile')}
              className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between transition ${
                activeTab === 'studentProfile' ? 'bg-kgp-navy text-white shadow' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>Student Profile & Biodata</span>
            </button>

            <button
              onClick={() => setActiveTab('allStudents')}
              className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between transition ${
                activeTab === 'allStudents' ? 'bg-kgp-navy text-white shadow' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>All Students Sheet & Venn</span>
            </button>

            <button
              onClick={() => setActiveTab('courses')}
              className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between transition ${
                activeTab === 'courses' ? 'bg-kgp-navy text-white shadow' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>Courses & Assignments (Sub 1-4)</span>
            </button>

            <button
              onClick={() => setActiveTab('results')}
              className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between transition ${
                activeTab === 'results' ? 'bg-kgp-navy text-white shadow' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>Result Sheet & Cutoff</span>
            </button>

            <button
              onClick={() => setActiveTab('courseFlow')}
              className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between transition ${
                activeTab === 'courseFlow' ? 'bg-kgp-navy text-white shadow' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>Course Flow & Doubt Desk</span>
            </button>

            <button
              onClick={() => setActiveTab('generation')}
              className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between transition ${
                activeTab === 'generation' ? 'bg-kgp-navy text-white shadow' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>Generation & Upload</span>
            </button>

            <button
              onClick={() => setActiveTab('notices')}
              className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between transition ${
                activeTab === 'notices' ? 'bg-kgp-navy text-white shadow' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>Notice Board & Broadcast</span>
            </button>
          </div>

          {/* Main Work Area */}
          <div className="flex-1 p-5 sm:p-7 overflow-y-auto bg-white text-xs">
            
            {/* TAB 1: STUDENT PROFILE & BIODATA VERIFICATION */}
            {activeTab === 'studentProfile' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-slate-900 font-serif-title">
                    Student Profile Verification & Management
                  </h4>
                  <p className="text-slate-500">
                    Lookup candidate by Roll Number, verify documents, and issue admit/alumni credentials.
                  </p>
                </div>

                {/* Roll Input Search */}
                <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-700">Roll No. Input:</span>
                  <input
                    type="text"
                    value={searchRoll}
                    onChange={(e) => setSearchRoll(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-slate-300 font-mono font-bold text-kgp-crimson focus:outline-none"
                  />
                  <button className="px-4 py-2 bg-kgp-navy text-white font-bold rounded-lg hover:bg-slate-800 transition flex items-center gap-1.5">
                    <Search className="w-3.5 h-3.5" />
                    <span>Search Record</span>
                  </button>
                </div>

                {/* Biodata Sections: General, Education, Photo, Payment */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                  <h5 className="text-sm font-bold text-slate-800 uppercase tracking-wider text-kgp-crimson">
                    Biodata Verification Actions
                  </h5>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Gen Info */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-800">General Information</div>
                        <div className="text-slate-500 text-[11px]">Age Proof, Address, Phone OTP</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setBiodataStatus(p => ({ ...p, genInfo: 'Verified' }))}
                          className={`px-2.5 py-1 rounded text-[11px] font-bold ${
                            biodataStatus.genInfo === 'Verified' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          Verified
                        </button>
                        <button
                          onClick={() => setBiodataStatus(p => ({ ...p, genInfo: 'Rejected' }))}
                          className={`px-2.5 py-1 rounded text-[11px] font-bold ${
                            biodataStatus.genInfo === 'Rejected' ? 'bg-red-600 text-white' : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          Reject
                        </button>
                      </div>
                    </div>

                    {/* Education */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-800">Education Details</div>
                        <div className="text-slate-500 text-[11px]">Class 10, WBJEE/JEE Rank Card</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setBiodataStatus(p => ({ ...p, eduEdit: 'Verified' }))}
                          className={`px-2.5 py-1 rounded text-[11px] font-bold ${
                            biodataStatus.eduEdit === 'Verified' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          Verified
                        </button>
                        <button
                          onClick={() => setBiodataStatus(p => ({ ...p, eduEdit: 'Rejected' }))}
                          className={`px-2.5 py-1 rounded text-[11px] font-bold ${
                            biodataStatus.eduEdit === 'Rejected' ? 'bg-red-600 text-white' : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          Reject
                        </button>
                      </div>
                    </div>

                    {/* Photo & Signature */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-800">Photo & Signature</div>
                        <div className="text-slate-500 text-[11px]">Dimensions & Clarity check</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setBiodataStatus(p => ({ ...p, photoEdit: 'Verified' }))}
                          className={`px-2.5 py-1 rounded text-[11px] font-bold ${
                            biodataStatus.photoEdit === 'Verified' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          Verified
                        </button>
                        <button
                          onClick={() => setBiodataStatus(p => ({ ...p, photoEdit: 'Rejected' }))}
                          className={`px-2.5 py-1 rounded text-[11px] font-bold ${
                            biodataStatus.photoEdit === 'Rejected' ? 'bg-red-600 text-white' : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          Reject
                        </button>
                      </div>
                    </div>

                    {/* Payment Status */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-800">Payment Status</div>
                        <div className="text-slate-500 text-[11px]">UTR & Bank Reconciliation</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setBiodataStatus(p => ({ ...p, payEdit: 'Verified' }))}
                          className={`px-2.5 py-1 rounded text-[11px] font-bold ${
                            biodataStatus.payEdit === 'Verified' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          Verified
                        </button>
                        <button
                          onClick={() => setBiodataStatus(p => ({ ...p, payEdit: 'Rejected' }))}
                          className={`px-2.5 py-1 rounded text-[11px] font-bold ${
                            biodataStatus.payEdit === 'Rejected' ? 'bg-red-600 text-white' : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          Reject
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* Actions: Password Reset & Roll No Freeze */}
                  <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center gap-3">
                    <button 
                      onClick={() => alert(`Login Password reset link sent to registered email for Roll: ${searchRoll}.`)}
                      className="px-3.5 py-2 bg-slate-800 text-white font-bold rounded-lg hover:bg-slate-900 transition flex items-center gap-1.5"
                    >
                      <Key className="w-3.5 h-3.5" />
                      <span>Generate / Reset Password</span>
                    </button>
                    <button 
                      onClick={() => alert(`Roll Number ${searchRoll} has been permanently frozen in database.`)}
                      className="px-3.5 py-2 bg-amber-500 text-kgp-darknavy font-bold rounded-lg hover:bg-amber-400 transition flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Freeze Permanent Roll No</span>
                    </button>
                  </div>
                </div>

                {/* Ticket Generation Box (As specified: Admit Card / Alumni Card / BS Degree Admit Card) */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
                  <h5 className="text-sm font-bold text-slate-800 uppercase tracking-wider text-kgp-crimson">
                    Ticket Generation Console
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      onClick={() => { setGeneratedTicketType('admit'); alert(`Generated Proctored Admit Card for Roll: ${searchRoll}`); }}
                      className="p-3 bg-white rounded-xl border border-slate-300 hover:border-kgp-crimson transition text-left"
                    >
                      <div className="font-bold text-slate-900">Qualifier Admit Card</div>
                      <div className="text-[11px] text-slate-500 mt-1">Issue test center hall pass</div>
                    </button>

                    <button
                      onClick={() => { setGeneratedTicketType('alumni'); alert(`Generated Official IIT KGP Alumni Card for Roll: ${searchRoll}`); }}
                      className="p-3 bg-white rounded-xl border border-slate-300 hover:border-kgp-crimson transition text-left"
                    >
                      <div className="font-bold text-slate-900">Alumni Card</div>
                      <div className="text-[11px] text-slate-500 mt-1">Issue Degree level alumni ID</div>
                    </button>

                    <button
                      onClick={() => { setGeneratedTicketType('degree'); alert(`Generated Final BS Degree Convocation Hall Pass for Roll: ${searchRoll}`); }}
                      className="p-3 bg-white rounded-xl border border-slate-300 hover:border-kgp-crimson transition text-left"
                    >
                      <div className="font-bold text-slate-900">BS Degree Admit Card</div>
                      <div className="text-[11px] text-slate-500 mt-1">Convocation & final pass</div>
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: ALL STUDENTS SHEET & VENN DASHBOARD */}
            {activeTab === 'allStudents' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-slate-900 font-serif-title">
                    All Students' Details Sheet & Cohort Venn Analytics
                  </h4>
                  <p className="text-slate-500">
                    Master student roster and aggregate attendance & course progression Venn diagrams.
                  </p>
                </div>

                {/* Aggregate Venn Diagrams (Attendance Venn & Progress Venn) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Attendance Venn Diagram */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                    <h5 className="font-bold text-slate-800 mb-1">
                      All Students' Attendance (Venn Diagram)
                    </h5>
                    <p className="text-slate-500 text-[11px] mb-3">
                      Distribution across Live Interactive Sessions, Recorded Video Views, and Lab Attendance.
                    </p>

                    <div className="relative w-full h-48 flex items-center justify-center bg-white rounded-xl border border-slate-200">
                      <svg viewBox="0 0 400 200" className="w-full h-full">
                        <circle cx="160" cy="100" r="65" fill="#3B82F6" fillOpacity="0.3" stroke="#2563EB" strokeWidth="2" />
                        <circle cx="240" cy="100" r="65" fill="#10B981" fillOpacity="0.3" stroke="#059669" strokeWidth="2" />
                        <text x="120" y="80" fontSize="11" fontWeight="bold" fill="#1E3A8A">Live Sync (68%)</text>
                        <text x="250" y="80" fontSize="11" fontWeight="bold" fill="#064E3B">Async Video (94%)</text>
                        <text x="200" y="105" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#111827">Overlap 64%</text>
                      </svg>
                    </div>
                  </div>

                  {/* Progress Venn Diagram */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                    <h5 className="font-bold text-slate-800 mb-1">
                      Course-wise Students' Progress (Venn Diagram)
                    </h5>
                    <p className="text-slate-500 text-[11px] mb-3">
                      Completion rate of Programming Track vs Data Science Track.
                    </p>

                    <div className="relative w-full h-48 flex items-center justify-center bg-white rounded-xl border border-slate-200">
                      <svg viewBox="0 0 400 200" className="w-full h-full">
                        <circle cx="160" cy="100" r="65" fill="#8B5CF6" fillOpacity="0.3" stroke="#7C3AED" strokeWidth="2" />
                        <circle cx="240" cy="100" r="65" fill="#F59E0B" fillOpacity="0.3" stroke="#D97706" strokeWidth="2" />
                        <text x="110" y="80" fontSize="11" fontWeight="bold" fill="#4C1D95">Programming (88%)</text>
                        <text x="250" y="80" fontSize="11" fontWeight="bold" fill="#78350F">Data Science (82%)</text>
                        <text x="200" y="105" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#111827">Dual 76%</text>
                      </svg>
                    </div>
                  </div>

                </div>

                {/* Master Grid Table */}
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="bg-slate-100 px-5 py-3 border-b border-slate-200 font-bold text-slate-800">
                    All Enrolled Students Details Sheet
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50 text-slate-600 font-semibold border-b">
                        <tr>
                          <th className="px-3 py-2.5">Roll No.</th>
                          <th className="px-3 py-2.5">Student Name</th>
                          <th className="px-3 py-2.5">Email</th>
                          <th className="px-3 py-2.5">App Status</th>
                          <th className="px-3 py-2.5">Total Marks</th>
                          <th className="px-3 py-2.5">Cut-off</th>
                          <th className="px-3 py-2.5">Cert Level</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {SAMPLE_ALL_STUDENTS.map((st) => (
                          <tr key={st.roll} className="hover:bg-slate-50">
                            <td className="px-3 py-2.5 font-mono font-bold text-kgp-crimson">{st.roll}</td>
                            <td className="px-3 py-2.5 font-bold text-slate-900">{st.name}</td>
                            <td className="px-3 py-2.5 text-slate-500">{st.email}</td>
                            <td className="px-3 py-2.5"><span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">{st.app}</span></td>
                            <td className="px-3 py-2.5 font-bold">{st.marks} / 400</td>
                            <td className="px-3 py-2.5 text-emerald-700 font-bold">{st.cut}</td>
                            <td className="px-3 py-2.5"><span className="bg-blue-50 text-blue-800 px-2 py-0.5 rounded font-medium">{st.level}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 3: MASTER RESULT SHEET & CUTOFF */}
            {activeTab === 'results' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 font-serif-title">
                      Result Sheet & Qualifier Cut-off Management
                    </h4>
                    <p className="text-slate-500">
                      Master grade sheet editor — configure passing cutoffs and export results.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 bg-emerald-600 text-white font-bold rounded-lg shadow hover:bg-emerald-700 transition">
                      Export CSV
                    </button>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-800">Qualifier Exam Passing Cut-off Threshold</div>
                    <div className="text-slate-500">Standard cutoff for Foundation Level admission eligibility</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      defaultValue="40%"
                      className="w-20 px-2 py-1.5 rounded-lg border border-slate-300 text-center font-bold font-mono"
                    />
                    <button 
                      onClick={() => alert("Cut-off percentage updated to 40% successfully across all batches.")}
                      className="px-3 py-1.5 bg-kgp-navy text-white font-bold rounded-lg"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: COURSE FLOW & DOUBT CLEARANCE */}
            {activeTab === 'courseFlow' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-slate-900 font-serif-title">
                    Course Flow & Doubt Clearance Desk
                  </h4>
                  <p className="text-slate-500">
                    Track weekly lecture releases and monitor live resolved vs pending student doubts.
                  </p>
                </div>

                {/* Doubt Counters (Specified in user block diagram!) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-amber-50 border border-amber-300">
                    <div className="text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                      No. of Pending Doubts (Live Counter)
                    </div>
                    <div className="text-3xl font-extrabold text-amber-700 font-serif-title mt-1">
                      {doubtCounts.pending} Queries
                    </div>
                    <p className="text-[11px] text-amber-800 mt-1">
                      Currently assigned to teaching assistants for resolution within 12h.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-300">
                    <div className="text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                      No. of Solved Doubts (Cumulative)
                    </div>
                    <div className="text-3xl font-extrabold text-emerald-700 font-serif-title mt-1">
                      {doubtCounts.solved} Resolved
                    </div>
                    <p className="text-[11px] text-emerald-800 mt-1">
                      98.4% resolution rate across all 4 subjects in current term.
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                  <h5 className="font-bold text-slate-800 mb-3">Subject-wise Weekly Upload Flow</h5>
                  <div className="space-y-2">
                    {["Week 1: Foundations & Python Basics", "Week 2: Linear Algebra & Descriptive Stats", "Week 3: Probability & Algorithmic Complexity", "Week 4: Data Structures & Graded Quiz 1"].map((w, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200">
                        <span className="font-bold text-slate-800">{w}</span>
                        <span className="text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded font-bold text-[11px]">
                          Released & Active
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: GENERATION & UPLOAD */}
            {activeTab === 'generation' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-slate-900 font-serif-title">
                    Batch Generation & Bulk Upload Console
                  </h4>
                  <p className="text-slate-500">
                    Bulk generate credentials, Roll numbers, and official Admit/Alumni cards.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                    <h5 className="font-bold text-slate-800">Batch Roll No. Generation Engine</h5>
                    <p className="text-slate-500 text-[11px]">
                      Generate official sequential IIT Kharagpur roll numbers for newly verified applicants.
                    </p>
                    <button 
                      onClick={() => alert("Batch Roll Numbers generated for 142 newly verified applicants.")}
                      className="w-full py-2.5 bg-kgp-crimson text-white font-bold rounded-xl shadow hover:bg-kgp-darkred transition"
                    >
                      Run Roll No. Generation
                    </button>
                  </div>

                  <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                    <h5 className="font-bold text-slate-800">Qualifier Admit Cards Batch Engine</h5>
                    <p className="text-slate-500 text-[11px]">
                      Generate and dispatch digitally signed hall tickets with test center barcodes.
                    </p>
                    <button 
                      onClick={() => alert("Qualifier Exam Admit Cards generated and synced with Student Portals.")}
                      className="w-full py-2.5 bg-slate-900 text-amber-400 font-bold rounded-xl shadow hover:bg-slate-800 transition"
                    >
                      Generate & Upload Admit Cards
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: NOTICES */}
            {activeTab === 'notices' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-slate-900 font-serif-title">
                    Official Notice Board & Common Mailing System
                  </h4>
                  <p className="text-slate-500">
                    Publish administrative announcements and broadcast emails to enrolled cohorts.
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-4">
                  <h5 className="font-bold text-slate-800">Publish New Notice to Students</h5>
                  <input
                    type="text"
                    placeholder="Notice Title (e.g. Schedule of Term Exam Center Allotment)"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                  <textarea
                    rows={3}
                    placeholder="Notice body and instructions..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                  <button 
                    onClick={() => alert("Notice published successfully to public website and student portal banner.")}
                    className="px-5 py-2 bg-kgp-crimson text-white font-bold rounded-lg shadow hover:bg-kgp-darkred transition flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Publish & Broadcast Notice</span>
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
