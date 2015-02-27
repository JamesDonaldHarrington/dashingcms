var express = require('express');
var loginRouter = express.Router();

loginRouter.route('/')
.get(function (req, res) {
  res.success('Logging you in')
});
loginRouter.route('/step2')
.get(function (req, res) {
  res.success('Your Logged in')
});



module.exports = loginRouter;
