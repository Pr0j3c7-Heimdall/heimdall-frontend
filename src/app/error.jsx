'use client';

import { useEffect } from 'react';
import StatusPage from '@/components/StatusPage';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <StatusPage
      statusCode={500}
      title="문제가 발생했습니다"
      message="일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."
      primaryAction={{ label: '홈으로', href: '/' }}
      secondaryAction={{ label: '다시 시도', onClick: reset }}
    />
  );
}
