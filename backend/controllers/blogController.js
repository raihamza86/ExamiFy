const Blog = require("../models/blog");

const createBlog = async (req, res) => {
    const { title, content, category } = req.body;
    const image = req.file?.path;

    try {

        const blog = ({
            title,
            content,
            category,
            image,
            author: req.user.id,
        });

        await Blog.create(blog);

        res.status(201).json({
            message: `Your blog has been successfully listed!`,
            blog,
        });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong. Please try again later.", error: error.message });
    }
};

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate("author", "name email");
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getSingleBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate("author", "name email");
        if (!blog) return res.status(404).json({ error: "Blog not found" });
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found. Unable to update." });
        }

        // Extract updated fields
        const { title, content, category } = req.body;
        const image = req.file?.path || blog.image;

        // Update property details
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            { title, content, category, image }, // Update fields
            { new: true, runValidators: true }
        );

        res.json({
            message: `Blog has been successfully updated!`,
            blog: updatedBlog,
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating blog. Please try again later.", error });
    }
};

const deleteBlog = async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        if (!deletedBlog) return res.status(404).json({ error: "Blog not found" });
        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createBlog, getAllBlogs, getSingleBlog, updateBlog, deleteBlog };