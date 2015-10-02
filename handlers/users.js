var mysql = require('mysql'),
  config = require('../config').mysql;

// Mysql Connect
var connection = mysql.createConnection({
  host     : config.host,
  user     : config.user,
  password : config.password,
  database : config.database
});

connection.connect();

function create(req, res) {
  res.writeHead(200, {"Content-Type": "application/json"});
  return res.end('Create new users');
};

function show(req, res) {
  res.writeHead(200, {"Content-Type": "application/json"});
  return res.end('Get all users');
};

function edit(req, res) {
  res.writeHead(200, {"Content-Type": "application/json"});
  return res.end('Edit users id:', pathname[2]);
};

function destroy(req, res) {
  res.writeHead(200, {"Content-Type": "application/json"});
  return res.end('Delete users id:', pathname[2]);
};

module.exports = {
  show:    show,
  create:  create,
  edit:    edit,
  destroy: destroy
};
