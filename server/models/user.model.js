const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        trim:true,
        required:true
    },
    email:{
        type: String,
        trim:true,
        required: true, 
        unique: true
    },
    password:{
        type: String,
        trim:true,
        required: true
    },
    img:{
        type: String,
        trim:true,    
    },
    subscribers:{
        type: Number,
        default:0,
        trim: true
    },
    subscribedUsers:{
        type:[String]
    }
}, {timestamps: true})

module.exports = mongoose.model("User", UserSchema)