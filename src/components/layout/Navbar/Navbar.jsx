'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from '@/components/ui/Button';
import { useAuthModal } from '@/contexts/AuthModalContext';
import { useTheme } from '@/contexts/ThemeContext';

export default function Navbar({ logo = 'Heimdall', navItems = [], primaryBtn, secondaryBtn, cta }) {
  const pathname = usePathname();
  const { openAuthModal } = useAuthModal();
  const { theme, toggleTheme, mounted } = useTheme();
  const mainCta = primaryBtn || cta;

  const renderBtn = (btn, variant) => {
    if (!btn) return null;
    const isLogin = btn.action === 'login' || btn.href === '/login';
    const isRegister = btn.action === 'register' || btn.href === '/register';
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
    if (btn.onClick) {
      return (
        <Button variant={variant} size="sm" onClick={btn.onClick}>
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
          {navItems.map((item) => {
            const isExternal = item.external || (item.href && item.href.startsWith('http'));
            const isActive = !isExternal && (pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href)));
            return (
              <li key={item.href + item.label}>
                {isExternal ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="navbar__link"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link href={item.href} className={`navbar__link ${isActive ? 'navbar__link--active' : ''}`}>
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
        <div className="navbar__actions">
          {mounted && (
            <button
              type="button"
              className="navbar__theme-toggle"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
              title={theme === 'dark' ? '라이트 모드' : '다크 모드'}
            >
              {theme === 'dark' ? (
                <span className="navbar__theme-icon navbar__theme-icon--sun" aria-hidden>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                  </svg>
                </span>
              ) : (
                <span className="navbar__theme-icon navbar__theme-icon--moon" aria-hidden>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                </span>
              )}
            </button>
          )}
          {renderBtn(secondaryBtn, 'ghost')}
          {renderBtn(mainCta, 'primary')}
        </div>
      </div>
    </nav>
  );
}
