'use client';

import { Icons } from '@/components/icons';
import { profileMock } from '@/data/mypage';

const profileFields = [
  { key: 'name', label: '이름', icon: 'user' },
  { key: 'email', label: '이메일', icon: 'mail' },
  { key: 'createdAt', label: '가입일', icon: 'calendar' }
];

export default function MypageProfilePage() {
  const data = profileMock;

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
    </div>
  );
}
