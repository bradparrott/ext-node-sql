var express = require('express'),
  logger = require('logger-request'),
  api = require('./api'),
  bodyParser = require('body-parser'),
  ext = require('./ext'),
  app = express(),
  config = require('./server-config');

// Define some middleware to use throughout the app
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));

// Request loggin middleware useful in debug
app.use(logger({
  "console": true
}));

// Global response headers middleware to allow CORS
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

// Definition of routes the server will handle
app.get('/api', function(req, res) {
  ext.api(req, res);
});
app.post('/direct', function(req, res) {
  ext.direct(req, res);
});
app.get('/dynapi', function(req, res) {
  ext.dynapi(req, res);
});

// Start the server
app.listen(config.port, function() {
  console.log("ExtNode server is listening on " + config.port);
});
