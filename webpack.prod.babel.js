const webpack = require('webpack');
const merge = require('webpack-merge');
const ManifestPlugin = require('webpack-manifest-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const baseConfig = require('./webpack.base.babel');

const config = merge(baseConfig, {
  devtool: 'source-map',

  entry: {
    app: [
      'babel-polyfill',
      './src/index',
    ],
    vendor: [
      'react',
      'react-dom',
    ],
  },

  output: {
    publicPath: '/',
    filename: '[name].[chunkhash].js',
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false,
      },
      output: {
        comments: false,
      },
      sourceMap: false,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: '[name].[chunkhash].js',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new ManifestPlugin({
      basePath: '/',
    }),
    new ChunkManifestPlugin({
      filename: 'chunk-manifest.json',
      manifestVariable: 'webpackManifest',
    }),
  ],
});

module.exports = config;
