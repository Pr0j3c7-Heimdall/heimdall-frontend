'use client';

import { useState, useEffect } from 'react';
import AudioDropzone from './AudioDropzone';
import Button from '@/components/ui/Button';
import Loader from '@/components/ui/Loader';
import { Icons } from '@/components/icons';
import { audioAnalysisMethodsData, audioCriteriaData, audioSupportedModelsData } from '@/data/audioVerify';

export default function AudioVerifyContent() {
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
            <h1 className="section__title">음성 검증</h1>
            <p className="section__desc">업로드한 음성 파일이 AI로 합성되었는지, 실제 녹음인지 판별합니다.</p>
          </div>

          <div className="verify-content">
            <div className="verify-upload">
              {!previewUrl ? (
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

            {previewUrl && !loading && (
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

      {/* 3. 결과 상세 도출 - TODO: API 연동 후 표시 */}
      {/* <section className="section section--gray verify-result-section">...</section> */}

      {/* 4. 분석 방법 설명 */}
      <section id="methods" className="section section--white">
        <div className="section__inner">
          <div className="section__header">
            <h2 className="section__title">{audioAnalysisMethodsData.title}</h2>
            <p className="section__desc">{audioAnalysisMethodsData.description}</p>
          </div>
          <div className="analysis-grid">
            {audioAnalysisMethodsData.items.map((item) => (
              <div key={item.id} className="analysis-card">
                <span className="analysis-card__icon">{Icons[item.icon]}</span>
                <h3 className="analysis-card__title">{item.title}</h3>
                <p className="analysis-card__desc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 독자적 기준 설명 */}
      <section id="criteria" className="intro intro--dark">
        <div className="intro__inner">
          <h2 className="intro__title">{audioCriteriaData.title}</h2>
          <p className="intro__text">{audioCriteriaData.description}</p>
          <ul className="intro__list">
            {audioCriteriaData.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. 지원 모델 설명 */}
      <section id="models" className="section section--gray">
        <div className="section__inner">
          <div className="section__header">
            <h2 className="section__title">{audioSupportedModelsData.title}</h2>
            <p className="section__desc">{audioSupportedModelsData.description}</p>
          </div>
          <div className="tech-grid">
            {audioSupportedModelsData.categories.map((cat) => (
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
