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

/* eslint-disable @typescript-eslint/no-var-requires, global-require, import/no-extraneous-dependencies */
import fs from 'fs-extra';
import path from 'path';

const deeperKeys = ['color', 'font', 'icon'];

const printCorrectValue = (value: string | number) => (Number.isNaN(Number(value)) ? `'${value}'` : value);
const getTypeUnion = (json: Record<string, unknown>) => Object.keys(json).reduce(
  (acc, key, index) => acc.concat(`${index !== 0 ? '| ' : ''}${printCorrectValue(key)} `), '',
);

const reduceTokensJson = (tokens: Record<string, any>): string => Object.keys(tokens).reduce((acc, key) => {
  const jsonEntity = tokens[key];

  if (deeperKeys.includes(key)) {
    return acc.concat(`${key}: { ${reduceTokensJson(jsonEntity)} };\n`);
  }

  const allKeysAsTypeUnion = getTypeUnion(jsonEntity);
  return allKeysAsTypeUnion ? acc.concat(`${key}: ${allKeysAsTypeUnion.trimEnd()};\n `) : acc;
}, '');

const run = () => {
  const tokens = require('../platforms/web/tokens.json');
  const types = `export type TokensTypes = {\n ${reduceTokensJson(tokens)} \n}`;

  fs.writeFileSync(path.join('platforms', 'web', 'index.ts'), types);
};

try {
  run();
  process.exit(0);
} catch (error: unknown) {
  console.error('⚠️ Something went wrong:', error);
  process.exit(1);
}
