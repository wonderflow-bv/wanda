import '../dist/themes.css';
import '../src/core.css';
import './overrides.css';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  themes: {
    default: 'light',
    list: [
      { name: 'auto', color: 'linear-gradient(to bottom right, lightgray 50%, black 50.1%)' },
      { name: 'light', color: 'lightgray' },
      { name: 'dark', color: 'black' }
    ],
    onChange: (theme) => {
      const iframe = document.querySelector('#storybook-preview-iframe');
      if (theme) {
        iframe.contentDocument.documentElement.dataset.theme = theme.name
      } else {
        iframe.contentDocument.documentElement.dataset.theme = 'auto'
      }
    },
    target: 'root'
  }
}
