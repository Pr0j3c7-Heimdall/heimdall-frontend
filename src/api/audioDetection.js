import { apiClient } from '@/lib/apiClient';
import { formatDateTime, toPercent } from '@/lib/format';
import { fileNameFromUrl, normalizeMediaUrl } from '@/lib/mediaUrl';
import { mapC2paToUI } from '@/lib/mapC2pa';

/**
 * 마이페이지 음성 검증 내역 조회
 * GET /api/v1/users/me/history/audio
 */
export async function getAudioHistory(params = {}) {
  const { data } = await apiClient.get('/api/v1/users/me/history/audio', { params });
  return data;
}

/**
 * 음성 업로드 후 비동기 검증 시작
 * POST /api/v1/audios/upload
 * @param {'speech' | 'singing'} track - 분석 트랙 (OpenAPI 필수)
 */
export async function uploadAudio(file, track = 'speech') {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('track', track);
  const { data } = await apiClient.post('/api/v1/audios/upload', formData);
  return data;
}

/**
 * 음성 검증 상태 조회
 * GET /api/v1/detection/audio/{audio_id}/status
 */
export async function getAudioDetectionStatus(audioId) {
  const { data } = await apiClient.get(`/api/v1/detection/audio/${audioId}/status`);
  return data;
}

/**
 * 음성 검증 상세 결과 조회
 * GET /api/v1/detection/audio/{audio_id}/result
 */
export async function getAudioDetectionResult(audioId) {
  const { data } = await apiClient.get(`/api/v1/detection/audio/${audioId}/result`);
  return data;
}

const trackLabel = (track) => {
  if (track === 'speech') return '일반 음성';
  if (track === 'singing') return '가창';
  return track || '-';
};

/**
 * API 검출 결과를 AudioVerifyResult용 resultData 형식으로 변환
 * @param {object} apiData - AudioDetectionResultData
 * @param {{ fileName?: string }} [options]
 */
export function mapAudioDetectionResultToUI(apiData, options = {}) {
  if (!apiData) return null;

  const audioUrl = normalizeMediaUrl(apiData.audio_url);
  const fileName = options.fileName ?? fileNameFromUrl(apiData.audio_url, 'audio');
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
