import path from 'path';
import webpack from 'webpack';
import { DEBUG } from './src/server/config';

const devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(DEBUG))
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
        loader: "style-loader!css-loader"
      },
    ]
  },
  devServer: {
    contentBase: "./src/public",
    hot: true,
    quiet: false,
    colors: true,
    noInfo: true,
    historyApiFallback: true,
    inline: true
  },
};
