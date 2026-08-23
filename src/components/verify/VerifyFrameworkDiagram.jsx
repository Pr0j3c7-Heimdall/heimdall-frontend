'use client';

import Image from 'next/image';

/**
 * 프레임워크 흐름도 + 시스템 구성도 이미지 블록
 * @param {{ description?: string, diagrams: { src: string, alt: string, caption: string }[] }} props
 */
export default function VerifyFrameworkDiagram({ description, diagrams = [] }) {
  if (!diagrams.length) return null;

  return (
    <div className="verify-framework-diagram">
      {description ? (
        <p className="verify-framework-diagram__caption">
          <span className="verify-framework-diagram__text">{description}</span>
        </p>
      ) : null}
      <div className="verify-framework-diagram__images">
        {diagrams.map((diagram) => (
          <div key={diagram.src} className="verify-framework-diagram__image-wrap">
            <Image
              src={diagram.src}
              alt={diagram.alt}
              width={800}
              height={500}
              className="verify-framework-diagram__img"
              unoptimized
            />
            <p className="verify-framework-diagram__img-caption">{diagram.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
