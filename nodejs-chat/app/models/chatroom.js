var mongoose = require('mongoose');

var ChatRoomSchema = mongoose.Schema({

  name : { type: String, required: true }

});

module.exports = mongoose.model('ChatRoom', ChatRoomSchema);
