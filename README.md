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

#### #push(queueName, options)

Push to queue.

+ __queueName__ - name queue
+ __message__   - message
+ __options__   - options for queue

#### #pull(queueName, message, options)

Pull to queue.

+ __queueName__ - name queue
+ __options__   - options for queue

#### #unpull(queueName)

Unsubscribe to queue.

#### #publish(queueName, message, options)

Publish to queue.

+ __queueName__ - name queue
+ __message__   - message
+ __options__   - options for queue

#### #subscribe(queueName, options)

Subscribe to queue.

+ __queueName__ - name queue
+ __options__   - options for queue

#### #unsubscribe(queueName)

Unsubscribe to queue.

### TODO

+ Add method unsubscibe
+ Add method unpull
+ Add custom exchange
+ Add test
+ Add JSDoc
