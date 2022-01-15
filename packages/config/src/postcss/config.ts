/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import jsonTokens from '@wonderflow/tokens/platforms/web/tokens.json'
import postcssMixins from 'postcss-mixins'
import flatten from 'flat'

/**
 * Prepare env variables from tokens
 * to be assigned to postcss-preset-env
 */
const flatTokens: Record<string, any> = flatten(jsonTokens, {
  delimiter: '-'
})
const environmentVariables = Object.keys(flatTokens).reduce((acc, key) => {
  const newKey = `--${key}`
  acc[newKey] = `${flatTokens[key]}`
  return acc
}, {})

export const postcssConfig = {
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {
      stage: 0,
      importFrom: [{
        environmentVariables
      }],
      features: {
        'logical-properties-and-values': false,
        'prefers-color-scheme-query': false,
        'gap-properties': false
      },
      insertAfter: {
        'custom-media-queries': postcssMixins
      }
    },
    'postcss-mixins': {},
    cssnano: {
      preset: [
        'default',
        {
          discardComments: {
            removeAll: true
          }
        }
      ]
    }
  }
}
