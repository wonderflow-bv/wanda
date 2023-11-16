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

import { createContext, useContext } from 'react';

import {
  axisStyleConfig,
  cartesianStyleConfig,
  gridStyleConfig,
  headingsStyleConfig,
  linesStyleConfig,
  viewportStyleConfig,
} from '../style-config';
import { legendStyleConfig } from '../style-config/legend';
import {
  AxisStyleConfig, CartesianStyleConfig,
  GridStyleConfig, HeadingsStyleConfig, LegendStyleConfig,
  ViewportStyleConfig,
} from '../types';
import { LinesStyleConfig } from '../types/lines';

export type StyleConfigContextProps = {
  axis: AxisStyleConfig;
  cartesian: CartesianStyleConfig;
  grid: GridStyleConfig;
  headings: HeadingsStyleConfig;
  legend: LegendStyleConfig;
  lines: LinesStyleConfig;
  viewport: ViewportStyleConfig;
};

export type StyleConfigProviderProps = {
  children?: React.ReactNode;
}

const defaultStyleConfig = {
  axis: axisStyleConfig,
  cartesian: cartesianStyleConfig,
  grid: gridStyleConfig,
  headings: headingsStyleConfig,
  legend: legendStyleConfig,
  lines: linesStyleConfig,
  viewport: viewportStyleConfig,
};

export const StyleConfigContext = createContext<StyleConfigContextProps>(defaultStyleConfig);

export const StyleConfigProvider: FCChildren<StyleConfigProviderProps> = ({
  children,
}) => (
  <StyleConfigContext.Provider value={defaultStyleConfig}>
    {children}
  </StyleConfigContext.Provider>
);

export const useStyleConfigContext = () => {
  const context = useContext(StyleConfigContext);

  if (!context) {
    throw new Error(
      'useStyleConfigContext hook must be used inside StyleConfigProvider to access context data.',
    );
  }

  return context;
};

StyleConfigContext.displayName = 'StyleConfigContext';
StyleConfigProvider.displayName = 'StyleConfigProvider';
