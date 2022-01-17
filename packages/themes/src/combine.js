const fs = require('fs-extra')
const path = require('path')

const formatTheme = (path, name) => {
  const theme = fs.readFileSync(path, 'utf8', (err, data) => {
    if (err) {
      return err
    }
  })
  return theme.replace(':root {', '').replace('}', '')
}

const run = () => {
  const lightTheme = formatTheme(path.join('dist', 'themes', 'light.css'), 'light')
  const darkTheme = formatTheme(path.join('dist', 'themes', 'dark.css'), 'dark')

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
  `

  fs.writeFileSync(path.join('dist', 'themes.css'), template)
}

try {
  run()
  process.exit(0)
} catch (error) {
  console.log('————————————————————————————————————————————————————————————————————————————————————— \n')
  console.error('⚠️  Something went wrong:', error)
  console.log('\n————————————————————————————————————————————————————————————————————————————————————— \n\n')
  process.exit(1)
}
