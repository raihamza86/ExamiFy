const Submission = require("../models/submission"); // Assuming you have a Submission model
const User = require("../models/user");
const Quiz = require("../models/quiz");
const PastPaper = require("../models/pastPaper");

const getUserProfile = async (req, res) => {
    try {
        // Fetch user details (excluding sensitive fields like password)
        const user = await User.findById(req.user.id).select("name email role");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Fetch quizzes created by the user
        const quizzes = await Quiz.find({ createdBy: req.user.id });

        // Fetch past papers uploaded by the user
        const papers = await PastPaper.find({ uploadedBy: req.user.id });

        // Fetch quizzes the user has submitted (completed quizzes with results)
        const submittedQuizzes = await Submission.find({ user: req.user.id })
            .populate("quiz", "title") // Populate quiz details
            .select("quiz score totalScore createdAt"); // Include quiz title, score, total score, and date

        res.json({ user, quizzes, papers, submittedQuizzes });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { getUserProfile };
