import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Languages, Search } from 'lucide-react';
import { FAQS } from '../data/portalData';

export default function FaqSection() {
  const [lang, setLang] = useState('en'); // 'en' or 'bn'
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(1);

  const categories = ['All', 'Eligibility', 'Admissions', 'Fees & Waiver', 'Exams & Centers', 'Degree & Alumni'];

  const filteredFaqs = FAQS.filter(faq => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch = 
      faq.qEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.aEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.qBn.includes(searchQuery) ||
      faq.aBn.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faqs" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-kgp-crimson bg-red-100/60 px-3.5 py-1 rounded-full">
            Frequently Asked Questions
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif-title">
            {lang === 'en' ? 'Got Questions? We Have Answers' : 'সাধারণ জিজ্ঞাসা ও উত্তর (FAQs)'}
          </h2>
          <p className="mt-3 text-slate-600 text-sm">
            {lang === 'en' 
              ? 'Find answers regarding admissions, exams, eligibility criteria, and degree validity.'
              : 'ভর্তি, পরীক্ষা, যোগ্যতা এবং ডিগ্রি সংক্রান্ত যাবতীয় প্রশ্নের উত্তর এক নজরে।'}
          </p>
        </div>

        {/* Language Switcher & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
          
          {/* Language Toggle */}
          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl w-full sm:w-auto justify-center">
            <button
              onClick={() => setLang('en')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                lang === 'en'
                  ? 'bg-white text-kgp-crimson shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Languages className="w-3.5 h-3.5" />
              <span>English</span>
            </button>
            <button
              onClick={() => setLang('bn')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                lang === 'bn'
                  ? 'bg-kgp-crimson text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Languages className="w-3.5 h-3.5" />
              <span>বাংলা (Bengali)</span>
            </button>
          </div>

          {/* Search box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={lang === 'en' ? 'Search questions...' : 'প্রশ্ন অনুসন্ধান করুন...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-kgp-crimson bg-slate-50"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeCategory === cat
                  ? 'bg-kgp-crimson text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm transition"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50/70 transition"
                >
                  <span className="font-semibold text-slate-900 text-sm sm:text-base">
                    {lang === 'en' ? faq.qEn : faq.qBn}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 text-slate-500">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 bg-slate-50/40">
                    {lang === 'en' ? faq.aEn : faq.aBn}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
