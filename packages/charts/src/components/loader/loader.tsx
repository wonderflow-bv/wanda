/*
 * Copyright 2022-2023 Wonderflow Design Team
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

import { LinearGradient } from '@visx/gradient';

import { useDataContext, useThemeContext } from '../../providers';
import { themes } from '../../style-config';
import { Charts } from '../../types';
import { BarChartLoader } from './bar-chart-loader';
import { LineChartLoader } from './line-chart-loader';

export type LoaderProp = {
  isLoading?: boolean;
  left?: number;
  width?: number;
  height?: number;
}

export const Loader = ({
  isLoading = false,
  left = 0,
  width = 800,
  height = 600,
}: LoaderProp) => {
  const theme = useThemeContext();
  const { metadata } = useDataContext();
  const { from, to } = themes[theme].grid.background;

  const isLineChart = metadata?.type === Charts.LINE_CHART;
  const isBarChart = metadata?.type === Charts.BAR_CHART;

  if (!isLoading) return null;

  return (
    <svg version="1.1" id="Chart-Loader" xmlns="http:www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`}>

      <clipPath id="clipRect">
        <rect x={left} y={0} width={width} height={height} fill="black" />
      </clipPath>

      <LinearGradient id="loader" from={to} to={from} />

      <defs>
        <linearGradient id="loader2" x1={0} x2={0} y1={0} y2={1}>
          <stop stopColor={to} offset="0%" />
          <stop stopColor={from} offset="50%" />
          <stop stopColor={to} offset="100%" />
        </linearGradient>
      </defs>

      <rect
        x={left}
        y={0}
        width={width}
        height={height}
        fill="url(#loader)"
        stroke="none"
      />

      <g clipPath="url(#clipRect)">
        {isLineChart && (<LineChartLoader width={width} height={height} />)}
        {isBarChart && (<BarChartLoader />)}
      </g>

    </svg>
  );
};

