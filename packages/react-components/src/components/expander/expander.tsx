import clsx from 'clsx';
import { SymbolNames } from 'packages/symbols';
import { CSSProperties, useCallback, useState } from 'react';

import { Button, Elevator, Stack } from '@/components';

import * as styles from './expander.module.css';

export type ExpanderProps = {
  expandLabel?: string;
  collapseLabel?: string;
  expandIcon?: SymbolNames;
  height?: string;
  defaultOpen?: boolean;
}

export const Expander: FCChildrenClass<ExpanderProps> = ({
  expandLabel = 'Show more',
  collapseLabel = 'Show less',
  expandIcon,
  height = '100px',
  defaultOpen = false,
  className,
  children,
  style,
  ...otherProps
}) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultOpen);

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
      <div className={styles.Content}>
        {children}
      </div>
      <Stack className={styles.Action} hAlign="center" vAlign="center" fill={false}>
        <Elevator resting={4}>
          <Button
            iconPosition="right"
            onClick={handleCollapse}
            icon={expandIcon}
          >
            {isCollapsed ? expandLabel : collapseLabel}
          </Button>
        </Elevator>
      </Stack>
    </div>
  );
};
