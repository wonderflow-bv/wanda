import clsx from 'clsx';
import {
  domMax, LazyMotion, m,
} from 'framer-motion';
import { CSSProperties, useCallback, useState } from 'react';
import { useUIDSeed } from 'react-uid';

import { Button, Elevator, Stack } from '@/components';

import * as styles from './expander.module.css';

export type ExpanderProps = {
  expandLabel?: string;
  collapseLabel?: string;
  height?: string;
  defaultOpen?: boolean;
}

export const Expander: FCChildrenClass<ExpanderProps> = ({
  expandLabel = 'Show more',
  collapseLabel = 'Show less',
  height = '100px',
  defaultOpen = false,
  className,
  children,
  style,
  ...otherProps
}) => {
  const [isCollapsed, setIsCollapsed] = useState(!defaultOpen);
  const uid = useUIDSeed();

  const dynamicStyle: CSSProperties = {
    '--height': height,
  };

  const handleCollapse = useCallback(
    () => {
      setIsCollapsed(s => !s);
    },
    [],
  );

  return (
    <div
      style={{ ...dynamicStyle, style }}
      className={clsx(styles.Expander, className)}
      data-expander-collapsed={isCollapsed}
      {...otherProps}
    >
      <LazyMotion features={domMax}>
        <m.div
          className={styles.Content}
          id={uid('expander-content')}
          animate={!isCollapsed ? { height: 'auto' } : {
            height, overflow: 'hidden',
          }}
          transition={{ ease: 'easeOut', duration: 0.2, delay: 0 }}
          initial={false}
        >
          {children}
        </m.div>
      </LazyMotion>
      <Stack className={styles.Action} hAlign="center" vAlign="center" fill={false}>
        <Elevator resting={isCollapsed ? 4 : 0}>
          <Button
            iconPosition="right"
            aria-expanded={!isCollapsed}
            aria-controls={uid('expander-content')}
            onClick={handleCollapse}
          >
            {isCollapsed ? expandLabel : collapseLabel}
          </Button>
        </Elevator>
      </Stack>
    </div>
  );
};
