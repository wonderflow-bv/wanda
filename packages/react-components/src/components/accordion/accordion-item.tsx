import { useEffect } from 'react';

import { Disclosure, DisclosureProps } from '@/components';

import { useAccordionContext } from './accordion-context';

export type AccordionItemProps = Pick<
DisclosureProps,
'summary'
|'dimension'
|'padding'
|'open'
|'iconPosition'
|'contentMaxHeight'
> & {
  value: string;
}

export const AccordionItem: FCChildrenClass<AccordionItemProps> = ({
  summary,
  children,
  value,
  open,
  ...otherProps
}) => {
  const { openItem, setOpen } = useAccordionContext();

  useEffect(() => {
    if (open) setOpen(value);
  }, [open, setOpen, value]);

  return (
    <Disclosure
      onClick={() => {
        // console.log(openItem);
        setOpen(value);
      }}
      open={value === openItem}
      summary={summary}
      {...otherProps}
    >
      {children}
    </Disclosure>
  );
};
