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
import { useClickAway, useKeyPress } from 'ahooks';
import _ from 'lodash';
import React, {
  useCallback, useMemo, useRef, useState,
} from 'react';
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
  /**
   * This callback is used to inform about the menu state
   * in order to prevent both menu and tooltip to be open at the same time
   */
  onMenuOpen: (isOpen: boolean) => void;
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
  onMenuOpen,
}: HeadingsProps) => {
  const theme = useThemeContext();
  const { headings, themes } = useStyleConfigContext();
  const { isBrowser } = useSSR();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const menuStyle = { ...defaultStyles, ...headings.menu };

  const mergeStyle: HeadingsStyleConfig = useMemo(() => (_.merge(headings, config)),
    [headings, config]);

  const { title: t, subtitle: s } = mergeStyle;

  const hasMenu = Boolean(menu && isBrowser);
  const hasMarginRight = (margin && margin.right >= 24);

  const buttonSize = 24;
  const padding = hasMarginRight ? margin.right : 0;
  const buttonLeft = width - buttonSize - padding;

  const { foreground: fg, background: bg, hover } = themes[theme].headings.button;

  const { showTooltip } = useTooltip<React.ReactNode>();

  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    detectBounds: true,
    scroll: true,
    debounce: 500,
    zIndex: 4,
  });

  const tLeft = width + (hasMarginRight ? 0 : buttonSize);
  const tTop = top + buttonSize * 1.5;

  const handleTooltip = useCallback(() => {
    showTooltip({
      tooltipLeft: tLeft,
      tooltipTop: tTop,
      tooltipData: menu,
    });
  }, [menu, showTooltip, tLeft, tTop]);

  const handleTooltipToggle = () => {
    handleTooltip();
    setIsOpen(prev => !prev);
    onMenuOpen(!isOpen);
  };

  const handleTooltipOpen = () => {
    handleTooltip();
    setIsOpen(true);
    onMenuOpen(true);
  };

  const handleTooltipClose = () => {
    handleTooltip();
    setIsOpen(false);
    onMenuOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<SVGGElement>) => {
    if (hasMenu
      && !isOpen
      && (event.key === 'Enter' || event.key === 'ArrowDown')
    ) handleTooltipOpen();
  };

  useKeyPress('Esc', () => {
    if (hasMenu && isOpen) handleTooltipClose();
  });

  const counter = useRef(0);

  useClickAway(() => {
    if (counter.current) {
      handleTooltipClose();
      counter.current = 0;
    } else {
      counter.current = 1;
    }
  }, menuRef);

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
          ref={containerRef}
          onClick={handleTooltipToggle}
          focusable
          tabIndex={0}
          onKeyDown={e => handleKeyDown(e)}
        >
          <svg
            width={buttonSize}
            height={buttonSize}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Chart Menu"
          >
            <circle
              cx={buttonSize / 2}
              cy={buttonSize / 2}
              r={buttonSize / 2}
              fill={bg}
            />
            <circle
              cx={buttonSize / 2}
              cy={buttonSize / 2}
              r={buttonSize / 2}
              fill={hover}
              className={styles.ActiveArea}
            />
            <g transform="scale(0.75 0.75) translate(4 4)">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2Zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Z" fill={fg} />
            </g>
          </svg>
        </Group>
      )}

      {hasMenu && isOpen && (
        <TooltipInPortal
          key={uuid()}
          left={tLeft}
          top={tTop}
          style={menuStyle}
          aria-expanded={isOpen}
        >
          <div
            data-inner-component="ChartMenu"
            role="menu"
            aria-live="polite"
            ref={menuRef}
          >
            {menu}
          </div>
        </TooltipInPortal>
      )}
    </>
  );
};

Headings.displayName = 'ChartHeadings';
