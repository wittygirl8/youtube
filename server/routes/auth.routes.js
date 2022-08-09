const express = require("express");
const AuthController = require("../controllers/auth.controllers.js");
const test = require("../controllers/auth.controllers.js")
// import { test } from "../controllers/comments.controllers"
const authRoutes = express.Router();
authRoutes.get("/testa", test)

// Create User
authRoutes.post("/signup", AuthController.signup)

// Login User
authRoutes.post("/signin", AuthController.signin)

// Google Auth
authRoutes.post("/google", )

// export default authRoutes;
module.exports = authRoutes;