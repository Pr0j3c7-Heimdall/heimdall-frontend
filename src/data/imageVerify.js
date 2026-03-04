/** 이미지 검사 페이지 - 분석 방법 (4단계, 검정색 강조용) */
export const imageAnalysisMethodsData = {
  title: '이미지 분석 방법',
  description: 'Heimdall 프레임워크는 4단계의 판별로 AI 생성 여부를 판별합니다.',
  items: [
    {
      id: 'c2pa',
      icon: 'image',
      title: 'C2PA',
      description:
        'C2PA 서명·해시를 검증해 출처/무결성을 확인하여 AI 생성 여부를 판정하고, Manifest 내부 값과 생성 도구 정보를 추출합니다.'
    },
    {
      id: 'binary',
      icon: 'layers',
      title: '이진분류',
      description: 'DINOv3·F3Net·U-Net 분석 결과를 Softmax 기반 앙상블 가중치로 결합해 AI 생성 여부를 판정합니다.'
    },
    {
      id: 'multiclass',
      icon: 'chart',
      title: '다중분류',
      description: 'DINOv3·F3Net·U-Net의 모델별 점수를 합산해 총점이 가장 높은 AI 생성 모델을 추정합니다.'
    },
    {
      id: 'metadata',
      icon: 'info',
      title: '메타데이터',
      description:
        '실제 사진 판정이 나올 경우, EXIF/XMP 등 파일 메타데이터를 분석해 촬영·편집·저장 환경 등 실제 사진 정보를 추출합니다.'
    }
  ]
};

