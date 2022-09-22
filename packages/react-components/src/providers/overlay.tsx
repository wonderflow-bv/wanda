/*
 * Copyright 2022 Wonderflow <authored by Mattia Astorino>
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

/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useContext } from 'react';
import { useUIDSeed } from 'react-uid';

import { OverlayContainerProps } from '../components/overlay-container/overlay-container';

type OverlayContextProps = Partial<OverlayContainerProps> & {
  titleId?: string;
}

export const OverlayContext = createContext<OverlayContextProps>({
  titleId: '',
  onClose: () => {},
});

OverlayContext.displayName = 'OverlayContext';

export const OverlayProvider: FCChildren<OverlayContextProps> = (props) => {
  const seedID = useUIDSeed();
  const {
    children,
    titleId = seedID('overlay-title'),
    onClose,
  } = props;

  return (
    <OverlayContext.Provider value={{
      titleId,
      onClose,
    }}
    >
      {children}
    </OverlayContext.Provider>
  );
};

export const useOverlayContext = () => {
  const context = useContext(OverlayContext);
  if (!context) {
    throw new Error(
      'OverlayContainer component must be used inside OverlayContext to access context data.',
    );
  }

  return context;
};
