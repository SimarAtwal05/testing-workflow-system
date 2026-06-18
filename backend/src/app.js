const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const requestRoutes = require("./routes/requestRoutes");
const resultRoutes = require("./routes/resultRoutes");
const reportRoutes = require("./routes/reportRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const prRoutes = require("./routes/prRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({
    message: "Testing Workflow API Running"
  });
});

// Test routes
app.get("/hello", (req, res) => {
  res.json({
    message: "Hello Route Working"
  });
});

app.post("/test", (req, res) => {
  res.json({
    message: "POST Route Working"
  });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/pr", prRoutes);

// Start server (THIS WAS MISSING — MAIN ISSUE FIX)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;
