'use client';

import { useEffect } from 'react';
import GoogleLoginButton from '@/components/GoogleLoginButton';
import { useAuthModal } from '@/contexts/AuthModalContext';
import { useAuth } from '@/contexts/AuthContext';

export default function AuthModal() {
  const { isOpen, type, openAuthModal, closeAuthModal } = useAuthModal();
  const { refreshAuth } = useAuth();

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') closeAuthModal();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, closeAuthModal]);

  if (!isOpen) return null;

  const isLogin = type === 'login';

  return (
    <div className="modal-overlay" onClick={closeAuthModal} role="presentation">
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="auth-modal-title">
        <button type="button" className="modal__close" onClick={closeAuthModal} aria-label="닫기">
          ×
        </button>
        <h2 id="auth-modal-title" className="modal__title">
          {isLogin ? '로그인' : '회원가입'}
        </h2>
        <p className="modal__desc">
          {isLogin ? '구글 계정으로 Heimdall에 로그인하세요.' : '구글 계정으로 Heimdall에 가입하세요. (로그인 겸 가입)'}
        </p>
        <GoogleLoginButton
          text={isLogin ? 'signin_with' : 'signup_with'}
          onSuccess={() => {
            refreshAuth();
            closeAuthModal();
          }}
        />
        <p className="modal__foot">
          {isLogin ? (
            <>
              아직 계정이 없으신가요?{' '}
              <button type="button" className="modal__link" onClick={() => openAuthModal('register')}>
                회원가입
              </button>
            </>
          ) : (
            <>
              이미 계정이 있으신가요?{' '}
              <button type="button" className="modal__link" onClick={() => openAuthModal('login')}>
                로그인
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
