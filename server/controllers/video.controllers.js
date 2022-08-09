const  createError  = require("../error/error.js");
const Videos = require("../models/video.model.js")
const User = require("../models/user.model.js")
class VideoController{
    // Create Videos
    static createVideos=async(req, res, next)=>{
        try{
            const newVideo = new Videos({ userId: req.user.id, ...req.body });
            await newVideo.save()
            res.status(200).json({status:200,newVideo})
        }
        catch(err){
            next(err)
        }
    }
    // Update Videos
    static updateVideos=async(req, res, next)=>{
        try{
            let video = await Videos.findById(req.params.id);
            if(!video) return createError(404, "Video not found!")
            if(video.userId === req.user.id){
                const updatedUser = await Videos.findOneAndUpdate(req.user.id, {
                    $set: req.body
                }, {new: true})
                res.status(200).json(updatedUser)
            }
            else{
                return next(createError(403, "You can update only your video!"))
            }
        }
        catch(err){
            next(err)
        }
    }
    // Delete Videos
    static delVideos=async(req, res, next)=>{
        try{
            let video = await Videos.findById(req.params.id);
            if(!video) return createError(404, "Video not found!")
            if(video.userId === req.user.id){
                const deletedUser = await Videos.findByIdAndDelete(req.user.id)
                res.status(200).json(deletedUser)
            }
            else{
                return next(createError(403, "You can delete only your video!"))
            }
        }
        catch(err){
            next(err)
        }
    }
    // Get Videos 
    static getVideos=async(req, res, next)=>{
        try{
            let video = await Videos.findById(req.params.id);
            if(!video) return createError(404, "Video not found!")
            else res.status(200).json(video)
        }
        catch(err){
            next(err)
        }
    }


    // Add View Videos
    static viewVideos = async (req, res, next)=>{
        if(req.params.id === req.user.id){
            try{
                await Videos.findByIdAndUpdate(req.params.id, {
                    $in: {
                        views: +1
                    }
                })
                res.status(200).json("View Increased!")
            }
            catch(err){
                return next(err)
            }
        }
        else{
            return next(createError(403, "You can delete only your account!"))
        }
    }

    // trend Videos
    static randomVideos = async (req, res, next)=>{
        if(req.params.id === req.user.id){
            try{
                const Videos = await Videos.aggregate([{$sample:{size:40}}])
                res.status(200).json(Videos)
            }
            catch(err){
                return next(err)
            }
        }
        else{
            return next(createError(403, "You can delete only your account!"))
        }
    }

    // random Videos
    static trendVideos = async (req, res, next)=>{
        if(req.params.id === req.user.id){
            try{
                const Videos = await Videos.find().sort({views:-1})
                res.status(200).json(Videos)
            }
            catch(err){
                return next(err)
            }
        }
        else{
            return next(createError(403, "You can delete only your account!"))
        }
    }

    // sub Videos
    static subVideos = async (req, res, next)=>{
            try{
                const user = await User.findById(req.params.id)
                const SubscribedChannels = user.SubscribedUsers;
                res.status(200).json("Subscription Succesfull!")

                const list = Promise.all(
                    SubscribedChannels.map((channelId)=>{
                        return Videos.find({userId: channelId})
                    })
                );

                res.status(200).json(list)
            }
            catch(err){
                return next(err)
            }
    }
}

module.exports = VideoController;