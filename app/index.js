'use strict';
var file = require('file');
var path = require('path');
var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');
var _ = require('lodash');
var jsesc = require('jsesc');
var npmWhoami = require('npm-whoami');

function jsonEscape(str) {
  return jsesc(str, {quotes: 'double'});
}

function generateName(str) {
  str = _.chain(str)
    .deburr()
    .trim()
    .replace(/\s/g, '-')
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

    this.username = '';
    try {
      this.username = npmWhoami.sync();
    } catch(e) {
      console.warn('Error getting npm user name: run `npm login`');
      console.warn(e);
    }

    const gitName = this.user.git.name();
    const gitEmail = this.user.git.email();
    let defaultAuthor = gitName ? gitName : '';
    if (gitEmail) {
      defaultAuthor += ` <${gitEmail}>`;
    }

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
      default: defaultAuthor,
      store: true
    }, {
      type: 'input',
      name: 'variable',
      message: 'If there is one, what is the name of this project\'s main variable?',
      default: _.camelCase(this.appname)
    }];

    var self = this;
    return self.prompt(prompts)
      .then(function(props) {
        self.user = jsonEscape(props.user);
        self.repo = jsonEscape(props.repo);

        // Remove `.js` from the npm module name, per the "tips" section of the
        // npm documentation: https://docs.npmjs.com/files/package.json#name
        if (_.endsWith(self.repo, '.js')) {
          self.moduleName = self.repo.slice(0, -3);
        } else {
          self.moduleName = self.repo;
        }

        // The mainFile, on the other hand, must always have an extension
        self.entryFileName = self.moduleName + '.js';

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
