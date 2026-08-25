'use client';

import { useState, useEffect } from 'react';
import AudioDropzone from './AudioDropzone';
import AudioVerifyGuide from './AudioVerifyGuide';
import AudioVerifyResult from './AudioVerifyResult';
import VerifyLoginPrompt from '@/components/verify/VerifyLoginPrompt';
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
import { pollDetectionStatus } from '@/lib/pollDetectionStatus';
import { formatFileSize } from '@/lib/format';

export default function AudioVerifyContent() {
  const { isLoggedIn } = useAuth();
  const { openAuthModal } = useAuthModal();
  const [file, setFile] = useState(null);
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
    setResultData(null);
    setErrorMessage(null);
  };

  const handleVerify = async () => {
    if (!file) return;
    setLoading(true);
    setResultData(null);
    setErrorMessage(null);
    try {
      const uploadRes = await uploadAudio(file);
      if (!uploadRes?.success || !uploadRes?.data?.audio_id) {
        setErrorMessage(uploadRes?.data?.result || '업로드에 실패했습니다.');
        return;
      }
      const { audio_id: audioId } = uploadRes.data;

      const pollResult = await pollDetectionStatus(getAudioDetectionStatus, audioId);
      if (!pollResult.ok) {
        setErrorMessage(pollResult.error);
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
      setErrorMessage(parseApiError(error, '검증 요청에 실패했습니다.'));
    } finally {
      setLoading(false);
    }
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
            <div className="verify-upload">
              {!isLoggedIn ? (
                <VerifyLoginPrompt mediaType="audio" onLogin={() => openAuthModal('login')} />
              ) : !previewUrl ? (
                <AudioDropzone onSelect={handleSelect} disabled={loading} />
              ) : (
                <div className="verify-preview">
                  <div className="verify-preview__audio-wrap">
                    <audio src={previewUrl} controls className="verify-preview__audio" />
                  </div>
                  <div className="verify-preview__meta">
                    <p className="verify-preview__name">{file?.name}</p>
                    <p className="verify-preview__size">{file && formatFileSize(file.size)}</p>
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
