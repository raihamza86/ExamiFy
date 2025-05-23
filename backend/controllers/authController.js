const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "Email already exists" });

        user = new User({ name, email, password });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

        // Store token in HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,  // Prevents JavaScript access
            secure: process.env.NODE_ENV === "production",  // Use secure cookies in production
            sameSite: "Strict", // Prevents CSRF attacks
        });

        res.status(200).json({ message: "Login successful", role: user.role });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};


const logoutUser = (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0), // Expire immediately
        sameSite: "Strict"
    });

    res.status(200).json({ message: "Logout successful" });
};

module.exports = { registerUser, loginUser, logoutUser };
