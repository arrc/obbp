'use strict';

var express      = require('express'),
  app            = express(),
  config         = require('./server/config'),
  mongoose       = require('mongoose'),
  consolidate    = require('consolidate'),
  swig           = require('swig'),
  logger         = require('morgan'),
  colors         = require('colors'),
  bodyParser     = require('body-parser'),
  methodOverride = require('method-override'),
  _              = require('lodash'),
  passport       = require('passport'),
  jwt            = require('jsonwebtoken'),
  expressJwt     = require('express-jwt');

/* ==========================================================
Set the Port
============================================================ */
app.set('port', process.env.PORT || 4000);

/* ==========================================================
	MONGOOSE
============================================================ */
mongoose.connect('mongodb://localhost/obbp', function(err){
  if(err) {
    console.error('\x1b[31m', 'Could not connect to MongoDB!');
    console.log(err);
  }
});

/* ==========================================================
	SETUP
============================================================ */
require('./server/config/passport.js')();
app.use(passport.initialize());
app.set('showStackError', true);
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.enable('jsonp callback');
app.use(bodyParser.urlencoded({'extended':'true'}));
app.engine('server.html', consolidate.swig);
app.set('view engine', 'server.html');
app.set('views', __dirname + '/server/views');
app.use(express.static(__dirname + '/public'));
app.use(logger('dev'));
// Showing stack errors
app.set('showStackError', true);
// Enable jsonp
app.enable('jsonp callback');

app.use(function(req, res, next) {
		res.locals.url = req.protocol + '://' + req.headers.host + req.url;
		next();
});

/* ==========================================================
  CORS
============================================================ */
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

/* ==========================================================
  API ROUTES
============================================================ */
app.use('/api', expressJwt({ secret: config.jwtSecretKey }));

/* ==========================================================
  ROUTES
============================================================ */
require('./server/routes.js')(app);

/* ==========================================================
ERRORS
============================================================ */
// '404' ----------------------------
app.use(function(req, res, next){

  if(req.accepts('html')) {
    return res.status(404).render('404', {
			url: req.originalUrl,
			error: 'Page Not Found'
		});
  }

  if(req.accepts('json')) {
    return res.status(404).json({ error: true, message: 'Endpoint / url Not found!'});
  }
});

// '500' ----------------------------
app.use(function(err, req, res, next){

// missing authorization header
	if (!req.headers.authorization) {
    console.info("req token=" +JSON.stringify(err));
    console.error('error at %s\n', req.url, err.stack);
		res.setHeader('WWW-Authenticate', 'Bearer token_type="JWT"');
    return res.status(400).json({error: true, message: 'Missing authorization token.'});
	}

  if(req.accepts('html')) {
    console.error('error at %s\n', req.url, err.stack);
    return res.status(500).render('500', {
			url: req.originalUrl,
			error: err.stack
		});
  }

  if(req.accepts('json')) {
    console.info("ERROR \n".red , JSON.stringify(err));
    console.error('error at %s\n', req.url, err.stack);
    return res.status(500).json({ error: true, message: err.message});
  }
});

process.on('uncaughtException', (err) => {
  console.log(`Un-Caught exception: ${err}`);
});

/* ==========================================================
	APP
============================================================ */
var server = app.listen(app.get('port'), function () {
  console.log('App listening at http://localhost:'.red + server.address().port);
});

exports = module.exports = app;
