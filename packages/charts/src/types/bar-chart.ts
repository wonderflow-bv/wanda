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

import { AxisProps } from './cartesian';
import {
  AverageType, Charts, SortingType, TrendlineType,
} from './main';

export type BarChartIndex = Partial<AxisProps> & {
  dataKey: string;
};

export type BarChartSeries = Partial<AxisProps> & {
  dataKey: string[];
  // groupBy?: string[]; TODO: this is a temporary prop waiting to manage breakdown 3;
  style?: Array<BarStyle | undefined>;
  rename?: (...args: any) => string;
  showBackground?: boolean;
};

export type BarChartTooltip = {
  extraSeriesData?: (...args: any) => string;
  extraOverlayData?: (...args: any) => string;
  extraContent?: React.ReactNode;
};

export type BarStyle = {
  fill?: string;
  showLabel?: boolean;
}

export type BarChartMetadata = {
  type: Charts;
  isStacked: boolean;
  sortBy: SortingType;
  index: string;
  series: {
    dataKey: string[];
    names: string[];
    colors: string[];
    style?: Array<BarStyle | undefined>;
    average: AverageType | undefined;
    trendline: TrendlineType[] | undefined;
    showBackground?: boolean;
  };
  overlay: {
    dataKey?: string[];
    names: string[] | undefined;
    colors: string[] | undefined;
    style?: Array<BarStyle | undefined>;
    average: AverageType | undefined;
    trendline: TrendlineType[] | undefined;
    showBackground?: boolean;
  };
  tooltip?: BarChartTooltip;
  preventTooltipDisplay?: boolean;
  showLabel?: boolean;
  showAverage?: boolean;
  showTrendline?: boolean;
  showBackground?: boolean;
  hidePadding?: boolean;
  hasMirroredDomains?: boolean;
  hasIndexReversed?: boolean;
  fixedBarSize?: boolean;
}
