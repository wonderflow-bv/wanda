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

import { Background } from './linear-gradient';

export type Theme = {
  background: Background;
  headings: {
    title: string;
    subtitle: string;
    button: {
      background: string;
      hover: string;
      foreground: string;
    };
  };
  axis: {
    label: string;
    tickLabel: string;
    tick: string;
    line: string;
  };
  grid: {
    line: string;
    background: Background;
  };
  markerLabel: {
    fontColor: string;
    background: string;
  };
  marker: {
    fill: string;
  };
  lines: {
    noData: string;
    average: string;
    averageFontColor: string;
  };
  bars: {
    backgroundColor: string;
    overlayColor: string;
  };
  brush: {
    handle: {
      fill: string;
      stroke: string;
    };
    selectedBox: {
      fill: string;
      stroke: string;
    };
    pattern: {
      fill: string;
      stroke: string;
    };
  };
}

export type ThemeVariants = 'light' | 'dark';

export type Themes = Record<ThemeVariants, Theme>

