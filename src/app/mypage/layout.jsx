'use client';

import Layout from '@/components/layout/Layout';
import NavbarWithAuth from '@/components/layout/Navbar/NavbarWithAuth';
import Footer from '@/components/layout/Footer';
import MypageSnb from '@/components/mypage/MypageSnb';
import { navItems, footerLinks } from '@/data/home';

export default function MypageLayout({ children }) {
  return (
    <Layout mainClassName="layout__main--mypage" header={<NavbarWithAuth navItems={navItems} />} footer={<Footer links={footerLinks} />}>
      <div className="mypage">
        <MypageSnb />
        <main className="mypage-content">{children}</main>
      </div>
    </Layout>
  );
}
