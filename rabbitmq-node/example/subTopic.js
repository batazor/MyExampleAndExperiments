var RabbitMQ = require('../'),
  config = require('./config');

var rabbitmq = new RabbitMQ(config);

// Error
rabbitmq.on('error', function(err) {
  console.error('Error: ', err);
});

// Logs
rabbitmq.on('logs', function(print_log) {
  console.log(print_log);
});

// Message
rabbitmq.on('message', function(data) {
  console.info(data);
  j++;
});

for (var i = 0; i < 1000; i++) {
  var name = 'topic_' + i;
  rabbitmq.subTopic(name, 'test');
}