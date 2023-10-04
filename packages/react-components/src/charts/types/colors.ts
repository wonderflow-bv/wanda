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

export type Neutrals = 'white'
| 'black'
| 'dimmed0'
| 'dimmed1'
| 'dimmed2'
| 'dimmed3'
| 'dimmed4'
| 'dimmed5'
| 'dimmed6'
| 'dimmed7'
| 'dimmed8'
| 'dimmed9'

export type Kpis = 'salesData'
| 'rating1star'
| 'rating2star'
| 'rating3star'
| 'rating4star'
| 'rating5star'
| 'nps'
| 'unitsSold'
| 'tgw'
| 'sentimentIndex'
| 'feedback'
| 'rating'
| 'votesRating'
| 'votesCount'
| 'subrating'

export type Gradient = '0' | '5' | '10' | '20' | '30' | '40' | '50' | '60' | '70' | '80' | '90' | '100';
export type Support = 'brand' | 'white' | 'black';

export type Colors = {
  support: Record<Support, string>;
  primary: Record<Gradient, string>;
  red: Record<Gradient, string>;
  magenta: Record<Gradient, string>;
  purple: Record<Gradient, string>;
  violet: Record<Gradient, string>;
  indigo: Record<Gradient, string>;
  blue: Record<Gradient, string>;
  cyan: Record<Gradient, string>;
  mint: Record<Gradient, string>;
  green: Record<Gradient, string>;
  dipsy: Record<Gradient, string>;
  yellow: Record<Gradient, string>;
  salmon: Record<Gradient, string>;
}
