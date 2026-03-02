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

/**
 * API 검출 결과를 ImageVerifyResult용 resultData 형식으로 변환
 * @param {object} apiData - DetectionResultData (image_url, final_is_ai, c2pa, binary[], multi[] 등)
 * @returns {object} - { image, c2pa, binary, multiclass, final }
 */
export function mapDetectionResultToUI(apiData) {
  if (!apiData) return null;

  const toPercent = (value) => {
    if (value == null) return 0;
    const num = Number(value);
    if (Number.isNaN(num)) return 0;
    // 0~1 사이 값이면 퍼센트로, 그 외에는 그대로 사용
    return num <= 1 ? Math.round(num * 100) : Math.round(num);
  };

  const c2pa = apiData.c2pa
    ? {
        model: apiData.c2pa.created_model || apiData.c2pa.converted_model || '-',
        hashMatch: apiData.c2pa.is_c2pa_compliant ?? false,
        platform: apiData.c2pa.claim_generator || apiData.c2pa.claim_generator_info_name || '-',
        details: {
          ...(apiData.c2pa.created_description && { 설명: apiData.c2pa.created_description }),
          ...(apiData.c2pa.total_digital_source_type && {
            '디지털 소스': apiData.c2pa.total_digital_source_type
          }),
          ...(apiData.c2pa.synth_id && { SynthID: apiData.c2pa.synth_id }),
          ...(apiData.c2pa.synth_id_digital_source_type && {
            'SynthID 디지털 소스': apiData.c2pa.synth_id_digital_source_type
          })
        }
      }
    : undefined;

  const binaryList = apiData.binary || [];
  const binaryConfidence =
    binaryList.length > 0 ? Math.round(binaryList.reduce((sum, b) => sum + (b.confidence_score ?? 0), 0) / binaryList.length) : null;
  const binaryResult = apiData.final_is_ai != null ? (apiData.final_is_ai ? 'AI' : 'Real') : null;
  const binary = {
    result: binaryResult || (binaryList[0]?.result_json?.result ?? '-'),
    confidence: toPercent(apiData.final_ai_probability ?? binaryConfidence ?? 0),
    methods: binaryList.map((b, i) => ({
      name: b.detection_method || `분석 방법 ${i + 1}`,
      threshold: b.result_json?.threshold ?? '-',
      value: b.confidence_score ?? b.result_json?.value ?? '-',
      result: b.result_json?.result ?? (b.confidence_score > 0.5 ? 'AI' : 'Real'),
      weight: b.result_json?.weight ?? '-'
    }))
  };

  const multiList = apiData.multi || [];
  const multiclass = {
    model: apiData.final_generator_model || multiList[0]?.predicted_model || '-',
    confidence: toPercent(multiList[0]?.confidence_score ?? 0),
    methods: multiList.map((m, i) => ({
      name: m.detection_method || `분석 방법 ${i + 1}`,
      threshold: m.result_json?.threshold ?? '-',
      value: m.confidence_score ?? m.result_json?.value ?? '-',
      result: m.predicted_model ?? m.result_json?.result ?? '-',
      weight: m.result_json?.weight ?? '-'
    }))
  };

  const final = {
    result: apiData.final_is_ai != null ? (apiData.final_is_ai ? 'AI 생성 이미지' : '실제 촬영 이미지') : '분석 결과 없음',
    model: apiData.final_generator_model ?? '-',
    confidence: toPercent(apiData.final_ai_probability)
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
