const express = require('express');
const logger = require('fluent-logger');

const PORT = process.env.PORT || 3000;
const app = express();

logger.configure('fluentd.test', {
  host: 'fluentd',
  port: 24224,
  timeout: 3.0,
  reconnectInterval: 600000 // 10 minutes
});

app.get('/', function(request, response) {
  logger.emit('follow', {from: 'userA', to: 'userB'});
  response.send('Hello World!');
});


app.listen(PORT, function() {
  logger.emit('follow', {from: 'userA', to: 'userB'});
  console.log("Listening on " + PORT);
});
