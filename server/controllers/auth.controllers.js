const moongoose = require("mongoose");
const bcrypt= require("bcrypt");
// import User from "../models/user.model.js"
const User = require("../models/user.model.js");
const  createError  = require("../error/error.js");
const jwt = require("jsonwebtoken")
// import jwt from "jsonwebtoken"
class AuthController {

    // Create User
    static signup = async (req, res, next)=>{
        try{
            console.log("req.body", {...req.body})

            // const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, 10);
            const newUser = new User({...req.body, password: hash})
            console.log("newUser", newUser, typeof(newUser))
            try{
                await newUser.save()
                console.log("saved")
                res.status(200).send({
                    status: 200,
                    newUser
                })
            }
            catch(err){
                // res.status(400).send({
                //     status: 200,
                //     err
                // })
                // ERROR HANDLING
                next(err)
            }
        }
        catch(err){
            // res.status(400).send({
            //     status: 400,
            //     message: error.message
            // });
            next(err)
        }
    }


    // Login User
    static signin = async (req, res, next) =>{
        try{
            console.log("req.body signin", {...req.body})
            const user = await User.findOne({email:req.body.email})
            if(!user) return next(createError(404, "User not found!"))
            console.log("user", req.body.password, user.password)
            const isCorrect =  await bcrypt.compare(req.body.password, user.password)
            console.log("isCorrect", isCorrect)
            if(!isCorrect) return next(createError(400, "Wrong Credentials!"))
        
            const token = jwt.sign({id: user._id}, process.env.JWT) 
            const {password, ...others} = user._doc
            console.log("token", token)
            console.log("res.cookie", res.cookie)
            res.cookie("access_token", token, {
                httpOnly: true
            }).status(200)
            .json(others);
        }
        catch(err){
            next(err)
        }
    }

}
module.exports = AuthController;