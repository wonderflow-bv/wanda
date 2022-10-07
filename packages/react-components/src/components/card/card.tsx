import type { TokensTypes } from '@wonderflow/tokens/platforms/web';
import tkns from '@wonderflow/tokens/platforms/web/tokens.json';
import clsx from 'clsx';
import { CSSProperties, forwardRef, ReactNode } from 'react';

import { Polymorphic, Stack, StackProps } from '@/components';

import * as styles from './card.module.css';

export type CardProps = Pick<
StackProps,
'wrap' | 'columnGap' | 'rowGap' | 'vAlign' | 'hAlign'>
& {
  /**
   * Set the padding on each side of the card.
   */
  padding?: false | TokensTypes['space'];
  /**
   * Content rendered inside the card on the left side, before children.
   */
  left?: ReactNode;
  /**
   * Content rendered inside the card on the right side, after children.
   */
  right?: ReactNode;
  /**
   * Add a border to the card to increase its visual weight and contrast.
   */
  bordered?: boolean;
  /**
   * Define the edge radius of the card.
   */
  radius?: false | TokensTypes['radius'];
  /**
   * Change the background color of the card.
   */
  dimmed?: 0 | 1 | 2;
  /**
   * Make the card vibrant. Add tranlucent background.
   */
  vibrant?: boolean;
  /**
   * Change the background color of the card when it is hovered.
   */
  highlightOnHover?: boolean;
}

type PolymorphicCard = Polymorphic.ForwardRefComponent<'div', CardProps>;

export const Card = forwardRef(({
  as: Wrapper = 'div',
  children,
  className,
  padding = 24,
  radius = 8,
  left,
  right,
  dimmed,
  bordered,
  columnGap = 24,
  rowGap = 24,
  vAlign = 'start',
  hAlign = 'space-between',
  vibrant = false,
  highlightOnHover = false,
  wrap,
  style,
  ...otherProps
}, forwardedRef) => {
  const dynamicStyle: CSSProperties = {
    '--padding': padding && tkns.space[padding],
    '--radius': radius && tkns.radius[radius],
  };

  return (
    <Wrapper
      ref={forwardedRef}
      className={clsx(styles.Card, className)}
      style={{ ...dynamicStyle, ...style }}
      data-card-dimmed={dimmed}
      data-card-bordered={bordered}
      data-card-vibrant={vibrant}
      data-card-highlight-hover={highlightOnHover}
      {...otherProps}
    >
      <Stack
        direction="row"
        fill={false}
        vAlign={vAlign}
        hAlign={hAlign}
        columnGap={columnGap}
        rowGap={rowGap}
        wrap={wrap}
      >
        {left && <div className={styles.Left}>{left}</div>}

        {children && (
          <div className={styles.Content}>
            {children}
          </div>
        )}

        {right && (
          <div className={styles.Right}>
            {right}
          </div>
        )}
      </Stack>
    </Wrapper>
  );
}) as PolymorphicCard;
