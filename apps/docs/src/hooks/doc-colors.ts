import type { TokensTypes } from '@wonderflow/tokens/platforms/web';
import constate from 'constate';
import { useCallback, useState } from 'react';

export type AccordionContextProps = {
  color?: TokensTypes['colors'];
}

const useLayoutColor = ({
  color = 'gray',
}: AccordionContextProps) => {
  const [layoutColor, setLayoutColor] = useState(color);

  const setColor = useCallback((value: AccordionContextProps['color']) => {
    if (value) setLayoutColor(value);
  }, []);

  return {
    layoutColor,
    setColor,
  };
};

export const [
  DocLayoutContextProvider,
  useDocLayoutContext,
] = constate(useLayoutColor);
