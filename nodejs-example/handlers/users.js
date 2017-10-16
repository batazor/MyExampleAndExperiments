var fs = require('fs'),
  util = require('util'),
  mysql = require('mysql'),
  formidable = require('formidable'),
  config = require('../config').mysql,
  validation = require('../modules/validation');

function queryMySQL(query, cb) {
  var connection = mysql.createConnection({
    host:     config.host,
    user:     config.user,
    password: config.password,
    database: config.database
  });

  connection.connect();

  connection.query(query, function(err, rows, fields) {
    if (err) {
      return cb(err);
    };

    return cb(null, rows);
  });

  connection.end();
}

function create(req, res) {
  res.writeHead(200, 'OK', {'Content-Type': 'application/json'});

  var form = new formidable.IncomingForm();
  form.encoding = 'utf-8';
  form.type = true;
  form.uploadDir = __dirname + '/../public/upload/';
  form.on('error', function(err) {
    console.error(err);
  });

  form.parse(req, function(err, fields, files) {

    var codeErr = [];

    if (!validation.string(fields.name, 127))       { codeErr.push('Max length `name` = 128'); }
    if (!validation.image(fields.avatar, 256, 256)) { codeErr.push('Max params `avatar` 256x256'); }
    if (!validation.string(fields.address, 255))    { codeErr.push('Max length `address` = 256'); }
    if (!validation.arrayString(fields.phone, 19))  { codeErr.push('Max length `phone` = 20'); }
    if (!validation.string(fields.email, 127))      { codeErr.push('Max length `email` = 128'); }

    if (codeErr.length) {
      return res.end(JSON.stringify({ "status": false, code: codeErr }));
    }

    // TODO: Oh my god, that's the shit!
    var file = files.avatar ? files.avatar.path.split('/upload/')[1] : '';
    var avatar = fields.avatar ? fields.avatar : file;
    var query = 'INSERT INTO `' + config.database + '`.`users` ' +
      '(`id`, `name`, `avatar`, `address`, `phone`, `email`)' +
      'VALUES (NULL, "' +
      fields.name + '", "' +
      avatar + '", "' +
      fields.address + '", "' +
      fields.phone + '", "' +
      fields.email + '");';

    queryMySQL(query, function(err, data) {
      if (err) {
        console.error(err);
        return req.end(JSON.stringify({ "status": false }));
      }

      fields.avatar = avatar[1];
      fields.id = data.insertId;
      res.end(JSON.stringify({ "status": true, data: fields }));
    });
  });
};

function allShow(req, res) {
  res.writeHead(200, 'OK', {'Content-Type': 'application/json'});

  var query = 'SELECT * FROM `users`';
  queryMySQL(query, function(err, data) {
    if (err) {
      console.error(err);
      return req.end(JSON.stringify({ "status": false }));
    }

    data = JSON.stringify({ "status": true, "data": data });
    res.end(data);
  });
};

function show(req, res, id) {
  res.writeHead(200, 'OK', {'Content-Type': 'application/json'});

  var query = 'SELECT * FROM `users` WHERE `id`=' + id;
  queryMySQL(query, function(err, data) {
    if (err) {
      console.error(err);
      return req.end(JSON.stringify({ "status": false }));
    }

    data = JSON.stringify({ "status": true, "data": data });
    res.end(data);
  });
};

function edit(req, res) {
  res.writeHead(200, 'OK', {'Content-Type': 'application/json'});

  var form = new formidable.IncomingForm();
  form.encoding = 'utf-8';
  form.type = true;
  form.uploadDir = __dirname + '/../public/upload/';
  form.on('error', function(err) {
    console.error(err);
  });

  form.parse(req, function(err, fields, files) {
    var codeErr = [];

    if (!fields.uid)                                { codeErr.push('Not Found - User id: ' + fields.uid); }
    if (!validation.string(fields.name, 127))       { codeErr.push('Max length `name` = 128'); }
    if (!validation.image(fields.avatar, 256, 256)) { codeErr.push('Max params `avatar` 256x256'); }
    if (!validation.string(fields.address, 255))    { codeErr.push('Max length `address` = 256'); }
    if (!validation.arrayString(fields.phone, 19))  { codeErr.push('Max length `phone` = 20'); }
    if (!validation.string(fields.email, 127))      { codeErr.push('Max length `email` = 128'); }

    if (codeErr.length) {
      return res.end(JSON.stringify({ "status": false, code: codeErr }));
    }

    // var avatar = files.avatar.path.split('/upload/');
    // TODO: Oh my god, that's the shit!
    var file = files.avatar ? files.avatar.path.split('/upload/')[1] : '';
    var avatar = fields.avatar ? fields.avatar : file;
    var query = 'UPDATE `' + config.database + '`.`users` SET ' +
      '`name`="'    + fields.name + '",' +
      '`avatar`="'  + avatar + '",' +
      '`address`="' + fields.address + '",' +
      '`phone`="'   + fields.phone + '",' +
      '`email`="'   + fields.email + '" ' +
      ' WHERE `users`.`id`=' + fields.uid + ';'

    queryMySQL(query, function(err, data) {
      if (err) {
        console.error(err);
        return req.end(JSON.stringify({ "status": false }));
      }

      fields.avatar = avatar[1];
      fields.id = fields.uid;
      res.end(JSON.stringify({ "status": true, data: fields }));
    });
  });
};

function destroy(req, res) {
  res.writeHead(200, 'OK', {'Content-Type': 'application/json'});

  var body = '';
  req.on('data', function (chank) {
    body += chank;
  });

  req.on('end', function () {
    body = JSON.parse(body);

    var query = 'DELETE FROM users WHERE id = ' + body.id;

    queryMySQL(query, function(err, data) {
      if (err) {
        console.error(err);
        return req.end(JSON.stringify({ "status": false }));
      }

      res.end(JSON.stringify({ "status": true, "id": body.id }));
    });
  });
};

module.exports = {
  allShow: allShow,
  show:    show,
  create:  create,
  edit:    edit,
  destroy: destroy
};
