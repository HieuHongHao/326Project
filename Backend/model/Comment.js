const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const commentSchema = new Schema({
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

const commentModel = mongoose.model("Comment",commentSchema);
module.exports = commentModel;