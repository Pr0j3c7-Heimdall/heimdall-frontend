'use client';

const VARIANTS = {
  default: 'chip--default',
  primary: 'chip--primary',
  outline: 'chip--outline'
};

const SIZES = {
  sm: 'chip--sm',
  md: 'chip--md'
};

export default function Chip({ children, variant = 'default', size = 'md', onRemove, className = '', ...props }) {
  const baseClass = 'chip';
  const variantClass = VARIANTS[variant] || VARIANTS.default;
  const sizeClass = SIZES[size] || SIZES.md;
  const classNames = [baseClass, variantClass, sizeClass, className].filter(Boolean).join(' ');

  return (
    <span className={classNames} {...props}>
      {children}
      {onRemove && (
        <button type="button" className="chip__remove" onClick={onRemove} aria-label="제거">
          ×
        </button>
      )}
    </span>
  );
}
