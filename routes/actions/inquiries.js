var express = require('express'),
    router = express.Router(),
    auth = App.require('/helpers/auth');
    User = App.require('/models/users/users');

router.route('/inquiries/:id?', auth.creds)
.post(function (req, res, next) {
  res.success('create')
})
.get(function (req, res, next) {
  res.success('read')
})
.put(function (req, res, next) {
  res.success('update')
})
.delete(function (req, res, next) {
  res.success('destroy')
});


module.exports = router;
