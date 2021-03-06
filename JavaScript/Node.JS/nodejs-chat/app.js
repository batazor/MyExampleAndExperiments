// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash 	 = require('connect-flash');
var path 	   = require('path');
var server   = require('http').createServer(app);
var io       = require('socket.io')(server);

var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var store        = new session.MemoryStore();

var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url);

require('./config/passport')(passport);

// set up our express application
app.use(express.static(__dirname + '/public'));
app.use(logger('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');

// required for passport
app.use(session({
  name: 'nodejsvsrubyonrails',
  secret: 'nodejsvsrubyonrails',
  saveUninitialized: true,
  resave: true,
  store: store
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport);

// socket.io
require('./app/socketio.js')(io, store, passport);

// launch ======================================================================
server.listen(port);
console.log('Server runs and listen on port ' + port);
