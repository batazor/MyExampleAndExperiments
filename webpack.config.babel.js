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
        loader: "style-loader!css-loader"
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
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
