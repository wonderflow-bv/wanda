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

import { CartesianChartMetadata, Data } from '../types';

export type DataContextProps<T extends CartesianChartMetadata> = {
  data: Data;
  filteredData: Data;
  metadata?: T;
};

export type DataProviderProps = DataContextProps<CartesianChartMetadata>

const defaultData: DataContextProps<CartesianChartMetadata> = {
  data: [],
  filteredData: [],
  metadata: undefined,
};

export const DataContext = createContext<DataContextProps<CartesianChartMetadata>>(defaultData);

export const DataProvider: FCChildren<DataProviderProps> = ({
  children,
  data,
  filteredData,
  metadata,
}) => (
  <DataContext.Provider value={{ data, metadata, filteredData }}>
    {children}
  </DataContext.Provider>
);

export function useDataContext <
T extends CartesianChartMetadata>(): DataContextProps<T> {
  const context = useContext(DataContext);

  if (!context) {
    // eslint-disable-next-line no-console
    console.error('useDataContext() must be used inside DataProvider to access context data.');
  }

  const typedContext = context as DataContextProps<T>;
  return typedContext ?? defaultData;
}

DataContext.displayName = 'DataContext';
DataProvider.displayName = 'DataProvider';
