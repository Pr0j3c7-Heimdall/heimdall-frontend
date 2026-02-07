'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthModal } from '@/contexts/AuthModalContext';

export default function RegisterPage() {
  const router = useRouter();
  const { openAuthModal } = useAuthModal();

  useEffect(() => {
    openAuthModal('register');
    router.replace('/');
  }, [openAuthModal, router]);

  return null;
}
