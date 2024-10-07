import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Task = sequelize.define("tasks", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  competed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});
