/*globals App*/
var express = require('express'),
    router = express.Router(), 
    Users = App.require('/models/users/users'),
    crypto = require('crypto'),
    ub = App.require('/helpers/ub');  

router.route('/')
.post(function (req, res, next) {
  User.find(function(err, doc){
    if (err) {return next(err);}
    if (doc.length > 0 ){
      err = new Error('The owner of this site must invite you');
      err.status = 400; err.type = 'danger';
      return next(err);
    }
    user = new Users();
    user.email = req.body.email;
    user.password = req.body.password;
    user.givenName = req.body.givenName;
    user.familyName = req.body.familyName;

    crypto.randomBytes(48, function(ex, buf) {
      user.token = buf.toString('hex');
      user.save(function(err, doc){
        if (err) {return next(err) };
        req.user = doc
        res.success(doc, {keep: ['token'], message:'User Successfully created'})
      })
    })
  });
});


module.exports = router;
