const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'), 
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'JATE',  
        template: './src/index.html', 
      }),
      new MiniCssExtractPlugin(),
      new InjectManifest({
        swSrc: './src/src-sw.js', 
        swDest: 'sw.js', 
      }),
      new WebpackPwaManifest({
        name: 'jate', 
        short_name: 'jate', 
        description: 'Text editor that can be installed from the web browser', 
        background_color: '#01579b',
        theme_color: '#7eb4e2',
        start_url: '/', 
        publicPath: '/', 
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),      
    ],

    module: {
      rules: [
        {
          test: /\.css$/i, 
          use: [MiniCssExtractPlugin.loader, 'css-loader'], 
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i, 
          type: 'asset/resource',
        },
        {
          test: /\.m?js$/, 
          exclude: /(node_modules|bower_components)/, 
          use: { 
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
