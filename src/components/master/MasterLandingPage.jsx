import React from 'react';
import MasterHeader from './MasterHeader';
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
      
      {/* Top Navigation Header strictly matching Master Reference */}
      <MasterHeader 
        onNavigate={onNavigate} 
        onOpenCertificate={onOpenCertificate} 
        onOpenHowToApply={onOpenHowToApply} 
      />

      {/* Main Landing Area */}
      <main className="w-full flex-1">
        {/* Page 1: Hero Section (Master UI Reference: Headline, Direct Entry Box, Explore Programme, Visual Composition) */}
        <MasterHero />

        {/* Page 1: 8 Feature Pastel Cards (Master UI Reference) */}
        <MasterFeatureCards />

        {/* Page 2: Programme Highlights with Continuous Left-to-Right Marquee (Master UI Reference) */}
        <MasterProgrammeHighlights />

        {/* Additional Website Content placed cleanly below the Master Reference pages */}
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
