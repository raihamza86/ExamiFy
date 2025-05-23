const User = require("../models/user");
const Quiz = require("../models/quiz");
const PastPaper = require("../models/pastPaper");

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password"); // Exclude passwords
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const updateUserRole = async (req, res) => {
    try {
        const { role } = req.body; // Get new role from request body
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update user role
        user.role = role;
        await user.save();

        res.json({ message: "User role updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};


const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        await user.deleteOne();
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find().populate("createdBy", "name").populate("questions");
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const deleteQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) return res.status(404).json({ message: "Quiz not found" });

        await quiz.deleteOne();
        res.json({ message: "Quiz deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const getAllPapers = async (req, res) => {
    try {
        const papers = await PastPaper.find();
        res.json(papers);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const deletePaper = async (req, res) => {
    try {
        const paper = await PastPaper.findById(req.params.id);
        if (!paper) return res.status(404).json({ message: "Past paper not found" });

        await paper.deleteOne();
        res.json({ message: "Past paper deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { getAllUsers, updateUserRole, deleteUser, getAllQuizzes, deleteQuiz, getAllPapers, deletePaper };
