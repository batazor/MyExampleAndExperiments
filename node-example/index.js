const express = require('express');
const logger = require('fluent-logger');

const PORT = process.env.PORT || 3000;
const app = express();

logger.configure('docker.node.example', {
  host: 'fluentd',
  port: 24224,
  timeout: 3.0,
  reconnectInterval: 600000 // 10 minutes
});

app.get('/', function(request, response) {

  const data = {
    from: 'userA',
    to: 'userB',
    password: 'secretSecret'
  };

  logger.emit('user', data);
  response.send('Hello World!');
});

app.listen(PORT, function() {
  logger.emit('server', {message: 'Server start'});
  console.log("Listening on " + PORT);
});
