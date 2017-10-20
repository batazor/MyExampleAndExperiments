var amqp = require('amqplib/callback_api'),
  util = require('util'),
  events = require('events');

function RabbitMQ(options) {
  process.once('SIGINT', function() {
    this.rabbitConnect.close();
  }.bind(this));

  // Options
  this.options = {
    url: options && options.url ? options.url : 'amqp://localhost',
    reconnectTime: options && options.reconnectTime ? options.reconnectTime : 15000
  };

  // Cache... :-(
  this.rabbitConnect  = {};      // Connect
  this.connected      = false;   // Status connect
  this.cache          = [];      // List cache
  this.queueExchange  = {}       // List exchange
  this.queueSubscribe = {};      // List queue for Subscribe
  this.queuePublish   = {};      // List queue for Publish
  this.queuePush      = {};      // List queue for Push

  // Connect to RabbitMQ server
  this.connect();
}

// EventEmitter
util.inherits(RabbitMQ, events.EventEmitter);

RabbitMQ.prototype.connect = function() {
  amqp.connect(this.options.url, function(err, connect) {
    if (err !== null) {
      return this.emit('error', err);
      this.reconnect();
    }

    this.connected = true;
    this.rabbitConnect = connect;
    this.emit('logs', 'RabbitMQ connect success!');

    this.rabbitConnect.on('close', function() {
      this.connected = false;
      this.reconnect();
    }.bind(this));

    this.rabbitConnect.on('error', function(err) {
      this.emit('error', err);
    }.bind(this));

    this.executeCache();
  }.bind(this));
}

RabbitMQ.prototype.reconnect = function() {
  this.emit('logs', 'RabbitMQ reconnect run!');
  setTimeout(function() {
    this.connect();
  }.bind(this), this.options.reconnectTime);
};

RabbitMQ.prototype.executeCache = function() {
  this.cache.forEach(function(item, key) {
    item.fn.apply(this, Array.prototype.slice.call(item.arguments));
    delete this.cache[key];
  }.bind(this));
};

RabbitMQ.prototype.push = function(queueName, message, options) {
  if (!this.connected) {
    this.cache.push({
      fn: this.push,
      arguments: arguments
    });

    this.emit('logs', 'You method push to channel ' + queueName + ' add to cache.');
    return false;
  }

  if (this.queuePush[queueName]) {
    this.queuePush[queueName].sendToQueue(queueName, new Buffer(JSON.stringify(message)), options);
    this.emit('logs', 'You push queue ' + queueName + '.');
  } else {
    this.rabbitConnect.createChannel(function(err, ch) {
      if (err !== null) {
        return this.emit('error', 14);
      }

      this.queuePush[queueName] = ch;

      var ok = ch.assertQueue(queueName, {durable: true}, function() {
        ch.sendToQueue(queueName, new Buffer(JSON.stringify(message)), options);
        this.emit('logs', 'You push queue ' + queueName + '.');
      }.bind(this));
    }.bind(this));
  }
};

RabbitMQ.prototype.pull = function(queueName, options) {
  if (!this.connected) {
    this.cache.push({
      fn: this.pull,
      arguments: arguments
    });

    this.emit('logs', 'You method pull to queue ' + queueName + ' add to cache.');
    return false;
  }

  this.rabbitConnect.createChannel(function(err, ch) {
    if (err !== null) {
      return this.emit('error', 15);
    }

    var ok = ch.assertQueue(queueName, options, function() {
      this.queueSubscribe[queueName] = ok.consumerTag;

      return ch.consume(queueName, function(data) {
        this.emit('logs', 'You pull to queue ' + queueName + '.');

        this.emit('message', {data: JSON.parse(data.content.toString()), channel: queueName });
        ch.ack(data);
      }.bind(this), {noAck: false});
    }.bind(this));
  }.bind(this));
};

RabbitMQ.prototype.pubTopic = function(queueName, message, key, options) {
  if (!this.connected) {
    this.cache.push({
      fn: this.pubTopic,
      arguments: arguments
    });

    this.emit('logs', 'You method pubTopic to exchange ' + queueName + ' add to cache.');
    return false;
  }

  // Default arguments
  key = key ? key : '';
  options = options ? options : { durable: false };

  this.rabbitConnect.createChannel(function(err, ch) {
    if (err !== null) {
      return this.emit('error', 2);
    }

    ch.on('error', function(err) {
      return this.emit('error', 3);
    }.bind(this));


    ch.publish(queueName, key, new Buffer(JSON.stringify(message)));
    ch.close();
  }.bind(this));

  this.emit('logs', 'You pubTopic to exchange ' + queueName + '.');
};

