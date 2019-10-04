const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        use: [
          'raw-loader',
          'glslify-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.obj?$/,
        use: 'webpack-obj-loader',
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    // modules: ['node_modules'],
    extensions: ['.tsx', '.ts', '.js', '.glsl', '.vs', '.fs', '.obj']
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: './dist'
  }
};