const express = require("express");

const authMiddleware =
  require("../middleware/authMiddleware");

const allowRoles =
  require("../middleware/roleMiddleware");

const {
  submitResult
} = require(
  "../controllers/resultController"
);

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  allowRoles("ENGINEER"),
  submitResult
);

module.exports = router;