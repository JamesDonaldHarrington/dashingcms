var express = require('express'),
    router = express.Router(),
    auth = App.require('/helpers/auth');
    User = App.require('/models/users/users');

router.route('/dashboard')
.post(auth.creds, function (req, res, next) {

  res.success(true)

})


module.exports = router;
