export const navItems = [
  { href: '/verify/image', label: '이미지' },
  { href: '/verify/audio', label: '음성' },
  { href: '/docs', label: '가이드' },
  { href: '/policy', label: '정책' },
  { href: 'https://github.com/Pr0j3c7-Heimdall', label: '깃허브', external: true },
  { href: 'https://wooro.skhu.ac.kr/wooro/index.do', label: '후원', external: true }
];

export const footerLinks = [
  { href: '/policy#privacy', label: '개인정보처리방침' },
  { href: '/policy#terms', label: '이용약관' }
];

export const heroData = {
  badge: 'AI 콘텐츠 검증',
  titleLine1: 'AI 생성 콘텐츠 시대',
  titleLine2: 'AI로 인한 피해를 사전에 방지하세요',
  descriptionLine1: '북유럽 신화 속 아스가르드의 수문장 Heimdall처럼,',
  descriptionLine2: '신뢰도 높은 Heimdall 서비스를 통해 AI 생성 여부를 꿰뚫어보세요.',
  ctas: [
    { href: '/#showcase', label: '검사하기', variant: 'primary' },
    { href: 'https://github.com/Pr0j3c7-Heimdall', label: 'GitHub', variant: 'outline' }
  ]
};

export const introData = {
  title: 'Heimdall이란?',
  description:
    'Heimdall은 이미지, 음성의 AI 생성 여부를 판별하고, 부가적인 정보들을 제공하는 검증 서비스입니다.\n다수의 딥러닝 기반 모델 및 C2PA로 개발된, Heimdall의 독자적인 프레임워크를 통해 결과를 제공하며, 웹 서비스를 통해 쉽게 활용할 수 있습니다.',
  description2:
    '딥러닝 기반 판별을 넘어 이미지와 음성을 다각도로 분석하여, 연구 환경은 물론 실생활에서도 활용할 수 있도록 설계했습니다. 전문적인 분석이 필요한 연구자부터 일상에서 콘텐츠의 신뢰성을 확인하고 싶은 사용자까지, 누구나 부담 없이 사용할 수 있는 범용성과 상용성을 지향합니다.',
  points: []
};

export const showcaseData = [
  {
    id: 'image',
    title: '이미지 검사',
    description:
      '업로드한 이미지가 AI로 생성되었는지, 실제 사진인지 판별합니다. 사진 변조 여부, AI 생성 모델 식별, 생성된 회사/플랫폼 분석, 메타데이터 추출을 통해 신뢰할 수 있는 종합적인 결과를 제공합니다.',
    reverse: false,
    href: '/verify/image'
    // gif: '/assets/images/showcase-image.gif'
  },
  {
    id: 'audio',
    title: '음성 검사',
    description:
      '업로드한 음성의 AI 생성 여부를 분석합니다. 음성 속 사람 목소리가 AI로 생성되었는지, 실제 목소리인지 판별합니다. 노이즈가 있는 음성, 저음질 음성, 배경음이 있는 음성, 특정 부분만 AI 음성으로 치환된 음성 등 어떠한 상태의 음성 파일이어도 판별이 가능합니다. 음성 변조 여부, 생성된 회사/플랫폼 분석, 메타데이터 추출을 통해 신뢰할 수 있는 종합적인 결과를 제공합니다.',
    reverse: true,
    href: '/verify/audio'
    // gif: '/assets/images/showcase-audio.gif'
  }
];

export const analysisData = {
  title: 'Heimdall 프레임워크 메커니즘',
  description: '다양한 분석 기법이 적용된 Heimdall 프레임워크를 통해 이미지, 음성의 AI 생성 여부를 신뢰성 있게 판별합니다.',
  items: [
    {
      id: 'binary',
      icon: 'image',
      title: 'AI 생성 여부 판별',
      description:
        '특징 벡터화(임베딩), DCT 기반 주파수 분석, 공간 아티팩트 분석 등 다수 분석 결과를 종합하여 AI 생성 여부를 판단합니다.'
    },
    {
      id: 'generation',
      icon: 'layers',
      title: '생성 모델 식별',
      description: 'GPT, Nanobanana, Midjourney 등 생성 모델의 특징 신호를 분석해 출처를 추정합니다.'
    },
    {
      id: 'c2pa',
      icon: 'info',
      title: 'C2PA 및 메타데이터 분석',
      description: 'C2PA로 AI 생성 여부, 생성 모델 정보, 파일 변조 여부를 검증하고, 메타데이터를 통해 추가 단서와 파일 정보를 보강합니다.'
    },
    {
      id: 'voice',
      icon: 'mic',
      title: '실전형 음성 탐지',
      description: '깨끗한 음성은 물론, 노이즈·저음질·부분 구간 AI 치환 등 다양한 실환경 조건의 음성까지 폭넓게 분석 가능합니다.'
    }
  ]
};

