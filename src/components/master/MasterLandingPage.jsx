import React from 'react';
import MasterHeader from './MasterHeader';
import SubnavTabs from '../SubnavTabs';
import MasterHero from './MasterHero';
import MasterFeatureCards from './MasterFeatureCards';
import MasterProgrammeHighlights from './MasterProgrammeHighlights';
import DirectorMessage from '../DirectorMessage';
import BlockDiagramViewer from '../BlockDiagramViewer';
import HomeOverview from '../HomeOverview';
import Footer from '../Footer';

export default function MasterLandingPage({
  onNavigate,
  onOpenCertificate,
  onOpenHowToApply,
  onOpenDiagram,
  onOpenSignUp,
  onOpenQualifier,
  showDiagram,
  setShowDiagram,
  onOpenStudentLogin,
  onOpenAdminLogin
}) {
  return (
    <div className="w-full min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Permanent Fixed/Sticky Header with Master Top Bar & 13-Tab Standby Subnav */}
      <div id="main-fixed-navbar" className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200">
        {/* Row 1: Master UI Top Navigation Header (with Gated Dropdowns & Apply Now) */}
        <MasterHeader 
          onNavigate={onNavigate} 
          onOpenCertificate={onOpenCertificate} 
          onOpenHowToApply={onOpenHowToApply} 
        />

        {/* Row 2: 13-Tab Standby Subnav Bar (Permanently standby on top, never disappears on scroll) */}
        <SubnavTabs onNavigate={onNavigate} />
      </div>

      {/* Main Landing Area */}
      <main className="w-full flex-1">
        {/* Page 1: Hero Section (Master UI Reference) */}
        <MasterHero />

        {/* Page 1: 8 Feature Pastel Cards (Master UI Reference) */}
        <MasterFeatureCards />

        {/* Page 2: Programme Highlights with Continuous Left-to-Right Marquee */}
        <MasterProgrammeHighlights />

        {/* Note from our Director (TOI Exclusive Feature & Visionary Address) */}
        <DirectorMessage
          onOpenQualifier={onOpenQualifier}
          onOpenSignUp={onOpenSignUp}
        />

        {/* Block Diagram Section (Toggled on Demand) */}
        {showDiagram && (
          <section id="diagram-section" className="bg-slate-200/70 py-10 px-4 sm:px-6 lg:px-8 border-b-2 border-slate-300">
            <div className="max-w-7xl mx-auto">
              <BlockDiagramViewer
                onClose={() => setShowDiagram && setShowDiagram(false)}
                onOpenStudentLogin={onOpenStudentLogin}
                onOpenAdminLogin={onOpenAdminLogin}
                onOpenSignUp={onOpenSignUp}
                onOpenCertificate={onOpenCertificate}
              />
            </div>
          </section>
        )}

        {/* Combined Curriculum, Pedagogy, Eligibility, Fees, Comparison, Campus & FAQ Directory */}
        <HomeOverview
          onNavigate={onNavigate}
          onOpenCertificate={onOpenCertificate}
          onOpenHowToApply={onOpenHowToApply}
          onOpenQualifier={onOpenQualifier}
          onOpenSignUp={onOpenSignUp}
        />
      </main>

      {/* Clean Institutional Footer */}
      <Footer
        onNavigate={onNavigate}
        onOpenDiagram={onOpenDiagram}
        onOpenStudentLogin={onOpenStudentLogin}
        onOpenAdminLogin={onOpenAdminLogin}
        onOpenCertificate={onOpenCertificate}
      />
    </div>
  );
}
