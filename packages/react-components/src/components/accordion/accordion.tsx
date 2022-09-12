import {
  forwardRef, ForwardRefExoticComponent, PropsWithChildren,
} from 'react';

import { AccordionItem, AccordionItemProps } from '@/components';

export type AccordionProps = PropsWithChildren<PropsWithClass>

type AccordionComponent = ForwardRefExoticComponent<AccordionProps> & {
  Item: typeof AccordionItem;
}

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(({
  className,
  children,
}, forwardedRef) => (
  <div ref={forwardedRef} className={className}>
    {children}
  </div>
)) as AccordionComponent;

Accordion.Item = AccordionItem;
