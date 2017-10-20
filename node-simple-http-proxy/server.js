var http = require('http');
var fs = require('fs');
var cluster = require('cluster');
var url = require('url');

var numCPUs = require("os").cpus().length;

if (cluster.isMaster) {
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", function(worker, code, signal) {
    cluster.fork();
  });
} else {
  var app = http.createServer(handler).listen(3000);
}

function handler (request, response) {
  var _url = url.parse(request.url, true);
  var host = _url.hostname;
  var port = _url.port;
  var options = {
    hostname: _url.hostname,
    port: _url.port,
    path: _url.path,
    method: request.method
  };

  var proxy_request = http.request(options);

  proxy_request.addListener('response', function (proxy_response) {
    // Date
    var now = new Date(proxy_response.headers.date);
    var str = "[<" + now.getFullYear() + "-" + now.getMonth() + "-" + now.getDate() + "> " +
    now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + "] ";
    str += "<" + request.connection.remoteAddress + "> ";
    str += " " + request.method;
    str += " " + request.url + "\n\r";

    var log = fs.createWriteStream("/tmp/logs.txt", {'flags': 'a'}, function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log("The file was saved!");
      }
    });
    log.end(str);

    proxy_response.addListener('data', function(chunk) {
      response.write(chunk, 'binary');
    });
    proxy_response.addListener('end', function() {
      response.end();
    });
    response.writeHead(proxy_response.statusCode, proxy_response.headers);
  });

  request.addListener('data', function(chunk) {
    proxy_request.write(chunk, 'binary');
  });
  request.addListener('end', function() {
    proxy_request.end();
  });
}
