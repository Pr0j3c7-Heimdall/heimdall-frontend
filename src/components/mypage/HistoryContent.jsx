'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { getImageHistory } from '@/api/imageDetection';
import { getAudioHistory } from '@/api/audioDetection';
import { parseApiError } from '@/lib/parseApiError';
import { mapHistoryToItems } from '@/lib/mapHistoryItems';
import HistoryImageThumbnail from '@/components/mypage/HistoryImageThumbnail';

const HISTORY_CONFIG = {
  image: {
    title: '이미지 검증 내역',
    desc: '이미지 AI 검증 결과 목록입니다.',
    verifyHref: '/verify/image',
    verifyLabel: '이미지 검사하기',
    detailBase: '/mypage/history/image',
    emptyDesc: (
      <>
        아직 검사한 내역이 없어요.
        <br />
        이미지를 업로드해 첫 검사를 시작해 보세요.
      </>
    ),
    fetchHistory: getImageHistory,
    idKey: 'image_id'
  },
  audio: {
    title: '음성 검증 내역',
    desc: '음성 AI 검증 결과 목록입니다.',
    verifyHref: '/verify/audio',
    verifyLabel: '음성 검사하기',
    detailBase: '/mypage/history/audio',
    emptyDesc: (
      <>
        아직 검사한 내역이 없어요.
        <br />
        음성 파일을 업로드해 첫 검사를 시작해 보세요.
      </>
    ),
    fetchHistory: getAudioHistory,
    idKey: 'audio_id'
  }
};

export default function HistoryContent({ type }) {
  const router = useRouter();
  const config = HISTORY_CONFIG[type];
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    config
      .fetchHistory()
      .then((res) => {
        if (cancelled) return;
        if (res?.success !== false && res?.data != null) {
          setItems(mapHistoryToItems(res.data ?? res, config.idKey));
        } else {
          setItems([]);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(parseApiError(err, '목록을 불러오지 못했습니다.'));
          setItems([]);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [config]);

  const handleRowClick = (id) => {
    router.push(`${config.detailBase}/${id}`);
  };

  return (
    <div className="mypage-section">
      <h1 className="mypage-section__title">{config.title}</h1>
      <p className="mypage-section__desc">{config.desc}</p>

      {loading ? (
        <div className="history-empty">
          <p className="history-empty__text">목록을 불러오는 중입니다.</p>
        </div>
      ) : error ? (
        <div className="history-empty">
          <p className="history-empty__text history-empty__text--error">{error}</p>
          <div className="history-empty__actions">
            <Button href={config.verifyHref} variant="primary" size="sm">
              {config.verifyLabel}
            </Button>
          </div>
        </div>
      ) : items.length === 0 ? (
        <div className="history-empty" role="status" aria-label="검증 내역 없음">
          <p className="history-empty__title">검증 내역이 없습니다</p>
          <p className="history-empty__desc">{config.emptyDesc}</p>
          <Button href={config.verifyHref} variant="primary" size="lg" className="history-empty__cta">
            {config.verifyLabel}
          </Button>
        </div>
      ) : (
        <>
          <div className="history-table-wrap history-table-wrap--desktop">
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
                    <td className="history-table__td history-table__td--name">
                      <div className="history-table__file">
                        {type === 'image' ? (
                          <HistoryImageThumbnail
                            src={item.thumbnailUrl}
                            alt=""
                            className="history-table__thumb"
                          />
                        ) : null}
                        <span className="history-table__filename">{item.fileName}</span>
                      </div>
                    </td>
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

          <ul className="history-cards">
            {items.map((item, index) => (
              <li key={item.id}>
                <button type="button" className="history-card" onClick={() => handleRowClick(item.id)}>
                  <div className="history-card__head">
                    <span className="history-card__no">#{index + 1}</span>
                    <span className={`history-table__result history-table__result--${item.result.replace(/\s/g, '')}`}>
                      {item.result}
                    </span>
                  </div>
                  <div className="history-card__file">
                    {type === 'image' ? (
                      <HistoryImageThumbnail
                        src={item.thumbnailUrl}
                        alt=""
                        className="history-card__thumb"
                      />
                    ) : null}
                    <p className="history-card__name">{item.fileName}</p>
                  </div>
                  <dl className="history-card__meta">
                    <div className="history-card__meta-row">
                      <dt>AI일 확률</dt>
                      <dd>{item.confidence}%</dd>
                    </div>
                    <div className="history-card__meta-row">
                      <dt>날짜</dt>
                      <dd>{item.date}</dd>
                    </div>
                  </dl>
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
