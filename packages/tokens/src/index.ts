import CssBezier from './transformers/css-bezier'
import HexHslValues from './transformers/hex-hslvalues'
import SizePxToRem from './transformers/px-rem'
import SizePxToRootEm from './transformers/px-rootem'

const StyleDictionary = require('style-dictionary').extend('src/tokens.config.js')

/**
 * Register custom transformers to process token values for
 * the web platform
 */
StyleDictionary.registerTransform(HexHslValues)
StyleDictionary.registerTransform(SizePxToRem)
StyleDictionary.registerTransform(SizePxToRootEm)
StyleDictionary.registerTransform(CssBezier)

/**
 * Add the custom transformers to a new transformGroup `custom-web`
 * used inside tokens.config.json
 */
StyleDictionary.registerTransformGroup({
  name: 'custom-web',
  transforms: [
    'attribute/cti',
    'name/cti/kebab',
    'time/seconds',
    'content/icon',
    'size/px-rootem',
    'size/px-rem',
    'color/hslvalue',
    'easing/cubic-bezier'
  ]
})

/**
 * Manually run StyleDictionary for all the configured platforms
 */
StyleDictionary.buildAllPlatforms()
