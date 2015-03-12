/*globals App*/
var auth = module.exports = {},
    crypto = require('crypto'),
    Users = App.require('/models/users/users');


auth.login = function(req, res, next){
  Users.findOne({ email: req.body.email }, function(err, user){
    if (err){return next(err);} 
    if (!user){err = new Error('This user does not exist'); err.status = 400, err.type = 'danger'; return next(err)}
    user.comparePassword(req.body.password, function(err, desc) {
      if(err){return next(err);}
      if (!desc) {
        err = new Error('Invalid password');
        err.status = 400;
        err.type = 'error';
        return next(err);
      }else{
        crypto.randomBytes(48, function(ex, buf) {
          user.token = buf.toString('hex');
          user.save(function(err, doc){
            req.user = doc;
            next();
          });
        });
      }
    });
  });
};


auth.creds = function(req, res, next ){
  var id = req.headers.id;
  var token = req.headers.token;
  Users.findOne({'_id':id}, function(err, doc){
    if (err) { return next(err);}
    if (!doc) {
      err = new Error('There was an error. Please login to continue');
      err.status = 401; err.type = 'warning';
      return next(err);
    }
    if (token === doc.token) {
      req.user = doc;
      next();
    }else{
      err = new Error('Please login to continue');
      err.status = 401; err.type = 'warning';
      return next(err);
    }
  });
};
