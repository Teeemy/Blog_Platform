const express = require("express");
const router = express.Router();
const {
  getSingleUser,
  getAllUsers,
  updateUserRole,
  deleteUser,
} = require("../controllers/admin.controller");
const {
  updatePost,
  deletePost,
  getAllPosts,
  getSinglePost,
} = require("../controllers/post.controller"); // ✅ import from post controller
const { authenticateJWT, isAdmin } = require("../middlewares/auth.middleware");

// User management (admin only)
router.get("/users/:id", authenticateJWT, isAdmin, getSingleUser);
router.get("/users", authenticateJWT, isAdmin, getAllUsers);
router.put("/users/:id/role", authenticateJWT, isAdmin, updateUserRole);
router.delete("/users/:id", authenticateJWT, isAdmin, deleteUser);

// Post management (admin only)
router.get("/posts", authenticateJWT, isAdmin, getAllPosts);
router.get("/posts/:id", authenticateJWT, isAdmin, getSinglePost);
router.put("/posts/:id", authenticateJWT, isAdmin, updatePost);
router.delete("/posts/:id", authenticateJWT, isAdmin, deletePost);

module.exports = router;
