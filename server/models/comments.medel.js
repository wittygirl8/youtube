const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    videoId:{
        type: String,
        required: true
    },
    desc:{
        type: String,
        required: true,
        trim: true
    },
    likes:{
        types:[String],
        default:[]
    },
    dislikes:{
        types:[String],
        default:[]
    }
}, {timestamps: true}
)

module.exports = mongoose.model("Comment", CommentsSchema)