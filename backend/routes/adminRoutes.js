const express = require("express");
const router = express.Router();
const { protect, isAdmin } = require("../middleware/authMiddleware");
const { getAllUsers, deleteUser, getAllQuizzes, deleteQuiz, getAllPapers, deletePaper, updateUserRole } = require("../controllers/adminController");

router.get("/users", protect, isAdmin, getAllUsers);
router.put("/users/:id", protect, isAdmin, updateUserRole);
router.delete("/users/:id", protect, isAdmin, deleteUser);
router.get("/quizzes", protect, isAdmin, getAllQuizzes);
router.delete("/quizzes/:id", protect, isAdmin, deleteQuiz);
router.get("/papers", protect, isAdmin, getAllPapers);
router.delete("/papers/:id", protect, isAdmin, deletePaper);

module.exports = router;
