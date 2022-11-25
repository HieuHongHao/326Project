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
    default: "https://loremflickr.com/cache/resized/65535_52235423932_e5012af91a_b_480_480_nofilter.jpg",
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

// async function sha256(message) {
//   // encode as UTF-8
//   const msgBuffer = new TextEncoder().encode(message);

//   // hash the message
//   const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

//   // convert ArrayBuffer to Array
//   const hashArray = Array.from(new Uint8Array(hashBuffer));

//   // convert bytes to hex string
//   const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
//   return hashHex;
// }


const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
