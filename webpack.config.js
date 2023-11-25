const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: './src/assets/js/index.js',
  },
  output: {
    filename: 'main.[hash].js',
    path: path.resolve(__dirname, 'build')
  },
  mode: 'development',

  devServer: {
    static: {
      directory: path.resolve(__dirname, 'build'),
    },
    open: true,


    // compress: true,
    // port: 9000,
    // hot: true,
  },

  // devServer: {
  //   static: "./src",
  //   compress: true,
  //   port: 9000,
  //   hot: true,
  //   open: true,
  // },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        type: 'asset/resource',

        generator: {
          filename: "images/[name].[hash][ext]"
        },
      },

      {
        test: /\.(mp4)$/,
        use: [
          {

            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/[name].[hash][ext]'
            }
          }
        ]
      },


      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: "fonts/[name].[hash][ext]"
        },
      },
      {
        test: /\.(s[ac]ss|css)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
          }
          },
          'postcss-loader',
          // 'style-loader',
          // 'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sassOptions: {
                outputSass: 'compressed'
              }
            }
          }
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
    new HtmlMinimizerPlugin(),
  ],
};
