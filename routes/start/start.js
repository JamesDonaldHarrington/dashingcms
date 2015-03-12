/*globals App*/
var express = require('express'),
    router = express.Router(), 
    Users = App.require('/models/users/users'),
    crypto = require('crypto'),
    ub = App.require('/helpers/ub'),

validationError = {
  dbName:{
    message: "Database name is required",
    name: "ValidatorError",
    path: "dbName",
    type: "required"
  },
  siteName:{
    message: "Site name is required",
    name: "ValidatorError",
    path: "siteName",
    type: "required"
  }
};
router.route('/')
.get(function (req, res/*, next*/) {
  var setup = App.settings.isAlreadySetup;
  res.success({
    alreadySetup: setup
  });
});

router.route('/setup')
.post(function (req, res, next) {
  if (!App.settings.isAlreadySetup) {
    if(req.body && req.body.dbName && req.body.siteName){
      ub.editCmsSettings('db='+req.body.dbName, function(){
        ub.editCmsSettings('siteName='+req.body.siteName, function(){
          ub.editCmsSettings('isAlreadySetup=true', function(){
            res.success({}, {message:'Setup was successful'});
            process.exit(0);
          });
        });
      });
    }else{
      var err = new Error('Please supply a database name and a site name');
      err.name = 'ValidationError';
      err.errors = validationError
      err.status = 400;
      err.type = 'warning';
      next(err);
    }
  }else{
    var err = new Error('The site is already configured');
      err.status = 400;
      err.type = 'warning';
      next(err);
  }
});

module.exports = router;
