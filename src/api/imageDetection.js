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
 * 마이페이지 이미지 검증 내역 조회
 * GET /api/v1/users/me/history/image
 * @param {object} [params] - page, size, keyword, file_type, result_type
 * @returns {Promise<{ success: boolean, data?: { items?: array, total?: number } | array }>}
 */
export async function getImageHistory(params = {}) {
  const { data } = await client.get('/api/v1/users/me/history/image', { params });
  return data;
}

/**
 * 이미지 업로드 후 비동기 검증 시작
 * POST /api/v1/images/upload
 * @param {File} file - 이미지 파일
 * @returns {Promise<{ success: boolean, data?: { image_id: number, image_url: string } }>}
 */
export async function uploadImage(file) {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await client.post('/api/v1/images/upload', formData);
  return data;
}

/**
 * 이미지 검증 상태 조회
 * GET /api/v1/detection/image/{image_id}/status
 * @param {number} imageId
 * @returns {Promise<{ success: boolean, data?: { image_id: number, analysis_status: string } }>}
 */
export async function getDetectionStatus(imageId) {
  const { data } = await client.get(`/api/v1/detection/image/${imageId}/status`);
  return data;
}

/**
 * 이미지 검증 상세 결과 조회
 * GET /api/v1/detection/image/{image_id}/result
 * @param {number} imageId
 * @returns {Promise<{ success: boolean, data?: DetectionResultData }>}
 */
export async function getDetectionResult(imageId) {
  const { data } = await client.get(`/api/v1/detection/image/${imageId}/result`);
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
 * 일반인 이해 가능한 문구로 매핑
 * @param {object} apiData - DetectionResultData
 * @returns {object} - { image, c2pa, binary, multiclass, final }
 */
export function mapDetectionResultToUI(apiData) {
  if (!apiData) return null;

  const toPercent = (value) => {
    if (value == null) return 0;
    const num = Number(value);
    if (Number.isNaN(num)) return 0;
    return num <= 1 ? Math.round(num * 100) : Math.round(num);
  };

  const rawC2pa = apiData.c2pa;
  const c2pa =
    rawC2pa && rawC2pa.c2pa_id != null
      ? {
          isCompliant: rawC2pa.is_c2pa_compliant ?? false,
          details: {
            ...(rawC2pa.created_model != null && rawC2pa.created_model !== '' && { '모델명 1': rawC2pa.created_model }),
            ...(rawC2pa.converted_model != null && rawC2pa.converted_model !== '' && { '모델명 2': rawC2pa.converted_model }),
            ...(rawC2pa.created_description != null &&
              rawC2pa.created_description !== '' && { '모델명 3': rawC2pa.created_description }),
            ...(rawC2pa.claim_generator != null &&
              rawC2pa.claim_generator !== '' && { '플랫폼 1': rawC2pa.claim_generator }),
            ...(rawC2pa.claim_generator_info_name != null &&
              rawC2pa.claim_generator_info_name !== '' && { '플랫폼 2': rawC2pa.claim_generator_info_name }),
            ...(rawC2pa.synth_id != null && rawC2pa.synth_id !== '' && { SynthID: rawC2pa.synth_id }),
            ...(rawC2pa.visible_watermark != null &&
              rawC2pa.visible_watermark !== '' && { 워터마크: rawC2pa.visible_watermark }),
            ...(rawC2pa.total_digital_source_type != null &&
              rawC2pa.total_digital_source_type !== '' && {
                '디지털 소스': rawC2pa.total_digital_source_type
              }),
            ...(rawC2pa.synth_id_digital_source_type != null &&
              rawC2pa.synth_id_digital_source_type !== '' && {
                'SynthID 디지털 소스': rawC2pa.synth_id_digital_source_type
              }),
            ...(rawC2pa.visible_watermark_digital_source_type != null &&
              rawC2pa.visible_watermark_digital_source_type !== '' && {
                '워터마크 디지털 소스': rawC2pa.visible_watermark_digital_source_type
              })
          }
        }
      : undefined;

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

  let imageUrl = null;
  const rawImageUrl = apiData.image_url;

  if (rawImageUrl) {
    // 1) 완전한 URL인 경우 (http/https): 그대로 사용 (Vercel 도메인에서 원격 이미지로 로드)
    if (rawImageUrl.startsWith('http://') || rawImageUrl.startsWith('https://')) {
      imageUrl = rawImageUrl;
    }
    // 2) 프로토콜 없이 도메인부터 시작하는 경우 (예: heimdall.ai.kr/uploads/...)
    else if (rawImageUrl.startsWith('heimdall.ai.kr/')) {
      imageUrl = `https://${rawImageUrl}`;
    }
    // 3) 그 외 상대 경로는 API_BASE_URL 기준으로 조합
    else {
      const base = API_BASE_URL.replace(/\/$/, '');
      imageUrl = `${base}${rawImageUrl.startsWith('/') ? '' : '/'}${rawImageUrl}`;
    }
  }

  return {
    image: imageUrl,
    c2pa,
    binary,
    multiclass,
    final
  };
}
