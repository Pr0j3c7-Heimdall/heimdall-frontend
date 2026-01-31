export const navItems = [
  { href: '/verify/image', label: '이미지' },
  { href: '/verify/audio', label: '음성' },
  { href: '/verify/document', label: '문서' },
];

export const footerLinks = [
  { href: '/privacy', label: '개인정보처리방침' },
  { href: '/terms', label: '이용약관' }
];

export const heroData = {
  badge: 'AI 콘텐츠 검증',
  title: '이미지, 음성, 문서.\nAI 생성 여부를 검사하세요',
  description: 'AI가 생성한 콘텐츠가 일상에 넘쳐나는 시대. Heimdall로 신뢰할 수 있는 검증 결과를 확인하세요.',
  cta: { href: '/#demo', label: '검사하기' }
};

export const introData = {
  title: 'Heimdall이란?',
  description:
    'Heimdall은 이미지, 음성, 문서의 AI 생성 여부를 판별하는 검증 서비스입니다. 딥러닝 기반 모델로 신뢰할 수 있는 결과를 제공하며, API와 웹 인터페이스를 통해 쉽게 활용할 수 있습니다.',
  points: ['이미지: JPEG, PNG 등 주요 포맷 지원', '음성: MP3, WAV 등 오디오 파일 분석', '문서: PDF, TXT 등 텍스트 기반 문서 검증']
};

export const demoData = [
  {
    id: 'image',
    title: '이미지 검사',
    description: '업로드한 이미지가 AI로 생성되었는지, 실제 촬영된 것인지 판별합니다. 딥페이크 탐지와 합성 이미지 식별을 지원합니다.',
    href: '/verify/image'
  },
  {
    id: 'audio',
    title: '음성 검사',
    description: '음성 파일의 AI 합성 여부를 분석합니다. 보이스 클로닝, TTS 생성 음성과 실제 녹음을 구분해 드립니다.',
    href: '/verify/audio'
  },
  {
    id: 'document',
    title: '문서 검사',
    description: '텍스트 기반 문서가 AI에 의해 작성되었는지 검증합니다. ChatGPT, Claude 등 LLM 생성 텍스트를 식별합니다.',
    href: '/verify/document'
  }
];

export const linksData = {
  title: '시작하기',
  items: [
    { href: 'https://github.com/heimdall', label: 'GitHub', description: '소스코드 및 예제' },
    { href: '/docs', label: '가이드', description: 'API 문서 및 사용법' }
  ]
};
