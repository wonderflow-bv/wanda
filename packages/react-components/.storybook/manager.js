import { addons } from '@storybook/addons';
import { themes } from '@storybook/theming';
import wonderflowThemeDark from './wonderflow-theme-dark';

addons.setConfig({
  theme: {...themes.dark, ...wonderflowThemeDark},
  sidebar: {
    showRoots: true,
  },
});
