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

  const c2pa = apiData.c2pa
    ? {
        model: apiData.c2pa.created_model || apiData.c2pa.converted_model || '-',
        hashMatch: apiData.c2pa.is_c2pa_compliant ?? false,
        platform: apiData.c2pa.claim_generator || apiData.c2pa.claim_generator_info_name || '-',
        details: {
          ...(apiData.c2pa.created_description && { '설명': apiData.c2pa.created_description }),
          ...(apiData.c2pa.total_digital_source_type && { '디지털 소스': apiData.c2pa.total_digital_source_type })
        }
      }
    : undefined;

  const binaryList = apiData.binary || [];
  const binaryConfidence =
    binaryList.length > 0
      ? Math.round(
          binaryList.reduce((sum, b) => sum + (b.confidence_score ?? 0), 0) / binaryList.length
        )
      : null;
  const binaryResult = apiData.final_is_ai != null ? (apiData.final_is_ai ? 'AI' : 'Real') : null;
  const binary = {
    result: binaryResult || (binaryList[0]?.result_json?.result ?? '-'),
    confidence: apiData.final_ai_probability ?? binaryConfidence ?? 0,
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
    confidence: multiList[0]?.confidence_score ?? 0,
    methods: multiList.map((m, i) => ({
      name: m.detection_method || `분석 방법 ${i + 1}`,
      threshold: m.result_json?.threshold ?? '-',
      value: m.confidence_score ?? m.result_json?.value ?? '-',
      result: m.predicted_model ?? m.result_json?.result ?? '-',
      weight: m.result_json?.weight ?? '-'
    }))
  };

  const final = {
    result:
      apiData.final_is_ai != null
        ? apiData.final_is_ai
          ? 'AI 생성 이미지'
          : '실제 촬영 이미지'
        : '분석 결과 없음',
    model: apiData.final_generator_model ?? '-',
    confidence: Math.round(apiData.final_ai_probability ?? 0)
  };

  const imageUrl = apiData.image_url?.startsWith('http')
    ? apiData.image_url
    : apiData.image_url
      ? `${API_BASE_URL.replace(/\/$/, '')}${apiData.image_url.startsWith('/') ? '' : '/'}${apiData.image_url}`
      : null;

  return {
    image: imageUrl,
    c2pa,
    binary,
    multiclass,
    final
  };
}
