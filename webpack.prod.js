const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  entry: { index: './src/index' },
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
      utils: path.resolve(__dirname, 'src/utils.ts'),
      contexts: path.resolve(__dirname, 'src/contexts/'),
      components: path.resolve(__dirname, 'src/components/'),
      react: path.resolve('./node_modules/react'),
    },
  },

  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: '[name].[chunkhash].js',
    filename: '[name].js',
    libraryTarget: 'commonjs',
  },
  target: 'node',
  externals: [nodeExternals()],
};
