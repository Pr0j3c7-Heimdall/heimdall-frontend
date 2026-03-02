import Layout from '@/components/layout/Layout';
import NavbarWithAuth from '@/components/layout/Navbar/NavbarWithAuth';
import Footer from '@/components/layout/Footer';
import GuideSnb from '@/components/guide/GuideSnb';
import { ImageVerifyGuide } from '@/components/verify/ImageVerify';
import { navItems, footerLinks } from '@/data/home';

export default function GuidePage() {
  return (
    <Layout header={<NavbarWithAuth navItems={navItems} />} footer={<Footer links={footerLinks} />}>
      <section id="verify-guides" className="home-verify-guides">
        <div className="guide-page-body">
          <GuideSnb />
          <div className="guide-page-content home-verify-block home-verify-block--image">
            <ImageVerifyGuide />
          </div>
        </div>
      </section>
    </Layout>
  );
}
