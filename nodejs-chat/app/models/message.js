var mongoose = require('mongoose');

var MessageSchema = mongoose.Schema({

  user       : { type: mongoose.Schema.Types.ObjectId, red: 'User' },
  chatRoom   : { type: mongoose.Schema.Types.ObjectId, red: 'ChatRoom' },
  message    : { type: String },
  created_at : { type: Date, default: Date.now },
  updated_at : { type: Date, default: Date.now }

});

module.exports = mongoose.model('Message', MessageSchema);
