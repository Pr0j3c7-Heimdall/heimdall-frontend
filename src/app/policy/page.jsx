import Layout from '@/components/layout/Layout';
import NavbarWithAuth from '@/components/layout/Navbar/NavbarWithAuth';
import Footer from '@/components/layout/Footer';
import PolicyContent from '@/components/policy/PolicyContent';
import { navItems, footerLinks } from '@/data/home';
import { privacyMeta, privacySections } from '@/data/privacyPolicy';
import { termsMeta, termsSections } from '@/data/termsOfService';

export const metadata = {
  title: '정책 | Heimdall',
  description: 'Heimdall 개인정보처리방침 및 이용약관입니다.'
};

export default function PolicyPage() {
  return (
    <Layout header={<NavbarWithAuth navItems={navItems} />} footer={<Footer links={footerLinks} />}>
      <main className="policy-page">
        <section id="privacy" className="policy-page__section">
          <div className="section__inner">
            <PolicyContent sections={privacySections} meta={privacyMeta} showFooter={false} />
          </div>
        </section>
        <section id="terms" className="policy-page__section policy-page__section--alt">
          <div className="section__inner">
            <PolicyContent sections={termsSections} meta={termsMeta} showFooter={false} />
          </div>
        </section>
        <footer className="policy-page__meta">
          <div className="section__inner">
            <ul className="policy__meta">
              <li><strong>적용 대상</strong> {privacyMeta.applyTarget}</li>
              <li><strong>시행일</strong> {privacyMeta.effectiveDate}</li>
              <li><strong>최종 업데이트</strong> {privacyMeta.lastUpdated}</li>
            </ul>
          </div>
        </footer>
      </main>
    </Layout>
  );
}
