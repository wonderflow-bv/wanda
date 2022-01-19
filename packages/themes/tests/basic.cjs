const { is, ok } = require('uvu/assert')
const { suite } = require('uvu')
const ThemeLight = require('../dist/themes/light.json')
const ThemeDark = require('../dist/themes/dark.json')

const THEME_TOT_KEYS = 34

const Themes = suite('Themes')
Themes('Light should include all keys', () => {
  is(Object.keys(ThemeLight).length, THEME_TOT_KEYS)
})

Themes('Dark should include all keys', () => {
  is(Object.keys(ThemeDark).length, THEME_TOT_KEYS)
})

Themes('Theme should includes globals', () => {
  ok(Object.keys(ThemeLight).includes('global-foreground'))
})

Themes('Theme should includes cta', () => {
  ok(Object.keys(ThemeLight).includes('cta-default'))
})

Themes('Theme should includes dimmed', () => {
  ok(Object.keys(ThemeLight).includes('dimmed-0'))
})

Themes('Theme should includes dimmed', () => {
  ok(Object.keys(ThemeLight).includes('highlight-gray-background'))
})

Themes.run()
