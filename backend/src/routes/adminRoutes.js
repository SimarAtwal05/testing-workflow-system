const express = require("express");

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const allowRoles = require(
  "../middleware/roleMiddleware"
);

const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser
} = require("../controllers/userController");

const router = express.Router();

router.get(
  "/users",
  authMiddleware,
  allowRoles("ADMIN"),
  getAllUsers
);

router.post(
  "/users",
  authMiddleware,
  allowRoles("ADMIN"),
  createUser
);

router.put(
  "/users/:id",
  authMiddleware,
  allowRoles("ADMIN"),
  updateUser
);

router.delete(
  "/users/:id",
  authMiddleware,
  allowRoles("ADMIN"),
  deleteUser
);

module.exports = router;