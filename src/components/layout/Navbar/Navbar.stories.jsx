import Navbar from './Navbar';

export default {
  title: 'Components/Navbar',
  component: Navbar
};

const defaultNavItems = [
  { href: '/#features', label: '기능' },
  { href: '/#about', label: '소개' },
  { href: '/#contact', label: '문의' }
];

export const Default = {
  args: {
    navItems: defaultNavItems,
    cta: { href: '/start', label: '시작하기' }
  },
  parameters: { layout: 'fullscreen' }
};
