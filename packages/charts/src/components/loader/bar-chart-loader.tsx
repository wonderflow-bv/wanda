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

import { SVGAttributes } from 'react';

export type BarChartLoaderProps = {
  width?: number;
  height?: number;
  otherProps?: SVGAttributes<SVGElement | SVGSVGElement>;
}

export const BarChartLoader = ({
  width = 800,
  height = 600,
  otherProps,
}: BarChartLoaderProps) => (
  <svg version="1.1" id="Line-Chart-Loader" xmlns="http:www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`} {...otherProps}>

    <g transform={`matrix(${width / 848},0,0,${height / (160 * 3)},0,0)`}>
      <g transform={`translate(0 ${height / 3})`}>
        <g>
          <rect fill="#454545" width="10" height="100" rx="4" transform="translate(0) rotate(180 5 50)">
            <animate attributeName="height" dur="1.1s" values="30; 100; 30" repeatCount="indefinite" />
          </rect>
          <rect x="17" fill="#454545" width="10" height="100" rx="4" transform="translate(3) rotate(180 20 50)">
            <animate attributeName="height" dur="1.25s" values="30; 100; 30" repeatCount="indefinite" begin="0.1s" />
          </rect>
          <rect x="40" fill="#454545" width="10" height="100" rx="4" transform="translate(6) rotate(180 38 50)">
            <animate attributeName="height" dur="1.15s" values="30; 100; 30" repeatCount="indefinite" begin="0.3s" />
          </rect>
          <rect x="60" fill="#454545" width="10" height="100" rx="4" transform="translate(9) rotate(180 55 50)">
            <animate attributeName="height" dur="1.25s" values="30; 100; 30" repeatCount="indefinite" begin="0.5s" />
          </rect>
          <rect x="80" fill="#454545" width="10" height="100" rx="4" transform="translate(12) rotate(180 72 50)">
            <animate attributeName="height" dur="1.0s" values="30; 100; 30" repeatCount="indefinite" begin="0.1s" />
          </rect>
        </g>
      </g>

    </g>

  </svg>
);

BarChartLoader.displayName = 'BarChartLoader';
