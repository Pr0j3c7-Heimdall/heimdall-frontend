'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icons } from '@/components/icons';
import { snbItems } from '@/data/mypage';

function SnbIcon({ icon }) {
  return (
    <span className="mypage-snb__icon" aria-hidden>
      {Icons[icon]}
    </span>
  );
}

function isActivePath(pathname, href) {
  return pathname === href || (href !== '/mypage' && pathname.startsWith(href));
}

export default function MypageSnb() {
  const pathname = usePathname();

  return (
    <aside className="mypage-snb">
      <nav className="mypage-snb__nav" aria-label="마이페이지 메뉴">
        {snbItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`mypage-snb__link ${isActivePath(pathname, item.href) ? 'mypage-snb__link--active' : ''}`}
          >
            <SnbIcon icon={item.icon} />
            <span className="mypage-snb__label">{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
