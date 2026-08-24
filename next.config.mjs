import { apiBaseUrl } from './apiBaseUrl.mjs';

// rewrites()가 실제로 프록시할 대상. 브라우저에 노출되는 apiBaseUrl(프로덕션에서는
// 상대경로 /api)과 달리, docker 내부 네트워크에서 backend 컨테이너에 도달하는
// 주소가 필요하다. 미설정 시(로컬 개발 등, apiBaseUrl이 이미 절대 URL인 경우)
// apiBaseUrl로 폴백한다.
const internalBackendUrl = process.env.BACKEND_INTERNAL_URL || apiBaseUrl;

const backendOrigin = (() => {
  try {
    return new URL(apiBaseUrl).origin;
  } catch {
    return 'http://localhost:8000';
  }
})();

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://accounts.google.com https://vercel.live https://va.vercel-scripts.com https://*.clarity.ms;
    style-src 'self' 'unsafe-inline' https://accounts.google.com https://fonts.googleapis.com;
    img-src 'self' blob: data: ${backendOrigin} https://www.googletagmanager.com https://flagcdn.com https://*.openstreetmap.org https://*.clarity.ms https://*.bing.com https://lh3.googleusercontent.com https://heimdall.ai.kr https://*.cloudfront.net;
    font-src 'self' https://*.gstatic.com;
    object-src 'self';
    base-uri 'self';
    form-action 'self';
    media-src 'self' ${backendOrigin} https://*.cloudfront.net https://heimdall.ai.kr;
    frame-src 'self' https://accounts.google.com;
    connect-src 'self' http://localhost:8000 ${apiBaseUrl} https://www.googletagmanager.com https://accounts.google.com https://raw.githubusercontent.com https://*.clarity.ms https://*.azurewebsites.net;
`;

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'flagcdn.com', pathname: '**' },
      { protocol: 'http', hostname: 'localhost', pathname: '/**' },
      { protocol: 'http', hostname: '127.0.0.1', pathname: '/**' },
      { protocol: 'https', hostname: 'heimdall.ai.kr', pathname: '/**' },
      { protocol: 'https', hostname: '*.cloudfront.net', pathname: '/**' },
      ...(typeof apiBaseUrl === 'string' && apiBaseUrl
        ? (() => {
            try {
              const u = new URL(apiBaseUrl);
              return [{ protocol: u.protocol.replace(':', ''), hostname: u.hostname, pathname: '/**' }];
            } catch {
              return [];
            }
          })()
        : [])
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, '')
          }
        ]
      }
    ];
  },
  async rewrites() {
    const backend = internalBackendUrl.replace(/\/$/, '');
    return [
      {
        source: '/uploads/:path*',
        destination: `${backend}/uploads/:path*`,
      },
      {
        source: '/api/:path*',
        destination: `${backend}/:path*`,
      },
    ];
  }
};

export default nextConfig;