var setup = require('./setup');

global.MyLibrary = require('../../src/index');
global.chai = require('chai');
global.sinon = require('sinon');
global.chai.use(require('sinon-chai'));
setup();
