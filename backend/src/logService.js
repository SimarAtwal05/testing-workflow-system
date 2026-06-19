const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createLog = async (data) => {
  return prisma.logEntry.create({
    data: {
      source: data.source,
      level: data.level,
      message: data.message,
      metadata: data.metadata || {},
    },
  });
};

const getLatestLogs = async () => {
  return prisma.logEntry.findMany({
    orderBy: { createdAt: "desc" },
    take: 20,
  });
};

const updateLogStatus = async (id, status) => {
  return prisma.logEntry.update({
    where: { id },
    data: { status },
  });
};

module.exports = {
  createLog,
  getLatestLogs,
  updateLogStatus,
};