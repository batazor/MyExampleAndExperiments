var ChatRoom = require('../models/chatroom.js');

exports.create = function(data) {
  var chatRoom = new ChatRoom({
    name: data.name
  });
  chatRoom.save(function(err) {
    if (err) {
      return console.log(err);
    } else {
      return console.log("created chatRoom");
    }
  });
};

exports.all = function() {
  return chatRoom.find(function (err, data) {
    if (err) {
      return console.log(err);
    } else {
      return data;
    }
  });
};
