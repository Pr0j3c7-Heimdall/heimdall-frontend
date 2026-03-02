/** 마이페이지 목데이터 - API 연동 시 교체 */

export const snbItems = [
  { href: '/mypage/profile', label: '회원정보', icon: 'profile' },
  { href: '/mypage/history/image', label: '이미지 검증 내역', icon: 'history' },
  { href: '/mypage/history/audio', label: '음성 검증 내역', icon: 'history' }
];

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

/** 이미지 검증 내역 20개 (음성은 추후) */
export const historyMock = [
  { id: '1', type: 'image', fileName: 'photo.jpg', result: '자연', confidence: 92, date: '2025-01-24 10:15' },
  { id: '2', type: 'image', fileName: 'art.png', result: 'AI생성', confidence: 78, date: '2025-01-23 09:00' },
  { id: '3', type: 'image', fileName: 'profile.jpg', result: '자연', confidence: 89, date: '2025-01-22 11:30' },
  { id: '4', type: 'image', fileName: 'banner.png', result: 'AI생성', confidence: 82, date: '2025-01-21 15:00' },
  { id: '5', type: 'image', fileName: 'screenshot.png', result: '자연', confidence: 94, date: '2025-01-20 14:10' },
  { id: '6', type: 'image', fileName: 'landscape.jpg', result: '자연', confidence: 91, date: '2025-01-19 16:30' },
  { id: '7', type: 'image', fileName: 'avatar.png', result: 'AI생성', confidence: 85, date: '2025-01-19 11:00' },
  { id: '8', type: 'image', fileName: 'product.png', result: '자연', confidence: 88, date: '2025-01-18 14:20' },
  { id: '9', type: 'image', fileName: 'illustration.png', result: 'AI생성', confidence: 79, date: '2025-01-18 09:45' },
  { id: '10', type: 'image', fileName: 'event_photo.jpg', result: '자연', confidence: 96, date: '2025-01-17 18:00' },
  { id: '11', type: 'image', fileName: 'design_mockup.png', result: 'AI생성', confidence: 81, date: '2025-01-17 13:15' },
  { id: '12', type: 'image', fileName: 'nature.jpg', result: '자연', confidence: 93, date: '2025-01-16 10:30' },
  { id: '13', type: 'image', fileName: 'portrait_ai.png', result: 'AI생성', confidence: 76, date: '2025-01-16 08:00' },
  { id: '14', type: 'image', fileName: 'document.jpg', result: '자연', confidence: 97, date: '2025-01-15 15:40' },
  { id: '15', type: 'image', fileName: 'social_media.png', result: 'AI생성', confidence: 84, date: '2025-01-15 11:20' },
  { id: '16', type: 'image', fileName: 'thumbnail.jpg', result: '자연', confidence: 90, date: '2025-01-14 17:10' },
  { id: '17', type: 'image', fileName: 'cover_art.png', result: 'AI생성', confidence: 80, date: '2025-01-14 12:00' },
  { id: '18', type: 'image', fileName: 'vacation.jpg', result: '자연', confidence: 95, date: '2025-01-13 16:00' },
  { id: '19', type: 'image', fileName: 'ai_background.png', result: 'AI생성', confidence: 83, date: '2025-01-13 10:30' },
  { id: '20', type: 'image', fileName: 'certificate.jpg', result: '자연', confidence: 98, date: '2025-01-12 14:15' }
];

/** 히스토리 상세 분석 결과 (id별) - API 연동 시 교체 */
const createImageDetail = (item) => ({
  image: 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect fill="#e5e7eb" width="800" height="500"/><text x="400" y="250" text-anchor="middle" fill="#9ca3af" font-size="24" font-family="sans-serif">${item.fileName}</text></svg>`),
  c2pa: {
    model: item.result === 'AI생성' ? 'Midjourney' : '-',
    hashMatch: item.result === '자연',
    platform: item.result === 'AI생성' ? 'Midjourney Web' : '-',
    details: item.result === 'AI생성' ? { '디코딩 값': 'MJv6-2024-01-15', '플랫폼 정보': 'Midjourney Web' } : {}
  },
  binary: {
    result: item.result === 'AI생성' ? 'AI' : 'Real',
    confidence: item.confidence,
    methods: [
      { name: '분석 방법 1', threshold: 0.7, value: item.result === 'AI생성' ? 0.85 : 0.3, result: item.result === 'AI생성' ? 'AI' : 'Real', weight: 0.4 },
      { name: '분석 방법 2', threshold: 0.6, value: item.result === 'AI생성' ? 0.82 : 0.25, result: item.result === 'AI생성' ? 'AI' : 'Real', weight: 0.3 },
      { name: '분석 방법 3', threshold: 0.65, value: item.result === 'AI생성' ? 0.88 : 0.2, result: item.result === 'AI생성' ? 'AI' : 'Real', weight: 0.3 }
    ]
  },
  multiclass: {
    model: item.result === 'AI생성' ? 'Midjourney v6' : '-',
    confidence: item.confidence,
    methods: item.result === 'AI생성'
      ? [
          { name: '다중 분석 1', threshold: 0.75, value: 0.92, result: 'Midjourney v6', weight: 0.5 },
          { name: '다중 분석 2', threshold: 0.7, value: 0.89, result: 'Midjourney v6', weight: 0.3 },
          { name: '다중 분석 3', threshold: 0.8, value: 0.95, result: 'Midjourney v6', weight: 0.2 }
        ]
      : []
  },
  final: {
    result: item.result === 'AI생성' ? 'AI 생성 이미지' : '자연 이미지',
    model: item.result === 'AI생성' ? 'Midjourney v6' : '-',
    confidence: item.confidence
  }
});

const createAudioDetail = (item) => ({
  fileName: item.fileName,
  result: item.result,
  confidence: item.confidence,
  date: item.date,
  analysis: {
    binary: { result: item.result.includes('AI') ? 'AI' : '자연', confidence: item.confidence },
    model: item.result === 'AI합성' ? 'TTS/보이스클로닝' : '-',
    methods: [
      { name: '스펙트럼 분석', value: item.confidence, result: item.result },
      { name: '음성 임베딩', value: item.confidence - 2, result: item.result },
      { name: 'TTS 탐지', value: item.result.includes('AI') ? item.confidence + 5 : 10, result: item.result }
    ]
  },
  final: {
    result: item.result,
    model: item.result === 'AI합성' ? 'TTS/보이스클로닝' : '-',
    confidence: item.confidence
  }
});

export const getHistoryDetail = (type, id) => {
  const item = historyMock.find((i) => i.id === id && i.type === type);
  if (!item) return null;
  return type === 'image' ? createImageDetail(item) : createAudioDetail(item);
};
