import clsx from 'clsx';
import {
  forwardRef, PropsWithChildren,
} from 'react';

import { AccordionItemProps, Stack } from '@/components';

import * as styles from './accordion.module.css';
import { AccordionContextProvider } from './accordion-context';

export type AccordionProps = PropsWithChildren<PropsWithClass> & {
  /**
   * Set the item to open by default when the accordion is rendered.
   */
  defaultOpen?: AccordionItemProps['value'];
  /**
   * Show visual separator between accordion items
   */
  showSeparators?: boolean;
}

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(({
  className,
  defaultOpen,
  showSeparators = true,
  children,
  style,
}, forwardedRef) => (
  <AccordionContextProvider defaultOpen={defaultOpen}>
    <Stack
      rowGap={8}
      ref={forwardedRef}
      data-accordion-separators={showSeparators}
      className={clsx(styles.Accordion, className)}
      style={style}
    >
      {children}
    </Stack>
  </AccordionContextProvider>
));
