import { Sequelize } from "sequelize";

import sequelize from "../utils/database.js";

const User = sequelize.define("users", {
  userId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  liked_posts: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

export default User;
