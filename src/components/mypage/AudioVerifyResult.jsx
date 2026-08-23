'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

/**
 * 음성 분석 결과 상세 표시
 * 구조: { audio?, fileName, trackLabel?, result, confidence, date, c2pa?, analysis, final }
 */
export default function AudioVerifyResult({ resultData, onReset, backHref, backLabel = '목록으로' }) {
  const [shareFeedback, setShareFeedback] = useState(null);
  const { audio, fileName, trackLabel, result, confidence, date, c2pa, analysis, final } = resultData || {};

  const showFeedback = (message, duration = 2000) => {
    setShareFeedback(message);
    setTimeout(() => setShareFeedback(null), duration);
  };

  const handleShare = async () => {
    const text = `음성 분석 결과: ${final?.result}${final?.model && final.model !== '-' ? ` (${final.model})` : ''}${final?.confidence !== undefined ? ` - AI일 확률 ${final.confidence}%` : ''}`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'Heimdall 음성 분석 결과',
          text
        });
        showFeedback('공유 완료');
      } catch (err) {
        if (err.name !== 'AbortError') {
          showFeedback('공유 실패');
        }
      }
    } else if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        showFeedback('클립보드에 복사됨');
      } catch {
        showFeedback('복사 실패');
      }
    } else {
      showFeedback('공유 기능을 사용할 수 없습니다');
    }
  };

  if (!resultData) return null;

  const isAi = result?.includes('AI') || analysis?.binary?.result?.includes('AI');
  const c2paDetails = c2pa?.details ? Object.entries(c2pa.details) : [];

  return (
    <section className="section section--gray verify-result-section">
      <div className="section__inner">
        <div className="verify-result__final verify-result__final--top">
          <h2 className="verify-result__final-title">최종 판별 결과</h2>
          <div className="verify-result__final-card">
            <div className="verify-result__final-content">
              <p className="verify-result__final-result">{final?.result ?? result ?? '분석 결과 없음'}</p>
              {trackLabel && trackLabel !== '-' && (
                <p className="verify-result__final-model">분석 유형: {trackLabel}</p>
              )}
              {final?.model && final.model !== '-' && final.model !== trackLabel && (
                <p className="verify-result__final-model">추정 모델: {final.model}</p>
              )}
              {final?.confidence !== undefined && (
                <p className="verify-result__final-confidence">AI일 확률: {final.confidence}%</p>
              )}
            </div>
            <div className="verify-result__final-actions">
              {onReset && (
                <Button variant="outline" size="lg" onClick={onReset}>
                  다시 검사
                </Button>
              )}
              {backHref && (
                <Button variant="outline" size="lg" href={backHref}>
                  {backLabel}
                </Button>
              )}
              <Button variant="primary" size="lg" onClick={handleShare}>
                {shareFeedback || '결과 공유하기'}
              </Button>
            </div>
          </div>
        </div>

        <div className="verify-result__image-section">
          <div className="verify-result__image-wrap verify-result__audio-placeholder">
            {audio ? (
              <audio src={audio} controls className="verify-preview__audio verify-result__audio-player" />
            ) : (
              <span className="verify-result__audio-icon" aria-hidden>
                🎙️
              </span>
            )}
            <p className="verify-result__audio-filename">{fileName}</p>
            <p className="verify-result__audio-meta">검증 일시: {date}</p>
          </div>
        </div>

        <div className="verify-result__details">
          <h2 className="verify-result__details-title">분석 결과 상세</h2>
          <div className="verify-result__cards">
            {c2pa && (
              <div className="verify-result-card">
                <div className="verify-result-card__header">
                  <h3 className="verify-result-card__title">C2PA</h3>
                  <div className="verify-result-card__summary">
                    <span className="verify-result-card__label">준수 여부</span>
                    <span className={`verify-result-card__value ${c2pa.isCompliant ? 'verify-result-card__value--ai' : 'verify-result-card__value--real'}`}>
                      {c2pa.isCompliant ? '준수' : '미준수/없음'}
                    </span>
                  </div>
                </div>
                {c2paDetails.length > 0 && (
                  <div className="verify-result-card__details">
                    <dl className="verify-result-metadata">
                      {c2paDetails.map(([key, value]) => (
                        <div key={key} className="verify-result-detail">
                          <dt className="verify-result-detail__label">{key}</dt>
                          <dd className="verify-result-detail__value">{String(value)}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}
              </div>
            )}

            <div className="verify-result-card">
              <div className="verify-result-card__header">
                <h3 className="verify-result-card__title">이진분류</h3>
                <div className="verify-result-card__summary">
                  <span className="verify-result-card__label">결과</span>
                  <span className={`verify-result-card__value ${isAi ? 'verify-result-card__value--ai' : 'verify-result-card__value--real'}`}>
                    {analysis?.binary?.result || '-'}
                  </span>
                  <span className="verify-result-card__label">AI일 확률</span>
                  <span className="verify-result-card__value">{analysis?.binary?.confidence ?? confidence ?? 0}%</span>
                </div>
              </div>
            </div>

            {analysis?.model && analysis.model !== '-' && (
              <div className="verify-result-card">
                <div className="verify-result-card__header">
                  <h3 className="verify-result-card__title">추정 모델</h3>
                  <div className="verify-result-card__summary">
                    <span className="verify-result-card__label">모델</span>
                    <span className="verify-result-card__value">{analysis.model}</span>
                  </div>
                </div>
              </div>
            )}

            {analysis?.methods && analysis.methods.length > 0 && (
              <div className="verify-result-card" style={{ gridColumn: '1 / -1' }}>
                <div className="verify-result-card__header">
                  <h3 className="verify-result-card__title">분석 모델별 결과</h3>
                </div>
                <div className="verify-result-card__details">
                  {analysis.methods.map((method, idx) => (
                    <div key={idx} className="verify-result-method">
                      <h4 className="verify-result-method__title">{method.name}</h4>
                      <dl className="verify-result-method__items">
                        <div className="verify-result-detail">
                          <dt className="verify-result-detail__label">AI일 확률</dt>
                          <dd className="verify-result-detail__value">{method.value}%</dd>
                        </div>
                        <div className="verify-result-detail">
                          <dt className="verify-result-detail__label">결과</dt>
                          <dd className={`verify-result-detail__value ${method.result?.includes('AI') ? 'verify-result-detail__value--ai' : 'verify-result-detail__value--real'}`}>
                            {method.result}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
