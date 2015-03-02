var express = require('express');
    router = express.Router(), 
    ub = App.require('/helpers/ub')

router.route('/')
.post(function (req, res, next) {
  var setup = App.settings.alreadySetup;
    res.success({
      alreadySetup: setup, 
      message: (setup ? App.settings.messages.alreadySetup : App.settings.messages.startSetup)
    });
});

router.route(['/db', '/step1'])
.post(function (req, res, next) {
	if(req.body && req.body.dbName){
		ub.editCmsSettings('db', req.body.dbName, function(){
  		res.success('database setup')
		})
	}else{
		err = new Error('Please supply a database name')
		err.status = 400
		next(err)
	}
});

router.route(['/name', '/step2'])
.post(function (req, res, next) {
	if(req.body && req.body.siteName){
		ub.editCmsSettings('siteName', req.body.siteName, function(){
  		res.success('siteName setup')
		})
	}else{
		err = new Error('Please supply a Site Name')
		err.status = 400
		next(err)
	}
});


router.use(App.require('/middlewares/405')(router));


module.exports = router;
