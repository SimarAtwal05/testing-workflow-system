const prisma = require("../prisma/prismaClient");

// CREATE REQUEST
const createRequest = async (req, res) => {
  try {
    const {
      testType,
      temperature,
      status
    } = req.body;

    if (
      testType === "NDT" &&
      !temperature
    ) {
      return res.status(400).json({
        message: "Temperature required for NDT"
      });
    }

    const request =
      await prisma.testingRequest.create({
        data: {
          testType,
          temperature,
          status,
          createdById: req.user.id
        }
      });

    res.status(201).json(request);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

// GET ALL REQUESTS
const getAllRequests = async (req, res) => {
  try {
    const requests =
      await prisma.testingRequest.findMany({
        include: {
          createdBy: true,
          assignedEngineer: true,
          result: true
        }
      });

    res.json(requests);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

// ASSIGN ENGINEER
const assignEngineer = async (req, res) => {
  try {
    const requestId =
      Number(req.params.id);

    const {
      engineerId
    } = req.body;

    const request =
      await prisma.testingRequest.update({
        where: {
          id: requestId
        },
        data: {
          assignedEngineerId: engineerId,
          status: "ASSIGNED"
        }
      });

    res.json({
      message: "Engineer Assigned",
      request
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

// APPROVE REQUEST
const approveRequest = async (req, res) => {
  try {
    const requestId =
      Number(req.params.id);

    const request =
      await prisma.testingRequest.update({
        where: {
          id: requestId
        },
        data: {
          status: "APPROVED"
        }
      });

    res.json({
      message: "Request Approved",
      request
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

// GET ASSIGNED REQUESTS FOR ENGINEER
const getAssignedRequests = async (
  req,
  res
) => {
  try {
    const requests =
      await prisma.testingRequest.findMany({
        where: {
          assignedEngineerId:
            req.user.id
        },
        include: {
          createdBy: true,
          assignedEngineer: true,
          result: true
        }
      });

    res.json(requests);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

module.exports = {
  createRequest,
  getAllRequests,
  assignEngineer,
  approveRequest,
  getAssignedRequests
};