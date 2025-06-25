const { Task } = require("../models/indexx");

exports.getTasks = async (req, res) => {
  const tasks = await Task.findAll({ where: { userId: req.user.id } });
  res.status(200).json(tasks);
};

exports.createTask = async (req, res) => {
  const { title } = req.body;
  const task = await Task.create({ title, userId: req.user.id });
  res.status(201).json(task);
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const task = await Task.findOne({ where: { id, userId: req.user.id } });
  if (!task) return res.status(404).json({ message: "Task not found" });
  task.status = status;
  await task.save();
  res.status(200).json(task);
};
