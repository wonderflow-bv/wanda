import constate from 'constate';
import {
  useCallback, useState,
} from 'react';

import { AccordionItemProps } from './accordion-item';

type AccProps = AccordionItemProps

const useAccordion = () => {
  const [openItem, setOpenItem] = useState<string>('');

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
