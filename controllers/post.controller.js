const Post = require("../models/post.model");

// Create a post
const createPost = async (req, res) => {
    try {
        const newPost = new Post({
            title: req.body.title,
            content: req.body.content,
            categories: req.body.categories,
            author: req.user.id   // attach logged-in user
        });
        await newPost.save();
        res.status(201).json({ message: "Post created successfully", post: newPost });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all posts (public)
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("author", "username email");
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single post (public)
const getSinglePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate("author", "username email");
        if (!post) return res.status(404).json({ message: "Post not found" });
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all posts by a single user
const getPostsByUser = async (req, res) => {
    try {
        const userId = req.params.userId; // user ID from route
        const posts = await Post.find({ author: userId }); // filter by author
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update post (admin can update any post)
const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        // Only admin or post author can update
        if (req.user.role !== "admin" && post.author.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized to update this post" });
        }

        Object.assign(post, req.body);
        await post.save();
        res.status(200).json({ message: "Post updated successfully", post });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
  
/// Delete post (admin can delete any post)
const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        // Only admin or post author can delete
        if (req.user.role !== "admin" && post.author.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized to delete this post" });
        }

        await post.deleteOne();
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  };

module.exports = {
    createPost,
    getAllPosts,
    getSinglePost,
    getPostsByUser,
    updatePost,
    deletePost,
};
