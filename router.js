var http = require('http'),
  url = require('url'),
  fs = require('fs'),
  jade = require('jade'),
  Users = require('./handlers/users');

function route(req, res) {
  // Get method and pathname
  var pathname = url.parse(req.url).pathname.split('/');
  var method = req.method;

  if (method === "GET" && pathname[1] === "") {
    var html = jade.renderFile(__dirname + '/public/index.jade', {});
    return res.end(html);
  }

  if (method === "GET" && pathname[1] === "users") {
    return Users.allShow(req, res);
  }

  if (method === "GET" && pathname[1] === "user") {
    return Users.show(req, res, pathname[2]);
  }

  if (method === "POST" && pathname[1] === "user") {
    return Users.create(req, res);
  }

  if (method === "PUT" && pathname[1] === "user" && pathname[2]*1 != NaN) {
    return Users.edit(req, res);
  }

  if (method === "DELETE" && pathname[1] === "user" && pathname[2]*1 != NaN) {
    return Users.destroy(req, res);
  }

  if (method === "GET" && pathname[1] === "public") {
    var pathFile = __dirname + url.parse(req.url).pathname;

    return fs.readFile(pathFile, function (err, data) {
      if (err) {
        console.error(err);
        res.writeHead(404, {"Content-Type": "application/json"});
        return res.end(undefined);
      }

      res.end(data);
    });
  }

  res.writeHead(200, {"Content-Type": "application/json"});
  return res.end(undefined);

}

module.exports = route;
