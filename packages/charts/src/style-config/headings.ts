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

import { HeadingsStyleConfig } from '../types';

export const headingsStyleConfig: HeadingsStyleConfig = {
  height: 62,
  fontFamily: 'system-ui',
  title: {
    height: 23.5,
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 1.25,
    textAnchor: 'start',
    verticalAnchor: 'start',
    x: 0,
    y: 0,
  },
  subtitle: {
    height: 19,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 1,
    textAnchor: 'start',
    verticalAnchor: 'start',
    x: 0,
    y: 21,
  },
  menu: {
    backdropFilter: 'unset',
    background: 'transparent',
    borderRadius: 'unset',
    border: 'unset',
    boxShadow: 'unset',
    color: 'unset',
    lineHeight: 'unset',
    overflow: 'none',
    minWidth: '100px',
    minHeight: '10px',
    maxWidth: '350px',
    maxHeight: 'unset',
    pointerEvents: 'unset',
  },
};
