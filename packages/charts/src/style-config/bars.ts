/*
 * Copyright 2023-2024 Wonderflow Design Team
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

import { BarsStyleConfig } from '../types/bars';

export const barsStyleConfig: BarsStyleConfig = {
  maxSize: 24,
  paddingOuter: 0.5,
  paddingInner: 0.2,
  paddingInnerGroup: 0.1,
  paddingOuterGroup: 0,
  bar: {
    rx: 4,
    opacity: 1,
  },
  background: {
    rx: 0,
    opacity: 0.7,
  },
  overlay: {
    opacity: 0.7,
  },
  label: {
    alignmentBaseline: 'baseline',
    fontSize: 12,
    fontFamily: 'system-ui',
    fontWeight: 400,
    fontWeightValue: 600,
    fillOpacity: 0.7,
    rx: 4,
    height: 18,
  },
};
