import { formatDateTime, toPercent, toResultLabel } from './format';

/** 마이페이지 검증 내역 API 응답을 테이블/카드용 목록으로 변환 */
export function mapHistoryToItems(apiData, idKey) {
  const raw = Array.isArray(apiData) ? apiData : apiData?.histories ?? apiData?.items ?? [];

  return raw.map((item) => {
    const rawResult =
      item.result ?? (item.is_ai != null ? item.is_ai : item.final_is_ai != null ? item.final_is_ai : null);

    return {
      id: String(item[idKey] ?? item.history_id ?? item.id ?? ''),
      type: item.file_type ?? (idKey === 'audio_id' ? 'audio' : 'image'),
      fileName: item.filename ?? item.file_name ?? item.fileName ?? item.original_filename ?? '-',
      result: toResultLabel(rawResult),
      confidence: toPercent(item.ai_probability ?? item.confidence ?? item.final_ai_probability ?? 0),
      date: formatDateTime(item.created_at ?? item.completed_at ?? item.date)
    };
  });
}
