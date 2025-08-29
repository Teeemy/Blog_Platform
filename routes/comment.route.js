const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../middlewares/auth.middleware");
const { createComment, getCommentsByPost, updateComment, deleteComment } = require("../controllers/comment.controller");

// Create a comment
router.post("/", authenticateJWT, createComment);

// Get all comments for a post
router.get("/", getCommentsByPost);

// Update user's comment
router.put("/:id", authenticateJWT, updateComment);

// Delete user's comment or admin
router.delete("/:id", authenticateJWT, deleteComment);

module.exports = router;
