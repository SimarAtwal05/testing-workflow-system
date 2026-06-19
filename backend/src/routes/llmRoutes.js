const express = require("express");
const router = express.Router();

const {
  testAnalysis,
  createLLMReview,
  getPendingLLMReviews,
  approveLLMReview,
} = require("../controllers/llmController");

// TEST LLM
router.get("/test", testAnalysis);

// CREATE REVIEW FROM LLM OUTPUT
router.post("/review/create", createLLMReview);

// GET PENDING REVIEWS
router.get("/review/pending", getPendingLLMReviews);

// APPROVE REVIEW
router.post("/review/:id/approve", approveLLMReview);

module.exports = router;