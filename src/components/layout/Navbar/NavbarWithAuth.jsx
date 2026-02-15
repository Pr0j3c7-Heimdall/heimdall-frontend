'use client';

import Navbar from './Navbar';
import { useAuth, useAuthNavbarButtons } from '@/contexts/AuthContext';

export default function NavbarWithAuth({ navItems, ...rest }) {
  const { logout } = useAuth();
  let { secondaryBtn, primaryBtn } = useAuthNavbarButtons();

  if (primaryBtn?.action === 'logout') {
    primaryBtn = { ...primaryBtn, onClick: logout };
  }

  return <Navbar navItems={navItems} secondaryBtn={secondaryBtn} primaryBtn={primaryBtn} {...rest} />;
}
