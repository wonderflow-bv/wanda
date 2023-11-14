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

import { ThemeVariants } from './themes';

export type TooltipStyleMain = {
  color: string;
  minWidth: string | number;
  minHeight: string | number;
  maxWidth: string | number;
  maxHeight: string | number;
  overflow: string;
  padding: string;
  borderRadius: string;
  zIndex: string;
}

export type TooltipStyleColors = {
  backdropFilter: string;
  background: string;
  border: string;
  boxShadow: string;
}

export type TooltipStyleConfig = TooltipStyleColors & TooltipStyleMain;

export type TooltipStyleTheme = Record<ThemeVariants, TooltipStyleConfig>;
