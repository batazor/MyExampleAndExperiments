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
+ __options__   - AMQP options for queue

#### #pull(queueName, message, options)

Pull to queue.

+ __queueName__ - name queue
+ __options__   - AMQP options for queue

#### #unpull(queueName)

Unsubscribe to queue.

#### #publish(queueName, message, options)

Publish to queue.

+ __queueName__ - name queue
+ __message__   - message
+ __options__   - AMQP options for queue

#### #subscribe(queueName, options)

Subscribe to queue.

+ __queueName__ - name queue
+ __options__   - AMQP options for queue

#### #unsubscribe(queueName)

Unsubscribe to queue.

### AMQP options for queue

- type: the type of exchange 'direct', 'fanout', or 'topic' (default).
- passive: boolean, default false. If set, the server will not create the exchange. The client can use this to check whether an exchange exists without modifying the server state.
- durable: boolean, default false. If set when creating a new exchange, the exchange will be marked as durable. Durable exchanges remain active when a server restarts. Non-durable exchanges (transient exchanges) are purged if/when a server restarts.
- autoDelete: boolean, default true. If set, the exchange is deleted when there are no longer queues bound to it.
- noDeclare: boolean, default false. If set, the exchange will not be declared, this will allow the exchange to be deleted if you dont know its previous options.
- confirm: boolean, default false. If set, the exchange will be in confirm mode, and you will get a 'ack'|'error' event emitted on a publish, or the callback on the publish will be called.

### TODO

+ Add method unsubscibe
+ Add method unpull
+ Add custom exchange
+ Add test
+ Add JSDoc
