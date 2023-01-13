/*
 * Copyright 2022 Wonderflow <authored by Wonderflow Design Team>
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

export type AspectRatioProps = {
  ratio: string;
}

export const AspectRatio: FCChildrenClass<AspectRatioProps> = ({
  children,
  ratio,
}) => (
  <>
    {Children.map(children, child => isValidElement(child) && cloneElement(
      child as ReactElement,
      { style: { ...child.props.style, aspectRatio: ratio } },
    ))}
  </>
);
