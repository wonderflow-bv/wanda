import clsx from 'clsx';
import React, { CSSProperties } from 'react';

import * as styles from './bleed.module.css';

type BleedProps = {
  maxWidth?: string;
  offset?: string;
}

export const Bleed: FCChildrenClass<BleedProps> = ({
  children,
  maxWidth = '85ch',
  offset,
  style,
  className,
  ...props
}) => {
  const dynamicStyle: CSSProperties = {
    '--max-w': maxWidth,
    '--offset': offset,
  };

  return (
    <div style={{ ...dynamicStyle, ...style }} className={clsx(styles.Bleed, className)} {...props}>
      {children}
    </div>
  );
};
