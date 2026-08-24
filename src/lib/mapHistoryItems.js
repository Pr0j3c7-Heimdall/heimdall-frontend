import { formatDateTime, toPercent, toResultLabel } from './format';
import { normalizeMediaUrl } from './mediaUrl';

function toHistoryList(apiData) {
  if (Array.isArray(apiData)) return apiData;
  return apiData?.items ?? apiData?.histories ?? [];
}

/** 마이페이지 검증 내역 API 응답을 테이블/카드용 목록으로 변환 */
export function mapHistoryToItems(apiData, idKey) {
  const isImage = idKey === 'image_id';

  return toHistoryList(apiData).map((item) => ({
    id: String(item[idKey] ?? ''),
    type: isImage ? 'image' : 'audio',
    fileName: item.filename ?? '-',
    thumbnailUrl: isImage ? normalizeMediaUrl(item.image_url) : null,
    result: toResultLabel(item.is_ai ?? item.final_is_ai),
    confidence: toPercent(item.ai_probability ?? item.final_ai_probability ?? 0),
    date: formatDateTime(item.created_at)
  }));
}
