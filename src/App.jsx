import React, { useState, useEffect } from 'react';
import MasterLandingPage from './components/master/MasterLandingPage';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DirectorMessage from './components/DirectorMessage';
import HomeOverview from './components/HomeOverview';
import CourseStructure from './components/CourseStructure';
import EligibilityPathways from './components/EligibilityPathways';
import FeesStructure from './components/FeesStructure';
import CampusLifePlacement from './components/CampusLifePlacement';
import FaqSection from './components/FaqSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import BlockDiagramViewer from './components/BlockDiagramViewer';
import StudentPortalModal from './components/student/StudentPortalModal';
import AdminPortalModal from './components/admin/AdminPortalModal';
import SignUpWizardModal from './components/student/SignUpWizardModal';
import SampleCertificateModal from './components/SampleCertificateModal';
import HowToApplyModal from './components/HowToApplyModal';
import { AuthProvider, ThemeProvider } from './context/ErpAuthContext';
import LoginPage from './pages/auth/LoginPage';
import AdminPortal from './pages/admin/AdminPortal';
import EmployeePortal from './pages/employee/EmployeePortal';
import ErpNavbar from './components/ErpNavbar';
import StudentLoginPage from './pages/StudentLoginPage';
import QualifierRoundPortal from './components/qualifier/QualifierRoundPortal';
import QualifierExamEngine from './components/exam/QualifierExamEngine';
import AdmissionsChatbot from './components/chat/AdmissionsChatbot';
import StudentErpPortal from './pages/StudentErpPortal';
import { clearAdminSession, getCurrentAdminUser, getAdminToken } from './services/apiService';
import { ArrowLeft, Layers, ShieldCheck, UserCheck, Award, Home, Sparkles, BookOpen } from 'lucide-react';

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

      if (hash.startsWith('student-erp') || hash === 'erp' || hash === 'student-portal' || hash === 'lms' || hash === 'student/dashboard') {
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
        // In-page sections remain on the comprehensive landing page with standby subnav tabs
        setCurrentView('home');

        const sectionMap = {
          'director-note': 'director-note',
          'director': 'director-note',
          'director-message': 'director-note',
          'programme-highlights': 'programme-highlights',
          'highlights': 'programme-highlights',
          'curriculum-overview': 'curriculum-overview',
          'structure': 'curriculum-overview',
          'syllabus': 'curriculum-overview',
          'academics': 'curriculum-overview',
          'how-will-you-learn': 'how-will-you-learn',
          'who-should-apply': 'who-should-apply',
          'admission-process': 'admission-process',
          'eligibility': 'eligibility',
          'direct': 'eligibility',
          'fees-structure': 'fees-structure',
          'fees': 'fees-structure',
          'scholarship': 'fees-structure',
          'how-is-this-course-different': 'how-is-this-course-different',
          'why-this-course': 'how-is-this-course-different',
          'about-institute': 'about-institute',
          'campus': 'about-institute',
          'library': 'about-institute',
          'placement': 'about-institute',
          'faqs': 'faqs',
          'faq': 'faqs',
          'contact-us': 'contact-us',
          'contact': 'contact-us',
          'helpdesk': 'contact-us',
          'institutional-gateways': 'institutional-gateways',
          'portals': 'institutional-gateways'
        };

        const targetId = sectionMap[hash];
        if (targetId) {
          setTimeout(() => {
            const el = document.getElementById(targetId);
            if (el) {
              const headerHeight = document.getElementById('main-fixed-navbar')?.offsetHeight || 115;
              const elementPosition = el.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - headerHeight + 5;
              window.scrollTo({ top: Math.max(0, offsetPosition), behavior: 'smooth' });
            }
          }, 60);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (view) => {
    const sectionMap = {
      'director-note': 'director-note',
      'director': 'director-note',
      'director-message': 'director-note',
      'programme-highlights': 'programme-highlights',
      'highlights': 'programme-highlights',
      'curriculum-overview': 'curriculum-overview',
      'structure': 'curriculum-overview',
      'syllabus': 'curriculum-overview',
      'academics': 'curriculum-overview',
      'how-will-you-learn': 'how-will-you-learn',
      'who-should-apply': 'who-should-apply',
      'admission-process': 'admission-process',
      'eligibility': 'eligibility',
      'direct': 'eligibility',
      'fees-structure': 'fees-structure',
      'fees': 'fees-structure',
      'scholarship': 'fees-structure',
      'how-is-this-course-different': 'how-is-this-course-different',
      'why-this-course': 'how-is-this-course-different',
      'about-institute': 'about-institute',
      'campus': 'about-institute',
      'library': 'about-institute',
      'placement': 'about-institute',
      'faqs': 'faqs',
      'faq': 'faqs',
      'contact-us': 'contact-us',
      'contact': 'contact-us',
      'helpdesk': 'contact-us',
      'institutional-gateways': 'institutional-gateways',
      'portals': 'institutional-gateways'
    };

    const targetSection = sectionMap[view];
    if (targetSection) {
      if (currentView !== 'home') {
        setCurrentView('home');
      }
      try {
        window.history.replaceState(null, '', `#${targetSection}`);
      } catch (e) {}
      setTimeout(() => {
        const el = document.getElementById(targetSection);
        if (el) {
          const headerHeight = document.getElementById('main-fixed-navbar')?.offsetHeight || 115;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight + 5;
          window.scrollTo({ top: Math.max(0, offsetPosition), behavior: 'smooth' });
        }
      }, 60);
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

      {/* VIEW 6: DEDICATED COURSE STRUCTURE & SYLLABUS PAGE (Accessed via Hyperlink) */}
      {currentView === 'structure' && (
        <>
          <Navbar
            onNavigate={navigateTo}
            onOpenDiagram={() => setShowDiagram(true)}
            onOpenSignUp={() => navigateTo('student-login')}
            onOpenCertificate={() => setShowCertificate(true)}
            onOpenHowToApply={() => setShowHowToApply(true)}
            currentView={currentView}
          />
          <div className="bg-slate-950 text-white py-6 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
              <div>
                <button
                  onClick={() => navigateTo('home')}
                  className="text-amber-400 hover:text-amber-300 text-xs font-bold flex items-center gap-1.5 mb-1 cursor-pointer transition"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Main Website</span>
                </button>
                <h1 className="text-xl sm:text-2xl font-bold font-serif-title">
                  Course Structure &amp; Syllabus Roadmap
                </h1>
                <p className="text-xs text-slate-400">
                  Bachelor of Science (BS) in Data Science &amp; AI • 142 Credits Modular Curriculum
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowCertificate(true)}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition cursor-pointer"
                >
                  Sample Certificate
                </button>
                <button
                  onClick={() => navigateTo('student-login')}
                  className="px-4 py-2 bg-kgp-crimson hover:bg-kgp-darkred text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer"
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
          <CourseStructure onOpenCertificate={() => setShowCertificate(true)} />
          <Footer
            onNavigate={navigateTo}
            onOpenDiagram={() => setShowDiagram(true)}
            onOpenStudentLogin={() => navigateTo('student-erp')}
            onOpenAdminLogin={() => navigateTo('admin-login')}
            onOpenCertificate={() => setShowCertificate(true)}
          />
        </>
      )}

      {/* VIEW 7: DEDICATED ELIGIBILITY & DIRECT ADMISSION PATHWAYS (Accessed via Hyperlink) */}
      {currentView === 'eligibility' && (
        <>
          <Navbar
            onNavigate={navigateTo}
            onOpenDiagram={() => setShowDiagram(true)}
            onOpenSignUp={() => navigateTo('student-login')}
            onOpenCertificate={() => setShowCertificate(true)}
            onOpenHowToApply={() => setShowHowToApply(true)}
            currentView={currentView}
          />
          <div className="bg-slate-950 text-white py-6 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
              <div>
                <button
                  onClick={() => navigateTo('home')}
                  className="text-amber-400 hover:text-amber-300 text-xs font-bold flex items-center gap-1.5 mb-1 cursor-pointer transition"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Main Website</span>
                </button>
                <h1 className="text-xl sm:text-2xl font-bold font-serif-title">
                  Eligibility Criteria &amp; Direct Admission Pathways
                </h1>
                <p className="text-xs text-slate-400">
                  Direct entry for WBJEE, JEE Advanced &amp; Tripura JEE qualifiers, plus Universal Qualifier Round
                </p>
              </div>
              <button
                onClick={() => navigateTo('student-login')}
                className="px-4 py-2 bg-kgp-crimson hover:bg-kgp-darkred text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer"
              >
                Apply for Admission
              </button>
            </div>
          </div>
          <EligibilityPathways onOpenSignUp={() => navigateTo('student-login')} />
          <Footer
            onNavigate={navigateTo}
            onOpenDiagram={() => setShowDiagram(true)}
            onOpenStudentLogin={() => navigateTo('student-erp')}
            onOpenAdminLogin={() => navigateTo('admin-login')}
            onOpenCertificate={() => setShowCertificate(true)}
          />
        </>
      )}

      {/* VIEW 8: DEDICATED FEE STRUCTURE & SCHOLARSHIP CALCULATOR (Accessed via Hyperlink) */}
      {currentView === 'fees' && (
        <>
          <Navbar
            onNavigate={navigateTo}
            onOpenDiagram={() => setShowDiagram(true)}
            onOpenSignUp={() => navigateTo('student-login')}
            onOpenCertificate={() => setShowCertificate(true)}
            onOpenHowToApply={() => setShowHowToApply(true)}
            currentView={currentView}
          />
          <div className="bg-slate-950 text-white py-6 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
              <div>
                <button
                  onClick={() => navigateTo('home')}
                  className="text-amber-400 hover:text-amber-300 text-xs font-bold flex items-center gap-1.5 mb-1 cursor-pointer transition"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Main Website</span>
                </button>
                <h1 className="text-xl sm:text-2xl font-bold font-serif-title">
                  Fee Structure &amp; Real-Time Scholarship Calculator
                </h1>
                <p className="text-xs text-slate-400">
                  Affordable modular pay-per-credit model with up to 75% fee waivers for eligible candidates
                </p>
              </div>
              <button
                onClick={() => navigateTo('student-login')}
                className="px-4 py-2 bg-kgp-crimson hover:bg-kgp-darkred text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer"
              >
                Apply Now
              </button>
            </div>
          </div>
          <FeesStructure />
          <Footer
            onNavigate={navigateTo}
            onOpenDiagram={() => setShowDiagram(true)}
            onOpenStudentLogin={() => navigateTo('student-erp')}
            onOpenAdminLogin={() => navigateTo('admin-login')}
            onOpenCertificate={() => setShowCertificate(true)}
          />
        </>
      )}

      {/* VIEW 9: DEDICATED CAMPUS IMMERSION, LIBRARY & PLACEMENTS (Accessed via Hyperlink) */}
      {currentView === 'campus' && (
        <>
          <Navbar
            onNavigate={navigateTo}
            onOpenDiagram={() => setShowDiagram(true)}
            onOpenSignUp={() => navigateTo('student-login')}
            onOpenCertificate={() => setShowCertificate(true)}
            onOpenHowToApply={() => setShowHowToApply(true)}
            currentView={currentView}
          />
          <div className="bg-slate-950 text-white py-6 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
              <div>
                <button
                  onClick={() => navigateTo('home')}
                  className="text-amber-400 hover:text-amber-300 text-xs font-bold flex items-center gap-1.5 mb-1 cursor-pointer transition"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Main Website</span>
                </button>
                <h1 className="text-xl sm:text-2xl font-bold font-serif-title">
                  Campus Immersion, Central Library &amp; Placement Ecosystem
                </h1>
                <p className="text-xs text-slate-400">
                  Experience the historic 2,100-acre Kharagpur campus, Asia's premier library, and career placements
                </p>
              </div>
              <button
                onClick={() => navigateTo('student-login')}
                className="px-4 py-2 bg-kgp-crimson hover:bg-kgp-darkred text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer"
              >
                Apply Now
              </button>
            </div>
          </div>
          <CampusLifePlacement />
          <Footer
            onNavigate={navigateTo}
            onOpenDiagram={() => setShowDiagram(true)}
            onOpenStudentLogin={() => navigateTo('student-erp')}
            onOpenAdminLogin={() => navigateTo('admin-login')}
            onOpenCertificate={() => setShowCertificate(true)}
          />
        </>
      )}

      {/* VIEW 10: DEDICATED BILINGUAL FAQS (Accessed via Hyperlink) */}
      {currentView === 'faqs' && (
        <>
          <Navbar
            onNavigate={navigateTo}
            onOpenDiagram={() => setShowDiagram(true)}
            onOpenSignUp={() => navigateTo('student-login')}
            onOpenCertificate={() => setShowCertificate(true)}
            onOpenHowToApply={() => setShowHowToApply(true)}
            currentView={currentView}
          />
          <div className="bg-slate-950 text-white py-6 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
              <div>
                <button
                  onClick={() => navigateTo('home')}
                  className="text-amber-400 hover:text-amber-300 text-xs font-bold flex items-center gap-1.5 mb-1 cursor-pointer transition"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Main Website</span>
                </button>
                <h1 className="text-xl sm:text-2xl font-bold font-serif-title">
                  Frequently Asked Questions (English &amp; বাংলা)
                </h1>
                <p className="text-xs text-slate-400">
                  Comprehensive answers to admissions, exams, fee policies, degree validity, and alumni privileges
                </p>
              </div>
              <button
                onClick={() => navigateTo('student-login')}
                className="px-4 py-2 bg-kgp-crimson hover:bg-kgp-darkred text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer"
              >
                Apply Now
              </button>
            </div>
          </div>
          <FaqSection />
          <Footer
            onNavigate={navigateTo}
            onOpenDiagram={() => setShowDiagram(true)}
            onOpenStudentLogin={() => navigateTo('student-erp')}
            onOpenAdminLogin={() => navigateTo('admin-login')}
            onOpenCertificate={() => setShowCertificate(true)}
          />
        </>
      )}

      {/* VIEW 11: DEDICATED CONTACT DETAILS & HELPDESK (Accessed via Hyperlink) */}
      {currentView === 'contact' && (
        <>
          <Navbar
            onNavigate={navigateTo}
            onOpenDiagram={() => setShowDiagram(true)}
            onOpenSignUp={() => navigateTo('student-login')}
            onOpenCertificate={() => setShowCertificate(true)}
            onOpenHowToApply={() => setShowHowToApply(true)}
            currentView={currentView}
          />
          <div className="bg-slate-950 text-white py-6 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
              <div>
                <button
                  onClick={() => navigateTo('home')}
                  className="text-amber-400 hover:text-amber-300 text-xs font-bold flex items-center gap-1.5 mb-1 cursor-pointer transition"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Main Website</span>
                </button>
                <h1 className="text-xl sm:text-2xl font-bold font-serif-title">
                  Contact Details &amp; Admissions Helpdesk
                </h1>
                <p className="text-xs text-slate-400">
                  Reach out to the BS Programme Office at the Center for Educational Technology (CET), IIT Kharagpur
                </p>
              </div>
              <button
                onClick={() => navigateTo('student-login')}
                className="px-4 py-2 bg-kgp-crimson hover:bg-kgp-darkred text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer"
              >
                Apply Now
              </button>
            </div>
          </div>
          <ContactSection />
          <Footer
            onNavigate={navigateTo}
            onOpenDiagram={() => setShowDiagram(true)}
            onOpenStudentLogin={() => navigateTo('student-erp')}
            onOpenAdminLogin={() => navigateTo('admin-login')}
            onOpenCertificate={() => setShowCertificate(true)}
          />
        </>
      )}

      {/* VIEW 12: DEDICATED DIRECTOR'S MESSAGE PAGE (Accessed via Hyperlink) */}
      {currentView === 'director' && (
        <>
          <Navbar
            onNavigate={navigateTo}
            onOpenDiagram={() => setShowDiagram(true)}
            onOpenSignUp={() => navigateTo('student-login')}
            onOpenCertificate={() => setShowCertificate(true)}
            onOpenHowToApply={() => setShowHowToApply(true)}
            currentView={currentView}
          />
          <div className="bg-slate-950 text-white py-6 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
              <div>
                <button
                  onClick={() => navigateTo('home')}
                  className="text-amber-400 hover:text-amber-300 text-xs font-bold flex items-center gap-1.5 mb-1 cursor-pointer transition"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Main Website</span>
                </button>
                <h1 className="text-xl sm:text-2xl font-bold font-serif-title">
                  Director's Address to the Nation
                </h1>
                <p className="text-xs text-slate-400">
                  Prof. Suman Chakraborty, Director, IIT Kharagpur • The Times of India Feature
                </p>
              </div>
              <button
                onClick={() => navigateTo('student-login')}
                className="px-4 py-2 bg-kgp-crimson hover:bg-kgp-darkred text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer"
              >
                Apply Now
              </button>
            </div>
          </div>
          <DirectorMessage
            onOpenQualifier={() => navigateTo('qualifier')}
            onOpenSignUp={() => navigateTo('student-login')}
          />
          <Footer
            onNavigate={navigateTo}
            onOpenDiagram={() => setShowDiagram(true)}
            onOpenStudentLogin={() => navigateTo('student-erp')}
            onOpenAdminLogin={() => navigateTo('admin-login')}
            onOpenCertificate={() => setShowCertificate(true)}
          />
        </>
      )}

      {/* VIEW 13: THE MAIN HOME PAGE (Strict Master UI Reference Replication) */}
      {currentView === 'home' && (
        <MasterLandingPage />
      )}

      {/* MODALS & PORTAL WIDGETS (Active only on non-home auxiliary routes) */}
      {currentView !== 'home' && (
        <>
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
          {currentView !== 'exam' && (
            <AdmissionsChatbot
              onOpenQualifier={() => navigateTo('qualifier')}
            />
          )}
        </>
      )}

        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}
