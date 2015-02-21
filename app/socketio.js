var cookieParser = require("cookie-parser");

var ChatRoom = require('./actions/chatroom.js');
var Message = require('./actions/message.js');
var User = require('./actions/user.js');

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
      data.user = user._id;
      // var res = Message.create(data);
      var res = User.info(user._id);
      console.log('==============');
      console.log(res);
      console.log('==============');
      // socket.emit('newViewMessage', res);
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
