global.chai = require('chai');
global.sinon = require('sinon');
global.chai.use(require('sinon-chai'));

require("6to5/register");
require('./setup')();
