'use client';

import { useState } from 'react';
import ImageDropzone from './ImageDropzone';
import ImageVerifyResult from './ImageVerifyResult';
import ImageVerifyGuide from './ImageVerifyGuide';
import VerifyLoginPrompt from '@/components/verify/VerifyLoginPrompt';
import Button from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { useAuthModal } from '@/contexts/AuthModalContext';
import {
  uploadImage,
  getImageDetectionStatus,
  getImageDetectionResult,
  mapDetectionResultToUI
} from '@/api/imageDetection';
import { parseApiError } from '@/lib/parseApiError';
import { pollDetectionStatus } from '@/lib/pollDetectionStatus';
import { formatFileSize } from '@/lib/format';

export default function ImageVerifyContent() {
  const { isLoggedIn } = useAuth();
  const { openAuthModal } = useAuthModal();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSelect = (selectedFile) => {
    if (!selectedFile) return;
    setFile(selectedFile);
    setErrorMessage(null);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result);
    reader.readAsDataURL(selectedFile);
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setResultData(null);
    setErrorMessage(null);
  };

  const handleVerify = async () => {
    if (!file) return;
    setLoading(true);
    setResultData(null);
    setErrorMessage(null);
    try {
      const uploadRes = await uploadImage(file);
      if (!uploadRes?.success || !uploadRes?.data?.image_id) {
        setErrorMessage(uploadRes?.data?.result || '업로드에 실패했습니다.');
        return;
      }
      const { image_id: imageId } = uploadRes.data;

      const pollResult = await pollDetectionStatus(getImageDetectionStatus, imageId);
      if (!pollResult.ok) {
        setErrorMessage(pollResult.error);
        return;
      }

      const resultRes = await getImageDetectionResult(imageId);
      if (!resultRes?.success || !resultRes?.data) {
        setErrorMessage('결과를 불러오지 못했습니다.');
        return;
      }
      const mapped = mapDetectionResultToUI(resultRes.data);
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
    return <ImageVerifyResult resultData={resultData} onReset={handleReset} />;
  }

  return (
    <>
      <section className="verify-section section section--gray">
        <div className="section__inner">
          <div className="section__header">
            <h1 className="section__title">이미지 검사</h1>
            <p className="section__desc">이미지를 업로드하여 AI 생성 여부, AI 생성 모델, 사진 정보 등을 검사하세요.</p>
          </div>

          <div className="verify-content">
            <div className="verify-upload">
              {!isLoggedIn ? (
                <VerifyLoginPrompt mediaType="image" onLogin={() => openAuthModal('login')} />
              ) : !preview ? (
                <ImageDropzone onSelect={handleSelect} disabled={loading} />
              ) : (
                <div className="verify-preview">
                  <div className="verify-preview__image-wrap">
                    <img src={preview} alt="업로드된 이미지" className="verify-preview__image" />
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

            {preview && (
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

      <ImageVerifyGuide />
    </>
  );
}
