'use client';

import { useState } from 'react';
import ImageDropzone from './ImageDropzone';
import ImageVerifyResult from './ImageVerifyResult';
import Button from '@/components/ui/Button';
import { Icons } from '@/components/icons';
import { imageAnalysisMethodsData, imageCriteriaData, supportedModelsData } from '@/data/imageVerify';

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
            <h1 className="section__title">이미지 검증</h1>
            <p className="section__desc">업로드한 이미지가 AI로 생성되었는지, 실제 촬영된 것인지 판별합니다.</p>
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

      {/* 2. 분석 방법 설명 */}
      <section id="methods" className="section section--white">
        <div className="section__inner">
          <div className="section__header">
            <h2 className="section__title">{imageAnalysisMethodsData.title}</h2>
            <p className="section__desc">{imageAnalysisMethodsData.description}</p>
          </div>
          <div className="analysis-grid">
            {imageAnalysisMethodsData.items.map((item) => (
              <div key={item.id} className="analysis-card">
                <span className="analysis-card__icon">{Icons[item.icon]}</span>
                <h3 className="analysis-card__title">{item.title}</h3>
                <p className="analysis-card__desc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 독자적 기준 설명 */}
      <section id="criteria" className="intro intro--dark">
        <div className="intro__inner">
          <h2 className="intro__title">{imageCriteriaData.title}</h2>
          <p className="intro__text">{imageCriteriaData.description}</p>
          <ul className="intro__list">
            {imageCriteriaData.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. 지원 모델 설명 */}
      <section id="models" className="section section--gray">
        <div className="section__inner">
          <div className="section__header">
            <h2 className="section__title">{supportedModelsData.title}</h2>
            <p className="section__desc">{supportedModelsData.description}</p>
          </div>
          <div className="tech-grid">
            {supportedModelsData.categories.map((cat) => (
              <div key={cat.name} className="tech-card">
                <h3 className="tech-card__title">{cat.name}</h3>
                <ul className="tech-card__list">
                  {cat.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
