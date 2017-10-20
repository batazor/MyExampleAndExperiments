var ChatRoom = require('../models/chatroom.js');

exports.create = function(data) {
  var chatRoom = new ChatRoom({
    name: data.name
  });
  chatRoom.save(function(err) {
    if (err) {
      return console.log(err);
    } else {
      console.log("created chatRoom");
    }
  });
  return chatRoom;
};
