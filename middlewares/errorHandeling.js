// HANDLING OTHER ERRORS
// ============================================================================= //

function errs(err, req, res, next) {
  err = mongoErrorChecker(err);
  err.status = err.status || 500;
  err.json = err.json || {};
  err.json.query    = err.json.query   || req.body;
  err.json.status   = err.json.status  || err.status;
  err.json.success  = err.json.success || false;
  err.json.type     = err.json.type    || (err.status === 500 ? 'danger' : err.type || false);
  err.json.message  = err.json.message || (err.status === 500 ? 'The server has failed' : err.message || 'Generic error message');
  err.json.results  = err.json.results || err.results || {};

  err.type = (err.json.message === 'Generic error message' ? false : err.type);

  res.status(err.status).json(err.json);
  console.log(err.json.status+ ' error. -- Failure due to '+ err.json.message+ ' See Full StackTrace Below');
  console.timeEnd('Complete. This request took');
  console.log('==============================================================================\n');
  console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');
  console.log(err.stack);
  console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');
  console.log(err);
  console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');
}



function mongoErrorChecker(err){
  if (err.name) {
    var possibleErrConfig = {
      'ValidationError':function(err){
        err.status = 400;
        err.results = {errors:err.errors};
        return err;
      },
      'MongoError':function(err) {
        if (err.code === 11000) {
          err.status = 400
        };
        err.results = {
          errors:{
            
          }
        }
        return err
      }
    };
    if (possibleErrConfig.hasOwnProperty(err.name)) {
      err = possibleErrConfig[err.name](err);
    }
  }

  return err;
} 



module.exports = errs;
