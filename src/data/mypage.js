/** 마이페이지 목데이터 - API 연동 시 교체 */

export const snbItems = [{ href: '/mypage/profile', label: '회원정보', icon: 'profile' }];

export const profileMock = {
  name: '홍길동',
  email: 'user@example.com',
  createdAt: '2024-01-15'
};

export const overviewMock = {
  totalVerifications: 42,
  imageCount: 28,
  audioCount: 14,
  recentActivity: [
    { type: 'image', fileName: 'sample.jpg', result: '자연', date: '2025-01-24' },
    { type: 'audio', fileName: 'voice.mp3', result: 'AI합성', date: '2025-01-23' }
  ]
};

export const historyMock = [
  { id: '1', type: 'audio', fileName: 'interview.mp3', result: 'AI합성', confidence: 87, date: '2025-01-24 14:32' },
  { id: '2', type: 'image', fileName: 'photo.jpg', result: '자연', confidence: 92, date: '2025-01-24 10:15' },
  { id: '3', type: 'audio', fileName: 'podcast.wav', result: '자연', confidence: 95, date: '2025-01-23 18:20' },
  { id: '4', type: 'image', fileName: 'art.png', result: 'AI생성', confidence: 78, date: '2025-01-23 09:00' },
  { id: '5', type: 'audio', fileName: 'tts_sample.m4a', result: 'AI합성', confidence: 91, date: '2025-01-22 16:45' },
  { id: '6', type: 'image', fileName: 'profile.jpg', result: '자연', confidence: 89, date: '2025-01-22 11:30' },
  { id: '7', type: 'image', fileName: 'banner.webp', result: 'AI생성', confidence: 82, date: '2025-01-21 15:00' },
  { id: '8', type: 'audio', fileName: 'voice_clone.mp3', result: 'AI합성', confidence: 88, date: '2025-01-21 10:20' },
  { id: '9', type: 'image', fileName: 'screenshot.png', result: '자연', confidence: 94, date: '2025-01-20 14:10' },
  { id: '10', type: 'audio', fileName: 'recording.wav', result: '자연', confidence: 93, date: '2025-01-20 09:00' }
];
