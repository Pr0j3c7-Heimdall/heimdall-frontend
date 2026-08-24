/** 음성 검사 페이지 - 분석 방법 (4단계) */
export const audioAnalysisMethodsData = {
  title: '음성 분석 방법',
  description: 'Heimdall 음성 판별 프레임워크는 4단계의 판별로 AI 생성 여부를 판별합니다.',
  items: [
    {
      id: 'c2pa',
      icon: 'mic',
      title: 'C2PA',
      description:
        'C2PA 서명·해시를 검증해 출처/무결성을 확인하여 AI 생성 여부를 판정하고, Manifest 내부 값과 생성 도구 정보를 추출합니다.'
    },
    {
      id: 'type',
      icon: 'layers',
      title: '음성 유형 분석',
      description:
        'YAMNet을 활용해 음성 파일의 Type을 분류하고 음성은 단일·다중 화자 분리, 가창은 배경음·반주 분리를 진행합니다.'
    },
    {
      id: 'binary',
      icon: 'chart',
      title: '이진분류',
      description:
        'SSL-AASIST, RawNet3, CQCC+SSL+AASIST 기반 음성을 판별하며, AASIST, RawNet3, LCNN 기반으로 가창을 판별합니다. 또한 Logistic Regression을 통해 최종 판별 결과를 도출합니다.'
    },
    {
      id: 'metadata',
      icon: 'info',
      title: '메타데이터',
      description:
        '실제 음성 판정이 나올 경우, ID3/XMP 등 메타데이터와 컨테이너 정보를 분석해 코덱, 생성·편집 소프트웨어, 저장 환경 단서 등을 추출합니다.'
    }
  ]
};

