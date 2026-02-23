'use client';

import Link from 'next/link';

const WOORO_URL = 'https://wooro.skhu.ac.kr/wooro/index.do';

export default function Footer({ links = [], copyright }) {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__links">
          {links.map((item) => (
            <Link key={item.href} href={item.href} className="footer__link">
              {item.label}
            </Link>
          ))}
        </div>
        <p className="footer__credit">
          <a href={WOORO_URL} target="_blank" rel="noopener noreferrer" className="footer__credit-link">
            본 프로젝트는 성공회대학교 우로장학회의 지원을 받아 제작되었습니다.
          </a>
        </p>
        <p className="footer__copyright" suppressHydrationWarning>
          {copyright ?? '© 2026 Heimdall. All rights reserved.'}
        </p>
      </div>
    </footer>
  );
}
