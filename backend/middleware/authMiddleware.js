const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    const token = req.cookies.token; // Get token from cookies

    if (!token) return res.status(401).json({ message: "Access Denied" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid Token" });
    }
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({ message: "Admin access only" });
    }
};

module.exports = { protect, isAdmin };
