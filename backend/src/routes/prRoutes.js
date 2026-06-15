const express = require("express");
const router = express.Router();

const {
  createPullRequest,
  getPullRequests,
} = require("../controllers/prController");

const authMiddleware = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

// Engineer submits PR
router.post(
  "/create",
  authMiddleware,
  allowRoles("ENGINEER"),
  createPullRequest
);

// Head views PRs
router.get(
  "/",
  authMiddleware,
  allowRoles("HEAD"),
  getPullRequests
);

module.exports = router;