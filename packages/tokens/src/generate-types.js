// const JsonToTS = require('json-to-ts')
const fs = require('fs-extra')
const path = require('path')

const deeperKeys = ['color', 'font', 'icon']

const printCorrectValue = value => (Number.isNaN(Number(value)) ? `'${value}'` : value)
const getTypeUnion = json => Object.keys(json).reduce(
  (acc, key, index) => acc.concat(`${index !== 0 ? '| ' : ''}${printCorrectValue(key)} `), ''
)

const reduceTokensJson = (tokens) => {
  return Object.keys(tokens).reduce((acc, key) => {
    const jsonEntity = tokens[key]

    if (deeperKeys.includes(key)) {
      return acc.concat(`${key}: { ${reduceTokensJson(jsonEntity)} };\n`)
    } else {
      const allKeysAsTypeUnion = getTypeUnion(jsonEntity)
      return allKeysAsTypeUnion ? acc.concat(`${key}: ${allKeysAsTypeUnion.trimEnd()};\n `) : acc
    }
  }, '')
}

const run = () => {
  const tokens = require('../platforms/web/tokens.json')
  const types = `export type TokensTypes = {\n ${reduceTokensJson(tokens)} \n}`

  fs.writeFileSync(path.join('platforms', 'web', 'index.ts'), types)
}

try {
  run()
  process.exit(0)
} catch (error) {
  console.error('⚠️ Something went wrong:', error)
  process.exit(1)
}
