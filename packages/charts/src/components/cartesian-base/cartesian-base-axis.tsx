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
import { AllAxisProperties, AxisConfig, AxisType } from '../../types/axis';
import {
  handleTickFormat,
  handleTickNumber,
  handleVerticalTickLabelOffset,
  handleVerticalTickLabelTransform,
  hasVerticalTickLabel,
} from '../../utils/axis';

export type CartesianBaseAxisProps = {
  axis: AllAxisProperties;
  axisConfig: AxisConfig;
  dimension: {
    maxWidth: number;
    maxHeight: number;
  };
}

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
        .filter((a): a is AxisType => !!a)
        .map(a => (
          <Axis
            key={uuid()}
            orientation={a.orientation}
            scale={a.scale}
            top={a.top}
            left={a.left}
            numTicks={handleTickNumber(xMax, yMax, a, vStyle)}
            tickLength={axisConfig.style.tickLineProps.length}
            tickLabelProps={v => ({
              ...axisConfig.style.tickLabelProps,
              ...axisConfig[a.orientation].tickLabelProps,
              ...handleVerticalTickLabelTransform(
                v,
                hasVerticalTickLabel(xMax, a, vStyle),
                a,
              ),
              fill: themes[theme].axis.tickLabel,
            })}
            tickLineProps={{
              ...axisConfig.style.tickLineProps,
              stroke: themes[theme].axis.tick,
            }}
            label={a.label}
            labelOffset={
                axisConfig[a.orientation].labelOffset
                + handleVerticalTickLabelOffset(xMax, cStyle, a)
              }
            labelProps={{
              ...axisConfig.style.labelProps,
              ...axisConfig[a.orientation].labelProps,
              fill: themes[theme].axis.label,
            }}
            tickFormat={handleTickFormat(a) as TickFormatter<string | NumberValue | Date> | undefined}
            stroke={themes[theme].axis.line}
            strokeDasharray={axisConfig.style.axisLineProps.strokeDasharray}
            strokeWidth={axisConfig.style.axisLineProps.strokeWidth}
            hideAxisLine={a.hideAxisLine}
            hideTicks={a.hideTicks}
            hideZero={a.hideZero}
            {...a.otherProps}
          />
        ))}
    </Group>
  );
};

CartesianBaseAxis.displayName = 'CartesianBaseAxis';
