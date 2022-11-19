const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const canvasSchema = new Schema({
    user:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Use"
    },
    project:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Project"
    },
    chatCommits:{
        type:Number,
        default: 0
    },
    upTime:{
        type: Date,
        default: Date.now(),
    }
})

const canvasModel = mongoose.model("Canvas",canvasSchema);
module.exports = canvasModel;