import clsx from 'clsx';
import { forwardRef, Ref } from 'react';

import { Stack, Symbol, SymbolProps } from '@/components';

import * as styles from './chip.module.css';

export type ChipProps = {
  /**
   * Set the dimension of the component.
   */
  dimension?: 'small' | 'regular' | 'big';
  /**
   * Set a color from one of the provided values.
   */
  color?: 'gray' | 'cyan' | 'green' | 'purple' | 'yellow' | 'red' | 'blue' | 'magenta' | 'violet' | 'indigo' | 'mint' | 'dipsy' | 'salmon';
  /**
   * Make the chip dismissable. When `true` adds a close button on the side.
   */
  interactive?: boolean;
  /**
   * Callback function to be called when the dismiss button is pressed.
   */
  onDismissClick?: () => void;
}

export const Chip: FCChildrenClass<ChipProps> = forwardRef(({
  children,
  className,
  dimension = 'regular',
  color = 'gray',
  interactive,
  onDismissClick,
  ...otherProps
}, forwardedRef: Ref<HTMLSpanElement>) => {
  const properties = {
    small: {
      iconSize: 12,
      style: 'solid',
    },
    regular: {
      iconSize: 12,
      style: 'solid',
    },
    big: {
      iconSize: 16,
      style: 'outline',
    },
  };

  return (
    <Stack
      as="span"
      direction="row"
      columnGap={8}
      inline
      data-chip-color={color}
      data-chip-dimension={dimension}
      className={clsx(styles.Chip, className)}
      vAlign="center"
      ref={forwardedRef}
      {...otherProps}
    >
      <b>{children}</b>
      {interactive && (
        <button onClick={interactive && onDismissClick} className={styles.Action} type="button">
          <Symbol
            source="xmark"
            weight={properties[dimension].style as SymbolProps['weight']}
            dimension={properties[dimension].iconSize as SymbolProps['dimension']}
          />
        </button>
      )}
    </Stack>
  );
});

Chip.displayName = 'Chip';
