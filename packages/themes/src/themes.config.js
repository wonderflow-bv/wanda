/* eslint-disable @typescript-eslint/no-var-requires, global-require */

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const { argv } = yargs(hideBin(process.argv));
const tkns = require('@wonderflow/tokens/platforms/web/tokens.json');

module.exports = {
  source: [`./src/${argv.name as string || 'light'}.json`],
  tokens: {
    ...tkns,
  },
  platforms: {
    web: {
      buildPath: 'dist/themes/',
      transformGroup: 'css',
      files: [
        {
          format: 'css/variables',
          destination: `${argv.name as string || 'light'}.css`,
        },
        {
          format: 'json/flat',
          destination: `${argv.name as string || 'light'}.json`,
        },
      ],
      options: {
        showFileHeader: true,
      },
    },
  },
};
