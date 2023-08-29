import { defaultStyles, useTooltipInPortal } from '@visx/tooltip';
import { v4 as uuid } from 'uuid';

import { ThemeVariants } from '../types';

export type TooltipProps = {
  /**
   *
   */
  theme?: ThemeVariants;
  /**
   *
   */
  isOpen?: boolean;
  /**
   *
   */
  top?: number;
  /**
   *
   */
  left?: number;
  /**
   *
   */
  children?: React.ReactNode;
}

export const Tooltip = ({
  theme = 'light',
  isOpen,
  top,
  left,
  children,
}: TooltipProps) => {
  const { TooltipInPortal } = useTooltipInPortal({
    detectBounds: true,
    scroll: true,
    debounce: 100,
    zIndex: 10,
  });

  console.log('tooltip theme', theme);

  if (!isOpen) return null;

  return (

    <TooltipInPortal
      key={uuid()}
      top={top}
      left={left}
      style={{
        ...defaultStyles,
        background: 'linear-gradient(#ffffffaa, #b1b1b192)',
        color: 'slategray',
        width: 152,
        height: 72,
        padding: 12,
        backdropFilter: 'blur(1px)',
        border: '1px solid lightgray',
        borderRadius: '0.125rem',
        boxShadow: '2px 2px 4px rgba(60, 60, 60, 0.2)',
        zIndex: '10',
      }}
    >
      {children}
    </TooltipInPortal>
  );
};

