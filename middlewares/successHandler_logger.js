var express = require('express');
var router = express.Router();

// REQUEST LOGGING
// =============================================================================
router.use(function(req, res, next) {
    console.log('==============================================================================');
    console.log('Making a '+ req.method +' request ( To API: ' + req.url + ' --  From Client: ' + req.originalUrl + ' )');
    console.time('Complete. This request took');
    
    next(); 
});


// GLOBAL RESPONSE HANDLER
// =============================================================================
router.use (function successHandler(req, res, next){
    res.success = function(payload, config){
      
      config = config || {};
      var win = {
        query:req.body,
        status:config.status || 200,
        success:true,
        payload: payload || {},
      };

      res.status(config.status || 200).json(win);
      console.log('Success ' +res._headers['content-length']+' bites of data transferred')
      console.timeEnd('Complete. This request took');
      console.log('==============================================================================');
    };
    next();
})

module.exports = router
