const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String,
        required: [true,"User should have name"]
    },
    email:{
        type: String
    },
    totalPost:{
        type: Number
    },
    likes:{
        type: Number
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    },
    favouriteTechStack:[{type: String}],
    password:{
        type: String,
        require: [true,"An user must have a password"],
        minlength:6,
        select: false 
    }
})


const userModel = mongoose.model("User",userSchema);
module.exports = userModel;