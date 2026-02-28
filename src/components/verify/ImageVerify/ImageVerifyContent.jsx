'use client';

import { useState } from 'react';
import ImageDropzone from './ImageDropzone';
import ImageVerifyResult from './ImageVerifyResult';
import ImageVerifyGuide from './ImageVerifyGuide';
import Button from '@/components/ui/Button';

export default function ImageVerifyContent() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState(null);

  const handleSelect = (selectedFile) => {
    if (!selectedFile) return;
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result);
    reader.readAsDataURL(selectedFile);
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setResultData(null);
  };

  const handleVerify = async () => {
    if (!file) return;
    setLoading(true);
    setResultData(null);
    try {
      // TODO: API 연동
      // const formData = new FormData();
      // formData.append('image', file);
      // const response = await fetch('/api/verify/image', { method: 'POST', body: formData });
      // const data = await response.json();
      // setResultData({ ...data, image: preview });

      // 임시 더미 데이터 (API 연동 후 제거)
      await new Promise((r) => setTimeout(r, 2000));
      setResultData({
        image: preview,
        c2pa: {
          model: 'Midjourney',
          hashMatch: true,
          platform: 'Midjourney Web',
          details: {
            '디코딩 값': 'MJv6-2024-01-15',
            '플랫폼 정보': 'Midjourney Web Platform'
          }
        },
        binary: {
          result: 'AI',
          confidence: 85,
          methods: [
            {
              name: '분석 방법 1',
              threshold: 0.7,
              value: 0.85,
              result: 'AI',
              weight: 0.4
            },
            {
              name: '분석 방법 2',
              threshold: 0.6,
              value: 0.82,
              result: 'AI',
              weight: 0.3
            },
            {
              name: '분석 방법 3',
              threshold: 0.65,
              value: 0.88,
              result: 'AI',
              weight: 0.3
            }
          ]
        },
        multiclass: {
          model: 'Midjourney v6',
          confidence: 92,
          methods: [
            {
              name: '다중 분석 방법 1',
              threshold: 0.75,
              value: 0.92,
              result: 'Midjourney v6',
              weight: 0.5
            },
            {
              name: '다중 분석 방법 2',
              threshold: 0.7,
              value: 0.89,
              result: 'Midjourney v6',
              weight: 0.3
            },
            {
              name: '다중 분석 방법 3',
              threshold: 0.8,
              value: 0.95,
              result: 'Midjourney v6',
              weight: 0.2
            }
          ]
        },
        final: {
          result: 'AI 생성 이미지',
          model: 'Midjourney v6',
          confidence: 88
        }
      });
    } catch (error) {
      console.error('검증 실패:', error);
      // TODO: 에러 처리
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

            {preview && !loading && (
              <div className="verify-actions">
                <Button variant="primary" size="lg" onClick={handleVerify}>
                  검증하기
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      <ImageVerifyGuide />
    </>
  );
}
