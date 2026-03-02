/**
 * 메타데이터 설정 - 카카오톡, SNS 링크 공유 시 미리보기
 */

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadataConfig = {
  title: {
    default: 'Heimdall | AI 콘텐츠 검증',
    template: '%s | Heimdall'
  },
  description: '이미지, 음성의 AI 생성 여부를 검사하세요. Heimdall로 신뢰할 수 있는 검증 결과를 확인할 수 있습니다.',
  keywords: ['AI', '콘텐츠 검증', '딥페이크', '이미지 검사', '음성 검사'],
  authors: [{ name: 'Heimdall' }],
  creator: 'Heimdall',
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: siteUrl,
    siteName: 'Heimdall',
    title: 'Heimdall | AI 콘텐츠 검증',
    description: '이미지, 음성의 AI 생성 여부를 검사하세요. Heimdall로 신뢰할 수 있는 검증 결과를 확인할 수 있습니다.',
    images: [
      {
        url: '/assets/images/metadata/og.png',
        width: 1200,
        height: 630,
        alt: 'Heimdall - AI 콘텐츠 검증'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Heimdall | AI 콘텐츠 검증',
    description: '이미지, 음성의 AI 생성 여부를 검사하세요. Heimdall로 신뢰할 수 있는 검증 결과를 확인할 수 있습니다.',
    images: ['/assets/images/metadata/og.png']
  },
  robots: {
    index: true,
    follow: true
  }
};
