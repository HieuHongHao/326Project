const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
const Project = require("./Project.js");
const Comment = require("./Comment.js");

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
  },
  avatar: {
    type: String,
    default: "https://people.cs.umass.edu/~marius/marius.jpg",
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
  favouriteTechStack: [{ type: String }],
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})

userSchema.virtual("projects", {
  ref: "Project",
  foreignField: "user",
  localField: "_id"
})
userSchema.virtual("comments", {
  ref: "Comment",
  foreignField: "user",
  localField: "_id"
})

userSchema.pre(/^find/, function(next) {
  this.populate("projects");
  next();
})

userSchema.pre(/^find/, function(next) {
  this.populate("comments");
  next();
})

userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
})

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
