const express = require("express");
const multer = require("multer");
const router = express.Router();
const { protect, isAdmin } = require("../middleware/authMiddleware");
const { createQuiz, createQuizByPdfFile, getQuizzes, getQuizById, submitQuiz, updateQuiz, deleteQuiz } = require("../controllers/quizController");

// Use memory storage so the file is stored in memory and accessible as a buffer
const storage = multer.memoryStorage();

const upload = multer({ storage });

router.post("/create", protect, isAdmin, createQuiz);
router.post("/upload-pdf", protect, isAdmin, upload.single("pdf"), createQuizByPdfFile);
router.get("/", protect, getQuizzes);
router.get("/:id", protect, getQuizById);
router.post("/:id/submit", protect, submitQuiz);
router.put("/:id", protect, isAdmin, updateQuiz);
router.delete("/:id", protect, isAdmin, deleteQuiz);

module.exports = router;
