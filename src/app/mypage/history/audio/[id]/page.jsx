'use client';

import { useParams } from 'next/navigation';
import Button from '@/components/ui/Button';
import AudioVerifyResult from '@/components/verify/AudioVerify/AudioVerifyResult';
import { getAudioDetectionResult, mapAudioDetectionResultToUI } from '@/api/audioDetection';
import { useHistoryDetail } from '@/hooks/useHistoryDetail';

export default function HistoryAudioDetailPage() {
  const params = useParams();
  const id = params?.id ? Number(params.id) : null;
  const { resultData, loading, error } = useHistoryDetail(id, {
    fetchResult: getAudioDetectionResult,
    mapResult: mapAudioDetectionResultToUI
  });

  if (!id) {
    return (
      <div className="mypage-section">
        <p className="mypage-section__desc">검증 내역 ID가 없습니다.</p>
        <Button href="/mypage/history/audio" variant="outline" size="md">
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
        <Button href="/mypage/history/audio" variant="outline" size="md">
          목록으로
        </Button>
      </div>
    );
  }

  return <AudioVerifyResult resultData={resultData} backHref="/mypage/history/audio" />;
}
