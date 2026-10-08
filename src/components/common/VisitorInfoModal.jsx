import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Building2, Briefcase, Loader2, AlertCircle, ShieldCheck } from 'lucide-react';
import iitKgpLogo from '../../assets/logo';
import { submitVisitorLead } from '../../services/apiService';

export const USER_CATEGORIES = [
  'Student',
  'Faculty',
  'Staff',
  'Alumni',
  'Industry Professional',
  'Other'
];

export default function VisitorInfoModal({ isOpen, targetDropdown, onSuccess }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    userType: '',
    institution: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  // Lock scrolling & trap ESC key while modal is open
  useEffect(() => {
    if (!isOpen) return;

    // Prevent background scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Intercept and prevent ESC key
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    window.addEventListener('keydown', handleKeyDown, { capture: true });

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const validateField = (name, value) => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Full Name is required.';
        if (value.trim().length < 2) return 'Full Name must be at least 2 characters.';
        return '';

      case 'email':
        if (!value.trim()) return 'Email address is required.';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) return 'Please enter a valid email address.';
        return '';

      case 'mobileNumber':
        if (!value.trim()) return 'Mobile number is required.';
        const digits = value.replace(/\D/g, '');
        if (digits.length < 10) return 'Please enter a valid 10-digit mobile number.';
        return '';

      case 'userType':
        if (!value) return 'Please select your category.';
        return '';

      case 'institution':
        if (!value.trim()) return 'Institution / Organization name is required.';
        if (value.trim().length < 2) return 'Please enter a valid institution name.';
        return '';

      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setServerError('');

    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const validateAll = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const err = validateField(key, formData[key]);
      if (err) newErrors[key] = err;
    });
    setErrors(newErrors);
    setTouched({
      fullName: true,
      email: true,
      mobileNumber: true,
      userType: true,
      institution: true
    });
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!validateAll()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await submitVisitorLead({
        ...formData,
        targetDropdown: targetDropdown || ''
      });

      // Successful submission: call callback to close modal & auto-open originally clicked dropdown
      if (onSuccess) {
        onSuccess(targetDropdown);
      }
    } catch (err) {
      console.error('Submission failed:', err);
      setServerError(err.message || 'Unable to submit your details. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        // Prevent clicking outside from closing
        e.stopPropagation();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="visitor-modal-title"
    >
      <div 
        className="relative w-full max-w-[480px] bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Strip */}
        <div className="h-1.5 w-full bg-gradient-to-r from-kgp-crimson via-red-700 to-amber-500" />

        {/* Modal Header */}
        <div className="px-6 pt-5 pb-3 text-center border-b border-slate-100 bg-slate-50/50">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-xs border border-amber-300 p-1 mb-2.5">
            <img src={iitKgpLogo} alt="IIT Kharagpur" className="w-full h-full object-contain" />
          </div>
          <h2 id="visitor-modal-title" className="text-lg sm:text-xl font-bold font-serif-title text-slate-900 leading-snug">
            Please tell us a little about yourself
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
            Please provide your basic information to continue exploring academic programmes and portal features.
          </p>
        </div>

        {/* Server Error Alert */}
        {serverError && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-xs text-red-700 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1 font-medium">{serverError}</div>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} noValidate className="px-6 py-4 space-y-3.5">
          
          {/* 1. Full Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1" htmlFor="visitor-full-name">
              Full Name <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="visitor-full-name"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
                placeholder="e.g. Rahul Sharma"
                className={`w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border bg-white transition outline-none ${
                  errors.fullName && touched.fullName
                    ? 'border-red-500 ring-1 ring-red-500/20'
                    : 'border-slate-300 focus:border-kgp-crimson focus:ring-2 focus:ring-kgp-crimson/10'
                }`}
              />
            </div>
            {errors.fullName && touched.fullName && (
              <p className="text-[11px] text-red-600 font-medium mt-1 flex items-center gap-1">
                <span>⚠</span> {errors.fullName}
              </p>
            )}
          </div>

          {/* 2. Email Address */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1" htmlFor="visitor-email">
              Email Address <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="visitor-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
                placeholder="e.g. rahul.sharma@example.com"
                className={`w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border bg-white transition outline-none ${
                  errors.email && touched.email
                    ? 'border-red-500 ring-1 ring-red-500/20'
                    : 'border-slate-300 focus:border-kgp-crimson focus:ring-2 focus:ring-kgp-crimson/10'
                }`}
              />
            </div>
            {errors.email && touched.email && (
              <p className="text-[11px] text-red-600 font-medium mt-1 flex items-center gap-1">
                <span>⚠</span> {errors.email}
              </p>
            )}
          </div>

          {/* 3. Mobile Number */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1" htmlFor="visitor-phone">
              Mobile Number <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="visitor-phone"
                name="mobileNumber"
                type="tel"
                value={formData.mobileNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
                placeholder="e.g. 9830012345 (10 digits)"
                className={`w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border bg-white transition outline-none ${
                  errors.mobileNumber && touched.mobileNumber
                    ? 'border-red-500 ring-1 ring-red-500/20'
                    : 'border-slate-300 focus:border-kgp-crimson focus:ring-2 focus:ring-kgp-crimson/10'
                }`}
              />
            </div>
            {errors.mobileNumber && touched.mobileNumber && (
              <p className="text-[11px] text-red-600 font-medium mt-1 flex items-center gap-1">
                <span>⚠</span> {errors.mobileNumber}
              </p>
            )}
          </div>

          {/* 4. User Type / Category Dropdown */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1" htmlFor="visitor-user-type">
              User Type / Category <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                id="visitor-user-type"
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
                className={`w-full pl-9 pr-8 py-2 text-xs sm:text-sm rounded-xl border bg-white transition outline-none appearance-none cursor-pointer ${
                  errors.userType && touched.userType
                    ? 'border-red-500 ring-1 ring-red-500/20'
                    : 'border-slate-300 focus:border-kgp-crimson focus:ring-2 focus:ring-kgp-crimson/10'
                }`}
              >
                <option value="">Select your category...</option>
                {USER_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                ▼
              </div>
            </div>
            {errors.userType && touched.userType && (
              <p className="text-[11px] text-red-600 font-medium mt-1 flex items-center gap-1">
                <span>⚠</span> {errors.userType}
              </p>
            )}
          </div>

          {/* 5. Institution / Organization */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1" htmlFor="visitor-institution">
              Institution / Organization <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="visitor-institution"
                name="institution"
                type="text"
                value={formData.institution}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
                placeholder="e.g. Delhi University / TCS / High School"
                className={`w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border bg-white transition outline-none ${
                  errors.institution && touched.institution
                    ? 'border-red-500 ring-1 ring-red-500/20'
                    : 'border-slate-300 focus:border-kgp-crimson focus:ring-2 focus:ring-kgp-crimson/10'
                }`}
              />
            </div>
            {errors.institution && touched.institution && (
              <p className="text-[11px] text-red-600 font-medium mt-1 flex items-center gap-1">
                <span>⚠</span> {errors.institution}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 sm:py-3 px-4 bg-gradient-to-r from-kgp-crimson to-red-800 hover:from-red-800 hover:to-red-900 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting Information...</span>
                </>
              ) : (
                <>
                  <span>Submit &amp; Continue</span>
                  <span className="text-amber-300 font-bold">→</span>
                </>
              )}
            </button>
          </div>

          <div className="text-center pt-1">
            <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>Your information is stored securely on IIT Kharagpur servers.</span>
            </p>
          </div>

        </form>
      </div>
    </div>
  );
}
