'use client';

import { useEffect, useState } from 'react';
import { parseApiError } from '@/lib/parseApiError';

/**
 * 마이페이지 검증 내역 상세 — 결과 fetch + 매핑 공통 훅
 * @param {number | null} id
 * @param {{ fetchResult: (id: number) => Promise<{ success?: boolean, data?: object }>, mapResult: (data: object) => object | null }} options
 */
export function useHistoryDetail(id, { fetchResult, mapResult }) {
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

    fetchResult(id)
      .then((res) => {
        if (cancelled) return;
        if (res?.success && res?.data) {
          setResultData(mapResult(res.data) || null);
        } else {
          setError('결과를 불러오지 못했습니다.');
        }
      })
      .catch((err) => {
        if (!cancelled) {
          const status = err?.response?.status;
          setError(
            status === 404 ? '해당 검증 내역을 찾을 수 없습니다.' : parseApiError(err, '검증 결과를 불러오지 못했습니다.')
          );
          setResultData(null);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id, fetchResult, mapResult]);

  return { resultData, loading, error };
}
