/*
 * Copyright 2023-2024 Wonderflow Design Team
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

import {
  Colors, KpisColorsNames, NeutralsColorNames, ThemeVariants,
} from '../types';

export const colors: Colors = {
  support: {
    white: 'hsl(0 0% 100%)',
    black: 'hsl(0 0% 0%)',
    brand: 'hsl(0, 100%, 47%)',
  },
  primary: {
    0: 'hsl(220 20% 98%)',
    5: 'hsl(220 19% 91%)',
    10: 'hsl(220 16% 85%)',
    20: 'hsl(219 14% 75%)',
    30: 'hsl(220 12% 66%)',
    40: 'hsl(221 10% 56%)',
    50: 'hsl(221 9% 49%)',
    60: 'hsl(221 10% 39%)',
    70: 'hsl(221 10% 30%)',
    80: 'hsl(219 13% 22%)',
    90: 'hsl(217 11% 14%)',
    100: 'hsl(220 11% 7%)',
  },
  red: {
    0: 'hsl(343 100% 96%)',
    5: 'hsl(351 100% 88%)',
    10: 'hsl(351 100% 81%)',
    20: 'hsl(351 77% 64%)',
    30: 'hsl(350 66% 49%)',
    40: 'hsl(351 92% 37%)',
    50: 'hsl(351 100% 31%)',
    60: 'hsl(351 100% 25%)',
    70: 'hsl(351 100% 20%)',
    80: 'hsl(350 100% 15%)',
    90: 'hsl(350 100% 10%)',
    100: 'hsl(351 100% 5%)',
  },
  magenta: {
    0: 'hsl(327 73% 97%)',
    5: 'hsl(324 70% 91%)',
    10: 'hsl(324 70% 84%)',
    20: 'hsl(324 70% 74%)',
    30: 'hsl(324 60% 64%)',
    40: 'hsl(324 60% 44%)',
    50: 'hsl(324 70% 38%)',
    60: 'hsl(324 70% 31%)',
    70: 'hsl(324 70% 25%)',
    80: 'hsl(323 70% 20%)',
    90: 'hsl(324 70% 16%)',
    100: 'hsl(323 69% 12%)',
  },
  purple: {
    0: 'hsl(300 100% 98%)',
    5: 'hsl(298 94% 93%)',
    10: 'hsl(299 65% 87%)',
    20: 'hsl(298 47% 75%)',
    30: 'hsl(297 39% 64%)',
    40: 'hsl(298 32% 54%)',
    50: 'hsl(298 32% 46%)',
    60: 'hsl(298 35% 38%)',
    70: 'hsl(298 38% 31%)',
    80: 'hsl(298 41% 25%)',
    90: 'hsl(297 42% 18%)',
    100: 'hsl(298 43% 12%)',
  },
  violet: {
    0: 'hsl(257 47% 97%)',
    5: 'hsl(263 51% 92%)',
    10: 'hsl(262 50% 85%)',
    20: 'hsl(263 50% 75%)',
    30: 'hsl(263 50% 62%)',
    40: 'hsl(263 50% 49%)',
    50: 'hsl(263 50% 40%)',
    60: 'hsl(262 50% 34%)',
    70: 'hsl(262 50% 30%)',
    80: 'hsl(262 50% 24%)',
    90: 'hsl(263 51% 18%)',
    100: 'hsl(263 50% 12%)',
  },
  indigo: {
    0: 'hsl(240 60% 98%)',
    5: 'hsl(240 60% 95%)',
    10: 'hsl(240 57% 90%)',
    20: 'hsl(240 58% 85%)',
    30: 'hsl(240 52% 74%)',
    40: 'hsl(241 60% 63%)',
    50: 'hsl(241 60% 56%)',
    60: 'hsl(241 60% 48%)',
    70: 'hsl(241 60% 38%)',
    80: 'hsl(242 61% 27%)',
    90: 'hsl(242 61% 16%)',
    100: 'hsl(240 60% 12%)',
  },
  blue: {
    0: 'hsl(180 100% 95%)',
    5: 'hsl(187 100% 89%)',
    10: 'hsl(200 100% 83%)',
    20: 'hsl(205 72% 67%)',
    30: 'hsl(210 60% 54%)',
    40: 'hsl(214 66% 44%)',
    50: 'hsl(217 80% 35%)',
    60: 'hsl(219 93% 27%)',
    70: 'hsl(221 100% 22%)',
    80: 'hsl(222 100% 17%)',
    90: 'hsl(223 100% 12%)',
    100: 'hsl(223 100% 7%)',
  },
  cyan: {
    0: 'hsl(186 100% 96%)',
    5: 'hsl(187 69% 85%)',
    10: 'hsl(187 65% 74%)',
    20: 'hsl(187 57% 58%)',
    30: 'hsl(187 52% 48%)',
    40: 'hsl(187 60% 40%)',
    50: 'hsl(187 64% 33%)',
    60: 'hsl(187 66% 27%)',
    70: 'hsl(187 66% 22%)',
    80: 'hsl(187 66% 18%)',
    90: 'hsl(186 67% 15%)',
    100: 'hsl(187 64% 12%)',
  },
  mint: {
    0: 'hsl(165 62% 95%)',
    5: 'hsl(165 61% 90%)',
    10: 'hsl(165 60% 82%)',
    20: 'hsl(166 59% 71%)',
    30: 'hsl(166 60% 55%)',
    40: 'hsl(166 60% 40%)',
    50: 'hsl(165 60% 35%)',
    60: 'hsl(165 59% 30%)',
    70: 'hsl(165 61% 24%)',
    80: 'hsl(165 63% 18%)',
    90: 'hsl(165 64% 14%)',
    100: 'hsl(166 62% 12%)',
  },
  green: {
    0: 'hsl(149 100% 91%)',
    5: 'hsl(145 95% 84%)',
    10: 'hsl(145 76% 75%)',
    20: 'hsl(146 62% 59%)',
    30: 'hsl(147 63% 46%)',
    40: 'hsl(149 83% 35%)',
    50: 'hsl(152 100% 28%)',
    60: 'hsl(156 100% 23%)',
    70: 'hsl(160 100% 18%)',
    80: 'hsl(166 100% 13%)',
    90: 'hsl(170 100% 8%)',
    100: 'hsl(177 100% 4%)',
  },
  dipsy: {
    0: 'hsl(81 55% 94%)',
    5: 'hsl(82 54% 84%)',
    10: 'hsl(83 53% 74%)',
    20: 'hsl(83 54% 64%)',
    30: 'hsl(83 50% 54%)',
    40: 'hsl(83 56% 43%)',
    50: 'hsl(83 60% 38%)',
    60: 'hsl(83 59% 32%)',
    70: 'hsl(83 80% 24%)',
    80: 'hsl(82 80% 20%)',
    90: 'hsl(82 69% 17%)',
    100: 'hsl(84 77% 12%)',
  },
  yellow: {
    0: 'hsl(60 100% 89%)',
    5: 'hsl(46 100% 83%)',
    10: 'hsl(38 100% 77%)',
    20: 'hsl(31 89% 65%)',
    30: 'hsl(28 72% 53%)',
    40: 'hsl(26 82% 42%)',
    50: 'hsl(25 100% 34%)',
    60: 'hsl(24 100% 29%)',
    70: 'hsl(22 100% 24%)',
    80: 'hsl(22 100% 19%)',
    90: 'hsl(22 100% 15%)',
    100: 'hsl(21 100% 10%)',
  },
  salmon: {
    0: 'hsl(16 73% 97%)',
    5: 'hsl(15 70% 91%)',
    10: 'hsl(15 70% 83%)',
    20: 'hsl(15 69% 77%)',
    30: 'hsl(15 70% 68%)',
    40: 'hsl(14 70% 60%)',
    50: 'hsl(14 63% 53%)',
    60: 'hsl(15 66% 45%)',
    70: 'hsl(15 70% 37%)',
    80: 'hsl(14 70% 29%)',
    90: 'hsl(14 69% 19%)',
    100: 'hsl(14 71% 12%)',
  },
};

export const colorPaletteKpis: Record<KpisColorsNames, string> = {
  salesData: colors.blue[30],
  rating1star: colors.red[20],
  rating2star: colors.red[30],
  rating3star: colors.red[40],
  rating4star: colors.green[40],
  rating5star: colors.green[50],
  nps: colors.cyan[50],
  unitsSold: colors.violet[30],
  tgw: colors.purple[50],
  sentimentIndex: colors.red[30],
  feedback: colors.green[50],
  rating: colors.yellow[40],
  votesRating: colors.magenta[30],
  votesCount: colors.indigo[30],
  subrating: colors.salmon[30],
};

export const colorPaletteNeutrals: Record<NeutralsColorNames, string> = {
  white: colors.support.white,
  black: colors.support.black,
  dimmed0: colors.primary[0],
  dimmed1: colors.primary[5],
  dimmed2: colors.primary[10],
  dimmed3: colors.primary[20],
  dimmed4: colors.primary[30],
  dimmed5: colors.primary[50],
  dimmed6: colors.primary[60],
  dimmed7: colors.primary[70],
  dimmed8: colors.primary[80],
  dimmed9: colors.primary[90],
};

export const colorPaletteDefault: Record<ThemeVariants, string[]> = {
  light: [
    colors.green[40],
    colors.red[30],
    colors.blue[40],
    colors.yellow[40],
    colors.magenta[40],
    colors.cyan[40],
    colors.violet[40],
    colors.salmon[40],
    colors.purple[40],
    colors.dipsy[40],
    colors.indigo[40],
    colors.mint[40],
  ],
  dark: [
    colors.green[20],
    colors.red[20],
    colors.blue[20],
    colors.yellow[20],
    colors.magenta[30],
    colors.cyan[20],
    colors.violet[20],
    colors.salmon[20],
    colors.purple[30],
    colors.dipsy[20],
    colors.indigo[30],
    colors.mint[30],
  ],
};
