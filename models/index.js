const { Sequelize ,dialectOptions} = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = require("./user")(sequelize, Sequelize);
db.Task = require("./task")(sequelize, Sequelize);

db.User.hasMany(db.Task, { foreignKey: "userId" });
db.Task.belongsTo(db.User, { foreignKey: "userId" });

module.exports = db;