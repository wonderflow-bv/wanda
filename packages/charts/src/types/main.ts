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

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type ValidTypeOf = 'undefined'| 'object'| 'boolean'| 'number'| 'string'| 'function'| 'symbol'| 'bigint';

export type Data = Array<Record<string, unknown>>;

export enum Charts {
  LINE_CHART = 'LINE_CHART',
  BAR_CHART = 'BAR_CHART',
}

export type ScaleType = 'linear' | 'label' | 'time';

export type SortingType = 'descending-key' | 'ascending-key' | 'descending-value' | 'ascending-value' | 'as-is';
