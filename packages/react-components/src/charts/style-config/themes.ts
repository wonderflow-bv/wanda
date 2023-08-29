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

import { Theme, Themes } from '../types';
import { colors } from './colors';

export const themeLight: Theme = {
  background: {
    from: colors.neutrals.white,
    to: colors.neutrals.dimmed1,
  },
  headings: {
    title: colors.neutrals.dimmed7,
    subtitle: colors.neutrals.dimmed5,
  },
  axis: {
    label: colors.neutrals.dimmed8,
    tickLabel: colors.neutrals.dimmed5,
    tick: colors.neutrals.dimmed4,
    line: colors.neutrals.dimmed4,
  },
  grid: {
    line: colors.neutrals.dimmed2,
  },
};

export const themeDark: Theme = {
  background: {
    from: colors.neutrals.dimmed7,
    to: colors.neutrals.dimmed9,
  },
  headings: {
    title: colors.neutrals.dimmed0,
    subtitle: colors.neutrals.dimmed3,
  },
  axis: {
    label: colors.neutrals.dimmed2,
    tickLabel: colors.neutrals.dimmed4,
    tick: colors.neutrals.dimmed4,
    line: colors.neutrals.dimmed4,
  },
  grid: {
    line: colors.neutrals.dimmed6,
  },
};

export const theme: Themes = {
  light: themeLight,
  dark: themeDark,
};
