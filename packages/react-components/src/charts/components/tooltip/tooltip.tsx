/*
 * Copyright 2023 Wonderflow Design Team
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { defaultStyles, useTooltipInPortal } from '@visx/tooltip';
import _ from 'lodash';
import { useMemo } from 'react';
import { v4 as uuid } from 'uuid';

import { tooltipTheme } from '../../style-config/tooltip';
import { ThemeVariants, TooltipStyleConfig } from '../../types';
import { DeepPartial } from '../../types/main';

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
  offsetTop = 15,
  offsetLeft = 25,
  children,
  config,
}: TooltipProps) => {
  const { TooltipInPortal } = useTooltipInPortal({
    detectBounds: true,
    scroll: true,
    debounce: 100,
    zIndex: 10,
  });

  const tStyle = useMemo(() => _.merge(tooltipTheme[theme], config), [theme, config]);

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
