import buble from '@rollup/plugin-buble'

export default [
  {
    input: 'src/fetchform.js',
    output: {
      format: 'umd',
      file: 'lib/fetchform.js',
      name: 'FetchForm'
    },
    plugins: [ buble({ namedFunctionExpressions: false }) ]
  }
]
