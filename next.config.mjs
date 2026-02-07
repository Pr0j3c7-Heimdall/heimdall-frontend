/** @type {import('next').NextConfig} */
const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://accounts.google.com https://vercel.live https://va.vercel-scripts.com https://*.clarity.ms https://phpstack-207002-5085356.cloudwaysapps.com;
    style-src 'self' 'unsafe-inline' https://phpstack-207002-5085356.cloudwaysapps.com https://fonts.googleapis.com;
    img-src 'self' blob: data: https://www.googletagmanager.com https://flagcdn.com https://*.openstreetmap.org https://*.clarity.ms https://*.bing.com https://phpstack-207002-5085356.cloudwaysapps.com https://lh3.googleusercontent.com;
    font-src 'self' https://*.gstatic.com;
    object-src 'self';
    base-uri 'self';
    form-action 'self';
    media-src 'self' https://*.cloudfront.net;
    frame-src 'self' https://accounts.google.com;
    connect-src 'self' http://localhost:8000 https://www.googletagmanager.com https://accounts.google.com https://raw.githubusercontent.com https://phpstack-207002-5085356.cloudwaysapps.com https://*.clarity.ms https://*.azurewebsites.net;
`;

const nextConfig = {
  modularizeImports: {
    '@mui/material': {
      transform: '@mui/material/{{member}}'
    },
    '@mui/lab': {
      transform: '@mui/lab/{{member}}'
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        pathname: '**'
      }
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
  }
};

export default nextConfig;
