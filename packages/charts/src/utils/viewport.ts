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

import _ from 'lodash';

import { CartesianAxis, ViewportStyleConfig } from '../types';

export const manageViewport = (width: number, height: number, axis: CartesianAxis, config: ViewportStyleConfig) => {
  const {
    orientation, numTicks, scaleType, domain,
  } = axis;

  const isVertical = orientation === 'left' || orientation === 'right';
  const size = isVertical ? height : width;
  const key = isVertical ? 'maxHeight' : 'maxWidth';

  const defaultLabelTicksNum = scaleType === 'label' ? domain.length : undefined;
  const defaultConfigLarge = defaultLabelTicksNum ?? config.large.numTicks;

  if (_.inRange(size, 0, config.small[key])) return config.small;
  if (_.inRange(size, config.small[key]!, config.medium[key])) return config.medium;
  return numTicks ? { ...config.large, numTicks } : { ...config.large, numTicks: defaultConfigLarge };
};
