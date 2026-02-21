'use client';

import Button from '@/components/ui/Button';
import { Icons } from '@/components/icons';

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
export default function ImageVerifyResult({ resultData, onReset }) {
  const { image, c2pa, binary, multiclass, final } = resultData || {};

  if (!resultData) return null;

  return (
    <section className="section section--gray verify-result-section">
      <div className="section__inner">
        {/* 분석된 이미지 */}
        <div className="verify-result__image-section">
          <div className="verify-result__image-wrap">
            <img src={image} alt="분석된 이미지" className="verify-result__image" />
          </div>
        </div>

        {/* 분석 결과 상세 */}
        <div className="verify-result__details">
          <h2 className="verify-result__details-title">📊 분석 결과 상세</h2>
          <div className="verify-result__cards">
            {/* C2PA 분석 */}
            <div className="verify-result-card">
              <div className="verify-result-card__header">
                <div className="verify-result-card__icon">📋</div>
                <div className="verify-result-card__content">
                  <h3 className="verify-result-card__title">C2PA 분석</h3>
                  <div className="verify-result-card__summary">
                    <span className="verify-result-card__label">모델:</span>
                    <span className="verify-result-card__value">{c2pa?.model || '-'}</span>
                    <span className="verify-result-card__label">해시:</span>
                    <span className="verify-result-card__value">{c2pa?.hashMatch ? '일치' : '불일치'}</span>
                  </div>
                </div>
              </div>
              {c2pa && (
                <div className="verify-result-card__details">
                  <div className="verify-result-detail">
                    <span className="verify-result-detail__label">모델명:</span>
                    <span className="verify-result-detail__value">{c2pa.model || '-'}</span>
                  </div>
                  {c2pa.platform && (
                    <div className="verify-result-detail">
                      <span className="verify-result-detail__label">플랫폼:</span>
                      <span className="verify-result-detail__value">{c2pa.platform}</span>
                    </div>
                  )}
                  <div className="verify-result-detail">
                    <span className="verify-result-detail__label">해시값 일치 여부:</span>
                    <span className={`verify-result-detail__value ${c2pa.hashMatch ? 'verify-result-detail__value--success' : 'verify-result-detail__value--error'}`}>
                      {c2pa.hashMatch ? 'O' : 'X'}
                    </span>
                  </div>
                  {c2pa.details && Object.entries(c2pa.details).map(([key, value]) => (
                    <div key={key} className="verify-result-detail">
                      <span className="verify-result-detail__label">{key}:</span>
                      <span className="verify-result-detail__value">{String(value)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 이진분류 */}
            <div className="verify-result-card">
              <div className="verify-result-card__header">
                <div className="verify-result-card__icon">🔍</div>
                <div className="verify-result-card__content">
                  <h3 className="verify-result-card__title">이진분류</h3>
                  <div className="verify-result-card__summary">
                    <span className="verify-result-card__label">결과:</span>
                    <span className={`verify-result-card__value ${binary?.result === 'AI' ? 'verify-result-card__value--ai' : 'verify-result-card__value--real'}`}>
                      {binary?.result || '-'}
                    </span>
                    <span className="verify-result-card__label">신뢰도:</span>
                    <span className="verify-result-card__value">{binary?.confidence || 0}%</span>
                  </div>
                </div>
              </div>
              {binary?.methods && (
                <div className="verify-result-card__details">
                  {binary.methods.map((method, idx) => (
                    <div key={idx} className="verify-result-method">
                      <h4 className="verify-result-method__title">{method.name || `분석 방법 ${idx + 1}`}</h4>
                      <div className="verify-result-method__items">
                        <div className="verify-result-detail">
                          <span className="verify-result-detail__label">모델 기준점:</span>
                          <span className="verify-result-detail__value">{method.threshold}</span>
                        </div>
                        <div className="verify-result-detail">
                          <span className="verify-result-detail__label">사진 값:</span>
                          <span className="verify-result-detail__value">{method.value}</span>
                        </div>
                        <div className="verify-result-detail">
                          <span className="verify-result-detail__label">결과:</span>
                          <span className={`verify-result-detail__value ${method.result === 'AI' ? 'verify-result-detail__value--ai' : 'verify-result-detail__value--real'}`}>
                            {method.result}
                          </span>
                        </div>
                        <div className="verify-result-detail">
                          <span className="verify-result-detail__label">가중치:</span>
                          <span className="verify-result-detail__value">{method.weight}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="verify-result-method verify-result-method--final">
                    <div className="verify-result-detail">
                      <span className="verify-result-detail__label">가중치 합산 결과:</span>
                      <span className={`verify-result-detail__value verify-result-detail__value--bold ${binary.result === 'AI' ? 'verify-result-detail__value--ai' : 'verify-result-detail__value--real'}`}>
                        {binary.result} ({binary.confidence}% 신뢰도)
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 다중분류 */}
            <div className="verify-result-card">
              <div className="verify-result-card__header">
                <div className="verify-result-card__icon">🎯</div>
                <div className="verify-result-card__content">
                  <h3 className="verify-result-card__title">다중분류</h3>
                  <div className="verify-result-card__summary">
                    <span className="verify-result-card__label">모델:</span>
                    <span className="verify-result-card__value">{multiclass?.model || '-'}</span>
                    <span className="verify-result-card__label">신뢰도:</span>
                    <span className="verify-result-card__value">{multiclass?.confidence || 0}%</span>
                  </div>
                </div>
              </div>
              {multiclass?.methods && (
                <div className="verify-result-card__details">
                  {multiclass.methods.map((method, idx) => (
                    <div key={idx} className="verify-result-method">
                      <h4 className="verify-result-method__title">{method.name || `분석 방법 ${idx + 1}`}</h4>
                      <div className="verify-result-method__items">
                        <div className="verify-result-detail">
                          <span className="verify-result-detail__label">모델 기준점:</span>
                          <span className="verify-result-detail__value">{method.threshold}</span>
                        </div>
                        <div className="verify-result-detail">
                          <span className="verify-result-detail__label">사진 값:</span>
                          <span className="verify-result-detail__value">{method.value}</span>
                        </div>
                        <div className="verify-result-detail">
                          <span className="verify-result-detail__label">결과:</span>
                          <span className="verify-result-detail__value">{method.result}</span>
                        </div>
                        {method.weight && (
                          <div className="verify-result-detail">
                            <span className="verify-result-detail__label">가중치:</span>
                            <span className="verify-result-detail__value">{method.weight}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="verify-result-method verify-result-method--final">
                    <div className="verify-result-detail">
                      <span className="verify-result-detail__label">최종 결과:</span>
                      <span className="verify-result-detail__value verify-result-detail__value--bold">
                        {multiclass.model} ({multiclass.confidence}% 신뢰도)
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 최종 판별 결과 */}
        <div className="verify-result__final">
          <h2 className="verify-result__final-title">⭐ 최종 판별 결과</h2>
          <div className="verify-result__final-card">
            <div className="verify-result__final-content">
              <p className="verify-result__final-result">{final?.result || '분석 결과 없음'}</p>
              {final?.model && (
                <p className="verify-result__final-model">생성 모델: {final.model}</p>
              )}
              {final?.confidence !== undefined && (
                <p className="verify-result__final-confidence">종합 신뢰도: {final.confidence}%</p>
              )}
            </div>
            <div className="verify-result__final-actions">
              <Button variant="outline" size="lg" onClick={onReset}>
                다시 분석하기
              </Button>
              <Button variant="primary" size="lg" onClick={() => window.navigator.share?.({ text: `이미지 분석 결과: ${final?.result}` })}>
                결과 공유하기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
