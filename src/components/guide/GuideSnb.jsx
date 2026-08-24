'use client';

import Link from 'next/link';
import { Icons } from '@/components/icons';

function SnbIcon({ icon }) {
  return (
    <span className="guide-snb__icon" aria-hidden>
      {icon}
    </span>
  );
}

export default function GuideSnb() {
  return (
    <nav className="guide-snb" aria-label="가이드 목차">
      <div className="guide-snb__panel">
        <p className="guide-snb__title">
          <span className="guide-snb__title-icon" aria-hidden>
            {Icons.list}
          </span>
          목차
        </p>
        <ul className="guide-snb__list">
          <li className="guide-snb__item">
            <span className="guide-snb__link guide-snb__link--section">
              <SnbIcon icon={Icons.image} />
              <span className="guide-snb__label">이미지</span>
            </span>
            <ul className="guide-snb__list guide-snb__list--nested">
              <li className="guide-snb__item">
                <Link href="#methods" className="guide-snb__link guide-snb__link--nested">
                  <SnbIcon icon={Icons.grid} />
                  <span className="guide-snb__label">이미지 분석 방법</span>
                </Link>
              </li>
              <li className="guide-snb__item">
                <Link href="#framework" className="guide-snb__link guide-snb__link--nested">
                  <SnbIcon icon={Icons.layers} />
                  <span className="guide-snb__label">Heimdall 이미지 판별 프레임워크</span>
                </Link>
              </li>
              <li className="guide-snb__item">
                <Link href="#support" className="guide-snb__link guide-snb__link--nested">
                  <SnbIcon icon={Icons.upload} />
                  <span className="guide-snb__label">지원 모델 및 업로드 가이드</span>
                </Link>
              </li>
            </ul>
          </li>
          <li className="guide-snb__item">
            <span className="guide-snb__link guide-snb__link--section">
              <SnbIcon icon={Icons.mic} />
              <span className="guide-snb__label">음성</span>
            </span>
            <ul className="guide-snb__list guide-snb__list--nested">
              <li className="guide-snb__item">
                <Link href="#audio-methods" className="guide-snb__link guide-snb__link--nested">
                  <SnbIcon icon={Icons.grid} />
                  <span className="guide-snb__label">음성 분석 방법</span>
                </Link>
              </li>
              <li className="guide-snb__item">
                <Link href="#audio-framework" className="guide-snb__link guide-snb__link--nested">
                  <SnbIcon icon={Icons.layers} />
                  <span className="guide-snb__label">Heimdall 음성 판별 프레임워크</span>
                </Link>
              </li>
              <li className="guide-snb__item">
                <Link href="#audio-support" className="guide-snb__link guide-snb__link--nested">
                  <SnbIcon icon={Icons.info} />
                  <span className="guide-snb__label">주의사항 및 업로드 가이드</span>
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}
