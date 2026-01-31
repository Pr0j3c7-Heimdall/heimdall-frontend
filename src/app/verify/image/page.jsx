import Layout from '@/components/Layout';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { navItems, footerLinks } from '@/data/home';

export default function ImageVerifyPage() {
  return (
    <Layout
      header={
        <Navbar
          navItems={navItems}
          secondaryBtn={{ href: '/login', label: '로그인' }}
          primaryBtn={{ href: '/register', label: '회원가입' }}
        />
      }
      footer={<Footer links={footerLinks} />}
    >
      <main className="container" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <p>이미지 검사 페이지</p>
      </main>
    </Layout>
  );
}
