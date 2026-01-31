import Link from 'next/link';
import Layout from '@/components/Layout';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import { navItems, footerLinks, heroData, introData, demoData, linksData } from '@/data/home';

export default function HomePage() {
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
      {/* Hero */}
      <section className="hero">
        <div className="hero__inner">
          <Badge variant="default" className="hero__badge">
            {heroData.badge}
          </Badge>
          <h1 className="hero__title" style={{ whiteSpace: 'pre-line' }}>
            {heroData.title}
          </h1>
          <p className="hero__desc">{heroData.description}</p>
          <div className="hero__actions">
            <Button href={heroData.cta.href} variant="primary" size="lg">
              {heroData.cta.label}
            </Button>
          </div>
        </div>
      </section>

      {/* 서비스 소개 */}
      <section id="intro" className="intro section--alt">
        <div className="intro__inner">
          <h2 className="intro__title">{introData.title}</h2>
          <p className="intro__text">{introData.description}</p>
          <ul className="intro__list">
            {introData.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* 서비스 시연 */}
      <section id="demo" className="section">
        <div className="section__inner">
          <div className="section__header">
            <h2 className="section__title">서비스 시연</h2>
            <p className="section__desc">이미지, 음성, 문서 각각의 검사 방식을 확인해 보세요.</p>
          </div>
          <div className="demo-grid">
            {demoData.map((item) => (
              <div key={item.id} className="demo-card">
                <h3 className="demo-card__title">{item.title}</h3>
                <p className="demo-card__desc">{item.description}</p>
                <Button href={item.href} variant="outline" size="sm">
                  시연하기
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 깃허브 + 가이드 */}
      <section id="links" className="section section--alt">
        <div className="section__inner">
          <div className="section__header">
            <h2 className="section__title">{linksData.title}</h2>
          </div>
          <div className="links-grid">
            {linksData.items.map((item) => (
              <Link key={item.href} href={item.href} className="links-card">
                <span className="links-card__title">{item.label}</span>
                <p className="links-card__desc">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
