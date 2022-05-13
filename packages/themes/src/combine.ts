/* eslint-disable import/no-extraneous-dependencies */
import fs from 'fs-extra';
import path from 'path';

const formatTheme = (path: string) => {
  const theme = fs.readFileSync(path, 'utf8');
  return theme.replace(':root {', '').replace('}', '');
};

const run = () => {
  const lightTheme = formatTheme(path.join('dist', 'themes', 'light.css'));
  const darkTheme = formatTheme(path.join('dist', 'themes', 'dark.css'));

  const template = `
  :root,
  [data-theme='light'] {
    color: var(--global-foreground);
    ${lightTheme}
  }

  @media (prefers-color-scheme: dark) {
    :root:not([data-theme='light']) {
      color: var(--global-foreground);
      ${darkTheme}
    }
  }

  [data-theme='dark'],
  :root[data-theme='dark'] {
    color: var(--global-foreground);
    ${darkTheme}
  }
  `;

  fs.writeFileSync(path.join('dist', 'themes.css'), template);
};

try {
  run();
  process.exit(0);
} catch (error) {
  console.log('————————————————————————————————————————————————————————————————————————————————————— \n');
  console.error('⚠️  Something went wrong:', error);
  console.log('\n————————————————————————————————————————————————————————————————————————————————————— \n\n');
  process.exit(1);
}
