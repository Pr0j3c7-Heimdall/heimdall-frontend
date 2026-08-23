'use client';

import { useParams } from 'next/navigation';
import Button from '@/components/ui/Button';
import ImageVerifyResult from '@/components/verify/ImageVerify/ImageVerifyResult';
import { getImageDetectionResult, mapDetectionResultToUI } from '@/api/imageDetection';
import { useHistoryDetail } from '@/hooks/useHistoryDetail';

export default function HistoryImageDetailPage() {
  const params = useParams();
  const id = params?.id ? Number(params.id) : null;
  const { resultData, loading, error } = useHistoryDetail(id, {
    fetchResult: getImageDetectionResult,
    mapResult: mapDetectionResultToUI
  });

  if (!id) {
    return (
      <div className="mypage-section">
        <p className="mypage-section__desc">검증 내역 ID가 없습니다.</p>
        <Button href="/mypage/history/image" variant="outline" size="md">
          목록으로
        </Button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="mypage-section">
        <p className="mypage-section__desc">결과를 불러오는 중입니다.</p>
      </div>
    );
  }

  if (error || !resultData) {
    return (
      <div className="mypage-section">
        <p className="mypage-section__desc">{error || '해당 검증 내역을 찾을 수 없습니다.'}</p>
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
