import { domMax, LazyMotion, m } from 'framer-motion';
import { forwardRef, PropsWithChildren, ReactNode } from 'react';

import {
  Stack, StackProps, Symbol, SymbolProps, Text, Title,
} from '@/components';

import * as styles from './info-state.module.css';

export type InfoStateProps = PropsWithClass<{
  /**
   * Set the main tagline of the info state. This should be catchy and short
   * as much as possible.
   */
  title: ReactNode;
  /**
   * The icon to display. This is used to enforce the message of the info state.
   * This is not displayed if `image` is set.
   */
  icon?: SymbolProps['source'];
  /**
   * Set the icon color. Please use the correct color based on the type of the message.
   * Eg. Don't use `green` for negative informations.
   */
  iconColor?: 'gray' | 'cyan' | 'green' | 'purple' | 'yellow' | 'red' | 'blue';
  /**
   * An image may be used instead of an icon. The image is centered and scaled.
   */
  image?: string;
  /**
   * Set the direction of the content (column or row).
   */
  direction?: StackProps['direction'];
  /**
   * Pass the suplementary actions to the info state. Even if you can pass
   * as many elements as you want, we suggest to add no more than two actions.
   */
  actions?: ReactNode;
}>

export const InfoState = forwardRef<HTMLDivElement, PropsWithChildren<InfoStateProps>>(({
  className,
  children,
  title,
  icon,
  image,
  direction = 'column',
  iconColor = 'blue',
  actions,
  ...otherProps
}, forwardedRef) => {
  const isHorizontal = direction === 'row';

  return (
    <Stack
      ref={forwardedRef}
      direction={direction}
      rowGap={24}
      columnGap={32}
      className={className}
      hAlign={isHorizontal ? 'start' : 'center'}
      vAlign={(isHorizontal && image) ? 'center' : 'start'}
      fill={false}
      wrap={!!image}
      {...otherProps}
    >
      <LazyMotion features={domMax}>
        {(!image && icon) && (
        <m.span
          data-info-state-icon-color={iconColor}
          className={styles.IconWrapper}
          animate={{
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatDelay: 5.2,
            repeatType: 'reverse',
            type: 'spring',
          }}
        >
          <Symbol source={icon} dimension={48} />
        </m.span>
        )}

        {(image && !icon) && <img className={styles.Image} alt="" width="400" src={image} loading="lazy" decoding="async" />}

        <Stack
          rowGap={16}
          hAlign={isHorizontal ? 'start' : 'center'}
          vAlign="center"
          fill={false}
        >
          <Title maxWidth="20ch" textAlign={isHorizontal ? 'start' : 'center'} level="4">{title}</Title>
          <Text as="div" maxWidth="60ch" dimmed={6} textAlign={isHorizontal ? 'start' : 'center'}>{children}</Text>
          {actions && (
            <Stack vPadding={16} inline direction="row" columnGap={16} rowGap={16} wrap>
              {actions}
            </Stack>
          )}
        </Stack>
      </LazyMotion>
    </Stack>
  );
});

InfoState.displayName = 'InfoState';
