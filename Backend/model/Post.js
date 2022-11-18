const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;




const projectSchema = new Schema(
  {
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A project must have an author"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },

    likes: {
      type: Number,
      default: 0,
    },
    content: {
      type: String,
      required: [true, "A project must have a content"],
      maxlength: 1000,
    },
    title: String,
    active: Boolean
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
projectSchema.index({createdAt:-1});

projectSchema.virtual("comments",{
    ref: "Comment",
    foreignField: "project",
    localField: "_id"
})
projectSchema.virtual("commentNumbers").get(function(){
  return this.comments ? this.comments.length : 0 ;
})

const projectModel = mongoose.model("Project", projectSchema);

module.exports = projectModel;






