const { sequelize } = require("./models/indexx");
const serverless = require("serverless-http");

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// ✅ Health check route
app.get("/ping", (req, res) => {
  res.status(200).json({ message: "Server is alive 🟢" });
});

// Main routes
app.use("/api", authRoutes);
app.use("/api/tasks", taskRoutes);

// DB connection
sequelize.sync()
  .then(() => {
    console.log("Database connected successfully.");
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

  if (process.env.LOCAL === "true") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Local server running at http://localhost:${PORT}`);
  });
}

// Export for Vercel
module.exports = serverless(app);
