const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CompressionPlugin = require('compression-webpack-plugin');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap(merge(common, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    publicPath: '/', 
  },
  plugins: [
    new CompressionPlugin({
      cache: true,
      algorithm: 'gzip',
      test: /\.(js|css)$/,
    }),
  ],
  stats: 'errors-warnings',
}));