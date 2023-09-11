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

import { Except } from 'type-fest';

import { AxisProps } from '../components/cartesian-base';

export type AxisOrientation = 'top' | 'left' | 'right' | 'bottom';
export type DominantBaseline = 'auto' | 'middle' | 'hanging';
export type TextAnchor = 'end' | 'middle' | 'start';
export type StrokeLinecap = 'butt' | 'round' | 'square'

export type SingleAxisOffsetInput = AllAxisOffsetInput & { orientation: AxisOrientation }
export type AllAxisOffsetInput = Pick<AxisProps, 'domain' | 'label' | 'tickFormat' | 'hideAxisLine' | 'hideTicks' | 'hideTickLabel'>

export type AllAxisInput = {
  top?: AllAxisOffsetInput;
  right?: AllAxisOffsetInput;
  bottom?: AllAxisOffsetInput;
  left?: AllAxisOffsetInput;
}

export type AxisOffsetConfig = {
  topAxisOffset: number;
  rightAxisOffset: number;
  bottomAxisOffset: number;
  leftAxisOffset: number;
  verticalAxisOffset: number;
  horizontalAxisOffset: number;
}

export type AllAxisElementsValues = Record<AxisOrientation, SingleAxisElementsValues | undefined>

export type SingleAxisElementsValues = {
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

export type HorizontalAxisConfig = HorizontalAxisStyleConfig & {
  labelOffset: number;
}

export type VerticalAxisConfig = VerticalAxisStyleConfig & {
  labelOffset: number;
}

export type AxisConfig = {
  offset: AxisOffsetConfig;
  style: AxisStyleConfig;
  top: HorizontalAxisConfig;
  right: VerticalAxisConfig;
  bottom: HorizontalAxisConfig;
  left: VerticalAxisConfig;
}

export type LabelProps = {
  fill: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  textAnchor: TextAnchor;
}

export type TickLabelProps = Except<LabelProps, 'textAnchor'>

export type TickLineProps = {
  length: number;
  stroke: string;
  strokeWidth: number;
  strokeLinecap: StrokeLinecap;
}

export type AxisLineProps = {
  stroke: string;
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

export type AxisStyleConfig = {
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
