var express = require('express'),
    router = express.Router(),
    auth = App.require('/helpers/auth');
    User = App.require('/models/users/users');

router.route('/')
.post(auth.creds, function (req, res, next) {
  res.success({}, {message: 'User is logged in'})
})

module.exports = router;
