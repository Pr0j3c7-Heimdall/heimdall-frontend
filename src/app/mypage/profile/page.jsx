'use client';

import { useState, useEffect } from 'react';
import { Icons } from '@/components/icons';
import Button from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { getMeApi } from '@/lib/auth';

const profileFields = [
  { key: 'name', label: '이름', icon: 'user' },
  { key: 'email', label: '이메일', icon: 'mail' },
  { key: 'createdAt', label: '가입일', icon: 'calendar' }
];

export default function MypageProfilePage() {
  const { withdraw } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getMeApi();
        if (!isMounted) return;
        if (res?.success && res?.data) {
          const user = res.data;
          setData({
            name: user.name ?? '-',
            email: user.email ?? '-',
            createdAt: user.createdAt ?? user.created_at ?? '-'
          });
        } else {
          setData({ name: '-', email: '-', createdAt: '-' });
        }
      } catch (err) {
        if (!isMounted) return;
        const detail = err?.response?.data?.detail;
        const msg = Array.isArray(detail) ? detail[0]?.msg : detail;
        setError(msg || err?.message || '회원정보를 불러오지 못했습니다.');
        setData(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchProfile();
    return () => {
      isMounted = false;
    };
  }, []);
  const [showWithdrawConfirm, setShowWithdrawConfirm] = useState(false);

  const handleWithdraw = () => {
    withdraw();
    setShowWithdrawConfirm(false);
  };

  if (loading) {
    return (
      <div className="mypage-section">
        <h1 className="mypage-section__title">회원정보</h1>
        <p className="mypage-section__desc">등록된 회원 정보를 확인할 수 있습니다.</p>
        <p className="profile-loading">불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mypage-section">
        <h1 className="mypage-section__title">회원정보</h1>
        <p className="mypage-section__desc">등록된 회원 정보를 확인할 수 있습니다.</p>
        <p className="profile-error">{error}</p>
      </div>
    );
  }

  return (
    <div className="mypage-section">
      <h1 className="mypage-section__title">회원정보</h1>
      <p className="mypage-section__desc">등록된 회원 정보를 확인할 수 있습니다.</p>

      <ul className="profile-list">
        {profileFields.map(({ key, label, icon }) => (
          <li key={key} className="profile-list__item">
            <span className="profile-list__icon">{Icons[icon]}</span>
            <span className="profile-list__label">{label}</span>
            <span className="profile-list__value">{data?.[key] ?? '-'}</span>
          </li>
        ))}
      </ul>

      <p className="profile-withdraw">
        계정을 삭제하시려면{' '}
        <button type="button" className="profile-withdraw__link" onClick={() => setShowWithdrawConfirm(true)}>
          회원탈퇴
        </button>
        를 눌러주세요.
      </p>

      {showWithdrawConfirm && (
        <div className="modal-overlay" onClick={() => setShowWithdrawConfirm(false)} role="presentation">
          <div
            className="modal modal--sm"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="withdraw-modal-title"
          >
            <h2 id="withdraw-modal-title" className="modal__title">
              회원탈퇴
            </h2>
            <p className="modal__desc">
              회원 탈퇴 시 모든 데이터가 삭제됩니다.
              <br />
              복구할 수 없으며, 진행하시겠습니까?
            </p>
            <div className="modal__actions">
              <Button variant="outline" size="sm" onClick={() => setShowWithdrawConfirm(false)}>
                취소
              </Button>
              <Button variant="primary" size="sm" className="btn--danger" onClick={handleWithdraw}>
                탈퇴하기
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
