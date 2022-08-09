const  createError  = require("../error/error.js");
const User = require("../models/user.model.js");
class UserController {
    // update user
    static updateUser = async (req, res, next)=>{
        console.log("req.body", req.body, req.params.id === req.user.id)
        if(req.params.id === req.user.id){
            // todo
            try{
                console.log("updateUser")
                const updateUser = await User.findByIdAndUpdate(
                    {_id: req.params.id},
                    {
                        $set: req.body
                    }, {new:  true}
                )  
                console.log("updateUser", updateUser)
                res.status(200).json(updateUser)
            }
            catch(err){
                next(err)
            }
        }
        else{
            return next(createError(403, "  You can update only your account!"))
        }
    }
    // delete user
    static deleteUser = async (req, res, next)=>{
        console.log("req.body", req.body, req.params.id === req.user.id)
        if(req.params.id === req.user.id){
            // todo
            try{
                console.log("deleteUser")
                await User.findByIdAndDelete(
                    {_id: req.params.id}
                ) 
                res.status(200).json("User is Deleted")
            }
            catch(err){
                next(err)
            }
        }
        else{
            return next(createError(403, "You can delete only your account!"))
        }
    }
    // get a user 
    static getUser = async (req, res, next)=>{
        console.log("req.body", req.body, req.params.id === req.user.id)
        if(req.params.id === req.user.id){
            // todo
            try{
                console.log("getUser")
                const user = await User.findById(
                    {_id: req.params.id}
                ) 
                res.status(200).json({"User": User})
            }
            catch(err){
                next(err)
            }
        }
        else{
            return next(createError(403, "You can delete only your account!"))
        }
    }

    // subscribe a user
    static subscribe = async (req, res, next)=>{
        if(req.params.id === req.user.id){
            try{
                await User.findById(req.params.id, {
                    $push: {
                        subscribedUsers: req.params.id
                    }
                })
                await User.findByIdAndUpdate(req.params.id, {
                    $in: {
                        subscribers: +1
                    }
                })
                res.status(200).json("Subscription Succesfull!")
            }
            catch(err){
                return next(err)
            }
        }
        else{
            return next(createError(403, "You can delete only your account!"))
        }
    }
    // unsubscribe a user
    static unsubscribe = async (req, res, next) =>{
        if(req.params.id === req.user.id){
            try{
                await User.findById(req.params.id, {
                    $pull:{
                        subscribedUsers: req.params.id
                    }
                })
                await User.findByIdAndUpdate(req.params.id, {
                    $in: {
                        subscribers: -1
                    }
                })
                res.status(200).json("Unsubscription Succesfull!")
            }
            catch(err){
                return next(err)
            }
        }
        else{

        }
    }
    // like a video

    // dislike a video
}

module.exports = UserController;