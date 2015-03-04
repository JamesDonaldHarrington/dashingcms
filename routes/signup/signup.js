/*globals App*/
var express = require('express'),
    router = express.Router(), 
    User = App.require('/models/users/users'),
    ub = App.require('/helpers/ub');

router.route('/')
.post(function (req, res, next) {
  user = new User();
  user.email = req.body.email;
  user.password = req.body.password;
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  console.log(user)
  user.save(function(err, doc){
    if (err) {return next(err) };
    res.success(doc)
  });
});


router.use(App.require('/middlewares/405')(router));


module.exports = router;
