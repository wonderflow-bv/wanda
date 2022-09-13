import clsx from 'clsx';
import {
  forwardRef, ForwardRefExoticComponent, PropsWithChildren,
} from 'react';

import { AccordionItem, AccordionItemProps, Stack } from '@/components';

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
type AccordionComponent = ForwardRefExoticComponent<AccordionProps> & {
  Item: typeof AccordionItem;
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
)) as AccordionComponent;

Accordion.Item = AccordionItem;
