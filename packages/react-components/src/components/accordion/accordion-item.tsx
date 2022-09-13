import { Disclosure, DisclosureProps } from '@/components';

import { useAccordionContext } from './accordion-context';

export type AccordionItemProps = Pick<
DisclosureProps,
'summary'
|'dimension'
|'padding'
|'iconPosition'
|'contentMaxHeight'
> & {
  /**
   * Assign a value to the single accordion item. This is used to define
   * the default opened item on mount.
   */
  value: string;
}

export const AccordionItem: FCChildrenClass<AccordionItemProps> = ({
  summary,
  children,
  value,
  ...otherProps
}) => {
  const { openItem, setOpen } = useAccordionContext();

  return (
    <Disclosure
      onClick={() => setOpen(value)}
      open={value === openItem}
      summary={summary}
      {...otherProps}
    >
      {children}
    </Disclosure>
  );
};
