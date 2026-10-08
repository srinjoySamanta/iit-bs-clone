import React, { createContext, useContext, useState, useCallback } from 'react';
import VisitorInfoModal from '../components/common/VisitorInfoModal';
import { isVisitorRegistered } from '../services/apiService';

const DropdownGateContext = createContext(null);

export function DropdownGateProvider({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingDropdownKey, setPendingDropdownKey] = useState(null);
  const [pendingCallback, setPendingCallback] = useState(null);
  const [activeDropdownKey, setActiveDropdownKey] = useState(null);

  /**
   * Reusable gating mechanism: Call this before opening ANY dropdown across the website.
   * If user has already submitted info in this session/browser, allows onProceed immediately.
   * Otherwise, pauses the action, triggers the mandatory modal, and preserves the intended action.
   */
  const requireUserInformationBeforeDropdown = useCallback((dropdownKey, onProceed) => {
    if (isVisitorRegistered()) {
      // User is already verified: open dropdown immediately
      setActiveDropdownKey(dropdownKey);
      if (typeof onProceed === 'function') {
        onProceed();
      }
      return true;
    }

    // First-time visitor: store target dropdown & callback, then show mandatory modal
    setPendingDropdownKey(dropdownKey);
    setPendingCallback(() => onProceed);
    setIsModalOpen(true);
    return false;
  }, []);

  const handleModalSuccess = useCallback((completedDropdownKey) => {
    setIsModalOpen(false);

    // Automatically trigger the originally clicked dropdown
    if (typeof pendingCallback === 'function') {
      pendingCallback();
    }
    setActiveDropdownKey(completedDropdownKey || pendingDropdownKey);

    // Clear pending state
    setPendingDropdownKey(null);
    setPendingCallback(null);
  }, [pendingCallback, pendingDropdownKey]);

  return (
    <DropdownGateContext.Provider
      value={{
        requireUserInformationBeforeDropdown,
        activeDropdownKey,
        setActiveDropdownKey,
        isRegistered: isVisitorRegistered()
      }}
    >
      {children}

      {/* Global Mandatory Visitor Information Popup */}
      <VisitorInfoModal
        isOpen={isModalOpen}
        targetDropdown={pendingDropdownKey}
        onSuccess={handleModalSuccess}
      />
    </DropdownGateContext.Provider>
  );
}

export function useDropdownGate() {
  const context = useContext(DropdownGateContext);
  if (!context) {
    throw new Error('useDropdownGate must be used within a DropdownGateProvider');
  }
  return context;
}
