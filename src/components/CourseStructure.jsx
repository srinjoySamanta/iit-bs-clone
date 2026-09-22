import React, { useState } from 'react';
import { 
  BookOpen, Award, CheckCircle2, ChevronRight, Layers, 
  ExternalLink, FileText, Sparkles, GraduationCap 
} from 'lucide-react';
import { LEVELS_DATA } from '../data/portalData';

export default function CourseStructure({ onOpenCertificate }) {
  const [activeTab, setActiveTab] = useState(0);
  const currentLevel = LEVELS_DATA[activeTab];

  return (
    <section id="structure" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-kgp-crimson bg-red-100/60 px-3 py-1 rounded-full">
            Flexible Modular Curriculum
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif-title">
            Program Structure & Syllabus
          </h2>
          <p className="mt-3 text-slate-600">
            A revolutionary 4-stage degree structure. Progress at your own pace and choose when to exit with accredited IIT credentials or graduate with the 4-Year BS Degree.
          </p>
        </div>

        {/* Level Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {LEVELS_DATA.map((lvl, index) => (
            <button
              key={lvl.id}
              onClick={() => setActiveTab(index)}
              className={`px-4 sm:px-6 py-3 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${
                activeTab === index
                  ? 'bg-kgp-crimson text-white shadow-lg shadow-red-900/20 scale-105'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${activeTab === index ? 'bg-amber-400' : 'bg-slate-400'}`} />
              <span>{lvl.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === index ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                {lvl.credits} Cr
              </span>
            </button>
          ))}
        </div>

        {/* Active Level Detail Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
          
          {/* Level Header Banner */}
          <div className="bg-gradient-to-r from-kgp-navy via-slate-900 to-kgp-crimson p-6 sm:p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 px-2.5 py-0.5 rounded border border-amber-400/30">
                  {currentLevel.badge}
                </span>
                <span className="text-xs text-slate-300">Minimum Duration: {currentLevel.duration}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif-title text-white">
                {currentLevel.name}
              </h3>
              <p className="text-sm text-amber-200 font-medium flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Exit Award: {currentLevel.exitAward}</span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onOpenCertificate}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-kgp-darknavy font-bold text-xs rounded-xl shadow transition flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>Preview Degree Certificate</span>
              </button>
            </div>
          </div>

          {/* Level Content & Course List */}
          <div className="p-6 sm:p-8">
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              {currentLevel.description}
            </p>

            {/* Special Alumni Status Badge for Degree Level */}
            {(currentLevel.id === 'bs' || currentLevel.id === 'bsc') && (
              <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-300/80 flex items-start gap-3">
                <GraduationCap className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-amber-900">
                    Official IIT Kharagpur Alumni Status & Convocation
                  </h4>
                  <p className="text-xs text-amber-800 mt-0.5">
                    Upon successfully completing the degree requirements, graduates receive permanent lifetime membership to the 
                    <strong> IIT Kharagpur Alumni Association</strong>, with official Alumni Card and in-person Convocation on campus.
                  </p>
                </div>
              </div>
            )}

            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Curriculum Courses & Credit Allocations
            </h4>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentLevel.courses.map((course) => (
                <div 
                  key={course.code}
                  className="p-4 rounded-xl border border-slate-200 hover:border-kgp-crimson/50 hover:bg-red-50/20 transition group flex items-start justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-kgp-crimson bg-red-100/70 px-2 py-0.5 rounded">
                        {course.code}
                      </span>
                      <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {course.type}
                      </span>
                    </div>
                    <h5 className="text-sm font-bold text-slate-800 group-hover:text-kgp-crimson transition">
                      {course.title}
                    </h5>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                      {course.credits} Credits
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Academic Aspects Note */}
            <div className="mt-8 pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Weekly Graded Assignments:</strong> 4 continuous weekly assignments per term for evaluation.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>In-Person Invigilated Exams:</strong> Quizzes and final exams held at verified test centers.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Industry Capstone:</strong> Hands-on live project under faculty & industry mentors.
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
