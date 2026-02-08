import Footer from './Footer';

export default {
  title: 'Components/Footer',
  component: Footer
};

export const Default = {
  args: {
    links: [
      { href: '/privacy', label: '개인정보처리방침' },
      { href: '/terms', label: '이용약관' }
    ]
  },
  parameters: { layout: 'fullscreen' }
};
