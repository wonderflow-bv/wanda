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

import { TextAnchor } from './axis';

export type HeadingsStyleConfig = {
  height: number;
  fontFamily: string;
  title: {
    height: number;
    fontSize: number;
    fontWeight: number;
    lineHeight: number;
    textAnchor: TextAnchor;
    verticalAnchor: TextAnchor;
    x: number;
    y: number;
  };
  subtitle: {
    height: number;
    fontSize: number;
    fontWeight: number;
    lineHeight: number;
    textAnchor: TextAnchor;
    verticalAnchor: TextAnchor;
    x: number;
    y: number;
  };
  menu: {
    backdropFilter: string;
    background: string;
    borderRadius: string;
    border: string;
    boxShadow: string;
    color: string;
    lineHeight: string;
    overflow: string;
    minWidth: string;
    minHeight: string;
    maxWidth: string;
    maxHeight: string;
    pointerEvents: string;
  };
}
