/**
 * Storybook 기본 화면
 */
export default {
  title: 'Intro/Welcome',
  parameters: { layout: 'fullscreen' }
};

export const Default = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: 48,
      fontFamily: 'system-ui, sans-serif',
      textAlign: 'center'
    }}
  >
    <h1 style={{ marginBottom: 16 }}>Heimdall</h1>
    <p style={{ color: '#666', margin: 0 }}>기초 세팅</p>
  </div>
);
