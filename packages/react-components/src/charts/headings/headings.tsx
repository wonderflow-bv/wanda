import { Group } from '@visx/group';
import { Text } from '@visx/text';
import _ from 'lodash';
import { useMemo } from 'react';

import { HeadingsStyleConfig, ThemeVariants } from '../types';
import { DeepPartial } from '../types/main';
import { getCartesianStyleConfigFromTheme } from '../utils/colors';

export type HeadingsProps = {
  /**
   *
   */
  theme?: ThemeVariants;
  /**
   *
   */
  title?: string;
  /**
   *
   */
  subtitle?: string;
  /**
   *
   */
  top?: number;
  /**
   *
   */
  left?: number;
  /**
   *
   */
  config?: DeepPartial<HeadingsStyleConfig>;
}

export const Headings = ({
  theme = 'light',
  title,
  subtitle,
  top = 0,
  left = 0,

  config,
}: HeadingsProps) => {
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

Headings.displayName = 'Headings';
