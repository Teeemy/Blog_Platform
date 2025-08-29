const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
