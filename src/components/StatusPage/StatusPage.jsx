'use client';

import Layout from '@/components/layout/Layout';
import NavbarWithAuth from '@/components/layout/Navbar/NavbarWithAuth';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
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
    <Layout header={<NavbarWithAuth navItems={navItems} />} footer={<Footer links={footerLinks} />}>
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
