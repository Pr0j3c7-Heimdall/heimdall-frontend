'use client';

import Image from 'next/image';
import { Icons } from '@/components/icons';
import {
  imageAnalysisMethodsData,
  imageFrameworkCardsData,
  imageSupportTableData
} from '@/data/imageVerify';

/** body[] 블록 렌더링 (p|h3|ul) */
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

/** 이미지 검사 페이지에서 업로드 섹션 아래에 나오는 '분석 방법 / 프레임워크 / 지원 모델 및 업로드 가이드' 블록. 홈·검증 페이지 공용 */
export default function ImageVerifyGuide() {
  return (
    <>
      <section id="methods" className="section section--white verify-methods-section">
        <div className="section__inner">
          <div className="section__header">
            <h2 className="section__title">{imageAnalysisMethodsData.title}</h2>
            <p className="section__desc">{imageAnalysisMethodsData.description}</p>
          </div>
          <div className="verify-methods-cards">
            {imageAnalysisMethodsData.items.map((item) => (
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
            <h2 className="section__title">{imageFrameworkCardsData.title}</h2>
          </div>
          <div className="verify-framework-diagram">
            <p className="verify-framework-diagram__caption">
              <span className="verify-framework-diagram__text">
                {imageFrameworkCardsData.description}
              </span>
            </p>
            <div className="verify-framework-diagram__images">
              <div className="verify-framework-diagram__image-wrap">
                <Image
                  src="/assets/images/framework/flow.png"
                  alt="로그인과 이미지 업로드부터 C2PA·이진·다중분류·메타데이터를 거쳐 최종 결과가 마이페이지에 저장되는 과정"
                  width={800}
                  height={500}
                  className="verify-framework-diagram__img"
                  unoptimized
                />
              </div>
              <div className="verify-framework-diagram__image-wrap">
                <Image
                  src="/assets/images/framework/system.png"
                  alt="이미지 업로드 후 C2PA·이진·다중분류·메타데이터 분석을 거쳐 최종 판단이 나오는 구조"
                  width={800}
                  height={500}
                  className="verify-framework-diagram__img"
                  unoptimized
                />
              </div>
            </div>
          </div>
          <h3 className="verify-framework-subtitle">{imageFrameworkCardsData.subtitle}</h3>
          <div className="verify-framework-cards">
            {imageFrameworkCardsData.cards.map((card) => (
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

      <section id="support" className="section section--white">
        <div className="section__inner">
          <div className="section__header">
            <h2 className="section__title">{imageSupportTableData.title}</h2>
            {imageSupportTableData.description ? (
              <p className="section__desc">{imageSupportTableData.description}</p>
            ) : null}
          </div>
          <div className="verify-support-cards">
            <div className="verify-support-card">
              <h3 className="verify-support-card__title">지원 모델 (10가지)</h3>
              <ul className="verify-support-card__list">
                {imageSupportTableData.supportedModels.map((name) => (
                  <li key={name} className="verify-support-card__item">{name}</li>
                ))}
              </ul>
            </div>
            <div className="verify-support-card">
              <h3 className="verify-support-card__title">업로드 가이드</h3>
              <dl className="verify-support-card__criteria">
                <div className="verify-support-criteria__row">
                  <dt>형식</dt>
                  <dd>{imageSupportTableData.fileCriteria.formats}</dd>
                </div>
                <div className="verify-support-criteria__row">
                  <dt>해상도</dt>
                  <dd>{imageSupportTableData.fileCriteria.minSize}</dd>
                </div>
                <div className="verify-support-criteria__row">
                  <dt>용량</dt>
                  <dd>{imageSupportTableData.fileCriteria.maxFileSize}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
