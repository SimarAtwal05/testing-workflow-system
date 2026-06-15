const prisma = require("../prisma/prismaClient");

const submitResult = async (req, res) => {
  try {
    const {
      requestId,
      observations,
      conclusion,
      status
    } = req.body;

    const result =
      await prisma.testingResult.upsert({
        where: {
          requestId
        },

        update: {
          observations,
          conclusion,
          status
        },

        create: {
          requestId,
          observations,
          conclusion,
          status
        }
      });

    if (status === "SUBMITTED") {
      await prisma.testingRequest.update({
        where: {
          id: requestId
        },
        data: {
          status: "PENDING_APPROVAL"
        }
      });
    }

    res.json({
      message: "Result Saved",
      result
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

module.exports = {
  submitResult
};