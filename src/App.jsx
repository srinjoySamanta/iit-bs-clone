import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutKgpDirector from './components/AboutKgpDirector';
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
import StudentLoginPage from './pages/StudentLoginPage';
import AdminLoginPage from './pages/AdminLoginPage';
import QualifierRoundPortal from './components/qualifier/QualifierRoundPortal';
import QualifierExamEngine from './components/exam/QualifierExamEngine';
import AdmissionsChatbot from './components/chat/AdmissionsChatbot';
import { Layers, ShieldCheck, UserCheck, Award, Home, Sparkles, BookOpen } from 'lucide-react';

export default function App() {
  // Navigation View: 'home' | 'student-login' | 'admin-login' | 'qualifier' | 'exam'
  const [currentView, setCurrentView] = useState('home');
  const [examCandidate, setExamCandidate] = useState({ name: 'Srinjoy Samanta', roll: 'KGP-QUAL-2026-0842' });

  const [showDiagram, setShowDiagram] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  // Sync with browser hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'student-login') setCurrentView('student-login');
      else if (hash === 'admin' || hash === 'admin-login') setCurrentView('admin-login');
      else if (hash === 'qualifier') setCurrentView('qualifier');
      else if (hash === 'exam') setCurrentView('exam');
      else if (hash === 'student-portal') setShowStudentModal(true);
      else if (hash === 'admin-portal') setShowAdminModal(true);
      else if (hash === 'diagram') setShowDiagram(true);
      else if (hash === 'signup') setShowSignUp(true);
      else if (hash === 'home' || hash === '') setCurrentView('home');
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (view) => {
    setCurrentView(view);
    window.location.hash = view;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartExam = (candidate) => {
    setExamCandidate(candidate);
    navigateTo('exam');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-amber-500 selection:text-white">
      
      {/* Floating Fast Switcher Bar (Positioned on bottom-left, hidden during exam) */}
      {currentView !== 'exam' && (
        <aside aria-label="Portal quick actions" className="fixed bottom-4 left-4 z-40 flex flex-col items-start gap-2">
          <div className="bg-slate-900/95 text-white backdrop-blur-md p-1.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-1.5">
            
            <button
              onClick={() => navigateTo('home')}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition ${
                currentView === 'home' 
                  ? 'bg-amber-500 text-kgp-darknavy shadow' 
                  : 'hover:bg-slate-800 text-slate-300'
              }`}
              title="Single Page for Everyone"
            >
              <Home className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Main Website</span>
            </button>

            <button
              onClick={() => navigateTo('qualifier')}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition ${
                currentView === 'qualifier'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'hover:bg-slate-800 text-emerald-400 font-bold'
              }`}
              title="Qualifier Round Portal"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Qualifier Portal</span>
            </button>

            <button
              onClick={() => navigateTo('student-login')}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition ${
                currentView === 'student-login'
                  ? 'bg-kgp-crimson text-white shadow'
                  : 'hover:bg-slate-800 text-slate-300'
              }`}
              title="Dedicated Student Login Page"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Student</span>
            </button>



            <button
              onClick={() => setShowDiagram(prev => !prev)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 transition"
              title="Toggle Portal Block Diagram"
            >
              <Layers className="w-4 h-4" />
            </button>
          </div>
        </aside>
      )}

      {/* VIEW 1: DEDICATED QUALIFIER ROUND EXAMINATION PORTAL (Details + Payment + Roster) */}
      {currentView === 'qualifier' && (
        <QualifierRoundPortal
          onStartExam={handleStartExam}
          onBackToHome={() => navigateTo('home')}
        />
      )}

      {/* VIEW 2: LIVE COMPUTER-BASED QUALIFIER EXAM ENGINE (Actual Test Engine) */}
      {currentView === 'exam' && (
        <QualifierExamEngine
          candidateName={examCandidate.name}
          candidateRoll={examCandidate.roll}
          onExit={() => navigateTo('qualifier')}
        />
      )}

      {/* VIEW 3: DEDICATED STUDENT LOGIN PAGE */}
      {currentView === 'student-login' && (
        <StudentLoginPage
          onLoginSuccess={() => setShowStudentModal(true)}
          onBackToHome={() => navigateTo('home')}
          onOpenSignUp={() => setShowSignUp(true)}
        />
      )}

      {/* VIEW 4: DEDICATED ADMIN LOGIN PAGE */}
      {currentView === 'admin-login' && (
        <AdminLoginPage
          onLoginSuccess={() => setShowAdminModal(true)}
          onBackToHome={() => navigateTo('home')}
        />
      )}

      {/* VIEW 5: SINGLE PAGE FOR ALL (THE COMPLETE PUBLIC WEBSITE) */}
      {currentView === 'home' && (
        <>
          {/* Main Navbar */}
          <Navbar
            onNavigate={navigateTo}
            onOpenDiagram={() => setShowDiagram(true)}
            onOpenSignUp={() => setShowSignUp(true)}
            onOpenCertificate={() => setShowCertificate(true)}
            currentView={currentView}
          />

          {/* Hero Section */}
          <Hero
            onOpenSignUp={() => setShowSignUp(true)}
            onOpenDiagram={() => setShowDiagram(true)}
            onOpenCertificate={() => setShowCertificate(true)}
            onOpenQualifier={() => navigateTo('qualifier')}
          />

          {/* Block Diagram Section (toggled) */}
          {showDiagram && (
            <section id="diagram-section" className="bg-slate-200/70 py-10 px-4 sm:px-6 lg:px-8 border-b-2 border-slate-300">
              <div className="max-w-7xl mx-auto">
                <BlockDiagramViewer
                  onClose={() => setShowDiagram(false)}
                  onOpenStudentLogin={() => setShowStudentModal(true)}
                  onOpenAdminLogin={() => setShowAdminModal(true)}
                  onOpenSignUp={() => setShowSignUp(true)}
                  onOpenCertificate={() => setShowCertificate(true)}
                />
              </div>
            </section>
          )}

          {/* About IIT KGP & Director's Message */}
          <AboutKgpDirector />

          {/* Course Structure & Syllabus (Exclusively Data Science & AI) */}
          <CourseStructure onOpenCertificate={() => setShowCertificate(true)} />

          {/* Direct Admission & Regular Qualifier Pathways */}
          <EligibilityPathways onOpenSignUp={() => setShowSignUp(true)} />

          {/* Fee Structure & Real-time Scholarship Calculator */}
          <FeesStructure />

          {/* Campus Immersion, Library & Placements */}
          <CampusLifePlacement />

          {/* FAQs (with English & Bengali translations) */}
          <FaqSection />

          {/* Contact Details & Inquiry Form */}
          <ContactSection />

          {/* Footer */}
          <Footer
            onOpenDiagram={() => setShowDiagram(true)}
            onOpenStudentLogin={() => setShowStudentModal(true)}
            onOpenAdminLogin={() => setShowAdminModal(true)}
            onOpenCertificate={() => setShowCertificate(true)}
          />
        </>
      )}

      {/* MODALS */}
      {/* 1. Student Portal Dashboard Modal */}
      <StudentPortalModal
        isOpen={showStudentModal}
        onClose={() => setShowStudentModal(false)}
      />

      {/* 2. Admin Management Console Modal */}
      <AdminPortalModal
        isOpen={showAdminModal}
        onClose={() => setShowAdminModal(false)}
      />

      {/* 3. Applicant Sign Up 5-Stage Wizard */}
      <SignUpWizardModal
        isOpen={showSignUp}
        onClose={() => setShowSignUp(false)}
      />

      {/* 4. Sample Degree Certificate Preview */}
      <SampleCertificateModal
        isOpen={showCertificate}
        onClose={() => setShowCertificate(false)}
      />

      {/* 5. Bottom-Right Floating AI Admissions Chatbot */}
      {currentView !== 'exam' && (
        <AdmissionsChatbot
          onOpenQualifier={() => navigateTo('qualifier')}
        />
      )}

    </div>
  );
}
