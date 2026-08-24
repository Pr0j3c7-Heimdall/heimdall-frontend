'use client';

import { useState } from 'react';

function FrameworkDiagramImage({ diagram }) {
  const [src, setSrc] = useState(diagram.src);
  const [failed, setFailed] = useState(false);

  const handleError = () => {
    if (diagram.fallbackSrc && src !== diagram.fallbackSrc) {
      setSrc(diagram.fallbackSrc);
      return;
    }
    setFailed(true);
  };

  if (failed) {
    return (
      <div className="verify-framework-diagram__placeholder">
        <p className="verify-framework-diagram__text">흐름도를 불러올 수 없습니다</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={diagram.alt}
      className="verify-framework-diagram__img"
      loading="lazy"
      onError={handleError}
    />
  );
}

/**
 * 프레임워크 흐름도 + 시스템 구성도
 * @param {{ description?: string, diagrams: { src: string, fallbackSrc?: string, alt: string, caption: string }[] }} props
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
            <FrameworkDiagramImage diagram={diagram} />
            <p className="verify-framework-diagram__img-caption">{diagram.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
