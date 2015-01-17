var setup = require('./setup');
var config = require('../../config');

global.MyLibrary = require('../../src/' + config.entryFileName);
global.chai = require('chai');
global.sinon = require('sinon');
global.chai.use(require('sinon-chai'));
setup();
