// HANDLE 404
// =============================================================================
function fourohfour(req, res, next) {
  console.log('Endpoint not found')
  err = new Error('Endpoint Not Found');
  err.status = 400;
  next(err);
};
module.exports = fourohfour;
