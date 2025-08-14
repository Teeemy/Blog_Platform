const jwt = require("jsonwebtoken");
const User = require("../models/user.model")

const authenticateJWT = async (req, res, next) => {
    const { token } = req.headers.authorization.split(' ')[1]; // get the token from cookies

    if (!token) {
        return res.status(403).json({ message: "Unauthorized, login to create blog" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
        if (error) {
            return res.status(403).json({ message: "JWT Verification Error",});
        }
        // attach user to request
        req.user = { id: payload.id, admin: payload.admin };
        next();
    });
};

module.exports = authenticateJWT;
