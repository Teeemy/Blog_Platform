
const express = require("express");
const { createBlog } = require("../controllers/post.controller");
const router = express.Router();

router.post("/createBlog", createBlog);
//router.post("/login", login)

module.exports = router;
