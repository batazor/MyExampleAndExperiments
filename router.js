var http = require('http'),
  url = require('url'),
  jade = require('jade'),
  users = require('./handlers/users');

function route(req, res) {
  // Get method and pathname
  var pathname = url.parse(req.url).pathname.split('/');
  var method = req.method;

  if (method === "GET" && pathname[1] === "") {
    var html = jade.renderFile(__dirname + '/public/users/users.jade', {});
    return res.end(html);
  }

  if (method === "GET" && pathname[1] === "users") {
    return users.show(req, res);
  }

  if (method === "POST" && pathname[1] === "users") {
    return users.create(req, res);
  }

  if (method === "PUT" && pathname[1] === "users" && pathname[2]*1 != NaN) {
    return users.edit(req, res);
  }

  if (method === "DELETE" && pathname[1] === "users" && pathname[2]*1 != NaN) {
    return users.destroy(req, res);
  }

  res.writeHead(200, {"Content-Type": "application/json"});
  return res.end('Not Found!');

}

module.exports = route;
