import Layout from '@/components/layout/Layout';
import NavbarWithAuth from '@/components/layout/Navbar/NavbarWithAuth';
import Footer from '@/components/layout/Footer';
import { ImageVerifyGuide } from '@/components/verify/ImageVerify';
import { AudioVerifyGuide } from '@/components/verify/AudioVerify';
import { navItems, footerLinks } from '@/data/home';

export default function GuidePage() {
  return (
    <Layout header={<NavbarWithAuth navItems={navItems} />} footer={<Footer links={footerLinks} />}>
      <section className="guide-page-header section section--gray">
        <div className="section__inner">
          <div className="section__header">
            <h1 className="section__title">가이드</h1>
            <p className="section__desc">
              이미지·음성 검사 방법, Heimdall 프레임워크, 지원 모델 및 업로드 가이드를 안내합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Section01 이미지 / Section02 음성 */}
      <section id="verify-guides" className="home-verify-guides">
        <div className="home-verify-block home-verify-block--image">
          <h2 className="home-verify-block__title">이미지</h2>
          <ImageVerifyGuide />
        </div>
        <div className="home-verify-block home-verify-block--audio">
          <h2 className="home-verify-block__title">음성</h2>
          <AudioVerifyGuide />
        </div>
      </section>
    </Layout>
  );
}
