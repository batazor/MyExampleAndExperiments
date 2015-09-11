var RabbitMQ = require('../'),
  config = require('./config');

var rabbitmq = new RabbitMQ(config);

// Error
rabbitmq.on('error', function(err) {
  console.log('Error: ', err);
});

// Logs
rabbitmq.on('logs', function(print_log) {
  console.log(print_log);
});

// Messages
rabbitmq.on('messages', function(data) {
  console.log(data);
});

rabbitmq.pull('test');
