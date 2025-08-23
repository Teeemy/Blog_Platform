const Comment = require("../models/comment.model");

// Create a comment (user or guest)
const createComment = async (req, res) => {
    try {
        const newComment = await Comment.create({
            content: req.body.content,
            post: req.body.post,
            author: req.user ? req.user.id : null, // logged-in user
            guestName: req.body.guestName || null, // guest name if provided
            guestEmail: req.body.guestEmail || null, // guest email if provided
        });

        res.status(201).json({
            message: "Comment created successfully",
            comment: newComment,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all comments for a post
const getCommentsByPost = async (req, res) => {
    try {
        const { postId } = req.query; // get postId from query string

        if (!postId) {
            return res.status(400).json({ message: "postId query parameter is required" });
        }

        // Logged-in user comments
        const userComments = await Comment.find({ post: postId, author: { $ne: null } })
            .populate("author", "username email")
            .select("content author guestName guestEmail");

        // Guest comments
        const guestComments = await Comment.find({ post: postId, author: null })
            .select("post content guestName guestEmail");

        const comments = {};

        if (userComments.length > 0) comments.userComments = userComments;
        if (guestComments.length > 0) comments.guestComments = guestComments;

        res.status(200).json({
            message: "Comments fetched successfully",
            comments,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

  
// Update a comment (only own comment)
const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.author.toString() !== req.user.id)
      return res
        .status(403)
        .json({ message: "Not authorized to update this comment" });

    comment.content = req.body.content || comment.content;
    await comment.save();
    res.json({ message: "Comment updated successfully", comment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a comment (own or admin)
const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.author.toString() !== req.user.id && req.user.role !== "admin")
      return res
        .status(403)
        .json({ message: "Not authorized to delete this comment" });

    await comment.deleteOne();
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createComment,
  getCommentsByPost,
  updateComment,
  deleteComment,
};
