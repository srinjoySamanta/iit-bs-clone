import React, { useState } from 'react';
import {
  Home,
  BookOpen,
  CheckCircle2,
  Award,
  Building2,
  FileText,
  HelpCircle,
  Mail,
  Phone,
  GraduationCap,
  Sparkles,
  Layers,
  ChevronLeft,
  ChevronRight,
  Shield,
  UserCheck,
  ExternalLink,
  Menu,
  X
} from 'lucide-react';
import iitKgpLogo from '../assets/logo';

export default function LeftNavigationSidebar({
  currentView = 'home',
  onNavigate,
  onOpenCertificate,
  onOpenHowToApply,
  onOpenDiagram,
  onOpenQualifier
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navLinks = [
    {
      id: 'home',
      label: 'Home & Overview',
      subtitle: 'Main programme portal',
      icon: Home,
      action: () => onNavigate('home')
    },
    {
      id: 'structure',
      label: 'Course Structure & Syllabus',
      subtitle: '142 Credits modular roadmap',
      icon: BookOpen,
      badge: '142 Cr',
      action: () => onNavigate('structure')
    },
    {
      id: 'eligibility',
      label: 'Eligibility & Direct Pathways',
      subtitle: 'WBJEE, JEE & Universal Qualifier',
      icon: CheckCircle2,
      badge: 'Dual Entry',
      action: () => onNavigate('eligibility')
    },
    {
      id: 'fees',
      label: 'Fees Structure & Scholarships',
      subtitle: 'Modular pay-per-credit & waivers',
      icon: Award,
      badge: 'Waivers',
      action: () => onNavigate('fees')
    },
    {
      id: 'campus',
      label: 'Campus Immersion & Placements',
      subtitle: '2,100-acre campus & CDC cell',
      icon: Building2,
      action: () => onNavigate('campus')
    },
    {
      id: 'how-to-apply',
      label: 'How to Apply (5 Stages)',
      subtitle: 'Step-by-step application guide',
      icon: FileText,
      badge: 'Guide',
      action: () => {
        if (onOpenHowToApply) onOpenHowToApply();
        else onNavigate('how-to-apply');
      }
    },
    {
      id: 'faqs',
      label: 'Frequently Asked Questions',
      subtitle: 'Bilingual: English & বাংলা',
      icon: HelpCircle,
      action: () => onNavigate('faqs')
    },
    {
      id: 'director',
      label: "Director's Address",
      subtitle: 'Prof. Suman Chakraborty, Director',
      icon: Mail,
      action: () => onNavigate('director')
    },
    {
      id: 'contact',
      label: 'Contact & Helpdesk',
      subtitle: 'Direct support & admissions desk',
      icon: Phone,
      action: () => onNavigate('contact')
    }
  ];

  const portalShortcuts = [
    {
      label: 'Sample Degree Certificate',
      icon: GraduationCap,
      action: onOpenCertificate,
      isSpecial: false
    },
    {
      label: 'Qualifier Exam Portal',
      icon: Sparkles,
      action: onOpenQualifier || (() => onNavigate('qualifier')),
      badge: 'Live',
      isSpecial: true
    },
    {
      label: 'Architecture Block Diagram',
      icon: Layers,
      action: onOpenDiagram,
      isSpecial: false
    }
  ];

  const handleLinkClick = (action) => {
    action();
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Sticky Opener Strip (Visible on small screens) */}
      <div className="lg:hidden sticky top-16 z-30 bg-[#800000] text-amber-50 px-4 py-2 border-b border-amber-900/60 flex items-center justify-between shadow-xs">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="flex items-center gap-2 text-xs font-bold text-amber-200 hover:text-white cursor-pointer py-0.5"
        >
          <Menu className="w-4 h-4" />
          <span>Programme Directory Menu (Left Links)</span>
        </button>
        <span className="text-[11px] font-mono text-amber-300/80 uppercase">
          {currentView}
        </span>
      </div>

      {/* Mobile Drawer Backdrop */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Main Left Navigation Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 lg:top-20 z-40 lg:z-20 h-screen lg:h-[calc(100vh-5rem)] bg-[#fcfbfa] border-r border-stone-200 shadow-sm transition-all duration-300 flex flex-col justify-between shrink-0 ${
          isCollapsed ? 'lg:w-20' : 'w-72 lg:w-72'
        } ${
          isMobileOpen
            ? 'left-0'
            : '-left-80 lg:left-0'
        }`}
      >
        {/* Top Header of Sidebar */}
        <div className="p-3.5 border-b border-stone-200 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 p-1 flex items-center justify-center shrink-0">
              <img src={iitKgpLogo} alt="IIT KGP" className="w-full h-full object-contain" />
            </div>
            {!isCollapsed && (
              <div className="min-w-0">
                <div className="text-[10px] font-bold text-[#800000] uppercase tracking-wider font-mono truncate">
                  IIT Kharagpur BS
                </div>
                <div className="text-xs font-bold text-slate-900 font-serif truncate">
                  Programme Directory
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1">
            {/* Desktop Collapse Toggle */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-stone-100 transition cursor-pointer"
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>

            {/* Mobile Close Button */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-stone-100 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Navigation Links */}
        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4 text-xs font-sans">
          {/* Section: Academic Directory */}
          <div>
            {!isCollapsed && (
              <div className="px-2.5 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center justify-between">
                <span>Left Directory Links</span>
                <span className="text-[9px] text-[#800000] font-sans">Dedicated Views</span>
              </div>
            )}

            <nav className="space-y-1">
              {navLinks.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleLinkClick(item.action)}
                    className={`w-full text-left px-2.5 py-2 rounded-xl flex items-center gap-2.5 transition group cursor-pointer ${
                      isActive
                        ? 'bg-[#800000] text-white shadow-xs font-bold'
                        : 'text-slate-700 hover:bg-red-50 hover:text-[#800000]'
                    }`}
                    title={item.label}
                  >
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                        isActive ? 'text-amber-300' : 'text-slate-400 group-hover:text-[#800000]'
                      }`}
                    />
                    {!isCollapsed && (
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="truncate text-xs font-semibold leading-tight">
                            {item.label}
                          </span>
                          {item.badge && (
                            <span
                              className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-bold uppercase shrink-0 ${
                                isActive
                                  ? 'bg-white/20 text-white'
                                  : 'bg-red-100 text-[#800000]'
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <div
                          className={`text-[10px] truncate leading-tight mt-0.5 ${
                            isActive ? 'text-amber-100/90' : 'text-slate-500'
                          }`}
                        >
                          {item.subtitle}
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Section: Interactive Portals & Resources */}
          <div className="pt-2 border-t border-stone-200">
            {!isCollapsed && (
              <div className="px-2.5 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                Portals &amp; Credentials
              </div>
            )}

            <div className="space-y-1">
              {portalShortcuts.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => handleLinkClick(item.action)}
                    className={`w-full text-left px-2.5 py-2 rounded-xl flex items-center gap-2.5 transition cursor-pointer text-xs ${
                      item.isSpecial
                        ? 'bg-emerald-50 text-emerald-900 border border-emerald-200 hover:bg-emerald-100 font-bold'
                        : 'text-slate-700 hover:bg-stone-100'
                    }`}
                    title={item.label}
                  >
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        item.isSpecial ? 'text-emerald-700' : 'text-slate-500'
                      }`}
                    />
                    {!isCollapsed && (
                      <span className="truncate flex-1 font-medium leading-tight">
                        {item.label}
                      </span>
                    )}
                    {!isCollapsed && item.badge && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-600 text-white font-mono font-bold shrink-0">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section: Enterprise Gateways */}
          <div className="pt-2 border-t border-stone-200">
            {!isCollapsed && (
              <div className="px-2.5 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                Institutional Portals
              </div>
            )}

            <div className="space-y-1">
              <button
                onClick={() => handleLinkClick(() => onNavigate('student-erp'))}
                className="w-full text-left px-2.5 py-1.5 rounded-lg flex items-center gap-2 text-xs font-semibold text-emerald-800 hover:bg-emerald-50 transition cursor-pointer"
                title="BS Student Learning Hub"
              >
                <GraduationCap className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                {!isCollapsed && <span className="truncate">BS Student ERP &amp; LMS</span>}
              </button>

              <button
                onClick={() => handleLinkClick(() => onNavigate('staff-login'))}
                className="w-full text-left px-2.5 py-1.5 rounded-lg flex items-center gap-2 text-xs font-semibold text-indigo-900 hover:bg-indigo-50 transition cursor-pointer"
                title="Staff Operations Center"
              >
                <UserCheck className="w-3.5 h-3.5 text-indigo-700 shrink-0" />
                {!isCollapsed && <span className="truncate">Staff Officer Gate</span>}
              </button>

              <button
                onClick={() => handleLinkClick(() => onNavigate('admin-login'))}
                className="w-full text-left px-2.5 py-1.5 rounded-lg flex items-center gap-2 text-xs font-semibold text-[#800000] hover:bg-red-50 transition cursor-pointer"
                title="Master Admin Directorate"
              >
                <Shield className="w-3.5 h-3.5 text-[#800000] shrink-0" />
                {!isCollapsed && <span className="truncate">Super Admin Directorate</span>}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom CTA on Left Sidebar */}
        {!isCollapsed && (
          <div className="p-3 border-t border-stone-200 bg-stone-50">
            <button
              onClick={() => handleLinkClick(() => onNavigate('student-login'))}
              className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-[#800000] to-red-900 hover:from-red-900 hover:to-[#800000] text-white text-xs font-bold shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Apply for 2026 Batch</span>
              <ExternalLink className="w-3 h-3 text-amber-300" />
            </button>
            <div className="text-[10px] text-center text-slate-500 font-mono mt-1">
              Admissions Live • IIT Kharagpur
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
