'use client';

import Button from '@/components/ui/Button';

const COPY = {
  image: {
    ariaLabel: '로그인하고 이미지 검사하기',
    title: '이미지 검사를 사용하려면 로그인이 필요해요',
    hint: '로그인하면 이미지를 업로드하고 AI 생성 여부를 검사할 수 있습니다.'
  },
  audio: {
    ariaLabel: '로그인하고 음성 검사하기',
    title: '음성 검사를 사용하려면 로그인이 필요해요',
    hint: '로그인하면 음성 파일을 업로드하고 AI 합성 여부를 검사할 수 있습니다.'
  }
};

export default function VerifyLoginPrompt({ mediaType, onLogin }) {
  const copy = COPY[mediaType] ?? COPY.image;

  return (
    <div
      className="verify-dropzone verify-dropzone--login-prompt"
      role="button"
      tabIndex={0}
      onClick={onLogin}
      onKeyDown={(e) => e.key === 'Enter' && onLogin()}
      aria-label={copy.ariaLabel}
    >
      <span className="verify-dropzone__icon verify-dropzone__icon--lock" aria-hidden>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </span>
      <p className="verify-dropzone__text">{copy.title}</p>
      <p className="verify-dropzone__hint">{copy.hint}</p>
      <Button
        type="button"
        variant="primary"
        size="md"
        className="verify-dropzone__login-btn"
        onClick={(e) => {
          e.stopPropagation();
          onLogin();
        }}
      >
        로그인하고 검사하기
      </Button>
    </div>
  );
}
