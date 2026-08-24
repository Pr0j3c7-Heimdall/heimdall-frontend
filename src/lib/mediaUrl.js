import { API_BASE_URL } from './apiClient';

/** /uploads/... 경로는 same-origin 프록시로 제공 (CSP·CORS 회피) */
function toSameOriginUploads(pathname, search = '') {
  if (pathname.startsWith('/uploads/')) {
    return `${pathname}${search}`;
  }
  return null;
}

/** API가 반환하는 상대·불완전 URL을 브라우저에서 사용 가능한 URL로 변환 */
export function normalizeMediaUrl(rawUrl) {
  if (!rawUrl) return null;
  if (rawUrl.startsWith('blob:') || rawUrl.startsWith('data:')) return rawUrl;

  if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) {
    try {
      const parsed = new URL(rawUrl);
      const sameOrigin = toSameOriginUploads(parsed.pathname, parsed.search);
      if (sameOrigin) return sameOrigin;
    } catch {
      // fall through
    }
    return rawUrl;
  }

  if (rawUrl.startsWith('heimdall.ai.kr/')) {
    try {
      const parsed = new URL(`https://${rawUrl}`);
      const sameOrigin = toSameOriginUploads(parsed.pathname, parsed.search);
      if (sameOrigin) return sameOrigin;
    } catch {
      // fall through
    }
    return `https://${rawUrl}`;
  }

  const path = rawUrl.startsWith('/') ? rawUrl : `/${rawUrl}`;
  const sameOrigin = toSameOriginUploads(path);
  if (sameOrigin) return sameOrigin;

  const base = API_BASE_URL.replace(/\/$/, '');
  return `${base}${path}`;
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
