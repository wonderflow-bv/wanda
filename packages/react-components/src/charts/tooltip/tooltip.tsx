import { defaultStyles, useTooltipInPortal } from '@visx/tooltip';
import _ from 'lodash';
import { useMemo } from 'react';
import { v4 as uuid } from 'uuid';

import { tooltipTheme } from '../style-config/tooltip';
import { ThemeVariants, TooltipStyleConfig } from '../types';
import { DeepPartial } from '../types/main';

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
  offsetTop?: number;
  /**
   *
   */
  offsetLeft?: number;
  /**
   *
   */
  children?: React.ReactNode;
  /**
   *
   */
  config?: DeepPartial<TooltipStyleConfig>;
}

export const Tooltip = ({
  theme = 'light',
  isOpen,
  top,
  left,
  offsetTop = 25,
  offsetLeft = 35,
  children,
  config,
}: TooltipProps) => {
  const { TooltipInPortal } = useTooltipInPortal({
    detectBounds: true,
    scroll: true,
    debounce: 100,
    zIndex: 10,
  });

  const tStyle = useMemo(() => _.cloneDeep(_.merge(tooltipTheme[theme], config)), [theme, config]);

  if (!isOpen) return null;

  return (

    <TooltipInPortal
      key={uuid()}
      top={(top ?? -999) + (offsetTop ?? 0)}
      left={(left ?? -999) + (offsetLeft ?? 0)}
      style={{
        ...defaultStyles,
        ...tStyle,
      }}
    >
      <div style={{ padding: '8px 16px' }}>
        {children}
      </div>
    </TooltipInPortal>
  );
};

Tooltip.displayName = 'ChartTooltip';
