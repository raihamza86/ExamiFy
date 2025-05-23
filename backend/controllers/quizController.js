const Quiz = require("../models/quiz");
const Question = require("../models/question");
const Submission = require("../models/submission");
const pdfParse = require("pdf-parse");

const createQuiz = async (req, res) => {
    try {
        const { title, description, category, questions } = req.body;
        const createdBy = req.user.id;

        // Validate category
        const validCategories = [
            'General Knowledge',
            'Current Affairs',
            'English',
            'Math',
            'Geography',
            'Computer Study',
            'Islamic Study'
        ];

        if (!validCategories.includes(category)) {
            return res.status(400).json({ error: "Invalid category provided." });
        }

        // Step 1: Create the Quiz First (without questions)
        const quiz = new Quiz({ title, description, category, createdBy });
        await quiz.save(); // Save the quiz to get its ID

        // Step 2: Create Questions with the Quiz ID
        const createdQuestions = await Question.insertMany(
            questions.map((q) => ({
                quiz: quiz._id, // Assign the quiz ID
                text: q.text,
                options: q.options,
                correctAnswer: q.correctAnswer,
            }))
        );

        // Step 3: Update Quiz with Question IDs
        quiz.questions = createdQuestions.map((q) => q._id);
        await quiz.save(); // Save the updated quiz

        res.status(201).json({ message: "Quiz created successfully!", quiz });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

const createQuizByPdfFile = async (req, res) => {
    try {
        // Ensure the file exists
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        if (req.file.mimetype !== "application/pdf") {
            return res.status(400).json({ error: "Only PDF files are allowed" });
        }


        const createdBy = req.user.id;

        const { category } = req.body;

        // Validate category
        const validCategories = [
            'General Knowledge',
            'Current Affairs',
            'English',
            'Math',
            'Geography',
            'Computer Study',
            'Islamic Study'
        ];

        if (!validCategories.includes(category)) {
            return res.status(400).json({ error: "Invalid category provided." });
        }

        const clonedBuffer = Buffer.from(req.file.buffer); // <-- change made here

        // Try to parse PDF content
        let text;
        try {
            const data = await pdfParse(clonedBuffer); // <-- and here
            text = data.text;
        } catch (parseErr) {
            console.error("PDF parsing failed:", parseErr.message);

            return res.status(400).json({
                error: "Unable to parse this PDF. It may be a scanned image or a malformed PDF. Please upload a valid, text-based PDF.",
                details: parseErr.message,
            });
        }


        const lines = text.split("\n").filter(line => line.trim() !== "");
        const questions = [];
        let curr = { text: "", options: [], correctAnswer: 0 };

        lines.forEach((line) => {
            if (/^\d+\./.test(line)) {
                if (curr.text) questions.push({ ...curr });
                curr = {
                    text: line.replace(/^\d+\.\s*/, "").trim(),
                    options: [],
                    correctAnswer: 0,
                };
            } else if (/^\[?[A-Da-d]\]?[\):.]/.test(line)) {
                const option = line.replace(/^\[?[A-Da-d]\]?[\):.]\s*/, "").trim();
                curr.options.push(option);
            } else if (/^Answer\s*[:\-=]*/i.test(line)) {
                const ansMatch = line.match(/Answer\s*[:\-=]*\s*([A-D])/i);
                if (ansMatch) {
                    const ansLetter = ansMatch[1].toUpperCase();
                    const index = ["A", "B", "C", "D"].indexOf(ansLetter);
                    curr.correctAnswer = index !== -1 ? index : 0;
                } else {
                    curr.correctAnswer = 0;
                }
            }



        });

        if (curr.text) questions.push({ ...curr });

        const quiz = new Quiz({
            title: "Quiz",
            description: "Solve the questions",
            createdBy,
            category,
        });

        await quiz.save();

        const createdQuestions = await Question.insertMany(
            questions.map((q) => ({
                quiz: quiz._id,
                text: q.text,
                options: q.options,
                correctAnswer: q.correctAnswer,
            }))
        );

        quiz.questions = createdQuestions.map(q => q._id);
        await quiz.save();

        res.status(201).json({ message: "Quiz created from PDF", quiz });
    } catch (err) {
        console.error("Unexpected error:", err);
        res.status(500).json({ error: "Failed to create quiz", err });
    }
};




const getQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find().populate("createdBy", "name").populate("questions");
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const getQuizById = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id).populate("questions");
        if (!quiz) return res.status(404).json({ message: "Quiz not found" });

        res.json(quiz);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const submitQuiz = async (req, res) => {
    try {
        const { answers } = req.body; // Expecting answers as an array of objects
        const quiz = await Quiz.findById(req.params.id).populate("questions");

        if (!quiz) return res.status(404).json({ message: "Quiz not found" });


        let score = 0;
        const results = [];

        quiz.questions.forEach((question) => {
            // Find the user's answer for this specific question
            const userAnswer = answers.find(ans => ans.questionId === question._id.toString());

            if (!userAnswer) {
                results.push({
                    question: question.text,
                    correctAnswer: question.options[question.correctAnswer],
                    userAnswer: null,
                    isCorrect: false
                });
                return;
            }

            // Convert stored correct answer index to actual answer text
            const correctAnswerText = question.options[question.correctAnswer]; // Convert index to text


            // Compare user-selected answer with the actual correct answer text
            const isCorrect = correctAnswerText === userAnswer.selectedAnswer;

            results.push({
                questionId: question._id,
                question: question.text,
                correctAnswer: correctAnswerText,
                userAnswer: userAnswer.selectedAnswer,
                isCorrect
            });

            if (isCorrect) score++;
        });

        // **Save the submission in the database**
        const newSubmission = new Submission({
            user: req.user.id,  // Store user ID
            quiz: quiz._id,      // Store quiz ID
            score: score,
            totalScore: quiz.questions.length
        });

        await newSubmission.save();

        res.json({ message: "Quiz submitted successfully", score, total: quiz.questions.length, results });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};


const updateQuiz = async (req, res) => {
    try {
        const { title, description, questions, category } = req.body;
        const quizId = req.params.id;

        let quiz = await Quiz.findById(quizId);
        if (!quiz) return res.status(404).json({ message: "Quiz not found" });

        // Update the quiz details
        quiz.title = title || quiz.title;
        quiz.description = description || quiz.description;
        quiz.category = category || quiz.category;

        // Clear existing questions and replace with new ones
        await Question.deleteMany({ quiz: quizId }); // Delete old questions

        // Insert new questions
        const createdQuestions = await Question.insertMany(
            questions.map((q) => ({
                quiz: quizId,
                text: q.text,
                options: q.options,
                correctAnswer: q.correctAnswer,
            }))
        );

        quiz.questions = createdQuestions.map((q) => q._id);
        await quiz.save(); // Save the updated quiz

        res.json({ message: "Quiz updated successfully!", quiz });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};


const deleteQuiz = async (req, res) => {
    try {
        const quizId = req.params.id;

        let quiz = await Quiz.findById(quizId);
        if (!quiz) return res.status(404).json({ message: "Quiz not found" });

        // Delete all associated questions
        await Question.deleteMany({ quiz: quizId });

        // Delete the quiz itself
        await Quiz.findByIdAndDelete(quizId);

        res.json({ message: "Quiz deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};


module.exports = { createQuiz, createQuizByPdfFile, getQuizzes, getQuizById, submitQuiz, updateQuiz, deleteQuiz };
