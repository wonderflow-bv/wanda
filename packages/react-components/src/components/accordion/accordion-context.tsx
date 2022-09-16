import constate from 'constate';
import {
  useCallback, useState,
} from 'react';

import { AccordionItemProps } from './accordion-item';

type AccProps = AccordionItemProps

type AccordionContextProps = {
  defaultOpen?: AccordionItemProps['value'];
}

const useAccordion = ({
  defaultOpen,
}: AccordionContextProps) => {
  const [openItem, setOpenItem] = useState(defaultOpen);

  const setOpen = useCallback((value: AccProps['value']) => {
    setOpenItem(value);
  }, []);

  return {
    openItem,
    setOpen,
  };
};

export const [
  AccordionContextProvider,
  useAccordionContext,
] = constate(useAccordion);
