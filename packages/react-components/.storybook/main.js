const path = require('path');

module.exports = {
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  staticDirs: ['../public'],
  features: {
    storyStoreV7: true,
  },
  core: {
    builder: 'webpack5',
  },
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    'storybook-css-modules-preset',
    'storybook-addon-themes', {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false,
      },
    }, {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
    'storybook-addon-breakpoints',
    '@storybook/addon-a11y',
    '@storybook/addon-coverage',
  ],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: prop => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  webpackFinal: async (config) => {
    config.resolve.alias['@/components'] = path.resolve(__dirname, '../src/');
    config.resolve.alias['@/charts-components'] = path.resolve(__dirname, '../../charts/src/');
    config.resolve.alias['@/hooks'] = path.resolve(__dirname, '../../charts/src/');
    config.resolve.alias['@/providers'] = path.resolve(__dirname, '../../charts/src/');
    config.resolve.alias['@/styleConfig'] = path.resolve(__dirname, '../../charts/src/');
    config.resolve.alias['@/types'] = path.resolve(__dirname, '../../charts/src/');
    config.resolve.alias['@/utils'] = path.resolve(__dirname, '../../charts/src/');
    return config;
  },
  framework: '@storybook/react',
};
