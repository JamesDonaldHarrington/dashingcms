var express = require('express');
var router = express.Router();

router.route('/')
.post(function (req, res, next) {
  var su = App.settings.alreadySetup;
    res.success({
      alreadySetup: su, 
      message: (su ? App.settings.messages.alreadySetup : App.settings.messages.startSetup)
    });
});

router.route(['/db', '/step1'])
.post(function (req, res, next) {
  
});


router.use(App.require('/middlewares/405')(router));


module.exports = router;
