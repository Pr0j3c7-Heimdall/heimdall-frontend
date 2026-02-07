'use client';

import { createContext, useContext, useState, useCallback } from 'react';

const AuthModalContext = createContext(null);

export function AuthModalProvider({ children }) {
  const [state, setState] = useState({ isOpen: false, type: 'login' });

  const openAuthModal = useCallback((type = 'login') => {
    setState({ isOpen: true, type });
  }, []);

  const closeAuthModal = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  return (
    <AuthModalContext.Provider value={{ ...state, openAuthModal, closeAuthModal }}>
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const ctx = useContext(AuthModalContext);
  if (!ctx) throw new Error('useAuthModal must be used within AuthModalProvider');
  return ctx;
}
