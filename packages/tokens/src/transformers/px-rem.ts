export default {
  name: 'size/px-rem',
  type: 'value',
  matcher: (prop: any) => prop.attributes.category === 'size',
  transformer: (token: any, options: any) => {
    const baseRootSize = options?.basePxFontSize;
    return `${(token.value / baseRootSize).toFixed(2)}rem`;
  },
};