export const featuresData = {
  title: 'Heimdall의 핵심 기능',
  description: 'Heimdall의 핵심 기능을 통해 효율적인 콘텐츠 검증 워크플로우를 제공합니다.',
  items: [
    {
      id: 'criteria',
      icon: 'check',
      title: '엄격한 판단 기준',
      description:
        '다수의 분석 결과를 Heimdall의 가중치 기반 판정 로직으로 통합해, 일관된 기준으로 판정합니다. 이를 통해 실전 환경에서의 판정 신뢰도를 높입니다.'
    },
    {
      id: 'realtime',
      icon: 'grid',
      title: '실전형 파일 분석',
      description: '다양한 분석 기법과 파일 구조 기반 검증을 결합해, 실제 사용 환경에 최적화된 분석을 수행합니다.'
    },
    {
      id: 'report',
      icon: 'chart',
      title: '상세 리포트',
      description: '분석 지표, 판정 근거, 파일 정보, Heimdall의 해석을 포함한 근거 중심 상세 리포트를 제공합니다.'
    },
    {
      id: 'history',
      icon: 'clock',
      title: '검사 이력 저장',
      description: '사용자별 분석 결과를 저장해, 재검토·비교·사후 추적에 활용할 수 있습니다.'
    }
  ]
};

export const howItWorksData = {
  title: '작동 방식',
  description: '4단계의 분석 프로세스를 통해 AI 생성 여부를 검증합니다.',
  steps: [
    { step: 1, title: '파일 업로드', description: '검사할 이미지 또는 음성을 업로드합니다.' },
    {
      step: 2,
      title: '분석 진행',
      description: 'Heimdall 프레임워크를 통해, 다중 엔진과 복합적인 판단을 바탕으로 분석하여 정확한 판별을 수행합니다.'
    },
    {
      step: 3,
      title: '결과 도출',
      description: '최종 판단 결과와 AI 생성 확률 및 파일 정보를 도출하여 제공합니다.'
    },
    {
      step: 4,
      title: '리포트 확인',
      description: '상세 분석 결과와 판단 근거를 확인할 수 있습니다.'
    }
  ]
};

export const techStackData = {
  title: '기술 스택',
  description: 'Heimdall 프레임워크와 검증된 딥러닝 모델로 안정적인 검증 서비스를 제공합니다.',
  categories: [
    {
      name: '이미지 분석',
      items: [
        'C2PA 분석을 통한 AI 생성 여부 판정 및 C2PA 내부 값 추출',
        'DINOv3 임베딩 기반 특징 추출',
        'F3Net 기반 주파수(DCT) 아티팩트 분석',
        'U-Net 기반 공간 아티팩트 분석',
        '실제 사진 메타데이터 정보 추출',
        'Softmax 기반 앙상블 가중치로 이진 분류 결과를 결합하여 AI 생성 여부 판정',
        '다중 분석 결과(모델별 점수) 합산을 통한 AI 생성 모델 추정'
      ]
    },
    {
      name: '음성 분석',
      items: ['준비중']
    },
    {
      name: '인프라',
      items: [
        'Server: FastAPI + Uvicorn',
        'Database: MySQL (SQLAlchemy Async ORM)',
        'CI/CD: GitHub Actions (Self-hosted Runner)',
        'Deployment: Linux (Ubuntu) 기반 배포 환경',
        'AI Inference: PyTorch 기반 딥러닝 모델 파이프라인'
      ]
    },
    {
      name: '사용 언어',
      groups: [
        { label: 'BE', items: ['Python 3.10+', 'SQL (MySQL)'] },
        { label: 'FE', items: ['JavaScript (Next.js, React)'] }
      ]
    }
  ]
};

export const ctaData = {
  title: '지금 바로 검사하세요.',
  description: 'GitHub에서 관련 내용을 확인하고, 가이드를 통해 사용 방법을 익혀보세요.',
  buttons: [
    { href: 'https://github.com/Pr0j3c7-Heimdall', label: 'GitHub' },
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
  }
];

export const linksData = {
  title: '시작하기',
  items: [
    { href: 'https://github.com/Pr0j3c7-Heimdall', label: 'GitHub', description: '소스코드 및 예제' },
    { href: '/docs', label: '가이드', description: 'API 문서 및 사용법' }
  ]
};
