const Color = require('tinycolor2')

module.exports = {
  name: 'color/hslvalue',
  type: 'value',
  matcher: (prop) => {
    return prop.attributes.category === 'color'
  },
  transformer: (token) => {
    const color = Color(token.value)
    const o = color.toHsl()
    const vals = `${Math.round(o.h)} ${Math.round(o.s * 100)}% ${Math.round(o.l * 100)}%`

    if (color.getAlpha() === 1) {
      return `${vals}`
    } else {
      return `${vals} / ${o.a}`
    }
  }
}
