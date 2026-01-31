'use client';

import Link from 'next/link';
import Button from '@/components/Button';

export default function Navbar({ logo = 'Heimdall', navItems = [], primaryBtn, secondaryBtn, cta }) {
  const mainCta = primaryBtn || cta;
  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <Link href="/" className="navbar__logo">
          {logo}
        </Link>
        <ul className="navbar__links">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="navbar__link">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="navbar__actions">
          {secondaryBtn && (
            <Button href={secondaryBtn.href} variant="ghost" size="sm">
              {secondaryBtn.label}
            </Button>
          )}
          {mainCta && (
            <Button href={mainCta.href} variant="primary" size="sm">
              {mainCta.label}
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
