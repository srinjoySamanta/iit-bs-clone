import React from 'react';
import MasterHeader from './MasterHeader';
import MasterHero from './MasterHero';
import MasterFeatureCards from './MasterFeatureCards';

export default function MasterLandingPage({ onNavigate, onOpenCertificate, onOpenHowToApply }) {
  return (
    <div className="w-full min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* 1. Header (Strict Master Reference Navigation) */}
      <MasterHeader 
        currentPage="home"
        onNavigate={onNavigate} 
        onOpenCertificate={onOpenCertificate} 
        onOpenHowToApply={onOpenHowToApply} 
      />

      {/* Main Landing Area */}
      <main className="w-full flex-1 bg-white">
        {/* 2, 3, 4: Hero Section with Direct Entry box & Explore Programme button */}
        <MasterHero onExploreProgramme={() => onNavigate('programme')} />

        {/* 5: Eight Feature Cards */}
        <MasterFeatureCards />
      </main>

      {/* PAGE 1 ENDS HERE — NOTHING ELSE */}
    </div>
  );
}
