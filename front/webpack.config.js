const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const stylesHandler = 'style-loader';

const d_root = (...args) => path.resolve(__dirname, ...args);
const d_src = (...args) => d_root('src', ...args);
const d_dist = (...args) => d_root('dist', ...args);
const d_components = (...args) => d_src('components', ...args);
const d_methodes = (...args) => d_src('methodes', ...args);

const config = {
  entry: d_src('index.tsx'), // Entry file for React
  output: {
    path: d_dist(),
    filename: 'bundle.js', // Output file name
  },
  devServer: {
    open: true,
    host: 'localhost',
    port: 3000, // Default port for React
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: d_src('index.html'),
      filename: 'index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: d_src('webamp/webamp.html'), to: d_dist() },
        { from: d_src('webamp/webamp.js'), to: d_dist() },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      root: d_root(),
      src: d_src(),
      components: d_components(),
      methodes: d_methodes(),
    }
  },
  mode: isProduction ? 'production' : 'development',
};

module.exports = config;
