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

export type BarsStyleConfig = {
  maxSize: number;
  paddingOuter: number;
  paddingInner: number;
  paddingOuterGroup: number;
  paddingInnerGroup: number;
  bar: {
    rx: number;
    opacity: number;
  };
  background: {
    rx: number;
    opacity: number;
  };
  overlay: {
    opacity: number;
  };
  label: {
    alignmentBaseline: 'alphabetic' | 'hanging' | 'ideographic' | 'mathematical' | 'auto' | 'baseline' | 'before-edge' | 'text-before-edge' | 'middle' | 'central' | 'after-edge' | 'text-after-edge' | 'inherit' | undefined;
    fontSize: number;
    fontFamily: string;
    fontWeight: number;
    fontWeightValue: number;
    fillOpacity: number;
    rx: number;
    height: number;
  };
}

export type Bar = {
  color: string;
  height: number;
  index: number;
  key: string;
  value: number;
  width: number;
  x: number;
  y: number; }

export type BarStackBar = {
  bar: [number | typeof NaN, number | typeof NaN];
  color: string;
  height: number;
  index: number;
  key: string;
  width: number;
  x: number;
  y: number;
}

export type BarStack = {
  bars: BarStackBar[];
}

export type BarChartLabel = {
  datakey?: string;
  data?: Record<string, any>;
  value: string | number;
  extraData: string;
  length: number;
}

export type BarChartLabels = {
  series: BarChartLabel[][];
  overlay: BarChartLabel[][] | undefined;
}
