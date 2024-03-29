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

import { LinesStyleConfig } from '../types/lines';

export const linesStyleConfig: LinesStyleConfig = {
  lineIndicator: {
    strokeWidth: 1,
    opacity: 0.6,
    pointerEvents: 'none',
    strokeDasharray: '1 2',
  },
  dataPoint: {
    radius: 2,
    strokeWidth: 1,
  },
  path: {
    strokeWidth: 2,
    strokeOpacity: 1,
  },
  segment: {
    strokeDashArray: '2 3',
  },
  marker: {
    radius: 2,
    strokeWidth: 1,
    strokeOpacity: 1,
  },
  average: {
    maxLabelWidth: 200,
    opacity: 0.8,
    pointerEvents: 'none',
    strokeDasharray: '5,2',
    strokeWidth: 1,
    titleFontSize: 12,
    titleFontWeight: 400,
    backgroundPadding: 4,
    backgroundProps: { rx: 2, ry: 2 },
    titleProps: { dy: -1 },
  },
  trendline: {
    opacity: 1,
    pointerEvents: 'none',
    strokeDasharray: '5,2',
    strokeWidth: 1,
  },
};
