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

export function clearTokens() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}
