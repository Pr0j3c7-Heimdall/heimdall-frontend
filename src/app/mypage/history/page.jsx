'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { historyMock } from '@/data/mypage';

export default function MypageHistoryPage() {
  const [items, setItems] = useState(historyMock);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterResult, setFilterResult] = useState('all');
  const [selectedIds, setSelectedIds] = useState(new Set());

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchSearch = !search || item.fileName.toLowerCase().includes(search.toLowerCase());
      const matchType = filterType === 'all' || item.type === filterType;
      const matchResult = filterResult === 'all' || item.result === filterResult;
      return matchSearch && matchType && matchResult;
    });
  }, [items, search, filterType, filterResult]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(new Set(filteredItems.map((i) => i.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleSelectOne = (id) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const handleDelete = () => {
    if (selectedIds.size === 0) return;
    setItems((prev) => prev.filter((i) => !selectedIds.has(i.id)));
    setSelectedIds(new Set());
  };

  const allSelected = filteredItems.length > 0 && selectedIds.size === filteredItems.length;

  return (
    <div className="mypage-section">
      <h1 className="mypage-section__title">검증 내역</h1>
      <p className="mypage-section__desc">
        AI 검증한 결과 목록입니다. 검색·필터·삭제가 가능합니다.
      </p>

      {items.length === 0 ? (
        <div className="history-empty">
          <p className="history-empty__text">검증 내역이 없습니다.</p>
          <div className="history-empty__actions">
            <Button href="/verify/image" variant="primary" size="sm">
              이미지 검사하기
            </Button>
            <Button href="/verify/audio" variant="outline" size="sm">
              음성 검사하기
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="history-toolbar">
            <div className="history-toolbar__search">
              <Input
                type="search"
                placeholder="파일명 검색"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="history-toolbar__input"
              />
            </div>
            <div className="history-toolbar__filters">
              <select
                className="history-toolbar__select"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">전체 타입</option>
                <option value="image">이미지</option>
                <option value="audio">음성</option>
              </select>
              <select
                className="history-toolbar__select"
                value={filterResult}
                onChange={(e) => setFilterResult(e.target.value)}
              >
                <option value="all">전체 결과</option>
                <option value="자연">자연</option>
                <option value="AI생성">AI생성</option>
                <option value="AI합성">AI합성</option>
              </select>
            </div>
            {selectedIds.size > 0 && (
              <Button variant="ghost" size="sm" onClick={handleDelete} className="history-toolbar__delete">
                선택 삭제 ({selectedIds.size})
              </Button>
            )}
          </div>

          <div className="history-table-wrap">
            <table className="history-table">
              <thead>
                <tr>
                  <th className="history-table__th history-table__th--check">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={handleSelectAll}
                      aria-label="전체 선택"
                    />
                  </th>
                  <th className="history-table__th">파일명</th>
                  <th className="history-table__th">타입</th>
                  <th className="history-table__th">결과</th>
                  <th className="history-table__th">신뢰도</th>
                  <th className="history-table__th">날짜</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="history-table__empty">
                      검색 결과가 없습니다.
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item) => (
                    <tr key={item.id} className="history-table__row">
                      <td className="history-table__td history-table__td--check">
                        <input
                          type="checkbox"
                          checked={selectedIds.has(item.id)}
                          onChange={() => handleSelectOne(item.id)}
                          aria-label={`${item.fileName} 선택`}
                        />
                      </td>
                      <td className="history-table__td history-table__td--name">{item.fileName}</td>
                      <td className="history-table__td">
                        <span className={`history-table__badge history-table__badge--${item.type}`}>
                          {item.type === 'image' ? '이미지' : '음성'}
                        </span>
                      </td>
                      <td className="history-table__td">
                        <span
                          className={`history-table__result history-table__result--${item.result.replace(/\s/g, '')}`}
                        >
                          {item.result}
                        </span>
                      </td>
                      <td className="history-table__td">{item.confidence}%</td>
                      <td className="history-table__td history-table__td--date">{item.date}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
