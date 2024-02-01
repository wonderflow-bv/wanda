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

import { createContext, useContext } from 'react';

import {
  cartesianStyleConfig,
} from '../style-config';
import {
  CartesianStyleConfig,
} from '../types';

export type StyleConfigContextProps = CartesianStyleConfig;

export type StyleConfigProviderProps = {
  styleConfig: CartesianStyleConfig;
  children?: React.ReactNode;
}

export const StyleConfigContext = createContext<StyleConfigContextProps>(cartesianStyleConfig);

export const StyleConfigProvider: FCChildren<StyleConfigProviderProps> = ({
  styleConfig,
  children,
}) => (
  <StyleConfigContext.Provider value={styleConfig}>
    {children}
  </StyleConfigContext.Provider>
);

export const useStyleConfigContext = () => {
  const context = useContext(StyleConfigContext);

  if (!context) {
    console.error('useStyleConfigContext() must be used inside StyleConfigProvider to access context data.');
  }

  return context ?? cartesianStyleConfig;
};

StyleConfigContext.displayName = 'StyleConfigContext';
StyleConfigProvider.displayName = 'StyleConfigProvider';
