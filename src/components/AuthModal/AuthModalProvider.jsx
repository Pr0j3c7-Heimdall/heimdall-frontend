'use client';

import AuthModal from './AuthModal';
import { AuthModalProvider as Provider } from '@/contexts/AuthModalContext';

export default function AuthModalProvider({ children }) {
  return (
    <Provider>
      {children}
      <AuthModal />
    </Provider>
  );
}
