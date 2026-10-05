import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/ErpAuthContext';
import { DataTable } from '../../components/DataTable';
import {
  CheckSquare,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  Send,
  FileCheck2,
  Calendar,
  Layers,
  Sparkles,
  TrendingUp,
  RefreshCw,
  Search,
  Filter,
  Check,
  LogOut
} from 'lucide-react';

export const EmployeePortal: React.FC = () => {
  const { user, authFetch, logout } = useAuth();
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Real-time slider and progress state for active editing
  const [activeTaskProgress, setActiveTaskProgress] = useState<Record<number, number>>({});
  const [activeTaskStatus, setActiveTaskStatus] = useState<Record<number, string>>({});
  const [worklogNotes, setWorklogNotes] = useState<Record<number, string>>({});
  const [updatingTaskId, setUpdatingTaskId] = useState<number | null>(null);

  // Tab
  const [viewTab, setViewTab] = useState<'tasks' | 'verifications'>('tasks');
  const [applications, setApplications] = useState<any[]>([]);
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [docVerifyStatus, setDocVerifyStatus] = useState<'verified' | 'rejected'>('verified');
  const [docVerifyType, setDocVerifyType] = useState('identity');
  const [docVerifyNote, setDocVerifyNote] = useState('');

  // Task filter & search
  const [taskSearch, setTaskSearch] = useState('');
  const [taskPriorityFilter, setTaskPriorityFilter] = useState('ALL');
  const [taskStatusFilter, setTaskStatusFilter] = useState('ALL');

  const loadMyTasks = async () => {
    setLoading(true);
    try {
      const res = await authFetch('/api/employees/tasks');
      if (res.ok) {
        const data = await res.json();
        setTasks(data.tasks);

        // Preload slider state
        const progMap: Record<number, number> = {};
        const statusMap: Record<number, string> = {};
        data.tasks.forEach((t: any) => {
          progMap[t.id] = t.progress_pct;
          statusMap[t.id] = t.status;
        });
        setActiveTaskProgress(progMap);
        setActiveTaskStatus(statusMap);
      }
    } catch (err) {
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadVerifications = async () => {
    try {
      const res = await authFetch('/api/admissions/applications');
      if (res.ok) {
        setApplications((await res.json()).applications);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const sendHeartbeat = async (actionDesc?: string) => {
    try {
      await authFetch('/api/employees/heartbeat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: actionDesc || 'Active in Operations Center' })
      });
    } catch (e) {
      // non-fatal telemetry ping
    }
  };

  useEffect(() => {
    loadMyTasks();
    loadVerifications();
    sendHeartbeat('Logged into Staff Operations Center');

    const hbInterval = setInterval(() => {
      sendHeartbeat('Active in Operations Center');
    }, 30000);

    return () => clearInterval(hbInterval);
  }, []);

  const handleSaveProgress = async (taskId: number) => {
    setUpdatingTaskId(taskId);
    try {
      const progress = activeTaskProgress[taskId];
      const status = activeTaskStatus[taskId];
      const note = worklogNotes[taskId];

      const res = await authFetch(`/api/employees/tasks/${taskId}/progress`, {
        method: 'PATCH',
        body: JSON.stringify({
          progress_pct: progress,
          status,
          log_note: note
        })
      });

      if (res.ok) {
        setWorklogNotes(prev => ({ ...prev, [taskId]: '' }));
        await loadMyTasks();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to update workflow progress');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingTaskId(null);
    }
  };

  const handleVerifyAppDoc = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) return;
    try {
      const res = await authFetch('/api/admissions/verify-document', {
        method: 'POST',
        body: JSON.stringify({
          application_id: selectedApp.application_id,
          doc_type: docVerifyType,
          verification_status: docVerifyStatus,
          notes: docVerifyNote
        })
      });
      if (res.ok) {
        setSelectedApp(null);
        setDocVerifyNote('');
        loadVerifications();
      } else {
        const data = await res.json();
        alert(data.error || 'Verification failed');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const activeCount = tasks.filter(t => t.status !== 'completed').length;
  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const overdueCount = tasks.filter(t => t.is_overdue && t.status !== 'completed').length;
  const avgProgress = tasks.length > 0 ? Math.round(tasks.reduce((acc, t) => acc + t.progress_pct, 0) / tasks.length) : 0;

  // Filtered tasks
  const filteredTasks = tasks.filter(t => {
    const matchesSearch = taskSearch === '' || 
      t.title.toLowerCase().includes(taskSearch.toLowerCase()) || 
      t.task_code.toLowerCase().includes(taskSearch.toLowerCase());
    const matchesPriority = taskPriorityFilter === 'ALL' || t.priority === taskPriorityFilter;
    const matchesStatus = taskStatusFilter === 'ALL' || t.status === taskStatusFilter;
    return matchesSearch && matchesPriority && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#f0f7ff] text-slate-800 pb-16">
      {/* Authentic Institutional Header: Staff Officer Operations Center */}
      <div className="bg-white border-b border-sky-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#800000] to-[#500000] text-white flex items-center justify-center font-bold text-lg shadow-sm border border-red-900 shrink-0">
                IIT
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-md bg-red-100 text-[#800000] border border-red-200 uppercase tracking-wider">
                    IIT Kharagpur Staff Operations
                  </span>
                  <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Online & Active
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    ID: {user?.user_code || 'STAFF'}
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-slate-900 mt-1 font-serif tracking-tight">
                  Staff Officer Operations Center
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Logged in as <span className="font-semibold text-slate-800">{user?.full_name}</span> ({user?.department || 'Academic Directorate'})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 self-start md:self-center">
              <button
                onClick={() => {
                  loadMyTasks();
                  loadVerifications();
                  sendHeartbeat('Manual Operations Refresh');
                }}
                className="px-3.5 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
                Refresh Data
              </button>
              <button
                onClick={logout}
                className="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-[#800000] border border-red-200 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                title="Sign Out to Login Gate"
              >
                <LogOut className="w-3.5 h-3.5 text-red-600" />
                Sign Out
              </button>
            </div>
          </div>

          {/* Sub Navigation */}
          <div className="flex items-center gap-2 mt-5 border-t border-slate-200 pt-3">
            <button
              onClick={() => setViewTab('tasks')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                viewTab === 'tasks'
                  ? 'bg-[#800000] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <CheckSquare className={`w-4 h-4 ${viewTab === 'tasks' ? 'text-amber-300' : 'text-slate-500'}`} />
              My Assigned Tasks
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                viewTab === 'tasks' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {tasks.length}
              </span>
            </button>

            <button
              onClick={() => setViewTab('verifications')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                viewTab === 'verifications'
                  ? 'bg-[#800000] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <FileCheck2 className={`w-4 h-4 ${viewTab === 'verifications' ? 'text-amber-300' : 'text-slate-500'}`} />
              Document Verification Queue
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                viewTab === 'verifications' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {applications.filter(a => a.application_status === 'under_review' || a.application_status === 'submitted').length}
              </span>
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">
        {/* Personal Workload Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-500 uppercase font-mono">Active Tasks</span>
            <div className="text-3xl font-extrabold text-[#0b1d3a] mt-1 font-mono">
              {activeCount} Tasks
            </div>
            <span className="text-[11px] text-slate-500">Currently in progress or review</span>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-500 uppercase font-mono">Completed</span>
            <div className="text-3xl font-extrabold text-emerald-700 mt-1 font-mono">
              {completedCount} Tasks
            </div>
            <span className="text-[11px] text-slate-500">100% workflow fulfilled</span>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-500 uppercase font-mono">Overdue Warning</span>
            <div className="text-3xl font-extrabold text-red-600 mt-1 flex items-center gap-1.5 font-mono">
              {overdueCount} Overdue
              {overdueCount > 0 && <AlertTriangle className="w-5 h-5 animate-pulse text-red-600" />}
            </div>
            <span className="text-[11px] text-slate-500">Past target completion deadline</span>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-500 uppercase font-mono">Average Progress</span>
            <div className="text-3xl font-extrabold text-[#800000] mt-1 font-mono">
              {avgProgress}%
            </div>
            <span className="text-[11px] text-slate-500">Real-time workflow execution</span>
          </div>
        </div>

        {/* ================= VIEW 1: MY ASSIGNED TASKS ================= */}
        {viewTab === 'tasks' && (
          <div className="space-y-4">
            {/* Search & Filter Controls */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="relative min-w-[240px]">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search my assigned tasks..."
                  value={taskSearch}
                  onChange={e => setTaskSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800 placeholder-slate-400 bg-white focus:outline-none focus:ring-1 focus:ring-[#800000]"
                />
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={taskPriorityFilter}
                  onChange={e => setTaskPriorityFilter(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-700 bg-white focus:outline-none focus:ring-1 focus:ring-[#800000]"
                >
                  <option value="ALL">All Priorities</option>
                  <option value="urgent">Urgent</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>

                <select
                  value={taskStatusFilter}
                  onChange={e => setTaskStatusFilter(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-700 bg-white focus:outline-none focus:ring-1 focus:ring-[#800000]"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="not_started">Not Started</option>
                  <option value="in_progress">In Progress</option>
                  <option value="under_review">Under Review</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            {filteredTasks.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center border border-slate-200 shadow-xs">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-900 font-serif">
                  No Matching Tasks
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                  Adjust filters or wait for new tasks to be delegated by the Admissions Directorate.
                </p>
              </div>
            ) : (
              filteredTasks.map((task) => {
                const currentPct = activeTaskProgress[task.id] !== undefined ? activeTaskProgress[task.id] : task.progress_pct;
                const currentStatus = activeTaskStatus[task.id] || task.status;
                const isOverdue = task.is_overdue;

                return (
                  <div
                    key={task.id}
                    className={`bg-white rounded-xl p-6 border transition-all shadow-xs ${
                      isOverdue
                        ? 'border-red-300 bg-red-50/20 ring-1 ring-red-400'
                        : 'border-slate-200'
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                      {/* Left: Task Info */}
                      <div className="space-y-2 max-w-2xl">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-xs font-bold text-[#800000] bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                            {task.task_code}
                          </span>

                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            task.priority === 'urgent'
                              ? 'bg-red-100 text-red-800 border border-red-200 animate-pulse'
                              : task.priority === 'high'
                              ? 'bg-amber-100 text-amber-800 border border-amber-200'
                              : 'bg-blue-100 text-blue-800 border border-blue-200'
                          }`}>
                            {task.priority} Priority
                          </span>

                          <span className="text-[11px] font-semibold text-slate-500 uppercase font-mono">
                            • {task.category}
                          </span>

                          {isOverdue && task.status !== 'completed' && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-600 text-white flex items-center gap-1 shadow-xs animate-pulse">
                              <AlertTriangle className="w-3 h-3" />
                              OVERDUE BY {task.days_overdue} DAYS
                            </span>
                          )}
                        </div>

                        <h3 className="text-base font-bold text-slate-900 font-serif">
                          {task.title}
                        </h3>

                        <p className="text-xs text-slate-600 leading-relaxed">
                          {task.description}
                        </p>

                        <div className="flex items-center gap-4 text-xs text-slate-500 font-medium pt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            Assigned: {new Date(task.start_date).toLocaleDateString()}
                          </span>
                          <span className={`flex items-center gap-1 font-semibold ${isOverdue ? 'text-red-700' : 'text-slate-700'}`}>
                            <Clock className="w-3.5 h-3.5" />
                            Target Deadline: {new Date(task.due_date).toLocaleDateString()}
                          </span>
                          <span>
                            By: {task.created_by_name}
                          </span>
                        </div>
                      </div>

                      {/* Right: Live Interactive Workflow Slider */}
                      <div className="w-full lg:w-96 bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900 flex items-center gap-1 font-serif">
                            <Sliders className="w-3.5 h-3.5 text-[#800000]" />
                            Task Completion Progress
                          </span>
                          <span className="text-base font-black text-[#800000] font-mono">
                            {currentPct}%
                          </span>
                        </div>

                        {/* Interactive Slider Input */}
                        <div className="space-y-1">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            step="5"
                            value={currentPct}
                            onChange={(e) => {
                              const val = parseInt(e.target.value, 10);
                              setActiveTaskProgress(prev => ({ ...prev, [task.id]: val }));
                              if (val === 100) {
                                setActiveTaskStatus(prev => ({ ...prev, [task.id]: 'completed' }));
                              } else if (val > 0 && currentStatus === 'not_started') {
                                setActiveTaskStatus(prev => ({ ...prev, [task.id]: 'in_progress' }));
                              }
                            }}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#800000]"
                          />
                          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                            <span>0% (Not Started)</span>
                            <span>50% (Halfway)</span>
                            <span>100% (Completed)</span>
                          </div>
                        </div>

                        {/* Status dropdown & quick note */}
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <label className="block text-[10px] font-medium text-slate-600 mb-0.5">
                              Workflow Status
                            </label>
                            <select
                              value={currentStatus}
                              onChange={(e) => setActiveTaskStatus(prev => ({ ...prev, [task.id]: e.target.value }))}
                              className="w-full px-2 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-900 font-semibold text-xs"
                            >
                              <option value="not_started">Not Started</option>
                              <option value="in_progress">In Progress</option>
                              <option value="under_review">Under Review</option>
                              <option value="completed">Completed</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-[10px] font-medium text-slate-600 mb-0.5">
                              Add Worklog Note
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. Verified 45 files..."
                              value={worklogNotes[task.id] || ''}
                              onChange={(e) => setWorklogNotes(prev => ({ ...prev, [task.id]: e.target.value }))}
                              className="w-full px-2 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-xs"
                            />
                          </div>
                        </div>

                        {/* Save Button */}
                        <button
                          onClick={() => handleSaveProgress(task.id)}
                          disabled={updatingTaskId === task.id}
                          className="w-full py-2.5 rounded-xl bg-[#800000] hover:bg-[#6b0000] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs disabled:opacity-50"
                        >
                          <Send className="w-3.5 h-3.5" />
                          {updatingTaskId === task.id ? 'Recording Progress...' : 'Save Task Progress'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* ================= VIEW 2: DOCUMENT VERIFICATION QUEUE WITH DATA TABLE ================= */}
        {viewTab === 'verifications' && (
          <div className="space-y-4">
            <DataTable
              title="Assigned Candidate Verification Dossiers"
              subtitle="Review applicant proof of identity, central category eligibility, and 12th marks certificates."
              searchPlaceholder="Search candidate name, application no..."
              searchKeys={['application_no', 'full_name', 'category']}
              columns={[
                { key: 'application_no', label: 'App No', sortable: true, render: r => <span className="font-mono font-bold text-[#800000]">{r.application_no}</span> },
                { key: 'full_name', label: 'Candidate', sortable: true, render: r => <span className="font-semibold text-slate-900">{r.full_name}</span> },
                { key: 'category', label: 'Category', sortable: true, render: r => <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold border">{r.category}</span> },
                { key: 'percentage_12th', label: '12th (%)', sortable: true, render: r => <span className="font-mono font-bold text-slate-800">{r.percentage_12th}%</span> },
                { key: 'application_status', label: 'Pipeline', sortable: true, render: r => (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-700 border border-slate-200">
                    {r.application_status}
                  </span>
                )},
                { key: 'actions', label: 'Action', render: r => (
                  <button
                    onClick={() => setSelectedApp(r)}
                    className="px-3 py-1 rounded-lg bg-[#800000] hover:bg-[#6b0000] text-white font-bold text-xs"
                  >
                    Verify Dossier
                  </button>
                )}
              ]}
              data={applications}
              initialPageSize={10}
            />
          </div>
        )}
      </main>

      {/* Verification Action Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 border border-slate-200 shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h4 className="font-bold text-slate-900 text-sm font-serif">
                Verify Candidate: {selectedApp.full_name} ({selectedApp.application_no})
              </h4>
              <button onClick={() => setSelectedApp(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleVerifyAppDoc} className="py-4 space-y-3 text-xs">
              <div>
                <label className="block font-medium mb-1 text-slate-700">Select Document to Certify</label>
                <select
                  value={docVerifyType}
                  onChange={(e) => setDocVerifyType(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-semibold"
                >
                  <option value="identity">Identity Document (Aadhaar/Passport)</option>
                  <option value="category">Category Certificate ({selectedApp.category})</option>
                  <option value="marksheet">Class 12th Marks Sheet</option>
                </select>
              </div>

              <div>
                <label className="block font-medium mb-1 text-slate-700">Certification Status</label>
                <select
                  value={docVerifyStatus}
                  onChange={(e: any) => setDocVerifyStatus(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-semibold"
                >
                  <option value="verified">Verified (Approved)</option>
                  <option value="rejected">Rejected (Discrepancy / Illegible)</option>
                </select>
              </div>

              <div>
                <label className="block font-medium mb-1 text-slate-700">Verification Note</label>
                <input
                  type="text"
                  placeholder="e.g. Verified with Digilocker & NAD records"
                  value={docVerifyNote}
                  onChange={(e) => setDocVerifyNote(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedApp(null)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#800000] hover:bg-[#6b0000] text-white font-bold"
                >
                  Submit Decision
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeePortal;
