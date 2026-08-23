/**
 * Heimdall API / FastAPI axios 에러에서 사용자 표시용 메시지 추출
 *
 * 지원 형식:
 * - Heimdall: { success: false, error: { message, code } }
 * - FastAPI 422: { detail: string | { msg }[] }
 * - 업로드 실패 등: { data: { result: string } } 또는 { result: string }
 */
export function parseApiError(error, fallback = '요청에 실패했습니다.') {
  const data = error?.response?.data;

  if (data && typeof data === 'object') {
    const apiMessage = data.error?.message;
    if (typeof apiMessage === 'string' && apiMessage.trim()) {
      return apiMessage;
    }

    const inlineResult = data.result ?? data.data?.result;
    if (typeof inlineResult === 'string' && inlineResult.trim()) {
      return inlineResult;
    }

    const { detail } = data;
    if (typeof detail === 'string' && detail.trim()) {
      return detail;
    }
    if (Array.isArray(detail) && detail.length > 0) {
      const first = detail[0];
      if (typeof first === 'string') return first;
      if (typeof first?.msg === 'string') return first.msg;
    }
  }

  if (typeof error?.message === 'string' && error.message.trim()) {
    return error.message;
  }

  return fallback;
}
