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

export const getPrefersColorScheme = () => {
  if (typeof window !== 'undefined') {
    const m = window.matchMedia('(prefers-color-scheme: dark)');
    return m.matches ? 'dark' : 'light';
  }

  return 'light';
};

export const getCurrentTheme = () => (
  (typeof window !== 'undefined'
  && window.document?.querySelector('html')?.getAttribute('data-theme') === 'dark')
    ? 'dark'
    : 'light');

