const express = require("express");

const authMiddleware =
  require("../middleware/authMiddleware");

const {
  getReport
} =
require("../controllers/reportController");

const router = express.Router();

router.get(
  "/:id",
  authMiddleware,
  getReport
);

module.exports = router;