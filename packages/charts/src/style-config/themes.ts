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
import { colorPaletteNeutrals } from './colors';

export const themeLight: Theme = {
  background: {
    from: colorPaletteNeutrals.white,
    to: colorPaletteNeutrals.white,
  },
  headings: {
    title: colorPaletteNeutrals.dimmed9,
    subtitle: colorPaletteNeutrals.dimmed7,
  },
  axis: {
    label: colorPaletteNeutrals.dimmed8,
    tickLabel: colorPaletteNeutrals.dimmed7,
    tick: colorPaletteNeutrals.dimmed4,
    line: colorPaletteNeutrals.dimmed4,
  },
  grid: {
    line: colorPaletteNeutrals.dimmed1,
    background: {
      from: colorPaletteNeutrals.dimmed0,
      to: colorPaletteNeutrals.white,
    },
  },
  marker: {
    fill: colorPaletteNeutrals.white,
  },
  markerLabel: {
    fontColor: colorPaletteNeutrals.dimmed9,
    background: colorPaletteNeutrals.dimmed2,
  },
  lines: {
    noData: colorPaletteNeutrals.dimmed1,
    average: colorPaletteNeutrals.dimmed8,
  },
};

export const themeDark: Theme = {
  background: {
    from: colorPaletteNeutrals.dimmed9,
    to: colorPaletteNeutrals.dimmed9,
  },
  headings: {
    title: colorPaletteNeutrals.dimmed0,
    subtitle: colorPaletteNeutrals.dimmed2,
  },
  axis: {
    label: colorPaletteNeutrals.dimmed2,
    tickLabel: colorPaletteNeutrals.dimmed4,
    tick: colorPaletteNeutrals.dimmed4,
    line: colorPaletteNeutrals.dimmed4,
  },
  grid: {
    line: colorPaletteNeutrals.dimmed6,
    background: {
      from: colorPaletteNeutrals.dimmed8,
      to: colorPaletteNeutrals.dimmed9,
    },
  },
  marker: {
    fill: colorPaletteNeutrals.black,
  },
  markerLabel: {
    fontColor: colorPaletteNeutrals.dimmed0,
    background: colorPaletteNeutrals.dimmed8,
  },
  lines: {
    noData: colorPaletteNeutrals.dimmed7,
    average: colorPaletteNeutrals.dimmed1,
  },
};

export const themes: Themes = {
  light: themeLight,
  dark: themeDark,
};
