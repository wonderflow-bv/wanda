/*
 * Copyright 2022 Wonderflow <authored by Mattia Astorino>
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

import {
  Children, cloneElement, isValidElement, ReactElement,
} from 'react';

export type ElevatorProps = {
  /**
   * Set the elevation of the component when is resting.
  */
  resting: 0 | 1 | 2 | 3 | 4;
  /**
   * Set the elevation of the component when is hovered.
   */
  hover?: 0 | 1 | 2 | 3 | 4;
  /**
   * The content to be elevated.
   * This component doesn't generate any wrapper.
   * It just applies the elevation by adding the respective attribvtes to the children.
   */
  children: ReactElement;
}

export const Elevator: FCChildren<ElevatorProps> = ({
  children,
  resting,
  hover,
}) => (
  <>
    {Children.map(children, child => isValidElement(child) && cloneElement(
      child,
      {
        'data-elevation': resting,
        'data-elevation-hover': hover,
      },
    ))}
  </>
);
