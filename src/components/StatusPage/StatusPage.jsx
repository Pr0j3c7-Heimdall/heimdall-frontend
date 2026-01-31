'use client';

import Layout from '@/components/Layout';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { navItems, footerLinks } from '@/data/home';

function ActionButton({ action, variant }) {
  if (!action) return null;

  const commonProps = { variant, size: 'lg', children: action.label };

  return action.href != null ? (
    <Button href={action.href} {...commonProps} />
  ) : (
    <Button type="button" onClick={action.onClick} {...commonProps} />
  );
}

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
            <ActionButton action={primaryAction} variant="primary" />
            <ActionButton action={secondaryAction} variant="outline" />
          </div>
        </div>
      </div>
    </Layout>
  );
}
