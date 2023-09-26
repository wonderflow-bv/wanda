import _ from 'lodash';

import { Axis } from '../components/cartesian-base/cartesian-base';
import { ViewportStyleConfig } from '../types';

export const manageViewport = (width: number, height: number, axis: Axis, config: ViewportStyleConfig) => {
  const { orientation, numTicks } = axis;

  const isVertical = orientation === 'left' || orientation === 'right';
  const size = isVertical ? height : width;
  const key = isVertical ? 'maxHeight' : 'maxWidth';

  if (_.inRange(size, 0, config.tiny[key])) return config.tiny;
  if (_.inRange(size, config.tiny[key]!, config.small[key])) return config.small;
  return numTicks ? { ...config.large, numTicks } : config.large;
};
