const config = require('./webpack.prod.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  ...config,
  context: __dirname,
  mode: 'development',
  entry: './example/index.tsx',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Djedi-JSON Example App',
      template: './example/template.html',
    }),
  ],
  // resolve: {
  //   ...config.resolve,
  //   alias: {
  //     ...config.resolve.alias,
  //     'djedi-json': path.resolve(__dirname, 'src'),
  //     'djedi-json/utils': path.resolve(__dirname, 'src', 'utils.ts'),
  //     'djedi-json/CMSType': path.resolve(__dirname, 'src', 'CMSType'),
  //     'djedi-json/types': path.resolve(__dirname, 'src', 'types'),
  //   },
  // },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
    compress: true,
    port: 9000,
  },
};
