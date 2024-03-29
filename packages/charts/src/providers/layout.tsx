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

import { CartesianChartLayout } from '../types';

export type LayoutContextProps = CartesianChartLayout;

export type LayoutProviderProps = {
  layout: LayoutContextProps;
}

const defaultLayout = CartesianChartLayout.HORIZONTAL;

export const LayoutContext = createContext<LayoutContextProps>(defaultLayout);

export const LayoutProvider: FCChildren<LayoutProviderProps> = ({
  children,
  layout,
}) => (
  <LayoutContext.Provider value={layout}>
    {children}
  </LayoutContext.Provider>
);

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);

  if (!context) {
    // eslint-disable-next-line no-console
    console.error('useLayoutContext() must be used inside LayoutProvider to access context data.');
  }

  return {
    context: context ?? defaultLayout,
    isHorizontal: context === CartesianChartLayout.HORIZONTAL,
    isVertical: context === CartesianChartLayout.VERTICAL,
  };
};

LayoutContext.displayName = 'LayoutContext';
LayoutProvider.displayName = 'LayoutProvider';
