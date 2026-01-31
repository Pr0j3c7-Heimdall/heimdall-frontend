import Layout from '@/components/Layout';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import { navItems, footerLinks, heroData } from '@/data/home';

export default function HomePage() {
  return (
    <Layout
      header={
        <Navbar
          navItems={navItems}
          cta={{ href: '/start', label: '시작하기' }}
        />
      }
      footer={
        <Footer
          links={footerLinks}
          copyright={`© ${new Date().getFullYear()} Heimdall. All rights reserved.`}
        />
      }
    >
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
            <Button href={heroData.primaryCta.href} variant="primary" size="lg">
              {heroData.primaryCta.label}
            </Button>
            <Button href={heroData.secondaryCta.href} variant="outline" size="lg">
              {heroData.secondaryCta.label}
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
