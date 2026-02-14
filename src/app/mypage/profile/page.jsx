'use client';

import { useState } from 'react';
import { Icons } from '@/components/icons';
import Button from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { profileMock } from '@/data/mypage';

const profileFields = [
  { key: 'name', label: '이름', icon: 'user' },
  { key: 'email', label: '이메일', icon: 'mail' },
  { key: 'createdAt', label: '가입일', icon: 'calendar' }
];

export default function MypageProfilePage() {
  const data = profileMock;
  const { withdraw } = useAuth();
  const [showWithdrawConfirm, setShowWithdrawConfirm] = useState(false);

  const handleWithdraw = () => {
    withdraw();
    setShowWithdrawConfirm(false);
  };

  return (
    <div className="mypage-section">
      <h1 className="mypage-section__title">회원정보</h1>
      <p className="mypage-section__desc">등록된 회원 정보를 확인할 수 있습니다.</p>

      <ul className="profile-list">
        {profileFields.map(({ key, label, icon }) => (
          <li key={key} className="profile-list__item">
            <span className="profile-list__icon">{Icons[icon]}</span>
            <span className="profile-list__label">{label}</span>
            <span className="profile-list__value">{data[key]}</span>
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
              탈퇴 시 모든 데이터가 삭제되며 복구할 수 없습니다. 정말 탈퇴하시겠습니까?
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
