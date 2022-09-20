import '@wonderflow/themes';
import '../src/core.css';
import './overrides.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  themes: {
    list: [
      { name: 'auto', color: 'linear-gradient(to bottom right, lightgray 50%, black 50.1%)' },
      { name: 'light', color: 'lightgray' },
      { name: 'dark', color: 'black', default: true },
    ],
    onChange: (theme) => {
      const iframeDocument = document.querySelector('#storybook-preview-iframe').contentDocument.documentElement;
      if (theme) {
        iframeDocument.dataset.theme = theme.name;
      } else {
        iframeDocument.dataset.theme = 'light';
      }
    },
  },
};
