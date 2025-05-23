const PastPaper = require("../models/pastPaper");

const uploadPaper = async (req, res) => {
    try {
        const { title, year, subject } = req.body;
        const category = req.body.category?.trim();


        const fileUrl = req.file.path;

        // Validate category
        const validCategories = [
            'PDF Notes', 'Ppsc Past Papers', 'Fpsc Past Papers'
        ];

        if (!validCategories.includes(category)) {
            return res.status(400).json({ error: "Invalid category provided." });
        }

        const paper = new PastPaper({ title, year, category, subject, fileUrl, uploadedBy: req.user.id });
        await paper.save();

        res.status(201).json({ message: "Past paper uploaded successfully", paper });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

const getPapers = async (req, res) => {
    try {
        const papers = await PastPaper.find();
        res.json(papers);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const getPaperById = async (req, res) => {
    try {
        const paper = await PastPaper.findById(req.params.id);
        if (!paper) {
            return res.status(404).json({ message: "Past paper not found" });
        }
        res.json(paper);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const editPaper = async (req, res) => {
    try {
        const { title, year, subject, category } = req.body;
        const fileUrl = req.file ? req.file.path : undefined; // Check if a new file is uploaded

        const paper = await PastPaper.findById(req.params.id);

        if (!paper) {
            return res.status(404).json({ message: "Past paper not found" });
        }

        // Update fields
        paper.title = title || paper.title;
        paper.year = year || paper.year;
        paper.subject = subject || paper.subject;
        paper.category = category || paper.category;
        if (fileUrl) {
            paper.fileUrl = fileUrl;
        }

        await paper.save();
        res.json({ message: "Past paper updated successfully", paper });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

const deletePaper = async (req, res) => {
    try {
        const paper = await PastPaper.findById(req.params.id);

        if (!paper) {
            return res.status(404).json({ message: "Past paper not found" });
        }

        await PastPaper.findByIdAndDelete(req.params.id);
        res.json({ message: "Past paper deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

module.exports = { uploadPaper, getPapers, getPaperById, editPaper, deletePaper };
