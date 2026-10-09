import React from 'react';
import MasterHeader from './MasterHeader';
import MasterDirectorAndHighlights from './MasterDirectorAndHighlights';

export default function MasterPageTwo({ onNavigate, onOpenCertificate, onOpenHowToApply }) {
  return (
    <div className="w-full min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top Header (Strict Master Reference Navigation) */}
      <MasterHeader 
        currentPage="programme"
        onNavigate={onNavigate} 
        onOpenCertificate={onOpenCertificate} 
        onOpenHowToApply={onOpenHowToApply} 
      />

      {/* PAGE 2 MAIN CONTENT: REUSES COMPACT DIRECTOR'S MESSAGE + SCROLLING PROGRAMME HIGHLIGHTS */}
      <main className="w-full flex-1 bg-white">
        <MasterDirectorAndHighlights />
      </main>
    </div>
  );
}
