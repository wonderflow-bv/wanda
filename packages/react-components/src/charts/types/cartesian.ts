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

import { AxisStyleConfig } from './axis';
import { GridStyleConfig } from './grid';
import { HeadingsStyleConfig } from './headings';
import { LegendStyleConfig } from './legend';
import { LinearGradientStyleConfig } from './linear-gradient';

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

export type CartesianStyleConfig = {
  linearGradient: LinearGradientStyleConfig;
  grid: GridStyleConfig;
  axis: AxisStyleConfig;
  headings: HeadingsStyleConfig;
  legend: LegendStyleConfig;
}
