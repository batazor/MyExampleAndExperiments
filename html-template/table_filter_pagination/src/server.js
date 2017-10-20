var express = require('express');
var app = express();

// Setting Express =============================================================
// Static File
app.use(express.static(__dirname + '/build'));

// Template
app.set('views', __dirname + '/template');
app.set('view engine', 'jade');

// Routing
app.get('/', function (req, res) {
  res.render('index');
});

// Server start ================================================================
var server = app.listen(8080, function () {
  console.log('Server run at http://127.0.0.1:8080');
});
