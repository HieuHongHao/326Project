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
        default: new Date(null),
    },
    duration:{
        type:Number,
        default: 0
    }
})

canvasSchema.pre("save", function(next){
    if(!this.isModified("upTime")){ return next();}
    this.duration = this.upTime - new Date(null);
    next();
})
const canvasModel = mongoose.model("Canvas",canvasSchema);
module.exports = canvasModel;