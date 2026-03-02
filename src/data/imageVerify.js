/** 이미지 검사 페이지 - 분석 방법 (4단계, 검정색 강조용) */
export const imageAnalysisMethodsData = {
  title: '이미지 분석 방법',
  description: 'Heimdall 프레임워크는 4단계의 판별로 AI 생성 여부를 판별합니다.',
  items: [
    { id: 'c2pa', icon: 'image', title: 'C2PA', description: '콘텐츠 출처 및 진위 정보 메타데이터를 검증하여 생성 도구·플랫폼 정보를 확인합니다.' },
    { id: 'binary', icon: 'layers', title: '이진분류', description: 'AI 생성 이미지와 자연 이미지를 구분하는 이진 분류 모델로 1차 판별을 수행합니다.' },
    { id: 'multiclass', icon: 'chart', title: '다중분류', description: 'DALL·E, Midjourney, Stable Diffusion 등 생성 모델별로 다중 분류하여 출처를 추정합니다.' },
    { id: 'metadata', icon: 'info', title: '메타데이터', description: 'EXIF, 소프트웨어 정보 등 메타데이터를 분석하여 후처리 및 생성 도구 흔적을 탐지합니다.' }
  ]
};

/** Heimdall 판별 프레임워크 - 4단계 소개 */
export const imageFrameworkCardsData = {
  title: 'Heimdall 이미지 판별 프레임워크',
  subtitle: 'AI 검증 아키텍처',
  description: '이미지의 출처와 AI 생성 여부를 C2PA, 이진·다중분류, 메타데이터를 거쳐 네 단계로 검증합니다.',
  cards: [
    {
      id: 'c2pa',
      title: 'C2PA',
      longDescription: 'C2PA(Content Provenance and Authenticity)는 콘텐츠의 출처와 변조 이력을 담는 국제 표준 메타데이터입니다. Heimdall은 이 매니페스트를 해석해 촬영·생성 도구와 플랫폼 정보, 해시 일치 여부를 확인하고, 판별의 첫 번째 근거로 삼습니다. 메타데이터가 없거나 불일치할 경우 다음 단계로 이어져 종합 판별을 수행합니다.'
    },
    {
      id: 'binary',
      title: '이진분류',
      longDescription: 'AI 생성 이미지와 실제 촬영 이미지를 구분하는 단계입니다. 여러 판별 모델이 각자의 기준점과 가중치로 이미지 특징을 분석하고, 그 결과를 종합해 최종 이진 결과와 신뢰도를 도출합니다. 압축·노이즈·재촬영 등 다양한 조건에서도 안정적으로 동작하도록 다중 엔진으로 보완합니다.'
    },
    {
      id: 'multiclass',
      title: '다중분류',
      longDescription: 'AI 생성으로 판별된 이미지가 어떤 모델에서 나온 것인지 추정하는 단계입니다. 지원 모델별 특유 패턴을 학습한 분류기를 적용해, GPT-image-1, DALL·E 3, Stable Diffusion, Midjourney v6 등 구체적인 생성 모델과 신뢰도를 제시합니다. 자연 이미지로 판별된 경우에는 보조 정보로만 활용됩니다.'
    },
    {
      id: 'metadata',
      title: '메타데이터',
      longDescription: 'EXIF, IPTC, XMP 등에 담긴 촬영 기기, 소프트웨어, 수정 이력을 검사합니다. AI 도구 사용 시 남는 메타데이터 패턴을 찾아 C2PA·이진·다중분류 결과를 보완하고, 메타데이터가 제거된 파일도 픽셀 분석과 함께 종합 판별에 반영합니다.'
    }
  ]
};

/** 지원 모델 및 업로드 가이드 */
export const imageSupportTableData = {
  title: '지원 모델 및 업로드 가이드',
  description: '',
  supportedModels: [
    'GPT-image-1',
    'DALL·E 3',
    'Stable Diffusion 3.5',
    'Stable Diffusion XL',
    'FLUX 1.1 pro',
    'big gan',
    'glide',
    'Midjourney v6',
    'Imagen 4',
    'nano-banana + nano-banana-pro'
  ],
  fileCriteria: {
    formats: 'JPG, PNG',
    minSize: '256×256 픽셀 이상',
    maxFileSize: '최대 20MB'
  }
};

export const imageCriteriaData = {
  title: '독자적 판별 기준',
  description: '다양한 분석 결과를 종합하여 Heimdall만의 신뢰도 점수와 판별 기준을 제시합니다.',
  points: ['다중 엔진 분석 결과 가중 평균', '메타데이터·픽셀 분석 종합', '생성 모델 특유 패턴 탐지', '인간 촬영 vs AI 생성 확률 산출']
};

export const supportedModelsData = {
  title: '지원 모델',
  description: '이미지 검증에서 참조·식별 가능한 생성 모델입니다.',
  categories: [
    { name: '지원 (식별 가능)', items: ['DALL·E 2/3', 'Midjourney', 'Stable Diffusion', 'Firefly', 'Leonardo.ai'] },
    { name: '참조 중', items: ['Midjourney v6', 'SDXL'] }
  ]
};
