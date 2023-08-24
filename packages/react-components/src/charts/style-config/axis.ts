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

export type TextAnchor = 'start' | 'middle' | 'end';
export type StrokeLinecap = 'butt' | 'round' | 'square'

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
  tickOffset: number;
  tickLength: number;
}

export type AxisStyleConfig = {
  labelProps: LabelProps;
  tickLabelProps: TickLabelProps;
  tickLineProps: TickLineProps;
  axisLineProps: AxisLineProps;
  spacing: AxisSpacing;
}

export const axisStyleConfig: AxisStyleConfig = {
  labelProps: {
    fill: 'hsl(210, 5%, 27%)',
    fontFamily: 'system-ui, sans-serif',
    fontSize: 12,
    fontWeight: 400,
    textAnchor: 'middle',
  },
  tickLabelProps: {
    fill: 'hsl(225, 1%, 49%)',
    fontFamily: 'system-ui, sans-serif',
    fontSize: 14,
    fontWeight: 400,
  },
  tickLineProps: {
    length: 4,
    stroke: 'hsl(0, 0%, 80%)',
    strokeWidth: 1,
    strokeLinecap: 'round',
  },
  axisLineProps: {
    stroke: 'hsl(0, 0%, 80%)',
    strokeWidth: 1,
    strokeDasharray: '',
  },
  spacing: {
    labelCharExtimatedWidth: 9,
    labelHeight: 14, // based on a 12px font size
    labelOffset: 16,
    tickLabelHeight: 16.5, // based on a 14px font size
    tickOffset: 4,
    tickLength: 4,
  },
};
