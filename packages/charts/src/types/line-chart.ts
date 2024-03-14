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

import { AxisProps } from './cartesian';
import { AverageType, Charts, TrendlineType } from './main';

export type LineChartIndex = Partial<AxisProps> & {
  dataKey: string;
};

export type LineChartSeries = Partial<AxisProps> & {
  dataKey: string[];
  style?: Array<LineStyle | undefined>;
  rename?: (dataKey: string, index?: number) => string;
  extraData?: (datum: Record<string, any>) => string;
};

export type LineChartRenderType = 'lines' | 'curves' | 'steps';

export type LineStyle = {
  stroke?: string;
  strokeWidth?: string;
  strokeOpacity?: string;
  strokeDasharray?: string;
  showMarker?: boolean;
  showMarkerLabel?: boolean;
}

export type LineChartMetadata = {
  type: Charts;
  renderAs?: LineChartRenderType;
  index: string;
  series: {
    dataKey: string[];
    extraData?: (datum: Record<string, any>) => string;
    names: string[];
    colors: Array<string | undefined>;
    style?: Array<LineStyle | undefined>;
    average: AverageType | undefined;
    trendline: TrendlineType[] | undefined;
  };
  overlay: {
    dataKey?: string[];
    extraData?: (datum: Record<string, any>) => string;
    names: string[] | undefined;
    colors: Array<string | undefined> | undefined;
    style?: Array<LineStyle | undefined>;
    average: AverageType | undefined;
    trendline: TrendlineType[] | undefined;
  };
  tooltipExtraContent?: React.ReactNode;
  preventTooltipDisplay?: boolean;
  hideTooltip?: boolean;
  showAverage?: boolean;
  showTrendline?: boolean;
  hideMissingDataConnection?: boolean;
  showMarker?: boolean;
  showMarkerLabel?: boolean;
  hidePadding?: boolean;
}
