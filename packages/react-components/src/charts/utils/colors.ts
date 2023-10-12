/*
 * Copyright 2023 Wonderflow Design Team
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
    cStyle.grid.background.from = themeDark.grid.background.from;
    cStyle.grid.background.to = themeDark.grid.background.to;
  }

  return cStyle;
};

export const toHSLA = (hsl: string, alpha: number) => {
  const a = _.clamp(alpha, 0, 1);
  const hsla = hsl.replace('hsl(', 'hsla(').replace(')', ` / ${alpha})`);
  return a < 1 ? hsla : hsl;
};

export const fromHSLA = (hsla: string) => {
  const reStart = /hsla?\s*\(\s*/gi;
  const reSeparator = /[\s,/]+/g;
  const clean = hsla.replace(reStart, '')
    .replace(')', '')
    .trim()
    .split(reSeparator);
  const [h, s, l, a] = clean;
  return {
    h, s, l, a: a ?? '100%',
  };
};
