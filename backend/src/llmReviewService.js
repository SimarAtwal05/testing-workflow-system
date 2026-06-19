const prisma = require("../prisma/prismaClient");

const createReview = async (logs, analysis) => {
  return await prisma.lLMReview.create({
    data: {
      logInput: logs,
      analysis: analysis,
      status: "PENDING",
    },
  });
};

const getPendingReviews = async () => {
  return await prisma.lLMReview.findMany({
    where: { status: "PENDING" },
    orderBy: { createdAt: "desc" },
  });
};

const approveReview = async (id, userId) => {
  return await prisma.lLMReview.update({
    where: { id: Number(id) },
    data: {
      status: "APPROVED",
      reviewedById: userId,
    },
  });
};

module.exports = {
  createReview,
  getPendingReviews,
  approveReview,
};