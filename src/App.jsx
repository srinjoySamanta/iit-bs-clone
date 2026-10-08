import React, { useState, useEffect } from 'react';
import MasterLandingPage from './components/master/MasterLandingPage';
import MasterPageTwo from './components/master/MasterPageTwo';
import StudentPortalModal from './components/student/StudentPortalModal';
import AdminPortalModal from './components/admin/AdminPortalModal';
import SignUpWizardModal from './components/student/SignUpWizardModal';
import SampleCertificateModal from './components/SampleCertificateModal';
import HowToApplyModal from './components/HowToApplyModal';
import { AuthProvider, ThemeProvider } from './context/ErpAuthContext';
import { DropdownGateProvider } from './context/DropdownGateContext';
import LoginPage from './pages/auth/LoginPage';
import AdminPortal from './pages/admin/AdminPortal';
import EmployeePortal from './pages/employee/EmployeePortal';
import ErpNavbar from './components/ErpNavbar';
import StudentLoginPage from './pages/StudentLoginPage';
import QualifierRoundPortal from './components/qualifier/QualifierRoundPortal';
import QualifierExamEngine from './components/exam/QualifierExamEngine';
import StudentErpPortal from './pages/StudentErpPortal';
import { clearAdminSession, getCurrentAdminUser, getAdminToken } from './services/apiService';

