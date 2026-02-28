'use client';

import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import Button from '@/components/ui/Button';
import AudioVerifyResult from '@/components/mypage/AudioVerifyResult';
import { getHistoryDetail } from '@/data/mypage';

export default function HistoryAudioDetailPage() {
  const params = useParams();
  const id = params?.id;

  const resultData = useMemo(() => {
    if (!id) return null;
    return getHistoryDetail('audio', id);
  }, [id]);

  if (!id || !resultData) {
    return (
      <div className="mypage-section">
        <p className="mypage-section__desc">해당 검증 내역을 찾을 수 없습니다.</p>
        <Button href="/mypage/history/audio" variant="outline" size="md">
          목록으로
        </Button>
      </div>
    );
  }

  return (
    <AudioVerifyResult
      resultData={resultData}
      backHref="/mypage/history/audio"
    />
  );
}
