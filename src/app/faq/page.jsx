import Layout from '@/components/Layout';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FaqItem from '@/components/FaqItem';
import { navItems, footerLinks } from '@/data/home';
import { faqData } from '@/data/faq';

export default function FaqPage() {
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
      <section className="section">
        <div className="section__inner">
          <div className="section__header">
            <h1 className="section__title">자주 묻는 질문</h1>
            <p className="section__desc">Heimdall 이용과 관련해 자주 받는 질문을 정리했습니다.</p>
          </div>
          <div className="faq-list">
            {faqData.map((item) => (
              <FaqItem key={item.id} id={item.id} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
