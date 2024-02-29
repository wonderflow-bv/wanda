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

import { CartesianStyleConfig } from '../types/cartesian';
import { axisStyleConfig } from './axis';
import { barsStyleConfig } from './bars';
import { brushStyleConfig } from './brush';
import { gridStyleConfig } from './grid';
import { headingsStyleConfig } from './headings';
import { legendStyleConfig } from './legend';
import { linesStyleConfig } from './lines';
import { themes } from './themes';
import { viewportStyleConfig } from './viewport';

export const cartesianStyleConfig: CartesianStyleConfig = {
  axis: axisStyleConfig,
  bars: barsStyleConfig,
  brush: brushStyleConfig,
  headings: headingsStyleConfig,
  grid: gridStyleConfig,
  legend: legendStyleConfig,
  lines: linesStyleConfig,
  themes,
  viewport: viewportStyleConfig,
};
