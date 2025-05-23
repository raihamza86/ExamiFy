const express = require("express");
const Blog = require("../models/blog");
const { protect, isAdmin } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const { createBlog, getAllBlogs, getSingleBlog, updateBlog, deleteBlog } = require("../controllers/blogController");

const router = express.Router();

// ✅ Create a new blog
router.post("/", protect, isAdmin, upload.single("image"), createBlog);

// ✅ Get all blogs
router.get("/", getAllBlogs);

// ✅ Get a single blog by ID
router.get("/:id", getSingleBlog);

// ✅ Update a blog by ID
router.put("/:id", protect, isAdmin, upload.single("image"), updateBlog);

// ✅ Delete a blog by ID
router.delete("/:id", protect, isAdmin, deleteBlog);

module.exports = router;