RabbitMQ.prototype.subTopic = function(queueName, key, options) {
  if (!this.connected) {
    this.cache.push({
      fn: this.subTopic,
      arguments: arguments
    });

    this.emit('logs', 'You method subTopic to queue ' + queueName + ' add to cache.');
    return false;
  }

  // Default arguments
  key = key ? key : '';
  options = options ? options : { durable: false };

  this.rabbitConnect.createChannel(function(err, ch) {
    if (err !== null) {
      return this.emit('error', err);
    }

    ch.on('error', function(err) {
      return this.emit('error', err)
    }.bind(this));

    ch.assertExchange(queueName, 'topic', options);

    ch.assertQueue('', { exclusive: true }, function(err, ok) {
      if (err !== null) {
        return this.emit('error', err);
      }

      var q = ok.queue;

      ch.consume(q, function(data) {
        this.emit('message', {data: JSON.parse(data.content.toString()), channel: queueName });
      }.bind(this), { noAck: true }, function(err) {
        if (err !== null) {
          return this.emit('error', 7);
        }

        ch.bindQueue(q, queueName, key, {});
        this.emit('logs', 'You subTopic to exchange ' + queueName + '.');
      }.bind(this));
    }.bind(this));
  }.bind(this));
};

RabbitMQ.prototype.publish = function(queueName, message, options) {
  if (!this.connected) {
    this.cache.push({
      fn: this.publish,
      arguments: arguments
    });

    this.emit('logs', 'You method publish to exchange ' + queueName + ' add to cache.');
    return false;
  }

  // Default arguments
  options = options ? options : { durable: false };

  if (this.queuePublish[queueName]) {
    this.queuePublish[queueName].assertExchange(queueName, 'fanout', options);
    this.queuePublish[queueName].publish(queueName, '', new Buffer(JSON.stringify(message)));
  } else {
    if (this.queueExchange[queueName]) {
      return this.emit('logs', 'Echange ' + queueName + ' already exists.')
    }

    this.rabbitConnect.createChannel(function(err, ch) {
      if (err !== null) {
        return this.emit('error', 9);
      }

      ch.on('error', function(err) {
        return this.emit('error', 10)
      }.bind(this));

      this.queuePublish[queueName] = ch;

      this.queueExchange[queueName] = ch.assertExchange(queueName, 'fanout', options);

      ch.publish(queueName, '', new Buffer(JSON.stringify(message)));
    }.bind(this));

    this.emit('logs', 'You publish to exchange ' + queueName + '.');
  }
};

RabbitMQ.prototype.subscribe = function(queueName, options) {
  if (!this.connected) {
    this.cache.push({
      fn: this.subscribe,
      arguments: arguments
    });

    this.emit('logs', 'You method subscribe to queue ' + queueName + ' add to cache.');
    return false;
  }

  this.rabbitConnect.createChannel(function(err, ch) {
    if (err !== null) {
      return this.emit('error', 11);
    }

    ch.on('error', function(err) {
      this.emit('error', 12)
    }.bind(this));

    if (!this.queueExchange[queueName]) {
      this.queueExchange[queueName] = ch.assertExchange(queueName, 'fanout', {durable: false});
      this.emit('logs', 'NOT FOUND (404): exchange ' + queueName + '. I\'ll try to create it');
    }

    ch.assertQueue('', {exclusive: true}, function(err, ok) {
      var q = ok.queue;
      ch.bindQueue(q, queueName, '');
      ch.consume(q, function(data) {
        this.emit('message', {data: JSON.parse(data.content.toString()), channel: queueName });
      }.bind(this), { noAck: true }, function(err, ok) {
        if (err !== null) {
          return this.emit('error', 13);
        }

        this.queueSubscribe[queueName] = ch;

        this.emit('logs', 'You subscribe to exchange ' + queueName + '.');
      }.bind(this));
    }.bind(this));
  }.bind(this));
};

RabbitMQ.prototype.close = function(queueName) {
  if (!this.connected) {
    this.cache.push({
      fn: this.subscribe,
      arguments: arguments
    });

    this.emit('logs', 'You method close connect to queue ' + queueName + ' add to cache.');
    return false;
  }

  this.emit('logs', 'You method close connect to queue ' + queueName);

  // Disconnect - 'subscribe'
  if (this.queueSubscribe[queueName]) {
    this.queueSubscribe[queueName].close();
    delete this.queueSubscribe[queueName];
  }

  // Disconnect - 'push'
  if (this.queuePush[queueName]) {
    this.queuePush[queueName].close();
    delete this.queuePush[queueName];
  }

  // Disconnect - 'publish'
  if (this.queuePublish[queueName]) {
    this.queuePublish[queueName].close();
    delete this.queuePublish[queueName];
  }

  this.emit('logs', 'You success disconnect to queue ' + queueName);
}

module.exports = RabbitMQ;
