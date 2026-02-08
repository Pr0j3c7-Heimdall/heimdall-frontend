'use client';

import Link from 'next/link';

const VARIANTS = {
  default: 'badge--default',
  primary: 'badge--primary',
  outline: 'badge--outline'
};

const SIZES = {
  sm: 'badge--sm',
  md: 'badge--md'
};

export default function Badge({ children, variant = 'default', size = 'md', href, className = '', ...props }) {
  const baseClass = 'badge';
  const variantClass = VARIANTS[variant] || VARIANTS.default;
  const sizeClass = SIZES[size] || SIZES.md;
  const classNames = [baseClass, variantClass, sizeClass, className].filter(Boolean).join(' ');

  if (href) {
    return (
      <Link href={href} className={classNames} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <span className={classNames} {...props}>
      {children}
    </span>
  );
}
