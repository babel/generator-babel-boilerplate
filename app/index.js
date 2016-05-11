'use strict';
var file = require('file');
var path = require('path');
var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');
var _ = require('lodash');
var jsesc = require('jsesc');
var Promise = require('bluebird');
var exec = Promise.promisify(require('child_process').exec);
var gitConfig = require('git-config');

function jsonEscape(str) {
  return jsesc(str, {quotes: 'double'});
}

function generateName(str) {
  str = _.chain(str)
    .deburr()
    .trim()
    .replace(' ', '-')
    .value();
  return str.toLowerCase();
}

module.exports = generators.Base.extend({
  initializing: function() {
    this.pkg = require('../package.json');
  },

  prompting: function() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('Babel Library Boilerplate') + ' generator!'
    ));

    return Promise.all([exec('npm whoami').catch(function(e) {
      console.error('Error getting npm user name: run `npm login`');
      console.error(e);
    })])
    .then(function(result) {
      result = result ? result : {};
      this.username = _.trim(result[0]);
      return this._showPrompts();
    }.bind(this));
  },

  _showPrompts: function() {
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
      default: generateName(this.appname)
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
      message: 'If there is one, what is the name of this project\'s main variable?',
      default: _.camelCase(this.appname)
    }];

    var self = this;
    return self.prompt(prompts).then(function(props) {
      self.user = jsonEscape(props.user);
      self.repo = jsonEscape(props.repo);
      self.description = jsonEscape(props.description);
      self.author = jsonEscape(props.author);
      self.variable = props.variable;
    });
  },

  writing: {
    app: function() {
      var src = this.sourceRoot();
      var self = this;
      file.walkSync(src, function(dirPath, dirs, files) {
        var relativeDir = path.relative(src, dirPath);
        files.forEach(function(filename) {
          var target;
          // Only copy the files that we don't want to rename. We do that after this loop.
          // The files we don't want to rename are both "index.js", and one of them is in
          // "test/unit," and the other is in "src"
          var ignoreDir = relativeDir === 'test/unit' || relativeDir === 'src';
          var shouldCopy = !ignoreDir && !/index.js$/.test(filename);
          if (shouldCopy) {
            target = path.join(relativeDir, filename);
            self.template(target, target);
          }
        });
      });
      this.template('src/index.js', 'src/' + this.repo + '.js');
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
