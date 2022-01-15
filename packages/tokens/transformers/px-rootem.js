module.exports = {
  name: 'size/px-rootem',
  type: 'value',
  matcher: (prop) => {
    return prop.attributes.category === 'media'
  },
  transformer: (token) => {
    return `${(token.value / 16).toFixed(0)}em`
  }
}
