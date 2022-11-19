const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "User must have a username"]
  },
  email: {
    type: String,
    required: [true, "User must have an email"]
  },
  password: {
    type: String,
    require: [true, "User must have a password"],
    minlength: 6,
    select: false
  },
  avatar: {
    type: String
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
  favouriteTechStack: [{ type: String }],
})

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
