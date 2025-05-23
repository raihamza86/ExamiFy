const express = require("express");
const multer = require("multer");
const router = express.Router();
const { protect, isAdmin } = require("../middleware/authMiddleware");
const { uploadPaper, getPapers, editPaper, deletePaper, getPaperById } = require("../controllers/pastPaperController");

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

router.post("/upload", protect, isAdmin, upload.single("file"), uploadPaper);
router.get("/", getPapers);

// Get a Specific Past Paper by ID
router.get("/:id", getPaperById);

// **Edit (Update) a Past Paper**
router.put("/:id", protect, isAdmin, upload.single("file"), editPaper);

// **Delete a Past Paper**
router.delete("/:id", protect, isAdmin, deletePaper);


module.exports = router;
