import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, X, Send, Bot, User, Sparkles, 
  RotateCcw, Minimize2, ExternalLink, HelpCircle, ArrowRight 
} from 'lucide-react';
import { IIT_KGP_INFO } from '../../data/portalData';
import iitKgpLogo from '../../assets/logo';

export default function AdmissionsChatbot({ onOpenQualifier, onOpenFees, onOpenEligibility }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: `Hello! 👋 I am **KGP AI Assistant**, your official guide for the **IIT Kharagpur BS in Data Science & Artificial Intelligence** program and the **Qualifier Round Examination**.

How can I help you today? You can choose a quick topic below or ask any question!`,
      timestamp: 'Just now'
    }
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    "How do I take the Qualifier Exam?",
    "What is the fee waiver criteria?",
    "Can I get direct admission through WBJEE?",
    "What subjects are in this BS program?"
  ];

  // Intelligent Knowledge Base Response Generator
  const generateBotResponse = (userText) => {
    const text = userText.toLowerCase();

    if (text.includes("qualifier") || text.includes("exam") || text.includes("test") || text.includes("cutoff")) {
      return `### 🎯 Qualifier Round Examination 2026

The **Qualifier Exam** is the direct pathway into the **BS in Data Science & AI** at IIT Kharagpur:

* **Format**: Computer-Based Test (CBT) covering **4 Core AI Sections**:
  1. *Mathematics for DS & AI* (Linear algebra, multivariable gradients)
  2. *Statistics & Probability for AI* (Bayesian inference, normal distributions)
  3. *Computational Thinking & Python for AI* (Algorithms, list comprehensions)
  4. *Artificial Intelligence & Machine Learning* (Sigmoid activation, overfitting)
* **Duration**: 45 Minutes.
* **Passing Cut-off**: **40% minimum score**. Scoring ≥ 40% grants **guaranteed admission** into the Foundation Level!
* **Mode**: Online AI-Proctored Test or In-Person Exam Centers.

👉 You can take the live exam right now by clicking the **"Qualifier Exam Portal"** button!`;
    }

    if (text.includes("fee") || text.includes("waiver") || text.includes("cost") || text.includes("price") || text.includes("scholarship") || text.includes("amount")) {
      return `### 💰 Fee Structure & Scholarships

* **Qualifier Examination Fee**:
  * Standard Rate: **₹1,500**
  * With 75% Income Waiver (< ₹1 LPA): **₹375 only**
  * With 50% Income Waiver (₹1 - 5 LPA): **₹750 only**
* **Course Level Fees**:
  * Foundation Level: ₹32,000 (standard) / ₹8,000 (after 75% waiver)
  * Diploma Level: ₹47,250 per track
  * Full 4-Year BS Degree: ₹3,15,000 (standard across 4 years)
* **Social Aid**: SC / ST / PwD candidates receive **50% to 75% fee concession** across all terms.`;
    }

    if (text.includes("wbjee") || text.includes("jee") || text.includes("direct") || text.includes("tripura") || text.includes("eligibility")) {
      return `### 🎓 Direct Admission Eligibility

You can bypass the Qualifier Examination completely if you hold:
1. **WBJEE Rank**: Any valid merit rank in West Bengal Joint Entrance Examination.
2. **IIT JEE Advanced**: Any candidate qualified in JEE Advanced.
3. **Tripura JEE (TJEE)**: Candidates with a valid rank card.

Candidates with these scores receive **direct unconditional entry** into the Foundation Level upon document verification!`;
    }

    if (text.includes("course") || text.includes("subject") || text.includes("syllabus") || text.includes("ai") || text.includes("data science")) {
      return `### 🤖 Strictly Data Science & AI Curriculum

The program is **100% focused on Data Science and Artificial Intelligence**:
* **Level 1 (Foundation)**: Math for DS & AI, Statistics for AI, Computational Thinking, Python Programming.
* **Level 2 (Diploma)**: Machine Learning Foundations, Deep Learning Architectures, Database & Big Data for AI, Modern AI App Dev.
* **Level 3 (B.Sc. Degree)**: Computer Vision, Natural Language Processing (NLP), AI Search & Knowledge Graphs.
* **Level 4 (4-Year BS Degree)**: Generative AI & LLMs, Reinforcement Learning & Autonomous Agents, and an **8-Month Research Thesis** with **Official IIT Kharagpur Alumni Status**!`;
    }

    if (text.includes("alumni") || text.includes("degree") || text.includes("certificate")) {
      return `### 📜 Degree & Official Alumni Status

* Students completing the 4-Year BS program receive the prestigious **Bachelor of Science in Data Science & Artificial Intelligence** awarded by the Senate of IIT Kharagpur.
* Graduates receive **Official IIT Kharagpur Alumni Association Lifetime Membership**, Alumni Card, and attend the formal in-person **Convocation on campus in Kharagpur**!`;
    }

    if (text.includes("contact") || text.includes("helpline") || text.includes("address") || text.includes("phone") || text.includes("email")) {
      return `### 📞 Contact & Admissions Desk

* **Helpline Phone**: +91 (03222) 282000 / 282022
* **Admissions Email**: bs-admissions@iitkgp.ac.in
* **Campus Address**: Center for Educational Technology, Indian Institute of Technology Kharagpur, Paschim Medinipur, West Bengal - 721302, India.`;
    }

    return `Thank you for asking! The **IIT Kharagpur BS in Data Science & AI** is designed for students and working professionals of all ages.

You can:
1. **Register & Pay** for the Qualifier Round Examination.
2. **Take the 45-Minute CBT Exam** and get evaluated immediately.
3. If you have a **WBJEE** or **JEE Advanced** rank, apply for **Direct Admission**!

Feel free to ask about fees, courses, or the test!`;
  };

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputMessage;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      timestamp: 'Now'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking and reply
    setTimeout(() => {
      const reply = generateBotResponse(query);
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: reply,
        timestamp: 'Now'
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 1,
        sender: 'bot',
        text: `Chat cleared. How can I assist you with the **IIT Kharagpur BS in Data Science & AI** or the **Qualifier Exam**?`,
        timestamp: 'Just now'
      }
    ]);
  };

  return (
    <>
      {/* Floating Chat Bubble Button at Bottom-Right */}
      {!isOpen && (
        <aside aria-label="Admissions Assistant Chatbot" className="fixed bottom-5 right-5 z-50">
          <button
            onClick={() => { setIsOpen(true); setIsMinimized(false); }}
            className="group relative flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-kgp-crimson via-red-700 to-amber-600 hover:from-kgp-darkred hover:to-amber-500 text-white rounded-full shadow-2xl transition transform hover:scale-105 border-2 border-amber-400"
            title="Chat with IIT KGP Admissions AI"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-white p-0.5 flex items-center justify-center overflow-hidden">
                <img src={iitKgpLogo} alt="IIT KGP" className="w-full h-full object-contain" />
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-slate-900 rounded-full animate-ping" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-slate-900 rounded-full" />
            </div>

            <div className="text-left">
              <div className="text-xs font-extrabold font-serif-title leading-tight flex items-center gap-1 text-amber-200">
                <span>KGP AI Assistant</span>
                <Sparkles className="w-3 h-3 text-amber-300" />
              </div>
              <div className="text-[10px] text-slate-200 font-medium">Qualifier & Admissions Help</div>
            </div>
          </button>
        </aside>
      )}

      {/* Expandable Chat Window */}
      {isOpen && (
        <aside aria-label="Admissions Assistant Chat Window" className="fixed bottom-5 right-5 z-50 w-[92vw] sm:w-96 bg-white rounded-3xl shadow-2xl border-2 border-kgp-crimson/40 overflow-hidden flex flex-col transition-all duration-300 animate-in fade-in slide-in-from-bottom-6">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-kgp-navy via-slate-900 to-kgp-crimson text-white p-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white p-0.5 flex items-center justify-center overflow-hidden shadow border border-amber-400">
                <img src={iitKgpLogo} alt="IIT KGP" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="text-xs font-bold text-amber-300 flex items-center gap-1 font-serif-title">
                  <span>IIT KGP AI Assistant</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="text-[10px] text-slate-300">
                  BS in Data Science & AI Helpdesk
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-1 text-slate-300">
              <button
                onClick={handleResetChat}
                className="p-1.5 hover:bg-white/10 rounded-lg transition"
                title="Reset Chat"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition"
                title={isMinimized ? "Expand" : "Minimize"}
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition"
                title="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages Container */}
              <div className="p-4 h-80 sm:h-96 overflow-y-auto space-y-3 bg-slate-50 text-xs">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {m.sender === 'bot' && (
                      <div className="w-7 h-7 rounded-full bg-kgp-crimson text-amber-300 flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-sm">
                        AI
                      </div>
                    )}

                    <div
                      className={`max-w-[82%] p-3 rounded-2xl leading-relaxed ${
                        m.sender === 'user'
                          ? 'bg-kgp-crimson text-white rounded-br-none shadow-md font-medium'
                          : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-sm'
                      }`}
                    >
                      {/* Simple Markdown Formatter */}
                      <div className="space-y-1.5 whitespace-pre-wrap">
                        {m.text.split('\n').map((line, lIdx) => {
                          if (line.startsWith('### ')) {
                            return <div key={lIdx} className="font-bold text-kgp-crimson text-sm pt-1">{line.replace('### ', '')}</div>;
                          }
                          if (line.startsWith('* ')) {
                            return <div key={lIdx} className="pl-2 flex items-start gap-1.5"><span>•</span><span>{line.replace('* ', '')}</span></div>;
                          }
                          return <div key={lIdx}>{line}</div>;
                        })}
                      </div>
                      <div className={`text-[9px] mt-1 text-right ${m.sender === 'user' ? 'text-red-200' : 'text-slate-400'}`}>
                        {m.timestamp}
                      </div>
                    </div>

                    {m.sender === 'user' && (
                      <div className="w-7 h-7 rounded-full bg-slate-800 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-sm">
                        U
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-center gap-2 text-slate-500 text-xs bg-white p-2.5 rounded-xl border border-slate-200 w-fit">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce delay-100" />
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce delay-200" />
                    <span className="text-[11px] font-medium text-slate-600">KGP AI is thinking...</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Suggestion Pills */}
              <div className="px-3 py-2 bg-slate-100 border-t border-slate-200 overflow-x-auto flex items-center gap-1.5 scrollbar-none text-[11px]">
                {quickPrompts.map((q, qIdx) => (
                  <button
                    key={qIdx}
                    onClick={() => handleSendMessage(q)}
                    className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white hover:bg-red-50 text-slate-700 hover:text-kgp-crimson border border-slate-200 font-medium transition shadow-sm"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Direct Qualifier Round Shortcut */}
              {onOpenQualifier && (
                <div className="px-3 py-2 bg-gradient-to-r from-amber-50 to-orange-50 border-t border-amber-200/80 flex items-center justify-between text-[11px]">
                  <span className="font-bold text-slate-800 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Qualifier Portal 2026:
                  </span>
                  <button
                    onClick={() => {
                      onOpenQualifier();
                      setIsOpen(false);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1 transition shadow-sm"
                  >
                    <span>Take Exam Now</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )}

              {/* Input Bar */}
              <form
                onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Ask about Qualifier exam, fees, AI degree..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-kgp-crimson bg-slate-50"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className="p-2 rounded-xl bg-kgp-crimson hover:bg-kgp-darkred text-white disabled:opacity-40 transition shadow"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          )}

        </aside>
      )}
    </>
  );
}
