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
import { Group } from '@visx/group';
import { Text } from '@visx/text';

import { useThemeContext } from '../../providers';
import { themes } from '../../style-config';

export type EmptyStateProps = {
  position: {
    top: number;
    left: number;
  };
  dimension: {
    maxWidth: number;
    maxHeight: number;
  };
  message?: string;
  customEmptyState?: React.ReactNode;
  isVisible?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  position,
  dimension,
  message,
  customEmptyState,
  isVisible,
}: EmptyStateProps) => {
  const theme = useThemeContext();
  const { top, left } = position;
  const { maxWidth, maxHeight } = dimension;

  if (!isVisible) return null;

  return (
    <Group clipPath="url(#clip-path-cartesian-chart)">
      {customEmptyState
        ? (
          <foreignObject x={left} y={top} width={maxWidth} height={maxHeight} data-testid="empty-state-custom">
            {customEmptyState}
          </foreignObject>
        )
        : (
          <Group>
            <Text
              data-testid="empty-state"
              x={left + maxWidth / 2}
              y={top + maxHeight / 2}
              textAnchor="middle"
              verticalAnchor="start"
              fontSize={14}
              fontWeight={600}
              fill={themes[theme].headings.title}
            >
              No Data Available
            </Text>
            {message && (
              <Text
                data-testid="empty-state-message"
                x={left + maxWidth / 2}
                y={top + maxHeight / 2}
                dy={16}
                textAnchor="middle"
                verticalAnchor="start"
                fontSize={12}
                fontWeight={400}
                width={maxWidth * 0.8}
                fill={themes[theme].headings.subtitle}
              >
                {message}
              </Text>
            )}
          </Group>

        )}
    </Group>
  );
};

EmptyState.displayName = 'EmptyState';
