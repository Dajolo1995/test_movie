const mongoose = require("mongoose");

const UsersShema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  record: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("User", UsersShema);