export default function App() {
  // Navigation View: 'home' | 'structure' | 'eligibility' | 'fees' | 'campus' | 'faqs' | 'contact' | 'director' | 'qualifier' | 'exam' | 'student-login' | 'admin-login' | 'admin-portal' | 'staff-portal' | 'student-erp'
  const [currentView, setCurrentView] = useState('home');
  const [loginRole, setLoginRole] = useState('admin');
  const [examCandidate, setExamCandidate] = useState({ name: 'Candidate', roll: 'KGP-QUAL-2026-0842' });
  const [loggedInStudent, setLoggedInStudent] = useState(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => Boolean(getAdminToken()));

  const [showDiagram, setShowDiagram] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [showHowToApply, setShowHowToApply] = useState(false);

  // Sync with browser hash to support deep linking and hyperlink redirections
  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash.replace(/^#\/?/, '');
      const hash = rawHash.toLowerCase();

      if (hash === 'programme' || hash === 'programme-highlights' || hash === 'highlights' || hash === 'page2') {
        setCurrentView('programme');
      } else if (hash.startsWith('student-erp') || hash === 'erp' || hash === 'student-portal' || hash === 'lms' || hash === 'student/dashboard') {
        setCurrentView('student-erp');
      } else if (hash === 'admin' || hash === 'admin-portal' || hash === 'admin-dashboard' || hash === 'admin/dashboard' || hash === 'admin-students') {
        setCurrentView('admin-portal');
      } else if (hash === 'staff' || hash === 'staff-portal' || hash === 'staff/dashboard' || hash === 'employee' || hash === 'employee/dashboard') {
        setCurrentView('staff-portal');
      } else if (hash === 'staff-login') {
        setLoginRole('employee');
        setCurrentView('admin-login');
      } else if (hash === 'admin-login' || hash === 'login' || hash === 'erp-login') {
        setLoginRole('admin');
        setCurrentView('admin-login');
      } else if (hash.startsWith('student-login') || hash.startsWith('auth') || hash.startsWith('apply') || hash.startsWith('signup')) {
        setCurrentView('student-login');
      } else if (hash === 'qualifier') {
        setCurrentView('qualifier');
      } else if (hash === 'exam') {
        setCurrentView('exam');
      } else if (hash === 'how-to-apply' || hash === 'howapply') {
        setShowHowToApply(true);
      } else if (hash === 'diagram') {
        setShowDiagram(true);
      } else {
        // Default: Page 1 (Landing Page)
        setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (view) => {
    if (view === 'programme' || view === 'programme-highlights' || view === 'page2') {
      setCurrentView('programme');
      try {
        window.history.replaceState(null, '', '#programme');
      } catch (e) {}
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (view === 'home' || view === 'page1') {
      setCurrentView('home');
      try {
        window.history.replaceState(null, '', '#home');
      } catch (e) {}
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setCurrentView(view);
    window.location.hash = view;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartExam = (candidate) => {
    setExamCandidate(candidate);
    navigateTo('exam');
  };

  const handleGoogleLogin = (studentData) => {
    setLoggedInStudent(studentData);
    setExamCandidate(prev => ({
      ...prev,
      name: studentData.name || prev.name,
      email: studentData.email || ''
    }));
    navigateTo('student-erp');
  };

  const handleStudentLogout = () => {
    setLoggedInStudent(null);
    navigateTo('home');
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    navigateTo('admin-portal');
  };

  const handleAdminLogout = () => {
    clearAdminSession();
    setIsAdminAuthenticated(false);
    navigateTo('admin-login');
  };

  return (
    <AuthProvider>
      <ThemeProvider>
        <DropdownGateProvider>
          <div className="min-h-screen w-full min-w-full overflow-x-clip flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-amber-500 selection:text-white">
      
      {/* VIEW 1: DEDICATED QUALIFIER ROUND EXAMINATION PORTAL */}
      {currentView === 'qualifier' && (
        <QualifierRoundPortal
          initialCandidate={loggedInStudent}
          onStartExam={handleStartExam}
          onBackToHome={() => navigateTo('home')}
        />
      )}

      {/* VIEW 2: LIVE COMPUTER-BASED QUALIFIER EXAM ENGINE */}
      {currentView === 'exam' && (
        <QualifierExamEngine
          candidateName={examCandidate.name}
          candidateRoll={examCandidate.roll}
          onExit={() => navigateTo('qualifier')}
        />
      )}

      {/* VIEW 3: DEDICATED STUDENT LOGIN & QUALIFIER APPLY PAGE */}
      {currentView === 'student-login' && (
        <StudentLoginPage
          onLoginSuccess={() => navigateTo('student-erp')}
          onBackToHome={() => navigateTo('home')}
          onOpenSignUp={() => navigateTo('student-login')}
          onOpenQualifier={() => navigateTo('qualifier')}
          onOpenErp={() => navigateTo('student-erp')}
          onGoogleLogin={handleGoogleLogin}
        />
      )}

      {/* VIEW 3.5: INTEGRATED STUDENT ERP & LMS PORTAL (Admission Journey, Fees, LMS 4-Courses, Qualifier CBT Exam) */}
      {currentView === 'student-erp' && (
        <StudentErpPortal
          candidate={loggedInStudent}
          onBackToHome={() => navigateTo('home')}
          onLogout={handleStudentLogout}
        />
      )}

      {/* VIEW 4: ENTERPRISE ISOLATED PORTAL GATEWAY LOGIN (Exact match to Image 2) */}
      {currentView === 'admin-login' && (
        <LoginPage
          initialRole={loginRole}
          onNavigate={navigateTo}
          onBackToHome={() => navigateTo('home')}
        />
      )}

      {/* VIEW 5: MASTER SUPER ADMIN DIRECTORATE CONSOLE (Exact match to Image 3) */}
      {currentView === 'admin-portal' && (
        <div className="min-h-screen flex flex-col bg-[#f0f7ff] text-slate-800">
          <ErpNavbar onBackToHome={() => navigateTo('home')} />
          <AdminPortal />
        </div>
      )}

      {/* VIEW 5.5: STAFF OPERATIONS & DOCUMENT VERIFICATION CENTER */}
      {currentView === 'staff-portal' && (
        <div className="min-h-screen flex flex-col bg-[#f0f7ff] text-slate-800">
          <ErpNavbar onBackToHome={() => navigateTo('home')} />
          <EmployeePortal />
        </div>
      )}



      {/* VIEW 1: PAGE 1 — LANDING PAGE (Strict Master UI Reference Replication: Header -> Hero -> Direct Entry -> Explore Programme -> 8 Feature Cards. END.) */}
      {currentView === 'home' && (
        <MasterLandingPage
          onNavigate={navigateTo}
          onOpenCertificate={() => setShowCertificate(true)}
          onOpenHowToApply={() => setShowHowToApply(true)}
        />
      )}

      {/* VIEW 2: PAGE 2 — PROGRAMME HIGHLIGHTS (Director's Message Left | Programme Highlights Continuous Right-to-Left Marquee Right. END.) */}
      {currentView === 'programme' && (
        <MasterPageTwo
          onNavigate={navigateTo}
          onOpenCertificate={() => setShowCertificate(true)}
          onOpenHowToApply={() => setShowHowToApply(true)}
        />
      )}

      {/* UNIVERSAL MODALS & PORTAL WIDGETS */}
      <StudentPortalModal
        isOpen={showStudentModal}
        onClose={() => setShowStudentModal(false)}
      />
      <AdminPortalModal
        isOpen={showAdminModal}
        onClose={() => setShowAdminModal(false)}
      />
      <SignUpWizardModal
        isOpen={showSignUp}
        onClose={() => setShowSignUp(false)}
      />
      <SampleCertificateModal
        isOpen={showCertificate}
        onClose={() => setShowCertificate(false)}
      />
      <HowToApplyModal
        isOpen={showHowToApply}
        onClose={() => setShowHowToApply(false)}
        onStartApplication={() => navigateTo('student-login')}
      />


          </div>
        </DropdownGateProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
