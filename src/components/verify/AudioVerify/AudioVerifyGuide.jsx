'use client';

import { Icons } from '@/components/icons';
import VerifyFrameworkDiagram from '@/components/verify/VerifyFrameworkDiagram';
import {
  audioAnalysisMethodsData,
  audioFrameworkCardsData,
  audioSupportTableData
} from '@/data/audioVerify';

function FrameworkCardBlock({ block }) {
  if (block.type === 'p') {
    return <p className="verify-framework-card__p">{block.text}</p>;
  }
  if (block.type === 'h3') {
    return <h3 className="verify-framework-card__h3">{block.text}</h3>;
  }
  if (block.type === 'ul') {
    return (
      <ul className="verify-framework-card__ul">
        {block.items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    );
  }
  return null;
}

export default function AudioVerifyGuide() {
  return (
    <>
      <section id="audio-methods" className="section section--white verify-methods-section">
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

      <section id="audio-framework" className="section section--gray">
        <div className="section__inner">
          <div className="section__header">
            <h2 className="section__title">{audioFrameworkCardsData.title}</h2>
          </div>
          <VerifyFrameworkDiagram
            description={audioFrameworkCardsData.description}
            diagrams={audioFrameworkCardsData.diagrams}
          />
          <h3 className="verify-framework-subtitle">{audioFrameworkCardsData.subtitle}</h3>
          <div className="verify-framework-cards">
            {audioFrameworkCardsData.cards.map((card) => (
              <div key={card.id} className="verify-framework-card">
                <h4 className="verify-framework-card__title">{card.title}</h4>
                <div className="verify-framework-card__body">
                  {card.body.map((block, i) => (
                    <FrameworkCardBlock key={i} block={block} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="audio-support" className="section section--white">
        <div className="section__inner">
          <div className="section__header">
            <h2 className="section__title">{audioSupportTableData.title}</h2>
          </div>
          <div className="verify-support-cards">
            <div className="verify-support-card">
              <h3 className="verify-support-card__title">주의사항</h3>
              <ul className="verify-support-card__list">
                {audioSupportTableData.notices.map((notice, i) => (
                  <li key={i} className="verify-support-card__item verify-support-card__item--notice">
                    {notice}
                  </li>
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
              <div className="verify-support-card__divider" aria-hidden />
              <h3 className="verify-support-card__title">분석 엔진</h3>
              <ul className="verify-support-card__list">
                {audioSupportTableData.engines.map((engine, i) => (
                  <li key={i} className="verify-support-card__item">{engine}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
