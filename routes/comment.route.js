const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../middlewares/auth.middleware");
const { createComment, getCommentsByPost, updateComment, deleteComment } = require("../controllers/comment.controller");

// Create a comment
router.post("/", authenticateJWT, createComment);

// Get all comments for a post
router.get("/", getCommentsByPost);

// Update own comment
router.put("/:id", authenticateJWT, updateComment);

// Delete own comment or admin
router.delete("/:id", authenticateJWT, deleteComment);

module.exports = router;
