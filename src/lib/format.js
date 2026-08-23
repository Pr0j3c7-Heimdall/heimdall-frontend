/** 0~1 또는 0~100 확률 값을 정수 퍼센트로 변환 */
export function toPercent(value) {
  if (value == null) return 0;
  const num = Number(value);
  if (Number.isNaN(num)) return 0;
  return num <= 1 ? Math.round(num * 100) : Math.round(num);
}

/** ISO 날짜 문자열을 `YYYY-MM-DD HH:mm` 형식으로 표시 */
export function formatDateTime(value) {
  if (!value) return '-';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${y}-${m}-${day} ${hh}:${mm}`;
}

/** 바이트 크기를 B / KB / MB 문자열로 표시 */
export function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** API is_ai / final_is_ai 등 다양한 결과 값을 AI | Real | - 로 통일 */
export function toResultLabel(value) {
  if (value === 'AI' || value === 'AI생성' || value === true) return 'AI';
  if (value === 'Real' || value === '자연' || value === false) return 'Real';
  return value ?? '-';
}
