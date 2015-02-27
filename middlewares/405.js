
function fourohfive(router){
  return function(req, res, next) {
    var allowMethods='';
    var flag = true;
    for (var i = 0, rl = router.stack.length; i < rl; i++) {
      var route = router.stack[i].route;
      if (route && req.url.toLowerCase() === route.path.toLowerCase()) {
        var allowMethods = Object.keys(route.methods).join(', ').toUpperCase();
        for (var key in route.methods) {
          if (route.methods.hasOwnProperty(key)) {
            if(key.toLowerCase() === req.method.toLowerCase()){
              flag = false
            }
          }
        }
      }
    };
    if (flag) {
      res.setHeader('Allow', allowMethods)
      var err = new Error('Method Not Allowed');
      err.status = 405;
      return next(err);
    }

    return next();
  };
};


module.exports  = fourohfive;
