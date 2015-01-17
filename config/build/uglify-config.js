const mainConfig = require('../main-config');

module.exports = {
  outSourceMap: true,
  inSourceMap: 'dist/' + mainConfig.fileName + '.js.map',
};
