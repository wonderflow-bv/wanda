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

import { Group } from '@visx/group';
import { Text } from '@visx/text';
import { defaultStyles, useTooltip, useTooltipInPortal } from '@visx/tooltip';
import _ from 'lodash';
import React, { useCallback, useMemo, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { useSSR } from '../../hooks/useSSR';
import { useStyleConfigContext, useThemeContext } from '../../providers';
import { HeadingsStyleConfig, MarginProps } from '../../types';
import { DeepPartial } from '../../types/main';
import styles from './headings.module.css';

export type HeadingsProps = {
  /**
   * Set the title in the heading.
   */
  title?: string;
  /**
   * Set the subtitle in the heading.
   */
  subtitle?: string;
  /**
   * Set the position from top (Y axis).
   */
  top?: number;
  /**
   * Set the position from left (X axis).
   */
  left?: number;
  /**
   * Set margin using an object with `top`, `right`, `bottom` and `left` position.
   */
  margin?: MarginProps;
  /**
   * Set the max width of the component.
   */
  width?: number;
  /**
   * Set the content of the menu popup.
   */
  menu?: React.ReactNode;
  /**
   * Set custom headings style attributes.
   */
  config?: DeepPartial<HeadingsStyleConfig>;
}

export const Headings: React.FC<HeadingsProps> = ({
  title,
  subtitle,
  top = 0,
  left = 0,
  width = 800,
  margin,
  menu,
  config,
}: HeadingsProps) => {
  const theme = useThemeContext();
  const { headings, themes } = useStyleConfigContext();
  const { isBrowser } = useSSR();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const mergeStyle: HeadingsStyleConfig = useMemo(() => (_.merge(headings, config)),
    [headings, config]);

  const menuStyle = {
    ...defaultStyles,
    backdropFilter: 'unset',
    background: 'transparent',
    borderRadius: 'unset',
    border: '1px solid red',
    boxShadow: 'unset',
    color: 'unset',
    lineHeight: 'unset',
    overflow: 'none',
    minWidth: '100px',
    minHeight: '10px',
    maxWidth: '350px',
    maxHeight: 'unset',
    pointerEvents: 'none',
  };

  const { title: t, subtitle: s } = mergeStyle;

  const hasMenu = Boolean(menu && isBrowser);
  const hasMarginRigth = (margin && margin.right >= 24);

  const buttonSize = 24;
  const padding = hasMarginRigth ? margin.right : 0;
  const buttonLeft = width - buttonSize - padding;
  const { foreground: fg, background: bg, hover } = themes[theme].headings.button;

  const {
    showTooltip,
  } = useTooltip<React.ReactNode>();

  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    detectBounds: true,
    scroll: true,
    debounce: 500,
    zIndex: 10,
  });

  const tLeft = width + (hasMarginRigth ? 0 : buttonSize);
  const tTop = top + buttonSize * 1.5;

  const handleTooltip = useCallback(() => {
    showTooltip({
      tooltipLeft: tLeft,
      tooltipTop: tTop,
      tooltipData: menu,
    });
  }, [menu, showTooltip, tLeft, tTop]);

  if (!title && !menu) return null;

  return (
    <>
      {title && (
        <Group top={top} left={left}>
          <Text
            data-testid="headings"
            fontFamily={mergeStyle.fontFamily}
            fill={themes[theme].headings.title}
            fontSize={t.fontSize}
            fontWeight={t.fontWeight}
            lineHeight={t.lineHeight}
            textAnchor={t.textAnchor}
            verticalAnchor={t.verticalAnchor}
            x={t.x}
            y={t.y}
            dy={4}
          >
            {title}
          </Text>
          <Text
            fontFamily={mergeStyle.fontFamily}
            fill={themes[theme].headings.subtitle}
            fontSize={s.fontSize}
            fontWeight={s.fontWeight}
            lineHeight={s.lineHeight}
            textAnchor={s.textAnchor}
            verticalAnchor={s.verticalAnchor}
            x={s.x}
            y={s.y}
            dy={4}
          >
            {subtitle}
          </Text>
        </Group>
      )}

      {hasMenu && (
        <Group
          top={top}
          left={buttonLeft}
          className={styles.Menu}
          aria-label="Chart Menu"
          ref={containerRef}
          onClick={() => {
            handleTooltip();
            setIsOpen(prev => !prev);
          }}
        >
          <svg width={buttonSize} height={buttonSize} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle cx={buttonSize / 2} cy={buttonSize / 2} r={buttonSize / 2} fill={bg} />
            <circle cx={buttonSize / 2} cy={buttonSize / 2} r={buttonSize / 2} fill={hover} className={styles.Hover} />
            <g transform="scale(0.75 0.75) translate(4 4)">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2Zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Z" fill={fg} />
            </g>
          </svg>
        </Group>

      )}

      {hasMenu && true && (
        <TooltipInPortal
          key={uuid()}
          left={tLeft}
          top={tTop}
          style={{
            ...menuStyle,
          }}
          aria-expanded={isOpen}
        >
          <div
            data-inner-component="ChartMenu"
            role="menu"
            aria-live="polite"
          >
            {menu}
          </div>
        </TooltipInPortal>
      )}
    </>
  );
};

Headings.displayName = 'ChartHeadings';
