const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  google: {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
