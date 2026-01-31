import StatusPage from '@/components/StatusPage';

export default function NotFound() {
  return (
    <StatusPage
      statusCode={404}
      title="페이지를 찾을 수 없습니다"
      message="요청하신 페이지가 없거나 이동되었을 수 있습니다."
      primaryAction={{ label: '홈으로', href: '/' }}
    />
  );
}
