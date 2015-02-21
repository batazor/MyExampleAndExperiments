var ChatRoom = require('./actions/chatroom.js');

module.exports = function(io) {
  io.on('connection', function (socket) {
    socket.on('createchatroom', function(data) {
      var res = ChatRoom.create(data);
      socket.emit('newChatRoom', data);
    });
  });
};
