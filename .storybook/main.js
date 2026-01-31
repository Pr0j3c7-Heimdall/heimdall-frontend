/** @type { import('@storybook/nextjs-vite').StorybookConfig } */
const config = {
  stories: ['../src/stories/Intro.stories.jsx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [],
  framework: '@storybook/nextjs-vite',
  staticDirs: ['../public'],
  async viteFinal(config) {
    return {
      ...config,
      define: {
        ...config.define,
        'process.env.NEXT_PUBLIC_BASE_NAME': JSON.stringify(process.env.NEXT_PUBLIC_BASE_NAME || '/'),
        'process.env.NEXT_PUBLIC_METADATA_BASE': JSON.stringify(process.env.NEXT_PUBLIC_METADATA_BASE || 'http://localhost:3000')
      }
    };
  }
};

module.exports = config;
