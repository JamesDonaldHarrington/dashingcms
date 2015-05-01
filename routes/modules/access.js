/*globals App*/
var express = require('express'),
    router = express.Router(),
    auth = App.require('/helpers/auth');

router.route('/access/:id?')
.get(auth.creds, function (req, res, next) {
  doc = {
    files:         ['create', 'destroy'],
    blog:          ['create', 'update', 'destroy'],
    gallery:       ['create', 'update', 'destroy'],
    users:         ['create', 'read', 'update', 'destroy'],
    permissions:   ['create', 'read', 'update', 'destroy']
  }
  res.success(doc);
});


module.exports = router;
