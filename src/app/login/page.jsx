'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthModal } from '@/contexts/AuthModalContext';

export default function LoginPage() {
  const router = useRouter();
  const { openAuthModal } = useAuthModal();

  useEffect(() => {
    openAuthModal('login');
    router.replace('/');
  }, [openAuthModal, router]);

  return null;
}
