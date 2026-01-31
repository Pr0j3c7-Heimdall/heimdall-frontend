export const navItems = [
  { href: '/verify/image', label: '이미지' },
  { href: '/verify/audio', label: '음성' },
  { href: '/verify/document', label: '문서' }
];

export const footerLinks = [
  { href: '/privacy', label: '개인정보처리방침' },
  { href: '/terms', label: '이용약관' }
];

export const heroData = {
  badge: 'AI 콘텐츠 검증',
  title: '이미지, 음성, 문서.\nAI 생성 여부를 검사하세요',
  description: 'AI가 생성한 콘텐츠가 일상에 넘쳐나는 시대. Heimdall로 신뢰할 수 있는 검증 결과를 확인하세요.',
  ctas: [
    { href: '/#showcase', label: '검사하기', variant: 'primary' },
    { href: 'https://github.com/heimdall', label: 'GitHub', variant: 'outline' }
  ]
};

export const introData = {
  title: 'Heimdall이란?',
  description:
    'Heimdall은 이미지, 음성, 문서의 AI 생성 여부를 판별하는 검증 서비스입니다. 딥러닝 기반 모델로 신뢰할 수 있는 결과를 제공하며, API와 웹 인터페이스를 통해 쉽게 활용할 수 있습니다.',
  points: ['이미지: JPEG, PNG 등 주요 포맷 지원', '음성: MP3, WAV 등 오디오 파일 분석', '문서: PDF, TXT 등 텍스트 기반 문서 검증']
};

export const showcaseData = [
  {
    id: 'image',
    title: '이미지 검사',
    description:
      '업로드한 이미지가 AI로 생성되었는지, 실제 촬영된 것인지 판별합니다. 딥페이크 탐지, 생성 모델 식별, 메타데이터 분석을 통해 신뢰할 수 있는 결과를 제공합니다.',
    reverse: false,
    href: '/verify/image'
  },
  {
    id: 'audio',
    title: '음성 검사',
    description:
      '음성 파일의 AI 합성 여부를 분석합니다. TTS, 보이스 클로닝으로 생성된 음성과 실제 녹음을 구분하여 음성 인증·콘텐츠 검증에 활용할 수 있습니다.',
    reverse: true,
    href: '/verify/audio'
  },
  {
    id: 'document',
    title: '문서 검사',
    description:
      '텍스트 기반 문서가 AI에 의해 작성되었는지 검증합니다. ChatGPT, Claude 등 LLM 생성 텍스트를 식별하여 학술·비즈니스 문서의 신뢰성을 확인합니다.',
    reverse: false,
    href: '/verify/document'
  }
];

export const analysisData = {
  title: '탐지 & 분석 메커니즘',
  description: '다양한 분석 기법을 통해 이미지, 음성, 문서의 AI 생성 여부를 신뢰성 있게 판별합니다.',
  items: [
    { id: 'deepfake', icon: 'image', title: '딥페이크 탐지', description: '합성·조작된 이미지를 식별하고 실제 촬영 여부를 판단합니다.' },
    {
      id: 'generation',
      icon: 'layers',
      title: '생성 모델 식별',
      description: 'DALL·E, Midjourney, Stable Diffusion 등 생성 모델 출처를 추정합니다.'
    },
    {
      id: 'metadata',
      icon: 'info',
      title: '메타데이터 분석',
      description: 'EXIF, 소프트웨어 정보 등으로 후처리 및 생성 도구 흔적을 탐지합니다.'
    },
    {
      id: 'voice-synth',
      icon: 'mic',
      title: '음성 합성 탐지',
      description: 'TTS, 보이스 클로닝 등 AI가 생성한 음성을 실시간으로 구분합니다.'
    },
    { id: 'document', icon: 'document', title: '문서 위변조 탐지', description: 'PDF·텍스트의 AI 작성 여부와 편집 이력을 분석합니다.' },
    { id: 'llm', icon: 'message', title: 'LLM 생성 텍스트', description: 'ChatGPT, Claude 등 LLM이 작성한 텍스트를 식별합니다.' }
  ]
};

export const featuresData = {
  title: 'Heimdall의 핵심 기능',
  description: '실시간 검사와 다양한 포맷 지원으로 효율적인 콘텐츠 검증을 제공합니다.',
  items: [
    { id: 'realtime', icon: 'clock', title: '실시간 검사', description: '업로드 즉시 분석이 시작되어 빠른 결과를 확인할 수 있습니다.' },
    { id: 'multiformat', icon: 'grid', title: '멀티포맷 지원', description: '이미지, 음성, 문서 각각에 최적화된 포맷을 지원합니다.' },
    { id: 'report', icon: 'chart', title: '상세 리포트', description: '신뢰도 점수와 분석 근거를 포함한 상세 결과를 제공합니다.' },
    { id: 'api', icon: 'plug', title: 'API 연동', description: 'REST API로 서비스·워크플로우에 쉽게 통합할 수 있습니다.' }
  ],
  formatChips: ['JPG', 'PNG', 'WebP', 'MP3', 'WAV', 'M4A', 'PDF', 'TXT']
};

export const howItWorksData = {
  title: '작동 방식',
  description: '4단계의 간단한 프로세스로 AI 생성 여부를 검증합니다.',
  steps: [
    { step: 1, title: '파일 업로드', description: '검사할 이미지, 음성, 문서를 업로드합니다.' },
    { step: 2, title: '분석 진행', description: '다중 엔진이 동시에 분석하여 정확한 판별을 수행합니다.' },
    { step: 3, title: '결과 도출', description: 'AI 생성 확률과 신뢰도를 점수로 제공합니다.' },
    { step: 4, title: '리포트 확인', description: '상세 분석 결과와 근거를 확인할 수 있습니다.' }
  ]
};

export const techStackData = {
  title: '기술 스택',
  description: '검증된 딥러닝 모델과 최신 기술로 안정적인 검증 서비스를 제공합니다.',
  categories: [
    {
      name: '이미지 분석',
      items: ['CNN/Transformer', '메타데이터 파싱', '딥페이크 탐지']
    },
    {
      name: '음성 분석',
      items: ['음성 임베딩', 'TTS 탐지', '스펙트럼 분석']
    },
    {
      name: '문서 분석',
      items: ['LLM 감지', '텍스트 임베딩', '퍼플렉시티 분석']
    },
    {
      name: '인프라',
      items: ['Next.js', 'REST API', '다중 포맷 지원']
    }
  ]
};

export const ctaData = {
  title: '지금 바로 시작하세요',
  description: 'GitHub에서 소스 코드를 확인하고, API 가이드를 통해 연동해 보세요.',
  buttons: [
    { href: 'https://github.com/heimdall', label: 'GitHub에서 보기' },
    { href: '/docs', label: '가이드' }
  ]
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
