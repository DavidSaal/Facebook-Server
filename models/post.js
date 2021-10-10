import { Sequelize } from "sequelize";

import sequelize from "../utils/database.js";

import User from "./user.js";

const Post = sequelize.define("posts", {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  postId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  header: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  likes_count: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
});

export default Post;
