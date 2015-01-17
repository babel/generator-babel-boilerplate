const mainConfig = require('../main-config');

module.exports = {
  output: {
    filename: mainConfig.fileName + '.js',
    libraryTarget: 'umd'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules\/bower_components/,
        loader: '6to5-loader?modules=ignore'
      },
      { test: /\.json$/, loader: 'json-loader' }
    ],
  }
};
