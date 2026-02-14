'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import NavbarWithAuth from '@/components/layout/Navbar/NavbarWithAuth';
import Footer from '@/components/layout/Footer';
import { navItems, footerLinks } from '@/data/home';
import { snbItems } from '@/data/mypage';

export default function MypageLayout({ children }) {
  const pathname = usePathname();

  return (
    <Layout
      mainClassName="layout__main--mypage"
      header={
        <NavbarWithAuth navItems={navItems} />
      }
      footer={<Footer links={footerLinks} />}
    >
      <div className="mypage">
        <aside className="mypage-snb">
          <nav className="mypage-snb__nav">
            {snbItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/mypage' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`mypage-snb__link ${isActive ? 'mypage-snb__link--active' : ''}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <main className="mypage-content">{children}</main>
      </div>
    </Layout>
  );
}
