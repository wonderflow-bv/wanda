/* eslint-disable @typescript-eslint/no-var-requires, no-console */

const svgstore = require('svgstore')
const path = require('path')
const fs = require('fs-extra')
const dt = require('directory-tree')
const { createSpinner } = require('nanospinner')
const colors = require('picocolors')

const generateTypes = jsonStructure => `
export type IconNames = '${jsonStructure.iconNames.join('\' |\n\'')}';
export type IconStyles = '${jsonStructure.iconStyles.join('\' |\n\'')}';
`

const run = () => {
  const spinner = createSpinner('Processing icons...').start()
  const directories = dt(path.join('dist', 'svgs'))
  fs.ensureDirSync('dist')

  const jsonStructure = {
    svgs: {},
    iconNames: [],
    iconStyles: []
  }

  const sprite = svgstore()

  directories.children.forEach((dir) => {
    jsonStructure.svgs[dir.name] = []
    jsonStructure.iconStyles.push(dir.name)
    dir.children && dir.children.forEach((file) => {
      const formattedName = file.name.replace(/-\d.*/gm, '').replace('.svg', '').replace(/(-solid|-outline).*?/gm, '')
      const iconID = `${dir.name}/${formattedName}`

      sprite.add(iconID, fs.readFileSync(file.path, 'utf8'))
      jsonStructure.svgs[dir.name].push(file.name)
      jsonStructure.iconNames.push(`${formattedName}`)
    })
  })
  fs.writeFileSync(path.join('dist', 'sprite.svg'), sprite)
  fs.writeFileSync(path.join('dist', 'sprite.d.ts'), `
declare module "@wonderflow/icons/sprite" {
  const svgUrl: string
  const svgComponent: React.StatelessComponent<React.SVGAttributes<SVGElement>>
  export default svgUrl
  export { svgComponent as ReactComponent }
}
`)
  fs.writeFileSync(path.join('dist', 'structure.json'), JSON.stringify([...new Set(jsonStructure.iconNames)], null, 2))
  fs.writeFileSync(path.join('dist', 'index.ts'), generateTypes(jsonStructure))
  console.clear()
  spinner.success({ text: colors.green('Icons and types generated'), mark: colors.green('✔') })
}

try {
  run()
  process.exit(0)
} catch (error) {
  console.error(colors.yellow('⚠️ Something went wrong:'), error)
  process.exit(1)
}
