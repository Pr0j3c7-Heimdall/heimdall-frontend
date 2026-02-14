import Layout from '@/components/layout/Layout';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { AudioVerifyContent } from '@/components/verify/AudioVerify';
import { navItems, footerLinks } from '@/data/home';

export default function AudioVerifyPage() {
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
      <AudioVerifyContent />
    </Layout>
  );
}
