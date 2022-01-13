import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import svg from 'rollup-plugin-svg-sprite-loader'
import cleaner from 'rollup-plugin-cleaner'

export default [
  {
    input: 'index.ts',
    output: [
      {
        file: "dist/index.js",
        format: "cjs",
        sourcemap: true
      }
    ],
    external: ['react', 'react-dom', 'framer-motion'],
    plugins: [
      external(),
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
  }
]
