const express = require("express");
const test = require("../controllers/user.controllers.js")
// const verifyToken = require("../middleware/user.middleware.js")
const UserController = require("../controllers/user.controllers.js")
// import { test } from "../controllers/user.controllers.js"
const middleware = require("../middleware/user.middleware.js")

const userRoutes = express.Router();
// userRoutes.get("/testu", test)

// update user
userRoutes.put("/:id" ,middleware.verifyToken,UserController.updateUser)
// userRoutes.put("\:id" ,UserController.updateUser)

// delete user
userRoutes.delete("/del/:id", middleware.verifyToken, UserController.deleteUser)

// get a user 
userRoutes.get("/del/:id", middleware.verifyToken, UserController.deleteUser)

// subscribe a user
userRoutes.put("/del/:id", middleware.verifyToken, UserController.deleteUser)

// unsubscribe a user
userRoutes.put("/del/:id", middleware.verifyToken, UserController.deleteUser)

// like a video
userRoutes.put("/del/:id", middleware.verifyToken, UserController.deleteUser)

// dislike a video
userRoutes.put("/del/:id", middleware.verifyToken, UserController.deleteUser)


// export default userRoutes;
module.exports = userRoutes;