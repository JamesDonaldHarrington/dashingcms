// HANDLING OTHER ERRORS
// =============================================================================
function errs(err, req, res, next) {
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
};

module.exports = errs
