import path from 'path'
import webpack from 'webpack'
import autoprefixer from 'autoprefixer'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import { DEBUG, PORT, APP_NAME } from './src/server/config'

const devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(DEBUG)),
  __PORT__: JSON.stringify(JSON.parse(PORT))
})

const cssLoaders = {
  test: /\.css$/,
  loader: ExtractTextPlugin.extract('style', 'css!postcss')
}

const scssLoaders = {
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract('style', `css-loader?${JSON.stringify({
    sourceMap: DEBUG,
    modules: true,
    localIdentName: DEBUG ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]',
    minimize: !DEBUG,
  })}` + '!sass')
}

export default {
  devtool: DEBUG ? 'cheap-module-eval-source-map' : undefined,
  entry: [ './src/app/app' ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('bundle.css', { allChunks: true, disable: DEBUG }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: !DEBUG,
        drop_debugger: !DEBUG,
        unsafe: true,
        comparisons: !DEBUG,
        booleans: !DEBUG,
        if_return: !DEBUG
      },
      output: {
        comments: DEBUG
      }
    }),
    devFlagPlugin
  ],
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loaders: ['eslint'],
        exclude: /node_modules/,
        include: path.join(__dirname, 'src/app'),
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/
      },
      cssLoaders,
      scssLoaders,
      {
        test: /\.json/,
        loader: 'json'
      },
      {
        test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
        loader: 'file?name=[path][name].[ext]?[hash]'
      }
    ]
  },
  postcss: () => {
    return [
      autoprefixer({
        browsers: ['last 2 versions']
      })
    ]
  },
  devServer: {
    contentBase: './src/public',
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
}
