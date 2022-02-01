export default {
  name: 'size/px-rootem',
  type: 'value',
  matcher: (prop: any) => prop.attributes.category === 'media',
  transformer: (token: any) => `${(token.value / 16).toFixed(0)}em`
}
