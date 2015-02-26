// GLOBAL RESPONSE HANDLER
// =============================================================================
function successHandler(req, res, next){
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
}
module.exports = successHandler
