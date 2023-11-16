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

import { Group } from '@visx/group';
import { Text } from '@visx/text';
import _ from 'lodash';
import { useMemo } from 'react';

import { useThemeContext } from '../../providers';
import { HeadingsStyleConfig } from '../../types';
import { DeepPartial } from '../../types/main';
import { getCartesianStyleConfigFromTheme } from '../../utils/colors';

export type HeadingsProps = {
  /**
   * Set the title in the heading.
   */
  title?: string;
  /**
   * Set the subtitle in the heading.
   */
  subtitle?: string;
  /**
   * Set the position from top (Y axis).
   */
  top?: number;
  /**
   * Set the position from left (X axis).
   */
  left?: number;
  /**
   * Set custom headings style attributes.
   */
  config?: DeepPartial<HeadingsStyleConfig>;
}

export const Headings: React.FC<HeadingsProps> = ({
  title,
  subtitle,
  top = 0,
  left = 0,

  config,
}: HeadingsProps) => {
  const theme = useThemeContext();

  const mergeStyle: HeadingsStyleConfig = useMemo(() => {
    const { headings } = getCartesianStyleConfigFromTheme(theme);
    return _.merge(headings, config);
  }, [theme, config]);

  const { title: t, subtitle: s } = mergeStyle;

  if (!title) return null;

  return (
    <Group top={top} left={left}>
      <Text
        fontFamily={mergeStyle.fontFamily}
        fill={t.fill}
        fontSize={t.fontSize}
        fontWeight={t.fontWeight}
        lineHeight={t.lineHeight}
        textAnchor={t.textAnchor}
        verticalAnchor={t.verticalAnchor}
        x={t.x}
        y={t.y}
      >
        {title}
      </Text>
      <Text
        fontFamily={mergeStyle.fontFamily}
        fill={s.fill}
        fontSize={s.fontSize}
        fontWeight={s.fontWeight}
        lineHeight={s.lineHeight}
        textAnchor={s.textAnchor}
        verticalAnchor={s.verticalAnchor}
        x={s.x}
        y={s.y}
      >
        {subtitle}
      </Text>
    </Group>
  );
};

Headings.displayName = 'ChartHeadings';
