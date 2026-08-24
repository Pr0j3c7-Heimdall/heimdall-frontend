import { apiClient } from '@/lib/apiClient';
import { toPercent } from '@/lib/format';
import { normalizeMediaUrl } from '@/lib/mediaUrl';
import { mapC2paToUI } from '@/lib/mapC2pa';

/**
 * 마이페이지 이미지 검증 내역 조회
 * GET /api/v1/users/me/history/image
 */
export async function getImageHistory(params = {}) {
  const { data } = await apiClient.get('/api/v1/users/me/history/image', { params });
  return data;
}

/**
 * 이미지 업로드 후 비동기 검증 시작
 * POST /api/v1/images/upload
 */
export async function uploadImage(file) {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await apiClient.post('/api/v1/images/upload', formData);
  return data;
}

/**
 * 이미지 검증 상태 조회
 * GET /api/v1/detection/image/{image_id}/status
 */
export async function getImageDetectionStatus(imageId) {
  const { data } = await apiClient.get(`/api/v1/detection/image/${imageId}/status`);
  return data;
}

/**
 * 이미지 검증 상세 결과 조회
 * GET /api/v1/detection/image/{image_id}/result
 */
export async function getImageDetectionResult(imageId) {
  const { data } = await apiClient.get(`/api/v1/detection/image/${imageId}/result`);
  return data;
}

/** 이진분류 앙상블 가중치 (DINOv3, F3Net, UNet) */
const BINARY_WEIGHTS = [
  { name: 'DINOv3', weight: 0.3495, percent: 34.95 },
  { name: 'F3-Net', weight: 0.4628, percent: 46.28 },
  { name: 'UNet', weight: 0.1877, percent: 18.77 }
];

/**
 * API 검출 결과를 ImageVerifyResult용 resultData 형식으로 변환
 * @param {object} apiData - DetectionResultData
 */
export function mapDetectionResultToUI(apiData) {
  if (!apiData) return null;

  const c2pa = mapC2paToUI(apiData.c2pa);

  const getBinaryWeight = (methodName) => {
    const w = BINARY_WEIGHTS.find(
      (x) => methodName && (x.name === methodName || methodName.includes(x.name) || x.name.includes(methodName))
    );
    return w?.percent ?? null;
  };

  const binaryList = apiData.binary || [];
  const binaryResult = apiData.final_is_ai != null ? (apiData.final_is_ai ? 'AI' : 'Real') : null;
  const binary = {
    result: binaryResult || '-',
    aiProbability: toPercent(apiData.final_ai_probability ?? 0),
    methods: binaryList.map((b, i) => {
      const score = b.confidence_score ?? b.result_json?.fake_prob ?? 0;
      const methodName = b.detection_method || `분석 ${i + 1}`;
      return {
        name: methodName,
        aiProbability: toPercent(score),
        result: b.confidence_score > 0.5 ? 'AI' : '실제 사진',
        weight: getBinaryWeight(b.detection_method)
      };
    })
  };

  const multiList = apiData.multi || [];
  const multiComputed = (() => {
    if (multiList.length === 0) return { model: null, probability: null };
    const modelSums = {};
    for (const m of multiList) {
      const probs = m.result_json?.all_probabilities || {};
      for (const [name, score] of Object.entries(probs)) {
        modelSums[name] = (modelSums[name] ?? 0) + Number(score);
      }
    }
    const n = multiList.length;
    let bestModel = null;
    let bestAvg = -1;
    for (const [name, sum] of Object.entries(modelSums)) {
      const avg = sum / n;
      if (avg > bestAvg) {
        bestAvg = avg;
        bestModel = name;
      }
    }
    return { model: bestModel, probability: bestAvg };
  })();

  const multiclass = {
    model:
      multiComputed.model ??
      apiData.final_generator_model ??
      multiList[0]?.predicted_model ??
      '-',
    aiProbability: toPercent(
      multiComputed.probability ??
        apiData.final_ai_probability ??
        multiList[0]?.confidence_score ??
        0
    ),
    methods: multiList.map((m, i) => {
      const allProbs = m.result_json?.all_probabilities || {};
      const sorted = Object.entries(allProbs)
        .sort((a, b) => (b[1] ?? 0) - (a[1] ?? 0))
        .slice(0, 3)
        .map(([model, score]) => ({ model, score: toPercent(score) }));
      return {
        name: m.detection_method || `분석 ${i + 1}`,
        predictedModel: m.predicted_model ?? '-',
        aiProbability: toPercent(m.confidence_score ?? 0),
        top3: sorted
      };
    })
  };

  const final = {
    result: apiData.final_is_ai != null ? (apiData.final_is_ai ? 'AI 생성 이미지' : '실제 촬영 이미지') : '분석 결과 없음',
    model: apiData.final_generator_model ?? '-',
    aiProbability: toPercent(apiData.final_ai_probability)
  };

  return {
    image: normalizeMediaUrl(apiData.image_url),
    c2pa,
    binary,
    multiclass,
    final,
    metadata: apiData.metadata && Object.keys(apiData.metadata).length > 0 ? apiData.metadata : null
  };
}
