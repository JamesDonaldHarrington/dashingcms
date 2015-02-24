var express = require('express'),
    app = module.exports = express(),
    publicRouter = express.Router(),
    authSession = require('../../auth/session'),
    ub = require('../../libs/ub');
app.disable('x-powered-by');



publicRouter.route('/')
.post(function(req, res, next){
  
  res.success('Hello World from public')
});


module.exports = publicRouter;
