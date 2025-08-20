const express = require("express");
const router = express.Router();
const { getAllUsers, deleteUser } = require("../controllers/admin.controller");
const { authenticateJWT, isAdmin } = require("../middlewares/auth.middleware");

// Get all users (admin only)
router.get("/users", authenticateJWT, isAdmin, getAllUsers);

// Delete a user (admin only)
router.delete("/users/:id", authenticateJWT, isAdmin, deleteUser);

module.exports = router;
