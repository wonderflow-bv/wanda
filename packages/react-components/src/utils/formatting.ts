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

export const formatPriceRangeValues = (p1?: number, p2?: number) => {
  const isP1Number = typeof p1 === 'number';
  const isP2Number = typeof p2 === 'number';

  if (isP1Number && isP2Number) {
    const min = Math.min(p1, p2).toFixed(2);
    const max = Math.max(p1, p2).toFixed(2);
    return `${min} - ${max} €`;
  }

  if (isP1Number || isP2Number) {
    const val = isP1Number ? p1.toFixed(2) : p2!.toFixed(2);
    return `${val} €`;
  }

  return undefined;
};
