import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, Building } from 'lucide-react';
import { IIT_KGP_INFO } from '../data/portalData';

export default function ContactSection() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', queryType: 'admissions', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-kgp-crimson bg-red-50 px-3.5 py-1 rounded-full border border-red-200">
            Admissions Office & Support
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif-title">
            Contact Details & Help Desk
          </h2>
          <p className="mt-3 text-slate-600">
            Reach out to our admission counselors, academic coordinators, or technical helpdesk.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Campus Address Card */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-kgp-crimson text-amber-400 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-1">
                    Campus Address
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    <strong>BS Programme Admissions Office</strong><br />
                    Center for Educational Technology (CET)<br />
                    {IIT_KGP_INFO.name}<br />
                    Kharagpur, Paschim Medinipur, West Bengal - 721302, India
                  </p>
                </div>
              </div>
            </div>

            {/* Helpline Phone */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-1">
                    Phone Numbers
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed font-mono">
                    General Inquiries: {IIT_KGP_INFO.helpline}<br />
                    Technical Helpline: +91 94340 XXXXX<br />
                    Mon – Sat: 9:00 AM – 6:00 PM IST
                  </p>
                </div>
              </div>
            </div>

            {/* Official Email */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-1">
                    Email Support
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    Admissions: <span className="text-kgp-crimson font-medium">{IIT_KGP_INFO.email}</span><br />
                    Qualifier Support: support-bs@iitkgp.ac.in<br />
                    Grievance: dean-academics@iitkgp.ac.in
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Quick Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-md">
            <h3 className="text-xl font-bold text-slate-900 font-serif-title mb-1">
              Send an Admission Inquiry
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Our academic counselors typically reply within 24 business hours.
            </p>

            {formSubmitted ? (
              <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold">Inquiry Submitted Successfully!</h4>
                <p className="text-xs text-emerald-700">
                  Thank you for reaching out. A ticket reference has been logged and our team will contact you at {formData.email || 'your email'}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sourav Mukherjee"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-kgp-crimson"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. sourav@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-kgp-crimson"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-kgp-crimson"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Inquiry Category</label>
                    <select
                      value={formData.queryType}
                      onChange={(e) => setFormData({ ...formData, queryType: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-kgp-crimson bg-white"
                    >
                      <option value="admissions">WBJEE / JEE Direct Admission</option>
                      <option value="qualifier">Regular Qualifier Exam Process</option>
                      <option value="fees">Fee Structure & Scholarships</option>
                      <option value="curriculum">Syllabus & Degree Equivalence</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Your Question / Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your query or background in detail..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-kgp-crimson"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-kgp-crimson hover:bg-kgp-darkred text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry to Helpdesk</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
