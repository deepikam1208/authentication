const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  getAllUsers,
  deleteUser,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/roleMiddleware");


// PUBLIC ROUTES
router.post("/register", registerUser);

router.post("/login", loginUser);


// STUDENT ROUTES
router.get(
  "/profile",
  protect,
  authorizeRoles("student", "admin"),
  getProfile
);

router.put(
  "/profile",
  protect,
  authorizeRoles("student", "admin"),
  updateProfile
);


// ADMIN ROUTES
router.get(
  "/users",
  protect,
  authorizeRoles("admin"),
  getAllUsers
);

router.delete(
  "/users/:id",
  protect,
  authorizeRoles("admin"),
  deleteUser
);

module.exports = router;