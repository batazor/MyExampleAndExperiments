var http = require('http'),
  config = require('./config'),
  router = require('./router');

http.createServer(onHandler).listen(config.port, function() {
  console.log('Server run to port ::' + config.port);
});

function onHandler(req, res) {
  router(req, res);
}
