'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from '@/components/ui/Button';
import { useAuthModal } from '@/contexts/AuthModalContext';
import { useTheme } from '@/contexts/ThemeContext';

export default function Navbar({ logo = 'Heimdall', navItems = [], primaryBtn, secondaryBtn, cta }) {
  const pathname = usePathname();
  const { openAuthModal } = useAuthModal();
  const { theme, toggleTheme, mounted } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const mainCta = primaryBtn || cta;

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const handleEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const renderBtn = (btn, variant) => {
    if (!btn) return null;
    const isLogin = btn.action === 'login' || btn.href === '/login';
    const isRegister = btn.action === 'register' || btn.href === '/register';
    if (isLogin) {
      return (
        <Button variant={variant} size="sm" className="navbar__action-btn" onClick={() => { closeMenu(); openAuthModal('login'); }}>
          {btn.label}
        </Button>
      );
    }
    if (isRegister) {
      return (
        <Button variant={variant} size="sm" className="navbar__action-btn" onClick={() => { closeMenu(); openAuthModal('register'); }}>
          {btn.label}
        </Button>
      );
    }
    if (btn.onClick) {
      return (
        <Button variant={variant} size="sm" className="navbar__action-btn" onClick={() => { closeMenu(); btn.onClick(); }}>
          {btn.label}
        </Button>
      );
    }
    return (
      <Button href={btn.href} variant={variant} size="sm" className="navbar__action-btn">
        {btn.label}
      </Button>
    );
  };

  const renderNavItem = (item) => {
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
            onClick={closeMenu}
          >
            {item.label}
          </a>
        ) : (
          <Link href={item.href} className={`navbar__link ${isActive ? 'navbar__link--active' : ''}`} onClick={closeMenu}>
            {item.label}
          </Link>
        )}
      </li>
    );
  };

  return (
    <nav className={`navbar${menuOpen ? ' navbar--menu-open' : ''}`}>
      <div className="navbar__inner">
        <Link href="/" className="navbar__logo" onClick={closeMenu}>
          <img src="/icon.svg" alt="" className="navbar__logo-mark" width={26} height={26} />
          <span className="navbar__logo-text">{logo}</span>
        </Link>

        <button
          type="button"
          className="navbar__toggle"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="navbar-menu"
          aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
        >
          <span className="navbar__toggle-icon" aria-hidden>
            <span />
            <span />
            <span />
          </span>
        </button>

        <div id="navbar-menu" className="navbar__menu">
          <ul className="navbar__links">{navItems.map(renderNavItem)}</ul>
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
      </div>

      <button
        type="button"
        className="navbar__backdrop"
        aria-hidden={!menuOpen}
        tabIndex={menuOpen ? 0 : -1}
        onClick={closeMenu}
      />
    </nav>
  );
}
