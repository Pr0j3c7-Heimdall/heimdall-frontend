'use client';

import { Icons } from '@/components/icons';
import {
  audioAnalysisMethodsData,
  audioFrameworkCardsData,
  audioSupportTableData
} from '@/data/audioVerify';

/** 음성 검사 페이지에서 업로드 섹션 아래에 나오는 '분석 방법 / 프레임워크 / 지원 모델 및 업로드 가이드' 블록. 홈·검증 페이지 공용 */
export default function AudioVerifyGuide() {
  return (
    <>
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
