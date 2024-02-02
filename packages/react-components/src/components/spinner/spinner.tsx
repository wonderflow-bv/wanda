/*
 * Copyright 2022-2024 Wonderflow Design Team
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
import { forwardRef, SVGAttributes } from 'react';

export type SpinnerProps = SVGAttributes<SVGElement> & {
  /**
   * Set the size of the spinner
   */
  dimension?: 'small' | 'regular' | 'big';
  /**
   * Override the color of the spinner
   */
  color?: string;
}

export const Spinner = forwardRef<SVGSVGElement, SpinnerProps>(({
  className,
  style,
  color,
  dimension = 'big',
}, forwardedRef) => {
  const attributes = {
    small: {
      size: 14,
    },
    regular: {
      size: 22,
    },
    big: {
      size: 30,
    },
  };

  return (
    <LazyMotion features={domMax} strict>
      <m.svg
        ref={forwardedRef}
        className={clsx(className)}
        animate={{ rotate: '2turn' }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 2,
        }}
        style={{ ...style, originX: '50%', originY: '50%' }}
        width={attributes[dimension].size}
        height={attributes[dimension].size}
        viewBox="0 0 38 38"
        stroke={color ?? 'currentColor'}
        xmlns="http://www.w3.org/2000/svg"
        strokeLinecap="round"
      >
        <g
          transform="translate(1 1)"
          strokeWidth={2}
          fill="none"
          fillRule="evenodd"
        >
          <circle strokeOpacity={0.5} cx={18} cy={18} r={18} />
          <path d="M36 18c0-9.94-8.06-18-18-18">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </m.svg>
    </LazyMotion>
  );
});

Spinner.displayName = 'Spinner';
