const express = require("express");
const mongoose = require("mongoose");
// import userRoutes from './routes/user.routes.js'
const userRoutes = require('./routes/user.routes.js')
const videoRoutes = require('./routes/video.routes.js')
const commentsRoutes = require('./routes/comments.routes.js')
const authRoute = require("./routes/auth.routes.js")
const cookieParser = require("cookie-parser")
require("dotenv").config()
const app = express()

const connect = () =>{
    mongoose.connect(process.env.MONGO)
    .then(()=>{
        console.log("Connected to Database")
    })
    .catch(err=>{
        console.log(err)
    })
}

// Allows User to take/accept JSON file from user. Example: Postman 
app.use(express.json())

// Cookie Parser 
app.use(cookieParser())

app.use("/api/users", userRoutes)
app.use("/api/videos", videoRoutes)
app.use("/api/comments", commentsRoutes)
app.use("/api/auth", authRoute)

const port = process.env.PORT || 3000
app.use((err, req, res, next)=>{
    let status= err.status || 500;
    let message= err.message || "Something went wrong here!";
    return res.status(status).json({
        success: false,
        status,
        message,
        stack: err.stack
    })
})
app.listen(port, (req, res)=>{
    connect()
    console.log(`Listening to port ${port}`);
})
