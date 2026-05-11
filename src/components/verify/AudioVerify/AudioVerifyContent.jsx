'use client';

import { useState, useEffect } from 'react';
import AudioDropzone from './AudioDropzone';
import AudioVerifyGuide from './AudioVerifyGuide';
import Button from '@/components/ui/Button';
import Loader from '@/components/ui/Loader';
import { useAuth } from '@/contexts/AuthContext';
import { useAuthModal } from '@/contexts/AuthModalContext';

export default function AudioVerifyContent() {
  const { isLoggedIn } = useAuth();
  const { openAuthModal } = useAuthModal();
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleSelect = (selectedFile) => {
    if (!selectedFile) return;
    setFile(selectedFile);
  };

  const handleReset = () => {
    setFile(null);
  };

  const handleVerify = async () => {
    if (!file) return;
    setLoading(true);
    try {
      // TODO: API 연동
      await new Promise((r) => setTimeout(r, 2000));
    } finally {
      setLoading(false);
    }
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <>
      {/* 1. 검사 (음성 업로드) */}
      <section className="verify-section section section--gray">
        <div className="section__inner">
          <div className="section__header">
            <h1 className="section__title">음성 검사</h1>
            <p className="section__desc">음성을 업로드하여 AI 합성 여부, 사용 모델, 녹음 정보 등을 검사하세요. 초 단위로 구간 분석(10초 이상 1분 이하 권장)을 지원합니다.</p>
          </div>

          <div className="verify-content">
            <div className="verify-upload">
              {!isLoggedIn ? (
                <div
                  className="verify-dropzone verify-dropzone--login-prompt"
                  role="button"
                  tabIndex={0}
                  onClick={() => openAuthModal('login')}
                  onKeyDown={(e) => e.key === 'Enter' && openAuthModal('login')}
                  aria-label="로그인하고 음성 검사하기"
                >
                  <span className="verify-dropzone__icon verify-dropzone__icon--lock" aria-hidden>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  <p className="verify-dropzone__text">음성 검사를 사용하려면 로그인이 필요해요</p>
                  <p className="verify-dropzone__hint">로그인하면 음성 파일을 업로드하고 AI 합성 여부를 검사할 수 있습니다.</p>
                  <Button
                    type="button"
                    variant="primary"
                    size="md"
                    className="verify-dropzone__login-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      openAuthModal('login');
                    }}
                  >
                    로그인하고 검사하기
                  </Button>
                </div>
              ) : !previewUrl ? (
                <AudioDropzone onSelect={handleSelect} disabled={loading} />
              ) : (
                <div className="verify-preview">
                  <div className="verify-preview__audio-wrap">
                    <audio src={previewUrl} controls className="verify-preview__audio" />
                  </div>
                  <div className="verify-preview__meta">
                    <p className="verify-preview__name">{file?.name}</p>
                    <p className="verify-preview__size">{file && formatSize(file.size)}</p>
                    <button type="button" onClick={handleReset} className="verify-preview__reset" disabled={loading}>
                      다시 선택
                    </button>
                  </div>
                </div>
              )}
            </div>

            {isLoggedIn && previewUrl && !loading && (
              <div className="verify-actions">
                <Button variant="primary" size="lg" onClick={handleVerify}>
                  검증하기
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. 검사 진행/대기 */}
      {loading && (
        <section className="section section--white verify-progress">
          <div className="section__inner">
            <div className="verify-progress__inner">
              <Loader size={56} variant="shield" />
              <h2 className="verify-progress__title">검사 진행 중</h2>
              <p className="verify-progress__desc">음성을 분석하고 있습니다. 잠시만 기다려 주세요.</p>
            </div>
          </div>
        </section>
      )}

      {/* 결과 상세 - TODO: API 연동 후 표시 */}
      {/* <section className="section section--gray verify-result-section">...</section> */}

      <AudioVerifyGuide />
    </>
  );
}
