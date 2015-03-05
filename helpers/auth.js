/*globals App*/
var auth = module.exports = {},
    crypto = require('crypto'),
    Users = App.require('/models/users/users');


auth.login = function(req, res, next){
  if (!req.body.payload) {var err =new Error('please provide a payload object'); err.status =400; return next(err);}
  Users.find({ email: req.body.payload.email }, function(err, user){ user = user[0];
    user.comparePassword(req.body.payload.password, function(err, desc) {
      if (desc) {
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


// auth.newToken = function(cb){
// 
// };

auth.creds = function(req, res, next ){
  // console.log(req.body);
  Users.findOne({'_id':req.body.id}, function(err, doc){
    if (err) { return next(err);}
    if (!doc) {
      err = new Error('No user found with that id');
      err.status = 400; err.type = 'warning';
      return next(err);
    }
    if (req.body.token === doc.token) {
      console.log(doc);
      req.user = doc;
      next();
    }else{
      err = new Error('Please login to continue');
      err.status = 400; err.type = 'warning';
      return next(err);
    }
  });
};
