var express = require('express'),
    router = express.Router(),
    auth = App.require('/helpers/auth');
    Files = App.require('/models/actions/files');

router.route('/files/:id?')
.post(auth.creds, function (req, res, next) {
  res.success('create')
})
.get(function (req, res, next) {
  res.success('read')
})
.put(auth.creds, function (req, res, next) {
  res.success('update')
})
.delete(auth.creds, function (req, res, next) {
  res.success('destroy')
});


module.exports = router;
