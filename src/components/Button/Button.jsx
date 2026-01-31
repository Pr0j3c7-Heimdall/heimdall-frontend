'use client';

import Link from 'next/link';

const VARIANTS = {
  primary: 'btn--primary',
  secondary: 'btn--secondary',
  outline: 'btn--outline',
  ghost: 'btn--ghost'
};

const SIZES = {
  sm: 'btn--sm',
  md: 'btn--md',
  lg: 'btn--lg'
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  disabled = false,
  className = '',
  type = 'button',
  ...props
}) {
  const baseClass = 'btn';
  const variantClass = VARIANTS[variant] || VARIANTS.primary;
  const sizeClass = SIZES[size] || SIZES.md;
  const classNames = [baseClass, variantClass, sizeClass, className].filter(Boolean).join(' ');

  if (href && !disabled) {
    return (
      <Link href={href} className={classNames} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classNames}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
