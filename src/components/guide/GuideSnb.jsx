'use client';

import Link from 'next/link';

export default function GuideSnb() {
  return (
    <nav className="guide-snb" aria-label="가이드 목차">
      <p className="guide-snb__title">목차</p>
      <ul className="guide-snb__list">
        <li className="guide-snb__item">
          <span className="guide-snb__link guide-snb__link--section">이미지</span>
          <ul className="guide-snb__list guide-snb__list--nested">
            <li className="guide-snb__item">
              <Link href="#methods" className="guide-snb__link">
                이미지 분석 방법
              </Link>
            </li>
            <li className="guide-snb__item">
              <Link href="#framework" className="guide-snb__link">
                Heimdall 이미지 판별 프레임워크
              </Link>
            </li>
            <li className="guide-snb__item">
              <Link href="#support" className="guide-snb__link">
                지원 모델 및 업로드 가이드
              </Link>
            </li>
          </ul>
        </li>
        <li className="guide-snb__item">
          <span className="guide-snb__link guide-snb__link--section">음성</span>
          <ul className="guide-snb__list guide-snb__list--nested">
            <li className="guide-snb__item">
              <Link href="#audio-methods" className="guide-snb__link">
                음성 분석 방법
              </Link>
            </li>
            <li className="guide-snb__item">
              <Link href="#audio-framework" className="guide-snb__link">
                Heimdall 음성 판별 프레임워크
              </Link>
            </li>
            <li className="guide-snb__item">
              <Link href="#audio-support" className="guide-snb__link">
                주의사항 및 업로드 가이드
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}
