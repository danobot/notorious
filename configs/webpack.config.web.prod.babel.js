/**
 * Build config for electron renderer process
 */

import path from 'path';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import merge from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';
import baseConfig from './webpack.config.base';
import CheckNodeEnv from '../internals/scripts/CheckNodeEnv';

CheckNodeEnv('production');

const productionConfig = merge.smart(baseConfig, {
  devtool: 'source-map',

  mode: 'production',

  target: 'web',

  entry: path.join(__dirname, '..', 'app/index.tsx'),

  output: {
    path: path.join(__dirname, '..', 'web/dist'),
    publicPath: './',
    filename: 'web.prod.js',
    libraryTarget: 'var'
  },

  node: {
    fs: 'empty',
    'graceful-fs': 'empty',
    'write-file-atomic': 'empty',
    'fs-extra': 'empty',
    'fs-realpath': 'empty',
    'electron-updater': 'empty',
    'electron-log': 'empty',
    'electron-devtools-installer': 'empty',
    glob: 'empty',
    child_process: 'empty',
    module: 'empty',
    electron: 'empty',
    net: 'empty',
    dns: 'empty',
    tls: 'empty',
    jsonfile: 'empty'
  },
  module: {
    rules: [
      // Extract all .global.css to style.css as is
      {
        test: /\.global\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: './'
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      // Pipe other styles through css modules and append to style.css
      {
        test: /^((?!\.global).)*\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]__[hash:base64:5]'
              },
              sourceMap: true
            }
          }
        ]
      },
      // Add SASS support  - compile all .global.scss files and pipe it to style.css
      {
        test: /\.global\.(scss|sass)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      // Add SASS support  - compile all other .scss files and pipe it to style.css
      {
        test: /^((?!\.global).)*\.(scss|sass)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]__[hash:base64:5]'
              },
              importLoaders: 1,
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      // WOFF Font
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff'
          }
        }
      },
      // WOFF2 Font
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff'
          }
        }
      },
      // TTF Font
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/octet-stream'
          }
        }
      },
      // EOT Font
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader'
      },
      // SVG Font
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'image/svg+xml'
          }
        }
      },
      // Common Image Formats
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
        use: 'url-loader'
      }
    ]
  },

  optimization: {
    minimizer: process.env.E2E_BUILD
      ? []
      : [
          new TerserPlugin({
            parallel: true,
            sourceMap: true,
            cache: true
          }),
          new OptimizeCSSAssetsPlugin({
            cssProcessorOptions: {
              map: {
                inline: false,
                annotation: true
              }
            }
          })
        ]
  },

  plugins: [
    /**
     * Create global constants which can be configured at compile time.
     *
     * Useful for allowing different behaviour between development builds and
     * release builds
     *
     * NODE_ENV should be production so that modules do not perform certain
     * development checks
     */
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production'
    }),
    // new webpack.DefinePlugin({
    //   'process.env.DB_CONNECTION': JSON.stringify(process.env.DB_CONNECTION)
    // }),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),

    new BundleAnalyzerPlugin({
      analyzerMode:
        process.env.OPEN_ANALYZER === 'true' ? 'server' : 'disabled',
      openAnalyzer: process.env.OPEN_ANALYZER === 'true'
    }),

    new HtmlWebpackPlugin({
      hash: true,
      template: './web/index.web.html',
      filename: 'index.html' // relative to root of the application
    })
  ],

  // Uncomment this only for testing the production build in a local dev server using `yarn start-dev-prod`
  // ,devServer: {
  //   port: 8081,
  //   publicPath: 'http://localhost:8081',
  //   compress: true,
  //   noInfo: false,
  //   stats: 'errors-only',
  //   inline: true,
  //   lazy: false,
  //   hot: true,
  //   headers: { 'Access-Control-Allow-Origin': '*' },
  //   contentBase: path.join(__dirname, '../web'),
  //   watchOptions: {
  //     aggregateTimeout: 300,
  //     ignored: /node_modules/,
  //     poll: 100
  //   },
  //   historyApiFallback: {
  //     verbose: true,
  //     disableDotRule: false
  //   },
  //   before() {
  //     if (process.env.START_HOT) {
  //       console.log('Starting Web Process...');
  //     }
  //   }
  // }
});

// Override the externals listing for web.
productionConfig.externals = ['fsevents', 'crypto-browserify'];
export default productionConfig;
