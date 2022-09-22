/*
 * Copyright 2022 Wonderflow
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

import { configResponsive, useResponsive as responsiveAhook } from 'ahooks';
import {
  createContext, useContext, useEffect, useState,
} from 'react';

type ResponsiveContextProps = {
  /**
   * Current breakpoints
  */
  breakpoints: {
    extraSmall: number;
    small: number;
    medium: number;
    large: number;
    extraLarge: number;
  };
  /**
   * Object with breakpoints matching the current screen size.
  */
  matches: Record<keyof ResponsiveContextProps['breakpoints'], boolean>;
}

type ResponsiveProviderProps = {
  breakpoints?: ResponsiveContextProps['breakpoints'];
}

const DEFAULT_BREAKPOINTS = {
  extraSmall: 480,
  small: 768,
  medium: 960,
  large: 1280,
  extraLarge: 1600,
};

export const ResponsiveContext = createContext<ResponsiveContextProps>({
  breakpoints: DEFAULT_BREAKPOINTS,
  matches: {
    extraSmall: false,
    small: false,
    medium: false,
    large: false,
    extraLarge: false,
  },
});

ResponsiveContext.displayName = 'ResponsiveContext';

export const ResponsiveProvider: FCChildren<ResponsiveProviderProps> = ({
  children,
  breakpoints = DEFAULT_BREAKPOINTS,
}) => {
  configResponsive(breakpoints);
  const responsiveHook = responsiveAhook();
  const [matching, setMatching] = useState<ResponsiveContextProps['matches']>({
    extraSmall: false,
    small: false,
    medium: false,
    large: false,
    extraLarge: false,
  });

  useEffect(() => {
    setMatching(responsiveHook);
  }, [breakpoints, responsiveHook]);

  return (
    <ResponsiveContext.Provider value={{ breakpoints, matches: matching }}>
      {children}
    </ResponsiveContext.Provider>
  );
};

export const useResponsiveContext = () => {
  const context = useContext(ResponsiveContext);
  if (!context) {
    throw new Error(
      'useResponsiveContext hook must be used inside ResponsiveProvider to access context data.',
    );
  }

  return context;
};
