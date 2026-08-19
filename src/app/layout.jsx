import './globals.css';
import AppGoogleOAuthProvider from './GoogleOAuthProvider';
import AuthModalProvider from '@/components/AuthModal/AuthModalProvider';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { metadataConfig } from '@/config/metadata';

export const metadata = metadataConfig;

const themeScript = `
(function(){
  var t = localStorage.getItem('theme');
  if (t === 'dark') document.documentElement.setAttribute('data-theme','dark');
  else if (t !== 'light' && typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
    document.documentElement.setAttribute('data-theme','dark');
})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <AppGoogleOAuthProvider>
          <ThemeProvider>
            <AuthProvider>
              <AuthModalProvider>{children}</AuthModalProvider>
            </AuthProvider>
          </ThemeProvider>
        </AppGoogleOAuthProvider>
      </body>
    </html>
  );
}
