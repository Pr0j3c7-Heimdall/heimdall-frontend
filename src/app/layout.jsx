import './globals.css';
import AppGoogleOAuthProvider from './GoogleOAuthProvider';
import AuthModalProvider from '@/components/AuthModal/AuthModalProvider';

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <AppGoogleOAuthProvider>
          <AuthModalProvider>{children}</AuthModalProvider>
        </AppGoogleOAuthProvider>
      </body>
    </html>
  );
}
