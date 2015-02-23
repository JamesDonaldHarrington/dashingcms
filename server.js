var express = require('express'),
    app = express(),
    router = express.Router(),
    passport = require('passport'),
    bodyParser = require('body-parser');

require('./app/config/db');
require('./app/auth/session');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



router.route('/')
.all(function(req, res, next){
  console.log('Hello');
  res.send('Hello World')
});

app.use('/api', passport.authenticate('bearer', { session: false }) , router)



app.listen(3030)
console.log('Listening on port 3030');
