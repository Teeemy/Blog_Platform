
const Post = require("../models/post.model");

const createBlog = async (req, res) => {
    try {
        const blogs = await Post.create({...req.body, userId:req.id})
        return res.status(200).json(blogs)
    } catch (error) {
        return res.status(500).json(error.message)
        
    }
}

const getSingleBlog = async (req, res) => {
    try {
        const blogs = await Blog.find({})
        return res.status(200).json(blogs)
    } catch (error) {
        return res.status(500).json(error.message)

    }
}

const getBlogs = async (req, res) => {
    const { userId } = req.query;
    try {
        const blogs = await Blog.findById({userId})
        return res.status(200).json(blogs)
    } catch (error) {
        return res.status(500).json(error.message)

    }
}

const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id )
        if (blog.userId !== req.user.id) {
            return res.send ("you can only update your posts")
        }
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        return res.status(200).json(updatedBlog)
    } catch (error) {
        return res.status(500).json(error.message)

    }
}

module.exports = {createBlog,getSingleBlog,getBlogs,updateBlog}