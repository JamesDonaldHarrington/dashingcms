/*globals App*/
var express = require('express'),
    router = express.Router(), 
    Users = App.require('/models/users/users'),
    ub = App.require('/helpers/ub');

router.route('/')
.post(function (req, res, next) {
  user = new Users();
  user.email = req.body.email;
  user.password = req.body.password;
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;

  crypto.randomBytes(48, function(ex, buf) {
    user.token = buf.toString('hex');
    user.save(function(err, doc){
      if (err) {return next(err) };
      req.user = doc
      res.success(doc)
    })
  })
});


module.exports = router;
