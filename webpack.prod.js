const path = require('path');

module.exports = {
  mode: 'production',
  entry: { index: './src/index', CMSType: './src/CMSType/index', utils: './src/utils' },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      // These are handled by typescript, but not so gracefully by javascript, so let's remap it here for Webpack.
      core: path.resolve(__dirname, 'src/core/'),
      contexts: path.resolve(__dirname, 'src/contexts/'),
    },
  },

  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: '[name].[chunkhash].js',
    filename: '[name].js',
  },
};
