import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
const ACCESS_TOKEN_KEY = 'heimdall_access_token';

const client = axios.create({
  baseURL: API_BASE_URL
});

client.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  if (!config.headers['Content-Type'] && !(config.data instanceof FormData)) {
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
});

/**
 * 마이페이지 음성 검증 내역 조회
 * GET /api/v1/users/me/history/audio
 */
export async function getAudioHistory(params = {}) {
  const { data } = await client.get('/api/v1/users/me/history/audio', { params });
  return data;
}

/**
 * 음성 업로드 후 비동기 검증 시작
 * POST /api/v1/audios/upload
 * @param {File} file
 * @param {'speech' | 'singing'} track - 분석 트랙 (OpenAPI 필수)
 */
export async function uploadAudio(file, track = 'speech') {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('track', track);
  const { data } = await client.post('/api/v1/audios/upload', formData);
  return data;
}

/**
 * 음성 검증 상태 조회
 * GET /api/v1/detection/audio/{audio_id}/status
 */
export async function getAudioDetectionStatus(audioId) {
  const { data } = await client.get(`/api/v1/detection/audio/${audioId}/status`);
  return data;
}

/**
 * 음성 검증 상세 결과 조회
 * GET /api/v1/detection/audio/{audio_id}/result
 */
export async function getAudioDetectionResult(audioId) {
  const { data } = await client.get(`/api/v1/detection/audio/${audioId}/result`);
  return data;
}

const toPercent = (value) => {
  if (value == null) return 0;
  const num = Number(value);
  if (Number.isNaN(num)) return 0;
  return num <= 1 ? Math.round(num * 100) : Math.round(num);
};

const formatDateTime = (value) => {
  if (!value) return '-';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${y}-${m}-${day} ${hh}:${mm}`;
};

const normalizeMediaUrl = (rawUrl) => {
  if (!rawUrl) return null;
  if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) return rawUrl;
  if (rawUrl.startsWith('heimdall.ai.kr/')) return `https://${rawUrl}`;
  const base = API_BASE_URL.replace(/\/$/, '');
  return `${base}${rawUrl.startsWith('/') ? '' : '/'}${rawUrl}`;
};

const mapC2paToUI = (rawC2pa) => {
  if (!rawC2pa || rawC2pa.c2pa_id == null) return undefined;
  return {
    isCompliant: rawC2pa.is_c2pa_compliant ?? false,
    details: {
      ...(rawC2pa.created_model != null && rawC2pa.created_model !== '' && { '모델명 1': rawC2pa.created_model }),
      ...(rawC2pa.converted_model != null && rawC2pa.converted_model !== '' && { '모델명 2': rawC2pa.converted_model }),
      ...(rawC2pa.created_description != null &&
        rawC2pa.created_description !== '' && { '모델명 3': rawC2pa.created_description }),
      ...(rawC2pa.claim_generator != null && rawC2pa.claim_generator !== '' && { '플랫폼 1': rawC2pa.claim_generator }),
      ...(rawC2pa.claim_generator_info_name != null &&
        rawC2pa.claim_generator_info_name !== '' && { '플랫폼 2': rawC2pa.claim_generator_info_name }),
      ...(rawC2pa.synth_id != null && rawC2pa.synth_id !== '' && { SynthID: rawC2pa.synth_id }),
      ...(rawC2pa.total_digital_source_type != null &&
        rawC2pa.total_digital_source_type !== '' && { '디지털 소스': rawC2pa.total_digital_source_type }),
      ...(rawC2pa.synth_id_digital_source_type != null &&
        rawC2pa.synth_id_digital_source_type !== '' && {
          'SynthID 디지털 소스': rawC2pa.synth_id_digital_source_type
        })
    }
  };
};

const trackLabel = (track) => {
  if (track === 'speech') return '일반 음성';
  if (track === 'singing') return '가창';
  return track || '-';
};

const fileNameFromUrl = (url, fallback = 'audio') => {
  if (!url) return fallback;
  try {
    const pathname = new URL(url, API_BASE_URL).pathname;
    const name = pathname.split('/').pop();
    return name || fallback;
  } catch {
    const parts = url.split('/');
    return parts[parts.length - 1] || fallback;
  }
};

/**
 * API 검출 결과를 AudioVerifyResult용 resultData 형식으로 변환
 * @param {object} apiData - AudioDetectionResultData
 * @param {{ fileName?: string }} [options]
 */
export function mapAudioDetectionResultToUI(apiData, options = {}) {
  if (!apiData) return null;

  const audioUrl = normalizeMediaUrl(apiData.audio_url);
  const fileName = options.fileName ?? fileNameFromUrl(apiData.audio_url);
  const aiProbability = toPercent(apiData.final_ai_probability ?? 0);
  const isAi = apiData.final_is_ai === true;
  const resultLabel = apiData.final_is_ai != null ? (isAi ? 'AI' : 'Real') : '-';
  const modelList = apiData.models || [];

  const methods = modelList.map((model) => {
    const json = model.result_json && typeof model.result_json === 'object' ? model.result_json : {};
    const score = model.confidence_score ?? json.fake_prob ?? json.ai_probability ?? json.probability ?? 0;
    return {
      name: model.detection_method || '분석',
      value: toPercent(score),
      result: Number(score) > 0.5 ? 'AI' : 'Real'
    };
  });

  const finalResult =
    apiData.final_is_ai != null ? (isAi ? 'AI 생성 음성' : '실제 녹음 음성') : '분석 결과 없음';

  return {
    audio: audioUrl,
    fileName,
    track: apiData.track,
    trackLabel: trackLabel(apiData.track),
    result: resultLabel,
    confidence: aiProbability,
    date: formatDateTime(apiData.completed_at),
    c2pa: mapC2paToUI(apiData.c2pa),
    analysis: {
      binary: {
        result: resultLabel,
        confidence: aiProbability
      },
      model: '-',
      methods
    },
    final: {
      result: finalResult,
      model: trackLabel(apiData.track),
      confidence: aiProbability
    }
  };
}
