import Layout from '@/components/layout/Layout';
import NavbarWithAuth from '@/components/layout/Navbar/NavbarWithAuth';
import Footer from '@/components/layout/Footer';
import { AudioVerifyContent } from '@/components/verify/AudioVerify';
import { navItems, footerLinks } from '@/data/home';

export default function AudioVerifyPage() {
  return (
    <Layout
      header={
        <NavbarWithAuth navItems={navItems} />
      }
      footer={<Footer links={footerLinks} />}
    >
      <AudioVerifyContent />
    </Layout>
  );
}
