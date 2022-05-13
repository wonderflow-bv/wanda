// eslint-disable-next-line import/no-extraneous-dependencies
import Color from 'tinycolor2';

export default {
  name: 'color/hslvalue',
  type: 'value',
  matcher: (prop: any) => prop.attributes.category === 'color',
  transformer: (token: any) => {
    const color = Color(token.value);
    const o = color.toHsl();
    const vals = `${Math.round(o.h)} ${Math.round(o.s * 100)}% ${Math.round(o.l * 100)}%`;

    if (color.getAlpha() === 1) {
      return `${vals}`;
    }
    return `${vals} / ${o.a}`;
  },
};
