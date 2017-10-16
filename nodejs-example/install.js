var mysql = require('mysql'),
  config = require('./config.json');

// Mysql Connect
var connection = mysql.createConnection({
  host     : config.mysql.host,
  user     : config.mysql.user,
  password : config.mysql.password
});

function queryMySQL(query, good) {
  connection.query(query, function(err, res) {
    if (err) {
      return console.error(err);
    };

    return console.log(res);
  });
}

// INIT
connection.connect();
queryMySQL('CREATE DATABASE ' + config.mysql.database + ';', 'Create database');
queryMySQL('USE ' + config.mysql.database + ';', 'Connect to database');
queryMySQL('CREATE TABLE users' +
  '(id INT(11) AUTO_INCREMENT,' +
  'name VARCHAR(127),' +
  'avatar VARCHAR(127),' +
  'address VARCHAR(255),' +
  'phone TEXT,' +
  'email VARCHAR(127),' +
  'PRIMARY KEY(id));', 'Create Table User');
connection.end();
