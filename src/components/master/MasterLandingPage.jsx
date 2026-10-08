import React from 'react';
import MasterHeader from './MasterHeader';
import MasterHero from './MasterHero';
import MasterFeatureCards from './MasterFeatureCards';
import MasterProgrammeHighlights from './MasterProgrammeHighlights';

export default function MasterLandingPage() {
  return (
    <div className="w-full min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top Header Navigation */}
      <MasterHeader />

      {/* Main Landing Area */}
      <main className="w-full flex-1">
        {/* Page 1: Hero Section */}
        <MasterHero />

        {/* Page 1: 8 Feature Cards */}
        <MasterFeatureCards />

        {/* Page 2: Programme Highlights with Left-to-Right Marquee */}
        <MasterProgrammeHighlights />
      </main>
    </div>
  );
}
