var cookieParser = require("cookie-parser");

var ChatRoom = require('./actions/chatroom.js');
var Message = require('./models/message.js');
var User = require('./models/user.js');

var user = {};

module.exports = function(io, store) {
  io.on('connection', function (socket) {
    // chatRoom ================================================================
    // create new chatRoom
    socket.on('createchatroom', function(data) {
      var res = ChatRoom.create(data);
      data._id = res._id;
      socket.emit('newChatRoom', data);
    });

    // Message =================================================================
    // new write Message
    socket.on('writeMessage', function(data) {
      var message = new Message({
        user: user._id,
        chatRoom: data.chatRoom,
        message: data.message
      });
      message.save(function(err) {
        if (err) {
          return console.log(err);
        } else {
          return console.log("created Message");
        }
      });
      User.find({_id: user._id} ,function (err, userInfo) {
        if (err) {
          console.log(err);
        } else {
          console.log("Read user info");

          var res = {};
          res.message = message;
          res.user = userInfo[0];

          socket.emit('newViewMessage', res);
        }
      });
    });

    // view message chat room
    socket.on('viewMessageChatRoom', function(data){
      Message.find({chatRoom: data} ,function (err, message) {
        if (err) {
          console.log(err);
        } else {
          console.log("Read view message chat room");

          socket.emit('viewMessageChatRoom', message);
        }
      });
    });
  });

  io.use(function ioSession(socket, next) {
    // create the fake req that cookieParser will expect
    var req = {
      "headers": {
        "cookie": socket.request.headers.cookie,
      },
    };

    // run the parser and store the sessionID
    cookieParser('nodejsvsrubyonrails')(req, null, function() {});
    var name = 'nodejsvsrubyonrails';
    socket.sessionID = req.signedCookies[name] || req.cookies[name];
    store.get(socket.sessionID, function(err, session) {
      if (err || !session) {
      } else {
        user._id = session.passport.user;
      }
    });
    next();
  });
};
