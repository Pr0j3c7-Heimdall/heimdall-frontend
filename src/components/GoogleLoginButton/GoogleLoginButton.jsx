'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleLogin } from '@react-oauth/google';
import Button from '@/components/Button';
import { loginWithGoogle } from '@/lib/auth';

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';

export default function GoogleLoginButton({ text = 'signin_with', disabled = false, onSuccess: onSuccessCb }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSuccess = async (credentialResponse) => {
    const idToken = credentialResponse?.credential;
    if (!idToken) {
      setError('구글 인증 정보를 가져오지 못했습니다.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await loginWithGoogle(idToken);
      onSuccessCb?.();
      router.push('/');
      router.refresh();
    } catch (err) {
      const detail = err.response?.data?.detail;
      const msg = Array.isArray(detail)
        ? detail[0]?.msg || detail
        : typeof detail === 'string'
          ? detail
          : err.message || '로그인에 실패했습니다.';
      setError(typeof msg === 'string' ? msg : JSON.stringify(msg));
    } finally {
      setLoading(false);
    }
  };

  const handleError = () => {
    setError('구글 로그인창이 취소되었습니다.');
    setLoading(false);
  };

  if (!GOOGLE_CLIENT_ID) {
    const label = text === 'signup_with' ? 'Google로 회원가입' : 'Google로 로그인';
    return (
      <div className="auth-google">
        <div className="auth-google__btn">
          <Button variant="outline" size="lg" disabled>
            {label}
          </Button>
        </div>
        <p className="auth-google__error auth-google__error--muted">
          NEXT_PUBLIC_GOOGLE_CLIENT_ID를 .env.local에 설정하면 버튼이 활성화됩니다.
        </p>
      </div>
    );
  }

  return (
    <div className="auth-google">
      <div
        className={`auth-google__btn ${loading || disabled ? 'auth-google__btn--loading' : ''}`}
        style={{ pointerEvents: loading || disabled ? 'none' : undefined }}
      >
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          type="standard"
          theme="outline"
          size="large"
          text={text}
          locale="ko"
          use_fedcm_for_prompt={false}
        />
      </div>
      {error && <p className="auth-google__error">{error}</p>}
    </div>
  );
}
