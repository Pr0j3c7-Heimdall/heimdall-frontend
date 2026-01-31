'use client';

import Layout from '@/components/Layout';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { navItems, footerLinks } from '@/data/home';

export default function StatusPage({ statusCode, title, message, primaryAction = { label: '홈으로', href: '/' }, secondaryAction }) {
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
      <div className="status-page">
        <div className="status-page__inner">
          {statusCode && <span className="status-page__code">{statusCode}</span>}
          <h1 className="status-page__title">{title}</h1>
          <p className="status-page__message">{message}</p>
          <div className="status-page__actions">
            {primaryAction.href != null ? (
              <Button href={primaryAction.href} variant="primary" size="lg">
                {primaryAction.label}
              </Button>
            ) : (
              <Button type="button" onClick={primaryAction.onClick} variant="primary" size="lg">
                {primaryAction.label}
              </Button>
            )}
            {secondaryAction &&
              (secondaryAction.href != null ? (
                <Button href={secondaryAction.href} variant="outline" size="lg">
                  {secondaryAction.label}
                </Button>
              ) : (
                <Button type="button" onClick={secondaryAction.onClick} variant="outline" size="lg">
                  {secondaryAction.label}
                </Button>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
