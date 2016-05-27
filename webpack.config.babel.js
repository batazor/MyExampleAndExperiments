import path from 'path';
import webpack from 'webpack';
import { DEBUG, PORT } from './src/server/config';

const devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(DEBUG)),
  __PORT__: JSON.stringify(JSON.parse(PORT))
});

export default {
  devtool: 'eval-source-map',
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/only-dev-server',
    './src/app/app'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    devFlagPlugin
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'src/app'),
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loaders: [
          "style",
          `css-loader?${JSON.stringify({
            sourceMap: DEBUG,
            minimize: !DEBUG,
          })}`,
        ]
      },
      {
        test: /\.scss$/,
        loaders: [
          "style",
          `css-loader?${JSON.stringify({
            sourceMap: DEBUG,
            modules: true,
            localIdentName: DEBUG ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]',
            minimize: !DEBUG,
          })}`,
          "sass"
        ]
      },
    ]
  },
  devServer: {
    contentBase: "./src/public",
    hot: true,
    quiet: false,
    noInfo: true,
    historyApiFallback: true,
    inline: true,
    stats: {
      chunks: true,
      chunkModules: false,
      colors: true,
      reasons: true,
      timings: true
    }
  },
};
