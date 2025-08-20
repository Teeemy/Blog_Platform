const express = require("express");
const {
  createPost,
  getPosts,
  getSinglePost,
  updatePost,
  deletePost,
} = require("../controllers/post.controller");

const { authenticateJWT } = require("../middlewares/auth.middleware");
const router = express.Router();

// Create, update, delete require login
router.post("/", authenticateJWT, createPost);
router.put("/:id", authenticateJWT, updatePost);
router.delete("/:id", authenticateJWT, deletePost);

// Get posts are public
router.get("/", getPosts);
router.get("/:id", getSinglePost);

module.exports = router;
