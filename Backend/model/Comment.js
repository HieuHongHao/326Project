const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  project: {
    type: Schema.Types.ObjectId,
    ref: "Project"
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
})
const commentModel = mongoose.model("Comment", commentSchema);
module.exports = commentModel;
