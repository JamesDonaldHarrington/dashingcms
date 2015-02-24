var express = require('express'),
    app = module.exports = express(),
    startRouter = express.Router(),
    authSession = require('../../auth/session'),
    User = require('../../models/users/users');
    ub = require('../../libs/ub');
app.disable('x-powered-by');



startRouter.route('/')
.get(function(req, res, next){
  var tempUser = new User({
      firstName: 'james',
      lastName:'harrington',
      email: 'indoisfun@@@gmail.com',
      password: 'Password123'
  });

  tempUser.save(function(err, doc){
    if (err) {return next(ub.err(err, 400, 'warn', {mongoose:true} )); };
    console.log(doc)
    res.success('Welcome', doc.email)
  })
});

module.exports = startRouter;
