var express = require('express'),
    http = require('http'),
    redis = require('redis');

var port = process.env.PORT || 8080;

var app = express();
console.log(process.env.REDIS_PORT_6379_TCP_ADDR + ":" + process.env.REDIS_PORT_6379_TCP_PORT);

var client = redis.createClient('6379', 'redis');

app.get('/', function(req, res, next) {
  client.incr('counter', function(err, counter) {
    if (err) return next(err);
    res.send("This page has been viewed " + counter + ' times!');
  });
});

http.createServer(app).listen(port, function() {
  console.log('Listening on port ' + port);
});
