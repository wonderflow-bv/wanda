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
  color: colorPaletteNeutrals.dimmed0,
  minWidth: 250,
  minHeight: 80,
  maxWidth: 350,
  maxHeight: 'unset',
  overflow: 'auto',
  padding: '0rem',
  borderRadius: '0.25rem',
  zIndex: '10',
};

export const tooltipStyleDark: TooltipStyleColors = {
  backdropFilter: 'blur(10px) hue-rotate(10deg) saturate(200%)',
  background: `radial-gradient(at left top, ${toHSLA(colorPaletteNeutrals.dimmed8, 0.5)}, ${toHSLA(colorPaletteNeutrals.dimmed7, 0.6)}) no-repeat`,
  border: `1px solid ${colorPaletteNeutrals.dimmed8}`,
  boxShadow: `4px 4px 10px ${toHSLA(colorPaletteNeutrals.black, 0.5)}`,
  separatorStroke: colorPaletteNeutrals.dimmed7,
  lineIndicatorStroke: colorPaletteNeutrals.dimmed6,
};

export const tooltipStyleLight: TooltipStyleColors = {
  backdropFilter: 'blur(10px) hue-rotate(10deg) saturate(750%)',
  background: `radial-gradient(at left top, ${toHSLA(colorPaletteNeutrals.dimmed9, 0.7)}, ${toHSLA(colorPaletteNeutrals.black, 0.8)}) no-repeat`,
  border: `1px solid ${colorPaletteNeutrals.dimmed5}`,
  boxShadow: `4px 4px 10px ${toHSLA(colorPaletteNeutrals.dimmed8, 0.5)}`,
  separatorStroke: colorPaletteNeutrals.dimmed6,
  lineIndicatorStroke: colorPaletteNeutrals.dimmed4,
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
