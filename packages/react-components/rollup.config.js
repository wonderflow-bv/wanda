import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import dts from 'rollup-plugin-dts'
import svg from 'rollup-plugin-svg-sprite-loader'
import alias from '@rollup/plugin-alias'
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

// import commonjs from '@rollup/plugin-commonjs'
// import typescript from '@rollup/plugin-typescript'
// // import dts from 'rollup-plugin-dts'
// import { terser } from 'rollup-plugin-terser'
// import peerDepsExternal from 'rollup-plugin-peer-deps-external'
// import json from '@rollup/plugin-json'
// import postcss from 'rollup-plugin-postcss'
// import cleaner from 'rollup-plugin-cleaner'
// import svg from 'rollup-plugin-svg-sprite-loader'

// export default [
//   {
//     input: 'src/index.ts',
//     output: [
//       {
//         file: 'dist/index.js',
//         format: 'cjs',
//         sourcemap: false,
//         exports: 'auto'
//       }
//     ],
//     plugins: [
//       cleaner({
//         targets: [
//           './dist/'
//         ]
//       }),
//       peerDepsExternal(),
//       postcss({
//         extract: true,
//         minimize: true
//       }),
//       commonjs(),
//       json(),
//       svg({
//         extract: true,
//         publicPath: './'
//       }),
//       typescript({ tsconfig: './tsconfig.json' }),
//       terser()
//     ],
//     external: ['react', 'react-dom']
//   }
//   // {
//   //   input: 'dist/types/index.d.ts',
//   //   output: [{ file: 'dist/index.d.ts', format: 'esm' }],
//   //   plugins: [dts()]
//   // }
// ]
