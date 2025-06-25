module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define("Task", {
    title: { type: DataTypes.STRING, allowNull: false },
    status: {
      type: DataTypes.ENUM("To Do", "In Progress", "Done"),
      defaultValue: "To Do",
    },
  });

  return Task;
};