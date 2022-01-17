import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import svg from 'rollup-plugin-svg-sprite-loader'
import cleaner from 'rollup-plugin-cleaner'
import copy from 'rollup-plugin-copy'
import json from '@rollup/plugin-json'
import pkg from './package.json'

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: true
      }
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      /\.json$/
    ],
    plugins: [
      external(),
      json(),
      cleaner({
        targets: [
          './dist/'
        ]
      }),
      typescript({ tsconfig: './tsconfig.json' }),
      nodeResolve(),
      commonjs(),
      svg({
        extract: true,
        publicPath: './'
      }),
      postcss({
        modules: true,
        extract: true,
        minimize: true
      }),
      terser()
    ]
  },
  {
    input: 'src/core.css',
    output: [{ file: 'dist/core.css' }],
    plugins: [
      postcss({
        extract: true,
        minimize: true
      }),
      copy({
        targets: [
          { src: 'src/core/utils/**/*', dest: 'dist/core/utils' }
        ]
      })
    ]
  }
]
