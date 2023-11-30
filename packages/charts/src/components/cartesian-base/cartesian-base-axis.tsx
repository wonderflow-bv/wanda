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

import {
  Axis,
  TickFormatter,
} from '@visx/axis';
import { Group } from '@visx/group';
import {
  NumberValue,
} from '@visx/vendor/d3-scale';
import { v4 as uuid } from 'uuid';

import { useStyleConfigContext, useThemeContext } from '../../providers';
import { themes } from '../../style-config';
import { AxisConfig, CartesianAxis, CartesianSystemAxis } from '../../types/axis';
import {
  handleNumberOfTicks,
  handleTickFormat,
  handleVerticalTickLabelOffset,
  handleVerticalTickLabelTransform,
  hasVerticalTickLabel,
} from '../../utils/axis';

export type CartesianBaseAxisProps = {
  axis: CartesianSystemAxis;
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
  const { viewport: vStyle, cartesian: cStyle } = useStyleConfigContext();
  const { maxWidth: xMax, maxHeight: yMax } = dimension;

  return (
    <Group>
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

          const isVertical = hasVerticalTickLabel(xMax, a, vStyle);
          const numTicks = handleNumberOfTicks(xMax, yMax, a, vStyle);
          const labelOffset = orientation.labelOffset + handleVerticalTickLabelOffset(xMax, cStyle, a);
          const tickFormat = handleTickFormat(a) as TickFormat;

          return (
            <Axis
              {...a}
              key={uuid()}
              numTicks={numTicks}
              tickLength={tickLineProps.length}
              tickLabelProps={v => ({
                ...tickLabelProps,
                ...orientation.tickLabelProps,
                ...handleVerticalTickLabelTransform(v, isVertical, a),
                fill: tickLabel,
              })}
              tickLineProps={{
                ...tickLineProps,
                stroke: tick,
              }}
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
              tickFormat={tickFormat}
            />
          );
        })}
    </Group>
  );
};

CartesianBaseAxis.displayName = 'CartesianBaseAxis';
