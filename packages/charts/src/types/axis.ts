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

import { ScaleBand, ScaleLinear, ScaleTime } from '@visx/vendor/d3-scale';
import { Except } from 'type-fest';

import { AxisProps } from './cartesian';

export type AxisOrientation = 'top' | 'left' | 'right' | 'bottom';

export type DominantBaseline = 'auto' | 'middle' | 'hanging';
export type TextAnchor = 'end' | 'middle' | 'start';
export type StrokeLinecap = 'butt' | 'round' | 'square';

export type CartesianAxis = AxisProps & {
  top: number;
  left: number;
  scale: ScaleBand<string> | ScaleLinear<number, number> | ScaleTime<number, number>;
}

export type AxisElements = {
  orientation: AxisOrientation;
  offset: number;
  tickLabelMaxChar: number;
  tickLabelMaxLength: number;
  tickLength: number;
  tickLabelOffset: number;
  tickLabelHeight: number;
  tickLabelSize: number;
  axisLabel: number;
  labelOffset: number;
  axisLine: number;
}

export type AxisSystemElements = Record<AxisOrientation, AxisElements | undefined>

export type CartesianxAxisSystem = Record<AxisOrientation, CartesianAxis | undefined>

export type LabelProps = {
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  textAnchor: TextAnchor;
}

export type TickLabelProps = Except<LabelProps, 'textAnchor'>;

export type TickLineProps = {
  length: number;
  strokeWidth: number;
  strokeLinecap: StrokeLinecap;
}

export type AxisLineProps = {
  strokeWidth: number;
  strokeDasharray: string;
}

export type AxisSpacing = {
  labelCharExtimatedWidth: number;
  labelHeight: number;
  labelOffset: number;
  tickLabelHeight: number;
  tickLength: number;
}

export type VerticalAxisStyleConfig = {
  tickLabelProps: {
    dx: number;
    textAnchor: TextAnchor;
    dominantBaseline: DominantBaseline;
  };
  labelProps: {
    dominantBaseline: DominantBaseline;
  };
};

export type HorizontalAxisStyleConfig = {
  tickLabelProps: {
    dy: number;
    dominantBaseline: DominantBaseline;
  };
  labelProps: {
    dominantBaseline: DominantBaseline;
  };
};

export type AxisElementsStyleConfig = {
  formatting: { maxCharactersLength: number; omission: string };
  labelProps: LabelProps;
  tickLabelProps: TickLabelProps;
  tickLineProps: TickLineProps;
  axisLineProps: AxisLineProps;
  spacing: AxisSpacing;
  top: HorizontalAxisStyleConfig;
  right: VerticalAxisStyleConfig;
  bottom: HorizontalAxisStyleConfig;
  left: VerticalAxisStyleConfig;
}

export type AxisOffsetConfig = {
  topAxisOffset: number;
  rightAxisOffset: number;
  bottomAxisOffset: number;
  leftAxisOffset: number;
  verticalAxisOffset: number;
  horizontalAxisOffset: number;
}

export type HorizontalAxisOffsetConfig = HorizontalAxisStyleConfig & {
  labelOffset: number;
}

export type VerticalAxisoffsetConfig = VerticalAxisStyleConfig & {
  labelOffset: number;
}

export type AxisConfig = {
  offset: AxisOffsetConfig;
  style: AxisElementsStyleConfig;
  top: HorizontalAxisOffsetConfig;
  right: VerticalAxisoffsetConfig;
  bottom: HorizontalAxisOffsetConfig;
  left: VerticalAxisoffsetConfig;
}
