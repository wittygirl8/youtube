const express = require("express");
const test = require("../controllers/comments.controllers.js")
// import { test } from "../controllers/comments.controllers"

const commentsRoutes = express.Router();
commentsRoutes.get("/testc", test)

// export default commentsRoutes;
module.exports = commentsRoutes;