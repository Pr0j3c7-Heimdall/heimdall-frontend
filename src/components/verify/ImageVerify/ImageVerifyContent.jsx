'use client';

import { useState } from 'react';
import ImageDropzone from './ImageDropzone';
import ImageVerifyResult from './ImageVerifyResult';
import ImageVerifyGuide from './ImageVerifyGuide';
import Button from '@/components/ui/Button';
import { uploadImage, getDetectionStatus, getDetectionResult, mapDetectionResultToUI } from '@/api/imageDetection';

const POLL_INTERVAL_MS = 2000;
const POLL_MAX_ATTEMPTS = 60;

export default function ImageVerifyContent() {
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

      let attempts = 0;
      while (attempts < POLL_MAX_ATTEMPTS) {
        const statusRes = await getDetectionStatus(imageId);
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

      const resultRes = await getDetectionResult(imageId);
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
      console.error('검증 실패:', error);
      const msg = error?.response?.data?.detail
        ? (Array.isArray(error.response.data.detail) ? error.response.data.detail[0]?.msg : error.response.data.detail)
        : error?.message || '검증 요청에 실패했습니다.';
      setErrorMessage(typeof msg === 'string' ? msg : '검증 요청에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // 결과가 있으면 결과 페이지만 표시
  if (resultData && !loading) {
    return <ImageVerifyResult resultData={resultData} onReset={handleReset} />;
  }

  return (
    <>
      {/* 1. 검사 (이미지 업로드) */}
      <section className="verify-section section section--gray">
        <div className="section__inner">
          <div className="section__header">
            <h1 className="section__title">이미지 검사</h1>
            <p className="section__desc">이미지를 업로드하여 AI 생성 여부, AI 생성 모델, 사진 정보 등을 검사하세요.</p>
          </div>

          <div className="verify-content">
            <div className="verify-upload">
              {!preview ? (
                <ImageDropzone onSelect={handleSelect} disabled={loading} />
              ) : (
                <div className="verify-preview">
                  <div className="verify-preview__image-wrap">
                    <img src={preview} alt="업로드된 이미지" className="verify-preview__image" />
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
