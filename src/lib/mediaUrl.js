import { API_BASE_URL } from './apiClient';

/** API가 반환하는 상대·불완전 URL을 브라우저에서 사용 가능한 절대 URL로 변환 */
export function normalizeMediaUrl(rawUrl) {
  if (!rawUrl) return null;
  if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) return rawUrl;
  if (rawUrl.startsWith('heimdall.ai.kr/')) return `https://${rawUrl}`;
  const base = API_BASE_URL.replace(/\/$/, '');
  return `${base}${rawUrl.startsWith('/') ? '' : '/'}${rawUrl}`;
}

export function fileNameFromUrl(url, fallback = 'file') {
  if (!url) return fallback;
  try {
    const pathname = new URL(url, API_BASE_URL).pathname;
    const name = pathname.split('/').pop();
    return name || fallback;
  } catch {
    const parts = url.split('/');
    return parts[parts.length - 1] || fallback;
  }
}
