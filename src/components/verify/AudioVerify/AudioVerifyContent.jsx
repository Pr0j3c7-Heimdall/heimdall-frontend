'use client';

import { useState, useEffect } from 'react';
import AudioDropzone from './AudioDropzone';
import AudioVerifyGuide from './AudioVerifyGuide';
import AudioVerifyResult from '@/components/mypage/AudioVerifyResult';
import Button from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { useAuthModal } from '@/contexts/AuthModalContext';
import {
  uploadAudio,
  getAudioDetectionStatus,
  getAudioDetectionResult,
  mapAudioDetectionResultToUI
} from '@/api/audioDetection';
import { parseApiError } from '@/lib/parseApiError';

const POLL_INTERVAL_MS = 2000;
const POLL_MAX_ATTEMPTS = 60;

const TRACK_OPTIONS = [
  { value: 'speech', label: '일반 음성' },
  { value: 'singing', label: '가창' }
];

export default function AudioVerifyContent() {
  const { isLoggedIn } = useAuth();
  const { openAuthModal } = useAuthModal();
  const [file, setFile] = useState(null);
  const [track, setTrack] = useState('speech');
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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
    setErrorMessage(null);
  };

  const handleReset = () => {
    setFile(null);
    setTrack('speech');
    setResultData(null);
    setErrorMessage(null);
  };

  const handleVerify = async () => {
    if (!file) return;
    setLoading(true);
    setResultData(null);
    setErrorMessage(null);
    try {
      const uploadRes = await uploadAudio(file, track);
      if (!uploadRes?.success || !uploadRes?.data?.audio_id) {
        setErrorMessage(uploadRes?.data?.result || '업로드에 실패했습니다.');
        return;
      }
      const { audio_id: audioId } = uploadRes.data;

      let attempts = 0;
      while (attempts < POLL_MAX_ATTEMPTS) {
        const statusRes = await getAudioDetectionStatus(audioId);
        const status = statusRes?.data?.analysis_status?.toLowerCase?.();
        if (status === 'completed' || status === 'done' || status === 'success') {
          break;
        }
        if (status === 'failed' || status === 'error') {
          setErrorMessage('분석에 실패했습니다.');
          return;
        }
        await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
        attempts += 1;
      }
      if (attempts >= POLL_MAX_ATTEMPTS) {
        setErrorMessage('분석 시간이 초과되었습니다. 잠시 후 다시 시도해 주세요.');
        return;
      }

      const resultRes = await getAudioDetectionResult(audioId);
      if (!resultRes?.success || !resultRes?.data) {
        setErrorMessage('결과를 불러오지 못했습니다.');
        return;
      }
      const mapped = mapAudioDetectionResultToUI(resultRes.data, { fileName: file.name });
      if (mapped) {
        setResultData(mapped);
      } else {
        setErrorMessage('결과 변환에 실패했습니다.');
      }
    } catch (error) {
      console.error('음성 검증 실패:', error);
      setErrorMessage(parseApiError(error, '검증 요청에 실패했습니다.'));
    } finally {
      setLoading(false);
    }
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  if (resultData && !loading) {
    return <AudioVerifyResult resultData={resultData} onReset={handleReset} />;
  }

  return (
    <>
      <section className="verify-section section section--gray">
        <div className="section__inner">
          <div className="section__header">
            <h1 className="section__title">음성 검사</h1>
            <p className="section__desc">음성을 업로드하여 AI 합성 여부, 사용 모델, 녹음 정보 등을 검사하세요.</p>
          </div>

          <div className="verify-content">
            {isLoggedIn && (
              <div className="verify-track-select" role="radiogroup" aria-label="음성 분석 유형">
                <p className="verify-track-select__label">분석 유형</p>
                <div className="verify-track-select__options">
                  {TRACK_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      role="radio"
                      aria-checked={track === option.value}
                      className={`verify-track-select__option${track === option.value ? ' verify-track-select__option--active' : ''}`}
                      onClick={() => setTrack(option.value)}
                      disabled={loading}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

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

            {isLoggedIn && previewUrl && (
              <div className="verify-actions">
                {errorMessage && (
                  <p className="verify-error" role="alert">
                    {errorMessage}
                  </p>
                )}
                {loading ? (
                  <p className="verify-loading">분석 중입니다. 잠시만 기다려 주세요.</p>
                ) : (
                  <Button variant="primary" size="lg" onClick={handleVerify}>
                    검증하기
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <AudioVerifyGuide />
    </>
  );
}
