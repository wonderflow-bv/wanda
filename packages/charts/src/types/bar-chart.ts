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
import { Charts, SortingType } from './main';

export type BarChartIndex = Partial<AxisProps> & {
  dataKey: string;
};

export type BarChartOverlay = Partial<AxisProps> & {
  dataKey: string;
  style?: BarStyle;
  rename?: string;
};

export type BarChartSeries = Partial<AxisProps> & {
  dataKey: string[];
  groupBy?: string[];
  style?: Array<BarStyle | undefined>;
  rename?: (...args: any) => string;
};

export type BarChartTooltip = {
  extraSeriesData?: (...args: any) => string;
  extraOverlayData?: (...args: any) => string;
  extraContent?: React.ReactNode;
};

export type BarStyle = {
  fill?: string;
}

export type BarChartMetadata = {
  type: Charts;
  isStacked: boolean;
  sortBy: SortingType;
  index: string;
  series: {
    dataKey: string[];
    names: string[];
    colors: Array<string | undefined>;
    style?: Array<BarStyle | undefined>;
  };
  overlay: {
    dataKey?: string;
    name: string;
    color: string;
    style?: BarStyle;
  };
  tooltip?: BarChartTooltip;
  hideMissingDataConnection?: boolean;
  showMarker?: boolean;
  showMarkerLabel?: boolean;
  hidePadding?: boolean;
}

// const dataStructure = [
//   {
//     product: 'productA',
//     continents: [
//       {
//         name: 'europe',
//         value: 100,
//         countries: [
//           {
//             name: 'italy',
//             value: 100,
//           },
//           {
//             name: 'france',
//             value: 100,
//           },
//         ],
//       },
//       {
//         name: 'africa',
//         value: 100,
//         countries: [
//           {
//             name: 'algeria',
//             value: 100,
//           },
//           {
//             name: 'tunisia',
//             value: 100,
//           },
//         ],
//       },
//     ],
//   },
// ];

// const index = dataStructure[0].product; // 'product'
// const series = dataStructure[0].continents[0].value; // 'continents[x].value'
// const groupBy = dataStructure[0].continents[0].name; // 'continents[x].name'
