import {
  forwardRef, ForwardRefExoticComponent, PropsWithChildren,
} from 'react';

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
      {children}
    </Stack>
  </AccordionContextProvider>
)) as AccordionComponent;

Accordion.Item = AccordionItem;
