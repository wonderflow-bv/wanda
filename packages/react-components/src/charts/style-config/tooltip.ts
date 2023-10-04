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

import {
  TooltipStyleColors, TooltipStyleConfig, TooltipStyleMain, TooltipStyleTheme,
} from '../types';
import { toHSLA } from '../utils';
import { colorPaletteNeutrals } from '.';

export const tooltipStyleMain: TooltipStyleMain = {
  color: colorPaletteNeutrals.dimmed6,
  minWidth: 160,
  minHeight: 80,
  maxWidth: 220,
  maxHeight: 120,
  overflow: 'scroll',
  padding: '0rem 0.5rem',
  borderRadius: '0.125rem',
  zIndex: '10',
};

export const tooltipStyleLight: TooltipStyleColors = {
  backdropFilter: 'blur(10px) hue-rotate(20deg) saturate(20%)',
  background: `radial-gradient(at left top, ${toHSLA(colorPaletteNeutrals.white, 0.2)}, ${toHSLA(colorPaletteNeutrals.dimmed3, 0.15)}) no-repeat`,
  border: `1px solid ${colorPaletteNeutrals.dimmed1}`,
  boxShadow: `4px 4px 4px ${toHSLA(colorPaletteNeutrals.dimmed4, 0.8)}`,
  color: colorPaletteNeutrals.dimmed6,
};

export const tooltipStyleDark: TooltipStyleColors = {
  backdropFilter: 'blur(10px) hue-rotate(20deg) saturate(100%)',
  background: `radial-gradient(at left top, ${toHSLA(colorPaletteNeutrals.dimmed8, 0.1)}, ${toHSLA(colorPaletteNeutrals.black, 0.12)})`,
  border: `1px solid ${colorPaletteNeutrals.dimmed8}`,
  boxShadow: `4px 4px 4px ${toHSLA(colorPaletteNeutrals.black, 0.5)}`,
  color: colorPaletteNeutrals.dimmed2,
};

export const tooltipStyleConfigLight: TooltipStyleConfig = {
  ...tooltipStyleMain,
  ...tooltipStyleLight,
};

export const tooltipStyleConfigDark: TooltipStyleConfig = {
  ...tooltipStyleMain,
  ...tooltipStyleDark,
};

export const tooltipTheme: TooltipStyleTheme = {
  light: tooltipStyleConfigLight,
  dark: tooltipStyleConfigDark,
};
