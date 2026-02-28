'use client';

import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import Button from '@/components/ui/Button';
import ImageVerifyResult from '@/components/verify/ImageVerify/ImageVerifyResult';
import { getHistoryDetail } from '@/data/mypage';

export default function HistoryImageDetailPage() {
  const params = useParams();
  const id = params?.id;

  const resultData = useMemo(() => {
    if (!id) return null;
    return getHistoryDetail('image', id);
  }, [id]);

  if (!id || !resultData) {
    return (
      <div className="mypage-section">
        <p className="mypage-section__desc">해당 검증 내역을 찾을 수 없습니다.</p>
        <Button href="/mypage/history/image" variant="outline" size="md">
          목록으로
        </Button>
      </div>
    );
  }

  return (
    <ImageVerifyResult
      resultData={resultData}
      backHref="/mypage/history/image"
      backLabel="목록으로"
    />
  );
}
