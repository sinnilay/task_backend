const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/tasks", taskRoutes);

module.exports = app;
