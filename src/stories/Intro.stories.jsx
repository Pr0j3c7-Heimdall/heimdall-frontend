/**
 * Storybook 진입용 Intro 스토리
 * - 삭제된 스토리 URL 접근 시 기본 폴백
 * - 컴포넌트 스토리 추가 전까지 기본 화면으로 사용
 */
export default {
  title: 'Intro/Welcome',
  parameters: {
    layout: 'fullscreen'
  }
};

export const Default = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: 24,
      fontFamily: 'system-ui, sans-serif',
      textAlign: 'center'
    }}
  >
    <h1 style={{ marginBottom: 8 }}>Heimdall Storybook</h1>
    <p style={{ color: '#666', margin: 0 }}>
      컴포넌트 스토리를 추가하면 여기에 표시됩니다.
    </p>
  </div>
);
