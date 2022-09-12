import {
  forwardRef, ForwardRefExoticComponent, PropsWithChildren,
} from 'react';
import { RovingTabIndexProvider } from 'react-roving-tabindex';

import { AccordionItem, Stack } from '@/components';

import { AccordionContextProvider } from './accordion-context';

export type AccordionProps = PropsWithChildren<PropsWithClass>
type AccordionComponent = ForwardRefExoticComponent<AccordionProps> & {
  Item: typeof AccordionItem;
}

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(({
  className,
  children,
}, forwardedRef) => (
  <AccordionContextProvider>
    <Stack rowGap={8} ref={forwardedRef} className={className}>
      <RovingTabIndexProvider options={{ direction: 'vertical', loopAround: true }}>
        {children}
      </RovingTabIndexProvider>
    </Stack>
  </AccordionContextProvider>
)) as AccordionComponent;

Accordion.Item = AccordionItem;
