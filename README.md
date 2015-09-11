# rabbitmq-node

![Dependency Status](https://david-dm.org/batazor/rabbitmq-node.svg)

> npm install rabbitmq-node

Node.js wrapper for RabbitMQ (AMQP)

### Example

```
var RabbitMQ = require('rabbitmq-node');

var rabbitmq = new RabbitMQ('amqp://localhost');

rabbitmq.on('message', function(channel, message) {
  console.log(message);
});

rabbitmq.on('error', function(err) {
  console.error(err);
});

rabbitmq.on('logs', function(print_log) {
  console.info(print_log);
});

rabbitmq.subscribe('nameChannel');
rabbitmq.publish('nameChannel', {message: 'Hello World'});
```

#### Events

+ **message**   -> return data message
+ **error**     -> return error
+ **logs**      -> return logs

### Methods

#### #subscribe(nameChannel, options)

...

#### #publish(nameChannel, options)

...
