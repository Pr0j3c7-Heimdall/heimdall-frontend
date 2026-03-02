'use client';

import Link from 'next/link';

const GUIDE_ITEMS = [
  { href: '#methods', label: '이미지 분석 방법' },
  { href: '#framework', label: '프레임워크 구성' },
  { href: '#support', label: '지원 모델 및 업로드 가이드' }
];

export default function GuideSnb() {
  return (
    <nav className="guide-snb" aria-label="가이드 목차">
      <p className="guide-snb__title">목차</p>
      <ul className="guide-snb__list">
        {GUIDE_ITEMS.map((item) => (
          <li key={item.href} className="guide-snb__item">
            <Link href={item.href} className="guide-snb__link">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
