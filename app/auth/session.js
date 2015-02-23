var passport = require('passport'),
    BearerStrategy = require('passport-http-bearer').Strategy;

passport.use(new BearerStrategy({},
  function(token, done) {
    
    // IF TOKEN IS GOOD
      var user = {name:"james"}
      done(null, user)
  }
));
