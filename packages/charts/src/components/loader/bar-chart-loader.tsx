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
  <svg version="1.1" id="Bar-Chart-Loader" xmlns="http:www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`} data-testid="bar-chart-loader" {...otherProps}>
    <g className="visx-group" transform="translate(0, 0)" clipPath="url(#clip-path-loader)">
      <rect data-testid="loader" x="0" y="62" width="1086" height="270" fill="transparent" />
      <svg version="1.1" id="Line-Chart-Loader" xmlns="http:www.w3.org/2000/svg" viewBox="0 0 1074 270">
        <g>
          <g transform="translate(0 250)">
            <rect x="0" fill="slateGray" fillOpacity="0.75" width="24" height="51" rx="4" transform="scale(1 -1)" style={{ style: 'blur(0.5px)' }}><animate attributeName="height" dur="2.64s" values="31; 201; 30" repeatCount="indefinite" begin="0.95s" /></rect>
            <rect x="30" fill="slateGray" fillOpacity="0.93" width="24" height="60" rx="4" transform="scale(1 -1)" style={{ style: 'blur(0.2s5px)' }}><animate attributeName="height" dur="2.01s" values="30; 201; 30" repeatCount="indefinite" begin="0.25s" /></rect>
            <rect x="60" fill="slateGray" fillOpacity="0.32" width="24" height="100" rx="4" transform="scale(1 -1)" style={{ style: 'blur(0.5px)' }}><animate attributeName="height" dur="2.06s" values="31; 201; 31" repeatCount="indefinite" begin="0.51s" /></rect>
            <rect x="90" fill="slateGray" fillOpacity="0.23" width="24" height="200" rx="4" transform="scale(1 -1)" style={{ style: 'blur(0.5px)' }}><animate attributeName="height" dur="1.96s" values="31; 200; 30" repeatCount="indefinite" begin="0.60s" /></rect>
            <rect x="120" fill="slateGray" fillOpacity="0.51" width="24" height="120" rx="4" transform="scale(1 -1)" style={{ style: 'blur(0.5px)' }}><animate attributeName="height" dur="1.98s" values="31; 200; 31" repeatCount="indefinite" begin="0.22s" /></rect>
            <rect x="150" fill="slateGray" fillOpacity="0.12" width="24" height="180" rx="4" transform="scale(1 -1)" style={{ style: 'blur(0.25px)' }}><animate attributeName="height" dur="1.85s" values="30; 200; 30" repeatCount="indefinite" begin="0.41s" /></rect>
            <rect x="180" fill="slateGray" fillOpacity="0.74" width="24" height="130" rx="4" transform="scale(1 -1)" style={{ style: 'blur(0.5px)' }}><animate attributeName="height" dur="2.28s" values="30; 201; 31" repeatCount="indefinite" begin="0.70s" /></rect>
            <rect x="210" fill="slateGray" fillOpacity="0.04" width="24" height="900" rx="4" transform="scale(1 -1)" style={{ style: 'blur(0.5px)' }}><animate attributeName="height" dur="1.90s" values="30; 201; 31" repeatCount="indefinite" begin="0.34s" /></rect>
            <rect x="240" fill="slateGray" fillOpacity="0.14" width="24" height="110" rx="4" transform="scale(1 -1)" style={{ style: 'blur(0.5px)' }}><animate attributeName="height" dur="2.79s" values="31; 200; 31" repeatCount="indefinite" begin="0.49s" /></rect>
            <rect x="270" fill="slateGray" fillOpacity="0.73" width="24" height="40" rx="4" transform="scale(1 -1)" style={{ style: 'blur(0.5px)' }}><animate attributeName="height" dur="2.27s" values="30; 201; 31" repeatCount="indefinite" begin="0.66s" /></rect>
            <rect x="300" fill="slateGray" fillOpacity="0.25" width="24" height="60" rx="4" transform="scale(1 -1)" style={{ style: 'blur(0.5px)' }}><animate attributeName="height" dur="2.40s" values="30; 200; 31" repeatCount="indefinite" begin="0.64s" /></rect>
            <rect x="330" fill="slateGray" fillOpacity="0.82" width="24" height="30" rx="4" transform="scale(1 -1)" style={{ style: 'blur(0.25px)' }}><animate attributeName="height" dur="2.33s" values="31; 200; 30" repeatCount="indefinite" begin="0.64s" /></rect>
            <rect x="360" fill="slateGray" fillOpacity="0.67" width="24" height="70" rx="4" transform="scale(1 -1)" style={{ style: 'blur(0.25px)' }}><animate attributeName="height" dur="2.05s" values="30; 201; 31" repeatCount="indefinite" begin="0.66s" /></rect>
            <rect x="390" fill="slateGray" fillOpacity="0.29" width="24" height="75" rx="4" transform="scale(1 -1)" style={{ style: 'blur(0.5px)' }}><animate attributeName="height" dur="1.92s" values="30; 200; 30" repeatCount="indefinite" begin="0.76s" /></rect>
            <rect x="420" fill="slateGray" fillOpacity="0.68" width="24" height="130" rx="4" transform="scale(1 -1)" style={{ style: 'blur(0.5px)' }}><animate attributeName="height" dur="2.74s" values="30; 200; 31" repeatCount="indefinite" begin="0.70s" /></rect>
            <rect x="450" fill="slateGray" fillOpacity="0.70" width="24" height="140" rx="4" transform="scale(1 -1)" style={{ style: 'blur(0.25px)' }}><animate attributeName="height" dur="2.45s" values="31; 201; 30" repeatCount="indefinite" begin="0.41s" /></rect>
            <rect x="480" fill="slateGray" fillOpacity="0.76" width="24" height="190" rx="4" transform="scale(1 -1)" style={{ style: 'blur(0.5px)' }}><animate attributeName="height" dur="1.87s" values="31; 201; 31" repeatCount="indefinite" begin="0.08s" /></rect>
            <rect x="510" fill="slateGray" fillOpacity="0.19" width="24" height="110" rx="4" transform="scale(1 -1)" style={{ style: 'blur(0.5px)' }}><animate attributeName="height" dur="2.64s" values="31; 201; 30" repeatCount="indefinite" begin="0.32s" /></rect>
            <rect x="540" fill="slateGray" fillOpacity="0.20" width="24" height="90" rx="4" transform="scale(1 -1)" style={{ style: 'blur(0.5px)' }}><animate attributeName="height" dur="2.24s" values="30; 200; 31" repeatCount="indefinite" begin="0.33s" /></rect>
            <rect x="570" fill="slateGray" fillOpacity="0.32" width="24" height="120" rx="4" transform="scale(1 -1)" style={{ style: 'blur(0.5px)' }}><animate attributeName="height" dur="2.06s" values="30; 200; 30" repeatCount="indefinite" begin="0.59s" /></rect>
            <rect x="600" fill="slateGray" fillOpacity="0.49" width="24" height="20" rx="4" transform="scale(1 -1)" style={{ style: 'blur(0.25px)' }}><animate attributeName="height" dur="2.51s" values="31; 201; 31" repeatCount="indefinite" begin="0.83s" /></rect>
            <rect x="630" fill="slateGray" fillOpacity="0.63" width="24" height="60" rx="4" transform="scale(1 -1)" style={{ style: 'blur(0.5px)' }}><animate attributeName="height" dur="2.45s" values="30; 201; 31" repeatCount="indefinite" begin="0.42s" /></rect>
            <rect x="660" fill="slateGray" fillOpacity="0.73" width="24" height="90" rx="4" transform="scale(1 -1)" style={{ style: 'blur(0.5px)' }}><animate attributeName="height" dur="2.13s" values="30; 200; 30" repeatCount="indefinite" begin="0.19s" /></rect>
            <rect x="690" fill="slateGray" fillOpacity="0.61" width="24" height="120" rx="4" transform="scale(1 -1)" style={{ style: 'blur(0.5px)' }}><animate attributeName="height" dur="2.77s" values="30; 201; 30" repeatCount="indefinite" begin="0.23s" /></rect>
            <rect x="720" fill="slateGray" fillOpacity="0.76" width="24" height="110" rx="4" transform="scale(1 -1)" style={{ style: 'blur(0.5px)' }}><animate attributeName="height" dur="2.34s" values="31; 201; 30" repeatCount="indefinite" begin="0.51s" /></rect>
            <rect x="750" fill="slateGray" fillOpacity="0.21" width="24" height="180" rx="4" transform="scale(1 -1)" style={{ style: 'blur(0.25px)' }}><animate attributeName="height" dur="2.47s" values="30; 200; 30" repeatCount="indefinite" begin="0.66s" /></rect>
            <rect x="780" fill="slateGray" fillOpacity="0.76" width="24" height="150" rx="4" transform="scale(1 -1)" style={{ style: 'blur(0.5px)' }}><animate attributeName="height" dur="2.49s" values="31; 200; 31" repeatCount="indefinite" begin="0.46s" /></rect>
            <rect x="810" fill="slateGray" fillOpacity="0.86" width="24" height="20" rx="4" transform="scale(1 -1)" style={{ style: 'blur(0.25px)' }}><animate attributeName="height" dur="2.50s" values="30; 200; 30" repeatCount="indefinite" begin="0.56s" /></rect>
            <rect x="840" fill="slateGray" fillOpacity="0.86" width="24" height="200" rx="4" transform="scale(1 -1)" style={{ style: 'blur(0.5px)' }}><animate attributeName="height" dur="2.18s" values="31; 201; 31" repeatCount="indefinite" begin="0.50s" /></rect>
            <rect x="870" fill="slateGray" fillOpacity="0.63" width="24" height="120" rx="4" transform="scale(1 -1)" style={{ style: 'blur(0.5px)' }}><animate attributeName="height" dur="1.82s" values="30; 200; 30" repeatCount="indefinite" begin="0.40s" /></rect>
            <rect x="900" fill="slateGray" fillOpacity="0.03" width="24" height="100" rx="4" transform="scale(1 -1)" style={{ style: 'blur(0.5px)' }}><animate attributeName="height" dur="2.11s" values="30; 201; 31" repeatCount="indefinite" begin="0.83s" /></rect>
            <rect x="930" fill="slateGray" fillOpacity="0.97" width="24" height="190" rx="4" transform="scale(1 -1)" style={{ style: 'blur(0.5px)' }}><animate attributeName="height" dur="1.80s" values="30; 200; 30" repeatCount="indefinite" begin="0.26s" /></rect>
            <rect x="960" fill="slateGray" fillOpacity="0.04" width="24" height="80" rx="4" transform="scale(1 -1)" style={{ style: 'blur(0.5px)' }}><animate attributeName="height" dur="1.84s" values="31; 200; 30" repeatCount="indefinite" begin="0.33s" /></rect>
            <rect x="990" fill="slateGray" fillOpacity="0.58" width="24" height="30" rx="4" transform="scale(1 -1)" style={{ style: 'blur(0.25px)' }}><animate attributeName="height" dur="1.99s" values="30; 200; 31" repeatCount="indefinite" begin="0.69s" /></rect>
            <rect x="1020" fill="slateGray" fillOpacity="0.81" width="24" height="50" rx="4" transform="scale(1 -1)" style={{ style: 'blur(0.5px)' }}><animate attributeName="height" dur="2.57s" values="30; 200; 31" repeatCount="indefinite" begin="0.48s" /></rect>
            <rect x="1050" fill="slateGray" fillOpacity="0.95" width="24" height="20" rx="4" transform="scale(1 -1)" style={{ style: 'blur(0.5px)' }}><animate attributeName="height" dur="2.66s" values="30; 201; 30" repeatCount="indefinite" begin="0.73s" /></rect>
          </g>
        </g>
      </svg>
    </g>

  </svg>
);

BarChartLoader.displayName = 'BarChartLoader';
