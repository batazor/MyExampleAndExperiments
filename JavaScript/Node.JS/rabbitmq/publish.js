var amqp = require('amqp');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length

if (cluster.isMaster) {
  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  var connection = amqp.createConnection({ url: 'amqp://rabbitmqfdsffsd:rabbitmqlfkdhgf@192.168.2.199:5672' });
  connection.on('ready', conn => {

    var exchange = connection.exchange('demo1', {type: 'topic'});

    setInterval(() => {
      for (i = 0; i < 1000; i++) {
        exchange.publish("", {"_oid": "nodejs"}, { autoDelete: false })
      }

      console.warn('Send 1000')
    }, 10);
  })
}
