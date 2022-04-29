export default {
  name: 'easing/cubic-bezier',
  type: 'value',
  matcher: (prop: any) => prop.attributes.category === 'css-easing',
  transformer: (token: any) => `cubic-bezier(${token.value.join(', ')})`
}
