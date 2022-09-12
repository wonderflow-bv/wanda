import { Disclosure, DisclosureProps } from '@/components';

export type AccordionItemProps = {
  summary: DisclosureProps['summary'];
}

export const AccordionItem: FCChildrenClass<AccordionItemProps> = ({
  summary,
  children,
}) => (
  <Disclosure summary={summary}>
    {children}
  </Disclosure>
);
