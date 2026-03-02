import StatusPage from '@/components/StatusPage';

export default function AudioVerifyPage() {
  return (
    <StatusPage
      title="음성 검사 기능 준비중입니다"
      message={'음성 파일 AI 생성 여부 검사 기능을 준비하고 있습니다.\n조금만 기다려 주세요.'}
      primaryAction={{ label: '이미지 검사하기', href: '/verify/image' }}
      secondaryAction={{ label: '홈으로', href: '/' }}
    />
  );
}
