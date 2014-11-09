// set up
var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var app = express();

// configuration
var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost/todo';
mongoose.connect(mongoUri);

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

// define model todo
var Todo = mongoose.model('Todo', {
  text: String
});

// routes

  // API
  // get all todos
  app.get('/api/todos', function(req, res){
    Todo.find(function(err, todos){
      if (err) return res.send(err);
      res.json(todos);
    });
  });

  // create todo
  app.post('/api/todos', function(req, res){
    Todo.create({
      text: req.body.text,
      done: false
    }, function(err, todo){
      if (err) return res.send(err);
      Todo.find(function(err, todos){
        if (err) return res.send(err);
        res.json(todos);
      });
    });
  });

  // delete a todo
  app.delete('/api/todos/:todo_id', function(req, res){
    Todo.remove({
      _id: req.params.todo_id
    }, function (err, todo){
      if (err) return res.send(err);
      Todo.find(function (err, todos){
        if (err) return res.send(err);

        res.json(todos);
      });
    });
  });

app.get('/', function(req, res){
  res.render('main.ejs');
});

app.get('*', function(req, res){
  res.redirect('/');
});

// application
var port = process.env.PORT || 8080;
app.listen(port);
console.log("App listening on port 8080");
