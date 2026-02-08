import Layout from '@/components/Layout';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AudioVerifyContent } from '@/components/AudioVerify';
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
      footer={<Footer links={footerLinks} copyright={`© ${new Date().getFullYear()} Heimdall. All rights reserved.`} />}
    >
      <AudioVerifyContent />
    </Layout>
  );
}
