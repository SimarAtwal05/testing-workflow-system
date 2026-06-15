const prisma = require("../prisma/prismaClient");

const getReport = async (req, res) => {
  try {

    const requestId =
      Number(req.params.id);

    const request =
      await prisma.testingRequest.findUnique({
        where: {
          id: requestId
        },
        include: {
          createdBy: true,
          assignedEngineer: true,
          result: true
        }
      });

    res.json({
      requestId: request.id,
      testType: request.testType,
      temperature: request.temperature,
      observations: request.result?.observations,
      conclusion: request.result?.conclusion,
      testedBy:
        request.assignedEngineer?.name,
      approvedBy: "Head User"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};

module.exports = {
  getReport
};