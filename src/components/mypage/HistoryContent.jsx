'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { historyMock } from '@/data/mypage';

export default function HistoryContent({ type }) {
  const router = useRouter();
  const items = useMemo(() => historyMock.filter((i) => i.type === type), [type]);

  const title = type === 'image' ? '이미지 검증 내역' : '음성 검증 내역';
  const verifyHref = type === 'image' ? '/verify/image' : '/verify/audio';
  const verifyLabel = type === 'image' ? '이미지 검사하기' : '음성 검사하기';
  const detailBase = type === 'image' ? '/mypage/history/image' : '/mypage/history/audio';

  const handleRowClick = (id) => {
    router.push(`${detailBase}/${id}`);
  };

  return (
    <div className="mypage-section">
      <h1 className="mypage-section__title">{title}</h1>
      <p className="mypage-section__desc">
        {type === 'image' ? '이미지' : '음성'} AI 검증 결과 목록입니다.
      </p>

      {items.length === 0 ? (
        <div className="history-empty">
          <p className="history-empty__text">검증 내역이 없습니다.</p>
          <div className="history-empty__actions">
            <Button href={verifyHref} variant="primary" size="sm">
              {verifyLabel}
            </Button>
          </div>
        </div>
      ) : (
        <div className="history-table-wrap">
          <table className="history-table">
            <thead>
              <tr>
                <th className="history-table__th history-table__th--no">No</th>
                <th className="history-table__th">파일명</th>
                <th className="history-table__th">결과</th>
                <th className="history-table__th">신뢰도</th>
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
