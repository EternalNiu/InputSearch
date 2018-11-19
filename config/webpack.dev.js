const paths = require('./paths');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge.smartStrategy(
  {
    entry: 'prepend', // Hot reloader must be placed before any other js script
  }
)(common, {
  entry: {
    app: [
      'react-hot-loader/patch', // Enable HMR
    ],
  },

  devtool: 'inline-source-map', // Not for production

  module: {
    rules: [

      { // Styling
        test: /\.css$/,
        exclude: paths.nodeModulesPath,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true,
              convertToAbsoluteUrls: true,
              hmr: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: paths.appConfig,
              },
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(), // Enable HMR globally

    // Prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),

    // Do not emit compiled assets that include errors
    new webpack.NoEmitOnErrorsPlugin(),

    // Bundle runtime into a seperate file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime',
      minChunks: Infinity,
    }),

    new webpack.DefinePlugin(
      {
        'process.env': {
          NODE_ENV: JSON.stringify('development'),
          BABEL_ENV: JSON.stringify('development'),
          // Config api
          API_PROTOCOL: JSON.stringify('http'),
          API_HOSTNAME: JSON.stringify('192.168.1.201'),
          API_PORT: JSON.stringify('3002'),
          API_VERSION: JSON.stringify('v1'),
          IS_CORS: true,
          AMAP_KEY: JSON.stringify('dfba0f951c70f029a888263a3e931d0a'),
          AMAP_MAP_STYLE: JSON.stringify('amap://styles/e044b51ad6663571dfb70300285e946f?isPublic=true'),
          AMAP_CENTER: JSON.stringify([120.182217, 30.25316]),
          AMAP_ZOOM: JSON.stringify('10'),
          AMAP_ZOOMS: JSON.stringify([3, 18]),
          AMAP_FEATURES: JSON.stringify(['bg', 'road']),
          AMAP_SHOW_INDOOR_MAP: false,
        },
      }
    ),
  ],

  devServer: {
    contentBase: paths.appDist,
    historyApiFallback: true, // Enable HTML History api
    hot: true, // Enable HMR on the server
  },
});
