var express = require('express'),
    router = express.Router(),
    auth = App.require('/helpers/auth');
    User = App.require('/models/users/users');

router.route('/')
.post(auth.login, function (req, res, next) {
  if (req.user) {
    res.success(req.user, {keep: ['token'], message:'Login Successful'})
  }else{
    next(new Error('No User Found'))
  }
})

module.exports = router;
