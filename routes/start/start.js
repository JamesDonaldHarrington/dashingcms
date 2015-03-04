/*globals App*/
var express = require('express'),
    router = express.Router(), 
    ub = App.require('/helpers/ub');

var validationError = {
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
}
router.route('/')
.post(function (req, res/*, next*/) {
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
            res.success('site name and database name setup was successful');
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


router.use(App.require('/middlewares/405')(router));


module.exports = router;
