// GLOBAL RESPONSE HANDLER
// =============================================================================\
var ub = App.require('/helpers/ub');
module.exports = function successHandler(req, res, next){
    res.success = function(payload, config){
      
      config = config || {};
      var win = {
        query:req.body,
        status:config.status || 200,
        success:true,
        message: config.message || undefined,
        type: config.type || (config.message ? 'success': false),
        results: ub.stripCreds(payload, config.keep || []) || {},
      };

      res.status(config.status || 200).json(win);
      console.log('Success ' +res._headers['content-length']+' bites of data transferred')
      console.timeEnd('Complete. This request took');
      console.log('==============================================================================');
    };
    next();
};
