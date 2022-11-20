const mongoose = require("mongoose");
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

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
