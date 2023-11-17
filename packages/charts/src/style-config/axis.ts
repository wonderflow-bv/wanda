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

import { AxisStyleConfig } from '../types/axis';

export const axisStyleConfig: AxisStyleConfig = {
  formatting: {
    maxCharactersLength: 20,
    omission: '...',
  },
  labelProps: {
    fontFamily: 'system-ui, sans-serif',
    fontSize: 12,
    fontWeight: 600,
    textAnchor: 'middle',
  },
  tickLabelProps: {
    fontFamily: 'system-ui, sans-serif',
    fontSize: 14,
    fontWeight: 400,
  },
  tickLineProps: {
    length: 4,
    strokeWidth: 1,
    strokeLinecap: 'round',
  },
  axisLineProps: {
    strokeWidth: 1,
    strokeDasharray: '',
  },
  spacing: {
    labelCharExtimatedWidth: 8,
    labelHeight: 14, // based on a 12px font size
    labelOffset: 16,
    tickLabelHeight: 16, // based on a 14px font size
    tickLength: 4,
  },
  top: {
    tickLabelProps: {
      dy: -12,
      dominantBaseline: 'auto',
    },
    labelProps: {
      dominantBaseline: 'auto',
    },
  },
  right: {
    tickLabelProps: {
      dx: 4,
      textAnchor: 'start',
      dominantBaseline: 'middle',
    },
    labelProps: {
      dominantBaseline: 'auto',
    },
  },
  bottom: {
    tickLabelProps: {
      dy: 4,
      dominantBaseline: 'auto',
    },
    labelProps: {
      dominantBaseline: 'auto',
    },
  },
  left: {
    tickLabelProps: {
      dx: -4,
      textAnchor: 'end',
      dominantBaseline: 'middle',
    },
    labelProps: {
      dominantBaseline: 'auto',
    },
  },
};
