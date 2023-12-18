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

import { RectClipPath } from '@visx/clip-path';
import { LinearGradient } from '@visx/gradient';
import { Group } from '@visx/group';

import { useDataContext, useThemeContext } from '../../providers';
import { themes } from '../../style-config';
import { Charts } from '../../types';
import { BarChartLoader } from './bar-chart-loader';
import { LineChartLoader } from './line-chart-loader';

export type LoaderProp = {
  isLoading?: boolean;
  left?: number;
  top?: number;
  width?: number;
  height?: number;
}

export const Loader = ({
  isLoading = false,
  left = 0,
  top = 0,
  width = 800,
  height = 600,
}: LoaderProp) => {
  const theme = useThemeContext();
  const { metadata } = useDataContext();
  const { from, to } = themes[theme].grid.background;

  const isLineChart = metadata?.type === Charts.LINE_CHART;
  const isBarChart = metadata?.type === Charts.BAR_CHART;
  const rightExtraPadding = metadata?.hidePadding ? 12 : 0;

  if (!isLoading) return null;

  return (
    <Group>
      <RectClipPath id="clip-path-loader" x={left} y={top} width={width + rightExtraPadding} height={height} />
      <LinearGradient id="loader-gradient" from={to} to={from} />

      <Group clipPath="url(#clip-path-loader)">

        <rect
          x={left}
          y={top}
          width={width + rightExtraPadding}
          height={height}
          fill="url(#loader-gradient)"
        />

        {isLineChart && (<LineChartLoader width={width} height={height} />)}
        {isBarChart && (<BarChartLoader />)}
      </Group>
    </Group>
  );
};

