'use client';

import { useState, useEffect } from 'react';
import AudioDropzone from './AudioDropzone';
import Button from '@/components/ui/Button';
import Loader from '@/components/ui/Loader';
import { Icons } from '@/components/icons';
import {
  audioAnalysisMethodsData,
  audioFrameworkCardsData,
  audioSupportTableData,
  audioCriteriaData,
  audioSupportedModelsData
} from '@/data/audioVerify';

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
            <h1 className="section__title">음성 검사</h1>
            <p className="section__desc">음성을 업로드하여 AI 합성 여부, 사용 모델, 녹음 정보 등을 검사하세요. 초 단위로 구간 분석(10초 이상 1분 이하 권장)을 지원합니다.</p>
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

      {/* 4. 음성 분석 방법 (검정) - 카드 4개 */}
      <section id="methods" className="section section--white verify-methods-section">
        <div className="section__inner">
          <div className="section__header">
            <h2 className="section__title">{audioAnalysisMethodsData.title}</h2>
            <p className="section__desc">{audioAnalysisMethodsData.description}</p>
          </div>
          <div className="verify-methods-cards">
            {audioAnalysisMethodsData.items.map((item) => (
              <div key={item.id} className="verify-methods-card">
                <span className="verify-methods-card__icon">{Icons[item.icon]}</span>
                <h3 className="verify-methods-card__title">{item.title}</h3>
                <p className="verify-methods-card__desc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Heimdall 음성 판별 프레임워크 */}
      <section id="framework" className="section section--gray">
        <div className="section__inner">
          <div className="section__header">
            <h2 className="section__title">{audioFrameworkCardsData.title}</h2>
            <p className="section__desc">{audioFrameworkCardsData.description}</p>
          </div>
          <div className="verify-framework-diagram">
            <div className="verify-framework-diagram__placeholder">
              <span className="verify-framework-diagram__label">시스템 구성도</span>
              <p className="verify-framework-diagram__text">C2PA → 이진분류 → 다중분류 → 메타데이터 → 최종 판별</p>
            </div>
          </div>
          <h3 className="verify-framework-subtitle">{audioFrameworkCardsData.subtitle}</h3>
          <div className="verify-framework-cards">
            {audioFrameworkCardsData.cards.map((card) => (
              <div key={card.id} className="verify-framework-card">
                <h4 className="verify-framework-card__title">{card.title}</h4>
                <p className="verify-framework-card__desc">{card.longDescription}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. 지원 모델 및 업로드 가이드 - 카드 2열 */}
      <section id="support" className="section section--white">
        <div className="section__inner">
          <div className="section__header">
            <h2 className="section__title">{audioSupportTableData.title}</h2>
            <p className="section__desc">{audioSupportTableData.description}</p>
          </div>
          <div className="verify-support-cards">
            <div className="verify-support-card">
              <h3 className="verify-support-card__title">지원 모델 (10가지)</h3>
              <ul className="verify-support-card__list">
                {audioSupportTableData.supportedModels.map((name) => (
                  <li key={name} className="verify-support-card__item">{name}</li>
                ))}
              </ul>
            </div>
            <div className="verify-support-card">
              <h3 className="verify-support-card__title">업로드 가이드</h3>
              <dl className="verify-support-card__criteria">
                <div className="verify-support-criteria__row">
                  <dt>형식</dt>
                  <dd>{audioSupportTableData.fileCriteria.formats}</dd>
                </div>
                <div className="verify-support-criteria__row">
                  <dt>길이</dt>
                  <dd>{audioSupportTableData.fileCriteria.duration}</dd>
                </div>
                <div className="verify-support-criteria__row">
                  <dt>용량</dt>
                  <dd>{audioSupportTableData.fileCriteria.maxFileSize}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
