/** 음성 검사 페이지 - 분석 방법 (4단계) */
export const audioAnalysisMethodsData = {
  title: '음성 분석 방법',
  description: 'Heimdall 프레임워크는 4단계의 판별로 AI 생성 여부를 판별합니다.',
  items: [
    { id: 'c2pa', icon: 'mic', title: 'C2PA', description: '음성 메타데이터 및 출처 정보를 검증하여 생성·녹음 도구 정보를 확인합니다.' },
    { id: 'binary', icon: 'chart', title: '이진분류', description: 'AI 합성 음성과 자연 음성을 구분하는 이진 분류로 1차 판별을 수행합니다.' },
    { id: 'multiclass', icon: 'layers', title: '다중분류', description: 'TTS, 보이스 클로닝 등 합성 모델별로 다중 분류하여 출처를 추정합니다.' },
    { id: 'metadata', icon: 'info', title: '메타데이터', description: '오디오 메타데이터를 분석하여 편집·합성 도구 흔적을 탐지합니다.' }
  ]
};

/** About 프레임워크 - 카드 4개 세부 설명 */
export const audioFrameworkCardsData = {
  title: 'Heimdall 음성 판별 프레임워크',
  subtitle: 'About 프레임워크',
  description: '시스템 구성도 및 4단계 판별 모듈에 대한 상세 설명입니다.',
  cards: [
    {
      id: 'c2pa',
      title: 'C2PA',
      longDescription: '음성·영상에 대한 C2PA(Content Provenance) 메타데이터가 있을 경우, 출처·변조 이력을 검증합니다. Heimdall은 해당 메타데이터를 디코딩하여 녹음/합성 도구, 플랫폼 정보를 확인하고 AI 합성 여부 판별의 보조 근거로 활용합니다. 메타데이터가 없으면 다음 단계 분석에 의존합니다.'
    },
    {
      id: 'binary',
      title: '이진분류',
      longDescription: '이진분류 단계에서는 여러 판별 모델이 음성을 AI 합성 vs 자연(실제 녹음)으로 구분합니다. 스펙트럼·포먼트·임베딩 등 특징을 추출하고, 각 모델의 기준점과 가중치에 따라 가중 평균한 결과와 신뢰도를 산출합니다. 배경 소음·압축에 강건하도록 다중 엔진을 사용합니다.'
    },
    {
      id: 'multiclass',
      title: '다중분류',
      longDescription: '다중분류 단계에서는 AI 합성으로 판별된 음성에 대해 어떤 TTS·보이스 클로닝 모델에서 나왔는지 추정합니다. ElevenLabs, VALL-E, Google TTS 등 지원 모델별 특유 패턴을 학습한 분류기를 적용하고, 모델별 신뢰도와 최종 추정 모델명을 제공합니다. 자연 음성으로 판별된 경우 해당 단계는 생략되거나 보조 정보로만 표시됩니다.'
    },
    {
      id: 'metadata',
      title: '메타데이터',
      longDescription: '메타데이터 분석 단계에서는 오디오 파일에 포함된 코덱, 비트레이트, 채널, 생성/수정 소프트웨어 정보 등을 검사합니다. TTS·녹음 도구 사용 시 남는 메타데이터 패턴을 탐지하여 이진·다중분류 결과를 보완합니다. 메타데이터가 제거된 파일도 신호 기반 분석과 함께 종합 판별에 활용됩니다.'
    }
  ]
};

/** 지원 모델 및 업로드 가이드 */
export const audioSupportTableData = {
  title: '지원 모델 및 업로드 가이드',
  description: 'Heimdall 음성 검사 서비스에서 지원하는 음성 모델 및 규정하는 파일 형태입니다.',
  supportedModels: [
    'ElevenLabs',
    'VALL-E',
    'Coqui TTS',
    'Google Cloud TTS',
    'Amazon Polly',
    'OpenAI TTS',
    'Bark',
    'Whisper 기반 변조',
    '기타 (참조 중)',
    '자연 음성'
  ],
  fileCriteria: {
    formats: 'MP3, WAV',
    duration: '10초 이상 1분 이하',
    maxFileSize: '최대 50MB'
  }
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
