'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

/**
 * 음성 분석 결과 상세 표시 (히스토리 상세용)
 * 구조: { fileName, result, confidence, date, analysis, final }
 */
export default function AudioVerifyResult({ resultData, backHref }) {
  const [shareFeedback, setShareFeedback] = useState(null);
  const { fileName, result, confidence, date, analysis, final } = resultData || {};

  const handleShare = async () => {
    const text = `음성 분석 결과: ${final?.result}${final?.model ? ` (${final.model})` : ''}${final?.confidence !== undefined ? ` - 신뢰도 ${final.confidence}%` : ''}`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'Heimdall 음성 분석 결과',
          text
        });
        setShareFeedback('공유 완료');
        setTimeout(() => setShareFeedback(null), 2000);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setShareFeedback('공유 실패');
          setTimeout(() => setShareFeedback(null), 2000);
        }
      }
    } else if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        setShareFeedback('클립보드에 복사됨');
        setTimeout(() => setShareFeedback(null), 2000);
      } catch {
        setShareFeedback('복사 실패');
        setTimeout(() => setShareFeedback(null), 2000);
      }
    } else {
      setShareFeedback('공유 기능을 사용할 수 없습니다');
      setTimeout(() => setShareFeedback(null), 2000);
    }
  };

  if (!resultData) return null;

  const isAi = result?.includes('AI');

  return (
    <section className="section section--gray verify-result-section">
      <div className="section__inner">
        <div className="verify-result__image-section">
          <div className="verify-result__image-wrap verify-result__audio-placeholder">
            <span className="verify-result__audio-icon">🎙️</span>
            <p className="verify-result__audio-filename">{fileName}</p>
            <p className="verify-result__audio-meta">
              검증 일시: {date}
            </p>
          </div>
        </div>

        <div className="verify-result__details">
          <h2 className="verify-result__details-title">📊 분석 결과 상세</h2>
          <div className="verify-result__cards">
            <div className="verify-result-card">
              <div className="verify-result-card__header">
                <div className="verify-result-card__icon">🔍</div>
                <div className="verify-result-card__content">
                  <h3 className="verify-result-card__title">이진분류</h3>
                  <div className="verify-result-card__summary">
                    <span className="verify-result-card__label">결과:</span>
                    <span className={`verify-result-card__value ${isAi ? 'verify-result-card__value--ai' : 'verify-result-card__value--real'}`}>
                      {analysis?.binary?.result || '-'}
                    </span>
                    <span className="verify-result-card__label">신뢰도:</span>
                    <span className="verify-result-card__value">{analysis?.binary?.confidence ?? confidence ?? 0}%</span>
                  </div>
                </div>
              </div>
            </div>

            {analysis?.model && (
              <div className="verify-result-card">
                <div className="verify-result-card__header">
                  <div className="verify-result-card__icon">🎯</div>
                  <div className="verify-result-card__content">
                    <h3 className="verify-result-card__title">추정 모델</h3>
                    <span className="verify-result-card__value">{analysis.model}</span>
                  </div>
                </div>
              </div>
            )}

            {analysis?.methods && analysis.methods.length > 0 && (
              <div className="verify-result-card" style={{ gridColumn: '1 / -1' }}>
                <div className="verify-result-card__header">
                  <div className="verify-result-card__icon">📋</div>
                  <div className="verify-result-card__content">
                    <h3 className="verify-result-card__title">분석 방법별 결과</h3>
                  </div>
                </div>
                <div className="verify-result-card__details">
                  {analysis.methods.map((method, idx) => (
                    <div key={idx} className="verify-result-method">
                      <h4 className="verify-result-method__title">{method.name}</h4>
                      <div className="verify-result-method__items">
                        <div className="verify-result-detail">
                          <span className="verify-result-detail__label">값:</span>
                          <span className="verify-result-detail__value">{method.value}</span>
                        </div>
                        <div className="verify-result-detail">
                          <span className="verify-result-detail__label">결과:</span>
                          <span className={`verify-result-detail__value ${method.result?.includes('AI') ? 'verify-result-detail__value--ai' : 'verify-result-detail__value--real'}`}>
                            {method.result}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="verify-result__final">
          <h2 className="verify-result__final-title">⭐ 최종 판별 결과</h2>
          <div className="verify-result__final-card">
            <div className="verify-result__final-content">
              <p className="verify-result__final-result">{final?.result ?? result ?? '-'}</p>
              {final?.model && (
                <p className="verify-result__final-model">추정 모델: {final.model}</p>
              )}
              {final?.confidence !== undefined && (
                <p className="verify-result__final-confidence">종합 신뢰도: {final.confidence}%</p>
              )}
            </div>
            <div className="verify-result__final-actions">
              {backHref && (
                <Button variant="outline" size="lg" href={backHref}>
                  목록으로
                </Button>
              )}
              <Button variant="primary" size="lg" onClick={handleShare}>
                {shareFeedback || '결과 공유하기'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
