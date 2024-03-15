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

import _ from 'lodash';

import { ChartSeries, LineChartSeries } from '../types';
import { BarChartSeries } from '../types/bar-chart';
import { getLabelFromPath } from './data';

export const handleSeriesNames = <T extends ChartSeries>(
  series: T,
): string[] => series.dataKey.map((s: string, i: number) => {
    const renamed = series.rename ? series.rename(s, i) : getLabelFromPath(s);
    return _.startCase(renamed);
  });

export const handleLineChartSeriesColors = (
  series: LineChartSeries,
  palette: string[],
): string[] => series.dataKey.map((_: string, i: number) => (
  series.style?.[i]?.stroke ?? palette[i % palette.length]
));

export const handleBarChartSeriesColors = (
  series: BarChartSeries,
  palette: string[],
) => series.dataKey.map((_: string, i: number) => (
  series.style?.[i]?.fill ?? palette[i % palette.length]
));
