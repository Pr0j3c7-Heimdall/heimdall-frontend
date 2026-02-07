import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

/**
 * 구글 ID 토큰으로 백엔드 로그인(겸 가입) API 호출
 * @param {string} idToken - 구글 ID Token (credential from Google OAuth)
 * @returns {Promise<{ success: boolean, data?: unknown }>}
 */
export async function loginWithGoogle(idToken) {
  const { data } = await api.post('/api/v1/auth/login', {
    provider: 'google',
    idToken
  });
  return data;
}
