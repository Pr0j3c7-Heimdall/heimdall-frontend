'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import ImageVerifyResult from '@/components/verify/ImageVerify/ImageVerifyResult';
import { getDetectionResult, mapDetectionResultToUI } from '@/api/imageDetection';

export default function HistoryImageDetailPage() {
  const params = useParams();
  const id = params?.id ? Number(params.id) : null;
  const [resultData, setResultData] = useState(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    getDetectionResult(id)
      .then((res) => {
        if (cancelled) return;
        if (res?.success && res?.data) {
          const mapped = mapDetectionResultToUI(res.data);
          setResultData(mapped || null);
        } else {
          setError('결과를 불러오지 못했습니다.');
        }
      })
      .catch((err) => {
        if (!cancelled) {
          const status = err?.response?.status;
          setError(status === 404 ? '해당 검증 내역을 찾을 수 없습니다.' : err?.response?.data?.detail ?? err?.message ?? '검증 결과를 불러오지 못했습니다.');
          setResultData(null);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [id]);

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
