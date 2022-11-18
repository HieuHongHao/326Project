const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A post must have an author"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    likeNumbers: {
      type: Number,
      default: 0,
    },
    
    content: {
      type: String,
      required: [true, "A post must have a content"],
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
postSchema.index({createdAt:-1});

postSchema.virtual("comments",{
    ref: Comment,
    foreignField: "post",
    localField: "_id"
})
postSchema.virtual("commentNumbers").get(function(){
  return this.comments ? this.comments.length : 0 ;
})



const postModel = mongoose.model("Post", postSchema);
module.exports = postModel;
