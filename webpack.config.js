const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const outputPath = path.resolve(__dirname, 'public');
const sourcePath = path.resolve(__dirname, 'assets');

const config = {
  mode: 'development',
  target: 'web',
  entry: {
    app: [`${sourcePath}/js/main.jsx`, `${sourcePath}/scss/main.scss`],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'all',
          name: 'vendor',
        },
      },
    },
  },
  output: {
    filename: '[name].[fullhash].js',
    path: outputPath,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      Src: path.resolve(__dirname, '/assets/js/'),
      Components: path.resolve(__dirname, '/assets/js/components/'),
    },
  },
  devtool: 'inline-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    hot: true,
    client: {
      logging: 'verbose',
      overlay: true,
      progress: true,
    },
    devMiddleware: {
      publicPath: path.join(__dirname, 'public'),
      writeToDisk: true,
    },
    allowedHosts: 'all',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': '*',
    },
    static: {
      directory: path.join(__dirname, 'public'),
    },
    watchFiles: ['public/**/*'],
  },
  module: {
    rules: [
      {
        /* Check the code with Eslint and after use Babel to compile js to es5 */
        test: /\.jsx?$/,
        include: [sourcePath],
        exclude: [path.resolve('./node_modules'), outputPath],
        enforce: 'pre',
        use: ['babel-loader'],
      },
      {
        /* Convert SASS to CSS */
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // Extract CSS to an external file
          'css-loader', // Allow to import CSS
          {
            /* Add auto prefix to css */
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  // eslint-disable-next-line global-require
                  require('autoprefixer')({}),
                  // eslint-disable-next-line global-require
                  require('cssnano')({
                    preset: [
                      'default',
                      {
                        discardComments: {
                          removeAll: true,
                        },
                      },
                    ],
                  }),
                ],
              },
            },
          },
          {
            /* Convert sass to css */
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [`${sourcePath}/scss`],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    /* Create /dist/index.html */
    new HtmlWebpackPlugin({
      title: 'Blogify',
      template: 'index.html',
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[contenthash].css',
    }),
  ],
};

module.exports = config;
