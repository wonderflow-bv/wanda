import {
  forwardRef, ForwardRefExoticComponent, PropsWithChildren,
} from 'react';
import { RovingTabIndexProvider } from 'react-roving-tabindex';

import { AccordionItem, AccordionItemProps, Stack } from '@/components';

import { AccordionContextProvider } from './accordion-context';

export type AccordionProps = PropsWithChildren<PropsWithClass> & {
  /**
   * Set the item to open by default when the accordion is rendered.
   */
  defaultOpen?: AccordionItemProps['value'];
}
type AccordionComponent = ForwardRefExoticComponent<AccordionProps> & {
  Item: typeof AccordionItem;
}

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(({
  className,
  defaultOpen,
  children,
}, forwardedRef) => (
  <AccordionContextProvider defaultOpen={defaultOpen}>
    <Stack rowGap={8} ref={forwardedRef} className={className}>
      <RovingTabIndexProvider options={{ direction: 'vertical', loopAround: true }}>
        {children}
      </RovingTabIndexProvider>
    </Stack>
  </AccordionContextProvider>
)) as AccordionComponent;

Accordion.Item = AccordionItem;
