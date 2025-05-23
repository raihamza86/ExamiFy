const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const quizRoutes = require("./routes/quizRoutes");
const pastPaperRoutes = require("./routes/pastPaperRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true, // ✅ Allows sending cookies
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/papers", pastPaperRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/blogs", blogRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
