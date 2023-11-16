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

import { useThemeContext } from '../../providers';
import { tooltipTheme } from '../../style-config/tooltip';
import { TooltipStyleConfig } from '../../types';
import { DeepPartial } from '../../types/main';
import { ContentWrapper } from './tooltip.module.css';

export type TooltipProps = {
  /**
   * Set if the tooltip should be shown or hidden.
   */
  isOpen?: boolean;
  /**
   * Set the position from top (Y axis).
   */
  top?: number;
  /**
   *  Set the position from left (X axis).
   */
  left?: number;
  /**
   * Set an offset for the top position.
   */
  offsetTop?: number;
  /**
   * Set an offset for the left position.
   */
  offsetLeft?: number;
  /**
   * Set the tooltip content.
   */
  children?: React.ReactNode;
  /**
   * Set custom tooltip style attributes.
   */
  config?: DeepPartial<TooltipStyleConfig>;
}

export const Tooltip: React.FC<TooltipProps> = ({
  isOpen,
  top = -999,
  left = -999,
  offsetTop = 15,
  offsetLeft = 15,
  children,
  config,
}: TooltipProps) => {
  const theme = useThemeContext();

  const tStyle = useMemo(() => _.merge(defaultStyles, tooltipTheme[theme], config), [theme, config]);

  const { TooltipInPortal } = useTooltipInPortal({
    detectBounds: true,
    scroll: true,
    debounce: 500,
    zIndex: 10,
  });

  if (!isOpen) return null;

  return (
    <TooltipInPortal
      key={uuid()}
      top={top + offsetTop}
      left={left + offsetLeft}
      style={tStyle}
    >
      <div className={ContentWrapper}>
        {children}
      </div>
    </TooltipInPortal>
  );
};

Tooltip.displayName = 'ChartTooltip';
