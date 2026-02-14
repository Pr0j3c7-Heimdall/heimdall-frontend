'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { getAccessToken, clearTokens } from '@/lib/auth';

const AuthContext = createContext(null);

const LOGGED_OUT_BUTTONS = {
  secondaryBtn: { href: '/login', label: '로그인', isAuthAction: true },
  primaryBtn: { href: '/register', label: '회원가입', isAuthAction: true }
};

const LOGGED_IN_BUTTONS = {
  secondaryBtn: { href: '/mypage', label: '마이페이지' },
  primaryBtn: { label: '로그아웃', action: 'logout' }
};

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const refreshAuth = useCallback(() => {
    setIsLoggedIn(!!getAccessToken());
  }, []);

  const logout = useCallback(() => {
    clearTokens();
    setIsLoggedIn(false);
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  }, []);

  const withdraw = useCallback(() => {
    // TODO: API 연동 시 회원탈퇴 API 호출
    clearTokens();
    setIsLoggedIn(false);
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  }, []);

  useEffect(() => {
    refreshAuth();
  }, [refreshAuth]);

  const value = {
    isLoggedIn,
    refreshAuth,
    logout,
    withdraw
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export function useAuthNavbarButtons() {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? LOGGED_IN_BUTTONS : LOGGED_OUT_BUTTONS;
}
