const StyleDictionary = require('style-dictionary').extend('src/themes/themes.config.js')

/**
 * Manually run StyleDictionary for all the configured platforms
 */
console.clear()
StyleDictionary.buildAllPlatforms()
