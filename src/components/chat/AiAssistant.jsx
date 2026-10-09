import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, X, Send, RotateCcw, Sparkles, MessageSquare, 
  AlertCircle, ChevronRight, User, HelpCircle, CheckCircle2,
  ExternalLink, Phone, Mail
} from 'lucide-react';
import { sendAiChatMessage } from '../../services/apiService';
import iitKgpLogo from '../../assets/logo';

export default function AiAssistant({ onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: `Hello! 👋 I am the **IIT Kharagpur AI Assistant** for the **B.S. in Data Science and Artificial Intelligence** programme.

I can help answer your questions regarding:
* **Direct Entry Pathways** (WBJEE, JEE Advanced, Tripura JEE, Teachers)
* **Qualifier Round Exam** (Format, 40% cutoff, 4 subjects, centers)
* **Eligibility & Admissions** (Class 12 with Math, no age limit)
* **Fee Structure & Scholarships** (Up to 75% fee waivers)
* **Curriculum & NEP 2020 Multi-Exit Options** (Certificate, Diploma, B.Sc., B.S.)
* **Official Helpdesk Contacts**

How can I help you today? Ask a question below or pick a suggested topic!`,
      timestamp: 'Just now'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  const quickPrompts = [
    "Who is eligible for Direct Entry?",
    "What is the Qualifier Exam cutoff?",
    "What are the fees and income waivers?",
    "What subjects are taught in this BS program?",
    "Official Admissions Helpdesk"
  ];

  const handleSendMessage = async (textToSend) => {
    const query = String(textToSend || inputMessage || '').trim();
    if (!query || isLoading) return;

    setErrorMessage(null);

    const userMessage = {
      id: 'msg-u-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Build conversation history for context
      const history = messages.slice(-6).map((m) => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text
      }));

      const res = await sendAiChatMessage(query, history, 'session-' + Date.now());

      if (res && res.success && res.reply) {
        const assistantMessage = {
          id: 'msg-a-' + Date.now(),
          sender: 'assistant',
          text: res.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        setErrorMessage(res?.error || 'Unable to receive a response. Please try again.');
      }
    } catch (err) {
      console.error('Chat error:', err);
      setErrorMessage('Network connection error. You can also reach the official helpdesk at bs-admissions@iitkgp.ac.in.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    setErrorMessage(null);
    setMessages([
      {
        id: 'welcome-reset-' + Date.now(),
        sender: 'assistant',
        text: `Chat restarted. How can I help you with the **IIT Kharagpur B.S. in Data Science & AI** or the **Qualifier Exam** today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Helper to render basic markdown formatting cleanly
  const renderFormattedText = (rawText) => {
    const lines = rawText.split('\n');
    return lines.map((line, idx) => {
      // Section Heading (###)
      if (line.startsWith('### ')) {
        return (
          <h4 key={idx} className="font-bold text-[#003893] text-[13.5px] mt-2 mb-1 first:mt-0">
            {line.replace('### ', '')}
          </h4>
        );
      }
      // Bullet Item (* or -)
      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
        const itemText = line.replace(/^[\s]*[\*\-]\s+/, '');
        return (
          <div key={idx} className="flex items-start gap-1.5 pl-1 my-0.5 text-slate-700">
            <span className="text-[#003893] font-bold text-xs mt-0.5">•</span>
            <span>{parseInlineStyles(itemText)}</span>
          </div>
        );
      }
      // Empty line spacer
      if (!line.trim()) {
        return <div key={idx} className="h-1.5" />;
      }
      // Standard Paragraph
      return (
        <p key={idx} className="my-0.5 text-slate-700 leading-relaxed">
          {parseInlineStyles(line)}
        </p>
      );
    });
  };

  // Helper for **bold** text and [links]
  const parseInlineStyles = (str) => {
    const parts = [];
    let remaining = str;

    // Split on **bold**
    const regex = /\*\*(.*?)\*\*/g;
    let match;
    let lastIndex = 0;

    while ((match = regex.exec(str)) !== null) {
      if (match.index > lastIndex) {
        parts.push(str.substring(lastIndex, match.index));
      }
      parts.push(
        <strong key={match.index} className="font-bold text-slate-900">
          {match[1]}
        </strong>
      );
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < str.length) {
      parts.push(str.substring(lastIndex));
    }

    return parts.length > 0 ? parts : str;
  };

  return (
    <>
      {/* ============================================================
          1. FLOATING AI ASSISTANT BUTTON (BOTTOM-RIGHT CORNER)
         ============================================================ */}
      <div 
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 select-none pointer-events-auto"
        style={{ zIndex: 9999 }}
      >
        {!isOpen && (
          <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-2 duration-300">
            {/* Pill Label "Ask AI" */}
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="px-3 py-1.5 bg-white/95 backdrop-blur-xs text-[#003893] hover:text-[#002b70] text-xs font-bold rounded-full shadow-lg border border-slate-200/90 flex items-center gap-1.5 transition transform hover:scale-105 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#003893]"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin-slow" />
              <span>Ask AI</span>
            </button>

            {/* Circular Floating AI Button */}
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              aria-label="Open IIT Kharagpur AI Assistant"
              className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#003893] hover:bg-[#002b70] text-white shadow-xl hover:shadow-2xl hover:shadow-blue-900/30 flex items-center justify-center transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300 cursor-pointer border-2 border-white/80"
              title="Chat with IIT Kharagpur AI Assistant"
            >
              <Bot className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </button>
          </div>
        )}
      </div>

      {/* ============================================================
          2. COMPACT AI CHAT WINDOW
         ============================================================ */}
      {isOpen && (
        <aside
          role="dialog"
          aria-label="IIT Kharagpur AI Assistant"
          className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[400px] md:w-[415px] max-h-[82vh] sm:max-h-[590px] bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
          style={{ zIndex: 10000 }}
        >
          {/* Header */}
          <div className="bg-[#003893] text-white px-4 py-3.5 flex items-center justify-between flex-shrink-0 shadow-sm">
            <div className="flex items-center gap-2.5">
              {/* Crest Logo */}
              <div className="w-9 h-9 rounded-full bg-white p-0.5 flex items-center justify-center overflow-hidden shadow-xs border border-amber-300/60 flex-shrink-0">
                <img src={iitKgpLogo} alt="IIT KGP Crest" className="w-full h-full object-contain" />
              </div>

              <div>
                <div className="text-[13.5px] sm:text-[14px] font-bold text-white flex items-center gap-1.5 leading-tight">
                  <span>IIT Kharagpur AI Assistant</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Online" />
                </div>
                <div className="text-[11px] text-blue-100 font-medium leading-tight">
                  How can I help you today?
                </div>
              </div>
            </div>

            {/* Actions: Reset & Close */}
            <div className="flex items-center gap-1 text-white/80">
              <button
                type="button"
                onClick={handleResetChat}
                className="p-1.5 hover:text-white hover:bg-white/10 rounded-lg transition cursor-pointer"
                title="Restart conversation"
                aria-label="Restart conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:text-white hover:bg-white/10 rounded-lg transition cursor-pointer"
                title="Close AI Assistant"
                aria-label="Close AI Assistant"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat Messages Area */}
          <div 
            className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3 bg-[#f8fafc] text-xs sm:text-[13px] min-h-[240px] max-h-[380px]"
            tabIndex={0}
            aria-live="polite"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex items-start gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {/* Assistant Avatar */}
                {m.sender === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-[#003893] text-white flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-xs mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                {/* Message Bubble */}
                <div
                  className={`max-w-[85%] p-3 sm:p-3.5 rounded-2xl ${
                    m.sender === 'user'
                      ? 'bg-[#003893] text-white rounded-br-none shadow-sm'
                      : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-none shadow-xs'
                  }`}
                >
                  <div className="space-y-1">
                    {renderFormattedText(m.text)}
                  </div>
                  <div
                    className={`text-[9.5px] mt-1.5 text-right ${
                      m.sender === 'user' ? 'text-blue-200' : 'text-slate-400'
                    }`}
                  >
                    {m.timestamp}
                  </div>
                </div>

                {/* User Avatar */}
                {m.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-slate-700 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-xs mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-center gap-2 text-slate-600 bg-white p-3 rounded-2xl rounded-bl-none border border-slate-200/90 shadow-xs w-fit">
                <div className="w-6 h-6 rounded-full bg-[#003893]/10 text-[#003893] flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5 animate-pulse" />
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                  <span>Assistant is thinking</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#003893] animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#003893] animate-bounce delay-100" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#003893] animate-bounce delay-200" />
                </div>
              </div>
            )}

            {/* Error Message Alert */}
            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold">{errorMessage}</p>
                  <button
                    type="button"
                    onClick={() => handleSendMessage()}
                    className="mt-1 text-[11px] underline font-bold hover:text-red-900 cursor-pointer"
                  >
                    Retry sending
                  </button>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Carousel */}
          <div className="px-3 py-2 bg-slate-100/90 border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-[11px]">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex-shrink-0 pl-1">
              Suggestions:
            </span>
            {quickPrompts.map((prompt, pIdx) => (
              <button
                key={pIdx}
                type="button"
                onClick={() => handleSendMessage(prompt)}
                disabled={isLoading}
                className="whitespace-nowrap px-2.5 py-1 bg-white hover:bg-blue-50 text-slate-700 hover:text-[#003893] border border-slate-200/90 hover:border-blue-300 rounded-full font-medium transition shadow-2xs cursor-pointer disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask your question..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              className="flex-1 px-3.5 py-2 text-xs sm:text-[13px] rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#003893] focus:border-transparent bg-slate-50 placeholder-slate-400 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              aria-label="Send message"
              className="p-2 sm:p-2.5 rounded-xl bg-[#003893] hover:bg-[#002b70] text-white disabled:opacity-40 disabled:cursor-not-allowed transition shadow-xs flex-shrink-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#003893]"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Micro Footer Notice */}
          <div className="px-3 py-1 bg-slate-50 border-t border-slate-200/70 text-[10px] text-center text-slate-500">
            Official IIT Kharagpur AI Assistant • Verified Admissions Guidelines
          </div>
        </aside>
      )}
    </>
  );
}
