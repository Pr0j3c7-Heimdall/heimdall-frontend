'use client';

import { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';

/**
 * 분석 결과 데이터 구조 예시:
 * {
 *   image: string (base64 or URL),
 *   c2pa: {
 *     model: string,
 *     hashMatch: boolean,
 *     platform: string,
 *     details: { ... }
 *   },
 *   binary: {
 *     result: 'AI' | 'Real',
 *     confidence: number,
 *     methods: [
 *       { name: string, threshold: number, value: number, result: string, weight: number }
 *     ]
 *   },
 *   multiclass: {
 *     model: string,
 *     confidence: number,
 *     methods: [ ... ]
 *   },
 *   final: {
 *     result: string,
 *     model: string,
 *     confidence: number
 *   }
 * }
 */
export default function ImageVerifyResult({ resultData, onReset, backHref, backLabel = '목록으로' }) {
  const [shareFeedback, setShareFeedback] = useState(null);
  const { image, c2pa, binary, multiclass, final } = resultData || {};

  const handleShare = async () => {
    const confText =
      final?.aiProbability != null ? ` - AI 사진일 확률 ${final.aiProbability}%` : '';
    const text = `이미지 분석 결과: ${final?.result}${final?.model && final.model !== '-' ? ` (${final.model})` : ''}${confText}`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'Heimdall 이미지 분석 결과',
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

  return (
    <section className="section verify-result-section">
      <div className="section__inner">
        {/* 최종 판별 결과 (맨 앞) */}
        <div className="verify-result__final verify-result__final--top">
          <h2 className="verify-result__final-title">최종 판별 결과</h2>
          <div className="verify-result__final-card">
            <div className="verify-result__final-content">
              <p className="verify-result__final-result">{final?.result || '분석 결과 없음'}</p>
              {final?.model && final.model !== '-' && (
                <p className="verify-result__final-model">생성 모델: {final.model}</p>
              )}
              {final?.aiProbability != null && (
                <p className="verify-result__final-confidence">AI 사진일 확률: {final.aiProbability}%</p>
              )}
            </div>
            <div className="verify-result__final-actions">
              {backHref ? (
                <Button variant="outline" size="lg" href={backHref}>
                  {backLabel}
                </Button>
              ) : onReset ? (
                <Button variant="outline" size="lg" onClick={onReset}>
                  다시 분석하기
                </Button>
              ) : null}
              <Button variant="primary" size="lg" onClick={handleShare}>
                {shareFeedback || '결과 공유하기'}
              </Button>
            </div>
          </div>
        </div>

        {/* 분석된 이미지 */}
        <div className="verify-result__image-section">
          <div className="verify-result__image-wrap">
            <Image
              src={image}
              alt="분석된 이미지"
              fill
              className="verify-result__image"
              unoptimized
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
        </div>

        {/* 분석 결과 상세 */}
        <div className="verify-result__details">
          <h2 className="verify-result__details-title">분석 결과 상세</h2>
          <div className="verify-result__cards">
            {/* C2PA 분석 */}
            <div className="verify-result-card">
              <div className="verify-result-card__header">
                <h3 className="verify-result-card__title">C2PA 분석</h3>
                <div className="verify-result-card__summary">
                  <div className="verify-result-card__summary-row">
                    <span className="verify-result-card__label">C2PA 규격 준수</span>
                    <span
                      className={`verify-result-card__value ${c2pa ? (c2pa.isCompliant ? 'verify-result-card__value--success' : 'verify-result-card__value--error') : ''}`}
                    >
                      {c2pa ? (c2pa.isCompliant ? '예' : '아니오') : '데이터 없음'}
                    </span>
                  </div>
                </div>
              </div>
              {c2pa?.details && Object.keys(c2pa.details).length > 0 && (
                <dl className="verify-result-card__details">
                  {Object.entries(c2pa.details).map(([key, value]) => (
                    <div key={key} className="verify-result-detail">
                      <dt className="verify-result-detail__label">{key}</dt>
                      <dd className="verify-result-detail__value">{String(value)}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>

            {/* 이진분류 */}
            <div className="verify-result-card">
              <div className="verify-result-card__header">
                <h3 className="verify-result-card__title">이진분류</h3>
                <div className="verify-result-card__summary">
                  <div className="verify-result-card__summary-row">
                    <span className="verify-result-card__label">판정</span>
                    <span className={`verify-result-card__value ${binary?.result === 'AI' ? 'verify-result-card__value--ai' : 'verify-result-card__value--real'}`}>
                      {binary?.result === 'AI' ? 'AI 이미지' : binary?.result === 'Real' ? '실제 사진' : binary?.result || '-'}
                    </span>
                  </div>
                  <div className="verify-result-card__summary-row">
                    <span className="verify-result-card__label">AI 사진일 확률</span>
                    <span className="verify-result-card__value">{binary?.aiProbability ?? 0}%</span>
                  </div>
                </div>
              </div>
              {binary?.methods && binary.methods.length > 0 && (
                <div className="verify-result-card__details">
                  {binary.methods.map((method, idx) => (
                    <div key={idx} className="verify-result-method">
                      <h4 className="verify-result-method__title">{method.name}</h4>
                      <dl className="verify-result-method__items">
                        {method.weight != null && (
                          <div className="verify-result-detail">
                            <dt className="verify-result-detail__label">가중치</dt>
                            <dd className="verify-result-detail__value">{method.weight}%</dd>
                          </div>
                        )}
                        <div className="verify-result-detail">
                          <dt className="verify-result-detail__label">AI 사진일 확률</dt>
                          <dd className="verify-result-detail__value">{method.aiProbability}%</dd>
                        </div>
                        <div className="verify-result-detail">
                          <dt className="verify-result-detail__label">판정</dt>
                          <dd className={`verify-result-detail__value ${method.result === 'AI' ? 'verify-result-detail__value--ai' : 'verify-result-detail__value--real'}`}>
                            {method.result}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  ))}
                  <div className="verify-result-method verify-result-method--final">
                    <div className="verify-result-detail">
                      <dt className="verify-result-detail__label">최종 판정</dt>
                      <dd className={`verify-result-detail__value verify-result-detail__value--bold ${binary.result === 'AI' ? 'verify-result-detail__value--ai' : 'verify-result-detail__value--real'}`}>
                        {binary.result === 'AI' ? 'AI 이미지' : '실제 사진'}
                        <br />
                        AI 사진일 확률: {binary.aiProbability}%
                      </dd>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 다중분류 */}
            <div className="verify-result-card">
              <div className="verify-result-card__header">
                <h3 className="verify-result-card__title">다중분류</h3>
                <div className="verify-result-card__summary">
                  <div className="verify-result-card__summary-row">
                    <span className="verify-result-card__label">생성 모델</span>
                    <span className="verify-result-card__value">{multiclass?.model || '-'}</span>
                  </div>
                  <div className="verify-result-card__summary-row">
                    <span className="verify-result-card__label">AI 사진일 확률</span>
                    <span className="verify-result-card__value">{multiclass?.aiProbability ?? 0}%</span>
                  </div>
                </div>
              </div>
              {multiclass?.methods && multiclass.methods.length > 0 && (
                <div className="verify-result-card__details">
                  {multiclass.methods.map((method, idx) => (
                    <div key={idx} className="verify-result-method">
                      <h4 className="verify-result-method__title">{method.name}</h4>
                      {method.top3 && method.top3.length > 0 && (
                        <dl className="verify-result-method__items">
                          {method.top3.map((t, i) => (
                            <div key={i} className="verify-result-detail">
                              <dt className="verify-result-detail__label">상위 {i + 1}</dt>
                              <dd className="verify-result-detail__value">
                                {t.model} ({t.score}%)
                              </dd>
                            </div>
                          ))}
                          <div className="verify-result-detail">
                            <dt className="verify-result-detail__label">결과</dt>
                            <dd className="verify-result-detail__value">{method.predictedModel}</dd>
                          </div>
                        </dl>
                      )}
                      {(!method.top3 || method.top3.length === 0) && (
                        <dl className="verify-result-method__items">
                          <div className="verify-result-detail">
                            <dt className="verify-result-detail__label">결과</dt>
                            <dd className="verify-result-detail__value">{method.predictedModel}</dd>
                          </div>
                          <div className="verify-result-detail">
                            <dt className="verify-result-detail__label">AI 사진일 확률</dt>
                            <dd className="verify-result-detail__value">{method.aiProbability}%</dd>
                          </div>
                        </dl>
                      )}
                    </div>
                  ))}
                  <div className="verify-result-method verify-result-method--final">
                    <div className="verify-result-detail">
                      <dt className="verify-result-detail__label">최종 모델</dt>
                      <dd className="verify-result-detail__value verify-result-detail__value--bold">{multiclass.model}</dd>
                    </div>
                    <div className="verify-result-detail">
                      <dt className="verify-result-detail__label">최종 추정 확률</dt>
                      <dd className="verify-result-detail__value verify-result-detail__value--bold">{multiclass.aiProbability}%</dd>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
