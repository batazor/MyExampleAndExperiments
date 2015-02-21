var mongoose = require('mongoose');

var MessageSchema = mongoose.Schema({

  author     : { type: String, required: true },
  chatRoom   : String,
  comment    : String,
  created_at : Date,
  updated_at : Date

});

module.exports = mongoose.model('Message', MessageSchema);
