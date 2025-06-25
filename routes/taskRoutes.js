const express = require("express");
const router = express.Router();
const { getTasks, createTask, updateTask } = require("../controllers/taskController");
const authenticate = require("../middleware/authMiddleware");

router.use(authenticate);
router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);

module.exports = router;
