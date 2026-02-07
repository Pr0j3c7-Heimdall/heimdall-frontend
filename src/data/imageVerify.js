export const imageAnalysisMethodsData = {
  title: '이미지 분석 방법',
  description: '프레임워크에 사용되는 다양한 분석 기법으로 AI 생성 여부를 판별합니다.',
  items: [
    { id: 'deepfake', icon: 'image', title: '딥페이크 탐지', description: '합성·조작된 이미지를 식별하고 실제 촬영 여부를 판단합니다.' },
    { id: 'generation', icon: 'layers', title: '생성 모델 식별', description: 'DALL·E, Midjourney, Stable Diffusion 등 생성 모델 출처를 추정합니다.' },
    { id: 'metadata', icon: 'info', title: '메타데이터 분석', description: 'EXIF, 소프트웨어 정보 등으로 후처리 및 생성 도구 흔적을 탐지합니다.' }
  ]
};

export const imageCriteriaData = {
  title: '독자적 판별 기준',
  description: '다양한 분석 결과를 종합하여 Heimdall만의 신뢰도 점수와 판별 기준을 제시합니다.',
  points: [
    '다중 엔진 분석 결과 가중 평균',
    '메타데이터·픽셀 분석 종합',
    '생성 모델 특유 패턴 탐지',
    '인간 촬영 vs AI 생성 확률 산출'
  ]
};

export const supportedModelsData = {
  title: '지원 모델',
  description: '이미지 검증에서 참조·식별 가능한 생성 모델입니다.',
  categories: [
    { name: '지원 (식별 가능)', items: ['DALL·E 2/3', 'Midjourney', 'Stable Diffusion', 'Firefly', 'Leonardo.ai'] },
    { name: '참조 중', items: ['DALL·E 3', 'Midjourney v6', 'SDXL'] }
  ]
};
