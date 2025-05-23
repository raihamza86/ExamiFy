const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
    score: { type: Number, required: true },
    totalScore: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Submission", submissionSchema);
