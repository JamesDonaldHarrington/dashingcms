var settings = require('./cmsSettings.json');
if (settings.isAlreadySetup) {
	var mongoose = require('mongoose');
	module.exports = (function(global, undefined) {
	  mongoose.connect('mongodb://localhost/'+settings.db+'-'+App.env);
	  var db = mongoose.connection;
	  db.on('error', console.error.bind(console, 'connection error:'));
	  db.once('open', function (callback) {
	    console.log('connected to '+settings.db+'-'+App.env+':db');
	  });
	})(global);
}

