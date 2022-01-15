module.exports = {
  name: 'easing/cubic-bezier',
  type: 'value',
  matcher: (prop) => {
    return prop.attributes.category === 'easing'
  },
  transformer: (token) => {
    return `cubic-bezier(${token.value.join(', ')})`
  }
}
