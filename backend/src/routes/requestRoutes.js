const express = require("express");

const authMiddleware =
  require("../middleware/authMiddleware");

const allowRoles =
  require("../middleware/roleMiddleware");

const {
  createRequest,
  getAllRequests,
  assignEngineer,
  approveRequest,
  getAssignedRequests
} = require("../controllers/requestController");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  createRequest
);

router.get(
  "/",
  authMiddleware,
  getAllRequests
);

router.patch(
  "/:id/assign",
  authMiddleware,
  allowRoles("HEAD"),
  assignEngineer
);

router.patch(
  "/:id/approve",
  authMiddleware,
  allowRoles("HEAD"),
  approveRequest
);

router.get(
  "/assigned/me",
  authMiddleware,
  allowRoles("ENGINEER"),
  getAssignedRequests
);

module.exports = router;