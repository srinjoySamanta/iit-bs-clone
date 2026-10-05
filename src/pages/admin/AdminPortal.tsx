import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/ErpAuthContext';
import { DataTable } from '../../components/DataTable';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import confetti from 'canvas-confetti';
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  FileCheck2,
  CreditCard,
  BookOpen,
  GraduationCap,
  SlidersHorizontal,
  History,
  AlertTriangle,
  Clock,
  TrendingUp,
  Search,
  Filter,
  Plus,
  Eye,
  CheckCircle2,
  XCircle,
  Copy,
  Printer,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  RefreshCw,
  Award,
  LogOut,
  Sparkles,
  Building2,
  KeyRound,
  ShieldAlert,
  Sliders,
  Send,
  Calendar,
  Layers,
  PanelLeftClose,
  PanelLeftOpen,
  UserCheck,
  UserPlus,
  Lock,
  Check,
  DollarSign,
  Mail,
  Phone,
  Table,
  LayoutGrid,
  MapPin,
  User,
  Radio,
  Activity
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

export const AdminPortal: React.FC = () => {
  const { authFetch, user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'approvals' | 'employees' | 'tasks' | 'admissions' | 'fees' | 'lms' | 'exams' | 'cutoffs' | 'audit'>('dashboard');

  // Collapsible Sidebar state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // State data
  const [metrics, setMetrics] = useState<any>(null);
  const [analytics, setAnalytics] = useState<any>(null);
  const [employees, setEmployees] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [feeTransactions, setFeeTransactions] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [exams, setExams] = useState<any[]>([]);
  const [cutoffs, setCutoffs] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Pending Approvals Queue State
  const [pendingApprovals, setPendingApprovals] = useState<any[]>([]);
  const [pendingCounts, setPendingCounts] = useState<{ total_pending: number; pending_students: number; pending_employees: number }>({
    total_pending: 0,
    pending_students: 0,
    pending_employees: 0
  });
  const [approvingId, setApprovingId] = useState<number | null>(null);
  const [rejectingId, setRejectingId] = useState<number | null>(null);
  const [approvalBanner, setApprovalBanner] = useState<string | null>(null);
  const [approvalFilter, setApprovalFilter] = useState<'all' | 'student' | 'employee'>('all');
  const [approvalSearchQuery, setApprovalSearchQuery] = useState<string>('');
  const [approvalViewMode, setApprovalViewMode] = useState<'table' | 'cards'>('table');
  const [isRefreshingApprovals, setIsRefreshingApprovals] = useState<boolean>(false);

  // Active Staff Presence & Session Monitor State
  const [staffActivityData, setStaffActivityData] = useState<{
    summary: {
      active_online_count: number;
      total_staff_count: number;
      total_staff_minutes_today?: number;
      tasks_updated_today: number;
      verifications_reviewed_today: number;
    };
    staffPresence: any[];
    sessionHistory?: any[];
    recentStaffLogs: any[];
  } | null>(null);
  const [isStaffActivityLoading, setIsStaffActivityLoading] = useState<boolean>(false);
  const [lastStaffActivityRefreshed, setLastStaffActivityRefreshed] = useState<Date | null>(null);
  const [staffMonitorSubTab, setStaffMonitorSubTab] = useState<'roster' | 'sessions' | 'audit'>('roster');
  const [sessionSearch, setSessionSearch] = useState<string>('');
  const [sessionFilterStatus, setSessionFilterStatus] = useState<'all' | 'active' | 'concluded'>('all');

  const formatStaffDuration = (mins: number | undefined | null) => {
    if (mins === undefined || mins === null || isNaN(mins) || mins <= 0) return '< 1m';
    if (mins < 60) return `${mins}m`;
    const hours = Math.floor(mins / 60);
    const rem = mins % 60;
    return rem > 0 ? `${hours}h ${rem}m` : `${hours}h`;
  };

  // Auto-Generation Tool Modal (Dual: Staff & Student)
  const [showCredentialModal, setShowCredentialModal] = useState<boolean>(false);
  const [credentialModalType, setCredentialModalType] = useState<'employee' | 'student'>('employee');
  const [isGeneratingCredentials, setIsGeneratingCredentials] = useState<boolean>(false);
  const [generatedCredentialVoucher, setGeneratedCredentialVoucher] = useState<any>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Employee Form
  const [empForm, setEmpForm] = useState({
    full_name: '',
    username: '',
    email: '',
    department: 'Admissions & Document Verification',
    designation: 'Verification Officer',
    temp_password: '',
    phone: '+91 98301 22334',
    max_workload: 10
  });

  // Student Form
  const [studentForm, setStudentForm] = useState({
    full_name: '',
    category: 'GEN',
    percentage_12th: 88.5,
    stream_12th: 'Science (PCM)',
    phone: '+91 98000 44556',
    guardian_name: 'Parent / Legal Guardian',
    city: 'Kolkata',
    state: 'West Bengal'
  });

  // Task creation modal
  const [showCreateTaskModal, setShowCreateTaskModal] = useState<boolean>(false);
  const [newTaskForm, setNewTaskForm] = useState({
    title: '',
    description: '',
    assigned_to: '',
    category: 'verification',
    priority: 'medium',
    due_date: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0]
  });

  // Document verification modal
  const [selectedAppForDoc, setSelectedAppForDoc] = useState<any>(null);
  const [docVerifyForm, setDocVerifyForm] = useState({
    doc_type: 'identity',
    verification_status: 'verified',
    notes: ''
  });

  // Receipt Modal
  const [selectedReceipt, setSelectedReceipt] = useState<any>(null);

  // Shortlisting result modal
  const [shortlistResults, setShortlistResults] = useState<any>(null);

  // Worklogs modal
  const [selectedTaskWorklogs, setSelectedTaskWorklogs] = useState<{ task: any; logs: any[] } | null>(null);

  // Load All Data
  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [mRes, aRes] = await Promise.all([
        authFetch('/api/admin/metrics'),
        authFetch('/api/admin/analytics')
      ]);
      if (mRes.ok) setMetrics(await mRes.json());
      if (aRes.ok) setAnalytics(await aRes.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadStaffActivityMonitor = async () => {
    setIsStaffActivityLoading(true);
    try {
      const res = await authFetch('/api/admin/staff-activity-monitor');
      if (res.ok) {
        const data = await res.json();
        setStaffActivityData(data);
        setLastStaffActivityRefreshed(new Date());
      }
    } catch (err) {
      console.error('Error fetching staff activity monitor:', err);
    } finally {
      setIsStaffActivityLoading(false);
    }
  };

  const loadEmployees = async () => {
    try {
      const res = await authFetch('/api/employees/list');
      if (res.ok) setEmployees((await res.json()).employees);
    } catch (err) {
      console.error(err);
    }
  };

  const loadTasks = async () => {
    try {
      const res = await authFetch('/api/employees/tasks');
      if (res.ok) setTasks((await res.json()).tasks);
    } catch (err) {
      console.error(err);
    }
  };

  const loadApplications = async () => {
    try {
      const res = await authFetch('/api/admissions/applications');
      if (res.ok) setApplications((await res.json()).applications);
    } catch (err) {
      console.error(err);
    }
  };

  const loadFees = async () => {
    try {
      const res = await authFetch('/api/admissions/fees');
      if (res.ok) setFeeTransactions((await res.json()).transactions);
    } catch (err) {
      console.error(err);
    }
  };

  const loadLMS = async () => {
    try {
      const res = await authFetch('/api/lms/courses');
      if (res.ok) setCourses((await res.json()).courses);
    } catch (err) {
      console.error(err);
    }
  };

  const loadExams = async () => {
    try {
      const res = await authFetch('/api/exams/list');
      if (res.ok) setExams((await res.json()).exams);
    } catch (err) {
      console.error(err);
    }
  };

  const loadCutoffs = async () => {
    try {
      const res = await authFetch('/api/admin/cutoffs');
      if (res.ok) setCutoffs((await res.json()).cutoffs);
    } catch (err) {
      console.error(err);
    }
  };

  const loadAudit = async () => {
    try {
      const res = await authFetch('/api/admin/audit-logs');
      if (res.ok) setAuditLogs((await res.json()).audit_logs);
    } catch (err) {
      console.error(err);
    }
  };

  const loadPendingApprovals = async () => {
    setIsRefreshingApprovals(true);
    try {
      const res = await authFetch('/api/admin/pending-approvals');
      if (res.ok) {
        const data = await res.json();
        setPendingApprovals(Array.isArray(data?.pending) ? data.pending : []);
        setPendingCounts(data?.counts || { total_pending: 0, pending_students: 0, pending_employees: 0 });
      }
    } catch (err) {
      console.error('Error fetching pending approvals:', err);
    } finally {
      setIsRefreshingApprovals(false);
    }
  };

  const handleApproveRegistration = async (id: number) => {
    setApprovingId(id);
    try {
      const res = await authFetch(`/api/admin/approve-registration/${id}`, { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
        setApprovalBanner(`Approved: ${data.user_code} (${data.role}: ${data.username}). Account activated!`);
        await Promise.all([loadPendingApprovals(), loadDashboardData(), loadEmployees(), loadApplications()]);
      } else {
        alert(data.error || 'Approval failed');
      }
    } catch (err: any) {
      alert(err.message || 'Approval failed');
    } finally {
      setApprovingId(null);
    }
  };

  const handleRejectRegistration = async (id: number) => {
    if (!window.confirm('Are you sure you want to reject this registration request?')) return;
    setRejectingId(id);
    try {
      const res = await authFetch(`/api/admin/reject-registration/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: 'Rejected by Admissions Directorate during administrative review' })
      });
      if (res.ok) {
        await Promise.all([loadPendingApprovals(), loadDashboardData()]);
      } else {
        const err = await res.json();
        alert(err.error || 'Rejection failed');
      }
    } catch (err: any) {
      alert(err.message || 'Rejection failed');
    } finally {
      setRejectingId(null);
    }
  };

  useEffect(() => {
    loadDashboardData();
    loadPendingApprovals();
    loadStaffActivityMonitor();

    const activityInterval = setInterval(() => {
      loadStaffActivityMonitor();
    }, 20000);

    return () => clearInterval(activityInterval);
  }, []);

  useEffect(() => {
    if (activeTab === 'dashboard') loadStaffActivityMonitor();
    else if (activeTab === 'approvals') loadPendingApprovals();
    else if (activeTab === 'employees') {
      loadEmployees();
      loadStaffActivityMonitor();
    }
    else if (activeTab === 'tasks') {
      loadEmployees();
      loadTasks();
    }
    else if (activeTab === 'admissions') loadApplications();
    else if (activeTab === 'fees') loadFees();
    else if (activeTab === 'lms') loadLMS();
    else if (activeTab === 'exams') loadExams();
    else if (activeTab === 'cutoffs') loadCutoffs();
    else if (activeTab === 'audit') loadAudit();
  }, [activeTab]);

  // Copy to clipboard helper
  const copyToClipboard = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Auto-Generate Staff Credentials
  const handleAutoGenerateEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGeneratingCredentials(true);
    try {
      const res = await authFetch('/api/auth/admin/create-employee', {
        method: 'POST',
        body: JSON.stringify(empForm)
      });
      const data = await res.json();
      if (res.ok) {
        setGeneratedCredentialVoucher({
          type: 'STAFF EMPLOYEE',
          name: data.employee.full_name,
          user_code: data.employee.user_code,
          username: data.employee.username,
          temp_password: data.employee.temp_password,
          department: data.employee.department,
          designation: data.employee.designation,
          email: data.employee.email
        });
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        loadEmployees();
        loadDashboardData();
      } else {
        alert(data.error || 'Failed to auto-generate employee credentials');
      }
    } catch (err: any) {
      alert(err.message || 'Error auto-generating credentials');
    } finally {
      setIsGeneratingCredentials(false);
    }
  };

  // Auto-Generate Student Candidate Credentials & Application Dossier
  const handleAutoGenerateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGeneratingCredentials(true);
    try {
      const res = await authFetch('/api/auth/admin/create-student', {
        method: 'POST',
        body: JSON.stringify(studentForm)
      });
      const data = await res.json();
      if (res.ok) {
        setGeneratedCredentialVoucher({
          type: 'STUDENT CANDIDATE',
          name: data.student.full_name,
          user_code: data.student.user_code,
          application_no: data.student.application_no,
          username: data.student.username,
          temp_password: data.student.temp_password,
          category: data.student.category,
          email: data.student.email,
          status: 'Submitted & Dossier Linked'
        });
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
        loadApplications();
        loadDashboardData();
      } else {
        alert(data.error || 'Failed to auto-generate candidate credentials');
      }
    } catch (err: any) {
      alert(err.message || 'Error auto-generating candidate credentials');
    } finally {
      setIsGeneratingCredentials(false);
    }
  };

  // Assign Task
  const handleAssignTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await authFetch('/api/employees/tasks', {
        method: 'POST',
        body: JSON.stringify(newTaskForm)
      });
      if (res.ok) {
        setShowCreateTaskModal(false);
        setNewTaskForm({
          title: '',
          description: '',
          assigned_to: '',
          category: 'verification',
          priority: 'medium',
          due_date: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0]
        });
        loadTasks();
        loadDashboardData();
        confetti({ particleCount: 60, spread: 50 });
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to assign task');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Verify Document
  const handleVerifyDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAppForDoc) return;
    try {
      const res = await authFetch('/api/admissions/verify-document', {
        method: 'POST',
        body: JSON.stringify({
          application_id: selectedAppForDoc.application_id,
          doc_type: docVerifyForm.doc_type,
          verification_status: docVerifyForm.verification_status,
          notes: docVerifyForm.notes
        })
      });
      if (res.ok) {
        setSelectedAppForDoc(null);
        loadApplications();
        loadDashboardData();
      } else {
        const data = await res.json();
        alert(data.error || 'Verification failed');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Run Cutoff Shortlisting Engine
  const handleRunCutoffEngine = async () => {
    if (!confirm('Run automatic cutoff eligibility shortlisting for all qualifier exam candidates?')) return;
    try {
      const res = await authFetch('/api/admin/cutoffs/evaluate-shortlist', { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        setShortlistResults(data);
        loadDashboardData();
        loadApplications();
        confetti({ particleCount: 150, spread: 90 });
      } else {
        alert(data.error || 'Shortlisting engine failed');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleViewWorklogs = async (task: any) => {
    try {
      const res = await authFetch(`/api/employees/tasks/${task.id}/worklogs`);
      if (res.ok) {
        const data = await res.json();
        setSelectedTaskWorklogs({ task, logs: data.worklogs });
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Sidebar Menu Items
  const navigationItems = [
    { id: 'dashboard', label: 'Overview & Metrics', icon: LayoutDashboard, section: 'ACADEMIC GOVERNANCE' },
    {
      id: 'approvals',
      label: 'Pending Approvals',
      icon: UserCheck,
      badge: (pendingCounts?.total_pending ?? 0) > 0 ? `${pendingCounts.total_pending} Pending` : undefined,
      badgeColor: 'bg-[#800000] text-white',
      section: 'ACADEMIC GOVERNANCE'
    },
    { id: 'cutoffs', label: 'Cutoff Shortlisting', icon: SlidersHorizontal, section: 'ACADEMIC GOVERNANCE' },
    { id: 'audit', label: 'System Audit Trail', icon: History, section: 'ACADEMIC GOVERNANCE' },
    
    { id: 'employees', label: 'Staff & Credentials', icon: Users, badge: employees.length, section: 'OPERATIONS & WORKFLOW' },
    { id: 'tasks', label: 'Tasks & Workflow', icon: CheckSquare, badge: metrics?.tasks?.overdue_tasks > 0 ? `${metrics.tasks.overdue_tasks} Overdue` : undefined, badgeColor: 'bg-red-500 text-white', section: 'OPERATIONS & WORKFLOW' },
    { id: 'admissions', label: 'Document Verification', icon: FileCheck2, badge: metrics?.applicants?.pending_verification_count, section: 'OPERATIONS & WORKFLOW' },
    { id: 'fees', label: 'Fee Reconciliation', icon: CreditCard, section: 'OPERATIONS & WORKFLOW' },

    { id: 'lms', label: 'LMS Curriculum', icon: BookOpen, section: 'LEARNING & ASSESSMENT' },
    { id: 'exams', label: 'Qualifier Examination', icon: GraduationCap, section: 'LEARNING & ASSESSMENT' },
  ];

  return (
    <div className="flex min-h-screen bg-[#f8fafc] text-slate-800">
      {/* ================= 1. ENTERPRISE COLLAPSIBLE SIDEBAR ================= */}
      <aside
        className={`bg-white border-r border-slate-200 transition-all duration-300 ease-in-out flex flex-col justify-between shrink-0 z-30 sticky top-0 h-screen ${
          isSidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div>
          {/* Sidebar Header with Brand Crest & Collapse Toggle */}
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            {!isSidebarCollapsed ? (
              <div className="flex items-center gap-2.5 overflow-hidden">
                <img
                  src="/iitkgp-logo.png"
                  alt="IIT Kharagpur Crest"
                  className="w-9 h-9 object-contain shrink-0"
                />
                <div className="truncate">
                  <h1 className="font-bold text-xs text-slate-900 font-serif leading-tight">
                    IIT Kharagpur
                  </h1>
                  <span className="text-[10px] text-[#800000] font-semibold block tracking-wider uppercase">
                    Admin ERP Console
                  </span>
                </div>
              </div>
            ) : (
              <div className="mx-auto">
                <img
                  src="/iitkgp-logo.png"
                  alt="IIT Kharagpur Crest"
                  className="w-8 h-8 object-contain"
                />
              </div>
            )}

            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {isSidebarCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
            </button>
          </div>

          {/* Quick Credential Auto-Generator Button in Sidebar */}
          <div className="p-3 border-b border-slate-100">
            <button
              onClick={() => {
                setShowCredentialModal(true);
                setGeneratedCredentialVoucher(null);
              }}
              className={`w-full py-2 px-2.5 rounded-xl bg-[#800000] hover:bg-[#6b0000] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-transform active:scale-98 ${
                isSidebarCollapsed ? 'p-2' : ''
              }`}
              title="Auto-Generate Staff / Student Credentials"
            >
              <KeyRound className="w-4 h-4 text-amber-300 shrink-0" />
              {!isSidebarCollapsed && <span className="truncate">Auto-Generate ID</span>}
            </button>
          </div>

          {/* Navigation Items grouped by section */}
          <nav className="p-2 space-y-1 overflow-y-auto max-h-[calc(100vh-230px)] no-scrollbar">
            {navigationItems.map((item, idx) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const showSectionHeader = !isSidebarCollapsed && (idx === 0 || navigationItems[idx - 1].section !== item.section);

              return (
                <React.Fragment key={item.id}>
                  {showSectionHeader && (
                    <div className="px-3 pt-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                      {item.section}
                    </div>
                  )}
                  <button
                    onClick={() => setActiveTab(item.id as any)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all relative group ${
                      isActive
                        ? 'bg-[#800000] text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                    title={isSidebarCollapsed ? item.label : undefined}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-300' : 'text-slate-500 group-hover:text-slate-800'}`} />
                    {!isSidebarCollapsed && (
                      <span className="truncate flex-1 text-left">{item.label}</span>
                    )}
                    {item.badge !== undefined && (
                      <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        item.badgeColor || (isActive ? 'bg-amber-400 text-[#800000]' : 'bg-slate-200 text-slate-700')
                      } ${isSidebarCollapsed ? 'absolute -top-1 -right-1 text-[9px] px-1' : ''}`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                </React.Fragment>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer with Logged In Admin Profile & Sign Out */}
        <div className="p-3 border-t border-slate-200 bg-slate-50/70">
          {!isSidebarCollapsed ? (
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 truncate">
                <div className="w-8 h-8 rounded-full bg-[#800000] text-amber-200 text-xs font-bold flex items-center justify-center shrink-0">
                  SA
                </div>
                <div className="truncate">
                  <span className="text-xs font-bold text-slate-900 block truncate font-serif">
                    {user?.full_name || 'Super Admin (Admissions Directorate)'}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono block truncate">
                    {user?.user_code || 'KGP-ADM-0001'} • Super Admin
                  </span>
                </div>
              </div>
              <button
                onClick={logout}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-700 hover:bg-red-50 transition-colors"
                title="Sign Out to Login Gate"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#800000] text-amber-200 text-xs font-bold flex items-center justify-center" title="Super Admin (Admissions Directorate)">
                SA
              </div>
              <button
                onClick={logout}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-700 hover:bg-red-50 transition-colors"
                title="Sign Out to Login Gate"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* ================= 2. MAIN EXECUTIVE CONTENT WORKSPACE ================= */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top Executive Header Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 sticky top-0 z-20 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-red-50 text-[#800000] border border-red-200 uppercase font-mono">
                Master Admissions Directorate
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Cycle: 2026-TERM-1 • PostgreSQL ACID Synchronized
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5 font-serif flex items-center gap-2">
              {navigationItems.find(n => n.id === activeTab)?.label || 'Overview'}
            </h2>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                loadDashboardData();
                if (activeTab === 'employees') loadEmployees();
                if (activeTab === 'tasks') loadTasks();
                if (activeTab === 'admissions') loadApplications();
                if (activeTab === 'fees') loadFees();
                if (activeTab === 'lms') loadLMS();
                if (activeTab === 'exams') loadExams();
                if (activeTab === 'cutoffs') loadCutoffs();
                if (activeTab === 'audit') loadAudit();
              }}
              className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 flex items-center gap-1.5 shadow-xs"
              title="Refresh database state"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
              Sync Data
            </button>

            <button
              onClick={() => {
                setShowCredentialModal(true);
                setGeneratedCredentialVoucher(null);
              }}
              className="px-3.5 py-1.5 rounded-lg bg-[#800000] hover:bg-[#6b0000] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-300" />
              Auto-Generate Credentials
            </button>

            <button
              onClick={() => setShowCreateTaskModal(true)}
              className="px-3.5 py-1.5 rounded-lg bg-[#0b1d3a] hover:bg-[#162a4d] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-amber-400" />
              Assign Task
            </button>

            <button
              onClick={logout}
              className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5 text-red-600" />
              <span>Sign Out</span>
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main className="p-6 space-y-6 flex-1 bg-[#f0f7ff]">
          {/* Approval Action Feedback Banner */}
          {approvalBanner && (
            <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center justify-between text-xs font-semibold text-emerald-900 shadow-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{approvalBanner}</span>
              </div>
              <button
                onClick={() => setApprovalBanner(null)}
                className="text-emerald-700 hover:text-emerald-950 font-bold px-2 py-0.5 rounded"
              >
                ✕
              </button>
            </div>
          )}

          {/* ================= TAB 1: DASHBOARD METRICS & LIVE OVERVIEW ================= */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Prominent Pending Approvals Alert Banner */}
              {(pendingCounts?.total_pending ?? 0) > 0 && (
                <div className="p-4 bg-amber-50 border border-amber-300 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-900 shadow-sm">
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-5 h-5 text-amber-600 shrink-0" />
                    <div>
                      <span className="font-bold text-amber-950 font-serif">
                        {pendingCounts.total_pending} Registration Request(s) Awaiting Super Admin Verification
                      </span>
                      <p className="text-[11px] text-amber-800">
                        New student applicants or academic staff are waiting in the approval queue. Review and grant permission to activate their accounts.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('approvals');
                      loadPendingApprovals();
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-[#800000] hover:bg-[#660000] text-white font-bold text-xs shrink-0 shadow-xs flex items-center gap-1.5 self-start sm:self-center cursor-pointer transition-colors"
                  >
                    <UserCheck className="w-3.5 h-3.5 text-amber-300" />
                    Review Pending Queue &rarr;
                  </button>
                </div>
              )}

              {/* Live Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">
                      Total Applicants
                    </span>
                    <div className="text-2xl font-black text-slate-900 mt-1 font-serif">
                      {metrics?.applicants?.total_applicants || 0}
                    </div>
                    <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                      <CheckCircle2 className="w-3 h-3" />
                      {metrics?.applicants?.verified_count || 0} Verified Dossiers
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center">
                    <Users className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">
                      Qualifier Fees Settled
                    </span>
                    <div className="text-2xl font-black text-[#800000] mt-1 font-mono">
                      ₹{Number(metrics?.fees?.total_fees_collected || 0).toLocaleString('en-IN')}
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium mt-1 block">
                      {metrics?.fees?.successful_transactions || 0} Successful Transactions
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-[#800000] border border-red-200 flex items-center justify-center">
                    <CreditCard className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">
                      Active Staff Tasks
                    </span>
                    <div className="text-2xl font-black text-slate-900 mt-1 font-mono">
                      {metrics?.tasks?.active_tasks || 0}
                    </div>
                    <span className={`text-[11px] font-semibold flex items-center gap-1 mt-1 ${
                      metrics?.tasks?.overdue_tasks > 0 ? 'text-red-600 font-bold' : 'text-slate-500'
                    }`}>
                      <AlertTriangle className="w-3 h-3" />
                      {metrics?.tasks?.overdue_tasks || 0} Overdue Alerts
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center">
                    <CheckSquare className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">
                      Diagnostic Pass Rate
                    </span>
                    <div className="text-2xl font-black text-emerald-700 mt-1 font-mono">
                      {metrics?.exams?.pass_rate || 0}%
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium mt-1 block">
                      Avg Score: {metrics?.exams?.avg_score || 0} / 100 Marks
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Category Breakdown Bar Chart */}
                <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 font-serif">
                        Candidate Category Distribution
                      </h4>
                      <p className="text-xs text-slate-500">Admissions quota reservation split</p>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      Live Database Sync
                    </span>
                  </div>
                  <div className="h-64 w-full pt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={analytics?.categories || []}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="category" tick={{ fill: '#64748b', fontSize: 11 }} />
                        <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '0.75rem', fontSize: '12px' }}
                        />
                        <Bar dataKey="count" fill="#800000" radius={[6, 6, 0, 0]}>
                          {(analytics?.categories || []).map((_entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={['#800000', '#0b1d3a', '#c59b27', '#2563eb', '#059669'][index % 5]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Application Funnel Chart */}
                <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 font-serif">
                        Application Verification Funnel
                      </h4>
                      <p className="text-xs text-slate-500">Pipeline from registration to shortlisting</p>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      ACID Relational Counts
                    </span>
                  </div>
                  <div className="h-64 w-full pt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={analytics?.funnel || []} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                        <XAxis type="number" tick={{ fill: '#64748b', fontSize: 11 }} />
                        <YAxis dataKey="status" type="category" tick={{ fill: '#64748b', fontSize: 11 }} width={100} />
                        <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '0.75rem', fontSize: '12px' }} />
                        <Bar dataKey="count" fill="#0b1d3a" radius={[0, 6, 6, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Recent Applications DataTable */}
              <div>
                <DataTable
                  title="Recent Qualifier Candidate Registrations"
                  subtitle="Latest candidate records provisioned and synchronized with the database"
                  columns={[
                    { key: 'application_no', label: 'Application No', sortable: true, render: r => <span className="font-mono font-bold text-[#800000]">{r.application_no}</span> },
                    { key: 'full_name', label: 'Candidate Name', sortable: true, render: r => <span className="font-semibold text-slate-900">{r.full_name}</span> },
                    { key: 'category', label: 'Category', sortable: true, render: r => <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold border border-slate-200">{r.category}</span> },
                    { key: 'status', label: 'Dossier Status', sortable: true, render: r => (
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase ${
                        r.status === 'shortlisted' ? 'bg-purple-100 text-purple-800' :
                        r.status === 'verified' ? 'bg-emerald-100 text-emerald-800' :
                        r.status === 'under_review' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {r.status}
                      </span>
                    )},
                    { key: 'submission_date', label: 'Registered Date', sortable: true, render: r => new Date(r.submission_date).toLocaleDateString() }
                  ]}
                  data={analytics?.recentApplications || []}
                  initialPageSize={5}
                />
              </div>

              {/* ================= ACTIVE STAFF PRESENCE & SESSION MONITOR WIDGET ================= */}
              <div className="bg-white rounded-2xl border border-sky-200 shadow-sm p-6 space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-50 text-[#800000] border border-red-200 flex items-center justify-center font-bold">
                      <Radio className="w-5 h-5 animate-pulse text-[#800000]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-base text-slate-900 font-serif">
                          Active Staff Presence & Session Monitor
                        </h3>
                        <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                          Live Telemetry Active
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Real-time tracking of which staff is in the site, exact login/logout times (WHEN), and session durations (HOW MUCH TIME)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center">
                    {lastStaffActivityRefreshed && (
                      <span className="text-[11px] text-slate-400 font-mono hidden md:inline">
                        Synced: {lastStaffActivityRefreshed.toLocaleTimeString()}
                      </span>
                    )}
                    <button
                      onClick={loadStaffActivityMonitor}
                      disabled={isStaffActivityLoading}
                      className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 text-slate-500 ${isStaffActivityLoading ? 'animate-spin' : ''}`} />
                      Refresh Presence
                    </button>
                  </div>
                </div>

                {/* Top Presence & Duration Summary Metric Badges (5 Cards) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                  <div className="bg-[#f0f7ff] rounded-xl p-3.5 border border-sky-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                        Active Staff Online
                      </span>
                      <div className="text-xl font-black text-emerald-700 mt-1 font-mono flex items-center gap-1">
                        <span>
                          {staffActivityData?.summary?.active_online_count ?? 0}
                          <span className="text-xs font-normal text-slate-500"> / {staffActivityData?.summary?.total_staff_count ?? 0}</span>
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 mt-0.5 block">
                        Currently logged in
                      </span>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shrink-0">
                      <UserCheck className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="bg-[#f0f7ff] rounded-xl p-3.5 border border-sky-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                        Team Time on Site Today
                      </span>
                      <div className="text-xl font-black text-blue-900 mt-1 font-mono">
                        {formatStaffDuration(staffActivityData?.summary?.total_staff_minutes_today)}
                      </div>
                      <span className="text-[10px] text-slate-500 mt-0.5 block">
                        Cumulative staff hours
                      </span>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="bg-[#f0f7ff] rounded-xl p-3.5 border border-sky-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                        Total Staff Roster
                      </span>
                      <div className="text-xl font-black text-[#800000] mt-1 font-mono">
                        {staffActivityData?.summary?.total_staff_count ?? 0}
                      </div>
                      <span className="text-[10px] text-slate-500 mt-0.5 block">
                        Officers provisioned
                      </span>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-red-100 text-[#800000] flex items-center justify-center font-bold shrink-0">
                      <Users className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="bg-[#f0f7ff] rounded-xl p-3.5 border border-sky-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                        Task Worklogs Today
                      </span>
                      <div className="text-xl font-black text-slate-800 mt-1 font-mono">
                        {staffActivityData?.summary?.tasks_updated_today ?? 0}
                      </div>
                      <span className="text-[10px] text-slate-500 mt-0.5 block">
                        Progress logs updated
                      </span>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold shrink-0">
                      <CheckSquare className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="bg-[#f0f7ff] rounded-xl p-3.5 border border-sky-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                        Dossiers Reviewed
                      </span>
                      <div className="text-xl font-black text-amber-700 mt-1 font-mono">
                        {staffActivityData?.summary?.verifications_reviewed_today ?? 0}
                      </div>
                      <span className="text-[10px] text-slate-500 mt-0.5 block">
                        Verifications today
                      </span>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold shrink-0">
                      <FileCheck2 className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Sub-Tab Navigation Bar */}
                <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
                  <button
                    onClick={() => setStaffMonitorSubTab('roster')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                      staffMonitorSubTab === 'roster'
                        ? 'bg-[#800000] text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Live Staff Presence & Daily Time</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                      staffMonitorSubTab === 'roster' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700 font-bold'
                    }`}>
                      {staffActivityData?.summary?.active_online_count ?? 0} Online
                    </span>
                  </button>

                  <button
                    onClick={() => setStaffMonitorSubTab('sessions')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                      staffMonitorSubTab === 'sessions'
                        ? 'bg-[#800000] text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>When & How Much Time (Session History Ledger)</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                      staffMonitorSubTab === 'sessions' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700 font-bold'
                    }`}>
                      {staffActivityData?.sessionHistory?.length ?? 0} Sessions
                    </span>
                  </button>

                  <button
                    onClick={() => setStaffMonitorSubTab('audit')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                      staffMonitorSubTab === 'audit'
                        ? 'bg-[#800000] text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <Activity className="w-3.5 h-3.5" />
                    <span>Operational Audit Feed</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                      staffMonitorSubTab === 'audit' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700 font-bold'
                    }`}>
                      {staffActivityData?.recentStaffLogs?.length ?? 0}
                    </span>
                  </button>
                </div>

                {/* ================= SUB-TAB 1: LIVE STAFF PRESENCE & DAILY TIME ================= */}
                {staffMonitorSubTab === 'roster' && (
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 font-serif">
                          Staff Officer Roster: Live Presence, Session Start & Total Time Today
                        </h4>
                        <p className="text-xs text-slate-500">
                          Shows which staff is currently online, their current session start time, active duration, and cumulative time spent on the ERP today.
                        </p>
                      </div>
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-slate-200">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                            <th className="py-3 px-4">Staff Officer</th>
                            <th className="py-3 px-4">Designation & Department</th>
                            <th className="py-3 px-4">Presence Status & IP</th>
                            <th className="py-3 px-4">Current Session Start (WHEN)</th>
                            <th className="py-3 px-4">Active Duration</th>
                            <th className="py-3 px-4">Total Time on Site Today</th>
                            <th className="py-3 px-4">Workload & Latest Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                          {(!staffActivityData?.staffPresence || staffActivityData.staffPresence.length === 0) ? (
                            <tr>
                              <td colSpan={7} className="py-8 text-center text-slate-400">
                                <Users className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                                <p className="font-semibold text-slate-600">No staff accounts registered yet.</p>
                                <p className="text-[11px] text-slate-400 mt-1">
                                  Use the Auto-Generate ID tool or approve staff registration requests to populate the roster.
                                </p>
                              </td>
                            </tr>
                          ) : (
                            staffActivityData.staffPresence.map((officer: any) => (
                              <tr key={officer.id} className="hover:bg-sky-50/50 transition-colors">
                                <td className="py-3 px-4">
                                  <div className="font-bold text-slate-900">{officer.full_name}</div>
                                  <div className="text-[11px] text-slate-500 font-mono">
                                    @{officer.username} • <span className="text-[#800000] font-semibold">{officer.user_code}</span>
                                  </div>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="font-medium text-slate-800">{officer.designation || 'Staff Officer'}</div>
                                  <div className="text-[11px] text-slate-500">{officer.department}</div>
                                </td>
                                <td className="py-3 px-4">
                                  {officer.is_online ? (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-[11px]">
                                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                      Online Active Now
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 border border-slate-200 text-[11px] font-medium">
                                      Offline
                                    </span>
                                  )}
                                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                                    IP: {officer.ip_address || '127.0.0.1'}
                                  </div>
                                </td>
                                <td className="py-3 px-4 text-slate-700">
                                  {officer.login_time ? (
                                    <div>
                                      <div className="font-medium">
                                        {new Date(officer.login_time).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                                      </div>
                                      <div className="text-[11px] text-slate-400 font-mono">
                                        {new Date(officer.login_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                      </div>
                                    </div>
                                  ) : (
                                    <span className="text-slate-400 italic">No session recorded</span>
                                  )}
                                </td>
                                <td className="py-3 px-4 font-mono">
                                  {officer.is_online ? (
                                    <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-xs inline-block">
                                      {formatStaffDuration(officer.session_duration_minutes)}
                                    </span>
                                  ) : (
                                    <span className="text-slate-400">-</span>
                                  )}
                                </td>
                                <td className="py-3 px-4 font-mono">
                                  <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200 font-bold text-xs inline-block">
                                    {formatStaffDuration(officer.total_time_today_minutes)}
                                  </span>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="text-[11px] text-slate-600 mb-1">
                                    <span className="font-semibold text-slate-800">{officer.active_tasks || 0}</span> active tasks • <span className="font-semibold text-slate-800">{officer.completed_tasks || 0}</span> done
                                  </div>
                                  <span className="inline-block max-w-[200px] truncate text-[10px] px-2 py-0.5 rounded bg-slate-50 text-slate-700 border border-slate-200 font-mono" title={officer.last_action}>
                                    {officer.last_action || 'Signed in to Staff Operations Center'}
                                  </span>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* ================= SUB-TAB 2: WHEN & HOW MUCH TIME (SESSION HISTORY LEDGER) ================= */}
                {staffMonitorSubTab === 'sessions' && (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 font-serif">
                          Session History Ledger: When Logged In, When Logged Out & Total Time on Site
                        </h4>
                        <p className="text-xs text-slate-500">
                          Complete chronological audit of every staff login session: exact timestamps and total time spent on the ERP.
                        </p>
                      </div>

                      {/* Search & Filter Controls */}
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="relative">
                          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                          <input
                            type="text"
                            placeholder="Search officer or IP..."
                            value={sessionSearch}
                            onChange={(e) => setSessionSearch(e.target.value)}
                            className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:border-[#800000] w-48"
                          />
                        </div>

                        <select
                          value={sessionFilterStatus}
                          onChange={(e: any) => setSessionFilterStatus(e.target.value)}
                          className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-700 focus:outline-none focus:border-[#800000]"
                        >
                          <option value="all">All Sessions</option>
                          <option value="active">Active Now Only</option>
                          <option value="concluded">Concluded Only</option>
                        </select>
                      </div>
                    </div>

                    {/* Sessions Table */}
                    {(() => {
                      const allSessions = staffActivityData?.sessionHistory || [];
                      const filteredSessions = allSessions.filter((s: any) => {
                        const matchesSearch = sessionSearch === '' ||
                          (s.full_name && s.full_name.toLowerCase().includes(sessionSearch.toLowerCase())) ||
                          (s.username && s.username.toLowerCase().includes(sessionSearch.toLowerCase())) ||
                          (s.ip_address && s.ip_address.includes(sessionSearch));
                        const matchesStatus = sessionFilterStatus === 'all' ||
                          (sessionFilterStatus === 'active' && s.is_currently_online) ||
                          (sessionFilterStatus === 'concluded' && !s.is_currently_online);
                        return matchesSearch && matchesStatus;
                      });

                      if (filteredSessions.length === 0) {
                        return (
                          <div className="p-8 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500">
                            <Clock className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                            <p className="font-semibold text-slate-700">No session logs match your criteria.</p>
                            <p className="text-[11px] text-slate-400 mt-1">
                              When staff officers sign in and interact with the ERP, their exact login and logout timestamps are recorded here.
                            </p>
                          </div>
                        );
                      }

                      return (
                        <div className="overflow-x-auto rounded-xl border border-slate-200">
                          <table className="w-full text-left text-xs border-collapse">
                            <thead>
                              <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                                <th className="py-3 px-4">Session ID & Officer</th>
                                <th className="py-3 px-4">Designation & Department</th>
                                <th className="py-3 px-4">Session Status</th>
                                <th className="py-3 px-4">WHEN Logged In (Start Time)</th>
                                <th className="py-3 px-4">WHEN Logged Out (End Time)</th>
                                <th className="py-3 px-4">HOW MUCH TIME (Duration)</th>
                                <th className="py-3 px-4">IP & Last Recorded Action</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 bg-white">
                              {filteredSessions.map((session: any) => (
                                <tr key={session.id} className="hover:bg-sky-50/50 transition-colors">
                                  <td className="py-3 px-4">
                                    <div className="font-bold text-slate-900">{session.full_name}</div>
                                    <div className="text-[11px] text-slate-500 font-mono">
                                      @{session.username} • <span className="text-[#800000]">Session #{session.id}</span>
                                    </div>
                                  </td>
                                  <td className="py-3 px-4">
                                    <div className="font-medium text-slate-800">{session.designation || 'Staff Officer'}</div>
                                    <div className="text-[11px] text-slate-500">{session.department || 'Academic Directorate'}</div>
                                  </td>
                                  <td className="py-3 px-4">
                                    {session.is_currently_online ? (
                                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-[10px]">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                                        ACTIVE ON SITE NOW
                                      </span>
                                    ) : (
                                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 text-[10px] font-medium">
                                        CONCLUDED
                                      </span>
                                    )}
                                  </td>
                                  <td className="py-3 px-4">
                                    {session.login_time ? (
                                      <div>
                                        <div className="font-medium text-slate-800">
                                          {new Date(session.login_time).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </div>
                                        <div className="text-[11px] text-slate-500 font-mono">
                                          {new Date(session.login_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                        </div>
                                      </div>
                                    ) : (
                                      <span className="text-slate-400 italic">Unknown</span>
                                    )}
                                  </td>
                                  <td className="py-3 px-4">
                                    {session.logout_time ? (
                                      <div>
                                        <div className="font-medium text-slate-800">
                                          {new Date(session.logout_time).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </div>
                                        <div className="text-[11px] text-slate-500 font-mono">
                                          {new Date(session.logout_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                        </div>
                                      </div>
                                    ) : session.is_currently_online ? (
                                      <span className="text-emerald-700 font-semibold text-[11px] flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                        Active in portal
                                      </span>
                                    ) : (
                                      <span className="text-slate-400 text-[11px] italic">
                                        Auto-concluded
                                      </span>
                                    )}
                                  </td>
                                  <td className="py-3 px-4 font-mono">
                                    <span className={`px-2.5 py-1 rounded-lg border font-bold text-xs inline-block ${
                                      session.is_currently_online
                                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                        : 'bg-slate-100 text-slate-800 border-slate-200'
                                    }`}>
                                      {formatStaffDuration(session.duration_minutes)}
                                    </span>
                                  </td>
                                  <td className="py-3 px-4">
                                    <div className="font-mono text-[10px] text-slate-500 mb-0.5">
                                      IP: {session.ip_address || '127.0.0.1'}
                                    </div>
                                    <span className="inline-block max-w-[200px] truncate text-[10px] px-2 py-0.5 rounded bg-slate-50 text-slate-700 border border-slate-200 font-mono" title={session.last_action}>
                                      {session.last_action || 'Staff session logged'}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* ================= SUB-TAB 3: OPERATIONAL AUDIT FEED ================= */}
                {staffMonitorSubTab === 'audit' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 font-serif">
                          Real-Time Staff Operational Audit Stream
                        </h4>
                        <p className="text-xs text-slate-500">
                          Live chronological feed of actions performed by staff officers (document reviews, task progression, logins, signouts)
                        </p>
                      </div>
                    </div>

                    {(!staffActivityData?.recentStaffLogs || staffActivityData.recentStaffLogs.length === 0) ? (
                      <div className="p-8 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500">
                        No operational actions logged by staff members yet.
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {staffActivityData.recentStaffLogs.slice(0, 9).map((log: any) => {
                          let parsedDetails: any = {};
                          try {
                            parsedDetails = typeof log.details_json === 'string' ? JSON.parse(log.details_json) : log.details_json || {};
                          } catch (e) {
                            parsedDetails = {};
                          }

                          return (
                            <div key={log.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white transition-all space-y-1.5 shadow-2xs">
                              <div className="flex items-center justify-between gap-2">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider font-mono ${
                                  log.action.includes('DOCUMENT') ? 'bg-amber-100 text-amber-800' :
                                  log.action.includes('TASK') ? 'bg-blue-100 text-blue-800' :
                                  log.action.includes('LOGIN') ? 'bg-emerald-100 text-emerald-800' :
                                  log.action.includes('LOGOUT') ? 'bg-red-100 text-[#800000]' :
                                  'bg-purple-100 text-purple-800'
                                }`}>
                                  {log.action.replace(/_/g, ' ')}
                                </span>
                                <span className="text-[10px] text-slate-400 font-mono">
                                  {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>

                              <div className="text-xs font-semibold text-slate-800">
                                {log.staff_name} <span className="text-slate-400 font-mono text-[11px]">({log.staff_code || log.staff_username})</span>
                              </div>

                              <p className="text-[11px] text-slate-600 line-clamp-2">
                                {log.action === 'DOCUMENT_VERIFICATION' && (
                                  <>Verified {parsedDetails.docType || 'doc'} as <span className="font-semibold text-slate-900">{parsedDetails.status}</span> for candidate dossier</>
                                )}
                                {log.action === 'TASK_ASSIGNED' && (
                                  <>Task assigned: "{parsedDetails.title}"</>
                                )}
                                {log.action === 'USER_LOGIN' && (
                                  <>Authenticated session initiated via Operations Gate</>
                                )}
                                {log.action === 'USER_LOGOUT' && (
                                  <>Session ended and signed out from ERP</>
                                )}
                                {!['DOCUMENT_VERIFICATION', 'TASK_ASSIGNED', 'USER_LOGIN', 'USER_LOGOUT'].includes(log.action) && (
                                  <>{log.entity_type} #{log.entity_id}: {JSON.stringify(parsedDetails)}</>
                                )}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================= TAB: PENDING APPROVALS QUEUE & CREDENTIAL ACTIVATION ================= */}
          {activeTab === 'approvals' && (
            <ErrorBoundary sectionName="Pending Approvals & Verification Queue">
              {(() => {
                const safePending = Array.isArray(pendingApprovals) ? pendingApprovals : [];
                const totalPendingCount = pendingCounts?.total_pending ?? safePending.length;
                const studentPendingCount = pendingCounts?.pending_students ?? safePending.filter(p => p?.role === 'student').length;
                const employeePendingCount = pendingCounts?.pending_employees ?? safePending.filter(p => p?.role === 'employee').length;

                const filteredRequests = safePending.filter((req) => {
                  if (!req) return false;
                  const matchesRole = approvalFilter === 'all' || req.role === approvalFilter;
                  if (!matchesRole) return false;
                  if (!approvalSearchQuery.trim()) return true;
                  const q = approvalSearchQuery.toLowerCase().trim();
                  const name = (req.full_name || '').toLowerCase();
                  const uname = (req.username || '').toLowerCase();
                  const mail = (req.email || '').toLowerCase();
                  const phone = (req.phone || '').toLowerCase();
                  const dept = (req.department || '').toLowerCase();
                  const desig = (req.designation || '').toLowerCase();
                  const city = (req.city || '').toLowerCase();
                  const state = (req.state || '').toLowerCase();
                  return (
                    name.includes(q) ||
                    uname.includes(q) ||
                    mail.includes(q) ||
                    phone.includes(q) ||
                    dept.includes(q) ||
                    desig.includes(q) ||
                    city.includes(q) ||
                    state.includes(q)
                  );
                });

                return (
                  <div className="space-y-6">
                    {/* Section Header */}
                    <div className="bg-white p-5 rounded-2xl border border-sky-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-red-100 text-[#800000] border border-red-200 uppercase font-mono">
                            Authorization Gate
                          </span>
                          <span className="text-xs text-slate-500 font-mono">
                            IIT Kharagpur Academic Council Regulations
                          </span>
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 mt-1 font-serif">
                          Pending Registration Approvals & Credential Activation
                        </h2>
                        <p className="text-xs text-slate-600 mt-0.5">
                          Prospective students and staff account requests must be reviewed and authorized by the Super Admin before login permissions are activated.
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={loadPendingApprovals}
                          disabled={isRefreshingApprovals}
                          className="px-3.5 py-2 rounded-xl bg-white border border-sky-300 text-slate-700 text-xs font-bold hover:bg-sky-50 flex items-center gap-1.5 transition-colors shadow-xs disabled:opacity-50"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 text-slate-600 ${isRefreshingApprovals ? 'animate-spin' : ''}`} />
                          Refresh Queue
                        </button>
                      </div>
                    </div>

                    {/* Metric Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-white p-5 rounded-2xl border border-sky-200 shadow-sm flex items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">
                            Total In Queue
                          </span>
                          <div className="text-3xl font-black text-[#800000] mt-1 font-serif">
                            {totalPendingCount}
                          </div>
                          <span className="text-[11px] text-slate-500 font-medium">Awaiting Super Admin Decision</span>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-red-50 text-[#800000] border border-red-200 flex items-center justify-center">
                          <Clock className="w-6 h-6" />
                        </div>
                      </div>

                      <div className="bg-white p-5 rounded-2xl border border-sky-200 shadow-sm flex items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">
                            Student Candidates
                          </span>
                          <div className="text-3xl font-black text-sky-800 mt-1 font-serif">
                            {studentPendingCount}
                          </div>
                          <span className="text-[11px] text-slate-500 font-medium">BS Qualifier Applicants</span>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-700 border border-sky-200 flex items-center justify-center">
                          <GraduationCap className="w-6 h-6" />
                        </div>
                      </div>

                      <div className="bg-white p-5 rounded-2xl border border-sky-200 shadow-sm flex items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">
                            Staff Registrations
                          </span>
                          <div className="text-3xl font-black text-indigo-900 mt-1 font-serif">
                            {employeePendingCount}
                          </div>
                          <span className="text-[11px] text-slate-500 font-medium">Academic & Verification Officers</span>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center justify-center">
                          <UserCheck className="w-6 h-6" />
                        </div>
                      </div>
                    </div>

                    {/* Filter, Search & View Controls */}
                    <div className="bg-white p-4 rounded-2xl border border-sky-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
                      {/* Left: Role Filter Tabs */}
                      <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                        <button
                          onClick={() => setApprovalFilter('all')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            approvalFilter === 'all'
                              ? 'bg-[#800000] text-white shadow-xs'
                              : 'bg-white border border-sky-200 text-slate-600 hover:bg-sky-50'
                          }`}
                        >
                          All Requests ({safePending.length})
                        </button>
                        <button
                          onClick={() => setApprovalFilter('student')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            approvalFilter === 'student'
                              ? 'bg-[#800000] text-white shadow-xs'
                              : 'bg-white border border-sky-200 text-slate-600 hover:bg-sky-50'
                          }`}
                        >
                          Students Only ({safePending.filter(p => p?.role === 'student').length})
                        </button>
                        <button
                          onClick={() => setApprovalFilter('employee')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            approvalFilter === 'employee'
                              ? 'bg-[#800000] text-white shadow-xs'
                              : 'bg-white border border-sky-200 text-slate-600 hover:bg-sky-50'
                          }`}
                        >
                          Staff Only ({safePending.filter(p => p?.role === 'employee').length})
                        </button>
                      </div>

                      {/* Right: Search & View Mode Switcher */}
                      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                        <div className="relative flex-1 sm:w-64">
                          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={approvalSearchQuery}
                            onChange={(e) => setApprovalSearchQuery(e.target.value)}
                            placeholder="Filter by name, username, email..."
                            className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-sky-200 bg-[#f8fafc] text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#800000]/20 focus:border-[#800000]"
                          />
                          {approvalSearchQuery && (
                            <button
                              onClick={() => setApprovalSearchQuery('')}
                              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                            >
                              ✕
                            </button>
                          )}
                        </div>

                        <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 shrink-0">
                          <button
                            onClick={() => setApprovalViewMode('table')}
                            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                              approvalViewMode === 'table'
                                ? 'bg-white text-slate-900 shadow-xs'
                                : 'text-slate-500 hover:text-slate-800'
                            }`}
                            title="Data Table View"
                          >
                            <Table className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setApprovalViewMode('cards')}
                            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                              approvalViewMode === 'cards'
                                ? 'bg-white text-slate-900 shadow-xs'
                                : 'text-slate-500 hover:text-slate-800'
                            }`}
                            title="Detailed Cards View"
                          >
                            <LayoutGrid className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Pending Requests Content */}
                    {filteredRequests.length === 0 ? (
                      <div className="bg-white rounded-2xl p-12 border border-sky-200 shadow-xs text-center space-y-4">
                        <div className="w-16 h-16 rounded-2xl bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center mx-auto">
                          <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-lg font-bold text-slate-900 font-serif">
                            No pending student or staff approval requests found at this time.
                          </h3>
                          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                            {approvalSearchQuery
                              ? `No requests match the query "${approvalSearchQuery}". Clear search filter to view all pending candidates.`
                              : 'All candidate and employee registration requests have been reviewed and processed. New registration submissions will appear here automatically for Super Admin authorization.'}
                          </p>
                        </div>
                        <div className="pt-2">
                          <button
                            onClick={loadPendingApprovals}
                            disabled={isRefreshingApprovals}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-sky-300 text-slate-700 text-xs font-bold hover:bg-sky-50 transition-colors shadow-xs disabled:opacity-50"
                          >
                            <RefreshCw className={`w-3.5 h-3.5 text-slate-600 ${isRefreshingApprovals ? 'animate-spin' : ''}`} />
                            Refresh Queue
                          </button>
                        </div>
                      </div>
                    ) : approvalViewMode === 'table' ? (
                      /* ================= DATA TABLE VIEW ================= */
                      <div className="bg-white rounded-2xl border border-sky-200 shadow-xs overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="bg-[#f0f7ff] border-b border-sky-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider font-mono">
                                <th className="py-3.5 px-4">Candidate / Staff</th>
                                <th className="py-3.5 px-4">Role & Classification</th>
                                <th className="py-3.5 px-4">Academic / Department</th>
                                <th className="py-3.5 px-4">Contact & Location</th>
                                <th className="py-3.5 px-4">Submitted Date</th>
                                <th className="py-3.5 px-4 text-right">Verification Action</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-sky-100 text-xs">
                              {filteredRequests.map((req) => (
                                <tr key={req.id} className="hover:bg-sky-50/50 transition-colors">
                                  {/* Candidate / Staff Info */}
                                  <td className="py-3.5 px-4">
                                    <div className="font-bold text-slate-900 font-serif text-sm">
                                      {req.full_name || 'N/A'}
                                    </div>
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                      <span className="font-mono text-[11px] font-semibold text-[#800000]">
                                        @{req.username || 'unspecified'}
                                      </span>
                                    </div>
                                  </td>

                                  {/* Role & Classification */}
                                  <td className="py-3.5 px-4">
                                    <div className="flex flex-col gap-1 items-start">
                                      <span
                                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider font-mono ${
                                          req.role === 'student'
                                            ? 'bg-sky-100 text-sky-900 border border-sky-300'
                                            : 'bg-indigo-100 text-indigo-900 border border-indigo-300'
                                        }`}
                                      >
                                        {req.role === 'student' ? 'BS Qualifier Candidate' : 'Staff Officer'}
                                      </span>
                                      <span className="px-2 py-0.2 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 font-mono">
                                        Pending Verification
                                      </span>
                                    </div>
                                  </td>

                                  {/* Academic / Department Qualification */}
                                  <td className="py-3.5 px-4">
                                    {req.role === 'student' ? (
                                      <div className="space-y-0.5 text-xs">
                                        <div className="flex items-center gap-1.5">
                                          <span className="px-1.5 py-0.2 bg-red-50 text-[#800000] border border-red-200 rounded font-mono text-[10px] font-bold">
                                            {req.category || 'GEN'}
                                          </span>
                                          <span className="font-semibold text-slate-800">
                                            {req.percentage_12th ? `${req.percentage_12th}%` : 'N/A'}
                                          </span>
                                          <span className="text-slate-500 text-[11px]">
                                            ({req.stream_12th || 'Standard'})
                                          </span>
                                        </div>
                                        {req.guardian_name && (
                                          <div className="text-[11px] text-slate-500">
                                            Guardian: {req.guardian_name}
                                          </div>
                                        )}
                                      </div>
                                    ) : (
                                      <div className="space-y-0.5 text-xs">
                                        <div className="font-semibold text-[#800000]">
                                          {req.department || 'Admissions & Operations'}
                                        </div>
                                        <div className="text-[11px] text-slate-600">
                                          {req.designation || 'Verification Officer'}
                                        </div>
                                      </div>
                                    )}
                                  </td>

                                  {/* Contact & Location */}
                                  <td className="py-3.5 px-4 text-xs text-slate-600">
                                    <div className="space-y-1">
                                      <div className="flex items-center gap-1">
                                        <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                        <span className="truncate max-w-[180px]">{req.email || 'N/A'}</span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                        <span>{req.phone || 'N/A'}</span>
                                      </div>
                                      {(req.city || req.state) && (
                                        <div className="flex items-center gap-1 text-[11px] text-slate-500">
                                          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                                          <span>{[req.city, req.state].filter(Boolean).join(', ')}</span>
                                        </div>
                                      )}
                                    </div>
                                  </td>

                                  {/* Submitted Date */}
                                  <td className="py-3.5 px-4">
                                    <div className="flex items-center gap-1.5 text-xs text-slate-600 font-mono">
                                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                                      <span>
                                        {req.created_at
                                          ? new Date(req.created_at).toLocaleString('en-IN', {
                                              dateStyle: 'medium',
                                              timeStyle: 'short'
                                            })
                                          : 'N/A'}
                                      </span>
                                    </div>
                                  </td>

                                  {/* Verification Actions */}
                                  <td className="py-3.5 px-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                      <button
                                        type="button"
                                        disabled={approvingId === req.id || rejectingId === req.id}
                                        onClick={() => handleRejectRegistration(req.id)}
                                        className="px-3 py-1.5 rounded-xl border border-red-200 bg-white hover:bg-red-50 text-red-700 text-xs font-bold transition-colors disabled:opacity-50"
                                      >
                                        {rejectingId === req.id ? 'Rejecting...' : 'Reject'}
                                      </button>

                                      <button
                                        type="button"
                                        disabled={approvingId === req.id || rejectingId === req.id}
                                        onClick={() => handleApproveRegistration(req.id)}
                                        className="px-3.5 py-1.5 rounded-xl bg-[#800000] hover:bg-[#660000] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all active:scale-98 disabled:opacity-50"
                                      >
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                                        {approvingId === req.id ? 'Approving...' : 'Approve'}
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : (
                      /* ================= DETAILED CARDS VIEW ================= */
                      <div className="space-y-4">
                        {filteredRequests.map((req) => (
                          <div
                            key={req.id}
                            className="bg-white rounded-2xl p-5 border border-sky-200 shadow-sm hover:shadow-md transition-shadow flex flex-col lg:flex-row lg:items-center justify-between gap-5"
                          >
                            <div className="space-y-2 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span
                                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider font-mono ${
                                    req.role === 'student'
                                      ? 'bg-sky-100 text-sky-900 border border-sky-300'
                                      : 'bg-indigo-100 text-indigo-900 border border-indigo-300'
                                  }`}
                                >
                                  {req.role === 'student' ? 'Qualifier Candidate' : 'Staff Officer'}
                                </span>
                                <span className="text-xs font-mono text-slate-400">
                                  Submitted: {req.created_at ? new Date(req.created_at).toLocaleString() : 'N/A'}
                                </span>
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 font-mono">
                                  Pending Verification
                                </span>
                              </div>

                              <div>
                                <h4 className="text-base font-bold text-slate-900 font-serif">
                                  {req.full_name || 'N/A'}
                                </h4>
                                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 mt-0.5">
                                  <span className="font-mono font-semibold text-[#800000]">
                                    Username: {req.username || 'N/A'}
                                  </span>
                                  <span>•</span>
                                  <span className="flex items-center gap-1">
                                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                                    {req.email || 'N/A'}
                                  </span>
                                  <span>•</span>
                                  <span className="flex items-center gap-1">
                                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                                    {req.phone || 'N/A'}
                                  </span>
                                </div>
                              </div>

                              {/* Role Details */}
                              <div className="p-3 bg-[#f0f7ff] rounded-xl border border-sky-100 text-xs text-slate-700 flex flex-wrap gap-x-6 gap-y-1">
                                {req.role === 'student' ? (
                                  <>
                                    <div>
                                      <span className="text-slate-500 font-mono text-[11px]">Category: </span>
                                      <strong className="text-[#800000]">{req.category || 'GEN'}</strong>
                                    </div>
                                    <div>
                                      <span className="text-slate-500 font-mono text-[11px]">12th Marks: </span>
                                      <strong>
                                        {req.percentage_12th ? `${req.percentage_12th}%` : 'N/A'} ({req.stream_12th || 'Standard'})
                                      </strong>
                                    </div>
                                    {(req.city || req.state) && (
                                      <div>
                                        <span className="text-slate-500 font-mono text-[11px]">Location: </span>
                                        <span>{[req.city, req.state].filter(Boolean).join(', ')}</span>
                                      </div>
                                    )}
                                    {req.guardian_name && (
                                      <div>
                                        <span className="text-slate-500 font-mono text-[11px]">Guardian: </span>
                                        <span>{req.guardian_name}</span>
                                      </div>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    <div>
                                      <span className="text-slate-500 font-mono text-[11px]">Department: </span>
                                      <strong className="text-[#800000]">{req.department || 'Admissions & Operations'}</strong>
                                    </div>
                                    <div>
                                      <span className="text-slate-500 font-mono text-[11px]">Designation: </span>
                                      <strong>{req.designation || 'Verification Officer'}</strong>
                                    </div>
                                    {(req.city || req.state) && (
                                      <div>
                                        <span className="text-slate-500 font-mono text-[11px]">Location: </span>
                                        <span>{[req.city, req.state].filter(Boolean).join(', ')}</span>
                                      </div>
                                    )}
                                  </>
                                )}
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-2.5 shrink-0 self-end lg:self-center">
                              <button
                                type="button"
                                disabled={approvingId === req.id || rejectingId === req.id}
                                onClick={() => handleRejectRegistration(req.id)}
                                className="px-3.5 py-2 rounded-xl border border-red-200 bg-white hover:bg-red-50 text-red-700 text-xs font-bold transition-colors disabled:opacity-50"
                              >
                                {rejectingId === req.id ? 'Rejecting...' : 'Reject'}
                              </button>

                              <button
                                type="button"
                                disabled={approvingId === req.id || rejectingId === req.id}
                                onClick={() => handleApproveRegistration(req.id)}
                                className="px-4 py-2 rounded-xl bg-[#800000] hover:bg-[#660000] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all active:scale-98 disabled:opacity-50"
                              >
                                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                                {approvingId === req.id ? 'Activating Credentials...' : 'Approve / Grant Permission'}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()}
            </ErrorBoundary>
          )}

          {/* ================= TAB 2: STAFF & CREDENTIALS WITH DATA TABLE ================= */}
          {activeTab === 'employees' && (
            <div className="space-y-6">
              {/* Top summary cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">Total Staff Assigned</span>
                  <div className="text-2xl font-bold text-slate-900 mt-1 font-serif">{employees.length}</div>
                  <span className="text-[11px] text-slate-400">Restricted RBAC Access Only</span>
                </div>
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">Active Workload Capacity</span>
                  <div className="text-2xl font-bold text-blue-700 mt-1 font-mono">
                    {employees.reduce((acc, e) => acc + parseInt(e.active_tasks || 0, 10), 0)} Tasks
                  </div>
                  <span className="text-[11px] text-slate-400">Distributed across operational officers</span>
                </div>
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">Average Task Progress</span>
                  <div className="text-2xl font-bold text-emerald-700 mt-1 font-mono">
                    {employees.length > 0 ? Math.round(employees.reduce((acc, e) => acc + parseFloat(e.avg_progress_pct || 0), 0) / employees.length) : 0}%
                  </div>
                  <span className="text-[11px] text-slate-400">Real-time workflow execution</span>
                </div>
              </div>

              {/* DataTable for Employees */}
              <DataTable
                title="Academic Operations Staff & Credentials Roster"
                subtitle="Admin-authorized personnel accounts. All credentials generated via Super Admin Authorization Gate."
                searchPlaceholder="Search staff by name, code, designation, department..."
                searchKeys={['full_name', 'user_code', 'username', 'email', 'designation', 'department']}
                filterConfigs={[
                  {
                    key: 'department',
                    label: 'Department',
                    options: [
                      { label: 'Admissions & Document Verification', value: 'Admissions & Document Verification' },
                      { label: 'Evaluation & Cutoffs Directorate', value: 'Evaluation & Cutoffs Directorate' },
                      { label: 'Academic Operations', value: 'Academic Operations' }
                    ]
                  }
                ]}
                columns={[
                  { key: 'user_code', label: 'Employee ID', sortable: true, render: r => <span className="font-mono font-bold text-[#800000]">{r.user_code}</span> },
                  { key: 'full_name', label: 'Staff Member', sortable: true, render: r => (
                    <div>
                      <div className="font-semibold text-slate-900">{r.full_name}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{r.email}</div>
                    </div>
                  )},
                  { key: 'designation', label: 'Designation & Dept', sortable: true, render: r => (
                    <div>
                      <span className="font-medium text-slate-800">{r.designation}</span>
                      <span className="block text-[11px] text-slate-500">{r.department}</span>
                    </div>
                  )},
                  { key: 'active_tasks', label: 'Active Tasks', sortable: true, render: r => (
                    <span className="px-2 py-0.5 rounded font-mono font-bold bg-blue-50 text-blue-800 border border-blue-200">
                      {r.active_tasks || 0} active
                    </span>
                  )},
                  { key: 'avg_progress_pct', label: 'Workflow Progress', sortable: true, render: r => (
                    <div className="w-28 space-y-1">
                      <div className="flex justify-between text-[10px] font-mono">
                        <span>{r.avg_progress_pct || 0}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-[#800000] h-1.5 rounded-full transition-all"
                          style={{ width: `${Math.min(100, r.avg_progress_pct || 0)}%` }}
                        />
                      </div>
                    </div>
                  )},
                  { key: 'status', label: 'Status', sortable: true, render: r => (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {r.status || 'Active'}
                    </span>
                  )},
                  { key: 'actions', label: 'Credentials', render: r => (
                    <button
                      onClick={() => copyToClipboard(`Username: ${r.username}\nStaff ID: ${r.user_code}\nEmail: ${r.email}`, `staff_${r.id}`)}
                      className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] flex items-center gap-1 transition-colors"
                      title="Copy Staff Credentials"
                    >
                      {copiedField === `staff_${r.id}` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-slate-500" />}
                      <span>{copiedField === `staff_${r.id}` ? 'Copied' : 'Copy'}</span>
                    </button>
                  )}
                ]}
                data={employees}
                initialPageSize={10}
                actions={
                  <button
                    onClick={() => {
                      setShowCredentialModal(true);
                      setCredentialModalType('employee');
                      setGeneratedCredentialVoucher(null);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#800000] hover:bg-[#6b0000] text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <UserPlus className="w-3.5 h-3.5 text-amber-300" />
                    Auto-Generate Staff ID
                  </button>
                }
              />
            </div>
          )}

          {/* ================= TAB 3: TASKS & WORKFLOW ("Kaj o Progress" ENGINE) ================= */}
          {activeTab === 'tasks' && (
            <div className="space-y-6">
              {/* Task Metrics Header */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">Total Tasks</span>
                  <div className="text-2xl font-bold text-slate-900 mt-1 font-serif">{tasks.length}</div>
                </div>
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">In Progress</span>
                  <div className="text-2xl font-bold text-blue-700 mt-1 font-mono">
                    {tasks.filter(t => t.status === 'in_progress').length}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">Overdue Alerts</span>
                  <div className={`text-2xl font-bold mt-1 font-mono ${
                    tasks.filter(t => t.is_overdue && t.status !== 'completed').length > 0 ? 'text-red-600 font-extrabold' : 'text-slate-900'
                  }`}>
                    {tasks.filter(t => t.is_overdue && t.status !== 'completed').length}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">Completed</span>
                  <div className="text-2xl font-bold text-emerald-700 mt-1 font-mono">
                    {tasks.filter(t => t.status === 'completed').length}
                  </div>
                </div>
              </div>

              {/* DataTable for Tasks */}
              <DataTable
                title="Employee Workflow & Real-Time Task Ledger"
                subtitle="Live task assignment, real-time 0-100% progress tracking, and automated overdue warning flags"
                searchPlaceholder="Search task code, title, assigned staff member..."
                searchKeys={['task_code', 'title', 'assigned_to_name', 'category']}
                filterConfigs={[
                  {
                    key: 'status',
                    label: 'Status',
                    options: [
                      { label: 'Not Started', value: 'not_started' },
                      { label: 'In Progress', value: 'in_progress' },
                      { label: 'Under Review', value: 'under_review' },
                      { label: 'Completed', value: 'completed' }
                    ]
                  },
                  {
                    key: 'priority',
                    label: 'Priority',
                    options: [
                      { label: 'Urgent', value: 'urgent' },
                      { label: 'High', value: 'high' },
                      { label: 'Medium', value: 'medium' },
                      { label: 'Low', value: 'low' }
                    ]
                  }
                ]}
                columns={[
                  { key: 'task_code', label: 'Task Code', sortable: true, render: r => <span className="font-mono font-bold text-[#800000]">{r.task_code}</span> },
                  { key: 'title', label: 'Task Title & Category', sortable: true, render: r => (
                    <div>
                      <div className="font-semibold text-slate-900 line-clamp-1">{r.title}</div>
                      <div className="text-[10px] text-slate-500 uppercase font-mono">{r.category}</div>
                    </div>
                  )},
                  { key: 'priority', label: 'Priority', sortable: true, render: r => (
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      r.priority === 'urgent' ? 'bg-red-100 text-red-800 border border-red-300' :
                      r.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                      r.priority === 'medium' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {r.priority}
                    </span>
                  )},
                  { key: 'assigned_to_name', label: 'Assigned Staff', sortable: true, render: r => (
                    <span className="font-medium text-slate-800">{r.assigned_to_name}</span>
                  )},
                  { key: 'progress_pct', label: 'Progress (% Slider)', sortable: true, render: r => (
                    <div className="w-28 space-y-1">
                      <div className="flex justify-between text-[11px] font-mono font-bold">
                        <span>{r.progress_pct}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            r.progress_pct === 100 ? 'bg-emerald-600' : 'bg-[#800000]'
                          }`}
                          style={{ width: `${r.progress_pct}%` }}
                        />
                      </div>
                    </div>
                  )},
                  { key: 'due_date', label: 'Deadline & Overdue', sortable: true, render: r => (
                    <div>
                      <span className="font-mono text-slate-700 text-xs">{new Date(r.due_date).toLocaleDateString()}</span>
                      {r.is_overdue && r.status !== 'completed' && (
                        <span className="block text-[10px] font-bold text-red-600 animate-pulse">
                          ⚠️ Overdue by {r.days_overdue || 1}d
                        </span>
                      )}
                    </div>
                  )},
                  { key: 'status', label: 'Status', sortable: true, render: r => (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      r.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                      r.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                      r.status === 'under_review' ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {r.status.replace('_', ' ')}
                    </span>
                  )},
                  { key: 'actions', label: 'Worklogs', render: r => (
                    <button
                      onClick={() => handleViewWorklogs(r)}
                      className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3 text-slate-500" />
                      Logs
                    </button>
                  )}
                ]}
                data={tasks}
                initialPageSize={10}
                actions={
                  <button
                    onClick={() => setShowCreateTaskModal(true)}
                    className="px-3 py-1.5 rounded-lg bg-[#0b1d3a] hover:bg-[#162a4d] text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5 text-amber-400" />
                    Assign New Task
                  </button>
                }
              />
            </div>
          )}

          {/* ================= TAB 4: ADMISSIONS & DOCUMENT VERIFICATION ================= */}
          {activeTab === 'admissions' && (
            <div className="space-y-6">
              <DataTable
                title="Qualifier Candidate Admissions Dossier Ledger"
                subtitle="10+2 educational qualifications, caste certificates, and academic review verification engine"
                searchPlaceholder="Search candidate name, application no, category..."
                searchKeys={['application_no', 'full_name', 'category', 'city']}
                filterConfigs={[
                  {
                    key: 'category',
                    label: 'Category',
                    options: [
                      { label: 'GEN', value: 'GEN' },
                      { label: 'OBC-NCL', value: 'OBC-NCL' },
                      { label: 'EWS', value: 'EWS' },
                      { label: 'SC', value: 'SC' },
                      { label: 'ST', value: 'ST' },
                      { label: 'PwD', value: 'PwD' }
                    ]
                  },
                  {
                    key: 'status',
                    label: 'Status',
                    options: [
                      { label: 'Submitted', value: 'submitted' },
                      { label: 'Verified', value: 'verified' },
                      { label: 'Under Review', value: 'under_review' },
                      { label: 'Shortlisted', value: 'shortlisted' }
                    ]
                  }
                ]}
                columns={[
                  { key: 'application_no', label: 'Application No', sortable: true, render: r => <span className="font-mono font-bold text-[#800000]">{r.application_no}</span> },
                  { key: 'full_name', label: 'Candidate Name', sortable: true, render: r => (
                    <div>
                      <div className="font-semibold text-slate-900">{r.full_name}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{r.email}</div>
                    </div>
                  )},
                  { key: 'category', label: 'Category', sortable: true, render: r => (
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold border border-slate-200">
                      {r.category}
                    </span>
                  )},
                  { key: 'percentage_12th', label: '12th (%)', sortable: true, render: r => (
                    <span className="font-mono font-bold text-slate-800">{r.percentage_12th}%</span>
                  )},
                  { key: 'identity_doc_status', label: 'ID Verification', sortable: true, render: r => (
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      r.identity_doc_status === 'verified' ? 'bg-emerald-100 text-emerald-800' :
                      r.identity_doc_status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {r.identity_doc_status}
                    </span>
                  )},
                  { key: 'status', label: 'Admission Status', sortable: true, render: r => (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      r.status === 'shortlisted' ? 'bg-purple-100 text-purple-800' :
                      r.status === 'verified' ? 'bg-emerald-100 text-emerald-800' :
                      r.status === 'fee_paid' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {r.status}
                    </span>
                  )},
                  { key: 'actions', label: 'Audit Action', render: r => (
                    <button
                      onClick={() => setSelectedAppForDoc(r)}
                      className="px-2.5 py-1 rounded bg-[#800000] hover:bg-[#6b0000] text-white text-[11px] font-semibold flex items-center gap-1 shadow-xs"
                    >
                      <Eye className="w-3 h-3" />
                      Verify Dossier
                    </button>
                  )}
                ]}
                data={applications}
                initialPageSize={10}
                actions={
                  <button
                    onClick={() => {
                      setShowCredentialModal(true);
                      setCredentialModalType('student');
                      setGeneratedCredentialVoucher(null);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#800000] hover:bg-[#6b0000] text-white text-xs font-bold flex items-center gap-1.5"
                  >
                    <UserPlus className="w-3.5 h-3.5 text-amber-300" />
                    Auto-Generate Candidate Dossier
                  </button>
                }
              />
            </div>
          )}

          {/* ================= TAB 5: FEE RECONCILIATION ================= */}
          {activeTab === 'fees' && (
            <div className="space-y-6">
              <DataTable
                title="Payment Ledger & Fee Reconciliation Engine"
                subtitle="Razorpay and SBI MOPS gateway transaction logs with 18% GST calculation"
                searchPlaceholder="Search transaction ref, application no, student name..."
                searchKeys={['transaction_ref', 'application_no', 'student_name', 'payment_gateway']}
                filterConfigs={[
                  {
                    key: 'payment_gateway',
                    label: 'Gateway',
                    options: [
                      { label: 'Razorpay', value: 'Razorpay' },
                      { label: 'SBI MOPS', value: 'SBI_MOPS' }
                    ]
                  },
                  {
                    key: 'status',
                    label: 'Status',
                    options: [
                      { label: 'Success', value: 'success' },
                      { label: 'Pending', value: 'pending' },
                      { label: 'Failed', value: 'failed' }
                    ]
                  }
                ]}
                columns={[
                  { key: 'transaction_ref', label: 'Transaction ID', sortable: true, render: r => <span className="font-mono font-bold text-[#800000]">{r.transaction_ref}</span> },
                  { key: 'application_no', label: 'Application No', sortable: true, render: r => <span className="font-mono text-slate-700">{r.application_no}</span> },
                  { key: 'student_name', label: 'Applicant Name', sortable: true, render: r => <span className="font-semibold text-slate-900">{r.student_name}</span> },
                  { key: 'amount', label: 'Fee Amount', sortable: true, render: r => <span className="font-mono font-extrabold text-slate-900">₹{Number(r.amount).toFixed(2)}</span> },
                  { key: 'payment_gateway', label: 'Gateway & Mode', sortable: true, render: r => (
                    <div>
                      <span className="font-medium text-slate-800">{r.payment_gateway}</span>
                      <span className="block text-[10px] text-slate-500">{r.payment_method || 'Online'}</span>
                    </div>
                  )},
                  { key: 'status', label: 'Payment Status', sortable: true, render: r => (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      r.status === 'success' ? 'bg-emerald-100 text-emerald-800' :
                      r.status === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {r.status}
                    </span>
                  )},
                  { key: 'created_at', label: 'Timestamp', sortable: true, render: r => new Date(r.created_at).toLocaleString() },
                  { key: 'actions', label: 'Voucher', render: r => (
                    <button
                      onClick={() => setSelectedReceipt(r)}
                      className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] flex items-center gap-1"
                    >
                      <Printer className="w-3 h-3 text-slate-500" />
                      Receipt
                    </button>
                  )}
                ]}
                data={feeTransactions}
                initialPageSize={10}
              />
            </div>
          )}

          {/* ================= TAB 6: LMS CURRICULUM ================= */}
          {activeTab === 'lms' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {courses.map(c => (
                  <div key={c.id} className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-2">
                    <span className="font-mono text-xs font-bold text-[#800000]">{c.code}</span>
                    <h4 className="font-bold text-sm text-slate-900 line-clamp-1">{c.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2">{c.description}</p>
                    <div className="pt-2 flex justify-between items-center text-[11px] text-slate-500 border-t border-slate-100 font-mono">
                      <span>{c.credits} Credits</span>
                      <span className="font-semibold text-emerald-700">Active Course</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 7: QUALIFIER EXAMINATIONS ================= */}
          {activeTab === 'exams' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">Total Submissions</span>
                  <div className="text-2xl font-bold text-slate-900 mt-1 font-serif">{exams.length}</div>
                </div>
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">Passed Candidates</span>
                  <div className="text-2xl font-bold text-emerald-700 mt-1 font-mono">
                    {exams.filter(e => e.is_passed).length}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">Passing Rate</span>
                  <div className="text-2xl font-bold text-[#800000] mt-1 font-mono">
                    {exams.length > 0 ? Math.round((exams.filter(e => e.is_passed).length / exams.length) * 100) : 0}%
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">Grading Pipeline</span>
                  <div className="text-xs font-bold text-emerald-700 mt-2 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Instant Auto-Grading Engine
                  </div>
                </div>
              </div>

              <DataTable
                title="Qualifier Examination Score Ledger"
                subtitle="Instant score calculations evaluated against master answer keys in PostgreSQL"
                searchPlaceholder="Search student name, application no..."
                searchKeys={['student_name', 'application_no']}
                columns={[
                  { key: 'application_no', label: 'Application No', sortable: true, render: r => <span className="font-mono font-bold text-[#800000]">{r.application_no}</span> },
                  { key: 'student_name', label: 'Candidate Name', sortable: true, render: r => <span className="font-semibold text-slate-900">{r.student_name}</span> },
                  { key: 'category', label: 'Category', sortable: true, render: r => <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold border">{r.category}</span> },
                  { key: 'score', label: 'Marks Awarded', sortable: true, render: r => <span className="font-mono font-extrabold text-slate-900">{r.score} / {r.total_marks || 100}</span> },
                  { key: 'percentage', label: 'Percentage', sortable: true, render: r => <span className="font-mono text-slate-800">{r.percentage}%</span> },
                  { key: 'is_passed', label: 'Result', sortable: true, render: r => (
                    <span className={`px-2.5 py-0.5 rounded font-bold text-[10px] uppercase ${
                      r.is_passed ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {r.is_passed ? 'QUALIFIED ✓' : 'NOT QUALIFIED'}
                    </span>
                  )},
                  { key: 'submitted_at', label: 'Submission Time', sortable: true, render: r => new Date(r.submitted_at || r.created_at).toLocaleString() }
                ]}
                data={exams}
                initialPageSize={10}
              />
            </div>
          )}

          {/* ================= TAB 8: DYNAMIC CUTOFF MANAGEMENT ================= */}
          {activeTab === 'cutoffs' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5 text-[#800000]" />
                    Academic Council Category Cutoff Controls
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Dynamically set category-wise qualifying thresholds and execute batch admissions shortlisting.
                  </p>
                </div>
                <button
                  onClick={handleRunCutoffEngine}
                  className="px-4 py-2 rounded-xl bg-[#800000] hover:bg-[#6b0000] text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-transform active:scale-98"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  Execute Batch Shortlisting Engine
                </button>
              </div>

              {/* Cutoff Thresholds Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {cutoffs.map((c: any) => (
                  <div key={c.category} className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
                    <span className="font-bold text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-mono">
                      {c.category}
                    </span>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-mono block">Overall Cutoff</span>
                      <div className="text-2xl font-bold text-[#800000] font-mono mt-0.5">
                        {c.min_overall_score} Marks
                      </div>
                    </div>
                    <div className="text-[11px] text-slate-500 space-y-0.5 pt-2 border-t border-slate-100 font-mono">
                      <div>Math: {c.min_math_score}</div>
                      <div>Python: {c.min_cs_score}</div>
                      <div>Stats: {c.min_stats_score}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Shortlist Result Banner if executed */}
              {shortlistResults && (
                <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-300 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      {shortlistResults.message}
                    </div>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-200 text-emerald-900">
                      {shortlistResults.shortlisted_count} Shortlisted
                    </span>
                  </div>

                  <DataTable
                    columns={[
                      { key: 'application_no', label: 'Application No', sortable: true, render: r => <span className="font-mono font-bold text-[#800000]">{r.application_no}</span> },
                      { key: 'student_name', label: 'Candidate Name', sortable: true },
                      { key: 'category', label: 'Category', sortable: true },
                      { key: 'exam_score', label: 'Score', sortable: true, render: r => <span className="font-mono font-bold">{r.exam_score}</span> },
                      { key: 'required_cutoff', label: 'Threshold', sortable: true, render: r => <span className="font-mono">{r.required_cutoff}</span> },
                      { key: 'status', label: 'Status', sortable: true, render: r => (
                        <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-emerald-100 text-emerald-800">
                          {r.status}
                        </span>
                      )}
                    ]}
                    data={shortlistResults.results || []}
                    initialPageSize={5}
                  />
                </div>
              )}
            </div>
          )}

          {/* ================= TAB 9: SYSTEM AUDIT TRAIL ================= */}
          {activeTab === 'audit' && (
            <div className="space-y-6">
              <DataTable
                title="Immutable System Audit Trail Ledger"
                subtitle="Cryptographically verified administrative overrides, cutoff updates, fee reconciliations, and authentication events"
                searchPlaceholder="Search action, entity type, username, IP..."
                searchKeys={['action', 'entity_type', 'user_name', 'username', 'ip_address']}
                columns={[
                  { key: 'timestamp', label: 'Timestamp', sortable: true, render: r => <span className="font-mono text-slate-600 text-[11px]">{new Date(r.timestamp).toLocaleString()}</span> },
                  { key: 'action', label: 'Action Type', sortable: true, render: r => (
                    <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-slate-100 text-slate-800 border border-slate-200">
                      {r.action}
                    </span>
                  )},
                  { key: 'entity_type', label: 'Target Entity', sortable: true, render: r => (
                    <span className="font-mono text-slate-700">{r.entity_type} #{r.entity_id}</span>
                  )},
                  { key: 'user_name', label: 'Executed By', sortable: true, render: r => (
                    <div>
                      <span className="font-semibold text-slate-900">{r.user_name || 'System Auto'}</span>
                      <span className="text-[10px] text-slate-500 font-mono block">{r.user_role}</span>
                    </div>
                  )},
                  { key: 'ip_address', label: 'IP Origin', sortable: true, render: r => <span className="font-mono text-slate-500 text-[11px]">{r.ip_address}</span> }
                ]}
                data={auditLogs}
                initialPageSize={10}
              />
            </div>
          )}
        </main>
      </div>

      {/* ================= MODAL: AUTO-GENERATION TOOL (DUAL: STAFF & STUDENT) ================= */}
      {showCredentialModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#800000] text-amber-200 flex items-center justify-center font-bold">
                  <KeyRound className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 font-serif">
                    Super Admin Credential Auto-Generation Tool
                  </h3>
                  <span className="text-[11px] text-slate-500 font-mono">
                    Strict RBAC Enforced • Direct PostgreSQL Write
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowCredentialModal(false);
                  setGeneratedCredentialVoucher(null);
                }}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            {/* If Credentials were just generated: Display the Official Voucher */}
            {generatedCredentialVoucher ? (
              <div className="py-4 space-y-4">
                <div className="p-4 bg-red-50/50 rounded-xl border border-red-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#800000] uppercase tracking-wider font-mono">
                      Official Institutional Credential Voucher
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px] uppercase">
                      Provisioned in DB ✓
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-white p-3 rounded-lg border border-slate-200">
                    <div>
                      <span className="text-slate-400 block text-[10px]">ACCOUNT TYPE:</span>
                      <strong className="text-slate-900">{generatedCredentialVoucher.type}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">RECIPIENT NAME:</span>
                      <strong className="text-slate-900">{generatedCredentialVoucher.name}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">UNIQUE IDENTIFIER:</span>
                      <strong className="text-[#800000]">{generatedCredentialVoucher.user_code}</strong>
                    </div>
                    {generatedCredentialVoucher.application_no && (
                      <div>
                        <span className="text-slate-400 block text-[10px]">APPLICATION NO:</span>
                        <strong className="text-[#800000]">{generatedCredentialVoucher.application_no}</strong>
                      </div>
                    )}
                    <div className="col-span-2 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-slate-400 block text-[10px]">LOGIN USERNAME:</span>
                        <strong className="text-blue-700 text-sm">{generatedCredentialVoucher.username}</strong>
                      </div>
                      <button
                        onClick={() => copyToClipboard(generatedCredentialVoucher.username, 'voucher_user')}
                        className="p-1 text-slate-500 hover:text-slate-800"
                        title="Copy Username"
                      >
                        {copiedField === 'voucher_user' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <div className="col-span-2 flex items-center justify-between bg-amber-50 p-2 rounded border border-amber-200">
                      <div>
                        <span className="text-amber-800 block text-[10px] font-bold">TEMPORARY PASSWORD:</span>
                        <strong className="text-red-700 text-sm">{generatedCredentialVoucher.temp_password}</strong>
                      </div>
                      <button
                        onClick={() => copyToClipboard(generatedCredentialVoucher.temp_password, 'voucher_pass')}
                        className="p-1 text-amber-700 hover:text-amber-900 font-bold text-xs flex items-center gap-1"
                      >
                        {copiedField === 'voucher_pass' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedField === 'voucher_pass' ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => {
                      const fullSummary = `IIT Kharagpur BS Program Credentials\nAccount Type: ${generatedCredentialVoucher.type}\nName: ${generatedCredentialVoucher.name}\nID: ${generatedCredentialVoucher.user_code}\nUsername: ${generatedCredentialVoucher.username}\nTemporary Password: ${generatedCredentialVoucher.temp_password}\nPortal: http://localhost:5000`;
                      copyToClipboard(fullSummary, 'full_voucher');
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    {copiedField === 'full_voucher' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedField === 'full_voucher' ? 'Voucher Copied!' : 'Copy Full Voucher'}</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowCredentialModal(false);
                      setGeneratedCredentialVoucher(null);
                    }}
                    className="px-5 py-2 rounded-xl bg-[#800000] hover:bg-[#6b0000] text-white text-xs font-bold shadow-xs transition-colors"
                  >
                    Done & Issue Credentials
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-4 space-y-4">
                {/* Switch between Staff & Student Auto-Generator */}
                <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setCredentialModalType('employee')}
                    className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                      credentialModalType === 'employee'
                        ? 'bg-[#800000] text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    Staff Officer Account
                  </button>
                  <button
                    type="button"
                    onClick={() => setCredentialModalType('student')}
                    className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                      credentialModalType === 'student'
                        ? 'bg-[#800000] text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    Student Candidate Dossier
                  </button>
                </div>

                {/* Form 1: Staff Auto-Generation */}
                {credentialModalType === 'employee' ? (
                  <form onSubmit={handleAutoGenerateEmployee} className="space-y-3 text-xs">
                    <div>
                      <label className="block font-medium mb-1 text-slate-700">Full Legal Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Dr. Kuntal Banerjee"
                        value={empForm.full_name}
                        onChange={e => setEmpForm({ ...empForm, full_name: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block font-medium mb-1 text-slate-700">Designation *</label>
                        <input
                          type="text"
                          required
                          value={empForm.designation}
                          onChange={e => setEmpForm({ ...empForm, designation: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block font-medium mb-1 text-slate-700">Department *</label>
                        <select
                          value={empForm.department}
                          onChange={e => setEmpForm({ ...empForm, department: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800"
                        >
                          <option value="Admissions & Document Verification">Admissions & Verification</option>
                          <option value="Evaluation & Cutoffs Directorate">Evaluation Directorate</option>
                          <option value="Academic Operations">Academic Operations</option>
                        </select>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                      <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-600" />
                        Auto-Generation Engine will automatically:
                      </span>
                      <ul className="list-disc list-inside text-[11px] text-slate-500 space-y-0.5">
                        <li>Generate unique Staff Employee ID (e.g. <code>KGP-EMP-1004</code>)</li>
                        <li>Generate secure temporary password (e.g. <code>Kgp#Emp9182</code>)</li>
                        <li>Enforce strict Employee RBAC permissions</li>
                      </ul>
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setShowCredentialModal(false)}
                        className="px-4 py-2 rounded-xl text-slate-500 hover:bg-slate-100 text-xs font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isGeneratingCredentials}
                        className="px-5 py-2 rounded-xl bg-[#800000] hover:bg-[#6b0000] text-white text-xs font-bold shadow-xs disabled:opacity-50"
                      >
                        {isGeneratingCredentials ? 'Generating...' : 'Auto-Generate & Issue ID'}
                      </button>
                    </div>
                  </form>
                ) : (
                  /* Form 2: Student Auto-Generation */
                  <form onSubmit={handleAutoGenerateStudent} className="space-y-3 text-xs">
                    <div>
                      <label className="block font-medium mb-1 text-slate-700">Candidate Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Tanmoy Chakraborty"
                        value={studentForm.full_name}
                        onChange={e => setStudentForm({ ...studentForm, full_name: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block font-medium mb-1 text-slate-700">Reservation Category *</label>
                        <select
                          value={studentForm.category}
                          onChange={e => setStudentForm({ ...studentForm, category: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800"
                        >
                          <option value="GEN">General (GEN)</option>
                          <option value="OBC-NCL">OBC-NCL</option>
                          <option value="EWS">EWS</option>
                          <option value="SC">SC</option>
                          <option value="ST">ST</option>
                          <option value="PwD">PwD</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-medium mb-1 text-slate-700">Class 12th Marks (%) *</label>
                        <input
                          type="number"
                          step="0.1"
                          required
                          value={studentForm.percentage_12th}
                          onChange={e => setStudentForm({ ...studentForm, percentage_12th: parseFloat(e.target.value) })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800"
                        />
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                      <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-600" />
                        Auto-Generation Engine will automatically:
                      </span>
                      <ul className="list-disc list-inside text-[11px] text-slate-500 space-y-0.5">
                        <li>Generate unique Student ID (<code>KGP-STU-2026-XXXX</code>)</li>
                        <li>Create official Application Dossier (<code>KGP-BS-2026-XXXX</code>)</li>
                        <li>Initialize Fee Ledger record for Razorpay/SBI MOPS payment</li>
                        <li>Generate secure temporary password (e.g. <code>Kgp#Stu8219</code>)</li>
                      </ul>
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setShowCredentialModal(false)}
                        className="px-4 py-2 rounded-xl text-slate-500 hover:bg-slate-100 text-xs font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isGeneratingCredentials}
                        className="px-5 py-2 rounded-xl bg-[#800000] hover:bg-[#6b0000] text-white text-xs font-bold shadow-xs disabled:opacity-50"
                      >
                        {isGeneratingCredentials ? 'Generating...' : 'Auto-Generate Candidate Dossier'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= MODAL: CREATE / ASSIGN TASK ================= */}
      {showCreateTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900 font-serif">
                Assign Structured Employee Task
              </h3>
              <button onClick={() => setShowCreateTaskModal(false)} className="text-slate-400">✕</button>
            </div>

            <form onSubmit={handleAssignTask} className="py-4 space-y-3 text-xs">
              <div>
                <label className="block font-medium mb-1 text-slate-700">Task Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Verify Category Certificates for OBC-NCL Batch 2"
                  value={newTaskForm.title}
                  onChange={e => setNewTaskForm({ ...newTaskForm, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-medium mb-1 text-slate-700">Detailed Instructions</label>
                <textarea
                  rows={2}
                  value={newTaskForm.description}
                  onChange={e => setNewTaskForm({ ...newTaskForm, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-medium mb-1 text-slate-700">Assign To Staff *</label>
                  <select
                    required
                    value={newTaskForm.assigned_to}
                    onChange={e => setNewTaskForm({ ...newTaskForm, assigned_to: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800"
                  >
                    <option value="">Select Employee...</option>
                    {employees.map(emp => (
                      <option key={emp.id} value={emp.id}>
                        {emp.full_name} ({emp.user_code})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-medium mb-1 text-slate-700">Priority Level *</label>
                  <select
                    value={newTaskForm.priority}
                    onChange={e => setNewTaskForm({ ...newTaskForm, priority: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800 font-semibold"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent (Red Alert)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium mb-1 text-slate-700">Strict Due Date *</label>
                <input
                  type="date"
                  required
                  value={newTaskForm.due_date}
                  onChange={e => setNewTaskForm({ ...newTaskForm, due_date: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800 font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateTaskModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-500 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#800000] hover:bg-[#6b0000] text-white font-bold"
                >
                  Dispatch Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: DOCUMENT VERIFICATION DOSSIER ================= */}
      {selectedAppForDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-sm text-slate-900 font-serif">
                  Document Inspection Dossier: {selectedAppForDoc.application_no}
                </h3>
                <span className="text-[11px] text-slate-500">{selectedAppForDoc.full_name} ({selectedAppForDoc.category})</span>
              </div>
              <button onClick={() => setSelectedAppForDoc(null)} className="text-slate-400">✕</button>
            </div>

            <form onSubmit={handleVerifyDocument} className="py-4 space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 border border-slate-200 font-mono text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-500">12th Marks:</span>
                  <strong>{selectedAppForDoc.percentage_12th}% ({selectedAppForDoc.stream_12th})</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Identity Document:</span>
                  <span className="text-blue-700 font-bold">Aadhaar Card (Linked)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Fee Status:</span>
                  <span className={selectedAppForDoc.fee_status === 'success' ? 'text-emerald-700 font-bold' : 'text-amber-700 font-bold'}>
                    {selectedAppForDoc.fee_status === 'success' ? 'Settled (₹3000.00)' : 'Pending'}
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-medium mb-1 text-slate-700">Verification Decision *</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDocVerifyForm({ ...docVerifyForm, verification_status: 'verified' })}
                    className={`py-2 rounded-lg font-bold border transition-all ${
                      docVerifyForm.verification_status === 'verified'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    Approve Dossier ✓
                  </button>
                  <button
                    type="button"
                    onClick={() => setDocVerifyForm({ ...docVerifyForm, verification_status: 'rejected' })}
                    className={`py-2 rounded-lg font-bold border transition-all ${
                      docVerifyForm.verification_status === 'rejected'
                        ? 'border-red-600 bg-red-50 text-red-800'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    Flag / Reject Dossier ✕
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-medium mb-1 text-slate-700">Audit Notes</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Identity and qualifying examination certificates verified against national database."
                  value={docVerifyForm.notes}
                  onChange={e => setDocVerifyForm({ ...docVerifyForm, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedAppForDoc(null)}
                  className="px-4 py-2 rounded-xl text-slate-500 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#800000] hover:bg-[#6b0000] text-white font-bold"
                >
                  Save Verification Verdict
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: PRINTABLE TAX RECEIPT ================= */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl">
            <div className="border-b border-slate-200 pb-3 flex justify-between items-center">
              <div>
                <h4 className="font-bold text-slate-900 text-sm font-serif">
                  INDIAN INSTITUTE OF TECHNOLOGY KHARAGPUR
                </h4>
                <p className="text-[11px] text-slate-500">Official Electronic Fee Voucher • 2026 Qualifier Round</p>
              </div>
              <button onClick={() => setSelectedReceipt(null)} className="text-slate-400">✕</button>
            </div>

            <div className="py-4 space-y-3 text-xs font-mono">
              <div className="p-4 bg-slate-50 rounded-xl space-y-2 border border-slate-200">
                <div className="flex justify-between">
                  <span className="text-slate-500">Transaction ID:</span>
                  <strong className="text-[#800000]">{selectedReceipt.transaction_ref}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Gateway:</span>
                  <span>{selectedReceipt.payment_gateway}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Applicant Name:</span>
                  <span className="font-bold">{selectedReceipt.student_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Application No:</span>
                  <span>{selectedReceipt.application_no}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-2 font-bold text-sm">
                  <span>Amount Paid (Incl. GST):</span>
                  <span className="text-[#800000]">₹{Number(selectedReceipt.amount).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                Print Voucher
              </button>
              <button
                onClick={() => setSelectedReceipt(null)}
                className="px-4 py-2 rounded-xl bg-[#800000] text-white font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: WORKLOGS AUDIT ================= */}
      {selectedTaskWorklogs && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-sm text-slate-900 font-serif">
                  Worklog History: {selectedTaskWorklogs.task.task_code}
                </h3>
                <p className="text-[11px] text-slate-500">{selectedTaskWorklogs.task.title}</p>
              </div>
              <button onClick={() => setSelectedTaskWorklogs(null)} className="text-slate-400">✕</button>
            </div>

            <div className="py-4 space-y-2 max-h-80 overflow-y-auto">
              {selectedTaskWorklogs.logs.length > 0 ? (
                selectedTaskWorklogs.logs.map((log: any, lIdx: number) => (
                  <div key={lIdx} className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1">
                    <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
                      <span>{new Date(log.created_at).toLocaleString()}</span>
                      <span className="font-bold text-[#800000]">{log.progress_pct}% Completed</span>
                    </div>
                    <p className="text-slate-800 font-medium">{log.notes || 'Progress slider updated.'}</p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 text-center py-4">No worklog entries recorded yet.</p>
              )}
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                onClick={() => setSelectedTaskWorklogs(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPortal;
