import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

const ACCESS_TOKEN_KEY = 'heimdall_access_token';
const REFRESH_TOKEN_KEY = 'heimdall_refresh_token';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

// 로그인된 경우 accessToken을 Authorization 헤더에 추가
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

/**
 * 구글 ID 토큰으로 백엔드 로그인(겸 가입) API 호출
 * @param {string} idToken - 구글 ID Token (credential from Google OAuth)
 * @returns {Promise<{ success: boolean, data?: { accessToken, refreshToken, isNewUser } }>}
 */
export async function loginWithGoogle(idToken) {
  const url = `${API_BASE_URL}/api/v1/auth/login`;
  console.log('[Auth] POST 요청:', url);
  const { data } = await api.post(
    '/api/v1/auth/login',
    { provider: 'google', idToken },
    { headers: { 'Content-Type': 'application/json' } }
  );
  if (data?.success && data?.data) {
    const { accessToken, refreshToken } = data.data;
    if (accessToken && typeof window !== 'undefined') {
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    }
    if (refreshToken && typeof window !== 'undefined') {
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }
  }
  return data;
}

export function getAccessToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function clearTokens() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

/**
 * 로그아웃 API (refresh token 삭제, access token 블랙리스트 등록)
 * @param {string} refreshToken - 리프레시 토큰
 * @param {string|null} [accessToken] - 액세스 토큰 (블랙리스트용, 선택)
 */
export async function logoutApi(refreshToken, accessToken = null) {
  await api.post('/api/v1/auth/logout', {
    refreshToken,
    accessToken: accessToken ?? undefined
  });
}

/**
 * 회원탈퇴 API (status=DELETED, deleted_at 기록)
 * DELETE /api/v1/auth/me
 * Authorization: Bearer {accessToken} 필요
 */
export async function withdrawApi() {
  await api.delete('/api/v1/auth/me');
}

/**
 * 회원정보 조회 API
 * GET /api/v1/users/me
 * Authorization: Bearer {accessToken} 필요
 * @returns {Promise<{ success: boolean, data?: { name, email, createdAt } }>}
 */
export async function getMeApi() {
  const { data } = await api.get('/api/v1/users/me');
  return data;
}

/**
 * 액세스 토큰 재발급 (리프레시 토큰 사용)
 * @param {string} refreshToken - 리프레시 토큰
 * @returns {Promise<{ success: boolean, data?: { accessToken, refreshToken? } }>}
 */
export async function refreshAccessToken(refreshToken) {
  const { data } = await api.post('/api/v1/auth/refresh', { refreshToken });
  if (data?.success && data?.data && typeof window !== 'undefined') {
    const { accessToken, refreshToken: newRefreshToken } = data.data;
    if (accessToken) localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    if (newRefreshToken) localStorage.setItem(REFRESH_TOKEN_KEY, newRefreshToken);
  }
  return data;
}

// 401 시 토큰 재발급 시도 후 재요청, 실패 시 로그아웃 처리
let isRefreshing = false;
let failedQueue = [];

function processQueue(err, token = null) {
  failedQueue.forEach(({ resolve, reject, config }) => {
    if (err) reject(err);
    else {
      if (config && token) config.headers.Authorization = `Bearer ${token}`;
      resolve(token);
    }
  });
  failedQueue = [];
}

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (err?.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(err);
    }
    const skipRetry =
      originalRequest.url?.includes('/auth/refresh') ||
      originalRequest.url?.includes('/auth/logout') ||
      (originalRequest.url?.includes('/auth/me') && originalRequest.method?.toLowerCase() === 'delete');
    if (skipRetry) {
      return Promise.reject(err);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject, config: originalRequest });
      }).then(() => api(originalRequest));
    }

    originalRequest._retry = true;
    isRefreshing = true;
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      clearTokens();
      if (typeof window !== 'undefined') window.location.href = '/';
      return Promise.reject(err);
    }

    try {
      const data = await refreshAccessToken(refreshToken);
      if (data?.success) {
        processQueue(null, getAccessToken());
        originalRequest.headers.Authorization = `Bearer ${getAccessToken()}`;
        return api(originalRequest);
      }
    } catch (refreshErr) {
      processQueue(refreshErr, null);
      clearTokens();
      if (typeof window !== 'undefined') window.location.href = '/';
      return Promise.reject(refreshErr);
    } finally {
      isRefreshing = false;
    }

    return Promise.reject(err);
  }
);
