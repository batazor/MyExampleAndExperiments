var mysql = require('mysql'),
  config = require('../config').mysql;

function queryMySQL(query) {
  var connection = mysql.createConnection({
    host     : config.host,
    user     : config.user,
    password : config.password,
    database : config.database
  });

  connection.connect();

  connection.query(query, function(err, rows, fields) {
    if (err) {
      return console.error(err);
    };

    return rows;
  });

  connection.end();
}

function create(req, res) {
  res.writeHead(200, {"Content-Type": "application/json"});

  req.on('data', function(chunk) {
    console.log("Received body data:");
    console.log(chunk.toString());
  });

  req.on('end', function() {
    // empty 200 OK response for now
    res.writeHead(200, "OK", {'Content-Type': 'text/html'});
    res.end();
  });
};

function allShow(req, res) {
  res.writeHead(200, {"Content-Type": "application/json"});

  var data = queryMySQL('SELECT * from users');

  return data;
};

function show(req, res) {
  res.writeHead(200, {"Content-Type": "application/json"});
  return res.end('Get user');
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
  allShow: allShow,
  show:    show,
  create:  create,
  edit:    edit,
  destroy: destroy
};
