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

export type LineChartLoaderProps = {
  width?: number;
  height?: number;
  otherProps?: SVGAttributes<SVGElement | SVGSVGElement>;
}

export const LineChartLoader = ({
  width = 800,
  height = 600,
  otherProps,
}: LineChartLoaderProps) => (
  <svg version="1.1" id="Line-Chart-Loader" xmlns="http:www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`} data-testid="line-chart-loader" {...otherProps}>

    <g transform={`matrix(${width / 850},0,0,${height / 480},0,0)`}>
      <g transform={`translate(0 ${height / 3})`}>
        <path stroke="slateGray" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.25" style={{ filter: 'blur(4px)' }}>
          <animate
            id="animation-to-check"
            repeatCount="indefinite"
            fill="freeze"
            attributeName="d"
            values="M  0.00 23.11 S 141.33 145.08  282.67 78.36  424.00 79.81  565.33 131.93  706.67 136.78  848.00 22.27;
                    M  0.00 70.45 S 141.33 162.69  282.67 96.34  424.00 208.94  565.33 143.47  706.67 190.44  848.00 37.12;
                    M  0.00 8.81 S 141.33 52.29  282.67 16.75  424.00 186.90  565.33 38.83  706.67 198.72  848.00 86.75;
                    M  0.00 50.76 S 141.33 140.50  282.67 195.50  424.00 131.19  565.33 81.52  706.67 165.20  848.00 144.93;
                    M  0.00 143.93 S 141.33 117.47  282.67 74.91  424.00 91.48  565.33 97.48  706.67 0.38  848.00 84.98;
                    M  0.00 145.06 S 141.33 89.44  282.67 211.80  424.00 169.36  565.33 161.16  706.67 87.35  848.00 153.68;
                    M  0.00 23.11 S 141.33 145.08  282.67 78.36  424.00 79.81  565.33 131.93  706.67 136.78  848.00 22.27;"
            dur="20s"
            keySplines=" 0.1 0.8 0.2 1; 0.1 0.7 0.3 1; 0.1 0.8 0.2 1; 0.1 0.6 0.2 1; 0.1 0.9 0.3 1; 0.1 0.8 0.2 1"
            keyTimes=" 0; 0.11; 0.31; 0.51; 0.61; 0.81; 1"
            calcMode="spline"
          />
        </path>
        <path stroke="slateGray" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" style={{ filter: 'blur(1px)' }}>
          <animate
            id="animation-to-check"
            repeatCount="indefinite"
            fill="freeze"
            attributeName="d"
            values="M  0.00 140.35 S 106.00 21.23  212.00 36.97  318.00 166.91  424.00 35.35  530.00 0.94  636.00 30.27  742.00 44.27  848.00 161.16;
                    M  0.00 47.10 S 106.00 22.99  212.00 43.71  318.00 141.87  424.00 136.20  530.00 79.36  636.00 51.42  742.00 158.07  848.00 214.18;
                    M  0.00 196.44 S 106.00 90.57  212.00 27.36  318.00 200.04  424.00 117.20  530.00 143.58  636.00 184.60  742.00 149.63  848.00 170.34;
                    M  0.00 4.32 S 106.00 78.52  212.00 117.52  318.00 128.90  424.00 108.19  530.00 137.21  636.00 129.57  742.00 75.91  848.00 2.85;
                    M  0.00 125.58 S 106.00 9.06  212.00 9.50  318.00 152.78  424.00 103.22  530.00 40.77  636.00 48.34  742.00 142.04  848.00 27.54;
                    M  0.00 174.05 S 106.00 84.41  212.00 21.07  318.00 40.66  424.00 169.71  530.00 204.73  636.00 142.72  742.00 115.59  848.00 139.64;
                    M  0.00 140.35 S 106.00 21.23  212.00 36.97  318.00 166.91  424.00 35.35  530.00 0.94  636.00 30.27  742.00 44.27  848.00 161.16;"
            dur="20s"
            keySplines=" 0.1 0.8 0.2 1; 0.1 0.7 0.3 1; 0.1 0.8 0.2 1; 0.1 0.6 0.2 1; 0.1 0.9 0.3 1; 0.1 0.8 0.2 1"
            keyTimes=" 0; 0.11; 0.31; 0.51; 0.61; 0.81; 1"
            calcMode="spline"
          />
        </path>
        <path stroke="slateGray" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.85">
          <animate
            id="animation-to-check"
            repeatCount="indefinite"
            fill="freeze"
            attributeName="d"
            values="M  0.00 158.43 S 70.67 80.68  141.33 140.46  212.00 26.02  282.67 172.46  353.33 94.96  424.00 80.73  494.67 184.51  565.33 22.53  636.00 180.46  706.67 163.18  777.33 131.47  848.00 121.13;
                    M  0.00 67.96 S 70.67 206.71  141.33 102.49  212.00 24.74  282.67 168.58  353.33 98.95  424.00 32.61  494.67 212.75  565.33 208.46  636.00 150.15  706.67 157.76  777.33 60.82  848.00 73.79;
                    M  0.00 114.15 S 70.67 46.37  141.33 164.14  212.00 104.24  282.67 96.06  353.33 189.11  424.00 156.49  494.67 153.64  565.33 176.73  636.00 149.73  706.67 86.67  777.33 16.49  848.00 101.95;
                    M  0.00 120.25 S 70.67 112.62  141.33 9.70  212.00 180.98  282.67 194.29  353.33 176.21  424.00 150.37  494.67 211.59  565.33 19.30  636.00 188.88  706.67 88.40  777.33 58.85  848.00 96.13;
                    M  0.00 28.96 S 70.67 200.92  141.33 27.90  212.00 63.87  282.67 99.99  353.33 20.86  424.00 110.84  494.67 11.48  565.33 202.32  636.00 90.08  706.67 88.33  777.33 175.65  848.00 81.52;
                    M  0.00 76.74 S 70.67 60.90  141.33 198.49  212.00 171.39  282.67 32.42  353.33 161.88  424.00 116.87  494.67 69.69  565.33 137.11  636.00 39.73  706.67 211.02  777.33 201.82  848.00 114.20;
                    M  0.00 158.43 S 70.67 80.68  141.33 140.46  212.00 26.02  282.67 172.46  353.33 94.96  424.00 80.73  494.67 184.51  565.33 22.53  636.00 180.46  706.67 163.18  777.33 131.47  848.00 121.13;"
            dur="20s"
            keySplines="0.1 0.8 0.2 1; 0.1 0.7 0.3 1; 0.1 0.8 0.2 1; 0.1 0.6 0.2 1; 0.1 0.9 0.3 1; 0.1 0.8 0.2 1"
            keyTimes=" 0; 0.11; 0.31; 0.51; 0.61; 0.81; 1"
            calcMode="spline"
          />
        </path>
      </g>

    </g>

  </svg>
);

LineChartLoader.displayName = 'LineChartLoader';
