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

module.exports = {
  source: ['src/configs/**/*.json'],
  platforms: {
    web: {
      basePxFontSize: 16,
      buildPath: 'platforms/web/',
      transformGroup: 'custom-web',
      files: [
        {
          format: 'css/variables',
          destination: 'tokens.css',
          filter: token => !token.name.endsWith('-primitive'),
        },
        {
          format: 'json/nested',
          destination: 'tokens.json',
        },
      ],
      options: {
        showFileHeader: true,
      },
    },
  },
};
