'use client';

export default function Loader({ size = 48, className = '' }) {
  return (
    <div className={`loader ${className}`.trim()} role="status" aria-label="로딩 중">
      <svg
        className="loader__icon"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
      >
        {/* 초승달 아이콘 - 동글동글 도는 로딩 */}
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
      <span className="visually-hidden">로딩 중</span>
    </div>
  );
}
