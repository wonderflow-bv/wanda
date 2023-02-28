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

/* eslint-disable @typescript-eslint/no-var-requires */

import CssBezier from './transformers/css-bezier';
import HexHslValues from './transformers/hex-hslvalues';
import SizePxToRem from './transformers/px-rem';
import SizePxToRootEm from './transformers/px-rootem';

const StyleDictionary = require('style-dictionary').extend('src/tokens.config.js');

/**
 * Register custom transformers to process token values for
 * the web platform
 */
StyleDictionary.registerTransform(HexHslValues);
StyleDictionary.registerTransform(SizePxToRem);
StyleDictionary.registerTransform(SizePxToRootEm);
StyleDictionary.registerTransform(CssBezier);

/**
 * Add the custom transformers to a new transformGroup `custom-web`
 * used inside tokens.config.json
 */
StyleDictionary.registerTransformGroup({
  name: 'custom-web',
  transforms: [
    'attribute/cti',
    'name/cti/kebab',
    'time/seconds',
    'content/icon',
    'size/px-rootem',
    'size/px-rem',
    'color/hslvalue',
    'easing/cubic-bezier',
  ],
});

/**
 * Manually run StyleDictionary for all the configured platforms
 */
StyleDictionary.buildAllPlatforms();
