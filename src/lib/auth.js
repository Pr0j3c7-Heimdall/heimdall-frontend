import { apiClient, refreshAccessToken } from './apiClient';
import { getAccessToken, getRefreshToken, clearTokens, setTokens } from './tokens';

export { getAccessToken, getRefreshToken, clearTokens, refreshAccessToken };

/**
 * 구글 ID 토큰으로 백엔드 로그인(겸 가입) API 호출
 * @param {string} idToken - 구글 ID Token (credential from Google OAuth)
 * @returns {Promise<{ success: boolean, data?: { accessToken, refreshToken, isNewUser } }>}
 */
export async function loginWithGoogle(idToken) {
  const { data } = await apiClient.post(
    '/api/v1/auth/login',
    { provider: 'google', idToken },
    { headers: { 'Content-Type': 'application/json' } }
  );
  if (data?.success && data?.data) {
    const { accessToken, refreshToken } = data.data;
    setTokens(accessToken, refreshToken);
  }
  return data;
}

/**
 * 로그아웃 API (refresh token 삭제, access token 블랙리스트 등록)
 * @param {string} refreshToken - 리프레시 토큰
 * @param {string|null} [accessToken] - 액세스 토큰 (블랙리스트용, 선택)
 */
export async function logoutApi(refreshToken, accessToken = null) {
  await apiClient.post('/api/v1/auth/logout', {
    refreshToken,
    accessToken: accessToken ?? undefined
  });
}

/**
 * 회원탈퇴 API (status=DELETED, deleted_at 기록)
 * DELETE /api/v1/auth/me
 */
export async function withdrawApi() {
  await apiClient.delete('/api/v1/auth/me');
}

/**
 * 회원정보 조회 API
 * GET /api/v1/users/me
 * @returns {Promise<{ success: boolean, data?: { name, email, createdAt } }>}
 */
export async function getMeApi() {
  const { data } = await apiClient.get('/api/v1/users/me');
  return data;
}
