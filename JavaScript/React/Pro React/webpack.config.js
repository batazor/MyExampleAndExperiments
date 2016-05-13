module.exports = {
  entry: [
    './source/App.js'
  ],
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js?/,
        loader: 'babel'
      }
    ]
  }
};
