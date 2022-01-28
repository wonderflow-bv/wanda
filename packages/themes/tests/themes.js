const assert = require('uvu/assert')
const { suite } = require('uvu')
const Theme = require('../dist/themes/light.json')

const THEME_TOT_KEYS = 35

const Themes = suite('Themes')
Themes('Light should include all keys', () => {
  assert.is(Object.keys(Theme).length, THEME_TOT_KEYS)
})

Themes('Theme should includes globals', () => {
  assert.ok(Object.keys(Theme).includes('global-foreground'))
})

Themes('Theme should includes cta', () => {
  assert.ok(Object.keys(Theme).includes('cta-default'))
})

Themes('Theme should includes dimmed', () => {
  assert.ok(Object.keys(Theme).includes('dimmed-0'))
})

Themes('Theme should includes dimmed', () => {
  assert.ok(Object.keys(Theme).includes('highlight-gray-background'))
})

Themes('Theme should matches original', () => {
  const output = JSON.stringify(Theme)
  assert.equal(JSON.parse(output), Theme, 'matches original')
})

Themes.run()
