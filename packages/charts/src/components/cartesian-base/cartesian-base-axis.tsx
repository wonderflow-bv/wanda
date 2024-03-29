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

import {
  Axis,
  TickFormatter,
} from '@visx/axis';
import { Group } from '@visx/group';
import { Text } from '@visx/text';
import {
  NumberValue,
} from '@visx/vendor/d3-scale';
import { v4 as uuid } from 'uuid';

import { useStyleConfigContext, useThemeContext } from '../../providers';
import { AxisConfig, CartesianAxis, CartesianxAxisSystem } from '../../types/axis';
import {
  handleNumberOfTicks,
  handleTickFormat,
  handleVerticalTickLabelOffset,
  handleVerticalTickLabelTransform,
  hasVerticalTickLabel,
} from '../../utils/axis';

export type CartesianBaseAxisProps = {
  axis: CartesianxAxisSystem;
  axisConfig: AxisConfig;
  dimension: {
    maxWidth: number;
    maxHeight: number;
  };
}

export type TickFormat = TickFormatter<string | NumberValue | Date> | undefined;

export const CartesianBaseAxis: React.FC<CartesianBaseAxisProps> = ({
  axis,
  axisConfig,
  dimension,
}: CartesianBaseAxisProps) => {
  const theme = useThemeContext();
  const styleConfig = useStyleConfigContext();
  const { viewport, themes } = styleConfig;
  const { maxWidth: xMax, maxHeight: yMax } = dimension;

  return (
    <Group role="group">
      {Object.values(axis)
        .filter((a): a is CartesianAxis => !!a)
        .map((a) => {
          const orientation = axisConfig[a.orientation];

          const {
            tickLabel, tick, label, line,
          } = themes[theme].axis;

          const {
            tickLabelProps, tickLineProps, labelProps, axisLineProps,
          } = axisConfig.style;

          const isVertical = hasVerticalTickLabel(xMax, a, viewport);
          const numTicks = handleNumberOfTicks(xMax, yMax, a, viewport);
          const labelOffset = orientation.labelOffset + handleVerticalTickLabelOffset(xMax, styleConfig, a);
          const tickFormat = handleTickFormat(a) as TickFormat;

          const getTickLabelProps = (v: string | NumberValue | Date) => ({
            ...tickLabelProps,
            ...orientation.tickLabelProps,
            ...handleVerticalTickLabelTransform(v, isVertical, a),
            fill: tickLabel,
          });

          return (
            <Axis
              {...a}
              key={uuid()}
              numTicks={numTicks}
              tickLength={tickLineProps.length}
              tickLabelProps={getTickLabelProps}
              tickLineProps={{ ...tickLineProps, stroke: tick }}
              tickFormat={tickFormat}
              label={a.label}
              labelOffset={labelOffset}
              labelProps={{
                ...labelProps,
                ...orientation.labelProps,
                fill: label,
              }}
              stroke={line}
              strokeDasharray={axisLineProps.strokeDasharray}
              strokeWidth={axisLineProps.strokeWidth}
              tickComponent={t => (
                <Text
                  x={t.x}
                  y={t.y}
                  transform={`rotate(${isVertical ? 90 : 0} ${t.x} ${t.y})`}
                  fontFamily={t.fontFamily}
                  fontSize={t.fontSize}
                  fontWeight={t.fontWeight}
                  textAnchor={t.textAnchor}
                  verticalAnchor={t.verticalAnchor}
                  fill={t.fill}
                  dominantBaseline={t.dominantBaseline}
                  dx={t.dx}
                  dy={t.dy}
                  width={160}
                >
                  {t.formattedValue}
                </Text>
              )}
            />
          );
        })}
    </Group>
  );
};

CartesianBaseAxis.displayName = 'CartesianBaseAxis';
