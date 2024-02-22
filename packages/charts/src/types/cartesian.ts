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

import { TickFormatter } from '@visx/axis';
import { NumberValue } from '@visx/vendor/d3-scale';

import { AxisElementsStyleConfig, AxisOrientation } from './axis';
import { BrushElementStyleConfig } from './brush';
import { GridStyleConfig } from './grid';
import { HeadingsStyleConfig } from './headings';
import { LegendStyleConfig } from './legend';
import { Background } from './linear-gradient';
import { LinesStyleConfig } from './lines';
import { ScaleType } from './main';
import { Themes } from './themes';
import { ViewportStyleConfig } from './viewport';

export enum CartesianChartLayout {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
}

export type MarginProps = {
  top: number;
  right: number;
  left: number;
  bottom: number;
}

export type GridProps = {
  hideRows?: boolean;
  hideColumns?: boolean;
  tickRows?: number;
  tickColumns?: number;
  background?: Background;
  otherProps?: Record<string, unknown>;
}

export type AxisProps = {
  domain: Array<string | number>;
  scaleType: ScaleType;
  orientation: AxisOrientation;
  label?: string;
  range?: [number, number];
  round?: boolean;
  nice?: boolean;
  clamp?: boolean;
  paddingInner?: number;
  paddingOuter?: number;
  padding?: number;
  numTicks?: number;
  hideTicks?: boolean;
  hideTickLabel?: boolean;
  hideAxisLine?: boolean;
  hideZero?: boolean;
  tickFormat?: TickFormatter<NumberValue | string | Date>;
  otherProps?: Record<string, unknown>;
}

export type CartesianStyleConfig = {
  axis: AxisElementsStyleConfig;
  brush: BrushElementStyleConfig;
  headings: HeadingsStyleConfig;
  grid: GridStyleConfig;
  lines: LinesStyleConfig;
  legend: LegendStyleConfig;
  themes: Themes;
  viewport: ViewportStyleConfig;
}
