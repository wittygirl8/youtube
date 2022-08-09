const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true,
        trim:true
    },
    desc:{
        type: String,
        required: true,
        trim: true
    },
    imgUrl:{
        type: String,
        required:true,
        trim:true
    },
    videoUrl:{
        type: String,
        required:true,
        trim:true
    },
    views:{
        type: Number,
        default: 0,
        trim: true
    },
    tags:{
        types:[String],
        default:[]
    },
    likes:{
        types:[String],
        default:[]
    },
    dislikes:{
        types:[String],
        default:[]
    }
}, {timestamps: true})

module.exports = mongoose.model("Video", VideoSchema)