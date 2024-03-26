/*
 * Copyright 2024 Wonderflow Design Team
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

import { Group } from '@visx/group';
import { useCallback } from 'react';

import { useBars } from '@/hooks';

import { useCartesianContext, useStyleConfigContext, useThemeContext } from '../../../providers';
import { BarsItem, BarsItemBlurred } from './bars.module.css';

export type BarsLabelProps = {
  wrapper?: {
    x: number;
    y: number;
    width: number;
  };
  text: {
    x: number;
    y: number;
  };
  value: string | number;
  separator: string;
  extraData: string;
  fontWeightValue: number;
  dataKey: string;
}

export const BarsLabel = ({
  dataKey,
  extraData,
  fontWeightValue,
  separator,
  text,
  value,
  wrapper,
}: BarsLabelProps) => {
  const { hoveredLegendItem: overLegend } = useCartesianContext();
  const theme = useThemeContext();
  const { themes, bars } = useStyleConfigContext();

  const {
    series,
    hasLabel,
  } = useBars();

  const {
    fontFamily, fontWeight, fontSize, alignmentBaseline, height, fillOpacity, rx,
  } = bars.label;

  const dynamicClassName = useCallback((overLegend: string, dataKey: string) => ((overLegend === dataKey || overLegend === '')
    ? BarsItem
    : BarsItemBlurred), []);

  if (!hasLabel) return null;

  return (
    <Group className={dynamicClassName(overLegend, dataKey)}>
      {wrapper && (
        <rect
          x={wrapper.x}
          y={wrapper.y}
          width={wrapper.width}
          height={height}
          fill={themes[theme].markerLabel.background}
          fillOpacity={fillOpacity}
          rx={rx}
        />
      )}

      <text
        x={text.x}
        y={text.y}
        fontSize={fontSize}
        fontWeight={fontWeight}
        fontFamily={fontFamily}
        fill={themes[theme].axis.tickLabel}
        alignmentBaseline={alignmentBaseline}
        textAnchor={wrapper ? 'middle' : undefined}
      >
        <tspan fontWeight={fontWeightValue}>{value}</tspan>
        {
          series.extraData && (
            <>
              <tspan>{separator}</tspan>
              <tspan>
                {extraData}
              </tspan>
            </>
          )
        }
      </text>
    </Group>
  );
};

BarsLabel.displayName = 'BarsLabel';

