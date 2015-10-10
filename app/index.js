'use strict';
var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');
var camelcase = require('lodash.camelcase');
var kebabcase = require('lodash.kebabcase');
var trim = require('lodash.trim');
var Promise = require('bluebird');
var exec = Promise.promisify(require('child_process').exec);
var gitConfig = require('git-config');

module.exports = generators.Base.extend({
  initializing: function() {
    this.pkg = require('../package.json');
  },

  prompting: function() {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('Babel Library Boilerplate') + ' generator!'
    ));

    Promise.all([exec('npm whoami').catch(function(e) {
      console.error('Error getting npm user name: run `npm login`');
      console.error(e);
    })])
    .then(function(result) {
      result = result ? result : {};
      this.username = trim(result[0]);
      this._showPrompts(done);
    }.bind(this));
  },

  _showPrompts: function(done) {
    var config = gitConfig.sync();
    config.user = config.user ? config.user : {};
    var prompts = [{
      type: 'input',
      name: 'user',
      message: 'What is the Github username/organization for this project?',
      default: this.username,
      store: true
    }, {
      type: 'input',
      name: 'repo',
      message: 'What is the repository/project name?',
      default: kebabcase(this.appname)
    }, {
      type: 'input',
      name: 'description',
      message: 'What is a short description for this project?'
    }, {
      type: 'input',
      name: 'author',
      message: 'Who is the author of this project?',
      default: config.user.name + ' <' + config.user.email + '>',
      store: true
    }, {
      type: 'input',
      name: 'variable',
      message: 'What is the name of this project\'s main variable?',
      default: camelcase(this.appname)
    }];

    this.prompt(prompts, function (props) {
      this.user = props.user;
      this.repo = props.repo;
      this.description = props.description;
      this.author = props.author;
      this.variable = props.variable;
      done();
    }.bind(this));
  },

  writing: {
    app: function() {
      this.template('babelrc', '.babelrc');
      this.template('jscsrc', '.jscsrc');
      this.template('travis.yml', '.travis.yml');
      this.template('eslintrc', '.eslintrc');
      this.template('editorconfig', '.editorconfig');
      this.template('_package.json', 'package.json');
      this.template('LICENSE', 'LICENSE');
      this.template('README.md', 'README.md');
      this.template('CHANGELOG.md', 'CHANGELOG.md');
      this.template('gitignore', '.gitignore');
      this.template('gulpfile.babel.js', 'gulpfile.babel.js');
      mkdirp.sync('src');
      this.template('src/index.js', 'src/' + this.repo + '.js');
      mkdirp.sync('test');
      this.template('test/eslintrc', 'test/.eslintrc');
      this.template('test/runner.html', 'test/runner.html');
      mkdirp.sync('test/setup');
      this.template('test/setup/browser.js', 'test/setup/browser.js');
      this.template('test/setup/node.js', 'test/setup/node.js');
      this.template('test/setup/setup.js', 'test/setup/setup.js');
      mkdirp.sync('test/unit');
      this.template('test/unit/index.js', 'test/unit/' + this.repo + '.js');
    }
  },

  install: function() {
    this.installDependencies({
      bower: false,
      npm: true,
      skipInstall: this.options['skip-install']
    });
  }
});
