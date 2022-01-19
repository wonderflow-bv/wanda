const assert = require('uvu/assert')
const { suite } = require('uvu')
const Tkns = require('../platforms/web/tokens.json')

const Tokens = suite('Tokens')
Tokens('Tokens should matches original', () => {
  const output = JSON.stringify(Tkns)
  assert.equal(JSON.parse(output), Tkns, 'matches original')
})

Tokens.run()
