var env         = process.env.NODE_ENV || 'development'
  , packageJson = require('../package.json')
  , path        = require('path')
  , express     = require('express');

console.log('Loading App in ' + env + ' mode');

global.App = {
  app: express(),
  port: process.env.PORT || 3030,
  version: packageJson.version,
  root: path.join(__dirname, '  '),
  appPath: function(path) {
    return this.root + '/' + path;
  },
  require: function(path){
    return require(this.appPath(path));
  },
  env: env,
  start:function(){
    if (!this.started) {
      this.started = true;
      this.app.listen(this.port);
      console.log('Running App Version ' + App.version + ' on port ' + App.port + ' in ' + App.env + ' mode')
    }else{ console.log('Server is already running'); }
  },
  route: function(path){
    return this.require('app/routes/'+path)
  }

}
