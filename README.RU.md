# rabbitmq-node

Node.js обертка над RabbitMQ (AMQP) на базе amqp.node (amqplib)

### Пример

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

#### События (EventEmitter)

+ **message**   -> получаем сообщение (JSON)
+ **error**     -> получаем ошибку (String)
+ **logs**      -> Получаем логи (String)

### Доступные методы

#### #push(queueName, options)

Добавить сообщение в очередь для воркера.

+ __queueName__ - имя очереди
+ __message__   - сообщение (JSON)
+ __options__   - AMQP опции для очереди

#### #pull(queueName, message, options)

Слушаем сообщения в очереди, отправленные через pull. Получит только один из воркеров.

+ __queueName__ - имя очереди
+ __options__   - AMQP опции для очереди

#### #unpull(queueName)

Unsubscribe to queue.

#### #publish(queueName, message, options)

Публикация в очередь.

+ __queueName__ - имя очереди
+ __message__   - сообщение (JSON)
+ __options__   - AMQP опции для очереди

#### #subscribe(queueName, options)

Подписываемся на очередь. Получат все кто подписался.

+ __queueName__ - имя очереди
+ __options__   - AMQP опции для очереди

#### #unsubscribe(queueName)

Unsubscribe to queue.

### AMQP опции для очереди

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
