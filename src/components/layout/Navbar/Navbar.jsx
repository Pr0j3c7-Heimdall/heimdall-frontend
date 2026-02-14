'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';
import { useAuthModal } from '@/contexts/AuthModalContext';

export default function Navbar({ logo = 'Heimdall', navItems = [], primaryBtn, secondaryBtn, cta }) {
  const { openAuthModal } = useAuthModal();
  const mainCta = primaryBtn || cta;

  const renderBtn = (btn, variant) => {
    if (!btn) return null;
    const isLogin = btn.href === '/login';
    const isRegister = btn.href === '/register';
    if (isLogin) {
      return (
        <Button variant={variant} size="sm" onClick={() => openAuthModal('login')}>
          {btn.label}
        </Button>
      );
    }
    if (isRegister) {
      return (
        <Button variant={variant} size="sm" onClick={() => openAuthModal('register')}>
          {btn.label}
        </Button>
      );
    }
    return (
      <Button href={btn.href} variant={variant} size="sm">
        {btn.label}
      </Button>
    );
  };

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <Link href="/" className="navbar__logo">
          {logo}
        </Link>
        <ul className="navbar__links">
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="navbar__link">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="navbar__actions">
          {renderBtn(secondaryBtn, 'ghost')}
          {renderBtn(mainCta, 'primary')}
        </div>
      </div>
    </nav>
  );
}
