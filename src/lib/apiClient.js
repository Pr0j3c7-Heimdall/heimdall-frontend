import axios from 'axios';
import { getAccessToken, getRefreshToken, clearTokens, setTokens } from './tokens';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export const apiClient = axios.create({
  baseURL: API_BASE_URL
});

apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  if (!config.headers['Content-Type'] && !(config.data instanceof FormData)) {
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
});

export async function refreshAccessToken(refreshToken) {
  const { data } = await apiClient.post('/api/v1/auth/refresh', { refreshToken });
  if (data?.success && data?.data) {
    const { accessToken, refreshToken: newRefreshToken } = data.data;
    setTokens(accessToken, newRefreshToken);
  }
  return data;
}

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

apiClient.interceptors.response.use(
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
      }).then(() => apiClient(originalRequest));
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
        return apiClient(originalRequest);
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
