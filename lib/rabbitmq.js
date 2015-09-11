var amqp = require('amqplib/callback_api'),
  util = require('util'),
  events = require('events');

function RabbitMQ(options) {
  this._queue = {};         // List queue
  this.rabbitConnect = {};  // Connect
  this.connected = false;   // Status connect
  this.cache = [];          // Cache

  amqp.connect(options.url, function(err, connect) {
    if (err != null) {
      this.emit('error', err);
    }

    this.connected = true;
    this.rabbitConnect = connect;

    this.emit('logs', 'RabbitMQ connect success!');
  }.bind(this));
}

RabbitMQ.prototype.push = function(name) {
  console.log('You push queue ' + name);
};

RabbitMQ.prototype.pull = function(name, data) {
  console.log('You pull to queue ' + name + ' data: ' + data);
};

RabbitMQ.prototype.subscribe = function(name) {
  console.log('You subscribe to queue ' + name);
};

RabbitMQ.prototype.publisher = function(name, data) {
  console.log('You publisher to queue ' + name + ' data: ' + data);
};

// EventEmitter
util.inherits(RabbitMQ, events.EventEmitter);

module.exports = RabbitMQ;
