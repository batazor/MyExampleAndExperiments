var User = require('../models/user.js');

exports.info = function(userId) {
  User.find({_id: userId} ,function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log("Read user info");
    }
    return data;
  });
};
