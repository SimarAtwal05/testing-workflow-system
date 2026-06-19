const { analyzeLogs } = require("../agents/logAnalysisGraph");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

/**
 * Run LLM analysis (test route)
 */
const testAnalysis = async (req, res) => {
  try {
    const logs = {
      error: "Database timeout",
      service: "backend",
    };

    const result = await analyzeLogs(logs);

    res.json({
      success: true,
      analysis: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "LLM analysis failed",
      error: err.message,
    });
  }
};

/**
 * Create review from LLM output
 */
const createLLMReview = async (req, res) => {
  try {
    const analysis = req.body;

    const review = await prisma.lLMReview.create({
      data: {
        issue: analysis.issue,
        severity: analysis.severity,
        rootCause: analysis.root_cause,
        suggestion: analysis.fix_suggestion,
        codePatch: analysis.code_patch,
        status: "PENDING",
      },
    });

    res.json({
      success: true,
      review,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to create review",
      error: err.message,
    });
  }
};

/**
 * Get pending reviews
 */
const getPendingLLMReviews = async (req, res) => {
  try {
    const reviews = await prisma.lLMReview.findMany({
      where: { status: "PENDING" },
      orderBy: { createdAt: "desc" },
    });

    res.json(reviews);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch reviews",
      error: err.message,
    });
  }
};

/**
 * Approve review (placeholder without GitHub yet)
 */
const approveLLMReview = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const updated = await prisma.lLMReview.update({
      where: { id },
      data: {
        status: "APPROVED",
      },
    });

    res.json({
      success: true,
      review: updated,
    });
  } catch (err) {
    res.status(500).json({
      message: "Approval failed",
      error: err.message,
    });
  }
};

module.exports = {
  testAnalysis,
  createLLMReview,
  getPendingLLMReviews,
  approveLLMReview,
};