/** Heimdall 음성 판별 프레임워크 - body[] 기반 카드 */
export const audioFrameworkCardsData = {
  title: 'Heimdall 음성 판별 프레임워크',
  subtitle: 'AI 검증 아키텍처',
  description: 'Heimdall 음성 판별 프레임워크에 대한 상세 설명입니다.',
  diagrams: [
    {
      src: '/assets/images/framework/audio_framework.png',
      fallbackSrc: '/assets/images/framework/audio_framework.svg',
      alt: '로그인과 음성 업로드부터 C2PA·음성 유형 분석·이진분류·메타데이터를 거쳐 최종 결과가 마이페이지에 저장되는 Heimdall 음성 판별 프레임워크 흐름도',
      caption: '프레임워크 흐름도'
    },
    {
      src: '/assets/images/framework/audio_system.png',
      fallbackSrc: '/assets/images/framework/audio_system.svg',
      alt: '음성 업로드 후 C2PA·음성 유형 분석·이진분류·메타데이터 분석을 거쳐 최종 판단이 나오는 Heimdall 음성 판별 시스템 구성도',
      caption: '시스템 구성도'
    }
  ],
  cards: [
    {
      id: 'c2pa',
      title: 'C2PA',
      body: [
        {
          type: 'p',
          text: 'C2PA(Content Provenance and Authenticity)는 이미지·음성 등 디지털 콘텐츠에 출처(provenance)와 변경 이력(edit history)을 기록하기 위한 국제 표준 메타데이터 규격입니다. 음성 파일이 특정 AI 생성 도구나 편집 도구를 거쳤는지, 파일이 변조되지 않았는지와 같은 정보를 검증 가능한 서명과 함께 포함할 수 있습니다. 즉, 단순히 파일 안에 적힌 설명이 아니라 서명과 해시를 통해 검증할 수 있는 근거 정보로 활용됩니다.'
        },
        {
          type: 'p',
          text: 'Heimdall은 오픈소스 도구인 c2patool을 통해 음성 파일의 C2PA Manifest를 추출·검증하고, AI 생성 여부, 생성·편집 도구 정보, 서명자 정보, 해시 무결성 단서를 확인합니다. C2PA 정보가 있고, AI 생성 여부와 검증된 서명자, 해시 무결성이 모두 신뢰 가능한 경우에는 해당 정보를 우선 근거로 활용합니다. C2PA가 없거나, 불완전하거나, 검증에 실패한 경우에는 다음 단계인 음성 유형 분석과 이진분류를 수행합니다.'
        },
        { type: 'h3', text: '어떻게 분석되나요?' },
        {
          type: 'ul',
          items: [
            'c2patool로 음성 파일 내부의 C2PA Manifest를 추출',
            'Manifest에 포함된 서명·해시 기반 검증으로 기록 신뢰 가능 여부 확인',
            '생성·편집 도구, 플랫폼, 서명자, 내부 값을 해석해 구조화',
            'C2PA가 없거나 불완전하거나 검증 실패 시 다음 단계 분석 수행'
          ]
        }
      ]
    },
    {
      id: 'type',
      title: '음성 유형 분석',
      body: [
        {
          type: 'p',
          text: '음성 유형 분석은 업로드된 파일에서 분석 가능한 사람 목소리가 있는지 확인하고, 해당 목소리가 일반 음성인지 가창 음성인지 분류하는 단계입니다.'
        },
        {
          type: 'p',
          text: '이 단계는 AI/Real을 직접 판정하기 위한 단계가 아니라, 이후 어떤 판별 모델을 적용할지 결정하기 위한 전처리·분기 단계입니다.'
        },
        {
          type: 'p',
          text: 'Heimdall은 업로드된 오디오를 내부 분석 규격으로 변환한 뒤, Type 판별 조건이 적용된 YAMNet을 통해 음성·가창·배경음 분류합니다. 해당 분류로 일반 음성, 가창 음성, 비음성 또는 분석 불가 상태로 파일이 나눠집니다.'
        },
        {
          type: 'p',
          text: '배경음으로 분류되면, 사람 목소리가 충분하지 않거나 배경음만 존재하는 분석 불가 상태로 AI/Real 판별 대신 분석 불가 상태로 처리합니다. 해당 경우엔 Heimdall 음성 분석을 사용할 수 없습니다.'
        },
        {
          type: 'p',
          text: '가창으로 분류되면, 반주 소리가 크다고 판단 되었을 시 Demucs를 활용해 배경음·반주와 사람 목소리 성분을 분리합니다. 반대로 반주가 낮다고 판단되면, 파일 전체에 대한 분석이 진행됩니다. 사람 목소리를 중심으로 분석됩니다.'
        },
        { type: 'h3', text: '어떻게 분석되나요?' },
        {
          type: 'ul',
          items: [
            '업로드된 오디오를 내부 분석용 waveform으로 변환',
            'Type 판별 조건이 적용된 YAMNet 기반 음성·가창·배경음 분류',
            '무음, 배경음만 존재, 사람 목소리 부족, 디코딩 실패 파일은 분석 불가로 처리',
            '일반 음성으로 판단되면 음성 판별 모델로 전달',
            '가창 음성으로 판단되면 가창 판별 모델로 전달',
            'Demucs 기반 가창 파일 배경음·반주 분리 및 사람 목소리 중심 분석'
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
          text: '이진분류는 음성 유형 분석을 거친 사람 목소리를 AI 생성(AI) / 실제 사람 목소리(Real) 두 범주 중 하나로 판단하는 단계입니다.'
        },
        {
          type: 'p',
          text: '업로드된 오디오는 모델 입력 전 내부 분석 규격으로 정규화되며, 긴 파일은 구간 단위로 나누어 분석한 뒤 전체 점수로 통합합니다. 모델 학습 과정에서는 RawBoost 기반 데이터 증강을 적용해 노이즈, 저음질, 압축, 채널 왜곡 환경에서도 판별 성능이 유지되도록 학습하였습니다.'
        },
        {
          type: 'p',
          text: 'Heimdall은 일반 음성과 가창 음성 판별에 다른 기준을 사용합니다. 일반 음성은 SSL-AASIST, RawNet3, CQCC+SSL+AASIST를 사용하고, 가창 음성은 AASIST, RawNet3, LCNN을 사용합니다. 각 모델은 서로 다른 관점에서 음성의 위조 단서를 분석하며, 일반 음성 모델은 발화 흐름, 음색, 파형 질감, 주파수 왜곡, 합성기 특유의 음향 아티팩트를 분석합니다. 가창 모델은 보컬의 시간·주파수 패턴, 음색 질감, 피치 변화, 비브라토, 반주와 분리된 보컬 성분에서 나타나는 합성 흔적을 분석합니다.'
        },
        {
          type: 'p',
          text: '최종적으로 Heimdall은 Logistic Regression 기반으로 모델별 점수를 앙상블하여 최종 이진 판정을 도출합니다.'
        },
        {
          type: 'ul',
          items: [
            'SSL-AASIST: 사전학습 음성 표현과 AASIST 구조를 결합해 일반 음성의 고수준 위조 단서를 분석합니다.',
            'RawNet3: 오디오 파형을 직접 분석해 음색과 waveform 수준의 미세한 AI 생성 흔적을 탐지합니다.',
            'CQCC+SSL+AASIST: 주파수 기반 특징과 사전학습 음성 표현을 함께 사용해 다양한 음성 위조 패턴을 보완적으로 분석합니다.',
            'AASIST: 시간·주파수 영역의 가창 위조 흔적을 graph attention 기반으로 분석합니다.',
            'LCNN: spectrogram/LFCC 기반 국소 패턴을 분석해 가창 보컬의 합성 흔적을 탐지합니다.'
          ]
        },
        { type: 'h3', text: '어떻게 분석되나요?' },
        {
          type: 'ul',
          items: [
            '일반 음성은 SSL-AASIST, RawNet3, CQCC+SSL+AASIST로 각각 AI/Real 점수 산출',
            '가창 음성은 AASIST, RawNet3, LCNN으로 각각 AI/Real 점수 산출',
            '원본 음성과 필요 시 분리된 사람 목소리 성분을 함께 분석',
            '각 모델의 출력 점수를 정규화하고 Logistic Regression 기반으로 앙상블하여 최종 AI 생성 확률 계산'
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
          text: '메타데이터는 음성 신호 자체가 아니라, 오디오 파일 안에 함께 들어 있는 부가 정보입니다. 예를 들어 코덱, 비트레이트, 샘플레이트, 채널 수, 인코딩 소프트웨어, 저장 프로그램, 제목·아티스트 정보, 생성·수정 시각 같은 정보가 포함될 수 있습니다. 이런 정보는 편집, 변환, 재저장 과정에서 바뀌거나 삭제될 수 있으므로, AI/Real 판정의 단독 근거가 아니라 보조 근거로 활용됩니다.'
        },
        {
          type: 'p',
          text: '메타데이터 분석은 오디오 파일에 포함된 ID3, XMP, RIFF/WAV INFO, MP4/M4A 컨테이너 정보 및 파일 속성 정보를 기반으로 녹음·편집·저장 환경 단서를 확인하는 단계입니다.'
        },
        {
          type: 'p',
          text: 'Heimdall은 exiftool과 오디오 컨테이너 분석을 통해 파일 메타데이터를 추출·정리하고, C2PA 및 딥러닝 판별 결과를 보완하는 근거로 활용합니다.'
        },
        { type: 'h3', text: '어떻게 분석되나요?' },
        {
          type: 'ul',
          items: [
            'exiftool로 ID3, XMP, RIFF/WAV INFO, MP4/M4A 컨테이너 정보 등 오디오 메타데이터 추출',
            '코덱, 비트레이트, 샘플레이트, 채널, 인코딩 소프트웨어 등 파일 속성 정보 정리',
            '생성·수정 프로그램, 저장 이력, 변환 흔적과 관련된 필드를 구조화',
            'C2PA 및 모델 판별 결과와 함께 보조 근거로 활용'
          ]
        }
      ]
    }
  ]
};

/** 주의사항 및 업로드 가이드 */
export const audioSupportTableData = {
  title: '주의사항 및 업로드 가이드',
  description: '',
  notices: [
    '본 음성 판별 서비스는 오디오 파일에 포함된 사람의 일반 음성 및 가창 음성의 AI 생성 여부를 판별하기 위한 서비스입니다.',
    '배경음만 있거나, 무음이거나, 사람 목소리 구간이 너무 짧은 파일은 판별이 불가합니다.',
    '사람 목소리 구간이 최소 5초 이상인 오디오 파일을 업로드를 권장하며, 발화 시간이 작을 경우 Minimum Duration Filtering에 의해 구간이 누락될 수 있습니다.',
    '심한 잡음, 과도한 음량 왜곡, 반복적인 재인코딩, 매우 낮은 음질의 파일은 판별 신뢰도가 낮아질 수 있습니다.',
    '본 음성 판별 서비스는 가창 파일에 한하여 단일 발화자에 최적화 되어있으며, 가창 파일에 대한 다수 발화자 분석을 지원하지 않습니다.',
    '따라서 가창 파일은 발화자가 다수 있더라도 오디오 파일 전체에 대한 판별 결과가 도출되며, 이는 다소 판별 성능이 저하되므로 본 서비스의 이용에 부합하지 않습니다.',
    '다수의 발화자가 있는 가창 파일에 한하여 발화자 별로 분리된 오디오 파일을 각각 올리셔야 최적의 결과를 얻으실 수 있습니다.',
    '본 서비스는 AI 생성 여부를 확률적으로 판별하는 보조 도구이며, 법적·수사적 판단의 단독 근거로 사용하기에는 한계가 있습니다.'
  ],
  fileCriteria: {
    formats: 'MP3, WAV',
    duration: '10초 이상 10분 이하(파일 내 사람 목소리 5초 이상)',
    maxFileSize: '최대 200MB'
  },
  engines: [
    'C2PA: c2patool로 음성 파일의 출처·무결성·생성 도구 정보를 검증합니다.',
    'YAMNet: 업로드 파일이 일반 음성, 가창 음성, 비음성 중 어디에 가까운지 분류합니다.',
    'Demucs: 배경음·반주와 사람 목소리 성분을 분리합니다.',
    '일반 음성 판별 모델: SSL-AASIST, RawNet3, CQCC+SSL+AASIST를 사용해 AI/Real을 판별합니다.',
    '가창 음성 판별 모델: AASIST, RawNet3, LCNN을 사용해 AI/Real을 판별합니다.',
    '메타데이터 분석: exiftool로 오디오 파일의 코덱, 컨테이너, 생성·편집 정보 등을 추출합니다.'
  ]
};

export const audioCriteriaData = {
  title: '독자적 판별 기준',
  description: '다양한 분석 결과를 종합하여 Heimdall만의 신뢰도 점수와 판별 기준을 제시합니다.',
  points: ['음성 임베딩 기반 유사도 분석', '스펙트럼·포먼트 특징 비교', 'TTS/보이스클로닝 패턴 탐지', '자연 음성 vs AI 합성 확률 산출']
};

export const audioSupportedModelsData = {
  title: '지원 모델',
  description: '음성 검증에서 참조·식별 가능한 합성 모델입니다.',
  categories: [
    { name: '지원 (식별 가능)', items: ['ElevenLabs', 'VALL-E', 'Coqui TTS', 'Google Cloud TTS', 'Amazon Polly'] },
    { name: '참조 중', items: ['Whisper 기반 변조', 'OpenAI TTS', 'Bark'] }
  ]
};
