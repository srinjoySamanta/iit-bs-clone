// Configuration connecting the Public IIT KGP BS Portal to the ERP / LMS & Staff Operations System (e09a63a7-2cf6-4395-950c-b9375388d414)

export const getErpBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // 1. Check explicit runtime override
    if (window.__ERP_PORTAL_URL__) {
      return window.__ERP_PORTAL_URL__;
    }
    // 2. Check localStorage setting if user configured a custom URL
    try {
      const stored = localStorage.getItem('iit_erp_portal_url');
      if (stored) return stored;
    } catch (e) {}

    // 3. Check environment variable
    if (import.meta.env?.VITE_ERP_PORTAL_URL) {
      return import.meta.env.VITE_ERP_PORTAL_URL;
    }

    // 4. If running locally
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://localhost:5000';
    }

    // 5. Production domain fallback
    if (window.location.hostname.includes('hcdskgp.com')) {
      return 'https://erp.hcdskgp.com';
    }
  }

  return 'http://localhost:5000';
};

/**
 * Returns the direct login URL with role parameter
 * @param {'student' | 'employee' | 'staff' | 'admin' | ''} role
 */
export const getErpLoginUrl = (role = '') => {
  const base = getErpBaseUrl().replace(/\/$/, '');
  const normalizedRole = role === 'staff' ? 'employee' : role;
  if (normalizedRole) {
    return `${base}/login?role=${normalizedRole}`;
  }
  return `${base}/login`;
};

/**
 * Direct redirect helper
 * @param {'student' | 'employee' | 'staff' | 'admin' | ''} role
 * @param {boolean} newTab
 */
export const redirectToErpPortal = (role = '', newTab = false) => {
  const url = getErpLoginUrl(role);
  if (newTab) {
    window.open(url, '_blank', 'noopener,noreferrer');
  } else {
    window.location.href = url;
  }
};
