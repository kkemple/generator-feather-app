var generators = require('yeoman-generator')

var prompts = [
  {
    type: 'input',
    name: 'appName',
    message: 'Application name? ...',
    default: 'my-app',
    store: true
  },

  {
    type: 'input',
    name: 'author',
    message: 'NPM author name? ...',
    default: 'Example Name <example@name.com>',
    store: true
  }
]

module.exports = generators.Base.extend({
  prompting: function() {
    var done = this.async()
    var self = this;

    this.prompt(prompts, function(answers) {
      self.appName = answers.appName
      self.authorName = answers.author
      done()
    })
  },

  writing: function() {
    this.fs.copy(
      this.templatePath('**'),
      this.destinationPath()
    )
    this.fs.copyTpl(
      this.destinationPath('package.json'),
      this.destinationPath('package.json'),
      { appName: this.appName, author: this.authorName }
    )
    this.fs.copyTpl(
      this.destinationPath('src/views/app.js'),
      this.destinationPath('src/views/app.js'),
      { appName: this.appName }
    )
  }
})
