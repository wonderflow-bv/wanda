import { Stack, StackProps } from '@wonderflow/react-components';
import clsx from 'clsx';
import React, { CSSProperties } from 'react';

import styles from './live-area.module.css';

export type LiveAreaProps = StackProps & {
  minHeight?: string;
  maxHeight?: string;
}

export const LiveArea: FCChildrenClass<LiveAreaProps> = ({
  children,
  className,
  minHeight = '200px',
  maxHeight,
  style,
  direction = 'row',
  ...props
}) => {
  const dynamicStyle: CSSProperties = {
    '--min-height': minHeight,
    '--max-height': maxHeight,
  };

  return (
    <Stack
      className={clsx(styles.LiveArea, className)}
      wrap
      fill={false}
      hAlign="center"
      vAlign="center"
      direction={direction}
      columnGap={16}
      rowGap={16}
      style={{ ...dynamicStyle, ...style }}
      {...props}
    >
      {children}
    </Stack>
  );
};
