var env         = process.env.NODE_ENV || 'development'
  , packageJson = require('../../package.json')
  , path        = require('path')
  , express     = require('express');

console.log('Loading App in ' + env + ' mode');

global.App = {
  app: express(),
  name:packageJson.name,
  port: process.env.PORT || 3030,
  version: packageJson.version,
  root: process.cwd(),
  require: function(path){
    return require( this.root + '/' + path );
  },
  env: env,
  start:function(){
    if (!this.started) {
      this.started = true;
      this.app.listen(this.port);
      console.log('Running App Version ' + App.version + ' on port ' + App.port + ' in ' + App.env + ' mode')
    }else{ console.log('Server is already running'); }
  }

}


