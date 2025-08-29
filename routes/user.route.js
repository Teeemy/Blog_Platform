const express = require("express");
const router = express.Router();
const { getProfile, updateProfile } = require("../controllers/user.controller");
const { authenticateJWT } = require("../middlewares/auth.middleware");

// Get logged-in user profile
router.get("/profile", authenticateJWT, getProfile);

// Update logged-in user profile
router.put("/profile", authenticateJWT, updateProfile);

module.exports = router;
