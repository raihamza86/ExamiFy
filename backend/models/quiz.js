const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    category: {
        type: String,
        enum: ['General Knowledge', 'Current Affairs', 'English', 'Math', 'Geography', 'Computer Study', 'Islamic Study'],
        required: true,
    },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

module.exports = mongoose.model("Quiz", quizSchema);
