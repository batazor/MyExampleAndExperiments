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
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

for (var i = 0; i < 40000; i++) {
  var name = 'topic_' + getRandomInt(1, 999);
  rabbitmq.pubTopic(name, { i: i }, 'test');
};
