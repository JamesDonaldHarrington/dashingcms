var express = require('express'),
    router = express.Router(),
    auth = App.require('/helpers/auth'),
    ub = App.require('/helpers/ub'),
    Users = App.require('/models/users/users');

router.route('/users/:id?', auth.creds)
.get(function (req, res, next) {
  Users.find(function(err, doc){
  	if (err) {return next(err);}
  	doc = ub.stripCreds(doc);
  	res.success(doc);
  });
})
.put(function (req, res, next) {
  res.success('update')
})
.delete(function (req, res, next) {
  res.success('destroy')
});


module.exports = router;
