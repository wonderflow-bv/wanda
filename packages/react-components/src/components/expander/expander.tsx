/*
 * Copyright 2022-2023 Wonderflow Design Team
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

import clsx from 'clsx';
import {
  domMax, LazyMotion, m,
} from 'framer-motion';
import { CSSProperties, useCallback, useState } from 'react';
import { useUIDSeed } from 'react-uid';

import { Button, Elevator, Stack } from '@/components';

import * as styles from './expander.module.css';

export type ExpanderProps = {
  /**
   * Set the expand button label when is collapsed
   */
  expandLabel?: string;
  /**
   * Set the expand button label when is expanded
   */
  collapseLabel?: string;
  /**
   * Set the size area for the visible content
   */
  visibleArea?: string;
  /**
   * Set the component to be expanded by default
   */
  defaultExpanded?: boolean;
}

export const Expander: FCChildrenClass<ExpanderProps> = ({
  expandLabel = 'Show more',
  collapseLabel = 'Show less',
  visibleArea = '100px',
  defaultExpanded = false,
  className,
  children,
  style,
  ...otherProps
}) => {
  const [isCollapsed, setIsCollapsed] = useState(!defaultExpanded);
  const uid = useUIDSeed();

  const dynamicStyle: CSSProperties = {
    '--visibleArea': visibleArea,
  };

  const handleCollapse = useCallback(
    () => {
      setIsCollapsed(s => !s);
    },
    [],
  );

  return (
    <div
      style={{ ...dynamicStyle, style }}
      className={clsx(styles.Expander, className)}
      data-expander-collapsed={isCollapsed}
      {...otherProps}
    >
      <LazyMotion features={domMax}>
        <m.div
          className={styles.Content}
          id={uid('expander-content')}
          animate={!isCollapsed ? { height: 'auto' } : {
            height: 'calc(var(--visibleArea) + var(--threshold))', overflow: 'hidden',
          }}
          transition={{ ease: 'easeOut', duration: 0.2 }}
          initial={false}
        >
          {children}
        </m.div>
      </LazyMotion>
      <Stack className={styles.Action} hAlign="center" vAlign="center" fill={false}>
        <Elevator resting={isCollapsed ? 4 : 0}>
          <Button
            iconPosition="right"
            data-testid="ExpanderButton"
            aria-expanded={!isCollapsed}
            aria-controls={uid('expander-content')}
            onClick={handleCollapse}
          >
            {isCollapsed ? expandLabel : collapseLabel}
          </Button>
        </Elevator>
      </Stack>
    </div>
  );
};
