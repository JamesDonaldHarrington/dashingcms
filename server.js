var express = require('express'),
    app = express(), 
    bodyParser = require('body-parser'),
    routes = require('./app/routes/all');

app.disable('x-powered-by');
require('./app/config/db');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(routes)


app.listen(3030, function () {
  require('./app/libs/routes')(routes.apiRoutes);
  console.log('Listening on port 3030');
});
