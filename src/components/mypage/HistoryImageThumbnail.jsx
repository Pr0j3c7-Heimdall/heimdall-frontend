'use client';

import { useState } from 'react';
import { Icons } from '@/components/icons';

export default function HistoryImageThumbnail({ src, alt = '', className = '' }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <span className={`history-thumb history-thumb--placeholder ${className}`.trim()} aria-hidden>
        {Icons.image}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`history-thumb ${className}`.trim()}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
