import React, { useState } from 'react';
import { 
  ArrowLeft, Search, Layers, ExternalLink, ChevronRight, 
  BookOpen, ShieldCheck, UserCheck, X, Sparkles, HelpCircle 
} from 'lucide-react';
import { P } from '../data/blockDiagramData';

export default function BlockDiagramViewer({ 
  onClose, 
  onOpenStudentLogin, 
  onOpenAdminLogin, 
  onOpenSignUp, 
  onOpenCertificate 
}) {
  const [cur, setCur] = useState("main");
  const [hist, setHist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const currentNode = P[cur] || P["main"];

  const openPage = (id) => {
    if (P[id]) {
      setHist(prev => [...prev, cur]);
      setCur(id);
      setSearchQuery("");
    }
  };

  const goBack = () => {
    if (hist.length > 0) {
      const nextHist = [...hist];
      const prevCur = nextHist.pop();
      setHist(nextHist);
      setCur(prevCur);
    }
  };

  const resetToMain = () => {
    setHist([]);
    setCur("main");
    setSearchQuery("");
  };

  // Breadcrumb items
  const breadcrumbs = [
    { id: "main", title: "Main" },
    ...hist.map(x => ({ id: x, title: P[x]?.title || x })),
    { id: cur, title: currentNode.title }
  ];

  // Quick jump candidates when searching
  const searchResults = searchQuery.trim() 
    ? Object.keys(P).filter(id => {
        const item = P[id];
        return item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
               (item.note && item.note.toLowerCase().includes(searchQuery.toLowerCase())) ||
               item.items.some(i => i.title.toLowerCase().includes(searchQuery.toLowerCase()) || i.desc.toLowerCase().includes(searchQuery.toLowerCase()));
      }).slice(0, 8)
    : [];

  return (
    <div className="bg-slate-100 rounded-2xl border-2 border-slate-300 p-6 shadow-xl my-8">
      
      {/* Viewer Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-300">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-kgp-crimson text-amber-400">
              <Layers className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-serif-title text-slate-900">
              BS Programme IIT Kgp Portal Block Diagram
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Interactive visual architecture of the website, student portal & admin console.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search diagram node..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-kgp-crimson w-48 sm:w-60"
            />
          </div>

          <button
            onClick={resetToMain}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition"
          >
            Reset
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Search results dropdown if searching */}
      {searchQuery.trim() && (
        <div className="bg-white border border-slate-300 rounded-xl p-3 my-4 shadow-md">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            Found Matching Diagram Nodes ({searchResults.length})
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {searchResults.map(id => (
              <button
                key={id}
                onClick={() => { setCur(id); setSearchQuery(""); }}
                className="text-left p-2 rounded-lg hover:bg-slate-100 border border-slate-200 text-xs transition flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-kgp-crimson">{P[id].title}</div>
                  <div className="text-[11px] text-slate-500">{P[id].items.length} child items</div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Breadcrumbs Navigation */}
      <div className="flex flex-wrap items-center gap-1.5 py-3 text-xs text-slate-600 font-medium">
        {breadcrumbs.map((b, idx) => (
          <React.Fragment key={b.id + idx}>
            <button
              onClick={() => {
                if (idx < breadcrumbs.length - 1) {
                  setHist(breadcrumbs.slice(1, idx).map(x => x.id));
                  setCur(b.id);
                }
              }}
              className={`hover:text-kgp-crimson transition ${
                idx === breadcrumbs.length - 1 ? 'font-bold text-slate-900' : 'text-slate-500 hover:underline'
              }`}
            >
              {b.title}
            </button>
            {idx < breadcrumbs.length - 1 && (
              <span className="text-slate-400">→</span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Back Button */}
      {hist.length > 0 && (
        <button
          onClick={goBack}
          className="mb-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-400 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to previous level</span>
        </button>
      )}

      {/* Direct Quick Simulator Triggers based on current view */}
      {cur === "portal" && (
        <div className="mb-4 p-4 rounded-xl bg-amber-50 border border-amber-300 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-amber-900">
            <strong>Live Simulation Available:</strong> You can launch and test both the Student Portal and Admin Console right here.
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenStudentLogin}
              className="px-3 py-1.5 bg-kgp-crimson text-white text-xs font-bold rounded-lg shadow hover:bg-kgp-darkred transition"
            >
              Open Student Portal
            </button>
            <button
              onClick={onOpenAdminLogin}
              className="px-3 py-1.5 bg-kgp-navy text-white text-xs font-bold rounded-lg shadow hover:bg-slate-800 transition"
            >
              Open Admin Console
            </button>
          </div>
        </div>
      )}

      {cur === "signup" && (
        <div className="mb-4 p-4 rounded-xl bg-blue-50 border border-blue-300 flex items-center justify-between gap-3">
          <div className="text-xs text-blue-900">
            <strong>Interactive Sign Up Wizard:</strong> Test the 5-step registration process with WBJEE / JEE score inputs.
          </div>
          <button
            onClick={onOpenSignUp}
            className="px-3.5 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg shadow hover:bg-blue-700 transition"
          >
            Launch Sign Up Flow
          </button>
        </div>
      )}

      {cur === "degree" && (
        <div className="mb-4 p-4 rounded-xl bg-emerald-50 border border-emerald-300 flex items-center justify-between gap-3">
          <div className="text-xs text-emerald-900">
            <strong>Sample Degree Certificate:</strong> Preview the official IIT Kharagpur BS Degree document.
          </div>
          <button
            onClick={onOpenCertificate}
            className="px-3.5 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-lg shadow hover:bg-emerald-700 transition"
          >
            View Certificate
          </button>
        </div>
      )}

      {/* Cards Grid representing the tree children */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
        {currentNode.items && currentNode.items.length > 0 ? (
          currentNode.items.map((item) => {
            const hasSub = !!P[item.id];
            return (
              <div
                key={item.id}
                onClick={() => hasSub && openPage(item.id)}
                className={`bg-white border rounded-xl p-4 shadow-sm transition-all duration-200 flex flex-col justify-between ${
                  hasSub 
                    ? 'border-slate-300 hover:border-slate-500 hover:-translate-y-0.5 cursor-pointer hover:shadow-md' 
                    : 'border-slate-200 opacity-90'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h3 className="font-bold text-slate-800 text-sm font-sans">
                      {item.title}
                    </h3>
                    {hasSub && (
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono">
                        {P[item.id].items?.length || 0} sub
                      </span>
                    )}
                  </div>

                  {item.desc && (
                    <p className="text-xs text-slate-500 leading-relaxed font-sans">
                      {item.desc}
                    </p>
                  )}
                </div>

                {hasSub && (
                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-kgp-crimson font-semibold">
                    <span>Explore details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-8 text-center bg-white rounded-xl border border-slate-200 text-slate-500 text-xs">
            {currentNode.note || "Terminal node in diagram. Details provided in corresponding portal component."}
          </div>
        )}
      </div>

      {/* Note box */}
      {currentNode.note && (
        <div className="mt-4 p-4 bg-white border border-slate-300 rounded-xl text-xs text-slate-700 leading-relaxed">
          <strong className="text-slate-900 block mb-1">Architecture Specification Note:</strong>
          {currentNode.note}
        </div>
      )}

    </div>
  );
}
