var mongoose = require('mongoose');
module.exports = (function(global, undefined) {
  mongoose.connect('mongodb://localhost/dashingcms-'+App.env);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function (callback) {
    console.log('connected to dashingcms-'+App.env+':db');
  });
})(global);

