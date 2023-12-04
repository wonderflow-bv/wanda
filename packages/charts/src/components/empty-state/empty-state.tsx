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
import { Text } from '@visx/text';

export type EmptyStateProps = {
  position: {
    top: number;
    left: number;
  };
  dimension: {
    maxWidth: number;
    maxHeight: number;
  };
  customEmptyState?: React.ReactNode;
  isVisible?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  position = { top: 0, left: 0 },
  dimension = { maxWidth: 800, maxHeight: 600 },
  customEmptyState,
  isVisible = false,
}: EmptyStateProps) => {
  const { top, left } = position;
  const { maxWidth, maxHeight } = dimension;
  if (!isVisible) return null;

  return (
    <>
      {customEmptyState
        ? (
          <foreignObject x={left} y={top} width={maxWidth} height={maxHeight}>
            {customEmptyState}
          </foreignObject>
        )
        : (
          <Text
            x={left + maxWidth / 2}
            y={top + maxHeight / 2}
            textAnchor="middle"
            verticalAnchor="middle"
            fontSize={14}
            fontWeight={600}
          >
            No Data Available
          </Text>
        )}
    </>
  );
};

EmptyState.displayName = 'EmptyState';
