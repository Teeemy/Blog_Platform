const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      min: 4,
    },
    desc: {
      type: String,
      min: 17,
    },
    content: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      default: [],
    },
    author: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
