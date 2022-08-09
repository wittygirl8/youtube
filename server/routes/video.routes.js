const express = require("express");
const test = require("../controllers/video.controllers.js")
const middleware = require("../middleware/user.middleware.js")
const VideoController = require("../controllers/video.controllers.js")
const videoRoutes = express.Router();

// Create Videos
videoRoutes.post("/create/:id", middleware.verifyToken,VideoController.createVideos)

// Update Videos
videoRoutes.post("/update/:id", middleware.verifyToken,VideoController.updateVideos)

// Delete Videos
videoRoutes.post("/deletevideo/:id", middleware.verifyToken,VideoController.delVideos)

// Get Videos
videoRoutes.post("/get-video/:id", middleware.verifyToken,VideoController.getVideos)

// view Videos
videoRoutes.post("/view-video/:id", middleware.verifyToken,VideoController.viewVideos)

// trend Videos
videoRoutes.post("/trend-video/:id", middleware.verifyToken,VideoController.trendVideos)

// random Videos
videoRoutes.post("/random-video/:id", middleware.verifyToken,VideoController.randomVideos)

// sub Videos
videoRoutes.post("/sub-video/:id", middleware.verifyToken,VideoController.subVideos)

// export default videoRoutes;
module.exports = videoRoutes;