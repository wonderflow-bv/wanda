import _ from 'lodash';

import { cartesianStyleConfig, themeDark } from '../style-config';

export const getCartesianStyleConfigFromTheme = (theme: 'light' | 'dark') => {
  const cStyle = _.cloneDeep(cartesianStyleConfig);

  if (theme === 'dark') {
    cStyle.linearGradient.background.from = themeDark.background.from;
    cStyle.linearGradient.background.to = themeDark.background.to;
    cStyle.axis.axisLineProps.stroke = themeDark.axis.line;
    cStyle.axis.labelProps.fill = themeDark.axis.label;
    cStyle.axis.tickLabelProps.fill = themeDark.axis.tickLabel;
    cStyle.axis.tickLineProps.stroke = themeDark.axis.tick;
    cStyle.grid.rows!.stroke = themeDark.grid.line;
    cStyle.grid.columns!.stroke = themeDark.grid.line;
    cStyle.headings.title.fill = themeDark.headings.title;
    cStyle.headings.subtitle.fill = themeDark.headings.subtitle;
  }

  console.log('getCartesianStyleConfigFromTheme', cStyle);
  console.log('themeDark', themeDark);

  return cStyle;
};
