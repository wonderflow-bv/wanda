/*
 * Copyright 2022-2023 Wonderflow Design Team
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

import jsonTokens from '@wonderflow/tokens/platforms/web/tokens.json';
import flatten from 'flat';
import postcssMixins from 'postcss-mixins';

/**
 * Prepare env variables from tokens
 * to be assigned to postcss-preset-env
 */
const flatTokens: Record<string, any> = flatten(jsonTokens, {
  delimiter: '-',
});

const prepareTokens = () => Object.keys(flatTokens).reduce<Record<string, string>>((acc, key) => {
  const newKey = key;
  acc[newKey] = `${flatTokens[key]}`;
  return acc;
}, {});

export const postcssConfig = {
  plugins: {
    'postcss-import': {},
    'postcss-replace': {
      pattern: /token\(.*?--([^\s]+?)\)/gi,
      data: prepareTokens(),
    },
    'postcss-preset-env': {
      stage: 0,
      features: {
        'logical-properties-and-values': false,
        'prefers-color-scheme-query': false,
        'gap-properties': false,
        'cascade-layers': false,
      },
      insertAfter: {
        'custom-media-queries': postcssMixins,
      },
      enableClientSidePolyfills: false,
    },
    'postcss-mixins': {},
    cssnano: {
      preset: [
        'default',
        {
          discardComments: {
            removeAll: true,
          },
        },
      ],
    },
  },
};
