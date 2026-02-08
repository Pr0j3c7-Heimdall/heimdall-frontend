'use client';

const ICONS = {
  moon: { d: 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z', filled: true },
  shield: { d: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', filled: false }
};

export default function Loader({ size = 48, variant = 'moon', className = '' }) {
  const icon = ICONS[variant] ?? ICONS.moon;

  return (
    <div className={`loader ${className}`.trim()} role="status" aria-label="로딩 중">
      <svg
        className="loader__icon"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={icon.filled ? 'currentColor' : 'none'}
        stroke={icon.filled ? 'none' : 'currentColor'}
        strokeWidth={icon.filled ? 0 : 2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d={icon.d} />
      </svg>
      <span className="visually-hidden">로딩 중</span>
    </div>
  );
}
