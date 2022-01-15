import { addons } from '@storybook/addons';
import wondertheme from './wonderflow-theme';

addons.setConfig({
  theme: wondertheme,
  sidebar: {
    showRoots: true,
  },
});