/** Heimdall 판별 프레임워크 - 4단계 소개 (body: p|h3|ul) */
export const imageFrameworkCardsData = {
  title: 'Heimdall 이미지 판별 프레임워크',
  subtitle: 'AI 검증 아키텍처',
  description: 'Heimdall 프레임워크는 4단계의 판별로 AI 생성 여부를 판별합니다.',
  cards: [
    {
      id: 'c2pa',
      title: 'C2PA',
      body: [
        {
          type: 'p',
          text: 'C2PA(Content Provenance and Authenticity)는 이미지/콘텐츠에 출처(provenance)와 변경 이력(edit history)을 기록하기 위한 국제 표준 메타데이터 규격입니다. 사진이 카메라에서 찍혔는지, 특정 AI/편집 도구에서 생성·편집됐는지와 같은 정보가 검증 가능한 형태의 서명과 함께 들어갈 수 있습니다. 즉, "누가 적어둔 말"이 아니라 검증 가능한 근거가 되도록 설계되어 있는 정보 규격입니다.'
        },
        {
          type: 'p',
          text: 'Heimdall은 오픈소스 도구인 c2patool로 C2PA Manifest를 추출·검증하여, 생성/편집 도구 정보와 무결성(변조 여부) 단서를 활용합니다. 다만 모든 이미지에 C2PA가 있는 것은 아니며, 업로드/재저장/편집 과정에서 C2PA가 제거되거나 손상될 수도 있습니다. 그래서 C2PA가 없거나 신뢰가 부족한 경우에는 다음 단계인 이진분류로 넘어가 분석을 진행 합니다.'
        },
        { type: 'h3', text: '어떻게 분석되나요?' },
        {
          type: 'ul',
          items: [
            'c2patool로 이미지 내부의 Manifest(정보 기록 묶음) 추출',
            'Manifest에 포함된 서명/해시 기반 검증을 통해 "기록 신뢰 가능 여부" 검증',
            'Manifest에 남아 있는 생성 도구/플랫폼 정보 및 관련 내부 값을 해석 후 구조화해 저장',
            'C2PA가 없거나, 불완전/검증 실패 시 다음 단계인 이진분류를 수행'
          ]
        }
      ]
    },
    {
      id: 'binary',
      title: '이진분류',
      body: [
        {
          type: 'p',
          text: '이진분류는 이미지를 AI 생성(AI) / 실제 사진(Real) 두 범주 중 하나로 판단하는 단계입니다.'
        },
        {
          type: 'p',
          text: 'Heimdall은 한 가지 기준만으로 단정하지 않고, 서로 다른 관점의 분석 모듈(DINOv3, F3Net, U-Net)을 사용해 각각의 점수를 산출하고, Softmax(지수 정규화) 기반 앙상블 가중치(α 조절)로 결합하여 더 안정적으로 최종 이진 판정을 도출합니다.'
        },
        {
          type: 'ul',
          items: [
            'DINOv3: 이미지의 전체적인 시각 특징을 임베딩(숫자 벡터)으로 바꿔 비교 가능한 형태로 만듭니다.',
            'F3Net: 이미지의 주파수(DCT) 영역에서 나타나는 합성 특유의 패턴(아티팩트) 단서를 분석합니다.',
            'U-Net: 이미지의 공간적(픽셀/영역) 불일치나 인공적인 흔적이 나타나는 패턴을 분석합니다.',
            'Softmax 기반 앙상블 가중치: 각 분석 결과인 신뢰도 점수를 바탕으로 가중치를 자동으로 조절(α로 민감도 조절)합니다.'
          ]
        },
        { type: 'h3', text: '어떻게 분석되나요?' },
        {
          type: 'ul',
          items: [
            'DINOv3 임베딩 기반 특징 추출로 전역 시각 특징을 수치화',
            'F3Net 기반 주파수(DCT) 아티팩트 분석으로 합성 특유의 주파수 단서 점수 산출',
            'U-Net 기반 공간 아티팩트 분석으로 국소적 불일치/인공 흔적 패턴 점수 산출',
            '각 모듈의 출력 점수를 Softmax(지수 정규화)로 가중치화한 뒤 가중 결합하여 최종 AI/Real 판정'
          ]
        }
      ]
    },
    {
      id: 'multiclass',
      title: '다중분류',
      body: [
        {
          type: 'p',
          text: '다중분류는 이미지가 AI 생성으로 판단된 경우, 어떤 생성 모델/계열에서 생성되었는지 를 추정하는 단계입니다. 같은 "AI 이미지"라도 모델마다 남는 패턴이 조금씩 달라서, 그 차이를 학습한 분류기가 모델 별 가능성 점수를 계산합니다.'
        },
        {
          type: 'p',
          text: 'Heimdall은 이 단계에서도 DINOv3·F3Net·U-Net을 동일하게 사용하되, 각 모듈이 모델 별 점수 벡터를 출력하고 이를 합산합니다. 즉 결과가 "AI/Real" 중 하나가 아니라 모델 후보 별 점수(예: GPT-image-1, DALL·E, Stable Diffusion, Midjourney…)의 형태로 나옵니다. 그리고 세 분석의 모델 별 점수를 합산(통합 집계)하여, 총점이 가장 높은 모델을 AI 생성 모델로 최종 추정합니다.'
        },
        { type: 'h3', text: '어떻게 분석되나요?' },
        {
          type: 'ul',
          items: [
            'DINOv3, F3Net, U-Net이 각각 모델 후보 별 점수를 산출',
            '모듈 별 점수를 합산/통합하여 모델 후보 별 총점 계산',
            '최고 총점 모델 후보를 생성 모델로 추정'
          ]
        }
      ]
    },
    {
      id: 'metadata',
      title: '메타데이터',
      body: [
        {
          type: 'p',
          text: '메타데이터는 "이미지 자체(픽셀)"가 아니라, 파일 안에 함께 들어있는 부가 정보입니다. 예를 들어, 사진을 찍을 때 카메라가 자동으로 저장하는 촬영 정보(시간, 기기, 렌즈, 노출 등)나, 편집 프로그램이 남기는 소프트웨어 정보가 여기에 포함될 수 있습니다. 이런 정보는 편집/재저장 과정에서 바뀌거나 삭제될 수 있기 때문에, 실제 사진이라고 판별될 경우에만 메타데이터 정보를 추출하고 있습니다.'
        },
        {
          type: 'p',
          text: '메타데이터 분석은 이미지 파일에 포함된 EXIF/IPTC/XMP 및 파일 컨테이너 정보를 기반으로 촬영·저장·편집 환경 단서를 확인하는 단계입니다. Heimdall은 오픈소스 도구인 exiftool로 EXIF/XMP/IPTC 등 메타데이터를 추출·정리하고, 실제 사진의 정보를 해석하는 보조 근거로 활용합니다.'
        },
        { type: 'h3', text: '어떻게 분석되나요?' },
        {
          type: 'ul',
          items: [
            'exiftool로 EXIF/XMP/IPTC + 파일 정보(코덱, 압축, 프로파일 등) 추출',
            '촬영 기기/소프트웨어/저장 이력 관련 필드를 정리해 구조화 후 저장'
          ]
        }
      ]
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
