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

import { CartesianxAxisSystem } from '../types';

export type CartesianContextProps = {
  position: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  dimension: {
    maxWidth: number;
    maxHeight: number;
  };
  axis?: CartesianxAxisSystem;
  hoveredLegendItem: string;
};

export type CartesianProviderProps = CartesianContextProps

const defaultSetting = {
  position: {
    top: 0,
    right: 0,
    bottom: 600,
    left: 800,
  },
  dimension: {
    maxWidth: 800,
    maxHeight: 600,
  },
  axis: undefined,
  hoveredLegendItem: '',
};

export const CartesianContext = createContext<CartesianContextProps>(defaultSetting);

export const CartesianProvider: FCChildren<CartesianProviderProps> = ({
  children,
  position,
  dimension,
  axis,
  hoveredLegendItem,
}) => (
  <CartesianContext.Provider value={{
    position, dimension, axis, hoveredLegendItem,
  }}
  >
    {children}
  </CartesianContext.Provider>
);

export const useCartesianContext = () => {
  const context = useContext(CartesianContext);

  if (!context) {
    console.error('useCartesianContext() must be used inside CartesianProvider to access context data.');
  }

  return context ?? defaultSetting;
};

CartesianContext.displayName = 'CartesianContext';
CartesianProvider.displayName = 'CartesianProvider';
