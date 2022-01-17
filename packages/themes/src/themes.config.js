const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv
const tksn = require('@wonderflow/tokens/platforms/web/tokens.json')

module.exports = {
  source: [`./src/themes/${argv.name}.json`],
  tokens: {
    ...tksn
  },
  platforms: {
    web: {
      buildPath: 'dist/themes/',
      transformGroup: 'css',
      files: [
        {
          format: 'css/variables',
          destination: `${argv.name}.css`
        },
        {
          format: 'json/flat',
          destination: `${argv.name}.json`
        }
      ],
      options: {
        showFileHeader: true
      }
    }
  }
}
