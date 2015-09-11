var amqp = require('amqplib/callback_api'),
  util = require('util'),
  events = require('events');

function RabbitMQ(options) {
  process.once('SIGINT', function() {
    this.rabbitConnect.close();
  }.bind(this));

  this.rabbitConnect = {};  // Connect
  this.connected = false;   // Status connect
  this.cache = [];          // List cache

  amqp.connect(options.url, function(err, connect) {
    if (err != null) {
      return this.emit('error', err);
    }

    this.connected = true;
    this.rabbitConnect = connect;
    this.emit('logs', 'RabbitMQ connect success!');

    this.executeCache();
  }.bind(this));
}

// EventEmitter
util.inherits(RabbitMQ, events.EventEmitter);

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

  this.rabbitConnect.createChannel(function(err, ch) {
    if (err != null) {
      return this.emit('error', err);
    }

    var ok = ch.assertQueue(queueName, {durable: true}, function() {
      ch.sendToQueue(queueName, new Buffer(JSON.stringify(message)), options);
      this.emit('logs', 'You push queue ' + queueName + '.');
      return ch.close();
    }.bind(this));
  }.bind(this));
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
    if (err != null) {
      return this.emit('error', err);
    }

    var ok = ch.assertQueue(queueName, options, function() {
      return ch.consume(queueName, function(data) {
        this.emit('logs', 'You pull to queue ' + queueName + '.');
        this.emit('messages', JSON.parse(data.content.toString()));
        ch.ack(data);
      }.bind(this), {noAck: false});
    }.bind(this));
  }.bind(this));
};

RabbitMQ.prototype.unpull = function(queueName) {
  console.log('You method unpull to queue ' + queueName);
}

RabbitMQ.prototype.publish = function(queueName, message, options) {
  var self = this;

  if (!this.connected) {
    this.cache.push({
      fn: this.publish,
      arguments: arguments
    });

    this.emit('logs', 'You method publish to exchange ' + queueName + ' add to cache.');
    return false;
  }

  function on_channel_open(err, ch) {
    if (err != null) {
      return self.emit('error', err);
    }

    ch.assertExchange(queueName, 'fanout', {durable: false});
    ch.publish(queueName, '', new Buffer(JSON.stringify(message)));
    self.emit('logs', 'You publish to exchange ' + queueName + '.');
    return ch.close();
  }

  this.rabbitConnect.createChannel(on_channel_open);
};

RabbitMQ.prototype.subscribe = function(queueName, options) {
  var self = this;

  if (!this.connected) {
    this.cache.push({
      fn: this.subscribe,
      arguments: arguments
    });

    this.emit('logs', 'You method subscribe to queue ' + queueName + ' add to cache.');
    return false;
  }

  function on_channel_open(err, ch) {
    if (err != null) {
      return self.emit('error', err);
    }

    ch.assertQueue('', {exclusive: true}, function(err, ok) {
      var q = ok.queue;
      ch.bindQueue(q, queueName, '');
      ch.consume(q, function(data) {
        self.emit('messages', JSON.parse(data.content.toString()));
      }, {noAck: true}, function(err, ok) {
        if (err != null) {
          return self.emit('error', err);
        }

        self.emit('logs', 'You subscribe to exchange ' + queueName + '.');
      });
    });
  };

  this.rabbitConnect.createChannel(on_channel_open);
};


RabbitMQ.prototype.unsubscribe = function(queueName, options) {
  console.log('You method unsubscribe to queue ' + queueName);
};

module.exports = RabbitMQ;
