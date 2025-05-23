const mongoose = require("mongoose");

const pastPaperSchema = new mongoose.Schema({
    title: { type: String, required: true },
    fileUrl: { type: String, required: true },
    year: { type: Number, required: true },
    subject: { type: String, required: true },
    category: {
        type: String,
        enum: ['PDF Notes', 'Ppsc Past Papers', 'Fpsc Past Papers'],
        required: true,
    },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

module.exports = mongoose.model("PastPaper", pastPaperSchema);
