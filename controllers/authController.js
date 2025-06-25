const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models");

exports.signup = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid password" });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  res.status(200).json({ token, user: { id: user.id, name: user.name, email: user.email } });
};
