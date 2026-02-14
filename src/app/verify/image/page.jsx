import Layout from '@/components/layout/Layout';
import NavbarWithAuth from '@/components/layout/Navbar/NavbarWithAuth';
import Footer from '@/components/layout/Footer';
import { ImageVerifyContent } from '@/components/verify/ImageVerify';
import { navItems, footerLinks } from '@/data/home';

export default function ImageVerifyPage() {
  return (
    <Layout
      header={
        <NavbarWithAuth navItems={navItems} />
      }
      footer={<Footer links={footerLinks} />}
    >
      <ImageVerifyContent />
    </Layout>
  );
}
