const jwt = require("jsonwebtoken");

// Authenticate user using JWT from cookie
const authenticateJWT = (req, res, next) => {
    console.log("Cookies:", req.cookies);
    const token = req.cookies.token; // read JWT from cookie
    if (!token) return res.status(401).json({ message: "Unauthorized, login required" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Invalid or expired token" });

        // Attach user info to request
        req.user = { id: decoded.id, role: decoded.role };
        next();
    });
};

// Admin check middleware
const isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "Admins only" });
    }
    next();
};

module.exports = { authenticateJWT, isAdmin };
