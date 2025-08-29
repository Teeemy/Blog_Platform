const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
      index: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    guestName: {
      type: String,
      trim: true,
    },
    guestEmail: {
      type: String,
      trim: true,
    },
    content: { type: String, required: true, maxlength: 1000 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
