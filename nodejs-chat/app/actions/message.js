var Message = require('../models/message.js');

exports.create = function(data) {
  var message = new Message({
    user: data.user,
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
  return message;
};
