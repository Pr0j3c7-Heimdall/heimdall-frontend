export const audioAnalysisMethodsData = {
  title: '음성 분석 방법',
  description: '프레임워크에 사용되는 다양한 분석 기법으로 AI 합성 음성을 판별합니다.',
  items: [
    {
      id: 'voice-synth',
      icon: 'mic',
      title: '음성 합성 탐지',
      description: 'TTS, 보이스 클로닝 등 AI가 생성한 음성을 실시간으로 구분합니다.'
    },
    {
      id: 'spectrum',
      icon: 'chart',
      title: '스펙트럼 분석',
      description: '주파수 특성을 분석하여 자연 음성과 합성 음성의 차이를 탐지합니다.'
    },
    { id: 'embedding', icon: 'search', title: '음성 임베딩', description: '딥러닝 임베딩으로 음성 특징을 추출하고 합성 패턴을 식별합니다.' }
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
