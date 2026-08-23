const POLL_INTERVAL_MS = 2000;
const POLL_MAX_ATTEMPTS = 60;

const COMPLETED_STATUSES = new Set(['completed', 'done', 'success']);
const FAILED_STATUSES = new Set(['failed', 'error']);

/**
 * 비동기 검증 상태를 폴링하여 완료/실패/타임아웃을 판별
 * @param {(id: number) => Promise<{ data?: { analysis_status?: string } }>} fetchStatus
 * @param {number} resourceId
 * @returns {Promise<{ ok: true } | { ok: false, error: string }>}
 */
export async function pollDetectionStatus(fetchStatus, resourceId) {
  let attempts = 0;

  while (attempts < POLL_MAX_ATTEMPTS) {
    const statusRes = await fetchStatus(resourceId);
    const status = statusRes?.data?.analysis_status?.toLowerCase?.();

    if (COMPLETED_STATUSES.has(status)) {
      return { ok: true };
    }
    if (FAILED_STATUSES.has(status)) {
      return { ok: false, error: '분석에 실패했습니다.' };
    }

    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
    attempts += 1;
  }

  return { ok: false, error: '분석 시간이 초과되었습니다. 잠시 후 다시 시도해 주세요.' };
}
