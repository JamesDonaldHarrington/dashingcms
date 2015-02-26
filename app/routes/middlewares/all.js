var express = require('express'),
    app = module.exports = express(),
    protectedRouter = express.Router(),
    publicRouter = require('../login/login'),
    startRouter = require('../start/start'),
    authSession = require('../../auth/session'),
    ub = require('../../libs/ub');
app.disable('x-powered-by');

// GHETTO ROUTES BECAUSE EXPRESS DOESNT GIVE ME THE STACK WIHT THE NAME SPACE 
// =============================================================================
var apiRoutes = app.apiRoutes = [
  ['/api/start', startRouter.stack],
  ['/api', publicRouter.stack],
  ['/api/protected', protectedRouter.stack ]
];

// REQUEST LOGGING
// =============================================================================
app.use(function(req, res, next) {
    console.log('==============================================================================');
    console.log('Making a '+ req.method +' request ( To API: ' + req.url + ' --  From Client: ' + req.originalUrl + ' )');
    console.time('Complete. This request took');
    
    next(); 
});





// protectedRouter.route('/')
// .post(function(req, res, next){
//   console.log('Hello');
//   res.success('Hello World from protected')
// });

// NAME SPACEING
// =============================================================================
app.use('/api/protected', authSession, protectedRouter);
app.use('/api', publicRouter);
app.use('/api/start', startRouter);



// Handle 405 errors
// =============================================================================
app.use(function(req, res, next) {
  var flag = false;
  console.log(req)
  for (var i = 0, l = apiRoutes.length; i < l; i++) { 
    var baseUrl = apiRoutes[i][0], stack = apiRoutes[i][1];
    console.log(stack)
    if (stack && stack[0]) {
      for (var j = 0; j < stack[0].route.stack.length; j++) {
          var method = stack[0].route.stack[j].method;
          var path = (baseUrl + stack[0].route.path).replace(/\?.*/, "").replace(/\/$/, "");
          var cleanUrl = req.url.replace(/\?.*/, "").replace(/\/$/, "");
          if (req.method !== method && cleanUrl == path) {
            flag = true
          }
      }
    }
  }

  if (flag) {
    var err = new Error('Method Not Allowed');
    err.status = 405;
    return next(err);
  }

  next();
});



// HANDLE 404
// =============================================================================
app.all('*', function(req, res, next) {
  next(ub.err('Endpoint not found', 400, false));
});

// HANDLING OTHER ERRORS
// =============================================================================
app.use(function(err, req, res, next) {

  err.status = err.status || 500;
  if (!err.json) {
    err.json = {
      status:err.status,
      success: false,
      display : err.display || false,
      type : (err.status === 500 ? 'The server has failed' : err.type || undefined),
      message: (err.status === 500 ? 'The server has failed' : err.message),
    }
  };


  res.status(err.status).json(err.json);
  console.log(err.json.status+ ' error. -- Failure due to '+ err.json.message+ ' See Full StackTrace Below')
  console.timeEnd('Complete. This request took');
  console.log('==============================================================================\n');
  console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');
  console.log(err.stack);
  console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');
});
