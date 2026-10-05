import React from 'react';
import { AlertTriangle, RefreshCw, Home, ShieldAlert } from 'lucide-react';
import iitKgpLogo from '../assets/logo';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleResetAndHome = () => {
    try {
      sessionStorage.clear();
      // Keep essential keys if any, or clear
      localStorage.removeItem('iit_kgp_admin_jwt');
      localStorage.removeItem('iit_kgp_admin_user');
    } catch (e) {}
    window.location.hash = '';
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between font-sans selection:bg-amber-500 selection:text-white">
          {/* Header */}
          <header className="bg-slate-900/90 border-b border-slate-800 p-4 sticky top-0 z-30">
            <div className="max-w-7xl mx-auto flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white p-1 border border-amber-400 flex items-center justify-center">
                <img src={iitKgpLogo} alt="IIT KGP" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                  IIT Kharagpur BS Portal
                </div>
                <h1 className="text-sm sm:text-base font-bold text-white font-serif-title">
                  System Diagnostics &amp; Recovery
                </h1>
              </div>
            </div>
          </header>

          {/* Main Error Recovery Card */}
          <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-8">
            <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto shadow-inner">
                <AlertTriangle className="w-8 h-8" />
              </div>

              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[11px] font-mono font-bold uppercase tracking-wider mb-2">
                  Application Runtime Notice
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-serif-title text-white">
                  Page Display Recovered
                </h2>
                <p className="text-slate-300 text-xs mt-2 max-w-md mx-auto leading-relaxed">
                  A client-side state issue was intercepted. You can reload the page or return to the main portal homepage to continue.
                </p>
              </div>

              {this.state.error && (
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-left font-mono text-[11px] text-rose-300 overflow-x-auto max-h-32">
                  <div>{this.state.error.toString()}</div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={this.handleReload}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Reload Current View</span>
                </button>

                <button
                  onClick={this.handleResetAndHome}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Home className="w-4 h-4" />
                  <span>Return to Main Website</span>
                </button>
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer className="bg-slate-950 py-4 px-4 border-t border-slate-800 text-center text-[11px] text-slate-500">
            IIT Kharagpur Computer and Informatics Centre (CIC) • Resilience Gateway
          </footer>
        </div>
      );
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
