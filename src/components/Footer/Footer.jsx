'use client';

import Link from 'next/link';

export default function Footer({ links = [], copyright }) {
  const year = new Date().getFullYear();

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
        <p className="footer__copyright">{copyright || `© ${year} Heimdall. All rights reserved.`}</p>
      </div>
    </footer>
  );
}
