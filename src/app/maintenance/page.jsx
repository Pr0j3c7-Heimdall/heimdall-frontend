import StatusPage from '@/components/StatusPage';

export default function MaintenancePage() {
  return (
    <StatusPage
      title="서비스 점검 중입니다"
      message={'더 나은 서비스를 위해 잠시 점검 중입니다.\n빠른 시일 내에 다시 이용하실 수 있습니다.'}
      primaryAction={{ label: '홈으로', href: '/' }}
    />
  );
}
