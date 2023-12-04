/*
 * Copyright 2022-2023 Wonderflow Design Team
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

import { useMemo } from 'react';

import { useDataContext, useThemeContext } from '../../providers';
import { Charts } from '../../types';

export type LoaderProp = {
  isLoading?: boolean;
  top?: number;
  left?: number;
  width?: number;
  height?: number;
}

const pathString = (
  pathNum = 1,
  pointsNum = 4,
  width = 800,
  height = 600,
) => {
  const lines = Array(pathNum).fill('').map((_) => {
    const start = 'M ';
    const end = ';';

    const points = Array(pointsNum).fill('').map((_, i) => {
      const index = (i / (pointsNum - 1));
      const selector = i === 1 ? 'S' : '';
      return `${selector} ${(width * index).toFixed(2)} ${(Math.random() * height).toFixed(2)}`;
    });

    return start + points.join(' ') + end;
  });

  return lines.concat(lines[0]).join('\n');
};

export const Loader = ({
  isLoading = false,
  top = 0,
  left = 0,
  width = 800,
  height = 600,
}: LoaderProp) => {
  const theme = useThemeContext();
  const { metadata } = useDataContext();

  const isLineChart = metadata?.type === Charts.LINE_CHART;
  const isBarChart = metadata?.type === Charts.BAR_CHART;
  const fill = 'transparent';
  const stroke = theme === 'light' ? 'slateGray' : 'lightGray';

  const linesAnimatedString = useMemo(() => pathString(4, 13, width, height / 2), [height, width]);
  const linesAnimatedString2 = useMemo(() => pathString(4, 9, width, height / 2), [height, width]);
  const linesAnimatedString3 = useMemo(() => pathString(4, 9, width, height / 2), [height, width]);
  const linesAnimatedString4 = useMemo(() => pathString(12, 9, width, height / 2), [height, width]);

  if (!isLoading) return null;

  return (
    <svg version="1.1" id="Chart-Loader" xmlns="http:www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`}>

      <rect fill={fill} x={left} y={top} width={width} height={height} />

      {isLineChart && (
        <g transform={`translate(${left} ${height / 3})`}>

          <path stroke={stroke} strokeWidth={2} strokeLinecap="round" fill="none" opacity={0.4} style={{ filter: 'blur(2px)' }} strokeDasharray="3 100">
            <animate
              id="animation-to-check"
              repeatCount="indefinite"
              fill="freeze"
              attributeName="d"
              dur="24s"
              values={linesAnimatedString4}
            />
          </path>

          <path stroke={stroke} strokeWidth={1} strokeLinecap="round" fill="none" opacity={0.2} style={{ filter: 'blur(5px)' }}>
            <animate
              id="animation-to-check"
              repeatCount="indefinite"
              fill="freeze"
              attributeName="d"
              dur="24s"
              values={linesAnimatedString4}
            />
          </path>

          <path stroke={stroke} strokeWidth={2} strokeLinecap="round" fill="none" opacity={0.2} style={{ filter: 'blur(2px)' }}>
            <animate
              id="animation-to-check"
              repeatCount="indefinite"
              fill="freeze"
              attributeName="d"
              dur="12s"
              values={linesAnimatedString3}
            />
          </path>

          <path stroke={stroke} strokeWidth={3} strokeLinecap="round" fill="none" opacity={0.4} style={{ filter: 'blur(1px)' }}>
            <animate
              id="animation-to-check"
              repeatCount="indefinite"
              fill="freeze"
              attributeName="d"
              dur="6s"
              values={linesAnimatedString2}
            />
          </path>

          <path stroke={stroke} strokeWidth={4} strokeLinecap="round" fill="none">
            <animate
              id="animation-to-check"
              repeatCount="indefinite"
              fill="freeze"
              attributeName="d"
              dur="5s"
              values={linesAnimatedString}
            />
          </path>

        </g>
      )}

      {isBarChart && (
        <g>
          <rect fill="#454545" width="10" height="100" rx="4" transform="translate(0) rotate(180 5 50)">
            <animate attributeName="height" attributeType="XML" dur="1.1s" values="30; 100; 30" repeatCount="indefinite" />
          </rect>
          <rect x="17" fill="#454545" width="10" height="100" rx="4" transform="translate(3) rotate(180 20 50)">
            <animate attributeName="height" attributeType="XML" dur="1.25s" values="30; 100; 30" repeatCount="indefinite" begin="0.1s" />
          </rect>
          <rect x="40" fill="#454545" width="10" height="100" rx="4" transform="translate(6) rotate(180 38 50)">
            <animate attributeName="height" attributeType="XML" dur="1.15s" values="30; 100; 30" repeatCount="indefinite" begin="0.3s" />
          </rect>
          <rect x="60" fill="#454545" width="10" height="100" rx="4" transform="translate(9) rotate(180 55 50)">
            <animate attributeName="height" attributeType="XML" dur="1.25s" values="30; 100; 30" repeatCount="indefinite" begin="0.5s" />
          </rect>
          <rect x="80" fill="#454545" width="10" height="100" rx="4" transform="translate(12) rotate(180 72 50)">
            <animate attributeName="height" attributeType="XML" dur="1.0s" values="30; 100; 30" repeatCount="indefinite" begin="0.1s" />
          </rect>
        </g>
      )}

    </svg>
  );
};

