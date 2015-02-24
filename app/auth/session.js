var express = require('express'),
    app = express(),
    ub = require('../libs/ub');
app.disable('x-powered-by');


module.exports  = function isAuthed(req, res, next){
  var token = (req.headers.authorization ? req.headers.authorization.substr(6).trim(): req.body.token || '')
  if (token && req.body.email && req.body._id ) {
    Users.findOne({_id: req.body._id}, function(err, doc){
      if (err) {return next(err);}
      if (doc.token === req.body.token) {
        if (doc.email === req.body.email) {
          return next() 
        }else{
          return next(ub.err('Unauthorized email doesn\'t match database please login again', 401 , 'warn' ))  
        }
      }else{
        return next(ub.err('Unauthorized expired token please login again', 401 , 'warn' ))
      } 
    });
  }else{
    return next(ub.err('Unauthorized please login to continue', 401,  'warn' ))
  }
}
