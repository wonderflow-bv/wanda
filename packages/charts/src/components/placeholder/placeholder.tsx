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

import { colorPaletteNeutrals } from '../../style-config';

export type PlaceholderProps = {
  /**
   * Set the color fill for the component.
   */
  color?: string;
}

export const Placeholder: React.FC<PlaceholderProps> = ({
  color = colorPaletteNeutrals.dimmed5,
}) => (
  <svg width={12} height={12}>
    <rect
      x={0}
      y={0}
      width={12}
      height={12}
      rx={2}
      ry={2}
      fill={color}
    />
  </svg>
);

Placeholder.displayName = 'Placeholder';
