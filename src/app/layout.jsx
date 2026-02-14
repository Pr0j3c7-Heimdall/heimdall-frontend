import './globals.css';
import AppGoogleOAuthProvider from './GoogleOAuthProvider';
import AuthModalProvider from '@/components/AuthModal/AuthModalProvider';
import { AuthProvider } from '@/contexts/AuthContext';

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <AppGoogleOAuthProvider>
          <AuthProvider>
            <AuthModalProvider>{children}</AuthModalProvider>
          </AuthProvider>
        </AppGoogleOAuthProvider>
      </body>
    </html>
  );
}
