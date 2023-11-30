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

import { LineChartOverlay, LineChartSeries } from '../types';
import { getLabelFromPath } from './data';

export const handleSeriesNames = (series: LineChartSeries) => series.dataKey.map((s: string, i: number) => {
  const renamed = series.rename ? series.rename(s, i) : getLabelFromPath(s);
  return _.startCase(renamed);
});

export const handleSeriesColors = (
  series: LineChartSeries,
  palette: string[],
) => series.dataKey.map((_: string, i: number) => (
  series.style?.[i]
    ? series.style[i]?.stroke
    : palette[i]
));

export const handleOverlayName = (overlay: LineChartOverlay | undefined) => {
  if (!overlay) return '';
  return overlay.rename
  ?? _.startCase(overlay.label)
  ?? _.startCase(getLabelFromPath(overlay.dataKey ?? ''));
};

export const handleOverlayColor = (
  overlay: LineChartOverlay | undefined,
  palette: string,
) => overlay?.style?.stroke ?? palette;
