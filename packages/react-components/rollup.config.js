import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import dts from 'rollup-plugin-dts'
import svg from 'rollup-plugin-svg-sprite-loader'
import cleaner from 'rollup-plugin-cleaner'

export default [
  {
    input: 'index.ts',
    output: [
      {
        dir: 'dist',
        format: 'esm',
        sourcemap: true,
        preserveModules: true,
        preserveModulesRoot: './'
      }
    ],
    external: ['react', 'react-dom', 'framer-motion'],
    plugins: [
      cleaner({
        targets: [
          './dist/'
        ]
      }),
      external(),
      nodeResolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
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
    input: 'dist/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    external: [/\.css$/],
    plugins: [dts()]
  }
]
