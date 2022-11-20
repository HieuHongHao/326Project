const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  authorID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "A project must have a author"],
  },
  title: {
    type: String,
    required: [true, "A Project must have a title"],
  },
  content: {
    type: String,
    required: [true, "A project must have content"],
    maxlength: 1000,
  },
  tags: [
    {
      type: String,
    },
  ],
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  timestamps:true
});

// projectSchema.index({ createdAt: -1 });
// projectSchema.virtual("commentNumbers").get(function() {
//   return this.comments ? this.comments.length : 0;
// })

projectSchema.virtual("comments", {
  ref: "Comment",
  foreignField: "project",
  localField: "_id",
});

projectSchema.virtual("likes", {
  ref: "Like",
  foreignField: "project",
  localField: "_id",
});

projectSchema.pre(/^find/, function(next) {
  this.populate("likes");
  this.populate("comments");
  next();
})
const projectModel = mongoose.model("Project", projectSchema);
module.exports = projectModel;
