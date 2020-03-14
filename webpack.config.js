const path = require('path')

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    'popup': path.resolve(__dirname, 'src', 'popup', 'index.tsx'),
    'content': path.resolve(__dirname, 'src', 'content', 'index.ts')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.json' ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}
