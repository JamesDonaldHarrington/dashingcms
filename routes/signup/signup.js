/*globals App*/
var express = require('express'),
    router = express.Router(), 
    Users = App.require('/models/users/users'),
    crypto = require('crypto'),
    ub = App.require('/helpers/ub');  

router.route('/')
.post(function (req, res, next) {
  user = new Users();
  user.email = req.body.payload.email;
  user.password = req.body.payload.password;
  user.givenName = req.body.payload.givenName;
  user.familyName = req.body.payload.familyName;

  crypto.randomBytes(48, function(ex, buf) {
    user.token = buf.toString('hex');
    user.save(function(err, doc){
      if (err) {return next(err) };
      req.user = doc
      res.success(doc, {keep: ['token']})
    })
  })
});


module.exports = router;
