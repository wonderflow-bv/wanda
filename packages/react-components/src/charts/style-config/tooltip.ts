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
import { colors } from '.';

export const tooltipStyleMain: TooltipStyleMain = {
  color: colors.neutrals.dimmed6,
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
  backdropFilter: 'blur(5px) hue-rotate(120deg) saturate(50%)',
  background: `radial-gradient(at left top, ${toHSLA(colors.neutrals.white, 0.7)}, ${toHSLA(colors.neutrals.dimmed3, 0.5)}) no-repeat`,
  border: `1px solid ${colors.neutrals.dimmed1}`,
  boxShadow: `4px 4px 4px ${toHSLA(colors.neutrals.dimmed4, 0.8)}`,
  color: colors.neutrals.dimmed6,
};

export const tooltipStyleDark: TooltipStyleColors = {
  backdropFilter: 'blur(5px) hue-rotate(120deg) saturate(50%)',
  background: `radial-gradient(at left top, ${toHSLA(colors.neutrals.dimmed8, 0.5)}, ${toHSLA(colors.neutrals.black, 0.7)})`,
  border: `1px solid ${colors.neutrals.dimmed8}`,
  boxShadow: `4px 4px 4px ${toHSLA(colors.neutrals.black, 0.5)}`,
  color: colors.neutrals.dimmed2,
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
