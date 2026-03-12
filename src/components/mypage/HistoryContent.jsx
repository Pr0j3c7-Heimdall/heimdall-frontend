'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { historyMock } from '@/data/mypage';
import { getImageHistory } from '@/api/imageDetection';

function mapImageHistoryToItems(apiData) {
  // API 응답 형태:
  // { total_count, total_pages, current_page, histories: [ { history_id, image_id, filename, file_type, analysis_status, is_ai, ai_probability, created_at } ] }
  const raw = Array.isArray(apiData) ? apiData : apiData?.histories ?? apiData?.items ?? [];

  const toPercent = (value) => {
    if (value == null) return 0;
    const num = Number(value);
    if (Number.isNaN(num)) return 0;
    return num <= 1 ? Math.round(num * 100) : Math.round(num);
  };

  const formatDateTime = (value) => {
    if (!value) return '-';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    return `${y}-${m}-${day} ${hh}:${mm}`;
  };

  const toResultLabel = (val) => {
    if (val === 'AI' || val === 'AI생성' || val === true) return 'AI';
    if (val === 'Real' || val === '자연' || val === false) return 'Real';
    return val ?? '-';
  };

  return raw.map((item) => {
    const rawResult =
      item.result ??
      (item.is_ai != null ? item.is_ai : item.final_is_ai != null ? item.final_is_ai : null);
    return {
      id: String(item.image_id ?? item.history_id ?? item.id ?? ''),
      type: item.file_type ?? 'image',
      fileName: item.filename ?? item.file_name ?? item.fileName ?? item.original_filename ?? '-',
      result: toResultLabel(rawResult),
      confidence: toPercent(item.ai_probability ?? item.confidence ?? item.final_ai_probability ?? 0),
      date: formatDateTime(item.created_at ?? item.completed_at ?? item.date)
    };
  });
}

export default function HistoryContent({ type }) {
  const router = useRouter();
  const [imageItems, setImageItems] = useState([]);
  const [imageLoading, setImageLoading] = useState(type === 'image');
  const [imageError, setImageError] = useState(null);

  const mockItems = useMemo(() => historyMock.filter((i) => i.type === type), [type]);
  const items = type === 'image' ? imageItems : mockItems;
  const loading = type === 'image' ? imageLoading : false;
  const error = type === 'image' ? imageError : null;

  useEffect(() => {
    if (type !== 'image') return;
    let cancelled = false;
    setImageLoading(true);
    setImageError(null);
    getImageHistory()
      .then((res) => {
        if (cancelled) return;
        if (res?.success !== false && res?.data != null) {
          setImageItems(mapImageHistoryToItems(res.data ?? res));
        } else {
          setImageItems([]);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setImageError(err?.response?.data?.detail ?? err?.message ?? '목록을 불러오지 못했습니다.');
          setImageItems([]);
        }
      })
      .finally(() => {
        if (!cancelled) setImageLoading(false);
      });
    return () => { cancelled = true; };
  }, [type]);

  const title = type === 'image' ? '이미지 검증 내역' : '음성 검증 내역';
  const verifyHref = type === 'image' ? '/verify/image' : '/verify/audio';
  const verifyLabel = type === 'image' ? '이미지 검사하기' : '음성 검사하기';
  const detailBase = type === 'image' ? '/mypage/history/image' : '/mypage/history/videos';

  const handleRowClick = (id) => {
    router.push(`${detailBase}/${id}`);
  };

  return (
    <div className="mypage-section">
      <h1 className="mypage-section__title">{title}</h1>
      <p className="mypage-section__desc">
        {type === 'image' ? '이미지' : '음성'} AI 검증 결과 목록입니다.
      </p>

      {loading ? (
        <div className="history-empty">
          <p className="history-empty__text">목록을 불러오는 중입니다.</p>
        </div>
      ) : error ? (
        <div className="history-empty">
          <p className="history-empty__text history-empty__text--error">{error}</p>
          <div className="history-empty__actions">
            <Button href={verifyHref} variant="primary" size="sm">
              {verifyLabel}
            </Button>
          </div>
        </div>
      ) : items.length === 0 ? (
        <div className="history-empty" role="status" aria-label="검증 내역 없음">
          <p className="history-empty__title">검증 내역이 없습니다</p>
          <p className="history-empty__desc">
            {type === 'image'
              ? (
                  <>
                    아직 검사한 내역이 없어요.
                    <br />
                    이미지를 업로드해 첫 검사를 시작해 보세요.
                  </>
                )
              : (
                  <>
                    아직 검사한 내역이 없어요.
                    <br />
                    음성 파일을 업로드해 첫 검사를 시작해 보세요.
                  </>
                )}
          </p>
          <Button href={verifyHref} variant="primary" size="lg" className="history-empty__cta">
            {verifyLabel}
          </Button>
        </div>
      ) : (
        <div className="history-table-wrap">
          <table className="history-table">
            <thead>
              <tr>
                <th className="history-table__th history-table__th--no">No</th>
                <th className="history-table__th">파일명</th>
                <th className="history-table__th">결과</th>
                <th className="history-table__th">AI일 확률</th>
                <th className="history-table__th">날짜</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr
                  key={item.id}
                  className="history-table__row history-table__row--clickable"
                  onClick={() => handleRowClick(item.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleRowClick(item.id);
                    }
                  }}
                >
                  <td className="history-table__td history-table__td--no">{index + 1}</td>
                  <td className="history-table__td history-table__td--name">{item.fileName}</td>
                  <td className="history-table__td">
                    <span className={`history-table__result history-table__result--${item.result.replace(/\s/g, '')}`}>
                      {item.result}
                    </span>
                  </td>
                  <td className="history-table__td">{item.confidence}%</td>
                  <td className="history-table__td history-table__td--date">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
