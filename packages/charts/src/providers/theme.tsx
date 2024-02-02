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

import { ThemeVariants } from '../types';

export type ThemeContextProps = ThemeVariants;

export type ThemeProviderProps = {
  theme: ThemeContextProps;
}

const defaultTheme = 'light';

export const ThemeContext = createContext<ThemeContextProps>(defaultTheme);

export const ThemeProvider: FCChildren<ThemeProviderProps> = ({
  children,
  theme,
}) => (
  <ThemeContext.Provider value={theme}>
    {children}
  </ThemeContext.Provider>
);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    console.error('useThemeContext() must be used inside ThemeProvider to access context data.');
  }

  return context ?? defaultTheme;
};

ThemeContext.displayName = 'ThemeContext';
ThemeProvider.displayName = 'ThemeProvider';
