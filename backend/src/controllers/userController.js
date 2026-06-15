const prisma = require("../prisma/prismaClient");
const bcrypt = require("bcrypt");

// GET ALL USERS
const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    res.json(users);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

// CREATE USER
const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role
      }
    });

    res.status(201).json({
      message: "User Created",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

// UPDATE USER
const updateUser = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const { name, role } = req.body;

    const user = await prisma.user.update({
      where: {
        id
      },
      data: {
        name,
        role
      }
    });

    res.json({
      message: "User Updated",
      user
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

// DELETE USER
const deleteUser = async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.user.delete({
      where: {
        id
      }
    });

    res.json({
      message: "User Deleted Successfully"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser
};