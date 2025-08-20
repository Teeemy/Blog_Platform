const express = require("express");
const router = express.Router();
const { getSingleUser,getAllUsers, updateUserRole, deleteUser } = require("../controllers/admin.controller");
const { authenticateJWT, isAdmin } = require("../middlewares/auth.middleware");


// Get a single user by ID (admin only)
router.get("/users/:id", authenticateJWT, isAdmin, getSingleUser);
// Get all users (admin only)
router.get("/users", authenticateJWT, isAdmin, getAllUsers);
// Update user role (admin only)
router.put("/users/:id/role", authenticateJWT, isAdmin, updateUserRole);
// Delete a user (admin only)
router.delete("/users/:id", authenticateJWT, isAdmin, deleteUser);

module.exports = router;
