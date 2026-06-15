const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const app = express();
const requestRoutes =
require("./routes/requestRoutes");

const resultRoutes =
require("./routes/resultRoutes");

const reportRoutes =
require("./routes/reportRoutes");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Testing Workflow API Running"
  });
});

app.use("/api/auth", authRoutes);

module.exports = app;

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

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);

app.use(
  "/api/requests",
  requestRoutes
);

app.use(
  "/api/results",
  resultRoutes
);

app.use(
  "/api/reports",
  reportRoutes
);

const prRoutes = require("./routes/prRoutes");

app.use("/api/pr", prRoutes);