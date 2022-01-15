module.exports = {
  name: 'size/px-rem',
  type: 'value',
  matcher: (prop) => {
    return prop.attributes.category === 'size'
  },
  transformer: (token, options) => {
    const baseRootSize = options && options.basePxFontSize
    return `${(token.value / baseRootSize).toFixed(2)}rem`
  }
}
